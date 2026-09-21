/**
 * PDF to JPG Converter - High-DPI Client-Side Image Extraction Engine
 * Powered by Mozilla PDF.js & JSZip
 * 100% In-Browser Privacy • Zero Server Uploads • Batch & Single Download
 */

(function () {
  'use strict';

  // Configure PDF.js Worker
  if (window.pdfjsLib) {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  }

  // Bilingual Translation Dictionary
  const translations = {
    en: {
      badge_client_side: "100% Client-Side",
      nav_home: "Home",
      nav_annotator: "Annotator",
      nav_compress: "Compress PDF",
      nav_split: "Split PDF",
      nav_merge: "Merge PDF",
      breadcrumb_home: "Home",
      breadcrumb_tools: "Tools",
      breadcrumb_current: "PDF to JPG",
      hero_badge: "100% Client-Side • Ultra High-DPI Resolution • Zero Server Uploads",
      hero_title: 'Convert <span class="gradient-text">PDF to JPG</span> Images',
      hero_subtitle: "Extract and convert every PDF page into crisp, high-resolution JPG images directly inside your browser. Download single pages or batch export a complete ZIP archive in seconds.",
      dropzone_title: "Drop your PDF file here",
      dropzone_subtitle: "Select or drag & drop any PDF document to render pages with high-DPI clarity. 100% private in-browser conversion.",
      btn_browse: "Browse PDF File",
      btn_sample: "Try Sample PDF",
      feature_privacy: "100% Browser Privacy",
      feature_dpi: "Up to 300 DPI Maximum Quality",
      feature_zip: "Batch ZIP Archive Packaging",
      feature_instant: "Instant Page Previews",
      btn_change_pdf: "Change PDF",
      btn_clear: "Clear",
      config_title: "Conversion Settings",
      label_quality: "Image Resolution & Quality",
      quality_standard: "Standard",
      quality_high: "High",
      quality_maximum: "Maximum",
      badge_recommended: "Recommended",
      label_pages_filter: "Pages to Convert",
      filter_all: "All Pages",
      filter_odd: "Odd Pages",
      filter_even: "Even Pages",
      filter_custom: "Custom Range",
      placeholder_custom_range: "e.g. 1, 3-5, 8",
      label_selected: "Selected Pages:",
      btn_download_zip: "Download All as ZIP (.zip)",
      btn_download_selected_zip: "Download Selected as ZIP (.zip)",
      progress_rendering: "Rendering pages at high-DPI...",
      progress_zipping: "Packaging images into ZIP archive...",
      progress_complete: "Conversion complete!",
      grid_title: "Document Pages Preview",
      btn_select_all: "Select All",
      btn_deselect_all: "Deselect All",
      btn_download_jpg: "Download JPG",
      btn_preview_zoom: "Enlarge Preview",
      ad_space_label: "Advertisement Space (728x90)",
      seo_badge: "100% Client-Side Private Conversion",
      seo_title: "How to Convert PDF to JPG Images Online for Free",
      seo_subtitle: "Transform multi-page documents, presentations, and scans into crystal-clear JPG image files with full on-device privacy.",
      guide_h2: "3 Simple Steps to Convert PDF Pages to JPG",
      guide_p: "Whether you need to share a single PDF page on social media, embed a document slide in a presentation, or save high-resolution graphics, PDFNetizen gives you the fastest, most private way to turn PDF pages into JPG images:",
      step1_title: "1. Upload Your PDF",
      step1_desc: "Drag and drop your PDF document into the secure dropzone or browse files from your desktop or mobile device.",
      step2_title: "2. Choose Quality & Pages",
      step2_desc: "Select your desired resolution (Standard, High, or Maximum) and choose specific pages or convert all pages at once.",
      step3_title: "3. Download JPG or ZIP",
      step3_desc: "Click to download individual pages directly as high-quality .jpg files or download the entire batch neatly packaged in a .zip archive.",
      table_h2: "DPI Resolution & Quality Comparison",
      table_p: "Compare our resolution scaling levels to find the perfect balance between crisp image detail and file size:",
      th_preset: "Quality Preset",
      th_scale: "Scale Factor",
      th_dpi: "Approx. DPI",
      th_usecase: "Recommended Use Case",
      th_filesize: "Relative File Size",
      td_standard_use: "Fast web sharing, email attachments, lightweight previews",
      td_high_use: "Presentations, reading, digital reports, crisp text graphics",
      td_max_use: "Professional printing, fine print legal scans, blueprints, ultra HD",
      features_h2: "Why Convert PDF to JPG with PDFNetizen?",
      fb_privacy_title: "100% Client-Side Privacy",
      fb_privacy_desc: "All rendering is executed directly within your browser's private memory using Mozilla PDF.js. Your sensitive contracts, medical records, and financial statements never touch an external server.",
      fb_dpi_title: "Pixel-Perfect High-DPI Output",
      fb_dpi_desc: "Our engine renders text and vector assets on high-density HTML5 canvases up to 300 DPI, preventing blurry text or pixelated illustrations.",
      fb_zip_title: "One-Click Batch ZIP Export",
      fb_zip_desc: "Effortlessly convert multi-page documents and bundle dozens of images into a single, clean .zip file packaged instantly in memory via JSZip.",
      fb_free_title: "No Sign-Up or Hidden Fees",
      fb_free_desc: "Enjoy complete access with zero account registration, email prompts, subscriptions, or intrusive watermarks on your converted images.",
      fb_cross_title: "Universal Compatibility",
      fb_cross_desc: "Works seamlessly across Chrome, Safari, Edge, and Firefox on Windows, Mac, Linux, iOS, iPadOS, and Android without installing plugins.",
      fb_preview_title: "Live Interactive Thumbnails",
      fb_preview_desc: "Inspect visual previews of every page, toggle selective pages, zoom into full-screen details, or copy images directly to your clipboard.",
      faq_h2: "Frequently Asked Questions",
      faq_q1: "How do I convert a PDF to JPG images online for free?",
      faq_a1: "Drag and drop your PDF file into the upload dropzone, select your desired resolution quality (Standard, High, or Maximum), preview the rendered pages, and click 'Download All as ZIP' or download individual pages as JPG files.",
      faq_q2: "Are my PDF files uploaded to any external server?",
      faq_a2: "No. All conversion operations run 100% locally inside your web browser using Mozilla PDF.js and HTML5 Canvas. Your sensitive documents never leave your computer or mobile device.",
      faq_q3: "What image resolution and DPI options are available?",
      faq_a3: "You can choose between Standard (~72-96 DPI for web sharing and compact size), High (~150-200 DPI for sharp document clarity), and Maximum (~300 DPI for crystal-clear print quality and vector fidelity).",
      faq_q4: "Can I extract only specific pages instead of the whole document?",
      faq_a4: "Yes! You can use page range presets (Odd, Even, Custom) or manually toggle individual checkboxes on each page card to extract only the exact pages you need.",
      faq_q5: "Is there any watermark or file size limit?",
      faq_a5: "There are zero watermarks added and no daily file conversion caps. PDFNetizen is completely free with unlimited usage.",
      footer_tagline: "100% Client-side, private, and secure document processing directly in your browser.",
      footer_privacy: "Privacy Policy",
      footer_terms: "Terms of Service",
      footer_contact: "Contact Us",
      footer_copyright: "© 2026 PDFNetizen. All rights reserved.",
      cookie_consent_text: "We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.",
      cookie_learn_more: "Privacy Policy",
      cookie_accept_btn: "Accept",
      toast_loaded: "PDF document loaded successfully: {pages} pages.",
      toast_sample: "Sample PDF document loaded.",
      toast_single_downloaded: "Page {page} downloaded as JPG.",
      toast_zip_downloaded: "Batch ZIP archive downloaded successfully ({count} images).",
      toast_no_pages: "Please select at least one page to convert.",
      toast_error_load: "Failed to load PDF file. Please ensure it is a valid, uncorrupted PDF.",
      toast_copied: "Image copied to clipboard!"
    },
    ar: {
      badge_client_side: "محلي ١٠٠٪ في المتصفح",
      nav_home: "الرئيسية",
      nav_annotator: "المحرر",
      nav_compress: "ضغط PDF",
      nav_split: "تقسيم PDF",
      nav_merge: "دمج PDF",
      breadcrumb_home: "الرئيسية",
      breadcrumb_tools: "الأدوات",
      breadcrumb_current: "تحويل PDF إلى JPG",
      hero_badge: "معالجة محلية ١٠٠٪ • دقة فائقة حتى 300 DPI • أمان وخصوصية مطلقة",
      hero_title: 'تحويل صفحات <span class="gradient-text">PDF إلى صور JPG</span>',
      hero_subtitle: "استخرج وحوّل كل صفحة داخل مستند PDF إلى صورة JPG عالية النقاء والدقة مباشرة داخل متصفحك. حمّل صفحات مفردة أو صدّر الألبوم بالكامل كملف ZIP مدمج في ثوانٍ.",
      dropzone_title: "أفلت ملف PDF هنا",
      dropzone_subtitle: "اختر أو اسحب وأفلت أي مستند PDF لمعاينة وتحويل صفحاته بدقة فائقة. معالجة آمنة ومحلية ١٠٠٪ داخل المتصفح.",
      btn_browse: "تصفح ملف PDF",
      btn_sample: "تجربة مستند نموذجي",
      feature_privacy: "خصوصية تامة داخل المتصفح",
      feature_dpi: "دقة فائقة تصل إلى 300 DPI",
      feature_zip: "تحميل دفعة واحدة بملف ZIP",
      feature_instant: "معاينة فورية لكافة الصفحات",
      btn_change_pdf: "تغيير المستند",
      btn_clear: "مسح",
      config_title: "إعدادات التحويل والدقة",
      label_quality: "دقة ووضوح الصورة المخرجة",
      quality_standard: "قياسية",
      quality_high: "عالية",
      quality_maximum: "فائقة الدقة",
      badge_recommended: "موصى بها",
      label_pages_filter: "الصفحات المراد تحويلها",
      filter_all: "كل الصفحات",
      filter_odd: "الصفحات الفردية",
      filter_even: "الصفحات الزوجية",
      filter_custom: "نطاق مخصص",
      placeholder_custom_range: "مثال: 1, 3-5, 8",
      label_selected: "الصفحات المحددة:",
      btn_download_zip: "تحميل الكل كملف ZIP (.zip)",
      btn_download_selected_zip: "تحميل الصفحات المحددة كملف ZIP (.zip)",
      progress_rendering: "جارٍ تصيير الصفحات بدقة عالية...",
      progress_zipping: "جارٍ تجميع وضغط الصور في ملف ZIP...",
      progress_complete: "اكتمل التحويل بنجاح!",
      grid_title: "معاينة صفحات المستند",
      btn_select_all: "تحديد الكل",
      btn_deselect_all: "إلغاء التحديد",
      btn_download_jpg: "تحميل JPG",
      btn_preview_zoom: "تكبير المعاينة",
      ad_space_label: "مساحة إعلانية (728×90)",
      seo_badge: "تحويل محلي وخاص ١٠٠٪",
      seo_title: "كيفية تحويل ملفات PDF إلى صور JPG مجاناً عبر الإنترنت",
      seo_subtitle: "حوّل المستندات متعددة الصفحات والعروض والمسوح الضوئية إلى صور JPG فائقة الوضوح مع الحفاظ التام على سرية بياناتك.",
      guide_h2: "٣ خطوات سهلة لتحويل صفحات PDF إلى JPG",
      guide_p: "سواء كنت ترغب في مشاركة صفحة PDF على وسائل التواصل، أو إدراج شريحة في عرض تقديمي، أو استخراج رسومات عالية الدقة، يمنحك PDFNetizen الطريقة الأسرع والأكثر خصوصية:",
      step1_title: "١. رفع مستند PDF",
      step1_desc: "اسحب وأفلت مستند PDF داخل منطقة الرفع الآمنة أو تصفح من جهازك المكتبي أو المحمول.",
      step2_title: "٢. اختيار الدقة والصفحات",
      step2_desc: "حدد مستوى الدقة المطلوب (قياسية، عالية، فائقة) واختر صفحات معينة أو حول كامل المستند دفعة واحدة.",
      step3_title: "٣. تحميل JPG أو ZIP",
      step3_desc: "انقر لتحميل الصفحات الفردية مباشرة بصيغة JPG عالية الجودة أو نزل الحزمة كاملة كملف أرشيف ZIP مدمج.",
      table_h2: "مقارنة مستويات دقة DPI وحجم الصور",
      table_p: "قارن بين خيارات الدقة المتوفرة لاختيار التوازن المثالي بين نقاء التفاصيل وحجم الملف:",
      th_preset: "مستوى الجودة",
      th_scale: "معامل التكبير",
      th_dpi: "الدقة التقريبية (DPI)",
      th_usecase: "الاستخدام الموصى به",
      th_filesize: "حجم الملف النسبي",
      td_standard_use: "المشاركة السريعة عبر الويب، البريد الإلكتروني، المعاينات الخفيفة",
      td_high_use: "العروض التقديمية، القراءة، التقارير الرقمية، النصوص الواضحة",
      td_max_use: "الطباعة الاحترافية، العقود والمخططات الهندسية فائقة الدقة",
      features_h2: "لماذا تختار محول PDF إلى JPG من PDFNetizen؟",
      fb_privacy_title: "خصوصية محلية بنسبة ١٠٠٪",
      fb_privacy_desc: "تتم المعالجة بالكامل داخل الذاكرة المحلية لمتصفحك عبر Mozilla PDF.js. لا ترفع مستنداتك أو سجلاتك الحساسة إلى أي خوادم خارجية إطلاقاً.",
      fb_dpi_title: "دقة متناهية تصل إلى 300 DPI",
      fb_dpi_desc: "يرسم المحرك النصوص والرسومات المتجهة على لوحات HTML5 عالية الكثافة لمنع أي تشوش أو ضبابية.",
      fb_zip_title: "تصدير فوري بحزمة ZIP بضغطة زر",
      fb_zip_desc: "حوّل عشرات الصفحات واجمعها في ملف ZIP واحد منظم فورياً دون انتظار.",
      fb_free_title: "مجاني بالكامل وبدون قيود",
      fb_free_desc: "استمتع بالأداة بلا قيود على عدد الصفحات، وبدون اشتراكات أو علامات مائية على الصور.",
      fb_cross_title: "توافق شامل مع كافة الأجهزة",
      fb_cross_desc: "يعمل بسلاسة فائقة على أجهزة Windows و Mac و iPhone و iPad و Android والمتصفحات الحديثة.",
      fb_preview_title: "معاينة بصرية تفاعلية",
      fb_preview_desc: "عاين كل صفحة، حدد الصفحات المطلوبة، كبّر للاطلاع على أدق التفاصيل أو انسخ الصور مباشرة.",
      faq_h2: "الأسئلة الشائعة",
      faq_q1: "كيف يمكنني تحويل PDF إلى صور JPG مجاناً عبر الإنترنت؟",
      faq_a1: "اسحب وأفلت ملف PDF في منطقة التحميل، اختر مستوى الدقة المطلوب (قياسية أو عالية أو فائقة)، ثم انقر على تحميل الكل كملف ZIP أو حمّل كل صفحة بشكل منفصل.",
      faq_q2: "هل يتم رفع ملفاتي إلى أي خادم خارجي؟",
      faq_a2: "كلا على الإطلاق. تعمل كافة أدواتنا بمعالجة محلية ١٠٠٪ داخل متصفحك عبر Mozilla PDF.js دون أي رفع سحابي لضمان سرية مستنداتك.",
      faq_q3: "ما هي مستويات الدقة و DPI المتوفرة؟",
      faq_a3: "يمكنك الاختيار بين الجودة القياسية (~72-96 DPI للويب)، والعالية (~150-200 DPI للمستندات)، والفائقة (~300 DPI للطباعة والمخططات الدقيقة).",
      faq_q4: "هل يمكنني استخراج صفحات محددة بدلاً من كامل المستند؟",
      faq_a4: "نعم بالتأكيد! يمكنك اختيار النطاق الفردي أو الزوجي أو تخصيص أرقام الصفحات المطلوبة يدوياً أو عبر مربعات الاختيار في كل بطاقة.",
      faq_q5: "هل توجد أي علامات مائية أو حدود للحجم؟",
      faq_a5: "لا توجد أي علامات مائية مضافة ولا حدود يومية لعدد التحويلات، الأداة مجانية بالكامل.",
      footer_tagline: "معالجة مستندات محلية ١٠٠٪، خاصة وآمنة تماماً مباشرة في متصفحك.",
      footer_privacy: "سياسة الخصوصية",
      footer_terms: "شروط الاستخدام",
      footer_contact: "اتصل بنا",
      footer_copyright: "© ٢٠٢٦ PDFNetizen. جميع الحقوق محفوظة.",
      cookie_consent_text: "نحن نستخدم ملفات تعريف الارتباط لتحسين تجربتك. باستمرارك في زيارة هذا الموقع، فإنك توافق على استخدامنا لملفات تعريف الارتباط.",
      cookie_learn_more: "سياسة الخصوصية",
      cookie_accept_btn: "موافق",
      toast_loaded: "تم تحميل مستند PDF بنجاح: {pages} صفحات.",
      toast_sample: "تم تحميل المستند النموذجي بنجاح.",
      toast_single_downloaded: "تم تحميل الصفحة {page} كصورة JPG.",
      toast_zip_downloaded: "تم تنزيل الأرشيف المضغوط بنجاح ({count} صورة).",
      toast_no_pages: "يرجى اختيار صفحة واحدة على الأقل للتحويل.",
      toast_error_load: "فشل تحميل مستند PDF. يرجى التأكد من سلامة الملف وصيغته.",
      toast_copied: "تم نسخ الصورة إلى الحافظة بنجاح!"
    }
  };

  let currentLang = 'en';

  // Quality Preset Profiles
  const QUALITY_PROFILES = {
    standard: {
      scale: 1.0,
      jpegQuality: 0.85,
      hint: "Scale 1x • ~72-96 DPI (Fast)"
    },
    high: {
      scale: 2.0,
      jpegQuality: 0.92,
      hint: "Scale 2x • ~150-200 DPI (Recommended)"
    },
    maximum: {
      scale: 3.0,
      jpegQuality: 0.98,
      hint: "Scale 3x • ~300 DPI (Studio / Print)"
    }
  };

  // State
  let pdfDoc = null;
  let rawPdfBuffer = null;
  let docFileName = "document";
  let totalPages = 0;
  let selectedPages = new Set();
  let renderedPageThumbnails = []; // cached thumbnail data URLs
  let currentQuality = 'high';
  let isConverting = false;

  // DOM Element References
  const dropzone = document.getElementById('dropzone');
  const dropzoneCard = document.getElementById('dropzone-card');
  const fileInput = document.getElementById('pdf-file-input');
  const btnBrowse = document.getElementById('btn-browse-file');
  const btnSample = document.getElementById('btn-sample-file');

  const workspaceSection = document.getElementById('workspace-section');
  const docFilenameEl = document.getElementById('doc-filename');
  const docPageCountEl = document.getElementById('doc-page-count');
  const docFileSizeEl = document.getElementById('doc-file-size');
  const btnChangeDoc = document.getElementById('btn-change-doc');
  const btnResetDoc = document.getElementById('btn-reset-doc');

  const qualityPills = document.querySelectorAll('.quality-pill');
  const qualityScaleHint = document.getElementById('quality-scale-hint');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const customRangeBox = document.getElementById('custom-range-box');
  const customRangeInput = document.getElementById('custom-range-input');

  const selectedCountBadge = document.getElementById('selected-count-badge');
  const btnDownloadZip = document.getElementById('btn-download-zip');
  const zipBtnText = document.getElementById('zip-btn-text');
  const progressContainer = document.getElementById('progress-container');
  const progressMsg = document.getElementById('progress-msg');
  const progressPercent = document.getElementById('progress-percent');
  const progressBar = document.getElementById('progress-bar');

  const pagesGrid = document.getElementById('pages-grid');
  const btnSelectAll = document.getElementById('btn-select-all');
  const btnDeselectAll = document.getElementById('btn-deselect-all');

  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxDims = document.getElementById('lightbox-dims');
  const btnCloseLightbox = document.getElementById('btn-close-lightbox');
  const btnLightboxDownload = document.getElementById('btn-lightbox-download');
  let activeLightboxPage = 1;

  const toastEl = document.getElementById('toast');
  const toastMessageEl = document.getElementById('toast-message');
  let toastTimeout = null;

  const btnLanguageToggle = document.getElementById('btn-language-toggle');
  const langToggleText = document.getElementById('lang-toggle-text');

  // Format File Size
  function formatBytes(bytes) {
    if (!bytes || bytes === 0) return '0 KB';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Show Toast Notification
  function showToast(msg, iconName = 'info') {
    if (!toastEl) return;
    if (toastTimeout) clearTimeout(toastTimeout);

    toastMessageEl.textContent = msg;
    const toastIcon = document.getElementById('toast-icon');
    if (toastIcon) {
      toastIcon.setAttribute('data-lucide', iconName);
    }
    if (window.lucide) lucide.createIcons();

    toastEl.classList.remove('hidden');
    toastTimeout = setTimeout(() => {
      toastEl.classList.add('hidden');
    }, 3600);
  }

  // Language & i18n
  function applyLanguage(lang) {
    currentLang = lang;
    const isAr = (lang === 'ar');

    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;

    if (langToggleText) {
      langToggleText.textContent = isAr ? 'English' : 'العربية';
    }

    const dict = translations[currentLang] || translations.en;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.innerHTML = dict[key];
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key]) {
        el.setAttribute('placeholder', dict[key]);
      }
    });

    updateSelectionUI();

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  function toggleLanguage() {
    currentLang = (currentLang === 'en') ? 'ar' : 'en';
    applyLanguage(currentLang);
  }

  if (btnLanguageToggle) {
    btnLanguageToggle.addEventListener('click', toggleLanguage);
  }

  // Drag and Drop & File Selection
  if (dropzoneCard && fileInput) {
    dropzoneCard.addEventListener('click', () => fileInput.click());

    ['dragenter', 'dragover'].forEach(eventName => {
      dropzoneCard.addEventListener(eventName, e => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.add('drag-over');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropzoneCard.addEventListener(eventName, e => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.remove('drag-over');
      });
    });

    dropzoneCard.addEventListener('drop', e => {
      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        handleFileSelection(files[0]);
      }
    });

    fileInput.addEventListener('change', e => {
      if (e.target.files && e.target.files.length > 0) {
        handleFileSelection(e.target.files[0]);
      }
    });
  }

  if (btnBrowse && fileInput) {
    btnBrowse.addEventListener('click', e => {
      e.stopPropagation();
      fileInput.click();
    });
  }

  if (btnChangeDoc && fileInput) {
    btnChangeDoc.addEventListener('click', () => fileInput.click());
  }

  if (btnResetDoc) {
    btnResetDoc.addEventListener('click', resetDocument);
  }

  // Load Sample PDF
  if (btnSample) {
    btnSample.addEventListener('click', e => {
      e.stopPropagation();
      loadSamplePdf();
    });
  }

  // Handle PDF File
  async function handleFileSelection(file) {
    if (!file || (file.type && file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf'))) {
      const dict = translations[currentLang] || translations.en;
      showToast(dict.toast_error_load, 'alert-circle');
      return;
    }

    docFileName = file.name.replace(/\.[^/.]+$/, "") || "document";
    const fileSize = formatBytes(file.size);

    try {
      const arrayBuffer = await file.arrayBuffer();
      rawPdfBuffer = arrayBuffer;
      await processLoadedPdf(arrayBuffer, file.name, fileSize);
    } catch (err) {
      console.error("Error reading PDF file:", err);
      const dict = translations[currentLang] || translations.en;
      showToast(dict.toast_error_load, 'alert-circle');
    }
  }

  // Generate a minimal demo multi-page PDF on the fly for Sample preview
  async function loadSamplePdf() {
    docFileName = "sample_presentation";
    const sampleSize = "240 KB";

    // Build a multi-page PDF binary stream with vector elements and text
    const samplePdfBytes = generateDemoPdfBytes();
    rawPdfBuffer = samplePdfBytes.buffer;
    await processLoadedPdf(samplePdfBytes.buffer, "sample_presentation.pdf", sampleSize);

    const dict = translations[currentLang] || translations.en;
    showToast(dict.toast_sample, 'sparkles');
  }

  // Minimal valid PDF binary generator (3 pages, colorful charts, clean typography)
  function generateDemoPdfBytes() {
    const pdfSource = `%PDF-1.4
1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj
2 0 obj << /Type /Pages /Kids [3 0 R 4 0 R 5 0 R] /Count 3 >> endobj
3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 6 0 R >> >> /Contents 7 0 R >> endobj
4 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 6 0 R >> >> /Contents 8 0 R >> endobj
5 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 6 0 R >> >> /Contents 9 0 R >> endobj
6 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >> endobj
7 0 obj << /Length 260 >> stream
0.96 0.62 0.04 rg 40 700 532 50 re f
0.07 0.09 0.15 rg 40 40 532 640 re f
1 1 1 rg
BT /F1 28 Tf 60 715 Td (PDFNetizen - Sample Page 01) Tj ET
BT /F1 16 Tf 60 620 Td (High-Resolution Client-Side PDF to JPG Converter) Tj ET
BT /F1 12 Tf 60 580 Td (100% Private - In-Browser JavaScript & WebAssembly Engine) Tj ET
0.23 0.51 0.96 rg 60 400 492 120 re f
1 1 1 rg
BT /F1 14 Tf 80 460 Td (Vector Charts & Graphics are rendered at full DPI clarity) Tj ET
endstream endobj
8 0 obj << /Length 230 >> stream
0.06 0.72 0.49 rg 40 700 532 50 re f
0.07 0.09 0.15 rg 40 40 532 640 re f
1 1 1 rg
BT /F1 28 Tf 60 715 Td (Sample Page 02 - Analytics Report) Tj ET
BT /F1 16 Tf 60 620 Td (Executive Summary & Key Performance Indicators) Tj ET
0.96 0.25 0.37 rg 60 380 230 180 re f
0.62 0.35 0.96 rg 320 380 230 180 re f
1 1 1 rg
BT /F1 14 Tf 80 470 Td (Quarterly Revenue: +42%) Tj ET
BT /F1 14 Tf 340 470 Td (Customer Growth: +88%) Tj ET
endstream endobj
9 0 obj << /Length 210 >> stream
0.62 0.35 0.96 rg 40 700 532 50 re f
0.07 0.09 0.15 rg 40 40 532 640 re f
1 1 1 rg
BT /F1 28 Tf 60 715 Td (Sample Page 03 - Conclusion & Notes) Tj ET
BT /F1 16 Tf 60 620 Td (Ready for Instant Single or Batch ZIP Download) Tj ET
0.96 0.62 0.04 rg 60 420 492 100 re f
1 1 1 rg
BT /F1 14 Tf 80 465 Td (Click 'Download All as ZIP' to test packaging in seconds!) Tj ET
endstream endobj
xref
0 10
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000133 00000 n 
0000000257 00000 n 
0000000381 00000 n 
0000000505 00000 n 
0000000582 00000 n 
0000000893 00000 n 
0000001174 00000 n 
trailer << /Size 10 /Root 1 0 R >>
startxref
1435
%%EOF`;

    const encoder = new TextEncoder();
    return encoder.encode(pdfSource);
  }

  // Process Loaded PDF buffer
  async function processLoadedPdf(arrayBuffer, name, sizeStr) {
    if (!window.pdfjsLib) {
      alert("PDF.js library is loading, please try again in a moment.");
      return;
    }

    try {
      const loadingTask = window.pdfjsLib.getDocument({ data: arrayBuffer });
      pdfDoc = await loadingTask.promise;
      totalPages = pdfDoc.numPages;

      // Update UI metadata
      docFilenameEl.textContent = name;
      docPageCountEl.textContent = `${totalPages} ${totalPages === 1 ? 'Page' : 'Pages'}`;
      docFileSizeEl.textContent = sizeStr;

      // Reset selection: select all by default
      selectedPages = new Set();
      for (let i = 1; i <= totalPages; i++) {
        selectedPages.add(i);
      }

      // Transition views
      dropzone.style.display = 'none';
      workspaceSection.classList.add('active');

      // Populate preview grid
      await renderThumbnailsGrid();
      updateSelectionUI();

      const dict = translations[currentLang] || translations.en;
      showToast(dict.toast_loaded.replace('{pages}', totalPages), 'check-circle-2');

    } catch (err) {
      console.error("PDF loading error:", err);
      const dict = translations[currentLang] || translations.en;
      showToast(dict.toast_error_load, 'alert-circle');
    }
  }

  // Reset Document State
  function resetDocument() {
    pdfDoc = null;
    rawPdfBuffer = null;
    totalPages = 0;
    selectedPages.clear();
    renderedPageThumbnails = [];
    pagesGrid.innerHTML = '';

    if (fileInput) fileInput.value = '';

    workspaceSection.classList.remove('active');
    dropzone.style.display = 'block';
  }

  // Render Thumbnails Grid with fast lightweight preview scale
  async function renderThumbnailsGrid() {
    pagesGrid.innerHTML = '';
    renderedPageThumbnails = [];

    const dict = translations[currentLang] || translations.en;

    // Build skeleton cards first for instant visual feedback
    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
      const card = document.createElement('div');
      card.className = 'page-card';
      card.id = `page-card-${pageNum}`;

      card.innerHTML = `
        <div class="page-card-header">
          <label class="page-checkbox-label">
            <input type="checkbox" class="page-checkbox" data-page="${pageNum}" checked>
            <span>Page ${pageNum}</span>
          </label>
          <span class="page-dim-badge" id="dim-badge-${pageNum}">Calculating...</span>
        </div>
        <div class="page-thumb-wrapper" id="thumb-wrap-${pageNum}">
          <div class="skeleton-thumb"></div>
          <div class="thumb-overlay">
            <button type="button" class="thumb-action-btn btn-zoom" data-page="${pageNum}" title="${dict.btn_preview_zoom}">
              <i data-lucide="zoom-in"></i>
            </button>
            <button type="button" class="thumb-action-btn btn-quick-download" data-page="${pageNum}" title="${dict.btn_download_jpg}">
              <i data-lucide="download"></i>
            </button>
          </div>
        </div>
        <div class="page-card-footer">
          <button type="button" class="btn btn-secondary btn-download-single" data-page="${pageNum}">
            <i data-lucide="download"></i>
            <span>${dict.btn_download_jpg}</span>
          </button>
        </div>
      `;

      pagesGrid.appendChild(card);
    }

    if (window.lucide) lucide.createIcons();

    // Render thumbnail canvases progressively
    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
      try {
        const page = await pdfDoc.getPage(pageNum);
        const unscaledViewport = page.getViewport({ scale: 1.0 });

        // Dimensions badge
        const dimBadge = document.getElementById(`dim-badge-${pageNum}`);
        if (dimBadge) {
          dimBadge.textContent = `${Math.round(unscaledViewport.width)} × ${Math.round(unscaledViewport.height)} pt`;
        }

        // Thumbnail render scale (~300px width preview)
        const thumbScale = Math.min(1.5, 340 / unscaledViewport.width);
        const thumbViewport = page.getViewport({ scale: thumbScale });

        const canvas = document.createElement('canvas');
        canvas.width = Math.floor(thumbViewport.width);
        canvas.height = Math.floor(thumbViewport.height);
        const ctx = canvas.getContext('2d', { alpha: false });

        // Pure white background for crisp JPEG appearance
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        await page.render({ canvasContext: ctx, viewport: thumbViewport }).promise;

        const thumbWrap = document.getElementById(`thumb-wrap-${pageNum}`);
        if (thumbWrap) {
          const skeleton = thumbWrap.querySelector('.skeleton-thumb');
          if (skeleton) skeleton.remove();
          thumbWrap.insertBefore(canvas, thumbWrap.firstChild);
        }

        renderedPageThumbnails[pageNum] = canvas;

      } catch (err) {
        console.error(`Error rendering preview for page ${pageNum}:`, err);
      }
    }

    attachGridEventListeners();
  }

  // Attach Grid Event Listeners
  function attachGridEventListeners() {
    // Checkbox toggles
    document.querySelectorAll('.page-checkbox').forEach(cb => {
      cb.addEventListener('change', e => {
        const p = parseInt(e.target.getAttribute('data-page'), 10);
        if (e.target.checked) {
          selectedPages.add(p);
        } else {
          selectedPages.delete(p);
        }
        updateSelectionUI();
      });
    });

    // Zoom buttons
    document.querySelectorAll('.btn-zoom').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const p = parseInt(btn.getAttribute('data-page'), 10);
        openLightbox(p);
      });
    });

    // Quick download buttons on thumbnail hover & card footer
    document.querySelectorAll('.btn-quick-download, .btn-download-single').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const p = parseInt(btn.getAttribute('data-page'), 10);
        downloadSinglePageJpg(p);
      });
    });

    // Clicking thumbnail wrapper directly opens lightbox
    document.querySelectorAll('.page-thumb-wrapper').forEach(wrap => {
      wrap.addEventListener('click', e => {
        if (e.target.closest('.thumb-action-btn')) return;
        const p = parseInt(wrap.id.replace('thumb-wrap-', ''), 10);
        if (p) openLightbox(p);
      });
    });
  }

  // Quality Preset Selection
  qualityPills.forEach(pill => {
    pill.addEventListener('click', () => {
      qualityPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const radio = pill.querySelector('input[type="radio"]');
      if (radio) {
        radio.checked = true;
        currentQuality = radio.value;
      }

      const profile = QUALITY_PROFILES[currentQuality] || QUALITY_PROFILES.high;
      if (qualityScaleHint) {
        qualityScaleHint.textContent = profile.hint;
      }
    });
  });

  // Page Filtering Presets
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterType = btn.getAttribute('data-filter');
      if (filterType === 'custom') {
        customRangeBox.classList.add('active');
        if (customRangeInput) customRangeInput.focus();
        applyCustomRangeFilter();
      } else {
        customRangeBox.classList.remove('active');
        applyPresetFilter(filterType);
      }
    });
  });

  if (customRangeInput) {
    customRangeInput.addEventListener('input', applyCustomRangeFilter);
  }

  function applyPresetFilter(filterType) {
    selectedPages.clear();
    for (let i = 1; i <= totalPages; i++) {
      if (filterType === 'all') {
        selectedPages.add(i);
      } else if (filterType === 'odd' && i % 2 !== 0) {
        selectedPages.add(i);
      } else if (filterType === 'even' && i % 2 === 0) {
        selectedPages.add(i);
      }
    }
    syncCheckboxesWithState();
  }

  function applyCustomRangeFilter() {
    if (!customRangeInput) return;
    const val = customRangeInput.value.trim();
    selectedPages.clear();

    if (!val) {
      syncCheckboxesWithState();
      return;
    }

    const parts = val.split(',');
    parts.forEach(part => {
      const trimmed = part.trim();
      if (trimmed.includes('-')) {
        const [startStr, endStr] = trimmed.split('-');
        const start = parseInt(startStr, 10);
        const end = parseInt(endStr, 10);
        if (!isNaN(start) && !isNaN(end)) {
          const min = Math.max(1, Math.min(start, end));
          const max = Math.min(totalPages, Math.max(start, end));
          for (let i = min; i <= max; i++) {
            selectedPages.add(i);
          }
        }
      } else {
        const p = parseInt(trimmed, 10);
        if (!isNaN(p) && p >= 1 && p <= totalPages) {
          selectedPages.add(p);
        }
      }
    });

    syncCheckboxesWithState();
  }

  function syncCheckboxesWithState() {
    document.querySelectorAll('.page-checkbox').forEach(cb => {
      const p = parseInt(cb.getAttribute('data-page'), 10);
      cb.checked = selectedPages.has(p);
    });
    updateSelectionUI();
  }

  // Select / Deselect All
  if (btnSelectAll) {
    btnSelectAll.addEventListener('click', () => {
      selectedPages.clear();
      for (let i = 1; i <= totalPages; i++) selectedPages.add(i);
      syncCheckboxesWithState();
    });
  }

  if (btnDeselectAll) {
    btnDeselectAll.addEventListener('click', () => {
      selectedPages.clear();
      syncCheckboxesWithState();
    });
  }

  // Update Selection UI Badges & Card Styles
  function updateSelectionUI() {
    const dict = translations[currentLang] || translations.en;

    if (selectedCountBadge) {
      selectedCountBadge.textContent = `${selectedPages.size} / ${totalPages}`;
    }

    // Update ZIP button state
    if (btnDownloadZip) {
      btnDownloadZip.disabled = (selectedPages.size === 0 || isConverting);
      if (zipBtnText) {
        if (selectedPages.size === totalPages) {
          zipBtnText.textContent = dict.btn_download_zip;
        } else {
          zipBtnText.textContent = `${dict.btn_download_selected_zip} (${selectedPages.size})`;
        }
      }
    }

    // Toggle card deselected class
    for (let p = 1; p <= totalPages; p++) {
      const card = document.getElementById(`page-card-${p}`);
      if (card) {
        if (selectedPages.has(p)) {
          card.classList.remove('deselected');
        } else {
          card.classList.add('deselected');
        }
      }
    }
  }

  // Render a specific page at target quality scale and return its JPG Blob
  async function renderPageToJpgBlob(pageNum, qualityConfig) {
    const page = await pdfDoc.getPage(pageNum);
    const viewport = page.getViewport({ scale: qualityConfig.scale });

    const canvas = document.createElement('canvas');
    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);
    const ctx = canvas.getContext('2d', { alpha: false });

    // Fill white background for clean JPEG export
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    await page.render({ canvasContext: ctx, viewport: viewport }).promise;

    return new Promise((resolve) => {
      canvas.toBlob(blob => {
        resolve({ blob, width: canvas.width, height: canvas.height, canvas });
      }, 'image/jpeg', qualityConfig.jpegQuality);
    });
  }

  // Pad number helper: page 1 of 12 => "01"
  function padNumber(num, total) {
    const digits = Math.max(2, total.toString().length);
    return num.toString().padStart(digits, '0');
  }

  // Single Page Direct JPG Download
  async function downloadSinglePageJpg(pageNum) {
    if (!pdfDoc || isConverting) return;

    try {
      const profile = QUALITY_PROFILES[currentQuality] || QUALITY_PROFILES.high;
      const { blob } = await renderPageToJpgBlob(pageNum, profile);

      const downloadUrl = URL.createObjectURL(blob);
      const paddedNum = padNumber(pageNum, totalPages);
      const filename = `${docFileName}_page_${paddedNum}.jpg`;

      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setTimeout(() => URL.revokeObjectURL(downloadUrl), 5000);

      const dict = translations[currentLang] || translations.en;
      showToast(dict.toast_single_downloaded.replace('{page}', pageNum), 'download');

    } catch (err) {
      console.error(`Error exporting page ${pageNum}:`, err);
      showToast("Error rendering page for download.", 'alert-circle');
    }
  }

  // Batch Download all selected pages via JSZip
  if (btnDownloadZip) {
    btnDownloadZip.addEventListener('click', async () => {
      if (!pdfDoc || isConverting) return;
      if (selectedPages.size === 0) {
        const dict = translations[currentLang] || translations.en;
        showToast(dict.toast_no_pages, 'alert-circle');
        return;
      }

      if (!window.JSZip) {
        alert("JSZip library is loading, please try again in a moment.");
        return;
      }

      isConverting = true;
      btnDownloadZip.disabled = true;

      const dict = translations[currentLang] || translations.en;
      progressContainer.classList.add('active');
      progressBar.style.width = '0%';
      progressPercent.textContent = '0%';
      progressMsg.textContent = dict.progress_rendering;

      const profile = QUALITY_PROFILES[currentQuality] || QUALITY_PROFILES.high;
      const zip = new window.JSZip();
      const pagesToProcess = Array.from(selectedPages).sort((a, b) => a - b);
      const totalSelected = pagesToProcess.length;

      try {
        for (let i = 0; i < totalSelected; i++) {
          const pageNum = pagesToProcess[i];
          progressMsg.textContent = `${dict.progress_rendering} (${i + 1}/${totalSelected})`;

          const { blob } = await renderPageToJpgBlob(pageNum, profile);
          const paddedNum = padNumber(pageNum, totalPages);
          const entryName = `${docFileName}_page_${paddedNum}.jpg`;

          zip.file(entryName, blob);

          const pct = Math.round(((i + 1) / totalSelected) * 75);
          progressBar.style.width = `${pct}%`;
          progressPercent.textContent = `${pct}%`;
        }

        progressMsg.textContent = dict.progress_zipping;
        progressBar.style.width = '80%';
        progressPercent.textContent = '80%';

        const zipBlob = await zip.generateAsync(
          {
            type: 'blob',
            compression: 'DEFLATE',
            compressionOptions: { level: 6 }
          },
          (meta) => {
            const zipPct = 80 + Math.round((meta.percent / 100) * 20);
            progressBar.style.width = `${Math.min(100, zipPct)}%`;
            progressPercent.textContent = `${Math.min(100, zipPct)}%`;
          }
        );

        progressBar.style.width = '100%';
        progressPercent.textContent = '100%';
        progressMsg.textContent = dict.progress_complete;

        // Trigger ZIP Download
        const zipUrl = URL.createObjectURL(zipBlob);
        const a = document.createElement('a');
        a.href = zipUrl;
        a.download = `${docFileName}_jpg_images.zip`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        setTimeout(() => URL.revokeObjectURL(zipUrl), 8000);

        showToast(dict.toast_zip_downloaded.replace('{count}', totalSelected), 'archive');

      } catch (err) {
        console.error("Batch conversion error:", err);
        showToast("An error occurred while creating ZIP package.", 'alert-circle');
      } finally {
        isConverting = false;
        btnDownloadZip.disabled = false;
        setTimeout(() => {
          progressContainer.classList.remove('active');
        }, 3000);
      }
    });
  }

  // Lightbox Modal Handling
  async function openLightbox(pageNum) {
    if (!pdfDoc) return;
    activeLightboxPage = pageNum;

    lightboxTitle.textContent = `Page ${pageNum} of ${totalPages}`;
    lightboxModal.classList.add('active');

    // Render high quality preview for modal
    try {
      const profile = QUALITY_PROFILES.high;
      const { blob, width, height } = await renderPageToJpgBlob(pageNum, profile);
      const url = URL.createObjectURL(blob);

      lightboxImg.src = url;
      lightboxDims.textContent = `${width} × ${height} px`;

    } catch (err) {
      console.error("Error opening lightbox:", err);
    }
  }

  function closeLightbox() {
    lightboxModal.classList.remove('active');
    if (lightboxImg.src.startsWith('blob:')) {
      URL.revokeObjectURL(lightboxImg.src);
    }
    lightboxImg.src = '';
  }

  if (btnCloseLightbox) {
    btnCloseLightbox.addEventListener('click', closeLightbox);
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', e => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  if (btnLightboxDownload) {
    btnLightboxDownload.addEventListener('click', () => {
      if (activeLightboxPage) {
        downloadSinglePageJpg(activeLightboxPage);
      }
    });
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
      closeLightbox();
    }
  });

  // Cookie Consent Banner Logic
  const cookieBanner = document.getElementById('cookie-banner');
  const btnAcceptCookies = document.getElementById('btn-accept-cookies');

  if (localStorage.getItem('pdfnetizen_cookie_consent') === 'accepted') {
    if (cookieBanner) cookieBanner.classList.add('hidden');
  }

  if (btnAcceptCookies && cookieBanner) {
    btnAcceptCookies.addEventListener('click', () => {
      localStorage.setItem('pdfnetizen_cookie_consent', 'accepted');
      cookieBanner.style.opacity = '0';
      cookieBanner.style.transform = (document.documentElement.dir === 'rtl')
        ? 'translate(50%, 20px)'
        : 'translate(-50%, 20px)';
      setTimeout(() => {
        cookieBanner.classList.add('hidden');
      }, 300);
    });
  }

  // Initialize Lucide icons on start
  if (window.lucide) {
    lucide.createIcons();
  }

})();
