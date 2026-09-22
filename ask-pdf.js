// ask-pdf.js - معالجة الاستعلامات والبحث الذكي محلياً داخل المتصفح

// منع أخطاء تكرار متغير الترجمة وضمان التوافق العام
window.translations = window.translations || {};

const MAX_FILE_SIZE_MB = 50;
const MAX_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

// متغيرات حالة المستند والنموذج
let pdfDoc = null;
let extractedPages = []; // مصفوفة لحفظ النصوص وأرقام الصفحات
let aiWorker = null;
let isWorkerReady = false;

// دالة مساعدة لعرض التنبيهات (Toast)
function showToast(message, type = 'info') {
  const existingToast = document.querySelector('.custom-toast');
  if (existingToast) existingToast.remove();

  const toast = document.createElement('div');
  toast.className = `custom-toast fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl text-sm font-medium shadow-xl transition-all duration-300 transform translate-y-0 ${type === 'error' ? 'bg-red-600 text-white' : 'bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900'
    }`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// 1. الدالة العامة لاستقبال الملف فور اختياره (Globally Bound)
window.handleSelectedFile = function (file) {
  if (!file) return;

  // التحقق من نوع الملف
  const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
  if (!isPdf) {
    const errorMsg = document.documentElement.lang === 'ar'
      ? 'يرجى اختيار ملف PDF صالح'
      : 'Please select a valid PDF document';
    showToast(errorMsg, 'error');
    resetFileInput();
    return;
  }

  // التحقق من سقف الحجم المسموح به (50 ميجابايت)
  if (file.size > MAX_BYTES) {
    const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
    const limitMsg = document.documentElement.lang === 'ar'
      ? `حجم الملف (${sizeMB} ميجابايت) يتجاوز الحد المسموح به (50 ميجابايت). يرجى اختيار ملف أصغر.`
      : `File size (${sizeMB} MB) exceeds the 50 MB limit. Please select a smaller file.`;
    showToast(limitMsg, 'error');
    resetFileInput();
    return;
  }

  // بدء قراءة واستخراج نص المستند
  parsePdfDocument(file);
};

function resetFileInput() {
  const input = document.getElementById('pdf-file-input');
  if (input) input.value = '';
}

// 2. قراءة صفحات المستند عبر PDF.js
async function parsePdfDocument(file) {
  try {
    setLoadingUI(true, document.documentElement.lang === 'ar' ? 'جاري استخراج نصوص المستند...' : 'Extracting document text...');

    const arrayBuffer = await file.arrayBuffer();

    // تهيئة مكتبة PDF.js
    if (typeof pdfjsLib === 'undefined') {
      throw new Error('PDF.js library is not loaded');
    }

    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    pdfDoc = await loadingTask.promise;

    extractedPages = [];
    for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
      const page = await pdfDoc.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ').trim();

      if (pageText.length > 0) {
        extractedPages.push({ page: pageNum, text: pageText });
      }
    }

    setLoadingUI(false);

    if (extractedPages.length === 0) {
      showToast(
        document.documentElement.lang === 'ar'
          ? 'المستند ممسوح ضوئياً كصور ولا يحتوي على نص رقمي قابل للبحث'
          : 'Scanned image PDF detected. No extractable digital text found.',
        'error'
      );
      return;
    }

    // تحديث الواجهة لعرض تفاصيل الملف وقسم الأسئلة
    showWorkspace(file.name, pdfDoc.numPages, file.size);

  } catch (error) {
    setLoadingUI(false);
    console.error('PDF Parse Error:', error);
    showToast(
      document.documentElement.lang === 'ar'
        ? 'حدث خطأ أثناء قراءة ملف الـ PDF'
        : 'Failed to read PDF file',
      'error'
    );
  }
}

// 3. تهيئة العامل الخلفي (Web Worker) للذكاء الاصطناعي عند الطلب
function initWorkerIfNeeded() {
  if (!aiWorker) {
    aiWorker = new Worker('ai-worker.js', { type: 'module' });

    aiWorker.onmessage = (event) => {
      const { status, progress, result, error, message } = event.data;

      switch (status) {
        case 'loading_model':
          updateDownloadBanner(true, message, 0);
          break;

        case 'progress':
          updateDownloadBanner(true, `Downloading Local Model: ${progress}%`, progress);
          break;

        case 'ready':
          isWorkerReady = true;
          updateDownloadBanner(false);
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

// 4. تنفيذ استعلام السؤال واستخراج الإجابة
function executeAskQuestion() {
  const queryInput = document.getElementById('user-question-input');
  const question = queryInput ? queryInput.value.trim() : '';

  if (!question) {
    showToast(document.documentElement.lang === 'ar' ? 'يرجى كتابة سؤال أولاً' : 'Please enter a question first');
    return;
  }

  if (extractedPages.length === 0) {
    showToast(document.documentElement.lang === 'ar' ? 'يرجى رفع ملف PDF أولاً' : 'Please upload a PDF first');
    return;
  }

  setAnalyzingState(true);
  initWorkerIfNeeded();

  // تصفية الصفحات الأكثر ملائمة للبحث لتقليل استهلاك الذاكرة
  const relevantContext = findMostRelevantContext(question, extractedPages);

  aiWorker.postMessage({
    type: 'query',
    question: question,
    context: relevantContext.text,
    page: relevantContext.page
  });
}

// تصفية سياق الفقرات بحسب الكلمات المفتاحية
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

// 5. تحديثات عناصر الواجهة
function showWorkspace(fileName, pageCount, bytes) {
  const dropzone = document.getElementById('dropzone-container') || document.querySelector('.dropzone');
  const workspace = document.getElementById('qa-workspace');
  const fileInfo = document.getElementById('file-info-badge');

  if (dropzone) dropzone.classList.add('hidden');
  if (workspace) workspace.classList.remove('hidden');

  if (fileInfo) {
    const sizeMB = (bytes / (1024 * 1024)).toFixed(2);
    fileInfo.textContent = `${fileName} • ${pageCount} Pages • ${sizeMB} MB`;
  }
}

function displayAnswer(result) {
  const answerContainer = document.getElementById('answer-container');
  const answerText = document.getElementById('answer-text');
  const scoreBadge = document.getElementById('confidence-score');
  const pageBadge = document.getElementById('answer-page');

  if (answerContainer) answerContainer.classList.remove('hidden');
  if (answerText) answerText.textContent = result.answer || 'No direct answer found.';
  if (scoreBadge && result.score) scoreBadge.textContent = `${(result.score * 100).toFixed(0)}% Confidence`;
  if (pageBadge && result.page) pageBadge.textContent = `Page ${result.page}`;

  // تمرير الشاشة للنتيجة بسلاسة
  if (answerContainer) {
    answerContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

function setAnalyzingState(isAnalyzing) {
  const askBtn = document.getElementById('ask-submit-btn');
  const spinner = document.getElementById('ask-spinner');

  if (askBtn) askBtn.disabled = isAnalyzing;
  if (spinner) {
    if (isAnalyzing) spinner.classList.remove('hidden');
    else spinner.classList.add('hidden');
  }
}

function updateDownloadBanner(show, text = '', progress = 0) {
  const banner = document.getElementById('model-progress-banner');
  const progressText = document.getElementById('model-progress-text');
  const progressBar = document.getElementById('model-progress-bar');

  if (banner) {
    if (show) {
      banner.classList.remove('hidden');
      if (progressText) progressText.textContent = text;
      if (progressBar) progressBar.style.width = `${progress}%`;
    } else {
      banner.classList.add('hidden');
    }
  }
}

function setLoadingUI(isLoading, text = '') {
  const statusEl = document.getElementById('extract-status');
  if (statusEl) {
    statusEl.textContent = text;
    if (isLoading) statusEl.classList.remove('hidden');
    else statusEl.classList.add('hidden');
  }
}

// 6. ربط الأحداث عند تحميل المستند
document.addEventListener('DOMContentLoaded', () => {
  // تفعيل خيار سحب وإفلات الملفات (Drag & Drop)
  const dropzone = document.getElementById('dropzone-container') || document.querySelector('.dropzone');
  if (dropzone) {
    ['dragenter', 'dragover'].forEach(name => {
      dropzone.addEventListener(name, (e) => {
        e.preventDefault();
        dropzone.classList.add('border-indigo-500', 'bg-indigo-50/50', 'dark:bg-indigo-950/20');
      });
    });

    ['dragleave', 'drop'].forEach(name => {
      dropzone.addEventListener(name, (e) => {
        e.preventDefault();
        dropzone.classList.remove('border-indigo-500', 'bg-indigo-50/50', 'dark:bg-indigo-950/20');
      });
    });

    dropzone.addEventListener('drop', (e) => {
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        window.handleSelectedFile(e.dataTransfer.files[0]);
      }
    });
  }

  // ربط زر الاستعلام
  const askBtn = document.getElementById('ask-submit-btn');
  if (askBtn) {
    askBtn.addEventListener('click', executeAskQuestion);
  }

  // دعم النقر على Enter في حقل السؤال
  const queryInput = document.getElementById('user-question-input');
  if (queryInput) {
    queryInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') executeAskQuestion();
    });
  }

  // ربط الأسئلة المقترحة (Sample Chips)
  document.querySelectorAll('.sample-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      if (queryInput) {
        queryInput.value = chip.textContent.trim();
        executeAskQuestion();
      }
    });
  });
});