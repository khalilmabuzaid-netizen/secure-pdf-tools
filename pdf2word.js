/**
 * PDF to Word (.docx) Converter - 100% Client-Side Processing
 * Powered by Mozilla PDF.js & docx.js
 * Zero Server Uploads • Fast & Private • English & Arabic RTL Support
 */

(function () {
  'use strict';

  // Configure PDF.js Worker
  if (window.pdfjsLib) {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  }

  // Master Bilingual Translation Dictionary
  const translations = {
    en: {
      badge_client_side: "100% Client-Side",
      nav_home: "Home",
      pdf2word_hero_badge: "100% Client-Side PDF to Word • Fast & Private",
      pdf2word_hero_title: 'Convert PDF to <span class="gradient-text">Microsoft Word (.docx)</span>',
      pdf2word_hero_subtitle: "Extract text and reconstruct formatted Word documents directly in your browser. 100% private with zero server uploads and full Arabic RTL support.",
      pdf2word_dropzone_title: "Drop your PDF file here",
      pdf2word_dropzone_subtitle: "Select or drag and drop any PDF document to convert into an editable .docx file instantly.",
      pdf2word_btn_browse: "Browse PDF File",
      pdf2word_btn_sample: "Try Sample PDF",
      pdf2word_feature_docx: "Editable .DOCX Output",
      pdf2word_feature_arabic: "Arabic & RTL Support",
      pdf2word_feature_privacy: "100% Client-Side Privacy",
      pdf2word_btn_change: "Change File",
      pdf2word_status_ready: "Ready to Convert",
      pdf2word_settings_title: "Conversion Settings",
      pdf2word_label_mode: "Text & Layout Mode",
      pdf2word_mode_smart: "Smart Paragraphs",
      pdf2word_mode_smart_desc: "Preserves headings, reading flow, and cohesive paragraphs.",
      pdf2word_mode_lines: "Exact Lines",
      pdf2word_mode_lines_desc: "Preserves every line break exactly as in the PDF.",
      pdf2word_mode_clean: "Continuous Text",
      pdf2word_mode_clean_desc: "Merges lines into continuous body text.",
      pdf2word_label_pages: "Pages to Convert",
      pdf2word_pages_all: "All Pages",
      pdf2word_pages_custom: "Custom Page Range...",
      pdf2word_label_direction: "Text Direction & Language",
      pdf2word_dir_auto: "Auto-Detect (Arabic RTL & English LTR)",
      pdf2word_dir_rtl: "Force Right-to-Left (Arabic / RTL)",
      pdf2word_dir_ltr: "Force Left-to-Right (English / LTR)",
      pdf2word_label_options: "Document Options",
      pdf2word_toggle_pagebreaks: "Insert Page Breaks",
      pdf2word_toggle_pagebreaks_desc: "Add a page break between each converted PDF page",
      pdf2word_toggle_header: "Include Document Header",
      pdf2word_toggle_header_desc: "Add file name & timestamp in the Word header",
      pdf2word_label_font: "Default Font",
      pdf2word_label_size: "Font Size",
      pdf2word_btn_convert: "Convert to Word (.docx)",
      pdf2word_preview_title: "Live Document Preview",
      pdf2word_preview_placeholder: 'Click "Convert to Word" to extract text and generate your editable Word document...',
      pdf2word_status_parsing: "Extracting text from PDF...",
      pdf2word_status_building_docx: "Packaging Word (.docx) document...",
      pdf2word_status_done: "Conversion complete!",
      pdf2word_success_badge: "DOCX Generated Successfully!",
      pdf2word_stat_pages: "Pages",
      pdf2word_stat_words: "Words",
      pdf2word_stat_chars: "Characters",
      pdf2word_stat_size: "DOCX Size",
      pdf2word_btn_download_docx: "Download Word (.docx)",
      pdf2word_btn_download_txt: "Download .TXT",
      pdf2word_btn_copy: "Copy",
      ad_space_label: "Advertisement Space (728x90)",
      footer_tagline: "100% Client-side, private, and secure document processing directly in your browser.",
      footer_privacy: "Privacy Policy",
      footer_terms: "Terms of Service",
      footer_contact: "Contact Us",
      footer_copyright: "© 2026 PDF Hub. All rights reserved.",
      cookie_consent_text: "We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.",
      cookie_learn_more: "Privacy Policy",
      cookie_accept_btn: "Accept",
      toast_sample_loaded: "Sample document loaded successfully.",
      toast_converting: "Converting PDF to Word document...",
      toast_success: "Word document created successfully!",
      toast_copied: "Extracted text copied to clipboard!",
      toast_invalid_pdf: "Please upload a valid PDF document.",
      toast_error: "An error occurred during conversion. Please try again.",
      toast_no_pages: "No valid pages matched your selection.",
      pdf2word_seo_badge: "Fast & Private PDF Conversion",
      pdf2word_seo_title: "How to Convert PDF to Microsoft Word (.docx) Online",
      pdf2word_seo_subtitle: "Reconstruct editable Word documents from PDFs with 100% client-side privacy, accurate paragraph detection, and full English & Arabic text support.",
      pdf2word_step1_title: "1. Upload PDF Document",
      pdf2word_step1_desc: "Drag and drop your PDF file or click browse to open your document securely inside your browser.",
      pdf2word_step2_title: "2. Choose Formatting & Direction",
      pdf2word_step2_desc: "Customize layout mode (Smart Paragraphs or Exact Lines), select specific page ranges, font styles, and Arabic RTL alignment.",
      pdf2word_step3_title: "3. Convert & Download .DOCX",
      pdf2word_step3_desc: "Click Convert to extract text locally and package it into an authentic Microsoft Word (.docx) file ready for editing in Word, Office 365, or Google Docs.",
      pdf2word_faq_title: "Frequently Asked Questions",
      pdf2word_faq_q1: "Are my PDF documents uploaded to any remote server?",
      pdf2word_faq_a1: "No, never. The PDF to Word conversion executes 100% client-side directly within your browser's JavaScript engine. Your private files, contracts, and financial reports never touch the cloud or any third-party server.",
      pdf2word_faq_q2: "Does this tool support Arabic and bilingual PDF documents?",
      pdf2word_faq_a2: "Yes! Our extraction algorithm features intelligent bidirectional detection, automatically applying Right-to-Left (RTL) formatting and Arabic typography (such as Cairo or Tahoma) to Arabic paragraphs while preserving Left-to-Right English text.",
      pdf2word_faq_q3: "Which applications can open the downloaded .docx file?",
      pdf2word_faq_a3: "The output file is a standard OpenXML Microsoft Word document (.docx) compatible with Microsoft Word 2013-2024, Microsoft 365, Google Docs, Apple Pages, LibreOffice, and mobile Office apps.",
      pdf2word_faq_q4: "Can I convert scanned PDFs or image-based documents?",
      pdf2word_faq_a4: "If your PDF is a scanned image without a text layer, use our free OCR Text Extractor tool on the homepage first to recognize the text, and then export it into Word or text format with high accuracy."
    },
    ar: {
      badge_client_side: "محلي ١٠٠٪ في المتصفح",
      nav_home: "الرئيسية",
      pdf2word_hero_badge: "تحويل PDF إلى Word محلياً ١٠٠٪ • سرعة وخصوصية",
      pdf2word_hero_title: 'تحويل PDF إلى مستند <span class="gradient-text">وورد Word (.docx)</span>',
      pdf2word_hero_subtitle: "استخرج النصوص وأعد بناء مستندات Word منسقة وقابلة للتعديل مباشرة في متصفحك بأمان تام وبدون رفع إلى أي خوادم مع دعم كامل للعربية.",
      pdf2word_dropzone_title: "اسحب ملف PDF هنا للتحويل",
      pdf2word_dropzone_subtitle: "اختر أو اسحب وأفلت أي مستند PDF لتحويله فوراً إلى ملف Word (.docx) قابل للتعديل والتحرير.",
      pdf2word_btn_browse: "استعراض ملف PDF",
      pdf2word_btn_sample: "تجربة مستند نموذجي",
      pdf2word_feature_docx: "تصدير Word (.docx) أصلي",
      pdf2word_feature_arabic: "دعم كامل للغة العربية (RTL)",
      pdf2word_feature_privacy: "خصوصية محلية ١٠٠٪",
      pdf2word_btn_change: "تغيير الملف",
      pdf2word_status_ready: "جاهز للتحويل",
      pdf2word_settings_title: "إعدادات التحويل والتنسيق",
      pdf2word_label_mode: "نمط استخراج وتنسيق النصوص",
      pdf2word_mode_smart: "فقرات ذكية",
      pdf2word_mode_smart_desc: "يحافظ على العناوين والفقرات المترابطة وسلاسة القراءة.",
      pdf2word_mode_lines: "أسطر متطابقة",
      pdf2word_mode_lines_desc: "يحافظ على فواصل الأسطر تماماً كما هي في ملف PDF.",
      pdf2word_mode_clean: "نص متصل",
      pdf2word_mode_clean_desc: "يدمج الأسطر في فقرات نصية مستمرة.",
      pdf2word_label_pages: "الصفحات المراد تحويلها",
      pdf2word_pages_all: "كافة الصفحات",
      pdf2word_pages_custom: "نطاق صفحات مخصص...",
      pdf2word_label_direction: "اتجاه النص واللغة",
      pdf2word_dir_auto: "تعرف تلقائي (عربي RTL وإنجليزي LTR)",
      pdf2word_dir_rtl: "فرض الاتجاه من اليمين لليسار (عربي)",
      pdf2word_dir_ltr: "فرض الاتجاه من اليسار لليمين (إنجليزي)",
      pdf2word_label_options: "خيارات المستند",
      pdf2word_toggle_pagebreaks: "إدراج فواصل صفحات",
      pdf2word_toggle_pagebreaks_desc: "إضافة فاصل صفحة في Word بين كل صفحة PDF",
      pdf2word_toggle_header: "إضافة ترويسة للمستند",
      pdf2word_toggle_header_desc: "إضافة اسم الملف وتاريخ التحويل في رأس الصفحة",
      pdf2word_label_font: "الخط الافتراضي",
      pdf2word_label_size: "حجم الخط",
      pdf2word_btn_convert: "تحويل إلى وورد (.docx)",
      pdf2word_preview_title: "معاينة المستند المستخرج",
      pdf2word_preview_placeholder: 'انقر على "تحويل إلى وورد" لاستخراج النصوص وإنشاء مستند Word القابل للتعديل...',
      pdf2word_status_parsing: "جاري استخراج النصوص من ملف PDF...",
      pdf2word_status_building_docx: "جاري تجميع وبناء ملف Word (.docx)...",
      pdf2word_status_done: "تم التحويل بنجاح!",
      pdf2word_success_badge: "تم إنشاء ملف DOCX بنجاح!",
      pdf2word_stat_pages: "الصفحات",
      pdf2word_stat_words: "الكلمات",
      pdf2word_stat_chars: "الأحرف",
      pdf2word_stat_size: "حجم DOCX",
      pdf2word_btn_download_docx: "تحميل ملف Word (.docx)",
      pdf2word_btn_download_txt: "تحميل كملف .TXT",
      pdf2word_btn_copy: "نسخ النص",
      ad_space_label: "مساحة إعلانية (728×90)",
      footer_tagline: "معالجة مستندات محلية ١٠٠٪، خاصة وآمنة تماماً مباشرة في متصفحك.",
      footer_privacy: "سياسة الخصوصية",
      footer_terms: "شروط الاستخدام",
      footer_contact: "اتصل بنا",
      footer_copyright: "© ٢٠٢٦ PDF Hub. جميع الحقوق محفوظة.",
      cookie_consent_text: "نحن نستخدم ملفات تعريف الارتباط لتحسين تجربتك. باستمرارك في زيارة هذا الموقع، فإنك توافق على استخدامنا لملفات تعريف الارتباط.",
      cookie_learn_more: "سياسة الخصوصية",
      cookie_accept_btn: "موافق",
      toast_sample_loaded: "تم تحميل المستند التجريبي بنجاح.",
      toast_converting: "جاري تحويل مستند PDF إلى Word...",
      toast_success: "تم إنشاء مستند Word بنجاح!",
      toast_copied: "تم نسخ النص المستخرج إلى الحافظة بنجاح!",
      toast_invalid_pdf: "يرجى اختيار ملف PDF صالح.",
      toast_error: "حدث خطأ أثناء التحويل. يرجى المحاولة مرة أخرى.",
      toast_no_pages: "لم يتم العثور على صفحات تطابق النطاق المحدد.",
      pdf2word_seo_badge: "تحويل PDF سريع وخاص تماماً",
      pdf2word_seo_title: "كيفية تحويل PDF إلى مستند وورد Microsoft Word (.docx) أونلاين",
      pdf2word_seo_subtitle: "أعد بناء مستندات Word قابلة للتعديل من ملفات PDF مع خصوصية محلية ١٠٠٪، ودقة في كشف الفقرات ودعم كامل للنصوص العربية والإنجليزية.",
      pdf2word_step1_title: "١. رفع مستند PDF",
      pdf2word_step1_desc: "اسحب وأفلت ملف PDF أو اضغط على استعراض لفتح المستند بأمان فوري داخل متصفحك.",
      pdf2word_step2_title: "٢. تخصيص التنسيق واتجاه النص",
      pdf2word_step2_desc: "اختر نمط التنسيق (فقرات ذكية أو أسطر متطابقة)، وحدد نطاق الصفحات ونوع الخط ومحاذاة النصوص العربية RTL.",
      pdf2word_step3_title: "٣. التحويل وتحميل .DOCX",
      pdf2word_step3_desc: "اضغط على زر التحويل لاستخراج النصوص محلياً وتغليفها في ملف Microsoft Word (.docx) أصلي جاهز للفتح والتعديل.",
      pdf2word_faq_title: "الأسئلة الشائعة",
      pdf2word_faq_q1: "هل يتم رفع مستنداتي إلى أي خوادم خارجية؟",
      pdf2word_faq_a1: "كلا على الإطلاق. تتم جميع عمليات معالجة وتحويل PDF إلى Word محلياً ١٠٠٪ داخل متصفحك عبر محرك JavaScript، دون أن تغادر بياناتك أو ملفاتك جهازك أبداً.",
      pdf2word_faq_q2: "هل تدعم الأداة اللغة العربية والمستندات ثنائية اللغة؟",
      pdf2word_faq_a2: "نعم بكل تأكيد! تحتوي خوارزمية الاستخراج على محرك كشف ثنائي الاتجاه يحدد الفقرات العربية تلقائياً ويطبق عليها اتجاه اليمين إلى اليسار (RTL) وخطوطاً عربية أصيلة مع الحفاظ على النصوص الإنجليزية.",
      pdf2word_faq_q3: "ما هي البرامج المتوافقة مع ملف Word (.docx) الناتج؟",
      pdf2word_faq_a3: "الملف الناتج هو مستند OpenXML قياسي يعمل بتوافق تام على Microsoft Word 2013-2024، وحزمة Microsoft 365، ومستندات Google Docs، وApple Pages، وLibreOffice، وتطبيقات الهواتف الذكية.",
      pdf2word_faq_q4: "هل يمكنني تحويل ملفات PDF الممسوحة ضوئياً (صور)؟",
      pdf2word_faq_a4: "إذا كان ملف PDF عبارة عن صور ممسوحة ضوئياً دون طبقة نصوص، يمكنك استخدام أداة OCR Text Extractor المجانية المتوفرة على موقعنا أولاً للتعرف على النصوص ثم تصديرها بسهولة."
    }
  };

  let currentLang = 'en';
  let currentFile = null;
  let currentArrayBuffer = null;
  let currentPdfDoc = null;
  let totalPdfPages = 0;
  let selectedMode = 'paragraphs';
  let isConverting = false;
  let convertedDocxBlob = null;
  let allExtractedPlainText = '';

  // DOM Elements Cache
  let dropzone, fileInput, btnBrowse, btnLoadSample;
  let workspacePanel, fileNameDisplay, fileSizeDisplay, filePagesDisplay, fileStatusBadge, btnChangeFile;
  let optModeParagraphs, optModeLines, optModeClean;
  let pageRangeSelect, pageRangeInput;
  let directionSelect, togglePageBreaks, toggleHeaderInfo;
  let fontFamilySelect, fontSizeSelect;
  let btnStartConvert, convertBtnIcon, convertBtnText;
  let progressCard, progressStatusText, progressPercent, progressBarFill;
  let docPreviewBox, previewPageIndicator;
  let resultsCard, statPagesCount, statWordsCount, statCharsCount, statDocxSize;
  let btnDownloadDocx, btnDownloadTxt, btnCopyText;
  let btnLanguageToggle, langToggleText;
  let toastEl, toastMsgEl, toastIconEl;
  let cookieBanner, btnAcceptCookies;

  // Initialize after DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    cacheElements();
    attachEventListeners();

    // Auto-detect language or restore saved
    const savedLang = localStorage.getItem('pdf_netizen_lang');
    if (savedLang && (savedLang === 'ar' || savedLang === 'en')) {
      applyLanguage(savedLang);
    } else {
      applyLanguage('en');
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  });

  function cacheElements() {
    dropzone = document.getElementById('dropzone');
    fileInput = document.getElementById('file-input');
    btnBrowse = document.getElementById('btn-browse');
    btnLoadSample = document.getElementById('btn-load-sample');

    workspacePanel = document.getElementById('workspace-panel');
    fileNameDisplay = document.getElementById('file-name-display');
    fileSizeDisplay = document.getElementById('file-size-display');
    filePagesDisplay = document.getElementById('file-pages-display');
    fileStatusBadge = document.getElementById('file-status-badge');
    btnChangeFile = document.getElementById('btn-change-file');

    optModeParagraphs = document.getElementById('opt-mode-paragraphs');
    optModeLines = document.getElementById('opt-mode-lines');
    optModeClean = document.getElementById('opt-mode-clean');

    pageRangeSelect = document.getElementById('page-range-select');
    pageRangeInput = document.getElementById('page-range-input');

    directionSelect = document.getElementById('direction-select');
    togglePageBreaks = document.getElementById('toggle-page-breaks');
    toggleHeaderInfo = document.getElementById('toggle-header-info');

    fontFamilySelect = document.getElementById('font-family-select');
    fontSizeSelect = document.getElementById('font-size-select');

    btnStartConvert = document.getElementById('btn-start-convert');
    convertBtnIcon = document.getElementById('convert-btn-icon');
    convertBtnText = document.getElementById('convert-btn-text');

    progressCard = document.getElementById('progress-card');
    progressStatusText = document.getElementById('progress-status-text');
    progressPercent = document.getElementById('progress-percent');
    progressBarFill = document.getElementById('progress-bar-fill');

    docPreviewBox = document.getElementById('doc-preview-box');
    previewPageIndicator = document.getElementById('preview-page-indicator');

    resultsCard = document.getElementById('results-card');
    statPagesCount = document.getElementById('stat-pages-count');
    statWordsCount = document.getElementById('stat-words-count');
    statCharsCount = document.getElementById('stat-chars-count');
    statDocxSize = document.getElementById('stat-docx-size');

    btnDownloadDocx = document.getElementById('btn-download-docx');
    btnDownloadTxt = document.getElementById('btn-download-txt');
    btnCopyText = document.getElementById('btn-copy-text');

    btnLanguageToggle = document.getElementById('btn-language-toggle');
    langToggleText = document.getElementById('lang-toggle-text');

    toastEl = document.getElementById('toast');
    toastMsgEl = document.getElementById('toast-message');
    toastIconEl = document.getElementById('toast-icon');

    cookieBanner = document.getElementById('cookie-banner');
    btnAcceptCookies = document.getElementById('btn-accept-cookies');
  }

  function attachEventListeners() {
    // Browse & Dropzone
    if (btnBrowse && fileInput) {
      btnBrowse.addEventListener('click', (e) => {
        e.stopPropagation();
        fileInput.click();
      });
    }

    if (dropzone && fileInput) {
      dropzone.addEventListener('click', () => fileInput.click());

      ['dragenter', 'dragover'].forEach(name => {
        dropzone.addEventListener(name, (e) => {
          e.preventDefault();
          e.stopPropagation();
          dropzone.classList.add('drag-over');
        });
      });

      ['dragleave', 'drop'].forEach(name => {
        dropzone.addEventListener(name, (e) => {
          e.preventDefault();
          e.stopPropagation();
          dropzone.classList.remove('drag-over');
        });
      });

      dropzone.addEventListener('drop', (e) => {
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
          handleFile(files[0]);
        }
      });
    }

    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files.length > 0) {
          handleFile(e.target.files[0]);
        }
      });
    }

    if (btnLoadSample) {
      btnLoadSample.addEventListener('click', (e) => {
        e.stopPropagation();
        loadSamplePdf();
      });
    }

    if (btnChangeFile) {
      btnChangeFile.addEventListener('click', () => {
        resetWorkspace();
      });
    }

    // Mode selectors
    const modeCards = [optModeParagraphs, optModeLines, optModeClean];
    modeCards.forEach(card => {
      if (card) {
        card.addEventListener('click', () => {
          modeCards.forEach(c => c && c.classList.remove('selected'));
          card.classList.add('selected');
          selectedMode = card.getAttribute('data-mode') || 'paragraphs';
        });
      }
    });

    // Page Range Select
    if (pageRangeSelect && pageRangeInput) {
      pageRangeSelect.addEventListener('change', () => {
        if (pageRangeSelect.value === 'custom') {
          pageRangeInput.classList.remove('hidden');
          pageRangeInput.focus();
        } else {
          pageRangeInput.classList.add('hidden');
        }
      });
    }

    // Convert Button
    if (btnStartConvert) {
      btnStartConvert.addEventListener('click', executeConversion);
    }

    // Download & Copy Buttons
    if (btnDownloadDocx) {
      btnDownloadDocx.addEventListener('click', downloadDocx);
    }

    if (btnDownloadTxt) {
      btnDownloadTxt.addEventListener('click', downloadTxt);
    }

    if (btnCopyText) {
      btnCopyText.addEventListener('click', copyExtractedText);
    }

    // Language Switcher
    if (btnLanguageToggle) {
      btnLanguageToggle.addEventListener('click', toggleLanguage);
    }

    // Cookie Banner
    if (localStorage.getItem('pdf_hub_cookie_consent') === 'accepted') {
      if (cookieBanner) cookieBanner.classList.add('hidden');
    }

    if (btnAcceptCookies && cookieBanner) {
      btnAcceptCookies.addEventListener('click', () => {
        localStorage.setItem('pdf_hub_cookie_consent', 'accepted');
        cookieBanner.style.opacity = '0';
        cookieBanner.style.transform = (document.documentElement.dir === 'rtl')
          ? 'translate(50%, 20px)'
          : 'translate(-50%, 20px)';
        setTimeout(() => {
          cookieBanner.classList.add('hidden');
        }, 300);
      });
    }
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
    const nextLang = (currentLang === 'en') ? 'ar' : 'en';
    applyLanguage(nextLang);
  }

  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('pdf_netizen_lang', lang);
    const isAr = (lang === 'ar');

    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;

    if (langToggleText) {
      langToggleText.textContent = isAr ? 'English' : 'العربية';
    }

    // Update data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = t(key);
      if (text) {
        el.innerHTML = text;
      }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const text = t(key);
      if (text) {
        el.setAttribute('placeholder', text);
      }
    });

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function showToast(message, type = 'info') {
    if (!toastEl || !toastMsgEl) return;
    toastMsgEl.textContent = message;
    toastEl.className = `toast ${type}`;

    if (toastIconEl) {
      let iconName = 'info';
      if (type === 'success') iconName = 'check-circle-2';
      if (type === 'warning') iconName = 'alert-triangle';
      if (type === 'error') iconName = 'alert-circle';
      toastIconEl.setAttribute('data-lucide', iconName);
      if (window.lucide) window.lucide.createIcons();
    }

    toastEl.classList.remove('hidden');
    clearTimeout(toastEl._timer);
    toastEl._timer = setTimeout(() => {
      toastEl.classList.add('hidden');
    }, 4000);
  }

  // Format File Size
  function formatBytes(bytes, decimals = 1) {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  // Handle User PDF File
  async function handleFile(file) {
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      showToast(t('toast_invalid_pdf'), 'error');
      return;
    }

    try {
      const arrayBuffer = await file.arrayBuffer();
      await loadPdfDocument(arrayBuffer, file.name, file.size);
    } catch (err) {
      console.error('Error reading PDF file:', err);
      showToast(t('toast_error') + ` (${err.message})`, 'error');
    }
  }

  // Load PDF into PDF.js
  async function loadPdfDocument(arrayBuffer, fileName, fileSize) {
    if (!window.pdfjsLib) {
      throw new Error('PDF.js library is not loaded');
    }

    try {
      const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer.slice(0) }).promise;
      currentPdfDoc = pdf;
      currentArrayBuffer = arrayBuffer;
      currentFile = { name: fileName, size: fileSize };
      totalPdfPages = pdf.numPages;

      // Update UI File Info
      if (fileNameDisplay) fileNameDisplay.textContent = fileName;
      if (fileSizeDisplay) fileSizeDisplay.textContent = formatBytes(fileSize);
      if (filePagesDisplay) {
        filePagesDisplay.textContent = `${totalPdfPages} ${t('pdf2word_stat_pages')}`;
      }
      if (previewPageIndicator) {
        previewPageIndicator.textContent = `${totalPdfPages} ${t('pdf2word_stat_pages')}`;
      }

      // Transition Dropzone to Workspace
      if (dropzone) dropzone.parentElement.classList.add('hidden');
      if (workspacePanel) workspacePanel.classList.remove('hidden');
      if (resultsCard) resultsCard.classList.add('hidden');
      if (progressCard) progressCard.classList.add('hidden');

      if (docPreviewBox) {
        docPreviewBox.innerHTML = `<span style="color: var(--text-muted); font-style: italic;">${t('pdf2word_preview_placeholder')}</span>`;
      }

      if (window.lucide) {
        window.lucide.createIcons();
      }

    } catch (err) {
      console.error('Error loading PDF into PDF.js:', err);
      showToast(t('toast_invalid_pdf') + ` (${err.message})`, 'error');
    }
  }

  function resetWorkspace() {
    currentFile = null;
    currentArrayBuffer = null;
    currentPdfDoc = null;
    totalPdfPages = 0;
    convertedDocxBlob = null;
    allExtractedPlainText = '';
    isConverting = false;

    if (fileInput) fileInput.value = '';
    if (workspacePanel) workspacePanel.classList.add('hidden');
    if (dropzone) dropzone.parentElement.classList.remove('hidden');
    if (resultsCard) resultsCard.classList.add('hidden');
    if (progressCard) progressCard.classList.add('hidden');

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // Parse User Custom Page Range e.g. "1-3, 5, 8"
  function parsePageRange(rangeStr, total) {
    if (!rangeStr || !rangeStr.trim()) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages = new Set();
    const parts = rangeStr.split(',');

    for (const part of parts) {
      const trimmed = part.trim();
      if (!trimmed) continue;

      if (trimmed.includes('-')) {
        const [startStr, endStr] = trimmed.split('-');
        const start = parseInt(startStr, 10);
        const end = parseInt(endStr, 10);
        if (!isNaN(start) && !isNaN(end)) {
          const min = Math.max(1, Math.min(start, end));
          const max = Math.min(total, Math.max(start, end));
          for (let p = min; p <= max; p++) {
            pages.add(p);
          }
        }
      } else {
        const p = parseInt(trimmed, 10);
        if (!isNaN(p) && p >= 1 && p <= total) {
          pages.add(p);
        }
      }
    }

    const sorted = Array.from(pages).sort((a, b) => a - b);
    return sorted.length > 0 ? sorted : Array.from({ length: total }, (_, i) => i + 1);
  }

  // Detect Arabic Characters
  function containsArabic(str) {
    return /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/.test(str);
  }

  // Extract structured pages & paragraphs from PDF.js
  async function extractPagesData(pdf, pageNumbers, mode, onProgress) {
    const pagesData = [];

    for (let i = 0; i < pageNumbers.length; i++) {
      const pageNum = pageNumbers[i];
      if (onProgress) {
        const percent = Math.round(((i + 0.5) / pageNumbers.length) * 70);
        onProgress(percent, `${t('pdf2word_status_parsing')} (${i + 1}/${pageNumbers.length})`);
      }

      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent({ normalizeWhitespace: true });
      const items = textContent.items || [];

      if (items.length === 0) {
        pagesData.push({ pageNum, paragraphs: [] });
        continue;
      }

      // Group items into lines based on Y baseline proximity
      const lineMap = [];
      for (const item of items) {
        const text = item.str || '';
        if (!text && !item.hasEOL) continue;

        const x = item.transform[4];
        const y = item.transform[5];
        const height = item.height || Math.abs(item.transform[3]) || 12;
        const fontName = item.fontName || '';

        // Find existing line with matching baseline
        let matchedLine = null;
        for (const line of lineMap) {
          if (Math.abs(line.y - y) <= Math.max(height, line.height) * 0.45) {
            matchedLine = line;
            break;
          }
        }

        if (matchedLine) {
          matchedLine.items.push({ text, x, y, height, fontName });
          matchedLine.minX = Math.min(matchedLine.minX, x);
          matchedLine.maxX = Math.max(matchedLine.maxX, x + (item.width || 0));
          matchedLine.height = Math.max(matchedLine.height, height);
        } else {
          lineMap.push({
            y,
            height,
            minX: x,
            maxX: x + (item.width || 0),
            items: [{ text, x, y, height, fontName }]
          });
        }
      }

      // Sort lines top-to-bottom (PDF Y coordinate is bottom-up, so descending Y)
      lineMap.sort((a, b) => b.y - a.y);

      // Sort items within each line by X coordinate
      const assembledLines = [];
      for (const line of lineMap) {
        line.items.sort((a, b) => a.x - b.x);
        const lineText = line.items.map(it => it.text).join(' ').replace(/\s+/g, ' ').trim();
        if (lineText) {
          const avgFontHeight = line.items.reduce((acc, it) => acc + it.height, 0) / line.items.length;
          assembledLines.push({
            text: lineText,
            y: line.y,
            height: avgFontHeight,
            isArabic: containsArabic(lineText)
          });
        }
      }

      // Build paragraphs depending on selected mode
      const paragraphs = [];
      if (mode === 'lines') {
        // Line by line
        for (const line of assembledLines) {
          paragraphs.push({
            text: line.text,
            isHeading: false,
            isArabic: line.isArabic
          });
        }
      } else if (mode === 'clean') {
        // Continuous single block per page
        const fullPageText = assembledLines.map(l => l.text).join(' ');
        if (fullPageText) {
          paragraphs.push({
            text: fullPageText,
            isHeading: false,
            isArabic: containsArabic(fullPageText)
          });
        }
      } else {
        // Smart Paragraphs mode
        let currentParagraph = [];
        let prevLine = null;

        // Baseline font size for page
        const fontHeights = assembledLines.map(l => l.height);
        const medianFontHeight = fontHeights.length > 0
          ? fontHeights.slice().sort((a, b) => a - b)[Math.floor(fontHeights.length / 2)]
          : 12;

        for (const line of assembledLines) {
          const isHeading = (line.height > medianFontHeight * 1.25) ||
            (line.text.length < 60 && /^[A-Z0-9\u0600-\u06FF\s:.-]+$/.test(line.text) && !line.text.endsWith('.'));

          if (isHeading) {
            if (currentParagraph.length > 0) {
              const pText = currentParagraph.join(' ').trim();
              paragraphs.push({
                text: pText,
                isHeading: false,
                isArabic: containsArabic(pText)
              });
              currentParagraph = [];
            }
            paragraphs.push({
              text: line.text,
              isHeading: true,
              isArabic: line.isArabic
            });
            prevLine = line;
            continue;
          }

          if (prevLine) {
            const verticalDelta = Math.abs(prevLine.y - line.y);
            const isParagraphBreak = verticalDelta > (prevLine.height * 1.75);

            if (isParagraphBreak && currentParagraph.length > 0) {
              const pText = currentParagraph.join(' ').trim();
              paragraphs.push({
                text: pText,
                isHeading: false,
                isArabic: containsArabic(pText)
              });
              currentParagraph = [];
            }
          }

          currentParagraph.push(line.text);
          prevLine = line;
        }

        if (currentParagraph.length > 0) {
          const pText = currentParagraph.join(' ').trim();
          paragraphs.push({
            text: pText,
            isHeading: false,
            isArabic: containsArabic(pText)
          });
        }
      }

      pagesData.push({ pageNum, paragraphs });
    }

    return pagesData;
  }

  // Construct Word Document (.docx) Blob
  async function generateDocxBlob(pagesData, options, onProgress) {
    if (!window.docx) {
      throw new Error('docx library is not loaded');
    }

    const { Document, Paragraph, TextRun, Packer, PageBreak, AlignmentType, HeadingLevel, Header } = window.docx;

    if (onProgress) {
      onProgress(85, t('pdf2word_status_building_docx'));
    }

    const docChildren = [];
    const chosenFont = options.fontFamily || 'Calibri';
    const chosenSize = parseInt(options.fontSize || '11', 10);
    const textDirectionPref = options.direction || 'auto';
    const insertPageBreaks = options.insertPageBreaks !== false;

    // Optional document header
    let docHeader = undefined;
    if (options.includeHeader && options.fileName) {
      docHeader = new Header({
        children: [
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [
              new TextRun({
                text: `${options.fileName} • Converted via PDF Netizen`,
                italics: true,
                size: 16,
                color: "888888"
              })
            ]
          })
        ]
      });
    }

    for (let pIdx = 0; pIdx < pagesData.length; pIdx++) {
      const page = pagesData[pIdx];

      // Insert Page Break between PDF pages if enabled
      if (pIdx > 0 && insertPageBreaks) {
        docChildren.push(
          new Paragraph({
            children: [new PageBreak()]
          })
        );
      }

      for (const p of page.paragraphs) {
        const isRtl = (textDirectionPref === 'rtl') || (textDirectionPref === 'auto' && p.isArabic);

        if (p.isHeading) {
          docChildren.push(
            new Paragraph({
              heading: HeadingLevel.HEADING_2,
              alignment: isRtl ? AlignmentType.RIGHT : AlignmentType.LEFT,
              bidirectional: isRtl,
              spacing: { before: 240, after: 120 },
              children: [
                new TextRun({
                  text: p.text,
                  bold: true,
                  size: (chosenSize + 4) * 2, // half-points
                  font: { name: isRtl ? 'Cairo' : chosenFont },
                  rightToLeft: isRtl,
                  color: "1e3a8a"
                })
              ]
            })
          );
        } else {
          docChildren.push(
            new Paragraph({
              alignment: isRtl ? AlignmentType.RIGHT : AlignmentType.LEFT,
              bidirectional: isRtl,
              spacing: { after: 140, line: 276 },
              children: [
                new TextRun({
                  text: p.text,
                  size: chosenSize * 2,
                  font: { name: isRtl ? 'Cairo' : chosenFont },
                  rightToLeft: isRtl
                })
              ]
            })
          );
        }
      }
    }

    // If no text was found in the whole document
    if (docChildren.length === 0) {
      docChildren.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "No readable text content was detected in this PDF document.",
              italics: true
            })
          ]
        })
      );
    }

    const doc = new Document({
      sections: [{
        headers: docHeader ? { default: docHeader } : undefined,
        properties: {
          page: {
            margin: {
              top: 1440,
              right: 1440,
              bottom: 1440,
              left: 1440
            }
          }
        },
        children: docChildren
      }]
    });

    if (onProgress) {
      onProgress(95, t('pdf2word_status_building_docx'));
    }

    const blob = await Packer.toBlob(doc);
    return blob;
  }

  // Execute Conversion Workflow
  async function executeConversion() {
    if (!currentPdfDoc || isConverting) return;

    isConverting = true;
    if (btnStartConvert) btnStartConvert.disabled = true;
    if (convertBtnIcon) {
      convertBtnIcon.setAttribute('data-lucide', 'loader-2');
      convertBtnIcon.classList.add('spinner');
      if (window.lucide) window.lucide.createIcons();
    }

    if (progressCard) progressCard.classList.remove('hidden');
    if (resultsCard) resultsCard.classList.add('hidden');

    try {
      showToast(t('toast_converting'), 'info');

      // Determine page range
      let targetPages = [];
      if (pageRangeSelect && pageRangeSelect.value === 'custom' && pageRangeInput) {
        targetPages = parsePageRange(pageRangeInput.value, totalPdfPages);
      } else {
        targetPages = Array.from({ length: totalPdfPages }, (_, i) => i + 1);
      }

      if (targetPages.length === 0) {
        throw new Error(t('toast_no_pages'));
      }

      const updateProgress = (percent, statusMsg) => {
        if (progressPercent) progressPercent.textContent = `${percent}%`;
        if (progressBarFill) progressBarFill.style.width = `${percent}%`;
        if (progressStatusText && statusMsg) {
          progressStatusText.innerHTML = `<i data-lucide="loader-2" class="spinner"></i> <span>${statusMsg}</span>`;
          if (window.lucide) window.lucide.createIcons();
        }
      };

      updateProgress(10, t('pdf2word_status_parsing'));

      // 1. Extract Text & Structure
      const pagesData = await extractPagesData(
        currentPdfDoc,
        targetPages,
        selectedMode,
        updateProgress
      );

      // 2. Build Formatted Preview HTML & plain text
      let fullText = '';
      let previewHtml = '';
      let totalWords = 0;
      let totalChars = 0;

      for (const page of pagesData) {
        previewHtml += `<div style="margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px dashed rgba(255,255,255,0.1);">`;
        previewHtml += `<div style="font-size: 0.75rem; color: #60a5fa; font-weight: 600; margin-bottom: 8px;">--- ${t('pdf2word_stat_pages')} ${page.pageNum} ---</div>`;

        for (const p of page.paragraphs) {
          const dirAttr = p.isArabic ? 'dir="rtl" style="text-align: right; font-family: Cairo, Inter;"' : 'dir="ltr" style="text-align: left;"';
          if (p.isHeading) {
            previewHtml += `<h4 ${dirAttr} style="font-size: 1.05rem; font-weight: 700; color: #93c5fd; margin: 8px 0 4px 0;">${escapeHtml(p.text)}</h4>`;
          } else {
            previewHtml += `<p ${dirAttr} style="margin: 4px 0 8px 0;">${escapeHtml(p.text)}</p>`;
          }
          fullText += p.text + '\n\n';
          totalChars += p.text.length;
          totalWords += (p.text.match(/\S+/g) || []).length;
        }
        previewHtml += `</div>`;
      }

      allExtractedPlainText = fullText.trim();

      if (docPreviewBox) {
        docPreviewBox.innerHTML = previewHtml || `<span style="color: var(--text-muted); font-style: italic;">${t('toast_no_pages')}</span>`;
      }

      // 3. Generate Word DOCX Blob
      const options = {
        fontFamily: fontFamilySelect ? fontFamilySelect.value : 'Calibri',
        fontSize: fontSizeSelect ? fontSizeSelect.value : '11',
        direction: directionSelect ? directionSelect.value : 'auto',
        insertPageBreaks: togglePageBreaks ? togglePageBreaks.checked : true,
        includeHeader: toggleHeaderInfo ? toggleHeaderInfo.checked : false,
        fileName: currentFile ? currentFile.name : 'document.pdf'
      };

      const docxBlob = await generateDocxBlob(pagesData, options, updateProgress);
      convertedDocxBlob = docxBlob;

      updateProgress(100, t('pdf2word_status_done'));

      // 4. Update Stats & Reveal Download Card
      if (statPagesCount) statPagesCount.textContent = targetPages.length;
      if (statWordsCount) statWordsCount.textContent = totalWords.toLocaleString();
      if (statCharsCount) statCharsCount.textContent = totalChars.toLocaleString();
      if (statDocxSize) statDocxSize.textContent = formatBytes(docxBlob.size);

      setTimeout(() => {
        if (progressCard) progressCard.classList.add('hidden');
        if (resultsCard) resultsCard.classList.remove('hidden');
        if (resultsCard) resultsCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 400);

      showToast(t('toast_success'), 'success');

    } catch (err) {
      console.error('Conversion failed:', err);
      showToast(t('toast_error') + ` (${err.message})`, 'error');
    } finally {
      isConverting = false;
      if (btnStartConvert) btnStartConvert.disabled = false;
      if (convertBtnIcon) {
        convertBtnIcon.setAttribute('data-lucide', 'file-output');
        convertBtnIcon.classList.remove('spinner');
        if (window.lucide) window.lucide.createIcons();
      }
    }
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Download Word Document
  function downloadDocx() {
    if (!convertedDocxBlob) return;
    const originalName = currentFile ? currentFile.name : 'document.pdf';
    const baseName = originalName.replace(/\.[^/.]+$/, '');
    const outName = `${baseName}.docx`;

    const url = URL.createObjectURL(convertedDocxBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = outName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }

  // Download Plain Text
  function downloadTxt() {
    if (!allExtractedPlainText) return;
    const originalName = currentFile ? currentFile.name : 'document.pdf';
    const baseName = originalName.replace(/\.[^/.]+$/, '');
    const outName = `${baseName}_extracted.txt`;

    // UTF-8 BOM for proper Arabic text opening in Windows Notepad
    const blob = new Blob(['\uFEFF' + allExtractedPlainText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = outName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }

  // Copy text to clipboard
  function copyExtractedText() {
    if (!allExtractedPlainText) return;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(allExtractedPlainText)
        .then(() => showToast(t('toast_copied'), 'success'))
        .catch(() => fallbackCopy(allExtractedPlainText));
    } else {
      fallbackCopy(allExtractedPlainText);
    }
  }

  function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try {
      document.execCommand('copy');
      showToast(t('toast_copied'), 'success');
    } catch (e) {
      showToast(t('toast_error'), 'error');
    }
    document.body.removeChild(ta);
  }

  // Generate a rich bilingual sample PDF on the fly using pdf-lib
  async function loadSamplePdf() {
    try {
      showToast(t('toast_sample_loaded'), 'info');

      if (!window.PDFLib) {
        throw new Error('PDF-Lib library not loaded');
      }

      const { PDFDocument, rgb, StandardFonts } = window.PDFLib;
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      // Page 1: Executive Overview
      const page1 = pdfDoc.addPage([600, 800]);
      page1.drawRectangle({
        x: 0,
        y: 720,
        width: 600,
        height: 80,
        color: rgb(0.14, 0.38, 0.92)
      });
      page1.drawText('EXECUTIVE AGREEMENT & SPECIFICATIONS', {
        x: 40,
        y: 750,
        size: 18,
        font: fontBold,
        color: rgb(1, 1, 1)
      });
      page1.drawText('PDF Netizen Client-Side Processing Architecture', {
        x: 40,
        y: 680,
        size: 13,
        font: fontBold,
        color: rgb(0.1, 0.15, 0.25)
      });
      page1.drawText('This sample document demonstrates authentic multi-page text reconstruction and formatting.', {
        x: 40,
        y: 655,
        size: 10,
        font: font,
        color: rgb(0.3, 0.35, 0.45)
      });
      page1.drawText('1. Privacy & Zero-Cloud Guarantee', {
        x: 40,
        y: 615,
        size: 12,
        font: fontBold,
        color: rgb(0.15, 0.2, 0.3)
      });
      page1.drawText('All conversion steps run entirely in browser memory using WebAssembly and JavaScript.', {
        x: 40,
        y: 590,
        size: 10,
        font: font,
        color: rgb(0.25, 0.3, 0.4)
      });
      page1.drawText('Files are never transmitted across network boundaries, fulfilling strict GDPR requirements.', {
        x: 40,
        y: 570,
        size: 10,
        font: font,
        color: rgb(0.25, 0.3, 0.4)
      });

      page1.drawText('2. Key Features and Capabilities', {
        x: 40,
        y: 530,
        size: 12,
        font: fontBold,
        color: rgb(0.15, 0.2, 0.3)
      });
      page1.drawText('- Converts multi-page PDF documents into editable Microsoft Word (.docx) files.', {
        x: 50,
        y: 505,
        size: 9.5,
        font: font,
        color: rgb(0.25, 0.3, 0.4)
      });
      page1.drawText('- Preserves paragraph structures, headings, and page boundaries.', {
        x: 50,
        y: 485,
        size: 9.5,
        font: font,
        color: rgb(0.25, 0.3, 0.4)
      });
      page1.drawText('- Seamless bidirectional support for Arabic right-to-left and English left-to-right text.', {
        x: 50,
        y: 465,
        size: 9.5,
        font: font,
        color: rgb(0.25, 0.3, 0.4)
      });

      // Page 2: Arabic & English Section
      const page2 = pdfDoc.addPage([600, 800]);
      page2.drawText('3. Technical Implementation & Compliance', {
        x: 40,
        y: 740,
        size: 14,
        font: fontBold,
        color: rgb(0.1, 0.15, 0.25)
      });
      page2.drawText('The client-side parser scans spatial glyph clusters to reconstruct coherent paragraphs.', {
        x: 40,
        y: 710,
        size: 10,
        font: font,
        color: rgb(0.25, 0.3, 0.4)
      });
      page2.drawText('Compatible with Word 2016-2024, Microsoft 365, Google Docs, and LibreOffice.', {
        x: 40,
        y: 690,
        size: 10,
        font: font,
        color: rgb(0.25, 0.3, 0.4)
      });

      page2.drawText('4. Terms and Document Verification', {
        x: 40,
        y: 640,
        size: 12,
        font: fontBold,
        color: rgb(0.15, 0.2, 0.3)
      });
      page2.drawText('Generated documents adhere to universal ISO/IEC 29500 OpenXML specifications.', {
        x: 40,
        y: 615,
        size: 10,
        font: font,
        color: rgb(0.25, 0.3, 0.4)
      });
      page2.drawText('Authorized Signature: _______________________ Date: 2026-09-17', {
        x: 40,
        y: 560,
        size: 10,
        font: fontBold,
        color: rgb(0.2, 0.25, 0.35)
      });

      const pdfBytes = await pdfDoc.save();
      const sampleBlob = new Blob([pdfBytes], { type: 'application/pdf' });
      await loadPdfDocument(await sampleBlob.arrayBuffer(), 'sample_agreement.pdf', sampleBlob.size);

    } catch (err) {
      console.error('Failed to generate sample PDF:', err);
      showToast(t('toast_error') + ` (${err.message})`, 'error');
    }
  }

})();
