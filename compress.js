/**
 * CompressPDF Pro - Client-Side PDF Compression Tool
 * Built with Mozilla PDF.js (page rendering) and jsPDF (compressed document synthesis)
 * 100% Client-Side Processing • Strict Memory Protection (25MB Limit) • Zero Server Uploads
 * Full Bilingual English / Arabic (RTL) Support
 */

// Configure PDF.js Worker
if (window.pdfjsLib) {
  window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
}

// Memory Protection Limit: 25MB in bytes
const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024;
const MEMORY_WARNING_TEXT = "For optimal browser performance and 100% privacy, please select a PDF under 25MB.";

// Multi-language translation dictionary
const translations = {
  en: {
    badge_client_side: "100% Client-Side",
    nav_home: "Home",
    nav_annotator: "Annotator",
    nav_merge: "Merge PDF",
    nav_split: "Split PDF",
    nav_reset: "Reset",
    hero_badge: "Local & Secure • 100% Client-Side Compression • No Cloud Uploads",
    hero_title: 'Compress & Optimize <span class="gradient-text">PDF Files</span> Instantly',
    hero_subtitle: "Reduce document file size with smart quality presets right inside your browser without sacrificing legibility.",
    alert_title: "Memory Protection Alert",
    alert_message: "For optimal browser performance and 100% privacy, please select a PDF under 25MB.",
    alert_text_optimized_title: "File Already Optimized",
    alert_text_optimized: "This file is mostly text and is already highly optimized. It cannot be compressed further without losing data.",
    dropzone_title: "Drop your PDF file here",
    dropzone_subtitle: "Drag and drop any PDF file under 25MB to reduce its size, or browse from your computer",
    btn_browse_file: "Browse PDF File",
    btn_load_sample: "Try Sample PDF",
    feature_quality: "High, Medium & Low Quality",
    feature_memory: "Memory Protected (Max 25MB)",
    feature_client: "100% Client-Side Engine",
    btn_change_file: "Change File",
    label_quality: "Compression Quality",
    opt_extreme: "Low Quality (Maximum Compression ~80%)",
    opt_balanced: "Medium Quality (Balanced ~60%)",
    opt_light: "High Quality (Light Compression ~30%)",
    preset_low_title: "Low Quality",
    preset_low_desc: "Maximum size reduction (~75-90%). Ideal for email limits and fast sharing.",
    preset_low_savings: "Max Reduction",
    preset_recommended: "Recommended",
    preset_med_title: "Medium Quality",
    preset_med_desc: "Balanced compression maintaining great readability with ~50-70% size reduction.",
    preset_med_savings: "~65% Smaller",
    preset_high_title: "High Quality",
    preset_high_desc: "Crisp text and sharp images with mild compression (~25-40% reduction).",
    preset_high_savings: "Preserve Quality",
    label_finetune: "Fine-Tune Quality Level",
    label_output_filename: "Output File Name",
    placeholder_output_filename: "compressed_document",
    progress_compressing: "Compressing pages...",
    stat_original_size: "Original Size",
    stat_compressed_size: "Compressed Size",
    btn_cancel: "Cancel",
    btn_compress_download: "Compress & Download PDF",
    btn_compressing: "Compressing PDF...",
    page_singular: "Page",
    pages_plural: "Pages",
    total_suffix: "Total",
    savings_smaller: "{n}% Smaller ({saved} saved)",
    savings_optimized: "Optimized",
    savings_already_optimal: "Already Optimal",
    savings_kept_original: "Kept Original",
    msg_already_optimal: "Your document is already maximally compact. Retained original file to preserve quality and smallest size.",
    stat_original_preserved: "Original preserved ({size})",
    rendering_page: "Rendering page {current} of {total}...",
    compressing_page: "Compressing page {current} ({quality}% quality)...",
    processed_page: "Processed page {current} of {total}",
    generating_pdf: "Generating optimized PDF file...",
    downloading_doc: "Done! Downloading compressed document...",
    toast_valid_pdf: "Please select a valid PDF file (.pdf)",
    toast_invalid_type: "Please upload a valid PDF document.",
    toast_read_fail: "Failed to read the selected file.",
    toast_pdf_loaded: "PDF loaded: {pages} ready for compression.",
    toast_compress_success: "PDF compressed successfully! ({n}% size reduction)",
    toast_already_compact: "Your document is already maximally compact. Retained original file to preserve quality and smallest size.",
    toast_upload_first: "Please upload a PDF document first.",
    toast_sample_generating: "Generating sample multi-page document...",
    toast_sample_error: "Error creating sample: ",
    compress_seo_badge: "Smart Client-Side Optimization",
    compress_seo_title: "How to Compress & Reduce PDF File Size Online",
    compress_seo_subtitle: "Shrink heavy PDF documents with intelligent quality presets while maintaining crisp text and 100% client-side privacy.",
    compress_step1_title: "1. Upload Your PDF File",
    compress_step1_desc: "Select any PDF document up to 25MB to begin on-device compression directly inside your browser.",
    compress_step2_title: "2. Choose Compression Level",
    compress_step2_desc: "Select Low Quality (maximum reduction), Medium Quality (recommended balance), or High Quality (crisp graphics).",
    compress_step3_title: "3. Compress & Save",
    compress_step3_desc: "Click Compress & Download to process pages in real-time, view your saved kilobytes, and download your optimized PDF.",
    compress_faq_title: "Frequently Asked Questions",
    compress_faq_q1: "Are my documents uploaded to a remote server for compression?",
    compress_faq_a1: "No. Our compression engine runs with 100% client-side processing. With no server uploads, your private financial, legal, and personal files stay securely on your computer.",
    compress_faq_q2: "How much file size reduction can I expect?",
    compress_faq_a2: "Depending on your selected preset and original image density, you can achieve between 30% and 85% reduction in total file size, making documents ideal for email attachments.",
    compress_faq_q3: "Why is there a 25MB file limit for compression?",
    compress_faq_a3: "Because processing runs entirely within your device's browser memory, the 25MB threshold prevents browser tab crashes and guarantees lightning-fast performance on all devices."
  },
  ar: {
    badge_client_side: "محلي ١٠٠٪ في المتصفح",
    nav_home: "الرئيسية",
    nav_annotator: "محرر PDF",
    nav_merge: "دمج PDF",
    nav_split: "تقسيم PDF",
    nav_reset: "إعادة ضبط",
    hero_badge: "محلي وآمن • ضغط ١٠٠٪ في المتصفح • بدون رفع سحابي",
    hero_title: 'ضغط وتحسين <span class="gradient-text">ملفات PDF</span> فوراً',
    hero_subtitle: "قلل حجم ملفات PDF باستخدام إعدادات جودة ذكية مباشرة في متصفحك دون التأثير على وضوح القراءة.",
    alert_title: "تنبيه حماية الذاكرة",
    alert_message: "للحفاظ على أفضل أداء للمتصفح وخصوصية تامة ١٠٠٪، يرجى اختيار ملف PDF أقل من 25 ميجابايت.",
    alert_text_optimized_title: "الملف مُحسَّن بالفعل",
    alert_text_optimized: "هذا الملف يحتوي على نصوص في الغالب وهو مُحسَّن ومضغوط بالفعل بأعلى كفاءة. لا يمكن ضغطه أكثر من ذلك دون فقدان البيانات.",
    dropzone_title: "اسحب ملف PDF هنا",
    dropzone_subtitle: "اسحب وأفلت أي ملف PDF أقل من 25 ميجابايت لتقليل حجمه، أو تصفح من جهازك",
    btn_browse_file: "استعراض ملف PDF",
    btn_load_sample: "تجربة نموذج جاهز",
    feature_quality: "جودة عالية، متوسطة، ومنخفضة",
    feature_memory: "حماية الذاكرة (حد أقصى 25 ميجابايت)",
    feature_client: "محرك محلي ١٠٠٪ في المتصفح",
    btn_change_file: "تغيير الملف",
    label_quality: "جودة الضغط",
    opt_extreme: "جودة منخفضة (أقصى ضغط ~80%)",
    opt_balanced: "جودة متوسطة (متوازنة ~60%)",
    opt_light: "جودة عالية (ضغط خفيف ~30%)",
    preset_low_title: "جودة منخفضة",
    preset_low_desc: "أقصى تقليل للحجم (~75-90%). مثالي لحدود البريد الإلكتروني والمشاركة السريعة.",
    preset_low_savings: "أقصى تقليل للحجم",
    preset_recommended: "موصى به",
    preset_med_title: "جودة متوسطة",
    preset_med_desc: "ضغط متوازن يحافظ على وضوح ممتاز مع تقليل الحجم بنسبة ~50-70%.",
    preset_med_savings: "أصغر بنسبة ~65%",
    preset_high_title: "جودة عالية",
    preset_high_desc: "نصوص وصور حادة وواضحة مع ضغط خفيف (تقليل ~25-40%).",
    preset_high_savings: "الحفاظ على الجودة",
    label_finetune: "ضبط دقيق لمستوى الجودة",
    label_output_filename: "اسم الملف الناتج",
    placeholder_output_filename: "compressed_document",
    progress_compressing: "جاري ضغط الصفحات...",
    stat_original_size: "الحجم الأصلي",
    stat_compressed_size: "الحجم بعد الضغط",
    btn_cancel: "إلغاء",
    btn_compress_download: "ضغط وتنزيل PDF",
    btn_compressing: "جاري ضغط المستند...",
    page_singular: "صفحة",
    pages_plural: "صفحات",
    total_suffix: "إجمالي",
    savings_smaller: "أصغر بنسبة {n}٪ (تم توفير {saved})",
    savings_optimized: "تم التحسين بنجاح",
    savings_already_optimal: "المستند بحجمه الأمثل",
    savings_kept_original: "تم الإبقاء على الأصل",
    msg_already_optimal: "المستند مضغوط ومحسّن بالفعل لأقصى درجة. تم الاحتفاظ بالملف الأصلي للحفاظ على الجودة وأصغر حجم.",
    stat_original_preserved: "تم الإبقاء على الأصل ({size})",
    rendering_page: "جاري تصيير الصفحة {current} من {total}...",
    compressing_page: "جاري ضغط الصفحة {current} (جودة {quality}%)...",
    processed_page: "تمت معالجة الصفحة {current} من {total}",
    generating_pdf: "جاري توليد ملف PDF المحسّن...",
    downloading_doc: "اكتمل! جاري تنزيل المستند المضغوط...",
    toast_valid_pdf: "يرجى اختيار ملف PDF صالح (.pdf)",
    toast_invalid_type: "يرجى رفع مستند PDF صالح.",
    toast_read_fail: "فشل في قراءة الملف المحدد.",
    toast_pdf_loaded: "تم تحميل PDF: {pages} جاهزة للضغط.",
    toast_compress_success: "تم ضغط ملف PDF بنجاح! (تقليل الحجم بنسبة {n}٪)",
    toast_already_compact: "المستند مضغوط ومحسّن بالفعل لأقصى درجة. تم الاحتفاظ بالملف الأصلي للحفاظ على الجودة وأصغر حجم.",
    toast_upload_first: "يرجى رفع مستند PDF أولاً.",
    toast_sample_generating: "جاري توليد نموذج مستند متعدد الصفحات...",
    toast_sample_error: "حدث خطأ أثناء إنشاء النموذج: ",
    compress_seo_badge: "ضغط ذكي للبيانات في المتصفح",
    compress_seo_title: "كيفية ضغط وتقليل حجم ملفات PDF عبر الإنترنت",
    compress_seo_subtitle: "قلل حجم ملفات PDF الكبيرة مع خيارات جودة ذكية تحافظ على وضوح النصوص وخصوصية محلية ١٠٠٪.",
    compress_step1_title: "١. رفع ملف PDF",
    compress_step1_desc: "اختر أي مستند PDF بحجم يصل حتى 25 ميجابايت لبدء الضغط محلياً داخل متصفحك.",
    compress_step2_title: "٢. اختيار مستوى الضغط",
    compress_step2_desc: "اختر جودة منخفضة (أقصى تقليل للحجم)، أو متوسطة (توازن مثالي موصى به)، أو عالية (وضوح تام للرسومات).",
    compress_step3_title: "٣. الضغط والتنزيل",
    compress_step3_desc: "اضغط على ضغط وتنزيل PDF لمعالجة الصفحات فورياً، ومعاينة المساحة الموفرة، وتحميل الملف المضغوط.",
    compress_faq_title: "الأسئلة الشائعة",
    compress_faq_q1: "هل يتم نقل مستنداتي إلى خوادم خارجية لضغطها؟",
    compress_faq_a1: "لا على الإطلاق. يعمل محرك الضغط بمعالجة محلية ١٠٠٪. وبدون أي رفع للخوادم، تبقى مستنداتك المالية والقانونية آمنة على جهازك.",
    compress_faq_q2: "ما مقدار تقليل الحجم الذي يمكنني توقعه؟",
    compress_faq_a2: "بناءً على الإعداد المختار ونوعية الصور في المستند، يمكنك تقليل الحجم بنسبة تتراوح بين 30% إلى 85%، مما يجعله مثالياً للإرسال عبر البريد الإلكتروني.",
    compress_faq_q3: "لماذا يوجد حد أقصى 25 ميجابايت لضغط الملفات؟",
    compress_faq_a3: "نظراً لأن المعالجة تتم بالكامل داخل ذاكرة المتصفح في جهازك، فإن هذا الحد يضمن استقرار المتصفح وسرعة الأداء دون أي تهنيج."
  }
};

// Compression Presets Configuration
const COMPRESSION_PRESETS = {
  extreme: {
    name: "Low Quality (Max Compression)",
    renderScale: 0.75,
    jpegQuality: 0.35,
    sliderValue: 35
  },
  balanced: {
    name: "Medium Quality (Balanced)",
    renderScale: 1.0,
    jpegQuality: 0.60,
    sliderValue: 60
  },
  light: {
    name: "High Quality (Mild Compression)",
    renderScale: 1.25,
    jpegQuality: 0.80,
    sliderValue: 80
  }
};

// Application State
let currentPdfBytes = null;
let currentFileName = "document.pdf";
let currentTotalPages = 0;
let currentFileSize = 0;
let selectedPreset = "balanced";
let currentQualityValue = 60; // percentage (20 - 95)
let isCompressing = false;
let currentLang = 'en';

// Cached DOM Elements
let dropzone = null;
let fileInput = null;
let configPanel = null;
let memoryAlertBox = null;
let alertTitleEl = null;
let alertMessageEl = null;
let btnCloseAlert = null;
let qualityDropdown = null;
let qualitySlider = null;
let sliderQualityVal = null;
let outputFilenameInput = null;
let btnExecuteCompress = null;
let btnExecuteText = null;
let btnSpinner = null;
let btnBrowseFile = null;
let btnLoadSample = null;
let btnChangeFile = null;
let btnCancelCompress = null;
let btnHeaderReset = null;
let btnLanguageToggle = null;
let langToggleText = null;
let fileNameDisplay = null;
let fileSizeDisplay = null;
let filePagesDisplay = null;
let progressCard = null;
let progressStatusText = null;
let progressPercent = null;
let progressFill = null;
let progressSubtext = null;
let resultCard = null;
let statOriginalSize = null;
let statCompressedSize = null;
let savingsBadge = null;
let savingsBadgeIcon = null;
let savingsPercent = null;
let resultNotice = null;
let resultNoticeText = null;
let lastCompressionResult = null;
let toastEl = null;
let toastMsgEl = null;
let toastIconEl = null;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  cacheDOMElements();
  bindEventListeners();
  applyLanguage(currentLang);

  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
});

function cacheDOMElements() {
  dropzone = document.getElementById('dropzone');
  fileInput = document.getElementById('pdf-file-input');
  configPanel = document.getElementById('config-panel');
  memoryAlertBox = document.getElementById('memory-alert-box');
  alertTitleEl = document.getElementById('alert-title');
  alertMessageEl = document.getElementById('alert-message');
  btnCloseAlert = document.getElementById('btn-close-alert');
  qualityDropdown = document.getElementById('quality-select-dropdown');
  qualitySlider = document.getElementById('quality-slider');
  sliderQualityVal = document.getElementById('slider-quality-val');
  outputFilenameInput = document.getElementById('output-filename');
  btnExecuteCompress = document.getElementById('btn-execute-compress');
  btnExecuteText = document.getElementById('btn-execute-text');
  btnSpinner = document.getElementById('btn-spinner');
  btnBrowseFile = document.getElementById('btn-browse-file');
  btnLoadSample = document.getElementById('btn-load-sample');
  btnChangeFile = document.getElementById('btn-change-file');
  btnCancelCompress = document.getElementById('btn-cancel-compress');
  btnHeaderReset = document.getElementById('btn-header-reset');
  btnLanguageToggle = document.getElementById('btn-language-toggle');
  langToggleText = document.getElementById('lang-toggle-text');
  fileNameDisplay = document.getElementById('file-name-display');
  fileSizeDisplay = document.getElementById('file-size-display');
  filePagesDisplay = document.getElementById('file-pages-display');
  progressCard = document.getElementById('progress-card');
  progressStatusText = document.getElementById('progress-status-text');
  progressPercent = document.getElementById('progress-percent');
  progressFill = document.getElementById('progress-fill');
  progressSubtext = document.getElementById('progress-subtext');
  resultCard = document.getElementById('result-card');
  statOriginalSize = document.getElementById('stat-original-size');
  statCompressedSize = document.getElementById('stat-compressed-size');
  savingsBadge = document.getElementById('savings-badge');
  savingsBadgeIcon = document.getElementById('savings-badge-icon');
  savingsPercent = document.getElementById('savings-percent');
  resultNotice = document.getElementById('result-notice');
  resultNoticeText = document.getElementById('result-notice-text');
  toastEl = document.getElementById('toast');
  toastMsgEl = document.getElementById('toast-message');
  toastIconEl = document.getElementById('toast-icon');
}

// Translation helper
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

  // Update active file pages display if file is loaded
  if (currentTotalPages > 0 && filePagesDisplay) {
    const pageLabel = currentTotalPages === 1 ? t('page_singular') : t('pages_plural');
    filePagesDisplay.textContent = `${currentTotalPages} ${pageLabel} ${t('total_suffix')}`;
  }

  // Update button text state if not compressing
  if (btnExecuteText && !isCompressing) {
    btnExecuteText.textContent = t('btn_compress_download');
  }

  // Update dynamic compression result display if result card is active
  if (lastCompressionResult && resultCard && !resultCard.classList.contains('hidden')) {
    if (lastCompressionResult.isSmaller) {
      if (statCompressedSize) {
        statCompressedSize.textContent = formatBytes(lastCompressionResult.finalSize);
      }
      if (savingsPercent) {
        savingsPercent.textContent = t('savings_smaller', {
          n: lastCompressionResult.reductionPercentStr,
          saved: formatBytes(lastCompressionResult.bytesSaved)
        });
      }
    } else {
      if (statCompressedSize) {
        statCompressedSize.textContent = t('stat_original_preserved', {
          size: formatBytes(lastCompressionResult.originalSize)
        });
      }
      if (savingsPercent) {
        savingsPercent.textContent = t('savings_already_optimal');
      }
      if (resultNoticeText) {
        resultNoticeText.textContent = t('msg_already_optimal');
      }
    }
  }

  if (window.lucide) {
    lucide.createIcons();
  }
}

function bindEventListeners() {
  // Alert Dismissal
  if (btnCloseAlert) {
    btnCloseAlert.addEventListener('click', () => hideMemoryAlert());
  }

  // Language Toggle Button
  if (btnLanguageToggle) {
    btnLanguageToggle.addEventListener('click', toggleLanguage);
  }

  // File Upload Trigger via Button
  if (btnBrowseFile && fileInput) {
    btnBrowseFile.addEventListener('click', () => fileInput.click());
  }

  // Dropzone Drag & Drop Handlers
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
        const file = e.dataTransfer.files[0];
        if (file) {
          handleFileSelected(file);
        }
      }
    });
  }

  // File Input Change Listener
  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files.length > 0) {
        handleFileSelected(e.target.files[0]);
      }
    });
  }

  // Sample PDF Loader
  if (btnLoadSample) {
    btnLoadSample.addEventListener('click', () => loadSamplePDF());
  }

  // File Change and Workspace Reset
  if (btnChangeFile) {
    btnChangeFile.addEventListener('click', () => {
      if (fileInput) fileInput.click();
    });
  }

  if (btnCancelCompress) {
    btnCancelCompress.addEventListener('click', resetWorkspace);
  }

  if (btnHeaderReset) {
    btnHeaderReset.addEventListener('click', resetWorkspace);
  }

  // Quality Dropdown Selector
  if (qualityDropdown) {
    qualityDropdown.addEventListener('change', (e) => {
      const level = e.target.value;
      selectPreset(level);
    });
  }

  // Preset Cards Selection
  document.querySelectorAll('.preset-card[data-level]').forEach(card => {
    card.addEventListener('click', () => {
      const level = card.getAttribute('data-level');
      selectPreset(level);
    });
  });

  // Fine-Tune Quality Slider
  if (qualitySlider) {
    qualitySlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      currentQualityValue = val;
      if (sliderQualityVal) sliderQualityVal.textContent = `${val}%`;

      // Update preset highlights based on slider value
      updatePresetHighlightForSlider(val);
    });
  }

  // Execute Compression & Download Action
  if (btnExecuteCompress) {
    btnExecuteCompress.addEventListener('click', executeCompressionAndDownload);
  }
}

/* ==========================================================================
   Memory Protection & Alert Handling
   ========================================================================== */
function showMemoryAlert(isError = true, message = null, title = null) {
  if (!memoryAlertBox) return;

  const resolvedTitle = title || t('alert_title');
  const resolvedMessage = message || t('alert_message');

  if (alertTitleEl) alertTitleEl.textContent = resolvedTitle;
  if (alertMessageEl) alertMessageEl.textContent = resolvedMessage;

  memoryAlertBox.className = `alert-box ${isError ? 'alert-danger' : ''}`;
  memoryAlertBox.classList.remove('hidden');

  // Scroll to alert for instant user feedback
  memoryAlertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function hideMemoryAlert() {
  if (memoryAlertBox) {
    memoryAlertBox.classList.add('hidden');
  }
}

/* ==========================================================================
   File Ingestion & Validation
   ========================================================================== */
function handleFileSelected(file) {
  if (!file) return;

  // 1. Strict File Type Check
  if (file.type && file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
    showToast(t('toast_valid_pdf'), "warning");
    showMemoryAlert(true, t('toast_invalid_type'), t('alert_title'));
    if (fileInput) fileInput.value = '';
    return;
  }

  // 2. CRITICAL MEMORY PROTECTION CHECK
  // Immediately halt execution if file exceeds 25MB ceiling
  if (file.size > MAX_FILE_SIZE_BYTES) {
    if (fileInput) fileInput.value = '';
    showMemoryAlert(true, t('alert_message'), t('alert_title'));
    showToast(t('alert_message'), "error");
    return;
  }

  // Hide any previous memory alerts on valid file upload
  hideMemoryAlert();

  // Read ArrayBuffer for client-side processing
  const reader = new FileReader();
  reader.onload = async function (e) {
    const rawBuffer = e.target.result;
    currentPdfBytes = new Uint8Array(rawBuffer);
    currentFileName = file.name || "document.pdf";
    currentFileSize = file.size || currentPdfBytes.byteLength;
    await processLoadedPdfBytes(currentPdfBytes, currentFileName, currentFileSize);
  };
  reader.onerror = function () {
    showToast(t('toast_read_fail'), "error");
  };
  reader.readAsArrayBuffer(file);
}

async function processLoadedPdfBytes(bytes, filename, sizeBytes) {
  try {
    if (!window.pdfjsLib) {
      throw new Error("PDF.js library is not loaded. Please check your internet connection.");
    }

    // Inspect page count and structure via PDF.js
    const loadingTask = pdfjsLib.getDocument({ data: bytes.slice(0) });
    const pdfDoc = await loadingTask.promise;
    currentTotalPages = pdfDoc.numPages;

    if (currentTotalPages === 0) {
      throw new Error("The selected document contains no pages.");
    }

    // Update Overview Card UI
    const pageLabel = currentTotalPages === 1 ? t('page_singular') : t('pages_plural');
    if (fileNameDisplay) fileNameDisplay.textContent = filename;
    if (filePagesDisplay) filePagesDisplay.textContent = `${currentTotalPages} ${pageLabel} ${t('total_suffix')}`;
    if (fileSizeDisplay) fileSizeDisplay.textContent = formatBytes(sizeBytes || bytes.byteLength);

    // Populate default output filename
    if (outputFilenameInput) {
      const base = filename.replace(/\.pdf$/i, '');
      outputFilenameInput.value = `${base}_compressed`;
    }

    // Switch Views
    if (dropzone) dropzone.classList.add('hidden');
    if (configPanel) configPanel.classList.remove('hidden');
    if (resultCard) resultCard.classList.add('hidden');
    if (progressCard) progressCard.classList.add('hidden');
    if (btnHeaderReset) btnHeaderReset.disabled = false;

    // Set Recommended Balanced Preset
    selectPreset('balanced');

    showToast(t('toast_pdf_loaded', { pages: `${currentTotalPages} ${pageLabel}` }), "success");
  } catch (err) {
    console.error("PDF Parsing Error:", err);
    showMemoryAlert(true, `Could not parse PDF: ${err.message}`, t('alert_title'));
    showToast(`Failed to parse PDF: ${err.message}`, "error");
    resetWorkspace();
  }
}

/* ==========================================================================
   Preset & Quality Controls Synchronization
   ========================================================================== */
function selectPreset(level) {
  selectedPreset = level;
  const config = COMPRESSION_PRESETS[level];
  if (!config) return;

  // 1. Sync Dropdown Selection
  if (qualityDropdown && qualityDropdown.value !== level) {
    qualityDropdown.value = level;
  }

  // 2. Sync Preset Cards Highlighting
  document.querySelectorAll('.preset-card').forEach(card => {
    card.classList.toggle('selected', card.getAttribute('data-level') === level);
  });

  // 3. Sync Quality Slider
  currentQualityValue = config.sliderValue;
  if (qualitySlider) qualitySlider.value = config.sliderValue;
  if (sliderQualityVal) sliderQualityVal.textContent = `${config.sliderValue}%`;
}

function updatePresetHighlightForSlider(sliderVal) {
  if (sliderVal <= 45) {
    selectedPreset = "extreme";
  } else if (sliderVal <= 70) {
    selectedPreset = "balanced";
  } else {
    selectedPreset = "light";
  }

  if (qualityDropdown) {
    qualityDropdown.value = selectedPreset;
  }

  document.querySelectorAll('.preset-card').forEach(card => {
    card.classList.toggle('selected', card.getAttribute('data-level') === selectedPreset);
  });
}

function getActiveCompressionSettings() {
  const customJpegQuality = Math.min(0.92, Math.max(0.2, currentQualityValue / 100));
  let renderScale = 1.0;

  if (selectedPreset === "extreme") {
    renderScale = 0.75;
  } else if (selectedPreset === "light") {
    renderScale = 1.25;
  } else if (selectedPreset === "balanced") {
    renderScale = 1.0;
  } else {
    // Dynamic scale interpolation based on quality percentage
    renderScale = 0.65 + (customJpegQuality * 0.6);
  }

  return {
    renderScale,
    jpegQuality: customJpegQuality
  };
}

/* ==========================================================================
   Client-Side Compression Core (PDF.js Rasterization + jsPDF Assembly)
   ========================================================================== */
async function executeCompressionAndDownload() {
  if (isCompressing) return;

  if (!currentPdfBytes || currentTotalPages === 0) {
    showToast(t('toast_upload_first'), "warning");
    return;
  }

  // Verify jsPDF availability
  const jsPDFConstructor = window.jspdf ? window.jspdf.jsPDF : window.jsPDF;
  if (!jsPDFConstructor) {
    showToast("jsPDF library not available. Please check your connection.", "error");
    return;
  }

  setCompressingState(true);
  hideMemoryAlert();

  if (progressCard) progressCard.classList.remove('hidden');
  if (resultCard) resultCard.classList.add('hidden');

  try {
    const { renderScale, jpegQuality } = getActiveCompressionSettings();

    // 1. Load source document in PDF.js for rendering
    const loadingTask = pdfjsLib.getDocument({ data: currentPdfBytes.slice(0) });
    const pdfDoc = await loadingTask.promise;
    const totalPages = pdfDoc.numPages;

    let targetDoc = null;

    // 2. Loop through each page: Render to Canvas -> Convert to JPEG -> Append to jsPDF
    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
      const percentBase = Math.round(((pageNum - 1) / totalPages) * 90);
      updateProgress(percentBase, t('rendering_page', { current: pageNum, total: totalPages }));

      const page = await pdfDoc.getPage(pageNum);
      const baseViewport = page.getViewport({ scale: 1.0 });
      const scaledViewport = page.getViewport({ scale: renderScale });

      // Create an offscreen canvas with explicit dimensions
      const canvas = document.createElement('canvas');
      canvas.width = Math.floor(scaledViewport.width);
      canvas.height = Math.floor(scaledViewport.height);
      const ctx = canvas.getContext('2d', { alpha: false });

      // Ensure crisp white background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render original page to canvas
      await page.render({
        canvasContext: ctx,
        viewport: scaledViewport
      }).promise;

      updateProgress(
        Math.round(percentBase + (40 / totalPages)),
        t('compressing_page', { current: pageNum, quality: Math.round(jpegQuality * 100) })
      );

      // Convert canvas to compressed JPEG data URL
      const jpegDataUrl = canvas.toDataURL('image/jpeg', jpegQuality);

      const pageWidthPt = baseViewport.width;
      const pageHeightPt = baseViewport.height;
      const orientation = pageWidthPt > pageHeightPt ? 'landscape' : 'portrait';

      // Initialize jsPDF with exact dimensions of page 1, or add subsequent page
      if (pageNum === 1) {
        targetDoc = new jsPDFConstructor({
          orientation: orientation,
          unit: 'pt',
          format: [pageWidthPt, pageHeightPt],
          compress: true
        });
        targetDoc.addImage(jpegDataUrl, 'JPEG', 0, 0, pageWidthPt, pageHeightPt, undefined, 'FAST');
      } else {
        targetDoc.addPage([pageWidthPt, pageHeightPt], orientation);
        targetDoc.addImage(jpegDataUrl, 'JPEG', 0, 0, pageWidthPt, pageHeightPt, undefined, 'FAST');
      }

      // Explicit canvas cleanup to prevent memory accumulation in browser heap
      canvas.width = 0;
      canvas.height = 0;

      const pageDonePercent = Math.round((pageNum / totalPages) * 90);
      updateProgress(pageDonePercent, t('processed_page', { current: pageNum, total: totalPages }));
    }

    updateProgress(95, t('generating_pdf'));

    // 3. Output binary blob and measure compressed size
    const compressedPdfBlob = targetDoc.output('blob');
    const compressedBytes = new Uint8Array(await compressedPdfBlob.arrayBuffer());
    const originalBytes = currentPdfBytes;

    const originalSize = originalBytes ? originalBytes.length : (currentFileSize || 0);
    const finalSize = compressedBytes.length;

    let outName = outputFilenameInput?.value?.trim() || "compressed_document";
    if (!outName.toLowerCase().endsWith('.pdf')) {
      outName += '.pdf';
    }

    updateProgress(100, t('downloading_doc'));

    // 4. Compare output size against original size
    if (compressedBytes.length < originalBytes.length) {
      // Normal Success: Compressed size is strictly smaller
      const bytesSaved = originalSize - finalSize;
      const rawReductionPct = (originalSize > 0) ? ((bytesSaved / originalSize) * 100) : 0;

      let reductionPercentStr;
      if (rawReductionPct > 0 && rawReductionPct < 10) {
        reductionPercentStr = (Math.round(rawReductionPct * 10) / 10).toString();
      } else {
        reductionPercentStr = Math.round(rawReductionPct).toString();
      }

      lastCompressionResult = {
        isSmaller: true,
        originalSize,
        finalSize,
        reductionPercentStr,
        bytesSaved
      };

      // Update UI Indicators
      if (statOriginalSize) statOriginalSize.textContent = formatBytes(originalSize);
      if (statCompressedSize) {
        statCompressedSize.textContent = formatBytes(finalSize);
        statCompressedSize.className = 'stat-val reduced';
      }

      if (savingsBadge) {
        savingsBadge.className = 'savings-badge';
      }
      if (savingsBadgeIcon) {
        savingsBadgeIcon.setAttribute('data-lucide', 'arrow-down-right');
      }
      if (savingsPercent) {
        savingsPercent.textContent = t('savings_smaller', { n: reductionPercentStr, saved: formatBytes(bytesSaved) });
      }

      if (resultNotice) resultNotice.classList.add('hidden');
      if (resultCard) {
        resultCard.classList.remove('optimal');
        resultCard.classList.remove('hidden');
      }

      // Provide compressedBytes for download via targetDoc
      targetDoc.save(outName);

      // User Feedback Toast
      showToast(t('toast_compress_success', { n: reductionPercentStr }), "success");
    } else {
      // Smart Fallback: compressedBytes >= originalBytes (rasterization inflated size or already compact)
      lastCompressionResult = {
        isSmaller: false,
        originalSize,
        finalSize,
        reductionPercentStr: "0",
        bytesSaved: 0
      };

      // Update UI Indicators: show "Original preserved (10.6 MB)" without green highlight
      if (statOriginalSize) statOriginalSize.textContent = formatBytes(originalSize);
      if (statCompressedSize) {
        statCompressedSize.textContent = t('stat_original_preserved', { size: formatBytes(originalSize) });
        statCompressedSize.className = 'stat-val optimal';
      }

      // Update result badge to neutral/slate: "Already Optimal"
      if (savingsBadge) {
        savingsBadge.className = 'savings-badge optimal';
      }
      if (savingsBadgeIcon) {
        savingsBadgeIcon.setAttribute('data-lucide', 'shield-check');
      }
      if (savingsPercent) {
        savingsPercent.textContent = t('savings_already_optimal');
      }

      // Show clear informative message in result notice banner
      if (resultNotice && resultNoticeText) {
        resultNoticeText.textContent = t('msg_already_optimal');
        resultNotice.classList.remove('hidden');
      }

      if (resultCard) {
        resultCard.classList.add('optimal');
        resultCard.classList.remove('hidden');
      }

      // Serve ORIGINAL file (originalBytes) for download instead
      const originalBlob = new Blob([originalBytes], { type: 'application/pdf' });
      const blobUrl = URL.createObjectURL(originalBlob);
      const downloadLink = document.createElement('a');
      downloadLink.href = blobUrl;
      downloadLink.download = outName;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);

      // User Feedback Toast
      showToast(t('msg_already_optimal'), "info");
    }

    if (window.lucide) {
      lucide.createIcons();
    }
  } catch (err) {
    console.error("Compression Execution Error:", err);
    showMemoryAlert(true, `Compression halted: ${err.message}`, t('alert_title'));
    showToast(`Compression error: ${err.message}`, "error");
  } finally {
    setCompressingState(false);
  }
}

function updateProgress(percent, message) {
  if (progressPercent) progressPercent.textContent = `${percent}%`;
  if (progressFill) progressFill.style.width = `${percent}%`;
  if (progressSubtext && message) progressSubtext.textContent = message;
}

function setCompressingState(active) {
  isCompressing = active;
  if (!btnExecuteCompress) return;

  btnExecuteCompress.disabled = active;
  if (btnSpinner) btnSpinner.classList.toggle('hidden', !active);
  if (btnExecuteText) {
    btnExecuteText.textContent = active ? t('btn_compressing') : t('btn_compress_download');
  }
}

/* ==========================================================================
   Interactive Sample Document Generator
   ========================================================================== */
async function loadSamplePDF() {
  try {
    showToast(t('toast_sample_generating'), "info");

    const jsPDFConstructor = window.jspdf ? window.jspdf.jsPDF : window.jsPDF;
    if (!jsPDFConstructor) {
      throw new Error("jsPDF library is not loaded.");
    }

    // Build a clean 3-page sample PDF using jsPDF
    const sampleDoc = new jsPDFConstructor({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4'
    });

    const pageWidth = 595.28;
    const pageHeight = 841.89;

    const sections = [
      { title: "Compression Benchmark Report", subtitle: "Sample Section 1: Overview & Graphics", color: [16, 185, 129] },
      { title: "Client-Side Processing Specs", subtitle: "Sample Section 2: Architecture & Performance", color: [6, 182, 212] },
      { title: "Memory Protection & Security", subtitle: "Sample Section 3: Privacy & Zero Uploads", color: [99, 102, 241] }
    ];

    for (let i = 0; i < sections.length; i++) {
      if (i > 0) sampleDoc.addPage('a4', 'portrait');

      const sec = sections[i];

      // Top Accent Banner
      sampleDoc.setFillColor(sec.color[0], sec.color[1], sec.color[2]);
      sampleDoc.rect(0, 0, pageWidth, 12, 'F');

      // Title & Subtitles
      sampleDoc.setFont('helvetica', 'bold');
      sampleDoc.setFontSize(22);
      sampleDoc.setTextColor(30, 41, 59);
      sampleDoc.text(sec.title, 50, 60);

      sampleDoc.setFont('helvetica', 'normal');
      sampleDoc.setFontSize(14);
      sampleDoc.setTextColor(100, 116, 139);
      sampleDoc.text(sec.subtitle, 50, 85);

      // Decorative Graphic Cards (Simulate visual content)
      for (let c = 0; c < 3; c++) {
        const cardX = 50 + (c * 170);
        const cardY = 120;
        sampleDoc.setFillColor(245, 247, 250);
        sampleDoc.roundedRect(cardX, cardY, 155, 130, 6, 6, 'F');

        sampleDoc.setFillColor(sec.color[0], sec.color[1], sec.color[2]);
        sampleDoc.circle(cardX + 25, cardY + 30, 12, 'F');

        sampleDoc.setFont('helvetica', 'bold');
        sampleDoc.setFontSize(12);
        sampleDoc.setTextColor(30, 41, 59);
        sampleDoc.text(`Metric Card 0${c + 1}`, cardX + 45, cardY + 34);

        sampleDoc.setFont('helvetica', 'normal');
        sampleDoc.setFontSize(10);
        sampleDoc.setTextColor(100, 116, 139);
        sampleDoc.text(`Density Rating: ${(c + 1) * 33}%`, cardX + 15, cardY + 65);
        sampleDoc.text(`Vector Complexity: High`, cardX + 15, cardY + 85);
        sampleDoc.text(`Client Tested: Yes`, cardX + 15, cardY + 105);
      }

      // Content Box with simulated paragraphs
      sampleDoc.setFillColor(248, 250, 252);
      sampleDoc.roundedRect(50, 280, pageWidth - 100, 220, 8, 8, 'F');

      sampleDoc.setFont('helvetica', 'bold');
      sampleDoc.setFontSize(14);
      sampleDoc.setTextColor(sec.color[0], sec.color[1], sec.color[2]);
      sampleDoc.text("Client-Side Rasterization & Synthesis", 70, 315);

      sampleDoc.setFont('helvetica', 'normal');
      sampleDoc.setFontSize(11);
      sampleDoc.setTextColor(71, 85, 105);
      sampleDoc.text("This multi-page test PDF evaluates local browser JPEG compression.", 70, 345);
      sampleDoc.text("Mozilla PDF.js decodes pages at high fidelity, while jsPDF re-assembles them.", 70, 370);
      sampleDoc.text("Strict memory protection guards your browser from exceeding 25MB.", 70, 395);
      sampleDoc.text("Choose 'Medium Quality' or 'Low Quality' to observe substantial size reduction.", 70, 420);

      // Footer
      sampleDoc.setFontSize(9);
      sampleDoc.setTextColor(148, 163, 184);
      sampleDoc.text(`Page ${i + 1} of ${sections.length} • 100% Client-Side Compression`, 50, pageHeight - 30);
    }

    const sampleBlob = sampleDoc.output('blob');
    const sampleBytes = new Uint8Array(await sampleBlob.arrayBuffer());

    currentPdfBytes = sampleBytes;
    currentFileName = "sample_compression_benchmark.pdf";
    currentFileSize = sampleBytes.byteLength;
    await processLoadedPdfBytes(sampleBytes, currentFileName, currentFileSize);
  } catch (err) {
    console.error("Error creating sample PDF:", err);
    showToast(`${t('toast_sample_error')}${err.message}`, "error");
  }
}

/* ==========================================================================
   Reset & Helper Functions
   ========================================================================== */
function resetWorkspace() {
  currentPdfBytes = null;
  currentFileName = "document.pdf";
  currentTotalPages = 0;
  currentFileSize = 0;
  isCompressing = false;
  lastCompressionResult = null;

  hideMemoryAlert();

  if (fileInput) fileInput.value = '';
  if (configPanel) configPanel.classList.add('hidden');
  if (dropzone) dropzone.classList.remove('hidden');
  if (progressCard) progressCard.classList.add('hidden');
  if (resultNotice) resultNotice.classList.add('hidden');
  if (resultCard) {
    resultCard.classList.add('hidden');
    resultCard.classList.remove('optimal');
  }
  if (savingsBadge) savingsBadge.className = 'savings-badge';
  if (statCompressedSize) {
    statCompressedSize.className = 'stat-val reduced';
  }
  if (btnHeaderReset) btnHeaderReset.disabled = true;
}

function formatBytes(bytes, decimals = 1) {
  if (!bytes || bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function showToast(message, type = "info") {
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
    window.lucide.createIcons();
  }

  toastEl.classList.remove('hidden');
  clearTimeout(toastEl._timer);
  toastEl._timer = setTimeout(() => {
    toastEl.classList.add('hidden');
  }, 4000);
}
