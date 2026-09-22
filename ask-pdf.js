/**
 * AskPDF Pro - In-Browser AI Assistant & Document Question Answering
 * 100% Client-Side • Transformers.js ONNX Web Worker • Zero Server Uploads
 * 
 * 4 Golden Performance Rules:
 * 1. Web Worker Offloading (Module Worker for 60 FPS non-blocking UI).
 * 2. On-Demand Lazy Initialization (0 MB initial bundle impact).
 * 3. Quantized Model (DistilBERT SQuAD Quantized ~35 MB).
 * 4. User Transparency & Real-Time Progress Bar.
 */

// Configure PDF.js Worker
if (window.pdfjsLib) {
  window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
}

// Maximum file size protection (25MB)
const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024;

// Multi-language translation dictionary
const translations = {
  en: {
    ask_pdf_title: "Ask PDF & Search",
    ask_pdf_desc: "Ask questions, search semantically, and get instant answers from your PDF locally with zero server uploads.",
    tool_ask_pdf_title: "Ask PDF & Search",
    tool_ask_pdf_desc: "Ask questions, search semantically, and get instant answers from your PDF locally with zero server uploads.",
    badge_client_side: "100% Local AI",
    nav_home: "Home",
    nav_annotator: "Annotator",
    nav_merge: "Merge PDF",
    nav_split: "Split PDF",
    nav_compress: "Compress PDF",
    nav_ocr: "OCR Extractor",
    nav_reset: "Reset",
    hero_badge: "Local & Secure • 100% Private In-Browser AI • No Cloud Uploads",
    hero_title: 'Ask AI Questions from <span class="gradient-text">PDF Documents</span> Instantly',
    hero_subtitle: "Extract instant answers, insights, and summaries directly inside your browser. No accounts, zero server uploads, and complete data privacy.",
    model_notice_title: "Client-Side AI Engine",
    model_notice_desc: "One-time download (~35 MB). Runs 100% locally and works offline.",
    dropzone_title: "Drop your PDF file here",
    dropzone_subtitle: "Drag and drop any PDF document under 25MB to begin local AI analysis, or browse from your computer",
    btn_browse_file: "Browse PDF File",
    btn_load_sample: "Try Sample PDF",
    feature_local: "100% On-Device Neural Model",
    feature_offline: "Works Offline After 1st Download",
    feature_privacy: "Zero Server Uploads & Private",
    btn_change_file: "Change File",
    label_question: "Ask a Question About Your PDF",
    placeholder_question: "e.g., What are the key findings or main topic of this document?",
    btn_ask_ai: "Ask AI",
    btn_analyzing: "Analyzing Document...",
    suggestions_title: "Suggested Questions:",
    suggestion_1: "What is the main topic of this document?",
    suggestion_2: "Summarize the key takeaways",
    suggestion_3: "What are the important requirements or dates?",
    progress_downloading: "Downloading Local AI Model (~35 MB)...",
    progress_ready: "AI Model Ready in Browser Memory",
    progress_analyzing: "Running on-device neural inference...",
    answer_title: "AI Answer",
    confidence_label: "Confidence:",
    btn_copy_answer: "Copy Answer",
    toast_copied: "Answer copied to clipboard!",
    context_toggle_show: "Show Extracted Text Context ({words} words)",
    context_toggle_hide: "Hide Extracted Text Context",
    toast_valid_pdf: "Please select a valid PDF file (.pdf)",
    toast_empty_question: "Please enter a question to ask the AI.",
    toast_no_text: "Could not extract readable text from this PDF. Please try a text-based PDF or OCR first.",
    toast_pdf_loaded: "Document loaded: {pages} pages ({words} words ready).",
    ask_seo_badge: "On-Device Neural Question Answering",
    ask_seo_title: "How to Chat with PDF & Ask AI Questions Online Privately",
    ask_seo_subtitle: "Analyze PDF files with cutting-edge local AI models running entirely in your browser without sacrificing privacy or speed.",
    ask_step1_title: "1. Upload Your PDF Document",
    ask_step1_desc: "Select any PDF file up to 25MB. PDFNetizen extracts document text 100% locally in your device memory.",
    ask_step2_title: "2. Ask Any Question",
    ask_step2_desc: "Type your query or click one of the suggested prompts to investigate specific details, contracts, or summaries.",
    ask_step3_title: "3. Instant Local AI Answers",
    ask_step3_desc: "The lightweight on-device AI model scans the document text to extract precise answers without sending data to any cloud.",
    ask_faq_title: "Frequently Asked Questions",
    ask_faq_q1: "Are my documents sent to OpenAI, ChatGPT, or external cloud servers?",
    ask_faq_a1: "No. Our AI question-answering engine runs 100% client-side inside your browser via WebAssembly and Web Workers. Your private documents, financial sheets, and legal contracts never leave your machine.",
    ask_faq_q2: "Why is there a one-time ~35 MB download on the first question?",
    ask_faq_a2: "To guarantee 100% privacy, a lightweight quantized ONNX neural model is downloaded directly into your browser cache. Subsequent queries and future visits execute instantly offline with 0 MB download.",
    ask_faq_q3: "Does this tool work with scanned image PDFs?",
    ask_faq_a3: "AskPDF is optimized for text and vector PDF documents. For scanned image files, use our free OCR Text Extractor tool first, then query the extracted text."
  },
  ar: {
    ask_pdf_title: "اسأل PDF والبحث الذكي",
    ask_pdf_desc: "اطرح أسئلة وابحث ذكياً واستخرج إجابات فورية من مستندات PDF محلياً بالذكاء الاصطناعي دون أي رفع سحابي.",
    tool_ask_pdf_title: "اسأل PDF والبحث الذكي",
    tool_ask_pdf_desc: "اطرح أسئلة وابحث ذكياً واستخرج إجابات فورية من مستندات PDF محلياً بالذكاء الاصطناعي دون أي رفع سحابي.",
    badge_client_side: "ذكاء اصطناعي محلي ١٠٠٪",
    nav_home: "الرئيسية",
    nav_annotator: "محرر PDF",
    nav_merge: "دمج PDF",
    nav_split: "تقسيم PDF",
    nav_compress: "ضغط PDF",
    nav_ocr: "استخراج النصوص OCR",
    nav_reset: "إعادة ضبط",
    hero_badge: "محلي وآمن • ذكاء اصطناعي في المتصفح • بدون خوادم سحابية",
    hero_title: 'اسأل الذكاء الاصطناعي حول <span class="gradient-text">ملفات PDF</span> فوراً',
    hero_subtitle: "استخرج إجابات وملخصات دقيقة مباشرة داخل متصفحك. بدون تسجيل، بدون رفع سحابي، وخصوصية تامة ١٠٠٪.",
    model_notice_title: "محرك الذكاء الاصطناعي المحلي",
    model_notice_desc: "تنزيل لمرة واحدة (~35 ميجابايت). يعمل محلياً بالكامل ١٠٠٪ ويدعم العمل بدون إنترنت.",
    dropzone_title: "اسحب ملف PDF هنا",
    dropzone_subtitle: "اسحب وأفلت أي ملف PDF أقل من 25 ميجابايت لبدء التحليل بالذكاء الاصطناعي، أو تصفح من جهازك",
    btn_browse_file: "استعراض ملف PDF",
    btn_load_sample: "تجربة نموذج جاهز",
    feature_local: "نموذج عصبي محلي ١٠٠٪ على جهازك",
    feature_offline: "يعمل بدون إنترنت بعد أول تنزيل",
    feature_privacy: "بدون أي رفع للخوادم وأمان تام",
    btn_change_file: "تغيير الملف",
    label_question: "اطرح سؤالاً حول محتوى المستند",
    placeholder_question: "مثال: ما هو الموضوع الرئيسي أو النقاط الأساسية في هذا المستند؟",
    btn_ask_ai: "اسأل الذكاء الاصطناعي",
    btn_analyzing: "جاري تحليل المستند...",
    suggestions_title: "أسئلة مقترحة:",
    suggestion_1: "ما هو الموضوع الأساسي في هذا المستند؟",
    suggestion_2: "لخص النقاط والنتائج الرئيسية",
    suggestion_3: "ما هي المتطلبات أو التواريخ الهامة؟",
    progress_downloading: "جاري تنزيل نموذج الذكاء الاصطناعي الخفيف (~35 ميجابايت)...",
    progress_ready: "نموذج الذكاء الاصطناعي جاهز ومخزن في ذاكرة المتصفح",
    progress_analyzing: "جاري استنتاج الإجابة على جهازك...",
    answer_title: "إجابة الذكاء الاصطناعي",
    confidence_label: "مستوى الدقة:",
    btn_copy_answer: "نسخ الإجابة",
    toast_copied: "تم نسخ الإجابة إلى الحافظة!",
    context_toggle_show: "عرض النص المستخرج من المستند ({words} كلمة)",
    context_toggle_hide: "إخفاء النص المستخرج",
    toast_valid_pdf: "يرجى اختيار ملف PDF صالح (.pdf)",
    toast_empty_question: "يرجى كتابة سؤال أولاً.",
    toast_no_text: "لم نتمكن من استخراج نص قابل للقراءة. يرجى تجربة مستند يحتوي على نصوص أو استخدام أداة OCR أولاً.",
    toast_pdf_loaded: "تم تحميل المستند: {pages} صفحات ({words} كلمة جاهزة).",
    ask_seo_badge: "إجابة على الأسئلة بالذكاء الاصطناعي في المتصفح",
    ask_seo_title: "كيفية التحدث مع ملفات PDF وطرح الأسئلة بالذكاء الاصطناعي محلياً",
    ask_seo_subtitle: "حلل مستندات PDF باستخدام أحدث النماذج العصبية المحلية التي تعمل بالكامل في متصفحك دون المساومة على الخصوصية أو السرعة.",
    ask_step1_title: "١. رفع مستند PDF",
    ask_step1_desc: "اختر أي ملف PDF حتى 25 ميجابايت. يقوم النظام باستخراج النص محلياً ١٠٠٪ في ذاكرة جهازك.",
    ask_step2_title: "٢. طرح السؤال",
    ask_step2_desc: "اكتب سؤالك أو انقر على أحد الاقتراحات الجاهزة للاستفسار عن تفاصيل أو شروط معينة.",
    ask_step3_title: "٣. إجابات فورية وآمنة",
    ask_step3_desc: "يقوم النموذج المحلي بفحص سياق المستند واستخراج الإجابة الدقيقة دون إرسال أي بايت لخوادم خارجية.",
    ask_faq_title: "الأسئلة الشائعة",
    ask_faq_q1: "هل يتم إرسال مستنداتي إلى OpenAI أو خوادم سحابية خارجية؟",
    ask_faq_a1: "لا على الإطلاق. يعمل محرك الذكاء الاصطناعي محلياً ١٠٠٪ في متصفحك باستخدام WebAssembly وWeb Workers. ملفاتك القانونية والمالية والشخصية لا تغادر جهازك أبداً.",
    ask_faq_q2: "لماذا يوجد تنزيل لمرة واحدة بحجم ~35 ميجابايت عند أول سؤال؟",
    ask_faq_a2: "لضمان الخصوصية التامة، يتم تنزيل نموذج ذكاء اصطناعي مكمم خفيف وتخزينه في ذاكرة المتصفح المؤقتة. الأسئلة اللاحقة والزيارات المستقبلية تعمل فورياً وبدون إنترنت بحجم 0 ميجابايت.",
    ask_faq_q3: "هل تعمل الأداة مع ملفات PDF الممسوحة ضوئياً (صور)؟",
    ask_faq_a3: "الأداة مصممة لملفات PDF النصية. بالنسبة للمستندات الممسوحة ضوئياً كصور، يمكنك استخدام أداة OCR المجانية أولاً لاستخراج النصوص ثم توجيه الأسئلة إليها."
  }
};

// Application State
let currentLang = 'en';
let currentPdfBytes = null;
let currentFileName = 'document.pdf';
let currentTotalPages = 0;
let extractedText = '';
let isAnalyzing = false;
let isModelReady = false;

// Web Worker instance (Rule 2: Lazy instantiated on user action)
let aiWorker = null;

// Cached DOM Elements
let dropzone = null;
let fileInput = null;
let workspacePanel = null;
let fileNameDisplay = null;
let fileSizeDisplay = null;
let filePagesDisplay = null;
let fileWordsDisplay = null;
let btnChangeFile = null;
let btnBrowseFile = null;
let btnLoadSample = null;
let btnHeaderReset = null;
let btnLanguageToggle = null;
let langToggleText = null;
let userQuestionInput = null;
let btnAskAi = null;
let btnAskText = null;
let btnSpinner = null;
let progressCard = null;
let progressStatusText = null;
let progressPercent = null;
let progressFill = null;
let progressSubtext = null;
let answerCard = null;
let answerText = null;
let confidenceBadge = null;
let answerDuration = null;
let btnCopyAnswer = null;
let contextToggleBtn = null;
let contextBox = null;
let contextContent = null;
let toastEl = null;
let toastMsgEl = null;
let toastIconEl = null;

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  cacheDOMElements();
  bindEventListeners();
  applyLanguage(currentLang);

  if (window.lucide) {
    lucide.createIcons();
  }
});

function cacheDOMElements() {
  dropzone = document.getElementById('dropzone');
  fileInput = document.getElementById('pdf-file-input');
  workspacePanel = document.getElementById('workspace-panel');
  fileNameDisplay = document.getElementById('file-name-display');
  fileSizeDisplay = document.getElementById('file-size-display');
  filePagesDisplay = document.getElementById('file-pages-display');
  fileWordsDisplay = document.getElementById('file-words-display');
  btnChangeFile = document.getElementById('btn-change-file');
  btnBrowseFile = document.getElementById('btn-browse-file');
  btnLoadSample = document.getElementById('btn-load-sample');
  btnHeaderReset = document.getElementById('btn-header-reset');
  btnLanguageToggle = document.getElementById('btn-language-toggle');
  langToggleText = document.getElementById('lang-toggle-text');
  userQuestionInput = document.getElementById('user-question');
  btnAskAi = document.getElementById('ask-ai-btn');
  btnAskText = document.getElementById('btn-ask-text');
  btnSpinner = document.getElementById('btn-spinner');
  progressCard = document.getElementById('progress-card');
  progressStatusText = document.getElementById('progress-status-text');
  progressPercent = document.getElementById('progress-percent');
  progressFill = document.getElementById('progress-fill');
  progressSubtext = document.getElementById('progress-subtext');
  answerCard = document.getElementById('answer-card');
  answerText = document.getElementById('answer-text');
  confidenceBadge = document.getElementById('confidence-badge');
  answerDuration = document.getElementById('answer-duration');
  btnCopyAnswer = document.getElementById('btn-copy-answer');
  contextToggleBtn = document.getElementById('btn-toggle-context');
  contextBox = document.getElementById('context-box');
  contextContent = document.getElementById('context-content');
  toastEl = document.getElementById('toast');
  toastMsgEl = document.getElementById('toast-message');
  toastIconEl = document.getElementById('toast-icon');
}

// Translation Helper
function t(key, replacements = {}) {
  const dict = translations[currentLang] || translations.en;
  let text = dict[key] || translations.en[key] || key;
  for (const [k, v] of Object.entries(replacements)) {
    text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
  }
  return text;
}

function toggleLanguage() {
  currentLang = (currentLang === 'en') ? 'ar' : 'en';
  applyLanguage(currentLang);
}

function applyLanguage(lang) {
  currentLang = lang;
  const isAr = (lang === 'ar');

  document.documentElement.dir = isAr ? 'rtl' : 'ltr';
  document.documentElement.lang = lang;

  if (langToggleText) {
    langToggleText.textContent = isAr ? 'English' : 'العربية';
  }

  // Update static text elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translation = t(key);
    if (translation) {
      if (translation.includes('<span')) {
        el.innerHTML = translation;
      } else {
        el.textContent = translation;
      }
    }
  });

  // Update placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const translation = t(key);
    if (translation) {
      el.placeholder = translation;
    }
  });

  // Update context toggle button label
  if (contextToggleBtn && extractedText) {
    const wordCount = extractedText.split(/\s+/).filter(Boolean).length;
    const isHidden = contextBox && contextBox.classList.contains('hidden');
    contextToggleBtn.textContent = isHidden
      ? t('context_toggle_show', { words: wordCount })
      : t('context_toggle_hide');
  }

  // Update button state text
  if (btnAskText && !isAnalyzing) {
    btnAskText.textContent = t('btn_ask_ai');
  }

  if (window.lucide) {
    lucide.createIcons();
  }
}

function bindEventListeners() {
  // Language Toggle
  if (btnLanguageToggle) {
    btnLanguageToggle.addEventListener('click', toggleLanguage);
  }

  // Reset
  if (btnHeaderReset) {
    btnHeaderReset.addEventListener('click', resetWorkspace);
  }

  // Browse File
  if (btnBrowseFile && fileInput) {
    btnBrowseFile.addEventListener('click', () => fileInput.click());
  }

  // Dropzone Handlers
  if (dropzone && fileInput) {
    dropzone.addEventListener('click', (e) => {
      if (e.target.closest('button')) return;
      fileInput.click();
    });

    ['dragenter', 'dragover'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.add('drag-over');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.remove('drag-over');
      });
    });

    dropzone.addEventListener('drop', (e) => {
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFileSelected(e.dataTransfer.files[0]);
      }
    });
  }

  // File Input
  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files.length > 0) {
        handleFileSelected(e.target.files[0]);
      }
    });
  }

  // Sample PDF Loader
  if (btnLoadSample) {
    btnLoadSample.addEventListener('click', loadSamplePDF);
  }

  // Change File Button
  if (btnChangeFile && fileInput) {
    btnChangeFile.addEventListener('click', () => fileInput.click());
  }

  // Question Form Submission
  if (btnAskAi) {
    btnAskAi.addEventListener('click', handleAskQuestion);
  }

  if (userQuestionInput) {
    userQuestionInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleAskQuestion();
      }
    });
  }

  // Suggested Question Chips
  document.querySelectorAll('.suggestion-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const qText = chip.getAttribute('data-question') || chip.textContent.trim();
      if (userQuestionInput) {
        userQuestionInput.value = qText;
        handleAskQuestion();
      }
    });
  });

  // Copy Answer
  if (btnCopyAnswer && answerText) {
    btnCopyAnswer.addEventListener('click', () => {
      const txt = answerText.textContent;
      if (txt) {
        navigator.clipboard.writeText(txt).then(() => {
          showToast(t('toast_copied'), 'success');
        });
      }
    });
  }

  // Context Toggle
  if (contextToggleBtn && contextBox) {
    contextToggleBtn.addEventListener('click', () => {
      const isHidden = contextBox.classList.toggle('hidden');
      const wordCount = extractedText.split(/\s+/).filter(Boolean).length;
      contextToggleBtn.textContent = isHidden
        ? t('context_toggle_show', { words: wordCount })
        : t('context_toggle_hide');
    });
  }
}

/* ==========================================================================
   Rule 1 & 2: Web Worker Offloading & On-Demand Lazy Initialization
   ========================================================================== */
function initWorkerIfNeeded() {
  if (aiWorker) return aiWorker;

  // Rule 1: Instantiate module web worker
  aiWorker = new Worker(new URL('./ai-worker.js', import.meta.url), { type: 'module' });

  aiWorker.onmessage = (e) => {
    const { status, progress, file, result, error, message } = e.data || {};

    switch (status) {
      case 'loading_model':
        showProgressCard(true);
        updateProgressBar(0, t('progress_downloading'), message);
        break;

      case 'progress':
        showProgressCard(true);
        updateProgressBar(progress, t('progress_downloading'), `Fetching ${file} (${progress}%)`);
        break;

      case 'ready':
        isModelReady = true;
        updateProgressBar(100, t('progress_ready'), message);
        setTimeout(() => {
          showProgressCard(false);
        }, 1200);
        break;

      case 'analyzing':
        setAnalyzingState(true);
        if (progressCard) {
          showProgressCard(true);
          updateProgressBar(100, t('progress_analyzing'), 'Processing neural attention weights...');
        }
        break;

      case 'complete':
        setAnalyzingState(false);
        showProgressCard(false);
        displayAnswer(result);
        break;

      case 'error':
        setAnalyzingState(false);
        showProgressCard(false);
        showToast(error || 'An error occurred during AI processing.', 'error');
        break;
    }
  };

  aiWorker.onerror = (err) => {
    setAnalyzingState(false);
    showProgressCard(false);
    showToast(`Worker error: ${err.message}`, 'error');
  };

  return aiWorker;
}

/* ==========================================================================
   File Ingestion & Text Extraction (PDF.js)
   ========================================================================== */
async function handleFileSelected(file) {
  if (!file) return;

  if (file.type && file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
    showToast(t('toast_valid_pdf'), 'warning');
    if (fileInput) fileInput.value = '';
    return;
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    showToast('Please select a PDF under 25MB for optimal browser performance.', 'error');
    if (fileInput) fileInput.value = '';
    return;
  }

  const reader = new FileReader();
  reader.onload = async function (e) {
    const rawBuffer = e.target.result;
    currentPdfBytes = new Uint8Array(rawBuffer);
    currentFileName = file.name || 'document.pdf';
    await extractTextFromPdf(currentPdfBytes, currentFileName, file.size);
  };
  reader.onerror = () => showToast('Failed to read selected PDF file.', 'error');
  reader.readAsArrayBuffer(file);
}

async function extractTextFromPdf(bytes, filename, sizeBytes) {
  try {
    if (!window.pdfjsLib) {
      throw new Error('PDF.js library is not loaded. Check your internet connection.');
    }

    const loadingTask = pdfjsLib.getDocument({ data: bytes.slice(0) });
    const pdfDoc = await loadingTask.promise;
    currentTotalPages = pdfDoc.numPages;

    let fullText = '';
    for (let pageNum = 1; pageNum <= currentTotalPages; pageNum++) {
      const page = await pdfDoc.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      if (pageText.trim()) {
        fullText += `--- Page ${pageNum} ---\n${pageText}\n\n`;
      }
    }

    extractedText = fullText.trim();
    window.extractedPdfText = extractedText;

    if (!extractedText) {
      showToast(t('toast_no_text'), 'warning');
    }

    // Update Overview UI
    const wordCount = extractedText ? extractedText.split(/\s+/).filter(Boolean).length : 0;
    if (fileNameDisplay) fileNameDisplay.textContent = filename;
    if (fileSizeDisplay) fileSizeDisplay.textContent = formatBytes(sizeBytes || bytes.byteLength);
    if (filePagesDisplay) filePagesDisplay.textContent = `${currentTotalPages} Pages`;
    if (fileWordsDisplay) fileWordsDisplay.textContent = `${wordCount.toLocaleString()} Words`;

    if (contextContent) {
      contextContent.textContent = extractedText || 'No readable text extracted.';
    }

    if (contextToggleBtn) {
      contextToggleBtn.textContent = t('context_toggle_show', { words: wordCount });
    }

    // Switch view to workspace
    if (dropzone) dropzone.classList.add('hidden');
    if (workspacePanel) workspacePanel.classList.remove('hidden');
    if (answerCard) answerCard.classList.add('hidden');
    if (btnHeaderReset) btnHeaderReset.disabled = false;

    showToast(t('toast_pdf_loaded', { pages: currentTotalPages, words: wordCount.toLocaleString() }), 'success');
  } catch (err) {
    console.error('PDF Extraction Error:', err);
    showToast(`Failed to parse PDF: ${err.message}`, 'error');
    resetWorkspace();
  }
}

/* ==========================================================================
   Question Handling & Worker Query Dispatch
   ========================================================================== */
function handleAskQuestion() {
  if (isAnalyzing) return;

  const question = userQuestionInput ? userQuestionInput.value.trim() : '';
  if (!question) {
    showToast(t('toast_empty_question'), 'warning');
    if (userQuestionInput) userQuestionInput.focus();
    return;
  }

  const context = window.extractedPdfText || extractedText;
  if (!context) {
    showToast(t('toast_no_text'), 'error');
    return;
  }

  // Rule 2: Lazy Initialize worker on explicit user interaction
  const worker = initWorkerIfNeeded();

  setAnalyzingState(true);
  if (answerCard) answerCard.classList.add('hidden');

  // Dispatch query to Web Worker
  worker.postMessage({
    type: 'query',
    question,
    context
  });
}

function displayAnswer(result) {
  if (!result || !answerCard || !answerText) return;

  answerText.textContent = result.answer || 'No answer found.';

  if (confidenceBadge) {
    confidenceBadge.textContent = `${t('confidence_label')} ${result.score}%`;
    if (result.score >= 70) {
      confidenceBadge.className = 'confidence-badge high';
    } else if (result.score >= 40) {
      confidenceBadge.className = 'confidence-badge medium';
    } else {
      confidenceBadge.className = 'confidence-badge low';
    }
  }

  if (answerDuration && result.durationMs) {
    answerDuration.textContent = `⚡ ${(result.durationMs / 1000).toFixed(2)}s on device`;
  }

  answerCard.classList.remove('hidden');
  answerCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  if (window.lucide) {
    lucide.createIcons();
  }
}

/* ==========================================================================
   UI Helpers & Progress Tracking
   ========================================================================== */
function showProgressCard(visible) {
  if (progressCard) {
    progressCard.classList.toggle('hidden', !visible);
  }
}

function updateProgressBar(percent, statusText, subtext) {
  const p = Math.min(100, Math.max(0, percent || 0));
  if (progressPercent) progressPercent.textContent = `${p}%`;
  if (progressFill) progressFill.style.width = `${p}%`;
  if (progressStatusText && statusText) progressStatusText.textContent = statusText;
  if (progressSubtext && subtext) progressSubtext.textContent = subtext;
}

function setAnalyzingState(active) {
  isAnalyzing = active;
  if (btnAskAi) btnAskAi.disabled = active;
  if (btnSpinner) btnSpinner.classList.toggle('hidden', !active);
  if (btnAskText) {
    btnAskText.textContent = active ? t('btn_analyzing') : t('btn_ask_ai');
  }
}

/* ==========================================================================
   Interactive Sample PDF Generator
   ========================================================================== */
async function loadSamplePDF() {
  try {
    showToast('Loading comprehensive AI sample document...', 'info');

    const sampleText = `=== PDFNetizen Cloud Architecture & Privacy Whitepaper ===

1. Executive Summary & Core Infrastructure
PDFNetizen provides 100% client-side document processing for modern web browsers. All document operations, including PDF merging, compression, splitting, optical character recognition (OCR), and neural question answering, execute completely inside the client device's browser sandbox.

2. On-Device AI Question Answering Specs
The AskPDF intelligent Q&A module utilizes a quantized ONNX DistilBERT neural model (distilbert-base-cased-distilled-squad) running inside a dedicated Web Worker via Transformers.js. The model download size is approximately 35 MB and is cached permanently in browser IndexedDB/CacheStorage for offline availability.

3. Zero-Server Privacy Guarantee
No document bytes, extracted text, embeddings, or query prompts are ever transmitted to any third-party or cloud server. Processing is compliant with GDPR, HIPAA, and CCPA standards because data never leaves localhost.

4. Performance & Memory Ceilings
The system enforces a strict 25 MB document ceiling to prevent browser tab crashes and memory overflow. On typical modern hardware, question answering inference takes between 0.25 and 1.20 seconds per query.

5. Key Contacts & Release Information
Published by: PDFNetizen Security & Machine Learning Core Team.
Release Version: 2.4.0-Production (Build 2026).
Primary License: MIT Open Ecosystem License.`;

    extractedText = sampleText;
    window.extractedPdfText = sampleText;
    currentFileName = 'PDFNetizen_AI_Whitepaper_Sample.pdf';
    currentTotalPages = 3;

    const wordCount = extractedText.split(/\s+/).filter(Boolean).length;
    if (fileNameDisplay) fileNameDisplay.textContent = currentFileName;
    if (fileSizeDisplay) fileSizeDisplay.textContent = '42.5 KB';
    if (filePagesDisplay) filePagesDisplay.textContent = '3 Pages';
    if (fileWordsDisplay) fileWordsDisplay.textContent = `${wordCount} Words`;

    if (contextContent) contextContent.textContent = extractedText;
    if (contextToggleBtn) contextToggleBtn.textContent = t('context_toggle_show', { words: wordCount });

    if (dropzone) dropzone.classList.add('hidden');
    if (workspacePanel) workspacePanel.classList.remove('hidden');
    if (answerCard) answerCard.classList.add('hidden');
    if (btnHeaderReset) btnHeaderReset.disabled = false;

    if (userQuestionInput) {
      userQuestionInput.value = 'What is the model download size?';
    }

    showToast('Sample PDF loaded! Click "Ask AI" to test local inference.', 'success');
  } catch (err) {
    showToast(`Error creating sample: ${err.message}`, 'error');
  }
}

/* ==========================================================================
   Workspace Reset & Utility Helpers
   ========================================================================== */
function resetWorkspace() {
  currentPdfBytes = null;
  currentFileName = 'document.pdf';
  currentTotalPages = 0;
  extractedText = '';
  window.extractedPdfText = '';
  isAnalyzing = false;

  if (fileInput) fileInput.value = '';
  if (userQuestionInput) userQuestionInput.value = '';
  if (workspacePanel) workspacePanel.classList.add('hidden');
  if (dropzone) dropzone.classList.remove('hidden');
  if (progressCard) progressCard.classList.add('hidden');
  if (answerCard) answerCard.classList.add('hidden');
  if (contextBox) contextBox.classList.add('hidden');
  if (btnHeaderReset) btnHeaderReset.disabled = true;

  setAnalyzingState(false);
}

function formatBytes(bytes, decimals = 1) {
  if (!bytes || bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function showToast(message, type = 'info') {
  if (!toastEl || !toastMsgEl) return;

  toastMsgEl.textContent = message;
  toastEl.className = `toast toast-${type}`;

  if (toastIconEl) {
    let iconName = 'info';
    if (type === 'success') iconName = 'check-circle-2';
    if (type === 'error') iconName = 'alert-triangle';
    if (type === 'warning') iconName = 'alert-circle';
    toastIconEl.setAttribute('data-lucide', iconName);
  }

  if (window.lucide) {
    lucide.createIcons();
  }

  toastEl.classList.remove('hidden');
  clearTimeout(toastEl._timer);
  toastEl._timer = setTimeout(() => {
    toastEl.classList.add('hidden');
  }, 4000);
}