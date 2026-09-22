/**
 * Ask PDF AI Online - In-Browser AI Assistant
 * 100% Client-Side • Transformers.js DistilBERT Web Worker • Zero Server Uploads
 */

// منع أخطاء تكرار متغير الترجمة وضمان التكامل العام
window.translations = window.translations || {};

// سقف حجم الملف الأقصى (50 ميجابايت)
const MAX_FILE_SIZE_MB = 50;
const MAX_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

// متغيرات حالة المستند ونموذج الذكاء الاصطناعي
let pdfDoc = null;
let extractedPages = [];
let aiWorker = null;
let isWorkerReady = false;
let currentTotalWords = 0;

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

// 1. الدالة العامة المربوطة باستلام الملف (Globally Bound)
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

// 2. قراءة واستخراج نصوص الـ PDF مع دعم ترميز الخطوط العربية (cMaps)
async function parsePdfDocument(file) {
  try {
    setLoadingState(true, document.documentElement.lang === 'ar' ? 'جاري استخراج نصوص المستند...' : 'Extracting document text...');

    const arrayBuffer = await file.arrayBuffer();

    if (typeof pdfjsLib === 'undefined') {
      throw new Error('PDF.js library is not loaded');
    }

    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    // دعم الخطوط العربية والترميزات المعقدة عبر cMaps
    const loadingTask = pdfjsLib.getDocument({
      data: arrayBuffer,
      cMapUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/',
      cMapPacked: true
    });

    pdfDoc = await loadingTask.promise;

    extractedPages = [];
    currentTotalWords = 0;

    for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
      const page = await pdfDoc.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ').trim();

      if (pageText.length > 0) {
        extractedPages.push({ page: pageNum, text: pageText });
        const words = pageText.split(/\s+/).filter(w => w.length > 0);
        currentTotalWords += words.length;
      }
    }

    setLoadingState(false);

    // إظهار مساحة العمل وتحديث الشارات الرقمية
    showWorkspace(file.name, pdfDoc.numPages, file.size, currentTotalWords);

    if (extractedPages.length === 0) {
      const isAr = document.documentElement.lang === 'ar';
      showToast(
        isAr ? 'تنبيه: المستند عبارة عن صور ممسوحة ضوئياً ولا يحتوي على نص رقمي قابل للبحث.' : 'Notice: Scanned image PDF. No selectable digital text found.',
        'warning'
      );
    }

  } catch (error) {
    setLoadingState(false);
    console.error('PDF Parse Error:', error);
    const isAr = document.documentElement.lang === 'ar';
    showToast(isAr ? 'تعذر فتح ملف الـ PDF (تأكد من سلامة الملف وعدم حمايته بكلمة مرور)' : 'Failed to parse PDF document', 'error');
  }
}

// 3. تهيئة Web Worker للذكاء الاصطناعي محلياً
function initWorkerIfNeeded() {
  if (!aiWorker) {
    aiWorker = new Worker('ai-worker.js', { type: 'module' });

    aiWorker.onmessage = (event) => {
      const { status, progress, result, error, message } = event.data;

      switch (status) {
        case 'loading_model':
          updateProgressCard(true, message || 'Loading Local Model...', 0);
          break;

        case 'progress':
          updateProgressCard(true, `Downloading Local Model: ${progress}%`, progress);
          break;

        case 'ready':
          isWorkerReady = true;
          updateProgressCard(false);
          break;

        case 'complete':
          setAnalyzingState(false);
          displayAnswer(result);
          break;

        case 'error':
          setAnalyzingState(false);
          showToast(error || 'AI Inference error', 'error');
          break;
      }
    };
  }
}

// 4. تنفيذ استعلام السؤال
function executeAskQuestion() {
  const queryInput = document.getElementById('user-question') || document.getElementById('user-question-input');
  const question = queryInput ? queryInput.value.trim() : '';

  if (!question) {
    showToast(document.documentElement.lang === 'ar' ? 'يرجى كتابة سؤال أولاً' : 'Please enter a question first', 'warning');
    return;
  }

  if (extractedPages.length === 0) {
    showToast(document.documentElement.lang === 'ar' ? 'لا توجد نصوص رقمية في هذا الملف لطرح الأسئلة حولها' : 'No extractable text found in this PDF', 'warning');
    return;
  }

  setAnalyzingState(true);
  initWorkerIfNeeded();

  const relevantContext = findMostRelevantContext(question, extractedPages);

  aiWorker.postMessage({
    type: 'query',
    question: question,
    context: relevantContext.text,
    page: relevantContext.page
  });
}

function findMostRelevantContext(question, pages) {
  const terms = question.toLowerCase().split(/\s+/).filter(w => w.length > 2);
  let bestPage = pages[0];
  let highestScore = -1;

  for (const item of pages) {
    const lowerText = item.text.toLowerCase();
    let score = 0;
    terms.forEach(term => {
      if (lowerText.includes(term)) score += 1;
    });

    if (score > highestScore) {
      highestScore = score;
      bestPage = item;
    }
  }

  return bestPage;
}

// 5. إظهار مساحة العمل وتحديث الشارات والنصوص
function showWorkspace(fileName, pageCount, bytes, totalWords = 0) {
  const dropzone = document.getElementById('dropzone') || document.getElementById('dropzone-container');
  const workspace = document.getElementById('workspace-panel') || document.getElementById('qa-workspace');
  const fileInfo = document.getElementById('file-name-display') || document.getElementById('file-info-badge');

  if (dropzone) dropzone.classList.add('hidden');
  if (workspace) {
    workspace.classList.remove('hidden');
    workspace.style.display = 'block';
  }

  const sizeKB = (bytes / 1024).toFixed(1);
  const sizeMB = (bytes / (1024 * 1024)).toFixed(2);

  // تحديث عنوان الملف
  if (fileInfo) {
    fileInfo.textContent = `${fileName} • ${pageCount} Pages • ${sizeMB} MB`;
  }

  // تحديث الشارات الثلاث (الحجم، الصفحات، الكلمات)
  const isAr = document.documentElement.lang === 'ar';
  const badgeSpans = workspace ? workspace.querySelectorAll('span') : [];
  badgeSpans.forEach(span => {
    const txt = span.textContent.trim();
    if (txt.includes('KB') || txt.includes('ك.ب')) {
      span.textContent = `${sizeKB} KB`;
    } else if (txt.includes('Pages') || txt.includes('صفحة') || txt.includes('صفحات')) {
      span.textContent = isAr ? `${pageCount} صفحة` : `${pageCount} Pages`;
    } else if (txt.includes('Words') || txt.includes('كلمة') || txt.includes('كلمات')) {
      span.textContent = isAr ? `${totalWords} كلمة` : `${totalWords} Words`;
    }
  });

  // تحديث نص عرض السياق المستخرج
  const contextToggle = document.querySelector('[data-i18n="show_extracted_context"]') || document.getElementById('context-toggle-btn') || document.querySelector('summary');
  if (contextToggle) {
    contextToggle.textContent = isAr 
      ? `عرض النص المستخرج (${totalWords} كلمة)` 
      : `Show Extracted Text Context (${totalWords} words)`;
  }
}

// إعادة ضبط الواجهة لاختيار ملف جديد
function resetWorkspace() {
  const dropzone = document.getElementById('dropzone') || document.getElementById('dropzone-container');
  const workspace = document.getElementById('workspace-panel') || document.getElementById('qa-workspace');
  const answerCard = document.getElementById('answer-card') || document.getElementById('answer-container');

  if (dropzone) dropzone.classList.remove('hidden');
  if (workspace) {
    workspace.classList.add('hidden');
    workspace.style.display = 'none';
  }
  if (answerCard) {
    answerCard.classList.add('hidden');
    answerCard.style.display = 'none';
  }

  resetFileInput();
  pdfDoc = null;
  extractedPages = [];
  currentTotalWords = 0;
}

function displayAnswer(result) {
  const answerCard = document.getElementById('answer-card') || document.getElementById('answer-container');
  const answerText = document.getElementById('answer-text') || (answerCard ? answerCard.querySelector('.answer-content') : null);
  const scoreBadge = document.getElementById('confidence-score');
  const pageBadge = document.getElementById('answer-page');

  if (answerCard) {
    answerCard.classList.remove('hidden');
    answerCard.style.display = 'block';
  }

  if (answerText) {
    answerText.textContent = result.answer || (document.documentElement.lang === 'ar' ? 'لم يتم العثور على إجابة واضحة في نصوص المستند.' : 'No clear answer found in the text.');
  }

  if (scoreBadge && result.score) {
    scoreBadge.textContent = `${(result.score * 100).toFixed(0)}%`;
  }
  if (pageBadge && result.page) {
    pageBadge.textContent = document.documentElement.lang === 'ar' ? `صفحة ${result.page}` : `Page ${result.page}`;
  }

  if (answerCard) {
    answerCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

function setAnalyzingState(isAnalyzing) {
  const askBtn = document.getElementById('ask-ai-btn') || document.getElementById('ask-submit-btn');
  const spinner = document.getElementById('ask-spinner') || (askBtn ? askBtn.querySelector('.spinner-border') : null);

  if (askBtn) askBtn.disabled = isAnalyzing;
  if (spinner) {
    if (isAnalyzing) spinner.classList.remove('hidden');
    else spinner.classList.add('hidden');
  }
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

// 6. إدارة اللغة ونظام الترجمة (معالجة نصوص الـ HTML بأمان)
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
        // تشغيل الوسوم المنسقة مثل <span class="gradient-text"> بدلاً من إظهارها كنصوص خام
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

// 7. تهيئة الصفحة وربط الأحداث عند اكتمال الـ DOM
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('pdfnetizen_lang') || 'en';
  applyLanguage(savedLang);

  // ربط زر تغيير اللغة
  const langToggleBtn = document.getElementById('btn-language-toggle');
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleLanguage();
    });
  }

  // ربط زر اختيار الملف بحقل الإدخال
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

  // ربط زر تغيير الملف (Change File)
  const changeFileBtn = document.getElementById('btn-change-file') || document.querySelector('.btn-change-file') || document.querySelector('button:has(i.fa-sync-alt), button:has(i.fa-redo)');
  if (changeFileBtn) {
    changeFileBtn.addEventListener('click', (e) => {
      e.preventDefault();
      resetWorkspace();
    });
  }

  // دعم السحب والإفلات (Drag & Drop)
  const dropzone = document.getElementById('dropzone') || document.getElementById('dropzone-container');
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

  // ربط زر إرسال السؤال
  const askBtn = document.getElementById('ask-ai-btn') || document.getElementById('ask-submit-btn');
  if (askBtn) {
    askBtn.addEventListener('click', executeAskQuestion);
  }

  // ربط مفتاح Enter في حقل السؤال
  const userQuestionInput = document.getElementById('user-question') || document.getElementById('user-question-input');
  if (userQuestionInput) {
    userQuestionInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        executeAskQuestion();
      }
    });
  }

  // ربط الأسئلة المقترحة (Suggestion Chips)
  document.querySelectorAll('.suggestion-chip, .sample-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      if (userQuestionInput) {
        userQuestionInput.value = chip.textContent.trim();
        executeAskQuestion();
      }
    });
  });
});