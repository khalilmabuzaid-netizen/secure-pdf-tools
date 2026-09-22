/**
 * Smart PDF Summarizer Pro - In-Browser AI Assistant
 * 100% Client-Side • Transformers.js DistilBART Web Worker • Zero Server Uploads
 * 
 * 4 Golden Performance Rules:
 * 1. Web Worker Offloading (Module Worker for 60 FPS non-blocking UI).
 * 2. On-Demand Lazy Initialization (0 MB initial bundle impact).
 * 3. Quantized Model (DistilBART CNN 6-6 Quantized ~40 MB).
 * 4. User Transparency & Real-Time Progress Bar.
 */

// Define handleSelectedFile globally before any other imports or logic
window.handleSelectedFile = function(file) {
  if (!file) return;

  if (file.type && file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
    if (typeof showToast === 'function') {
      showToast(typeof t === 'function' ? t('toast_valid_pdf') : 'Please select a valid PDF file (.pdf)', 'warning');
    }
    const input = document.getElementById('pdf-file-input');
    if (input) input.value = '';
    return;
  }

  if (file.size > (50 * 1024 * 1024)) {
    if (typeof showToast === 'function') {
      showToast(typeof t === 'function' ? t('toast_file_size_limit') : 'File too large (maximum recommended size for in-browser AI is 50 MB).', 'error');
    }
    const input = document.getElementById('pdf-file-input');
    if (input) input.value = '';
    return;
  }

  if (typeof handlePdfFile === 'function') {
    handlePdfFile(file);
  } else if (typeof handleFileSelected === 'function') {
    handleFileSelected(file);
  }
};

// Configure PDF.js Worker
if (window.pdfjsLib) {
  window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
}

// Maximum file size protection (50MB) and Page Threshold (80 Pages)
const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024;
const MAX_PAGE_CEILING = 80;

// Merge tool-specific translations into global translations dictionary
if (typeof window !== 'undefined') {
  window.translations = window.translations || { en: {}, ar: {} };
  if (!window.translations.en) window.translations.en = {};
  if (!window.translations.ar) window.translations.ar = {};

  Object.assign(window.translations.en, {
    ask_pdf_title: "Ask PDF & Search",
    ask_pdf_desc: "Ask questions, search semantically, and get instant answers from your PDF locally with zero server uploads.",
    summarize_title: "Smart PDF Summarizer",
    summarize_desc: "Summarize PDF documents into concise bullet points or executive overviews locally with zero cloud uploads.",
    summarize_pdf_title: "Smart PDF Summarizer",
    summarize_pdf_desc: "Summarize PDF documents into concise bullet points or executive overviews locally with zero cloud uploads.",
    drop_pdf_here: "Drop your PDF file here",
    browse_file_btn: "Browse PDF File",
    client_engine_badge: "Client-Side DistilBART Neural Engine",
    size_limit_warning: "File too large (maximum recommended size for in-browser AI is 50 MB).",
    ask_placeholder: "e.g., What are the key findings or main topic of this document?",
    ask_btn: "Ask AI",
    summarize_btn: "Summarize Document",
    copy_btn: "Copy to Clipboard",
    export_btn: "Export as TXT",
    tool_summarize_pdf_title: "Smart PDF Summarizer",
    tool_summarize_pdf_desc: "Summarize PDF documents into concise bullet points or executive overviews locally with zero cloud uploads.",
    badge_client_side: "100% Local AI",
    nav_home: "Home",
    nav_annotator: "Annotator",
    nav_merge: "Merge PDF",
    nav_split: "Split PDF",
    nav_compress: "Compress PDF",
    nav_ocr: "OCR Extractor",
    nav_ask_pdf: "Ask PDF AI",
    nav_reset: "Reset",
    summarize_hero_badge: "Local & Secure • 100% In-Browser AI Summarization",
    summarize_hero_title: 'Smart AI <span class="gradient-text">PDF Summarizer</span>',
    summarize_hero_subtitle: "Generate clear bullet points or executive overviews from your PDF documents directly inside your browser. 100% private with zero cloud uploads.",
    summarize_notice_title: "Client-Side DistilBART Neural Engine",
    summarize_notice_desc: "One-time download (~40 MB). Runs 100% locally on your device and works offline.",
    summarize_page_advisory: "Document exceeds 80 pages. To ensure fast browser performance, the AI will summarize the first 80 pages.",
    summarize_dropzone_title: "Drop your PDF file here",
    summarize_dropzone_subtitle: "Drag and drop any PDF document under 50MB to generate an instant on-device AI summary, or browse from your device",
    btn_browse_file: "Browse PDF File",
    btn_load_sample: "Try Sample PDF",
    feature_local: "100% On-Device Neural Model",
    feature_offline: "Works Offline After 1st Download",
    feature_privacy: "Zero Server Uploads & Private",
    summarize_max_limit: "Up to 50 MB Safe Processing",
    btn_change_file: "Change File",
    summarize_label_format: "Summary Format",
    summarize_format_bullets: "Bullet Points",
    summarize_format_executive: "Executive Overview",
    summarize_label_length: "Summary Depth",
    summarize_length_short: "Key Takeaways",
    summarize_length_comprehensive: "Comprehensive",
    summarize_btn_generate: "Summarize Document",
    summarize_btn_generating: "Generating Summary...",
    summarize_progress_downloading: "Downloading Local AI Model (~40 MB)...",
    summarize_progress_ready: "AI Model Ready in Browser Memory",
    summarize_progress_analyzing: "Running on-device neural summarization...",
    summarize_progress_init: "Initializing ONNX Runtime WebAssembly...",
    summarize_output_title: "AI Generated Summary",
    btn_copy_summary: "Copy to Clipboard",
    btn_export_txt: "Export as TXT",
    btn_print_summary: "Print Summary",
    toast_copied: "Summary copied to clipboard!",
    toast_exported_txt: "Summary downloaded as text file.",
    toast_valid_pdf: "Please select a valid PDF file (.pdf)",
    toast_file_size_limit: "File too large (maximum recommended size for in-browser AI is 50 MB).",
    toast_no_text: "Could not extract readable text from this PDF. Please try a text-based PDF or OCR first.",
    toast_pdf_loaded: "Document loaded: {pages} pages ({words} words ready).",
    toast_sample_loaded: "Sample PDF loaded! Click \"Summarize Document\" to generate insights.",
    toast_sample_loading: "Loading comprehensive AI whitepaper sample...",
    footer_privacy: "Privacy Policy",
    footer_terms: "Terms of Service",
    footer_contact: "Contact Us",
    footer_copyright: "© 2026 PDFNetizen. 100% Client-Side Private Document Tools.",
    summarize_seo_badge: "On-Device Neural DistilBART Model",
    summarize_seo_title: "How to Summarize PDF Documents Online Privately",
    summarize_seo_subtitle: "Condense lengthy reports, legal agreements, academic research papers, and books into concise summaries using local in-browser artificial intelligence.",
    summarize_step1_title: "1. Upload PDF Document",
    summarize_step1_desc: "Drag and drop any PDF file up to 50MB. Text extraction executes 100% locally in your device memory.",
    summarize_step2_title: "2. Select Summary Style",
    summarize_step2_desc: "Choose between Key Bullet Points or an Executive Overview, and adjust depth from quick takeaways to comprehensive.",
    summarize_step3_title: "3. Generate AI Summary",
    summarize_step3_desc: "Click Summarize to initiate off-thread neural inference with automatic token window chunking.",
    summarize_step4_title: "4. Copy, Export or Print",
    summarize_step4_desc: "Copy the formatted insights to your clipboard, download as a text file, or print with clean document formatting.",
    summarize_faq_title: "Frequently Asked Questions",
    summarize_faq_q1: "Are my confidential PDF documents uploaded to external servers?",
    summarize_faq_a1: "No. All text extraction and neural summarization execute 100% locally inside your browser via WebAssembly and Web Workers. Your files never touch any external server.",
    summarize_faq_q2: "What is the maximum file size and page limit for summarization?",
    summarize_faq_a2: "The maximum recommended file size is 50 MB to ensure optimal browser memory performance. For documents exceeding 80 pages, the tool analyzes and summarizes the first 80 pages with chunked processing.",
    summarize_faq_q3: "Why is there a one-time ~40 MB download on first use?",
    summarize_faq_a3: "To guarantee complete privacy, a lightweight quantized ONNX neural model is cached directly in your browser. All future visits and summarization queries run instantly offline with 0 MB download.",
    summarize_faq_q4: "Can I export or print the generated summary?",
    summarize_faq_a4: "Yes! You can instantly copy the summary to your clipboard, export it as a plain text file (.txt), or use the built-in clean print formatting."
  });

  Object.assign(window.translations.ar, {
    ask_pdf_title: "اسأل PDF والبحث الذكي",
    ask_pdf_desc: "اطرح أسئلة وابحث ذكياً واستخرج إجابات فورية من مستندات PDF محلياً بالذكاء الاصطناعي دون أي رفع سحابي.",
    summarize_title: "تلخيص PDF الذكي",
    summarize_desc: "لخص مستندات PDF إلى نقاط أساسية أو نظرة عامة تنفيذية محلياً بالذكاء الاصطناعي دون أي رفع سحابي.",
    summarize_pdf_title: "تلخيص PDF الذكي",
    summarize_pdf_desc: "لخص مستندات PDF إلى نقاط أساسية أو نظرة عامة تنفيذية محلياً بالذكاء الاصطناعي دون أي رفع سحابي.",
    drop_pdf_here: "اسحب ملف PDF هنا",
    browse_file_btn: "استعراض ملف PDF",
    client_engine_badge: "محرك التلخيص العصبي DistilBART المحلي",
    size_limit_warning: "الملف كبير جداً (أقصى حجم موصى به للتلخيص المحلي هو 50 ميجابايت لتجنب إبطاء المتصفح).",
    ask_placeholder: "مثال: ما هو الموضوع الرئيسي أو النقاط الأساسية في هذا المستند؟",
    ask_btn: "اسأل الذكاء الاصطناعي",
    summarize_btn: "تلخيص المستند",
    copy_btn: "نسخ إلى الحافظة",
    export_btn: "تصدير كملف نصي TXT",
    tool_summarize_pdf_title: "تلخيص PDF الذكي",
    tool_summarize_pdf_desc: "لخص مستندات PDF إلى نقاط أساسية أو نظرة عامة تنفيذية محلياً بالذكاء الاصطناعي دون أي رفع سحابي.",
    badge_client_side: "ذكاء اصطناعي محلي ١٠٠٪",
    nav_home: "الرئيسية",
    nav_annotator: "محرر PDF",
    nav_merge: "دمج PDF",
    nav_split: "تقسيم PDF",
    nav_compress: "ضغط PDF",
    nav_ocr: "استخراج النصوص OCR",
    nav_ask_pdf: "اسأل PDF الذكي",
    nav_reset: "إعادة ضبط",
    summarize_hero_badge: "محلي وآمن • تلخيص ذكي في المتصفح ١٠٠٪",
    summarize_hero_title: 'تلخيص <span class="gradient-text">ملفات PDF</span> بالذكاء الاصطناعي',
    summarize_hero_subtitle: "استخرج نقاطاً رئيسية أو ملخصات تنفيذية دقيقة من مستندات PDF مباشرة في متصفحك. خصوصية كاملة وبدون خوادم سحابية.",
    summarize_notice_title: "محرك التلخيص العصبي DistilBART المحلي",
    summarize_notice_desc: "تنزيل لمرة واحدة (~40 ميجابايت). يعمل محلياً بالكامل على جهازك ويدعم العمل بدون إنترنت.",
    summarize_page_advisory: "يتجاوز المستند 80 صفحة. لضمان أداء المتصفح السريع، سيتم تلخيص أول 80 صفحة.",
    summarize_dropzone_title: "اسحب ملف PDF هنا",
    summarize_dropzone_subtitle: "اسحب وأفلت أي ملف PDF أقل من 50 ميجابايت لإنشاء تلخيص فوري بالذكاء الاصطناعي، أو تصفح من جهازك",
    btn_browse_file: "استعراض ملف PDF",
    btn_load_sample: "تجربة نموذج جاهز",
    feature_local: "نموذج عصبي محلي ١٠٠٪ على جهازك",
    feature_offline: "يعمل بدون إنترنت بعد أول تنزيل",
    feature_privacy: "بدون أي رفع للخوادم وأمان تام",
    summarize_max_limit: "معالجة آمنة حتى 50 ميجابايت",
    btn_change_file: "تغيير الملف",
    summarize_label_format: "تنسيق التلخيص",
    summarize_format_bullets: "نقاط رئيسية",
    summarize_format_executive: "نظرة عامة تنفيذية",
    summarize_label_length: "عمق التلخيص",
    summarize_length_short: "أهم النتائج (مختصر)",
    summarize_length_comprehensive: "شامل وتفصيلي",
    summarize_btn_generate: "تلخيص المستند",
    summarize_btn_generating: "جاري توليد التلخيص...",
    summarize_progress_downloading: "جاري تنزيل نموذج التلخيص العصبي الخفيف (~40 ميجابايت)...",
    summarize_progress_ready: "نموذج التلخيص جاهز في ذاكرة المتصفح",
    summarize_progress_analyzing: "جاري استنتاج التلخيص على جهازك...",
    summarize_progress_init: "جاري تهيئة بيئة WebAssembly لنظام ONNX...",
    summarize_output_title: "ملخص الذكاء الاصطناعي",
    btn_copy_summary: "نسخ إلى الحافظة",
    btn_export_txt: "تصدير كملف نصي TXT",
    btn_print_summary: "طباعة الملخص",
    toast_copied: "تم نسخ الملخص إلى الحافظة!",
    toast_exported_txt: "تم تنزيل الملخص كملف نصي.",
    toast_valid_pdf: "يرجى اختيار ملف PDF صالح (.pdf)",
    toast_file_size_limit: "الملف كبير جداً (أقصى حجم موصى به للتلخيص المحلي هو 50 ميجابايت لتجنب إبطاء المتصفح).",
    toast_no_text: "لم نتمكن من استخراج نص قابل للقراءة. يرجى تجربة مستند نصي أو استخدام أداة OCR أولاً.",
    toast_pdf_loaded: "تم تحميل المستند: {pages} صفحات ({words} كلمة جاهزة).",
    toast_sample_loaded: "تم تحميل نموذج PDF! انقر على \"تلخيص المستند\" لتوليد الملخص.",
    toast_sample_loading: "جاري تحميل مستند الذكاء الاصطناعي التجريبي...",
    footer_privacy: "سياسة الخصوصية",
    footer_terms: "شروط الخدمة",
    footer_contact: "اتصل بنا",
    footer_copyright: "© 2026 PDFNetizen. أدوات معالجة المستندات محلياً ١٠٠٪ بأمان وخصوصية.",
    summarize_seo_badge: "نموذج DistilBART العصبي في المتصفح",
    summarize_seo_title: "كيفية تلخيص مستندات PDF بالذكاء الاصطناعي محلياً",
    summarize_seo_subtitle: "اختصر التقارير المطولة والاتفاقيات القانونية والأوراق البحثية والكتب إلى ملخصات موجزة باستخدام الذكاء الاصطناعي المحلي.",
    summarize_step1_title: "١. رفع مستند PDF",
    summarize_step1_desc: "اسحب وأفلت أي ملف PDF حتى 50 ميجابايت. يتم استخراج النص محلياً ١٠٠٪ في ذاكرة جهازك.",
    summarize_step2_title: "٢. تحديد أسلوب التلخيص",
    summarize_step2_desc: "اختر بين نقاط رئيسية أو نظرة عامة تنفيذية، وحدد عمق التلخيص من مختصر إلى شامل.",
    summarize_step3_title: "٣. توليد التلخيص الذكي",
    summarize_step3_desc: "انقر على تلخيص لبدء الاستنتاج العصبي خارج الخيط الرئيسي مع تقسيم النصوص للنوافذ الآمنة.",
    summarize_step4_title: "٤. النسخ أو التصدير أو الطباعة",
    summarize_step4_desc: "انسخ النتائج للحافظة، أو حملها كملف نصي، أو اطبع الملخص بتنسيق مستندات نظيف.",
    summarize_faq_title: "الأسئلة الشائعة",
    summarize_faq_q1: "هل يتم رفع مستنداتي السرية إلى خوادم خارجية؟",
    summarize_faq_a1: "لا على الإطلاق. جميع عمليات استخراج النصوص والتلخيص العصبي تتم محلياً ١٠٠٪ في متصفحك عبر WebAssembly وWeb Workers. ملفاتك لا تلمس أي خادم خارجي.",
    summarize_faq_q2: "ما هو الحد الأقصى لحجم الملف وعدد الصفحات للتلخيص؟",
    summarize_faq_a2: "الحد الأقصى الموصى به لحجم الملف هو 50 ميجابايت لضمان الأداء المثالي للذاكرة. بالنسبة للمستندات التي تتجاوز 80 صفحة، تقوم الأداة بتحليل وتلخيص أول 80 صفحة.",
    summarize_faq_q3: "لماذا يوجد تنزيل لمرة واحدة بحجم ~40 ميجابايت عند أول استخدام؟",
    summarize_faq_a3: "لضمان الخصوصية التامة، يتم تخزين نموذج عصبي مكمم في ذاكرة المتصفح المؤقتة. جميع الزيارات والاستفسارات اللاحقة تعمل فورياً وبدون إنترنت بحجم 0 ميجابايت.",
    summarize_faq_q4: "هل يمكنني تصدير أو طباعة الملخص الناتج؟",
    summarize_faq_a4: "نعم! يمكنك نسخ الملخص فوراً إلى الحافظة، أو تصديره كملف نصي (.txt)، أو استخدام ميزة الطباعة المدمجة بتنسيق نظيف."
  });
}

// Application State (Initialize language preference from localStorage)
let currentLang = (typeof localStorage !== 'undefined' && (localStorage.getItem('pdfnetizen_lang') || localStorage.getItem('pdf_netizen_lang'))) || 'en';
let currentPdfBytes = null;
let currentFileName = 'document.pdf';
let currentTotalPages = 0;
let extractedText = '';
let currentFormat = 'bullets';
let currentLength = 'short';
let isSummarizing = false;
let isModelReady = false;
let lastSummaryResult = '';

// Web Worker instance (Rule 2: Lazy instantiated on user action)
let summarizeWorker = null;

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
let pageAdvisoryBanner = null;
let formatButtons = [];
let lengthButtons = [];
let btnSummarize = null;
let btnSummarizeText = null;
let summarizeSpinner = null;
let progressCard = null;
let progressStatusText = null;
let progressPercent = null;
let progressFill = null;
let progressSubtext = null;
let summaryOutputCard = null;
let summaryContent = null;
let summaryFormatBadge = null;
let summaryDurationBadge = null;
let btnCopySummary = null;
let btnExportTxt = null;
let btnPrintSummary = null;
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
  btnBrowseFile = document.getElementById('browse-btn') || document.getElementById('btn-browse-file') || document.querySelector('.browse-btn');
  btnLoadSample = document.getElementById('btn-load-sample');
  btnHeaderReset = document.getElementById('btn-header-reset');
  btnLanguageToggle = document.getElementById('lang-toggle') || document.getElementById('btn-language-toggle') || document.querySelector('.lang-switch-btn') || document.querySelector('.btn-language-toggle');
  langToggleText = document.getElementById('lang-toggle-text');
  pageAdvisoryBanner = document.getElementById('page-advisory-banner');
  
  formatButtons = Array.from(document.querySelectorAll('#format-control .segment-btn'));
  lengthButtons = Array.from(document.querySelectorAll('#length-control .segment-btn'));
  
  btnSummarize = document.getElementById('btn-summarize');
  btnSummarizeText = document.getElementById('btn-summarize-text');
  summarizeSpinner = document.getElementById('summarize-spinner');
  
  progressCard = document.getElementById('progress-card');
  progressStatusText = document.getElementById('progress-status-text');
  progressPercent = document.getElementById('progress-percent');
  progressFill = document.getElementById('progress-fill');
  progressSubtext = document.getElementById('progress-subtext');
  
  summaryOutputCard = document.getElementById('summary-output-card');
  summaryContent = document.getElementById('summary-content');
  summaryFormatBadge = document.getElementById('summary-format-badge');
  summaryDurationBadge = document.getElementById('summary-duration-badge');
  
  btnCopySummary = document.getElementById('btn-copy-summary');
  btnExportTxt = document.getElementById('btn-export-txt');
  btnPrintSummary = document.getElementById('btn-print-summary');
  
  toastEl = document.getElementById('toast');
  toastMsgEl = document.getElementById('toast-message');
  toastIconEl = document.getElementById('toast-icon');
}

// Translation Helper with global dictionary fallback
function t(key, replacements = {}) {
  const globalDict = (typeof window !== 'undefined' && (window.translations || window.I18N_TRANSLATIONS))
    ? (window.translations || window.I18N_TRANSLATIONS)
    : (typeof translations !== 'undefined' ? translations : null);
  const langDict = globalDict?.[currentLang] || globalDict?.en || {};
  
  let text = langDict?.[key] || key;

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

  // Persist preference to localStorage
  try {
    localStorage.setItem('pdfnetizen_lang', lang);
    localStorage.setItem('pdf_netizen_lang', lang);
  } catch (e) {
    console.warn('Could not save language preference:', e);
  }

  if (langToggleText) {
    langToggleText.textContent = isAr ? 'English' : 'العربية';
  }

  // Update static text elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translation = t(key);
    if (translation) {
      if (translation.includes('<span') || translation.includes('<b>') || translation.includes('<strong>')) {
        el.innerHTML = translation;
      } else {
        el.textContent = translation;
      }
    }
  });

  // Update button state text
  if (btnSummarizeText && !isSummarizing) {
    btnSummarizeText.textContent = t('summarize_btn_generate');
  }

  if (window.lucide) {
    lucide.createIcons();
  }
}

/* ==========================================================================
   Rule 2: On-Demand Lazy Web Worker Initialization
   ========================================================================== */
function initWorkerIfNeeded() {
  if (summarizeWorker) return summarizeWorker;

  showProgressCard(true);
  updateProgressBar(0, t('summarize_progress_downloading'), t('summarize_progress_init'));

  // Initialize ES module worker
  summarizeWorker = new Worker('summarize-worker.js', { type: 'module' });

  summarizeWorker.addEventListener('message', (event) => {
    const { status, progress, message, error, result, current, total } = event.data || {};

    if (status === 'progress') {
      const p = Math.round(progress || 0);
      updateProgressBar(p, t('summarize_progress_downloading'), `Downloading ONNX model: ${p}%`);
    } else if (status === 'ready') {
      isModelReady = true;
      updateProgressBar(100, t('summarize_progress_ready'), 'Model loaded and cached in browser memory.');
      setTimeout(() => {
        if (!isSummarizing) showProgressCard(false);
      }, 1000);
    } else if (status === 'analyzing') {
      updateProgressBar(30, t('summarize_progress_analyzing'), 'Chunking document into safe token windows...');
    } else if (status === 'chunk_progress') {
      const p = Math.round(((current || 1) / (total || 1)) * 100);
      updateProgressBar(p, t('summarize_progress_analyzing'), `Processing chunk ${current} of ${total}...`);
    } else if (status === 'complete') {
      setSummarizingState(false);
      showProgressCard(false);
      displaySummary(result);
    } else if (status === 'error') {
      setSummarizingState(false);
      showProgressCard(false);
      showToast(error || 'An error occurred during summarization.', 'error');
    }
  });

  summarizeWorker.addEventListener('error', (err) => {
    console.error('Worker Error:', err);
    setSummarizingState(false);
    showProgressCard(false);
    showToast(`Worker error: ${err.message}`, 'error');
  });

  return summarizeWorker;
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

  // File Upload Trigger Binding: Bind #browse-btn / .browse-btn to trigger hidden #pdf-file-input
  const browseElements = document.querySelectorAll('#browse-btn, .browse-btn, #btn-browse-file');
  const fileInputEl = document.getElementById('pdf-file-input') || fileInput;
  
  browseElements.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // If it's a LABEL containing the input, native browser behavior opens the file picker
      if (btn.tagName !== 'LABEL' && (!fileInputEl || !btn.contains(fileInputEl)) && fileInputEl) {
        e.preventDefault();
        fileInputEl.click();
      }
    });
  });

  if (fileInputEl) {
    fileInputEl.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        handlePdfFile(e.target.files[0]);
      }
    });
  }

  // Dropzone Handlers
  if (dropzone) {
    dropzone.addEventListener('click', (e) => {
      if (e.target.closest('button') || e.target.closest('label') || e.target.closest('#browse-btn')) return;
      if (fileInputEl) fileInputEl.click();
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
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.remove('drag-over');
      const files = e.dataTransfer ? e.dataTransfer.files : null;
      if (files && files.length > 0) {
        handlePdfFile(files[0]);
      }
    });
  }

  // Change File Button
  if (btnChangeFile) {
    btnChangeFile.addEventListener('click', () => {
      if (fileInput) fileInput.click();
    });
  }

  // Load Sample PDF
  if (btnLoadSample) {
    btnLoadSample.addEventListener('click', loadSamplePDF);
  }

  // Summarize Format Segmented Buttons
  formatButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      formatButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFormat = btn.getAttribute('data-format') || 'bullets';
    });
  });

  // Summarize Length Segmented Buttons
  lengthButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      lengthButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentLength = btn.getAttribute('data-length') || 'short';
    });
  });

  // Summarize Button Click
  if (btnSummarize) {
    btnSummarize.addEventListener('click', handleSummarizeDocument);
  }

  // Copy Summary Action
  if (btnCopySummary) {
    btnCopySummary.addEventListener('click', () => {
      if (!lastSummaryResult) return;
      navigator.clipboard.writeText(lastSummaryResult).then(() => {
        showToast(t('toast_copied'), 'success');
      }).catch(() => {
        showToast('Failed to copy to clipboard.', 'error');
      });
    });
  }

  // Export TXT Action
  if (btnExportTxt) {
    btnExportTxt.addEventListener('click', () => {
      if (!lastSummaryResult) return;
      const blob = new Blob([lastSummaryResult], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${currentFileName.replace(/\.pdf$/i, '')}_summary.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast(t('toast_exported_txt'), 'success');
    });
  }

  // Print Summary Action
  if (btnPrintSummary) {
    btnPrintSummary.addEventListener('click', () => {
      window.print();
    });
  }
}

/* ==========================================================================
   File Ingestion, Size Check (50MB) & Text Extraction (PDF.js)
   ========================================================================== */
function handlePdfFile(file) {
  return handleFileSelected(file);
}

async function handleFileSelected(file) {
  if (!file) return;

  // Validate strictly PDF MIME type and extension
  if (file.type && file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
    showToast(t('toast_valid_pdf'), 'warning');
    if (fileInput) fileInput.value = '';
    return;
  }

  // File size guard: Maximum 50 MB threshold
  if (file.size > MAX_FILE_SIZE_BYTES) {
    showToast(t('toast_file_size_limit'), 'error');
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

    // Page count ceiling check: If > 80 pages, advisory notice is shown and we cap extraction
    const pagesToExtract = Math.min(currentTotalPages, MAX_PAGE_CEILING);
    if (pageAdvisoryBanner) {
      pageAdvisoryBanner.classList.toggle('hidden', currentTotalPages <= MAX_PAGE_CEILING);
    }

    let fullText = '';
    for (let pageNum = 1; pageNum <= pagesToExtract; pageNum++) {
      const page = await pdfDoc.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      if (pageText.trim()) {
        fullText += `--- Page ${pageNum} ---\n${pageText}\n\n`;
      }
    }

    extractedText = fullText.trim();

    if (!extractedText) {
      showToast(t('toast_no_text'), 'warning');
    }

    // Update Overview UI
    const wordCount = extractedText ? extractedText.split(/\s+/).filter(Boolean).length : 0;
    if (fileNameDisplay) fileNameDisplay.textContent = filename;
    if (fileSizeDisplay) fileSizeDisplay.textContent = formatBytes(sizeBytes || bytes.byteLength);
    if (filePagesDisplay) filePagesDisplay.textContent = `${currentTotalPages} Pages`;
    if (fileWordsDisplay) fileWordsDisplay.textContent = `${wordCount.toLocaleString()} Words`;

    // Switch view to workspace
    if (dropzone) dropzone.classList.add('hidden');
    if (workspacePanel) workspacePanel.classList.remove('hidden');
    if (summaryOutputCard) summaryOutputCard.classList.add('hidden');
    if (btnHeaderReset) btnHeaderReset.disabled = false;

    showToast(t('toast_pdf_loaded', { pages: currentTotalPages, words: wordCount.toLocaleString() }), 'success');
  } catch (err) {
    console.error('PDF Extraction Error:', err);
    showToast(`Failed to parse PDF: ${err.message}`, 'error');
    resetWorkspace();
  }
}

/* ==========================================================================
   Summarization Dispatch & Rendering
   ========================================================================== */
function handleSummarizeDocument() {
  if (isSummarizing) return;

  if (!extractedText) {
    showToast(t('toast_no_text'), 'error');
    return;
  }

  // Rule 2: Lazy Initialize worker on explicit user interaction
  const worker = initWorkerIfNeeded();

  setSummarizingState(true);
  if (summaryOutputCard) summaryOutputCard.classList.add('hidden');

  // Dispatch query to Web Worker
  worker.postMessage({
    type: 'summarize',
    text: extractedText,
    format: currentFormat,
    length: currentLength,
    maxPages: MAX_PAGE_CEILING
  });
}

function displaySummary(result) {
  if (!result || !summaryOutputCard || !summaryContent) return;

  lastSummaryResult = result.summary || 'No summary could be generated.';
  summaryContent.textContent = lastSummaryResult;

  if (summaryFormatBadge) {
    summaryFormatBadge.textContent = result.format === 'bullets' ? t('summarize_format_bullets') : t('summarize_format_executive');
  }

  if (summaryDurationBadge && result.durationMs) {
    summaryDurationBadge.textContent = `⚡ ${(result.durationMs / 1000).toFixed(2)}s on device`;
  }

  summaryOutputCard.classList.remove('hidden');
  summaryOutputCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

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

function setSummarizingState(active) {
  isSummarizing = active;
  if (btnSummarize) btnSummarize.disabled = active;
  if (summarizeSpinner) summarizeSpinner.classList.toggle('hidden', !active);
  if (btnSummarizeText) {
    btnSummarizeText.textContent = active ? t('summarize_btn_generating') : t('summarize_btn_generate');
  }
}

/* ==========================================================================
   Interactive Sample PDF Generator
   ========================================================================== */
async function loadSamplePDF() {
  try {
    showToast(t('toast_sample_loading'), 'info');

    const sampleText = `=== PDFNetizen AI Document Architecture & Privacy Framework ===

1. Executive Summary & Overview
PDFNetizen is a high-performance web platform that processes PDF and multimedia files 100% client-side inside the user's browser sandbox. By running WebAssembly and Web Workers directly on localhost, documents are never uploaded to any remote servers, ensuring enterprise-grade data privacy and GDPR/HIPAA compliance.

2. On-Device Neural Summarization Specifications
The Smart PDF Summarizer utilizes a quantized ONNX DistilBART neural model (distilbart-cnn-6-6) running inside a dedicated Web Worker via Transformers.js. The model download size is approximately 40 MB and is permanently cached in IndexedDB/CacheStorage for instant offline availability on all subsequent visits.

3. Chunking & Sliding Window Algorithm
To handle lengthy multi-page documents without exceeding neural attention limits, document text is broken into overlapping 400-word windows. Each chunk is processed sequentially, and the resulting insights are formatted into structured bullet points or executive overviews.

4. Performance Ceilings & Safety Guards
A safety ceiling of 50 MB prevents browser tab crashes and memory overflow. On standard consumer hardware, each chunk takes approximately 0.4 to 1.2 seconds to process, providing rapid turnarounds for academic papers, legal agreements, and corporate filings.`;

    extractedText = sampleText;
    currentFileName = 'PDFNetizen_AI_Architecture_Whitepaper.pdf';
    currentTotalPages = 4;

    const wordCount = extractedText.split(/\s+/).filter(Boolean).length;
    if (fileNameDisplay) fileNameDisplay.textContent = currentFileName;
    if (fileSizeDisplay) fileSizeDisplay.textContent = '38.4 KB';
    if (filePagesDisplay) filePagesDisplay.textContent = '4 Pages';
    if (fileWordsDisplay) fileWordsDisplay.textContent = `${wordCount} Words`;

    if (pageAdvisoryBanner) pageAdvisoryBanner.classList.add('hidden');
    if (dropzone) dropzone.classList.add('hidden');
    if (workspacePanel) workspacePanel.classList.remove('hidden');
    if (summaryOutputCard) summaryOutputCard.classList.add('hidden');
    if (btnHeaderReset) btnHeaderReset.disabled = false;

    showToast(t('toast_sample_loaded'), 'success');
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
  isSummarizing = false;
  lastSummaryResult = '';

  if (fileInput) fileInput.value = '';
  if (workspacePanel) workspacePanel.classList.add('hidden');
  if (dropzone) dropzone.classList.remove('hidden');
  if (progressCard) progressCard.classList.add('hidden');
  if (summaryOutputCard) summaryOutputCard.classList.add('hidden');
  if (pageAdvisoryBanner) pageAdvisoryBanner.classList.add('hidden');
  if (btnHeaderReset) btnHeaderReset.disabled = true;

  setSummarizingState(false);
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
