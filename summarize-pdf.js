/**
 * Summarize PDF AI Online - In-Browser AI Summarizer
 * 100% Client-Side • Transformers.js DistilBART Web Worker • Zero Server Uploads
 */

// منع أخطاء تكرار متغير الترجمة
window.translations = window.translations || {};

// الحد الأقصى لحجم الملف (50 ميجابايت)
const MAX_FILE_SIZE_MB = 50;
const MAX_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

// متغيرات حالة المستند ونموذج التلخيص
let pdfDoc = null;
let fullExtractedText = "";
let currentTotalWords = 0;
let aiWorker = null;
let isWorkerReady = false;

// خيارات التلخيص الافتراضية
let currentFormat = 'bullet'; // 'bullet' | 'executive'
let currentDepth = 'key';     // 'key' | 'comprehensive'

// دالة عرض التنبيهات المنبثقة (Toast Notification)
function showToast(message, type = 'info') {
  const existing = document.querySelector('.custom-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `custom-toast fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl text-sm font-medium shadow-xl transition-all duration-300 transform translate-y-0 ${
    type === 'error' ? 'bg-red-600 text-white' : type === 'warning' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900'
  }`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function resetFileInput() {
  const input = document.getElementById('pdf-file-input');
  if (input) input.value = '';
}

// 1. استلام الملف والتحقق منه
window.handleSelectedFile = function (file) {
  if (!file) return;

  const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
  if (!isPdf) {
    const isAr = document.documentElement.lang === 'ar';
    showToast(isAr ? 'يرجى اختيار ملف PDF صالح' : 'Please select a valid PDF document', 'warning');
    resetFileInput();
    return;
  }

  if (file.size > MAX_BYTES) {
    const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
    const isAr = document.documentElement.lang === 'ar';
    const limitMsg = isAr 
      ? `حجم الملف (${sizeMB} ميجابايت) يتجاوز الحد المسموح به (50 ميجابايت)`
      : `File size (${sizeMB} MB) exceeds the 50 MB limit. Please select a smaller file.`;
    showToast(limitMsg, 'error');
    resetFileInput();
    return;
  }

  parsePdfDocument(file);
};

// 2. استخراج النصوص بدقة ودعم الخطوط العربية (cMaps) لحساب عدد الكلمات
async function parsePdfDocument(file) {
  try {
    setLoadingState(true, document.documentElement.lang === 'ar' ? 'جاري استخراج نصوص المستند...' : 'Extracting document text...');

    const arrayBuffer = await file.arrayBuffer();

    if (typeof pdfjsLib === 'undefined') {
      throw new Error('PDF.js library is not loaded');
    }

    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    const loadingTask = pdfjsLib.getDocument({
      data: arrayBuffer,
      cMapUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/',
      cMapPacked: true
    });

    pdfDoc = await loadingTask.promise;
    fullExtractedText = "";
    currentTotalWords = 0;

    for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
      const page = await pdfDoc.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ').trim();

      if (pageText.length > 0) {
        fullExtractedText += pageText + "\n";
      }
    }

    // حساب عدد الكلمات بدقة
    const words = fullExtractedText.trim().split(/\s+/).filter(w => w.length > 0);
    currentTotalWords = words.length;

    setLoadingState(false);

    // إظهار مساحة التلخيص وتحديث العدادات
    showWorkspace(file.name, pdfDoc.numPages, file.size, currentTotalWords);

    if (currentTotalWords === 0) {
      const isAr = document.documentElement.lang === 'ar';
      showToast(
        isAr ? 'تنبيه: المستند عبارة عن صور ممسوحة ضوئياً ولا يحتوي على نصوص قابلة للتلخيص.' : 'Notice: Scanned image PDF. No extractable text found.',
        'warning'
      );
    }

  } catch (error) {
    setLoadingState(false);
    console.error('PDF Parse Error:', error);
    const isAr = document.documentElement.lang === 'ar';
    showToast(isAr ? 'تعذر فتح ملف الـ PDF' : 'Failed to parse PDF document', 'error');
  }
}

// 3. إدارة الـ Worker الخاص بنموذج التلخيص
function initWorkerIfNeeded() {
  if (!aiWorker) {
    aiWorker = new Worker('ai-worker.js', { type: 'module' });

    aiWorker.onmessage = (event) => {
      const { status, progress, result, error, message } = event.data;

      switch (status) {
        case 'loading_model':
          updateProgressCard(true, message || 'Loading Summarization Engine...', 0);
          break;

        case 'progress':
          updateProgressCard(true, `Downloading Engine: ${progress}%`, progress);
          break;

        case 'ready':
          isWorkerReady = true;
          updateProgressCard(false);
          break;

        case 'complete':
          setSummarizingState(false);
          displaySummary(result);
          break;

        case 'error':
          setSummarizingState(false);
          showToast(error || 'Summarization error', 'error');
          break;
      }
    };
  }
}

// 4. تنفيذ التلخيص
function executeSummarize() {
  if (!fullExtractedText || currentTotalWords === 0) {
    const isAr = document.documentElement.lang === 'ar';
    showToast(isAr ? 'لا يوجد نص رقمي متاح للتلخيص' : 'No extractable text found to summarize', 'warning');
    return;
  }

  setSummarizingState(true);
  initWorkerIfNeeded();

  aiWorker.postMessage({
    type: 'summarize',
    text: fullExtractedText,
    format: currentFormat,
    depth: currentDepth
  });
}

// 5. إظهار وتحديث واجهة العمل
function showWorkspace(fileName, pageCount, bytes, totalWords = 0) {
  const dropzone = document.getElementById('dropzone') || document.querySelector('.dropzone-container');
  const workspace = document.getElementById('workspace-panel') || document.getElementById('summary-workspace') || document.querySelector('.workspace-container');
  const fileInfo = document.getElementById('file-name-display') || document.querySelector('.file-name');

  if (dropzone) dropzone.classList.add('hidden');
  if (workspace) {
    workspace.classList.remove('hidden');
    workspace.style.display = 'block';
  }

  const sizeKB = (bytes / 1024).toFixed(1);
  const sizeMB = (bytes / (1024 * 1024)).toFixed(2);

  if (fileInfo) {
    fileInfo.textContent = fileName;
  }

  // تحديث شارات الواجهة (الحجم، الصفحات، الكلمات)
  const isAr = document.documentElement.lang === 'ar';
  const badges = workspace ? workspace.querySelectorAll('span, .badge') : [];
  badges.forEach(span => {
    const txt = span.textContent.trim();
    if (txt.includes('KB') || txt.includes('ك.ب')) {
      span.textContent = `${sizeKB} KB`;
    } else if (txt.includes('Pages') || txt.includes('صفحة') || txt.includes('صفحات')) {
      span.textContent = isAr ? `${pageCount} صفحة` : `${pageCount} Pages`;
    } else if (txt.includes('Words') || txt.includes('كلمة') || txt.includes('كلمات')) {
      span.textContent = isAr ? `${totalWords} كلمة` : `${totalWords} Words`;
    }
  });
}

function resetWorkspace() {
  const dropzone = document.getElementById('dropzone') || document.querySelector('.dropzone-container');
  const workspace = document.getElementById('workspace-panel') || document.getElementById('summary-workspace') || document.querySelector('.workspace-container');
  const summaryCard = document.getElementById('summary-result-card') || document.getElementById('summary-card');

  if (dropzone) dropzone.classList.remove('hidden');
  if (workspace) {
    workspace.classList.add('hidden');
    workspace.style.display = 'none';
  }
  if (summaryCard) {
    summaryCard.classList.add('hidden');
    summaryCard.style.display = 'none';
  }

  resetFileInput();
  pdfDoc = null;
  fullExtractedText = "";
  currentTotalWords = 0;
}

function displaySummary(result) {
  const summaryCard = document.getElementById('summary-result-card') || document.getElementById('summary-card');
  const summaryText = document.getElementById('summary-text') || (summaryCard ? summaryCard.querySelector('.summary-content') : null);

  if (summaryCard) {
    summaryCard.classList.remove('hidden');
    summaryCard.style.display = 'block';
  }

  if (summaryText) {
    summaryText.innerHTML = result.summary || (document.documentElement.lang === 'ar' ? 'تم إنشاء التلخيص بنجاح.' : 'Summary generated successfully.');
  }

  if (summaryCard) {
    summaryCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

function setSummarizingState(isWorking) {
  const btn = document.getElementById('btn-summarize') || document.querySelector('button[data-action="summarize"]') || document.querySelector('.btn-summarize');
  if (btn) btn.disabled = isWorking;
}

function updateProgressCard(show, text = '', progress = 0) {
  const progressCard = document.getElementById('progress-card') || document.getElementById('model-progress-banner');
  const progressText = document.getElementById('progress-text') || (progressCard ? progressCard.querySelector('.progress-status') : null);
  const progressBar = document.getElementById('progress-bar') || (progressCard ? progressCard.querySelector('.progress-bar') : null);

  if (progressCard) {
    if (show) {
      progressCard.classList.remove('hidden');
      if (progressText) progressText.textContent = text;
      if (progressBar) progressBar.style.width = `${progress}%`;
    } else {
      progressCard.classList.add('hidden');
    }
  }
}

function setLoadingState(isLoading, text = '') {
  const extractStatus = document.getElementById('extract-status');
  if (extractStatus) {
    extractStatus.textContent = text;
    if (isLoading) extractStatus.classList.remove('hidden');
    else extractStatus.classList.add('hidden');
  }
}

// 6. إدارة اللغة العربية وحل مشكلة وسوم HTML
function applyLanguage(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  localStorage.setItem('pdfnetizen_lang', lang);

  const dict = (window.translations && window.translations[lang]) ? window.translations[lang] : null;
  if (!dict) return;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = dict[key];
      } else {
        if (dict[key].includes('<') && dict[key].includes('>')) {
          el.innerHTML = dict[key];
        } else {
          el.textContent = dict[key];
        }
      }
    }
  });

  const langToggleBtn = document.getElementById('btn-language-toggle');
  if (langToggleBtn) {
    langToggleBtn.textContent = lang === 'ar' ? 'English' : 'العربية';
  }
}

function toggleLanguage() {
  const currentLang = localStorage.getItem('pdfnetizen_lang') || 'en';
  const newLang = currentLang === 'ar' ? 'en' : 'ar';
  applyLanguage(newLang);
}

// 7. تهيئة الصفحة وربط الأحداث
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('pdfnetizen_lang') || 'en';
  applyLanguage(savedLang);

  // تبديل اللغة
  const langToggleBtn = document.getElementById('btn-language-toggle');
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleLanguage();
    });
  }

  // ربط زر اختيار الملف
  const browseBtn = document.getElementById('browse-btn');
  const fileInput = document.getElementById('pdf-file-input');

  if (browseBtn && fileInput) {
    browseBtn.addEventListener('click', (e) => {
      e.preventDefault();
      fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        window.handleSelectedFile(file);
      }
    });
  }

  // زر تغيير الملف (Change File)
  const changeFileBtn = document.getElementById('btn-change-file') || document.querySelector('.btn-change-file') || document.querySelector('button:has(i.fa-sync-alt), button:has(i.fa-redo)');
  if (changeFileBtn) {
    changeFileBtn.addEventListener('click', (e) => {
      e.preventDefault();
      resetWorkspace();
    });
  }

  // السحب والإفلات
  const dropzone = document.getElementById('dropzone') || document.querySelector('.dropzone-container');
  if (dropzone) {
    ['dragenter', 'dragover'].forEach(name => {
      dropzone.addEventListener(name, (e) => {
        e.preventDefault();
        dropzone.classList.add('border-primary');
      });
    });

    ['dragleave', 'drop'].forEach(name => {
      dropzone.addEventListener(name, (e) => {
        e.preventDefault();
        dropzone.classList.remove('border-primary');
      });
    });

    dropzone.addEventListener('drop', (e) => {
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        window.handleSelectedFile(e.dataTransfer.files[0]);
      }
    });
  }

  // أزرار خيارات التلخيص (Format & Depth)
  document.querySelectorAll('[data-format]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-format]').forEach(b => b.classList.remove('active', 'btn-primary'));
      btn.classList.add('active', 'btn-primary');
      currentFormat = btn.getAttribute('data-format');
    });
  });

  document.querySelectorAll('[data-depth]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-depth]').forEach(b => b.classList.remove('active', 'btn-primary'));
      btn.classList.add('active', 'btn-primary');
      currentDepth = btn.getAttribute('data-depth');
    });
  });

  // زر بدء التلخيص
  const summarizeBtn = document.getElementById('btn-summarize') || document.querySelector('button[data-action="summarize"]') || document.querySelector('.btn-summarize') || document.querySelector('button:has(i.fa-magic)');
  if (summarizeBtn) {
    summarizeBtn.addEventListener('click', executeSummarize);
  }
});