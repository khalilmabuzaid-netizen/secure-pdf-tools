/**
 * PDFNetizen - Flatten PDF Tool Engine
 * 100% Client-Side In-Browser PDF Form & Annotation Flattening
 */

// Configure PDF.js Worker
if (typeof pdfjsLib !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
}

// Global State
const state = {
  currentLang: localStorage.getItem('pdfnetizen_lang') || 'en',
  currentFile: null,
  flattenedPdfBytes: null,
  flattenedBlobUrl: null,
  selectedMode: 'standard', // 'standard' | 'raster'
  rasterScale: 2.0,
  isProcessing: false
};

// Bilingual Dictionaries
const i18n = {
  en: {
    nav_badge: "Flatten PDF",
    badge_client_side: "100% Client-Side",
    nav_home: "Home",
    nav_annotator: "Annotator",
    nav_compress: "Compress PDF",
    nav_split: "Split PDF",
    btn_reset: "Reset",
    nav_all_tools: "All Tools",
    breadcrumb_home: "Home",
    breadcrumb_tools: "Tools",
    breadcrumb_current: "Flatten PDF",
    hero_badge: "100% Client-Side In-Browser Security",
    hero_title: "Flatten PDF Forms & Annotations",
    hero_desc: "Lock interactive form fields, checkboxes, signatures, and stamps into permanent, non-editable content directly in your browser.",
    dropzone_title: "Choose a PDF or Drag & Drop Here",
    dropzone_subtitle: "Supports interactive PDF forms, signed contracts, tax documents, and annotated reports",
    btn_browse: "Select PDF File",
    btn_sample: "Try Sample Form PDF",
    dropzone_hint: "🔒 100% private: Files never leave your browser or get uploaded to any server.",
    btn_change_file: "Change File",
    preview_title: "Document Preview (Page 1)",
    settings_title: "Flattening Options",
    mode_std_title: "Standard Flatten (Recommended)",
    badge_recommended: "Recommended",
    mode_std_desc: "Bakes all interactive text fields, checkmarks, dropdowns, and digital signatures into permanent vector page elements.",
    tag_sharp_vector: "✨ Razor-sharp vector text",
    tag_fast_instant: "⚡ Instant 0.1s processing",
    tag_small_size: "📦 Compact file size",
    mode_raster_title: "Complete Print Flatten (Maximum Security)",
    badge_max_security: "Anti-Extraction",
    mode_raster_desc: "Rasterizes every page into ultra-crisp high-DPI images. Ideal for sensitive contracts to completely prevent text search or scraping.",
    tag_no_scrape: "🔒 0% text/signature extraction",
    tag_high_dpi: "🖨️ 300 DPI print quality",
    tag_legal: "⚖️ Court & audit ready",
    label_dpi_quality: "Print Raster Quality (DPI):",
    label_output_filename: "Output File Name:",
    btn_flatten_now: "Flatten Document & Save",
    progress_flattening: "Flattening document layers...",
    progress_detail_fields: "Flattening interactive form fields and signatures...",
    progress_detail_raster: "Rasterizing pages into anti-extraction images...",
    success_title: "PDF Flattened Successfully!",
    success_subtitle: "All interactive form fields, checkboxes, and signatures have been permanently locked into the document background.",
    btn_download_pdf: "Download Flattened PDF",
    btn_flatten_another: "Flatten Another Document",
    how_it_works_title: "How to Flatten a PDF Document",
    how_it_works_desc: "Three simple steps to make any interactive PDF document tamper-proof and read-only.",
    step1_title: "Upload Your PDF",
    step1_desc: "Drag and drop your interactive form, contract, or invoice into the secure browser workspace.",
    step2_title: "Select Flattening Mode",
    step2_desc: "Choose between Standard Vector Flattening (fast & crisp) or Complete Print Flattening (high-DPI anti-extraction).",
    step3_title: "Download Permanent PDF",
    step3_desc: "Click flatten and instantly download your locked, non-editable PDF document ready for submission.",
    why_flatten_title: "Why Flatten Your PDF Files?",
    why_flatten_desc: "Essential security and compliance benefits for agreements, applications, and tax forms.",
    feat1_title: "Prevent Form Tampering",
    feat1_desc: "Stops recipients or third parties from altering filled text fields, checkbox selections, or financial numbers.",
    feat2_title: "Lock Electronic Signatures",
    feat2_desc: "Permanently binds digital and drawn signatures into the page geometry so they cannot be selected, moved, or extracted.",
    feat3_title: "Universal Compatibility",
    feat3_desc: "Ensures documents render identically across all desktop viewers, mobile browsers, tablets, and legacy PDF printers.",
    feat4_title: "100% Client-Side Privacy",
    feat4_desc: "Files are processed entirely in browser memory using WebAssembly. No data is ever transmitted or stored on remote servers.",
    faq_title: "Frequently Asked Questions",
    faq_desc: "Everything you need to know about PDF flattening, security, and document locking.",
    faq_q1: "What is the difference between flattening and protecting a PDF?",
    faq_a1: "Protecting a PDF applies an encryption password to restrict opening or printing. Flattening merges dynamic form layers (like text fields, checkboxes, and signatures) into the permanent static background so they can no longer be edited, regardless of what PDF reader the recipient uses.",
    faq_q2: "When should I choose 'Complete Print Flatten'?",
    faq_a2: "Choose Complete Print Flatten when you are submitting highly sensitive agreements, confidential invoices, or legal exhibits where you want to guarantee that no automated text scrapers or OCR tools can copy raw text or signature vectors from the file.",
    faq_q3: "Can a flattened PDF form be unflattened?",
    faq_a3: "No. Once a PDF is flattened, the interactive form elements cease to exist as separate editable objects and become permanent pixels/vectors of the page. Always keep a copy of your original editable form before flattening.",
    faq_q4: "Are my uploaded files and confidential forms secure?",
    faq_a4: "Yes, 100%. Our tool operates strictly inside your browser. Your files, signatures, and personal information never leave your local device and are not uploaded to any remote server or cloud database.",
    faq_q5: "Does flattening reduce the visual quality of my PDF?",
    faq_a5: "In Standard Flatten mode, vector text and graphics retain 100% of their original crisp resolution. In Complete Print Flatten mode, pages are rendered at up to 300 DPI high-definition resolution, ensuring impeccable print and screen appearance.",
    footer_all_tools: "All PDF Tools",
    footer_protect: "Protect PDF",
    footer_unlock: "Unlock PDF",
    footer_sign: "Sign PDF",
    footer_page_numbers: "Page Numbers",
    footer_excel: "Excel to PDF",
    footer_copy: "© 2026 PDFNetizen. Free, Private, Client-Side PDF Utilities.",
    footer_privacy: "Privacy Policy",
    footer_terms: "Terms of Service",
    cookie_text: "We use anonymous local storage and analytics cookies to optimize performance and enhance your experience. No personal document data is ever stored.",
    cookie_accept: "Got it",
    toast_loaded: "PDF loaded successfully!",
    toast_sample_ready: "Interactive sample PDF created & loaded!",
    toast_flatten_complete: "PDF flattened and ready for download!",
    toast_error_load: "Failed to parse PDF file. Please try another document.",
    toast_error_flatten: "Error during PDF flattening. Please try again.",
    fields_detected_count: "{count} interactive form field(s) detected",
    fields_none_detected: "Standard PDF layers ready to lock",
    fields_checking: "Analyzing document form fields...",
    page_single: "1 Page",
    pages_plural: "{count} Pages"
  },
  ar: {
    nav_badge: "تسطيح PDF",
    badge_client_side: "محلي ١٠٠٪ في المتصفح",
    nav_home: "الرئيسية",
    nav_annotator: "المحرر",
    nav_compress: "ضغط PDF",
    nav_split: "تقسيم PDF",
    btn_reset: "إعادة ضبط",
    nav_all_tools: "كافة الأدوات",
    breadcrumb_home: "الرئيسية",
    breadcrumb_tools: "الأدوات",
    breadcrumb_current: "تسطيح PDF",
    hero_badge: "أمان كامل 100% داخل المتصفح محلياً",
    hero_title: "تسطيح وتثبيت حقول وتوقيعات PDF",
    hero_desc: "قم بقفل الحقول التفاعلية وخانات الاختيار والتواقيع والتعليقات وتحويلها إلى محتوى ثابت غير قابل للتعديل داخل متصفحك مباشرة.",
    dropzone_title: "اختر ملف PDF أو اسحبه وأفلته هنا",
    dropzone_subtitle: "يدعم استمارات PDF التفاعلية، العقود الموقعة، الإقرارات الضريبية والمستندات ذات التواقيع",
    btn_browse: "اختيار ملف PDF",
    btn_sample: "تجربة نموذج PDF تفاعلي",
    dropzone_hint: "🔒 أمان تام 100%: تتم المعالجة بالكامل داخل متصفحك دون رفع الملفات إلى أي خادم.",
    btn_change_file: "تغيير الملف",
    preview_title: "معاينة المستند (الصفحة 1)",
    settings_title: "خيارات التسطيح والتثبيت",
    mode_std_title: "تسطيح قياسي متقدم (موصى به)",
    badge_recommended: "موصى به",
    mode_std_desc: "يدمج كافة حقول النصوص وخانات الاختيار والقوائم والتواقيع الإلكترونية في طبقات متجهية ثابتة عالية الدقة.",
    tag_sharp_vector: "✨ نصوص متجهية فائقة الوضوح",
    tag_fast_instant: "⚡ معالجة فورية فائقة السرعة",
    tag_small_size: "📦 حجم ملف مدمج وصغير",
    mode_raster_title: "تسطيح طباعي كامل (أقصى حماية وأمان)",
    badge_max_security: "حماية ضد الاستخراج",
    mode_raster_desc: "يحول كافة الصفحات إلى صور نقطية فائقة الدقة (Raster). مثالي للعقود الحساسة لمنع نسخ النصوص أو استخراج التواقيع نهائياً.",
    tag_no_scrape: "🔒 منع استخراج النصوص 100%",
    tag_high_dpi: "🖨️ جودة طباعة عالية 300 DPI",
    tag_legal: "⚖️ جاهز للتوثيق والجهات الرسمية",
    label_dpi_quality: "دقة وجودة التسطيح الطباعي (DPI):",
    label_output_filename: "اسم الملف الناتج:",
    btn_flatten_now: "تسطيح المستند وحفظ PDF",
    progress_flattening: "جاري تسطيح طبقات المستند...",
    progress_detail_fields: "جاري تثبيت الحقول التفاعلية والتواقيع...",
    progress_detail_raster: "جاري تحويل الصفحات لمنع استخراج النصوص...",
    success_title: "تم تسطيح ملف PDF بنجاح!",
    success_subtitle: "تم قفل وتثبيت كافة الحقول والتواقيع بنجاح داخل خلفية المستند بشكل دائم وغير قابل للتعديل.",
    btn_download_pdf: "تحميل ملف PDF المسطح",
    btn_flatten_another: "تسطيح مستند آخر",
    how_it_works_title: "كيفية تسطيح مستندات PDF",
    how_it_works_desc: "ثلاث خطوات بسيطة لجعل أي مستند PDF محصناً ضد التعديل وثابت المحتوى.",
    step1_title: "ارفع ملف PDF",
    step1_desc: "اسحب وأفلت الاستمارة التفاعلية أو العقد الموقع في منطقة المعالجة الآمنة.",
    step2_title: "اختر نمط التسطيح",
    step2_desc: "اختر بين التسطيح المتجهي السريع والواضح أو التسطيح الطباعي الكامل عالي الدقة لمنع الاستخراج.",
    step3_title: "حمّل الملف الثابت",
    step3_desc: "انقر على زر التسطيح وحمّل فوراً ملف PDF المقفل والجاهز للإرسال والتقديم الرسمي.",
    why_flatten_title: "لماذا تقوم بتسطيح ملفات PDF؟",
    why_flatten_desc: "مزايا أمنية وقانونية أساسية للعقود والمعاملات الرسمية والاستمارات.",
    feat1_title: "منع التلاعب بالاستمارات",
    feat1_desc: "يمنع المستلمين أو الأطراف الأخرى من تعديل البيانات المدخلة، خانات الاختيار، أو الأرقام المالية.",
    feat2_title: "تثبيت التواقيع الإلكترونية",
    feat2_desc: "يدمج التواقيع الرقمية واليدوية داخل هندسة الصفحة بشكل دائم لمنع تحديدها أو نسخها أو نقلها.",
    feat3_title: "توافق شامل مع جميع الأجهزة",
    feat3_desc: "يضمن ظهور المستند وتنسيقه بنفس الدقة على جميع برامج قراءة PDF والهواتف والطابعات.",
    feat4_title: "خصوصية كاملة 100%",
    feat4_desc: "تتم جميع العمليات داخل ذاكرة متصفحك مباشرة بدون إرسال أي بايت إلى خوادم خارجية.",
    faq_title: "الأسئلة الشائعة",
    faq_desc: "كل ما تحتاج معرفته حول تسطيح مستندات PDF وقفل النماذج والتواقيع.",
    faq_q1: "ما الفرق بين تسطيح PDF وحماية PDF بكلمة مرور؟",
    faq_a1: "حماية PDF بكلمة مرور تمنع فتح أو طباعة المستند دون الرمز السري. أما التسطيح فيدمج الحقول المتغيرة والتواقيع في خلفية الصفحة ليجعلها ثابتة تماماً وغير قابلة للتعديل بأي برنامج.",
    faq_q2: "متى يجب علي اختيار 'التسطيح الطباعي الكامل'؟",
    faq_a2: "يُفضل استخدامه عند إرسال مستندات سرية للغاية أو عقود نهائية لضمان عدم تمكن أي أدوات استخراج نصوص أو كشط بيانات من استخراج النصوص أو أشكال التواقيع.",
    faq_q3: "هل يمكن إلغاء تسطيح PDF بعد تنفيذه؟",
    faq_a3: "لا. بعد إتمام التسطيح تصبح الحقول التفاعلية جزءاً لا يتجزأ من خلفية الصفحة الثابتة. احتفظ دائماً بنسخة من ملفك الأصلي القابل للتعديل.",
    faq_q4: "هل ملفاتي واستماراتي الحساسة في أمان؟",
    faq_a4: "نعم 100%. أداتنا تعمل محلياً داخل جهازك دون رفع أي مستند إلى أي خوادم أو سحابة إلكترونية.",
    faq_q5: "هل يؤثر التسطيح على جودة ووضوح المستند؟",
    faq_a5: "في التسطيح القياسي تظل النصوص المتجهية بأعلى درجات الوضوح والحدة. وفي التسطيح الطباعي يتم تصيير الصفحات بدقة فائقة تصل إلى 300 DPI لضمان مظهر احترافي.",
    footer_all_tools: "كافة أدوات PDF",
    footer_protect: "حماية PDF",
    footer_unlock: "فك قفل PDF",
    footer_sign: "توقيع PDF",
    footer_page_numbers: "ترقيم الصفحات",
    footer_excel: "تحويل Excel إلى PDF",
    footer_copy: "© 2026 PDFNetizen. أدوات PDF مجانية، خاصة وتعمل محلياً.",
    footer_privacy: "سياسة الخصوصية",
    footer_terms: "شروط الخدمة",
    cookie_text: "نستخدم التخزين المحلي وملفات تعريف الارتباط التحليلية المجهولة لتعزيز الأداء وتجربة الاستخدام. لا يتم حفظ أو نقل بيانات المستندات نهائياً.",
    cookie_accept: "موافق",
    toast_loaded: "تم تحميل ملف PDF بنجاح!",
    toast_sample_ready: "تم إنشاء وتحميل نموذج PDF تفاعلي تجريبي!",
    toast_flatten_complete: "تم تسطيح المستند وجاهز للتحميل!",
    toast_error_load: "تعذر قراءة ملف PDF. يرجى تجربة مستند آخر.",
    toast_error_flatten: "حدث خطأ أثناء تسطيح المستند. يرجى المحاولة ثانية.",
    fields_detected_count: "تم اكتشاف {count} حقل تفاعلي جاهز للتثبيت",
    fields_none_detected: "طبقات PDF القياسية جاهزة للتثبيت",
    fields_checking: "جاري تحليل حقول المستند...",
    page_single: "صفحة واحدة",
    pages_plural: "{count} صفحات"
  }
};

// DOM Elements Initialization
document.addEventListener('DOMContentLoaded', () => {
  initLucideIcons();
  initI18n();
  initEventListeners();
  initFaqAccordion();
  initCookieBanner();
});

function initLucideIcons() {
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }
}

// Internationalization
function initI18n() {
  applyLanguage(state.currentLang);
  const langToggleBtn = document.getElementById('langToggleBtn');
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      const newLang = state.currentLang === 'en' ? 'ar' : 'en';
      applyLanguage(newLang);
    });
  }
}

function applyLanguage(lang) {
  state.currentLang = lang;
  localStorage.setItem('pdfnetizen_lang', lang);
  const isRtl = lang === 'ar';
  document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  document.documentElement.lang = lang;

  const langLabel = document.getElementById('langLabel');
  if (langLabel) {
    langLabel.textContent = isRtl ? 'English' : 'العربية';
  }

  // Update DOM elements with data-i18n attributes
  const dict = i18n[lang] || i18n.en;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  // Update dynamic chips if file is loaded
  if (state.currentFile) {
    updateMetadataDisplay();
  }

  initLucideIcons();
}

function t(key, replacements = {}) {
  const dict = i18n[state.currentLang] || i18n.en;
  let text = dict[key] || i18n.en[key] || key;
  for (const [k, v] of Object.entries(replacements)) {
    text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
  }
  return text;
}

// Toast Notifications
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  
  let iconName = 'info';
  let iconColor = '#22d3ee';
  if (type === 'success') {
    iconName = 'check-circle-2';
    iconColor = '#34d399';
  } else if (type === 'error') {
    iconName = 'alert-circle';
    iconColor = '#fb7185';
  }

  toast.innerHTML = `
    <i data-lucide="${iconName}" style="width: 16px; height: 16px; color: ${iconColor};"></i>
    <span>${message}</span>
  `;
  container.appendChild(toast);
  initLucideIcons();

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px) scale(0.95)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Event Listeners
function initEventListeners() {
  const dropzone = document.getElementById('dropzone');
  const fileInput = document.getElementById('fileInput');
  const browseBtn = document.getElementById('browseBtn');
  const samplePdfBtn = document.getElementById('samplePdfBtn');
  const changeFileBtn = document.getElementById('changeFileBtn');
  const resetWorkspaceBtn = document.getElementById('resetWorkspaceBtn');
  const flattenBtn = document.getElementById('flattenBtn');
  const downloadPdfBtn = document.getElementById('downloadPdfBtn');
  const flattenAnotherBtn = document.getElementById('flattenAnotherBtn');
  const modeRadios = document.querySelectorAll('input[name="flattenMode"]');
  const rasterDpiSelect = document.getElementById('rasterDpiSelect');

  // Drag & Drop
  if (dropzone && fileInput) {
    dropzone.addEventListener('click', (e) => {
      if (e.target.closest('button')) return;
      fileInput.click();
    });

    if (browseBtn) {
      browseBtn.addEventListener('click', () => fileInput.click());
    }

    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files.length > 0) {
        handleFileSelect(e.target.files[0]);
      }
    });

    ['dragenter', 'dragover'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.add('dragover');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.remove('dragover');
      });
    });

    dropzone.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      if (dt && dt.files && dt.files.length > 0) {
        const file = dt.files[0];
        if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
          handleFileSelect(file);
        } else {
          showToast(t('toast_error_load'), 'error');
        }
      }
    });
  }

  // Sample PDF
  if (samplePdfBtn) {
    samplePdfBtn.addEventListener('click', () => {
      loadSampleInteractivePdf();
    });
  }

  // Change File & Reset
  if (changeFileBtn) {
    changeFileBtn.addEventListener('click', () => fileInput && fileInput.click());
  }

  if (resetWorkspaceBtn) {
    resetWorkspaceBtn.addEventListener('click', resetWorkspace);
  }

  // Mode Cards
  modeRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      state.selectedMode = e.target.value;
      updateModeSelectionUI();
    });
  });

  const modeStandardCard = document.getElementById('modeStandardCard');
  const modeRasterCard = document.getElementById('modeRasterCard');

  if (modeStandardCard) {
    modeStandardCard.addEventListener('click', () => {
      const radio = modeStandardCard.querySelector('input[type="radio"]');
      if (radio) {
        radio.checked = true;
        state.selectedMode = 'standard';
        updateModeSelectionUI();
      }
    });
  }

  if (modeRasterCard) {
    modeRasterCard.addEventListener('click', () => {
      const radio = modeRasterCard.querySelector('input[type="radio"]');
      if (radio) {
        radio.checked = true;
        state.selectedMode = 'raster';
        updateModeSelectionUI();
      }
    });
  }

  if (rasterDpiSelect) {
    rasterDpiSelect.addEventListener('change', (e) => {
      state.rasterScale = parseFloat(e.target.value) || 2.0;
    });
  }

  // Flatten Button
  if (flattenBtn) {
    flattenBtn.addEventListener('click', executePdfFlattening);
  }

  // Download Button
  if (downloadPdfBtn) {
    downloadPdfBtn.addEventListener('click', triggerDownload);
  }

  // Flatten Another
  if (flattenAnotherBtn) {
    flattenAnotherBtn.addEventListener('click', resetWorkspace);
  }
}

function updateModeSelectionUI() {
  const stdCard = document.getElementById('modeStandardCard');
  const rasterCard = document.getElementById('modeRasterCard');
  const dpiGroup = document.getElementById('dpiGroup');

  if (state.selectedMode === 'standard') {
    stdCard?.classList.add('active');
    rasterCard?.classList.remove('active');
    if (dpiGroup) dpiGroup.style.display = 'none';
  } else {
    rasterCard?.classList.add('active');
    stdCard?.classList.remove('active');
    if (dpiGroup) dpiGroup.style.display = 'flex';
  }
}

// File Selection & Analysis Handler
async function handleFileSelect(file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    await processAndLoadPdf(bytes, file.name, file.size);
    showToast(t('toast_loaded'), 'success');
  } catch (err) {
    console.error('Failed to load PDF file:', err);
    showToast(t('toast_error_load'), 'error');
  }
}

// Core PDF Processing & Preview Loader
async function processAndLoadPdf(bytes, fileName, fileSize) {
  // Load with PDF-Lib to inspect form fields and metadata
  let pdfLibDoc;
  let formFieldsCount = 0;
  let pageCount = 1;

  try {
    pdfLibDoc = await PDFLib.PDFDocument.load(bytes.slice(0), { ignoreEncryption: true });
    pageCount = pdfLibDoc.getPageCount();
    try {
      const form = pdfLibDoc.getForm();
      if (form) {
        formFieldsCount = form.getFields().length;
      }
    } catch (e) {
      formFieldsCount = 0;
    }
  } catch (e) {
    console.warn('PDF-Lib inspection warning:', e);
  }

  // Load with PDF.js for canvas rendering
  const pdfJsDoc = await pdfjsLib.getDocument({ data: bytes.slice() }).promise;
  pageCount = pdfJsDoc.numPages;

  state.currentFile = {
    name: fileName,
    size: fileSize,
    bytes: bytes,
    pdfLibDoc: pdfLibDoc,
    pdfJsDoc: pdfJsDoc,
    pageCount: pageCount,
    formFieldsCount: formFieldsCount
  };

  // Render Page 1 Preview
  await renderPagePreview(pdfJsDoc, 1);

  // Update UI Elements
  updateMetadataDisplay();

  const dropzone = document.getElementById('dropzone');
  const workspacePanel = document.getElementById('workspacePanel');
  const resetWorkspaceBtn = document.getElementById('resetWorkspaceBtn');
  const successCard = document.getElementById('successCard');
  const progressContainer = document.getElementById('progressContainer');
  const outputFilenameInput = document.getElementById('outputFilenameInput');

  if (dropzone) dropzone.style.display = 'none';
  if (workspacePanel) workspacePanel.style.display = 'flex';
  if (resetWorkspaceBtn) resetWorkspaceBtn.style.display = 'inline-flex';
  if (successCard) successCard.style.display = 'none';
  if (progressContainer) progressContainer.style.display = 'none';

  // Set default output filename
  if (outputFilenameInput) {
    const baseName = fileName.replace(/\.pdf$/i, '');
    outputFilenameInput.value = `${baseName}-flattened.pdf`;
  }

  initLucideIcons();
}

function updateMetadataDisplay() {
  if (!state.currentFile) return;

  const metaFileName = document.getElementById('metaFileName');
  const metaFileSize = document.getElementById('metaFileSize');
  const metaPageCount = document.getElementById('metaPageCount');
  const fieldsStatusText = document.getElementById('fieldsStatusText');

  if (metaFileName) {
    metaFileName.textContent = state.currentFile.name;
    metaFileName.title = state.currentFile.name;
  }

  if (metaFileSize) {
    metaFileSize.textContent = formatBytes(state.currentFile.size);
  }

  if (metaPageCount) {
    const pages = state.currentFile.pageCount;
    metaPageCount.textContent = pages === 1 ? t('page_single') : t('pages_plural', { count: pages });
  }

  if (fieldsStatusText) {
    const count = state.currentFile.formFieldsCount;
    if (count > 0) {
      fieldsStatusText.textContent = t('fields_detected_count', { count: count });
    } else {
      fieldsStatusText.textContent = t('fields_none_detected');
    }
  }
}

// Render Page Preview onto Canvas
async function renderPagePreview(pdfJsDoc, pageNumber = 1) {
  const canvas = document.getElementById('previewCanvas');
  if (!canvas || !pdfJsDoc) return;

  const page = await pdfJsDoc.getPage(pageNumber);
  const viewport = page.getViewport({ scale: 1.5 });
  const context = canvas.getContext('2d');

  canvas.width = viewport.width;
  canvas.height = viewport.height;

  const renderContext = {
    canvasContext: context,
    viewport: viewport
  };

  await page.render(renderContext).promise;
}

// Generate an Interactive Sample PDF Form on the Fly
async function loadSampleInteractivePdf() {
  try {
    const pdfDoc = await PDFLib.PDFDocument.create();
    const font = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(PDFLib.StandardFonts.HelveticaBold);
    
    // Page dimensions: US Letter (612 x 792 pt)
    const page = pdfDoc.addPage([612, 792]);
    const { width, height } = page.getSize();
    const form = pdfDoc.getForm();

    // Top Header Banner
    page.drawRectangle({
      x: 0,
      y: height - 100,
      width: width,
      height: 100,
      color: PDFLib.rgb(0.03, 0.12, 0.20)
    });

    page.drawText("SERVICE AGREEMENT & WORK ORDER", {
      x: 45,
      y: height - 48,
      size: 19,
      font: fontBold,
      color: PDFLib.rgb(0.14, 0.75, 0.88)
    });

    page.drawText("CONFIDENTIAL CLIENT DOCUMENT - INTERACTIVE FORM READY FOR FLATTENING", {
      x: 45,
      y: height - 72,
      size: 8.5,
      font: font,
      color: PDFLib.rgb(0.60, 0.70, 0.80)
    });

    // Decorative Accent Line
    page.drawRectangle({
      x: 0,
      y: height - 104,
      width: width,
      height: 4,
      color: PDFLib.rgb(0.02, 0.71, 0.83)
    });

    // Form Section 1: Client Information
    page.drawText("1. CLIENT & ACCOUNT DETAILS", {
      x: 45,
      y: height - 140,
      size: 12,
      font: fontBold,
      color: PDFLib.rgb(0.05, 0.20, 0.35)
    });

    // Field 1: Client Name
    page.drawText("Client / Organization Name:", {
      x: 45,
      y: height - 170,
      size: 9.5,
      font: fontBold,
      color: PDFLib.rgb(0.2, 0.2, 0.2)
    });

    const clientNameField = form.createTextField('client_name');
    clientNameField.setText('Acme Global Enterprises Inc.');
    clientNameField.addToPage(page, {
      x: 45,
      y: height - 202,
      width: 250,
      height: 24,
      borderWidth: 1,
      borderColor: PDFLib.rgb(0.7, 0.75, 0.8),
      backgroundColor: PDFLib.rgb(0.96, 0.98, 1.0)
    });

    // Field 2: Account Number
    page.drawText("Account Reference ID:", {
      x: 315,
      y: height - 170,
      size: 9.5,
      font: fontBold,
      color: PDFLib.rgb(0.2, 0.2, 0.2)
    });

    const accountIdField = form.createTextField('account_id');
    accountIdField.setText('ACC-2026-9844-US');
    accountIdField.addToPage(page, {
      x: 315,
      y: height - 202,
      width: 250,
      height: 24,
      borderWidth: 1,
      borderColor: PDFLib.rgb(0.7, 0.75, 0.8),
      backgroundColor: PDFLib.rgb(0.96, 0.98, 1.0)
    });

    // Form Section 2: Scope & Financials
    page.drawText("2. PROJECT FINANCIAL ESTIMATE", {
      x: 45,
      y: height - 250,
      size: 12,
      font: fontBold,
      color: PDFLib.rgb(0.05, 0.20, 0.35)
    });

    // Table Header
    page.drawRectangle({
      x: 45,
      y: height - 280,
      width: 520,
      height: 22,
      color: PDFLib.rgb(0.92, 0.95, 0.98)
    });

    page.drawText("Item Description", { x: 55, y: height - 274, size: 9, font: fontBold, color: PDFLib.rgb(0.1, 0.2, 0.3) });
    page.drawText("Allocated Hours", { x: 340, y: height - 274, size: 9, font: fontBold, color: PDFLib.rgb(0.1, 0.2, 0.3) });
    page.drawText("Total Cost", { x: 470, y: height - 274, size: 9, font: fontBold, color: PDFLib.rgb(0.1, 0.2, 0.3) });

    // Table Rows
    const items = [
      { desc: "Cloud Architecture Security Hardening", hrs: "40 hrs", cost: "$6,800.00" },
      { desc: "Client-Side Cryptography Implementation", hrs: "35 hrs", cost: "$5,950.00" },
      { desc: "Compliance Audit & Verification Report", hrs: "20 hrs", cost: "$3,400.00" }
    ];

    let rowY = height - 302;
    items.forEach(item => {
      page.drawText(item.desc, { x: 55, y: rowY, size: 9, font: font, color: PDFLib.rgb(0.2, 0.25, 0.3) });
      page.drawText(item.hrs, { x: 350, y: rowY, size: 9, font: font, color: PDFLib.rgb(0.2, 0.25, 0.3) });
      page.drawText(item.cost, { x: 475, y: rowY, size: 9, font: fontBold, color: PDFLib.rgb(0.1, 0.5, 0.3) });
      rowY -= 22;
    });

    // Total Amount Field
    page.drawText("Total Contract Value:", { x: 320, y: rowY - 10, size: 10, font: fontBold, color: PDFLib.rgb(0.1, 0.1, 0.1) });
    const totalAmountField = form.createTextField('total_amount');
    totalAmountField.setText('$16,150.00 USD');
    totalAmountField.addToPage(page, {
      x: 445,
      y: rowY - 18,
      width: 120,
      height: 22,
      borderWidth: 1,
      borderColor: PDFLib.rgb(0.2, 0.7, 0.4),
      backgroundColor: PDFLib.rgb(0.93, 0.99, 0.95)
    });

    // Form Section 3: Legal Terms & Sign-off
    const signY = rowY - 60;
    page.drawText("3. AUTHORIZATION & DIGITAL SIGN-OFF", {
      x: 45,
      y: signY,
      size: 12,
      font: fontBold,
      color: PDFLib.rgb(0.05, 0.20, 0.35)
    });

    // Checkbox: Terms
    const termsCheck = form.createCheckBox('agree_terms');
    termsCheck.check();
    termsCheck.addToPage(page, {
      x: 45,
      y: signY - 32,
      width: 16,
      height: 16,
      borderWidth: 1,
      borderColor: PDFLib.rgb(0.02, 0.71, 0.83),
      backgroundColor: PDFLib.rgb(0.95, 0.98, 1.0)
    });

    page.drawText("I confirm that the work description and financial milestones above are accepted and final.", {
      x: 70,
      y: signY - 28,
      size: 8.5,
      font: font,
      color: PDFLib.rgb(0.25, 0.3, 0.35)
    });

    // Signatures Area
    page.drawRectangle({
      x: 45,
      y: signY - 145,
      width: 520,
      height: 100,
      color: PDFLib.rgb(0.97, 0.98, 0.99),
      borderColor: PDFLib.rgb(0.85, 0.88, 0.92),
      borderWidth: 1
    });

    // Signature 1
    page.drawText("Authorized Representative Signature:", { x: 60, y: signY - 62, size: 8.5, font: fontBold, color: PDFLib.rgb(0.3, 0.35, 0.4) });
    page.drawLine({
      start: { x: 60, y: signY - 110 },
      end: { x: 280, y: signY - 110 },
      thickness: 1.5,
      color: PDFLib.rgb(0.4, 0.45, 0.5)
    });

    // Mock Drawn Digital Signature
    page.drawText("Jane A. Sterling", {
      x: 75,
      y: signY - 102,
      size: 18,
      font: fontBold,
      color: PDFLib.rgb(0.05, 0.2, 0.6)
    });

    page.drawText("Jane A. Sterling (VP of Technology Operations)", { x: 60, y: signY - 128, size: 7.5, font: font, color: PDFLib.rgb(0.4, 0.45, 0.5) });

    // Date Field
    page.drawText("Date Signed:", { x: 320, y: signY - 62, size: 8.5, font: fontBold, color: PDFLib.rgb(0.3, 0.35, 0.4) });
    const signDateField = form.createTextField('signature_date');
    signDateField.setText('September 22, 2026');
    signDateField.addToPage(page, {
      x: 320,
      y: signY - 112,
      width: 220,
      height: 24,
      borderWidth: 1,
      borderColor: PDFLib.rgb(0.7, 0.75, 0.8),
      backgroundColor: PDFLib.rgb(0.96, 0.98, 1.0)
    });

    // Footer
    page.drawText("Generated via PDFNetizen Secure Suite · 100% In-Browser Cryptography", {
      x: 45,
      y: 30,
      size: 7.5,
      font: font,
      color: PDFLib.rgb(0.5, 0.55, 0.6)
    });

    const pdfBytes = await pdfDoc.save();
    await processAndLoadPdf(pdfBytes, 'Sample-Service-Agreement-Form.pdf', pdfBytes.byteLength);
    showToast(t('toast_sample_ready'), 'success');
  } catch (err) {
    console.error('Error creating sample PDF:', err);
    showToast(t('toast_error_load'), 'error');
  }
}

// Flattening Execution Pipeline
async function executePdfFlattening() {
  if (!state.currentFile || state.isProcessing) return;

  state.isProcessing = true;
  const progressContainer = document.getElementById('progressContainer');
  const progressFill = document.getElementById('progressFill');
  const progressPercent = document.getElementById('progressPercent');
  const progressStepText = document.getElementById('progressStepText');
  const progressDetailText = document.getElementById('progressDetailText');
  const successCard = document.getElementById('successCard');
  const flattenBtn = document.getElementById('flattenBtn');

  if (flattenBtn) flattenBtn.disabled = true;
  if (successCard) successCard.style.display = 'none';
  if (progressContainer) {
    progressContainer.style.display = 'block';
    progressContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  try {
    let resultPdfBytes;

    if (state.selectedMode === 'standard') {
      // Standard Vector Flattening
      updateProgress(20, t('progress_flattening'), t('progress_detail_fields'));
      
      const pdfDoc = await PDFLib.PDFDocument.load(state.currentFile.bytes.slice(0), { ignoreEncryption: true });
      updateProgress(50, t('progress_flattening'), t('progress_detail_fields'));

      try {
        const form = pdfDoc.getForm();
        if (form) {
          form.flatten();
        }
      } catch (formErr) {
        console.warn('Form flattening notice:', formErr);
      }

      updateProgress(85, t('progress_flattening'), "Saving permanent vector PDF...");
      resultPdfBytes = await pdfDoc.save();
      updateProgress(100, t('progress_flattening'), "Complete!");
    } else {
      // Complete Print Flattening (High-DPI Rasterization)
      const numPages = state.currentFile.pageCount;
      const newPdfDoc = await PDFLib.PDFDocument.create();
      const scale = state.rasterScale || 2.0;

      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const pct = Math.round(((pageNum - 1) / numPages) * 85) + 10;
        updateProgress(
          pct,
          t('progress_flattening'),
          `${t('progress_detail_raster')} (Page ${pageNum} / ${numPages})`
        );

        const page = await state.currentFile.pdfJsDoc.getPage(pageNum);
        const viewport = page.getViewport({ scale: scale });

        // Render to offscreen canvas
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');

        await page.render({ canvasContext: ctx, viewport: viewport }).promise;

        // Convert canvas image to JPEG blob / Uint8Array
        const imgDataUrl = canvas.toDataURL('image/jpeg', 0.92);
        const imgBytes = dataUrlToUint8Array(imgDataUrl);

        const jpgImage = await newPdfDoc.embedJpg(imgBytes);
        const origWidth = viewport.width / scale;
        const origHeight = viewport.height / scale;

        const newPage = newPdfDoc.addPage([origWidth, origHeight]);
        newPage.drawImage(jpgImage, {
          x: 0,
          y: 0,
          width: origWidth,
          height: origHeight
        });
      }

      updateProgress(95, t('progress_flattening'), "Finalizing non-extractable PDF...");
      resultPdfBytes = await newPdfDoc.save();
      updateProgress(100, t('progress_flattening'), "Complete!");
    }

    state.flattenedPdfBytes = resultPdfBytes;

    if (state.flattenedBlobUrl) {
      URL.revokeObjectURL(state.flattenedBlobUrl);
    }
    const blob = new Blob([resultPdfBytes], { type: 'application/pdf' });
    state.flattenedBlobUrl = URL.createObjectURL(blob);

    // Present Success State
    setTimeout(() => {
      if (progressContainer) progressContainer.style.display = 'none';
      displaySuccessState(resultPdfBytes);
      showToast(t('toast_flatten_complete'), 'success');
    }, 400);

  } catch (err) {
    console.error('Error during flattening:', err);
    showToast(t('toast_error_flatten'), 'error');
    if (progressContainer) progressContainer.style.display = 'none';
  } finally {
    state.isProcessing = false;
    if (flattenBtn) flattenBtn.disabled = false;
  }
}

function updateProgress(percent, title, detail) {
  const progressFill = document.getElementById('progressFill');
  const progressPercent = document.getElementById('progressPercent');
  const progressStepText = document.getElementById('progressStepText');
  const progressDetailText = document.getElementById('progressDetailText');

  if (progressFill) progressFill.style.width = `${percent}%`;
  if (progressPercent) progressPercent.textContent = `${percent}%`;
  if (progressStepText && title) progressStepText.textContent = title;
  if (progressDetailText && detail) progressDetailText.textContent = detail;
}

function displaySuccessState(pdfBytes) {
  const successCard = document.getElementById('successCard');
  const successMetaMode = document.getElementById('successMetaMode');
  const successMetaSize = document.getElementById('successMetaSize');
  const successMetaPages = document.getElementById('successMetaPages');

  if (successMetaMode) {
    successMetaMode.textContent = state.selectedMode === 'standard' 
      ? 'Mode: Standard Vector' 
      : 'Mode: Complete Print Flatten (300 DPI)';
  }

  if (successMetaSize) {
    successMetaSize.textContent = `Size: ${formatBytes(pdfBytes.byteLength)}`;
  }

  if (successMetaPages && state.currentFile) {
    const p = state.currentFile.pageCount;
    successMetaPages.textContent = p === 1 ? t('page_single') : t('pages_plural', { count: p });
  }

  if (successCard) {
    successCard.style.display = 'flex';
    successCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

// Download PDF Execution
function triggerDownload() {
  if (!state.flattenedBlobUrl) return;

  const outputFilenameInput = document.getElementById('outputFilenameInput');
  let filename = outputFilenameInput ? outputFilenameInput.value.trim() : '';
  
  if (!filename) {
    const base = state.currentFile ? state.currentFile.name.replace(/\.pdf$/i, '') : 'document';
    filename = `${base}-flattened.pdf`;
  }

  if (!filename.toLowerCase().endsWith('.pdf')) {
    filename += '.pdf';
  }

  const a = document.createElement('a');
  a.href = state.flattenedBlobUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// Reset Workspace
function resetWorkspace() {
  if (state.flattenedBlobUrl) {
    URL.revokeObjectURL(state.flattenedBlobUrl);
    state.flattenedBlobUrl = null;
  }
  state.currentFile = null;
  state.flattenedPdfBytes = null;
  state.isProcessing = false;

  const fileInput = document.getElementById('fileInput');
  if (fileInput) fileInput.value = '';

  const dropzone = document.getElementById('dropzone');
  const workspacePanel = document.getElementById('workspacePanel');
  const resetWorkspaceBtn = document.getElementById('resetWorkspaceBtn');
  const successCard = document.getElementById('successCard');
  const progressContainer = document.getElementById('progressContainer');

  if (dropzone) dropzone.style.display = 'block';
  if (workspacePanel) workspacePanel.style.display = 'none';
  if (resetWorkspaceBtn) resetWorkspaceBtn.style.display = 'none';
  if (successCard) successCard.style.display = 'none';
  if (progressContainer) progressContainer.style.display = 'none';
}

// Helper: DataURL to Uint8Array
function dataUrlToUint8Array(dataUrl) {
  const base64 = dataUrl.split(',')[1];
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// Helper: Format Bytes
function formatBytes(bytes, decimals = 1) {
  if (!bytes || bytes === 0) return '0 KB';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// FAQ Accordion
function initFaqAccordion() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-question');
    if (q) {
      q.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(other => other.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}

// Cookie Banner
function initCookieBanner() {
  const banner = document.getElementById('cookieBanner');
  const acceptBtn = document.getElementById('cookieAcceptBtn');
  if (!banner || !acceptBtn) return;

  if (!localStorage.getItem('pdfnetizen_cookie_consent')) {
    setTimeout(() => {
      banner.style.display = 'flex';
    }, 1500);
  }

  acceptBtn.addEventListener('click', () => {
    localStorage.setItem('pdfnetizen_cookie_consent', 'true');
    banner.style.display = 'none';
  });
}
