/**
 * Word (.docx) to PDF Converter - 100% Client-Side Processing
 * Powered by Mammoth.js & html2pdf.js (jsPDF + html2canvas)
 * Zero Server Uploads • Fast & Private • English & Arabic RTL Support
 */

(function () {
  'use strict';

  // Master Bilingual Translation Dictionary
  const translations = {
    en: {
      badge_client_side: "100% Client-Side",
      nav_home: "Home",
      word2pdf_hero_badge: "100% Client-Side Word to PDF • Fast & Private",
      word2pdf_hero_title: 'Convert Word (.docx) to <span class="gradient-text">PDF Document</span>',
      word2pdf_hero_subtitle: "Transform Microsoft Word documents into beautiful, print-ready PDF files directly in your browser. 100% private with zero server uploads and full Arabic RTL support.",
      word2pdf_dropzone_title: "Drop your Word (.docx) file here",
      word2pdf_dropzone_subtitle: "Select or drag and drop any Microsoft Word (.docx) document to convert into an elegant PDF file instantly.",
      word2pdf_btn_browse: "Browse Word File",
      word2pdf_btn_sample: "Try Sample Word Doc",
      word2pdf_feature_pdf: "High-Fidelity PDF Output",
      word2pdf_feature_arabic: "Arabic & RTL Support",
      word2pdf_feature_privacy: "100% Client-Side Privacy",
      word2pdf_btn_change: "Change File",
      word2pdf_status_ready: "Ready to Convert",
      word2pdf_settings_title: "PDF Page & Layout Settings",
      word2pdf_label_format: "Page Size",
      word2pdf_label_orientation: "Orientation",
      word2pdf_orient_portrait: "Portrait (Vertical)",
      word2pdf_orient_landscape: "Landscape (Horizontal)",
      word2pdf_label_margins: "Page Margins",
      word2pdf_margin_normal: "Normal (12 mm)",
      word2pdf_margin_narrow: "Narrow (6 mm)",
      word2pdf_margin_wide: "Wide (20 mm)",
      word2pdf_margin_none: "No Margins (0 mm)",
      word2pdf_label_direction: "Text Direction & Font",
      word2pdf_dir_auto: "Auto-Detect (Arabic RTL & English LTR)",
      word2pdf_dir_rtl: "Force Right-to-Left (Arabic / RTL)",
      word2pdf_dir_ltr: "Force Left-to-Right (English / LTR)",
      word2pdf_label_options: "Enhancements",
      word2pdf_toggle_crisp: "Crisp Vector Rendering",
      word2pdf_toggle_crisp_desc: "Optimize canvas clarity for fonts and tables",
      word2pdf_btn_convert: "Convert to PDF Document",
      word2pdf_preview_title: "Live Document Preview",
      word2pdf_preview_placeholder: "Word document preview will appear here...",
      word2pdf_status_parsing: "Parsing Word document...",
      word2pdf_status_rendering: "Generating PDF document...",
      word2pdf_status_done: "PDF Generated Successfully!",
      word2pdf_success_badge: "PDF Generated Successfully!",
      word2pdf_stat_words: "Words",
      word2pdf_stat_chars: "Characters",
      word2pdf_stat_size: "PDF Size",
      word2pdf_btn_download_pdf: "Download PDF Document",
      word2pdf_btn_copy: "Copy Text",
      ad_space_label: "Advertisement Space (728x90)",
      footer_tagline: "100% Client-side, private, and secure document processing directly in your browser.",
      footer_privacy: "Privacy Policy",
      footer_terms: "Terms of Service",
      footer_contact: "Contact Us",
      footer_copyright: "© 2026 PDF Hub. All rights reserved.",
      cookie_consent_text: "We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.",
      cookie_learn_more: "Privacy Policy",
      cookie_accept_btn: "Accept",
      toast_sample_loaded: "Sample Word document loaded successfully.",
      toast_converting: "Converting Word document to PDF...",
      toast_success: "PDF created and downloaded successfully!",
      toast_copied: "Document text copied to clipboard!",
      toast_invalid_docx: "Please upload a valid Microsoft Word (.docx) file.",
      toast_error: "An error occurred during conversion. Please try again.",
      word2pdf_seo_badge: "Fast & Private Word to PDF Conversion",
      word2pdf_seo_title: "How to Convert Microsoft Word (.docx) to PDF Online",
      word2pdf_seo_subtitle: "Convert Word documents into polished, standardized PDF files directly inside your browser with 100% client-side privacy, accurate table and font rendering, and full Arabic RTL text support.",
      word2pdf_step1_title: "1. Upload Word Document",
      word2pdf_step1_desc: "Select or drag and drop your Microsoft Word (.docx) file into the secure browser dropzone.",
      word2pdf_step2_title: "2. Choose Page & Margin Options",
      word2pdf_step2_desc: "Customize page size (A4, Letter), orientation (Portrait, Landscape), margins, and Arabic RTL alignment.",
      word2pdf_step3_title: "3. Convert & Download PDF",
      word2pdf_step3_desc: "Click Convert to render your document into a standard, crisp PDF file instantly saved directly to your device.",
      word2pdf_faq_title: "Frequently Asked Questions",
      word2pdf_faq_q1: "Are my Word files uploaded to any external server?",
      word2pdf_faq_a1: "No, never. The conversion runs 100% client-side directly within your browser session using Mammoth.js and html2pdf.js. Your confidential documents, contracts, and private letters never leave your computer.",
      word2pdf_faq_q2: "Does this tool support Arabic right-to-left (RTL) Word documents?",
      word2pdf_faq_a2: "Yes! Our engine automatically detects Arabic script, applying proper right-to-left layout and embedding clean Arabic typography (such as Cairo and Tahoma) so your Arabic documents look sharp and readable.",
      word2pdf_faq_q3: "Does it preserve tables, headings, and bullet points?",
      word2pdf_faq_a3: "Yes. Headings, bold/italic text styles, numbered and bulleted lists, and structured data tables are parsed and converted cleanly into the resulting PDF.",
      word2pdf_faq_q4: "What Word file formats are supported?",
      word2pdf_faq_a4: "The converter supports all standard Microsoft Word (.docx) files created in Word 2007 through Word 2024, Office 365, Google Docs, and LibreOffice."
    },
    ar: {
      badge_client_side: "محلي ١٠٠٪ في المتصفح",
      nav_home: "الرئيسية",
      word2pdf_hero_badge: "تحويل Word إلى PDF محلياً ١٠٠٪ • سرعة وخصوصية",
      word2pdf_hero_title: 'تحويل مستندات Word (.docx) إلى <span class="gradient-text">ملف PDF</span>',
      word2pdf_hero_subtitle: "حوّل مستندات مايكروسوفت وورد إلى ملفات PDF احترافية وجاهزة للطباعة مباشرة في متصفحك بأمان تام وبدون رفع إلى أي خوادم مع دعم كامل للعربية.",
      word2pdf_dropzone_title: "اسحب ملف Word (.docx) هنا للتحويل",
      word2pdf_dropzone_subtitle: "اختر أو اسحب وأفلت أي مستند وورد (.docx) لتحويله فوراً إلى ملف PDF أنيق وعالي الجودة.",
      word2pdf_btn_browse: "استعراض ملف Word",
      word2pdf_btn_sample: "تجربة مستند نموذجي",
      word2pdf_feature_pdf: "مخرجات PDF عالية الدقة",
      word2pdf_feature_arabic: "دعم كامل للغة العربية (RTL)",
      word2pdf_feature_privacy: "خصوصية محلية ١٠٠٪",
      word2pdf_btn_change: "تغيير الملف",
      word2pdf_status_ready: "جاهز للتحويل",
      word2pdf_settings_title: "إعدادات صفحة وتنسيق PDF",
      word2pdf_label_format: "حجم الصفحة",
      word2pdf_label_orientation: "اتجاه الصفحة",
      word2pdf_orient_portrait: "عمودي (Portrait)",
      word2pdf_orient_landscape: "أفقي (Landscape)",
      word2pdf_label_margins: "هوامش الصفحة",
      word2pdf_margin_normal: "عادي (12 ملم)",
      word2pdf_margin_narrow: "ضيق (6 ملم)",
      word2pdf_margin_wide: "عريض (20 ملم)",
      word2pdf_margin_none: "بدون هوامش (0 ملم)",
      word2pdf_label_direction: "اتجاه النص والخط",
      word2pdf_dir_auto: "تعرف تلقائي (عربي RTL وإنجليزي LTR)",
      word2pdf_dir_rtl: "فرض الاتجاه من اليمين لليسار (عربي)",
      word2pdf_dir_ltr: "فرض الاتجاه من اليسار لليمين (إنجليزي)",
      word2pdf_label_options: "خيارات التحسين",
      word2pdf_toggle_crisp: "وضوح فائق للخطوط والجداول",
      word2pdf_toggle_crisp_desc: "تحسين دقة الرسم لكافة الخطوط والجداول المنسقة",
      word2pdf_btn_convert: "تحويل إلى مستند PDF",
      word2pdf_preview_title: "معاينة المستند المباشرة",
      word2pdf_preview_placeholder: "ستظهر معاينة مستند الوورد هنا فور تحميله...",
      word2pdf_status_parsing: "جاري قراءة وتحليل مستند Word...",
      word2pdf_status_rendering: "جاري إنشاء وتوليد ملف PDF...",
      word2pdf_status_done: "تم إنشاء ملف PDF بنجاح!",
      word2pdf_success_badge: "تم إنشاء ملف PDF بنجاح!",
      word2pdf_stat_words: "الكلمات",
      word2pdf_stat_chars: "الأحرف",
      word2pdf_stat_size: "حجم PDF",
      word2pdf_btn_download_pdf: "تحميل مستند PDF",
      word2pdf_btn_copy: "نسخ النص",
      ad_space_label: "مساحة إعلانية (728×90)",
      footer_tagline: "معالجة مستندات محلية ١٠٠٪، خاصة وآمنة تماماً مباشرة في متصفحك.",
      footer_privacy: "سياسة الخصوصية",
      footer_terms: "شروط الاستخدام",
      footer_contact: "اتصل بنا",
      footer_copyright: "© ٢٠٢٦ PDF Hub. جميع الحقوق محفوظة.",
      cookie_consent_text: "نحن نستخدم ملفات تعريف الارتباط لتحسين تجربتك. باستمرارك في زيارة هذا الموقع، فإنك توافق على استخدامنا لملفات تعريف الارتباط.",
      cookie_learn_more: "سياسة الخصوصية",
      cookie_accept_btn: "موافق",
      toast_sample_loaded: "تم تحميل مستند الوورد النموذجي بنجاح.",
      toast_converting: "جاري تحويل مستند Word إلى PDF...",
      toast_success: "تم إنشاء وتنزيل ملف PDF بنجاح!",
      toast_copied: "تم نسخ نص المستند إلى الحافظة بنجاح!",
      toast_invalid_docx: "يرجى اختيار ملف وورد بصيغة .docx صالحة.",
      toast_error: "حدث خطأ أثناء التحويل. يرجى المحاولة مرة أخرى.",
      word2pdf_seo_badge: "تحويل Word إلى PDF سريع وآمن",
      word2pdf_seo_title: "كيفية تحويل مستندات وورد Microsoft Word (.docx) إلى PDF أونلاين",
      word2pdf_seo_subtitle: "حوّل ملفات Word إلى مستندات PDF منسقة بدقة واحترافية مباشرة في متصفحك مع خصوصية محلية ١٠٠٪، ودعم كامل للجداول والنصوص العربية.",
      word2pdf_step1_title: "١. رفع مستند Word",
      word2pdf_step1_desc: "اختر أو اسحب وأفلت ملف مايكروسوفت وورد (.docx) داخل منطقة الرفع الآمنة في المتصفح.",
      word2pdf_step2_title: "٢. تخصيص حجم الصفحة والهوامش",
      word2pdf_step2_desc: "حدد حجم الصفحة (A4 أو Letter)، والاتجاه (عمودي أو أفقي)، والهوامش ومحاذاة اللغة العربية RTL.",
      word2pdf_step3_title: "٣. التحويل وتنزيل PDF",
      word2pdf_step3_desc: "اضغط على زر التحويل لإنشاء مستند PDF عالي الجودة وتحميله فوراً على جهازك.",
      word2pdf_faq_title: "الأسئلة الشائعة",
      word2pdf_faq_q1: "هل يتم رفع ملفات الوورد إلى أي خوادم خارجية؟",
      word2pdf_faq_a1: "كلا على الإطلاق. تتم جميع مراحل التحويل محلياً ١٠٠٪ داخل جلسة متصفحك بالاعتماد على Mammoth.js و html2pdf.js، دون أن تغادر مستنداتك أو بياناتك جهازك أبداً.",
      word2pdf_faq_q2: "هل تدعم الأداة مستندات Word المكتوبة باللغة العربية (RTL)؟",
      word2pdf_faq_a2: "نعم بكل تأكيد! يتعرف المحرك تلقائياً على النصوص العربية ويطبق اتجاه اليمين إلى اليسار (RTL) وخطوط عربية واضحة كخط Cairo و Tahoma للحصول على مستند PDF أنيق وسهل القراءة.",
      word2pdf_faq_q3: "هل تحافظ الأداة على الجداول والعناوين والنقاط؟",
      word2pdf_faq_a3: "نعم. يتم استخراج العناوين، والنصوص العريضة والمائلة، والقوائم النقطية والرقمية، وجداول البيانات وتحويلها بدقة عالية إلى ملف PDF.",
      word2pdf_faq_q4: "ما هي صيغ ملفات Word المدعومة؟",
      word2pdf_faq_a4: "يدعم المحول كافة مستندات Microsoft Word بصيغة .docx التي تم إنشاؤها عبر Word 2007-2024 و Office 365 و Google Docs و LibreOffice."
    }
  };

  let currentLang = 'en';
  let currentFile = null;
  let currentArrayBuffer = null;
  let parsedHtmlContent = '';
  let parsedRawText = '';
  let isConverting = false;
  let generatedPdfBlob = null;

  // DOM Elements Cache
  let dropzone, fileInput, btnBrowse, btnLoadSample;
  let workspacePanel, fileNameDisplay, fileSizeDisplay, fileStatusBadge, btnChangeFile;
  let pageFormatSelect, pageOrientationSelect, marginsSelect, directionSelect, toggleCrisp;
  let btnStartConvert, convertBtnIcon, convertBtnText;
  let progressCard, progressStatusText, progressPercent, progressBarFill;
  let docRenderContainer, previewFormatBadge, pdfExportContainer;
  let resultsCard, statWordsCount, statCharsCount, statPdfSize;
  let btnDownloadPdf, btnCopyText;
  let btnLanguageToggle, langToggleText;
  let toastEl, toastMsgEl, toastIconEl;
  let cookieBanner, btnAcceptCookies;

  document.addEventListener('DOMContentLoaded', () => {
    cacheElements();
    attachEventListeners();

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
    fileStatusBadge = document.getElementById('file-status-badge');
    btnChangeFile = document.getElementById('btn-change-file');

    pageFormatSelect = document.getElementById('page-format-select');
    pageOrientationSelect = document.getElementById('page-orientation-select');
    marginsSelect = document.getElementById('margins-select');
    directionSelect = document.getElementById('direction-select');
    toggleCrisp = document.getElementById('toggle-crisp');

    btnStartConvert = document.getElementById('btn-start-convert');
    convertBtnIcon = document.getElementById('convert-btn-icon');
    convertBtnText = document.getElementById('convert-btn-text');

    progressCard = document.getElementById('progress-card');
    progressStatusText = document.getElementById('progress-status-text');
    progressPercent = document.getElementById('progress-percent');
    progressBarFill = document.getElementById('progress-bar-fill');

    docRenderContainer = document.getElementById('doc-render-container');
    previewFormatBadge = document.getElementById('preview-format-badge');
    pdfExportContainer = document.getElementById('pdf-export-container');

    resultsCard = document.getElementById('results-card');
    statWordsCount = document.getElementById('stat-words-count');
    statCharsCount = document.getElementById('stat-chars-count');
    statPdfSize = document.getElementById('stat-pdf-size');

    btnDownloadPdf = document.getElementById('btn-download-pdf');
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
        loadSampleDocx();
      });
    }

    if (btnChangeFile) {
      btnChangeFile.addEventListener('click', resetWorkspace);
    }

    if (pageFormatSelect) {
      pageFormatSelect.addEventListener('change', () => {
        if (previewFormatBadge) {
          previewFormatBadge.textContent = pageFormatSelect.value.toUpperCase();
        }
      });
    }

    if (directionSelect) {
      directionSelect.addEventListener('change', updatePreviewDirection);
    }

    if (btnStartConvert) {
      btnStartConvert.addEventListener('click', executeConversion);
    }

    if (btnDownloadPdf) {
      btnDownloadPdf.addEventListener('click', triggerPdfDownload);
    }

    if (btnCopyText) {
      btnCopyText.addEventListener('click', copyExtractedText);
    }

    if (btnLanguageToggle) {
      btnLanguageToggle.addEventListener('click', toggleLanguage);
    }

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

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = t(key);
      if (text) {
        el.innerHTML = text;
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const text = t(key);
      if (text) {
        el.setAttribute('placeholder', text);
      }
    });

    updatePreviewDirection();

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

  function formatBytes(bytes, decimals = 1) {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  function containsArabic(str) {
    return /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/.test(str);
  }

  async function handleFile(file) {
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.docx')) {
      showToast(t('toast_invalid_docx'), 'error');
      return;
    }

    try {
      const arrayBuffer = await file.arrayBuffer();
      await parseDocx(arrayBuffer, file.name, file.size);
    } catch (err) {
      console.error('Failed to read file:', err);
      showToast(t('toast_error') + ` (${err.message})`, 'error');
    }
  }

  async function parseDocx(arrayBuffer, fileName, fileSize) {
    if (!window.mammoth) {
      throw new Error('Mammoth.js library is not loaded');
    }

    try {
      currentArrayBuffer = arrayBuffer;
      currentFile = { name: fileName, size: fileSize };
      window.uploadedFileName = fileName;

      // 1. Convert DOCX to HTML
      const result = await window.mammoth.convertToHtml({ arrayBuffer });
      parsedHtmlContent = result.value || '<p>Document has no readable text.</p>';

      // 2. Extract Raw Text for Stats & Copying
      const textResult = await window.mammoth.extractRawText({ arrayBuffer });
      parsedRawText = textResult.value || '';

      // Update UI File Info
      if (fileNameDisplay) fileNameDisplay.textContent = fileName;
      if (fileSizeDisplay) fileSizeDisplay.textContent = formatBytes(fileSize);

      // Transition Dropzone to Workspace
      if (dropzone) dropzone.parentElement.classList.add('hidden');
      if (workspacePanel) workspacePanel.classList.remove('hidden');
      if (resultsCard) resultsCard.classList.add('hidden');
      if (progressCard) progressCard.classList.add('hidden');

      // Populate Live Preview
      renderDocumentPreview();

      if (window.lucide) {
        window.lucide.createIcons();
      }

    } catch (err) {
      console.error('Failed to parse Word document:', err);
      showToast(t('toast_invalid_docx') + ` (${err.message})`, 'error');
    }
  }

  function renderDocumentPreview() {
    if (!docRenderContainer) return;
    docRenderContainer.innerHTML = parsedHtmlContent;
    updatePreviewDirection();
  }

  function updatePreviewDirection() {
    if (!docRenderContainer) return;

    const dirPref = directionSelect ? directionSelect.value : 'auto';
    const isArabicDoc = containsArabic(parsedRawText);

    if (dirPref === 'rtl' || (dirPref === 'auto' && isArabicDoc)) {
      docRenderContainer.setAttribute('dir', 'rtl');
      docRenderContainer.style.fontFamily = "'Cairo', 'Segoe UI Arabic', sans-serif";
      docRenderContainer.style.textAlign = 'right';
    } else {
      docRenderContainer.setAttribute('dir', 'ltr');
      docRenderContainer.style.fontFamily = "'Inter', system-ui, sans-serif";
      docRenderContainer.style.textAlign = 'left';
    }
  }

  function resetWorkspace() {
    currentFile = null;
    currentArrayBuffer = null;
    parsedHtmlContent = '';
    parsedRawText = '';
    generatedPdfBlob = null;
    isConverting = false;

    if (fileInput) fileInput.value = '';
    if (workspacePanel) workspacePanel.classList.add('hidden');
    if (dropzone) dropzone.parentElement.classList.remove('hidden');
    if (resultsCard) resultsCard.classList.add('hidden');
    if (progressCard) progressCard.classList.add('hidden');

    if (docRenderContainer) {
      docRenderContainer.innerHTML = `<span style="color: #94a3b8; font-style: italic;">${t('word2pdf_preview_placeholder')}</span>`;
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  async function executeConversion() {
    if (!parsedHtmlContent || isConverting) return;

    const jsPDFClass = (window.jspdf && window.jspdf.jsPDF) ? window.jspdf.jsPDF : (window.jsPDF || null);
    const hasHtml2Canvas = !!window.html2canvas;

    if (!jsPDFClass || !hasHtml2Canvas) {
      showToast(t('toast_error') + ' (PDF rendering libraries loading, please wait)', 'error');
      return;
    }

    isConverting = true;
    if (btnStartConvert) btnStartConvert.disabled = true;
    if (convertBtnIcon) {
      convertBtnIcon.setAttribute('data-lucide', 'loader-2');
      convertBtnIcon.classList.add('spinner');
      if (window.lucide) window.lucide.createIcons();
    }

    if (progressCard) progressCard.classList.remove('hidden');
    if (resultsCard) resultsCard.classList.add('hidden');

    const updateProgress = (percent, statusMsg) => {
      if (progressPercent) progressPercent.textContent = `${percent}%`;
      if (progressBarFill) progressBarFill.style.width = `${percent}%`;
      if (progressStatusText && statusMsg) {
        progressStatusText.innerHTML = `<i data-lucide="loader-2" class="spinner"></i> <span>${statusMsg}</span>`;
        if (window.lucide) window.lucide.createIcons();
      }
    };

    const isRtl = (directionSelect && directionSelect.value === 'rtl') ||
      (directionSelect && directionSelect.value === 'auto' && containsArabic(parsedRawText));

    // 1. Dedicated print container to prevent dark mode style inheritance and ensure valid computed layout
    const printNode = document.createElement('div');
    printNode.id = 'word-to-pdf-print-node';
    printNode.style.width = '794px';
    printNode.style.padding = '40px';
    printNode.style.background = '#ffffff';
    printNode.style.color = '#111827';
    printNode.style.fontFamily = isRtl
      ? "'Cairo', 'Segoe UI Arabic', 'Tahoma', Arial, sans-serif"
      : "'Inter', Arial, 'Segoe UI', Tahoma, sans-serif";
    printNode.style.fontSize = '14px';
    printNode.style.lineHeight = '1.6';
    printNode.style.position = 'absolute';
    printNode.style.left = '-9999px';
    printNode.style.top = '0';
    printNode.style.boxSizing = 'border-box';

    if (isRtl) {
      printNode.setAttribute('dir', 'rtl');
      printNode.style.textAlign = 'right';
    } else {
      printNode.setAttribute('dir', 'ltr');
      printNode.style.textAlign = 'left';
    }

    printNode.innerHTML = parsedHtmlContent;

    // Apply explicit clean printable typography & table styles to avoid dark-theme conflicts
    printNode.querySelectorAll('*').forEach(el => {
      el.style.boxSizing = 'border-box';
    });

    printNode.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(h => {
      h.style.color = '#1e3a8a';
      h.style.marginTop = '14pt';
      h.style.marginBottom = '6pt';
      h.style.fontWeight = '700';
    });

    printNode.querySelectorAll('p, span, div, li').forEach(el => {
      if (!el.matches('h1, h2, h3, h4, h5, h6, th, a')) {
        el.style.color = '#111827';
      }
    });

    printNode.querySelectorAll('table').forEach(tbl => {
      tbl.style.width = '100%';
      tbl.style.borderCollapse = 'collapse';
      tbl.style.margin = '12pt 0';
      tbl.style.color = '#111827';
      tbl.querySelectorAll('th, td').forEach(cell => {
        cell.style.border = '1px solid #cbd5e1';
        cell.style.padding = '8px 10px';
        cell.style.color = '#111827';
      });
      tbl.querySelectorAll('th').forEach(th => {
        th.style.backgroundColor = '#f1f5f9';
        th.style.fontWeight = '600';
      });
    });

    printNode.querySelectorAll('ul, ol').forEach(list => {
      list.style.paddingLeft = isRtl ? '0' : '24px';
      list.style.paddingRight = isRtl ? '24px' : '0';
      list.style.marginBottom = '8pt';
    });

    printNode.querySelectorAll('img').forEach(img => {
      img.style.maxWidth = '100%';
      img.style.height = 'auto';
    });

    // Attach to body for html2canvas layout rendering
    document.body.appendChild(printNode);

    try {
      showToast(t('toast_converting'), 'info');
      updateProgress(20, t('word2pdf_status_parsing'));

      const format = pageFormatSelect ? pageFormatSelect.value : 'a4';
      const orientation = pageOrientationSelect ? pageOrientationSelect.value : 'portrait';

      const pdf = new jsPDFClass({
        orientation: orientation,
        unit: 'pt',
        format: format
      });

      updateProgress(45, t('word2pdf_status_rendering'));

      // Render clean canvas with html2canvas
      const scaleValue = (toggleCrisp && toggleCrisp.checked) ? 2 : 1.5;
      const canvas = await window.html2canvas(printNode, {
        scale: scaleValue,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      updateProgress(75, t('word2pdf_status_rendering'));

      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      // First page
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Subsequent pages if text exceeds one page
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      updateProgress(95, "Finalizing PDF document...");

      const pdfBlob = pdf.output('blob');
      generatedPdfBlob = pdfBlob;

      // Calculate word & character metrics
      const words = (parsedRawText.match(/\S+/g) || []).length;
      const chars = parsedRawText.length;

      if (statWordsCount) statWordsCount.textContent = words.toLocaleString();
      if (statCharsCount) statCharsCount.textContent = chars.toLocaleString();
      if (statPdfSize) statPdfSize.textContent = formatBytes(pdfBlob.size);

      updateProgress(100, t('word2pdf_status_done'));

      const originalName = (currentFile && currentFile.name) || window.uploadedFileName || 'document.docx';
      const baseName = originalName.replace(/\.[^/.]+$/, '');
      const outputPdfName = `${baseName}.pdf`;

      // Save PDF via jsPDF save
      pdf.save(outputPdfName);

      setTimeout(() => {
        if (progressCard) progressCard.classList.add('hidden');
        if (resultsCard) resultsCard.classList.remove('hidden');
        if (resultsCard) resultsCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 400);

      showToast(t('toast_success'), 'success');

    } catch (err) {
      console.error('Word to PDF conversion failed:', err);
      showToast(t('toast_error') + ` (${err.message})`, 'error');
    } finally {
      if (printNode.parentNode) {
        printNode.parentNode.removeChild(printNode);
      }
      isConverting = false;
      if (btnStartConvert) btnStartConvert.disabled = false;
      if (convertBtnIcon) {
        convertBtnIcon.setAttribute('data-lucide', 'file-output');
        convertBtnIcon.classList.remove('spinner');
        if (window.lucide) window.lucide.createIcons();
      }
    }
  }

  function triggerPdfDownload() {
    if (!generatedPdfBlob) return;
    const originalName = (currentFile && currentFile.name) || window.uploadedFileName || 'document.docx';
    const baseName = originalName.replace(/\.[^/.]+$/, '');
    const outName = `${baseName}.pdf`;

    const url = URL.createObjectURL(generatedPdfBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = outName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 6000);
  }

  function copyExtractedText() {
    if (!parsedRawText) return;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(parsedRawText)
        .then(() => showToast(t('toast_copied'), 'success'))
        .catch(() => fallbackCopy(parsedRawText));
    } else {
      fallbackCopy(parsedRawText);
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

  // Create sample .docx on the fly with docx library
  async function loadSampleDocx() {
    try {
      showToast(t('toast_sample_loaded'), 'info');

      if (!window.docx) {
        throw new Error('docx library not loaded');
      }

      const { Document, Paragraph, TextRun, Table, TableRow, TableCell, AlignmentType, HeadingLevel, WidthType } = window.docx;

      const doc = new Document({
        sections: [{
          children: [
            new Paragraph({
              heading: HeadingLevel.HEADING_1,
              children: [
                new TextRun({
                  text: "Project Specification & Executive Summary",
                  bold: true,
                  size: 32,
                  color: "0284c7"
                })
              ],
              spacing: { after: 180 }
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "PDF Netizen Client-Side Processing Architecture",
                  bold: true,
                  size: 24
                })
              ],
              spacing: { after: 120 }
            }),
            new Paragraph({
              children: [
                new TextRun("This sample document illustrates instant client-side conversion from Microsoft Word (.docx) format into a high-fidelity PDF file. All rendering and layout computations execute securely on your local device.")
              ],
              spacing: { after: 140 }
            }),
            new Paragraph({
              heading: HeadingLevel.HEADING_2,
              children: [
                new TextRun({
                  text: "1. Core Security & Architectural Principles",
                  bold: true,
                  size: 26,
                  color: "1e3a8a"
                })
              ],
              spacing: { before: 200, after: 120 }
            }),
            new Paragraph({
              children: [
                new TextRun("• Zero-Server Transmission: Sensitive contracts and confidential financial data never leave your browser memory.")
              ]
            }),
            new Paragraph({
              children: [
                new TextRun("• Universal Standard Compliance: Output PDFs conform to ISO PDF standards and open seamlessly across all devices.")
              ]
            }),
            new Paragraph({
              children: [
                new TextRun("• Bidirectional Typography: Automatic detection for Arabic right-to-left (RTL) scripts with tailored Arabic fonts.")
              ],
              spacing: { after: 180 }
            }),
            new Paragraph({
              heading: HeadingLevel.HEADING_2,
              alignment: AlignmentType.RIGHT,
              bidirectional: true,
              children: [
                new TextRun({
                  text: "٢. نموذج باللغة العربية وتوافق كامل",
                  bold: true,
                  size: 26,
                  font: { name: "Cairo" },
                  rightToLeft: true,
                  color: "1e3a8a"
                })
              ],
              spacing: { before: 200, after: 120 }
            }),
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              bidirectional: true,
              children: [
                new TextRun({
                  text: "تتيح لك منصة PDF Netizen تحويل المستندات العربية والإنجليزية إلى ملفات PDF منسقة وواضحة تماماً مع الحفاظ على خصوصية بياناتك بنسبة ١٠٠٪ دون أي رفع سحابي.",
                  font: { name: "Cairo" },
                  rightToLeft: true,
                  size: 22
                })
              ],
              spacing: { after: 180 }
            }),
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph({ children: [new TextRun({ text: "Feature", bold: true })] })]
                    }),
                    new TableCell({
                      children: [new Paragraph({ children: [new TextRun({ text: "Status", bold: true })] })]
                    }),
                    new TableCell({
                      children: [new Paragraph({ children: [new TextRun({ text: "Processing", bold: true })] })]
                    })
                  ]
                }),
                new TableRow({
                  children: [
                    new TableCell({ children: [new Paragraph({ children: [new TextRun("Word (.docx) to PDF")] })] }),
                    new TableCell({ children: [new Paragraph({ children: [new TextRun("Supported")] })] }),
                    new TableCell({ children: [new Paragraph({ children: [new TextRun("100% Client-Side")] })] })
                  ]
                }),
                new TableRow({
                  children: [
                    new TableCell({ children: [new Paragraph({ children: [new TextRun("Arabic RTL Typography")] })] }),
                    new TableCell({ children: [new Paragraph({ children: [new TextRun("Supported")] })] }),
                    new TableCell({ children: [new Paragraph({ children: [new TextRun("Local Cairo Font")] })] })
                  ]
                })
              ]
            })
          ]
        }]
      });

      const docxBlob = await window.docx.Packer.toBlob(doc);
      const arrayBuffer = await docxBlob.arrayBuffer();
      await parseDocx(arrayBuffer, 'sample_specification.docx', docxBlob.size);

    } catch (err) {
      console.error('Failed to create sample DOCX:', err);
      showToast(t('toast_error') + ` (${err.message})`, 'error');
    }
  }

})();
