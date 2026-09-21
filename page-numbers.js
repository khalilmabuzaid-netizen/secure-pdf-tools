/**
 * Page Numbers - Interactive Client-Side PDF Pagination Engine
 * Powered by Mozilla PDF.js & PDF-Lib
 * 100% In-Browser Privacy • Lossless Vector Text Stamping • Zero Server Uploads
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
      nav_reset: "Reset",
      hero_badge: "100% Client-Side Page Numbering • Zero Uploads",
      hero_title: 'Add <span class="gradient-text">Page Numbers</span> to PDF',
      hero_subtitle: "Easily add page numbers to PDF documents online. Customize position, format, and font locally in your browser with 100% privacy.",
      dropzone_title: "Drop your PDF file here to add page numbers",
      dropzone_subtitle: "Select or drag & drop any PDF document to paginate and customize numbering positions with instant preview.",
      btn_browse_file: "Browse PDF File",
      btn_load_sample: "Try Sample PDF",
      pill_positions: "6 Header & Footer Positions",
      pill_formats: "Custom Formats & Fonts",
      pill_client_privacy: "100% In-Browser Privacy",
      btn_change_file: "Change File",
      preview_title: "Live Page Preview",
      preview_hint: "Live overlay reflects chosen position, format, and font size",
      heading_position: "Page Number Position",
      pos_top_left: "Top Left",
      pos_top_center: "Top Center",
      pos_top_right: "Top Right",
      pos_bottom_left: "Bottom Left",
      pos_bottom_center: "Bottom Center",
      pos_bottom_right: "Bottom Right",
      heading_format: "Numbering Format & Scope",
      label_format: "Display Format",
      label_start_page: "Start on Page",
      label_first_number: "First Number",
      label_skip_cover: "Skip Cover / First Page (Start numbering from page 2)",
      heading_styling: "Typography, Margins & Output",
      label_font_size: "Font Size",
      label_margin: "Margin from Edge",
      label_color: "Text Color",
      label_output_filename: "Output File Name",
      btn_apply_numbers: "Add Page Numbers & Download",
      progress_stamping: "Stamping page numbers onto PDF...",
      progress_complete: "PDF numbered successfully!",
      success_title: "Page Numbers Added Successfully!",
      success_desc: "Your PDF document has been formatted with customized vector page numbers. Download your file below.",
      btn_download_pdf: "Download Numbered PDF",
      btn_number_another: "Number Another PDF",
      ad_space_label: "Advertisement Space (728x90)",
      guide_badge: "Fast & Private Pagination",
      guide_title: "How to Add Page Numbers to PDF Online",
      guide_subtitle: "Number pages in reports, agreements, and legal contracts in three easy steps with 100% privacy.",
      step1_title: "Upload PDF File",
      step1_desc: "Drag and drop your PDF file into the upload zone or choose it from your computer or phone. All processing occurs locally in your browser.",
      step2_title: "Choose Position & Format",
      step2_desc: "Select header or footer placement, customize numbering style ('Page 1 of n' or '1 / n'), adjust font size, and choose whether to skip the cover page.",
      step3_title: "Download Numbered PDF",
      step3_desc: "Click 'Add Page Numbers & Download' to generate a pristine, lossless PDF stamped with vector page numbers in seconds.",
      faq_badge: "Got Questions?",
      faq_title: "Frequently Asked Questions",
      faq_subtitle: "Everything you need to know about our free client-side PDF page numbering tool.",
      faq_q1: "Are my PDF files uploaded to any server?",
      faq_a1: "Never. All page number stamping and document generation execute 100% locally in your browser memory using PDF-Lib. Your confidential files never touch a remote server.",
      faq_q2: "Can I exclude the cover page from being numbered?",
      faq_a2: "Yes! Simply enable 'Skip Cover / First Page' or set 'Start on Page 2' to keep your title page untouched and begin pagination from subsequent pages.",
      faq_q3: "Does adding page numbers affect text or image quality?",
      faq_a3: "No. The engine stamps clean vector text onto existing pages without compressing images or altering underlying vectors. All fonts and graphics remain crystal-clear.",
      faq_q4: "Which numbering positions are available?",
      faq_a4: "You can position numbers in 6 standard locations: Top-Left, Top-Center, Top-Right (header) and Bottom-Left, Bottom-Center, Bottom-Right (footer) with adjustable margins.",
      faq_q5: "Can I start numbering with a specific starting value?",
      faq_a5: "Yes! You can set the 'First Number' input to any integer (e.g. start at 15 for a multi-part report) and subsequent pages will increment accordingly.",
      faq_q6: "Is there any fee or file size limitation?",
      faq_a6: "No. The tool is 100% free with unlimited document processing, no watermark additions, and no account registration required.",
      footer_tagline: "100% Client-side, private, and secure document processing directly in your browser.",
      footer_privacy: "Privacy Policy",
      footer_terms: "Terms of Service",
      footer_contact: "Contact Us",
      footer_copyright: "© 2026 PDFNetizen. All rights reserved.",
      cookie_consent_text: "We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.",
      cookie_learn_more: "Privacy Policy",
      cookie_accept_btn: "Accept",
      page_label: "Page {n} of {total}",
      toast_loaded: "PDF document loaded successfully: {total} pages.",
      toast_sample: "Sample 4-page PDF document loaded.",
      toast_saved: "Numbered PDF generated successfully!",
      toast_error_load: "Failed to load PDF file. Please ensure it is a valid, unencrypted PDF.",
      toast_error_save: "An error occurred while stamping page numbers onto the PDF."
    },
    ar: {
      badge_client_side: "محلي ١٠٠٪ في المتصفح",
      nav_reset: "إعادة تعيين",
      hero_badge: "ترقيم صفحات PDF محلياً في المتصفح • أمان وخصوصية مطلقة",
      hero_title: 'إضافة <span class="gradient-text">أرقام الصفحات</span> لـ PDF',
      hero_subtitle: "أضف أرقام الصفحات إلى مستندات PDF بسهولة أونلاين. خصص الموضع والنمط والخط محلياً داخل متصفحك بخصوصية ١٠٠٪.",
      dropzone_title: "أفلت ملف PDF هنا لإضافة أرقام الصفحات",
      dropzone_subtitle: "اختر أو اسحب وأفلت أي مستند PDF لترقيم صفحاته وتخصيص موضع الأرقام مع معاينة حية وفورية.",
      btn_browse_file: "تصفح ملف PDF",
      btn_load_sample: "تجربة مستند نموذجي",
      pill_positions: "٦ مواضع في الرأس والتذييل",
      pill_formats: "أنماط وخطوط مخصصة",
      pill_client_privacy: "خصوصية محلية ١٠٠٪ في المتصفح",
      btn_change_file: "تغيير المستند",
      preview_title: "معاينة حية للصفحة",
      preview_hint: "تعكس المعاينة المباشرة الموضع والنمط وحجم الخط المختار فورياً",
      heading_position: "موضع رقم الصفحة",
      pos_top_left: "أعلى اليسار",
      pos_top_center: "أعلى الوسط",
      pos_top_right: "أعلى اليمين",
      pos_bottom_left: "أسفل اليسار",
      pos_bottom_center: "أسفل الوسط",
      pos_bottom_right: "أسفل اليمين",
      heading_format: "نمط ونطاق الترقيم",
      label_format: "نمط العرض",
      label_start_page: "البدء من صفحة",
      label_first_number: "الرقم الأول",
      label_skip_cover: "تخطي صفحة الغلاف (البدء بالترقيم من الصفحة الثانية)",
      heading_styling: "الخطوط والهوامش والملف",
      label_font_size: "حجم الخط",
      label_margin: "الهامش من الحافة",
      label_color: "لون النص",
      label_output_filename: "اسم الملف المخرج",
      btn_apply_numbers: "إضافة أرقام الصفحات وتنزيل PDF",
      progress_stamping: "جارٍ طباعة أرقام الصفحات على المستند...",
      progress_complete: "تم ترقيم المستند بنجاح!",
      success_title: "تمت إضافة أرقام الصفحات بنجاح!",
      success_desc: "تم تنسيق مستند الـ PDF الخاص بك بأرقام صفحات متجهية احترافية. يمكنك تنزيل ملفك أدناه.",
      btn_download_pdf: "تنزيل مستند PDF المرقم",
      btn_number_another: "ترقيم مستند PDF آخر",
      ad_space_label: "مساحة إعلانية (728×90)",
      guide_badge: "ترقيم سريع وآمن",
      guide_title: "كيفية إضافة أرقام الصفحات لـ PDF أونلاين",
      guide_subtitle: "قم بترقيم الصفحات في التقارير والعقود والمستندات القانونية في ثلاث خطوات سهلة مع خصوصية تامة.",
      step1_title: "رفع ملف PDF",
      step1_desc: "اسحب وأفلت ملف PDF في منطقة التحميل أو اختره من هاتفك أو حاسوبك. تتم المعالجة بالكامل محلياً داخل متصفحك.",
      step2_title: "تحديد الموضع والنمط",
      step2_desc: "اختر الموضع في رأس أو تذييل الصفحة، وخصص نمط الترقيم ('صفحة ١ من ١٠' أو '١ / ١٠') واضبط حجم الخط واستثناء الغلاف.",
      step3_title: "تنزيل مستند PDF المرقم",
      step3_desc: "اضغط على 'إضافة أرقام الصفحات وتنزيل PDF' لإنشاء وتنزيل مستندك المنسق بأرقام صفحات واضحة في ثوانٍ.",
      faq_badge: "لديك استفسار؟",
      faq_title: "الأسئلة الشائعة",
      faq_subtitle: "كل ما تحتاج معرفته حول أداة ترقيم مستندات PDF المجانية والمحلية.",
      faq_q1: "هل يتم رفع ملفات الـ PDF الخاصة بي إلى أي خوادم خارجية؟",
      faq_a1: "أبداً. تتم عمليات ترقيم المستند وتوليد الـ PDF محلياً بنسبة ١٠٠٪ في ذاكرة متصفحك عبر PDF-Lib دون رفع أي ملفات لخوادم خارجية إطلاقاً.",
      faq_q2: "هل يمكنني استثناء صفحة الغلاف الأولى من الترقيم؟",
      faq_a2: "نعم! ما عليك سوى تفعيل خيار 'تخطي صفحة الغلاف' أو تعيين 'البدء من صفحة ٢' لترك الغلاف بدون ترقيم والبدء من الصفحات التالية.",
      faq_q3: "هل تؤثر أرقام الصفحات على جودة نصوص وصور المستند؟",
      faq_a3: "كلا. يقوم المحرك بطباعة نصوص متجهية نقية على الصفحات دون إعادة ضغط الصور أو تقليل دقة الخطوط، مما يضمن نقاء المستند بنسبة ١٠٠٪.",
      faq_q4: "ما هي المواضع المتاحة لطباعة أرقام الصفحات؟",
      faq_a4: "يمكنك وضع الأرقام في ٦ مواضع قياسية: أعلى اليمين/الوسط/اليسار في الرأس، أو أسفل اليمين/الوسط/اليسار في التذييل مع هوامش قابلة للتعديل.",
      faq_q5: "هل يمكنني بدء الترقيم برقم مخصص غير الرقم ١؟",
      faq_a5: "نعم! يمكنك تعيين قيمة 'الرقم الأول' إلى أي رقم (مثلاً البدء من ١٥ للأجزاء اللاحقة من التقارير) وسيزداد الترقيم تدريجياً.",
      faq_q6: "هل توجد أي رسوم أو حدود لحجم الملفات؟",
      faq_a6: "لا. الأداة مجانية بالكامل ١٠٠٪ بلا قيود على حجم الملفات أو عدد الصفحات، ودون إضافة أي علامات مائية أو اشتراكات.",
      footer_tagline: "معالجة مستندات محلية ١٠٠٪، خاصة وآمنة تماماً مباشرة في متصفحك.",
      footer_privacy: "سياسة الخصوصية",
      footer_terms: "شروط الاستخدام",
      footer_contact: "اتصل بنا",
      footer_copyright: "© ٢٠٢٦ PDFNetizen. جميع الحقوق محفوظة.",
      cookie_consent_text: "نحن نستخدم ملفات تعريف الارتباط لتحسين تجربتك. باستمرارك في زيارة هذا الموقع، فإنك توافق على استخدامنا لملفات تعريف الارتباط.",
      cookie_learn_more: "سياسة الخصوصية",
      cookie_accept_btn: "موافق",
      page_label: "صفحة {n} من {total}",
      toast_loaded: "تم تحميل مستند PDF بنجاح: {total} صفحات.",
      toast_sample: "تم تحميل مستند PDF النموذجي (٤ صفحات).",
      toast_saved: "تم ترقيم مستند PDF وتنزيله بنجاح!",
      toast_error_load: "فشل تحميل مستند PDF. يرجى التأكد من سلامة الملف وصيغته.",
      toast_error_save: "حدث خطأ أثناء طباعة أرقام الصفحات على المستند."
    }
  };

  let currentLang = 'en';

  // Application State
  let rawPdfBytes = null;
  let pdfJsDoc = null;
  let docFileName = "document";
  let totalOriginalPages = 0;
  let compiledPdfBlobUrl = null;
  let isProcessing = false;

  // Pagination Settings
  const settings = {
    position: 'bottom-center',
    format: 'page-of', // 'single' | 'slash' | 'page-of'
    startPage: 1,
    firstNumber: 1,
    skipCover: false,
    fontSize: 12,
    margin: 30,
    color: '#000000'
  };

  // DOM References
  const fileInput = document.getElementById('pdf-file-input');
  const dropzone = document.getElementById('dropzone');
  const btnBrowseFile = document.getElementById('btn-browse-file');
  const btnLoadSample = document.getElementById('btn-load-sample');

  const workspacePanel = document.getElementById('workspace-panel');
  const fileNameDisplay = document.getElementById('file-name-display');
  const fileSizeDisplay = document.getElementById('file-size-display');
  const pagesCountText = document.getElementById('pages-count-text');
  const btnChangeFile = document.getElementById('btn-change-file');
  const btnHeaderReset = document.getElementById('btn-header-reset');

  // Preview elements
  const previewCanvas = document.getElementById('preview-canvas');
  const previewWrapper = document.getElementById('preview-wrapper');
  const numberOverlay = document.getElementById('number-overlay');
  const previewPageTag = document.getElementById('preview-page-tag');

  // Control inputs
  const positionButtons = document.querySelectorAll('.btn-pos-choice');
  const formatButtons = document.querySelectorAll('.btn-format-pill');
  const inputStartPage = document.getElementById('input-start-page');
  const inputFirstNumber = document.getElementById('input-first-number');
  const checkSkipFirst = document.getElementById('check-skip-first');
  const rangeFontSize = document.getElementById('range-font-size');
  const valFontSize = document.getElementById('val-font-size');
  const rangeMargin = document.getElementById('range-margin');
  const valMargin = document.getElementById('val-margin');
  const colorPresetButtons = document.querySelectorAll('.color-preset-btn');
  const outputFilenameInput = document.getElementById('output-filename-input');

  // Action & Progress
  const btnApplyNumbers = document.getElementById('btn-apply-numbers');
  const btnSaveSpinner = document.getElementById('btn-save-spinner');
  const btnSaveIcon = document.getElementById('btn-save-icon');
  const btnSaveText = document.getElementById('btn-save-text');

  const numberingProgress = document.getElementById('numbering-progress');
  const progressStatusText = document.getElementById('progress-status-text');
  const progressPercent = document.getElementById('progress-percent');
  const progressBarFill = document.getElementById('progress-bar-fill');

  const successDownloadCard = document.getElementById('success-download-card');
  const pdfFilenameDisplay = document.getElementById('pdf-filename-display');
  const pdfFilesizeDisplay = document.getElementById('pdf-filesize-display');
  const btnDownloadPdf = document.getElementById('btn-download-pdf');
  const btnNumberAnother = document.getElementById('btn-number-another');

  const toastEl = document.getElementById('toast');
  const toastMessageEl = document.getElementById('toast-message');
  let toastTimeout = null;

  const btnLanguageToggle = document.getElementById('btn-language-toggle');
  const langToggleText = document.getElementById('lang-toggle-text');

  // Format File Size Helper
  function formatBytes(bytes) {
    if (!bytes || bytes === 0) return '0 KB';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Toast Notification System
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
    }, 3800);
  }

  // Language & i18n Handling
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

    if (totalOriginalPages > 0) {
      pagesCountText.textContent = isAr
        ? `${totalOriginalPages} صفحات`
        : `${totalOriginalPages} ${totalOriginalPages === 1 ? 'Page' : 'Pages'}`;
    }

    updatePreviewOverlay();

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

  // File Upload & Drag-and-Drop Event Bindings
  if (dropzone && fileInput) {
    dropzone.addEventListener('click', () => fileInput.click());

    ['dragenter', 'dragover'].forEach(eventName => {
      dropzone.addEventListener(eventName, e => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.add('drag-over');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropzone.addEventListener(eventName, e => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.remove('drag-over');
      });
    });

    dropzone.addEventListener('drop', e => {
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

  if (btnBrowseFile && fileInput) {
    btnBrowseFile.addEventListener('click', e => {
      e.stopPropagation();
      fileInput.click();
    });
  }

  if (btnChangeFile && fileInput) {
    btnChangeFile.addEventListener('click', () => fileInput.click());
  }

  if (btnHeaderReset) {
    btnHeaderReset.addEventListener('click', resetWorkspace);
  }

  if (btnNumberAnother) {
    btnNumberAnother.addEventListener('click', resetWorkspace);
  }

  // Handle PDF File Selection
  async function handleFileSelection(file) {
    if (!file || (file.type && file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf'))) {
      const dict = translations[currentLang] || translations.en;
      showToast(dict.toast_error_load, 'alert-circle');
      return;
    }

    docFileName = file.name.replace(/\.[^/.]+$/, "") || "document";
    if (outputFilenameInput) {
      outputFilenameInput.value = `${docFileName}_numbered`;
    }

    try {
      const arrayBuffer = await file.arrayBuffer();
      rawPdfBytes = arrayBuffer;
      await processLoadedPdf(arrayBuffer, file.name, formatBytes(file.size));
    } catch (err) {
      console.error("Error reading PDF file:", err);
      const dict = translations[currentLang] || translations.en;
      showToast(dict.toast_error_load, 'alert-circle');
    }
  }

  // Sample PDF Loader
  if (btnLoadSample) {
    btnLoadSample.addEventListener('click', async e => {
      e.stopPropagation();
      await loadSampleDocument();
    });
  }

  // Generate a multi-page sample PDF using PDFLib
  async function loadSampleDocument() {
    if (!window.PDFLib) {
      showToast("PDF-Lib engine is loading, please try again in a moment.", "alert-circle");
      return;
    }

    try {
      docFileName = "annual_report";
      if (outputFilenameInput) {
        outputFilenameInput.value = "annual_report_numbered";
      }

      const samplePdfDoc = await window.PDFLib.PDFDocument.create();
      const rgb = window.PDFLib.rgb;
      const font = await samplePdfDoc.embedFont(window.PDFLib.StandardFonts.HelveticaBold);
      const subFont = await samplePdfDoc.embedFont(window.PDFLib.StandardFonts.Helvetica);

      const pageConfigs = [
        {
          title: "Annual Strategy & Vision Report 2026",
          badge: "Corporate Dossier",
          color: rgb(0.96, 0.62, 0.04), // Amber
          desc: "Executive Summary, Enterprise Milestones & Global Strategy Briefing"
        },
        {
          title: "Quarterly Financial Analytics & Revenue Growth",
          badge: "Financial Breakdown",
          color: rgb(0.23, 0.51, 0.96), // Indigo
          desc: "EBITDA Metrics, Department Budgets & Operational Capital Expenditures"
        },
        {
          title: "Engineering Architecture & Infrastructure Scaling",
          badge: "Technical Specs",
          color: rgb(0.55, 0.36, 0.96), // Purple
          desc: "Core Platform Reliability, Zero-Trust Security & API Performance"
        },
        {
          title: "Regulatory Compliance & Stakeholder Sign-Off",
          badge: "Governance & Audit",
          color: rgb(0.06, 0.72, 0.49), // Emerald
          desc: "Board Approvals, Privacy Audit Certification & Legal Endorsements"
        }
      ];

      for (let i = 0; i < pageConfigs.length; i++) {
        const config = pageConfigs[i];
        const page = samplePdfDoc.addPage([612, 792]);

        // Background
        page.drawRectangle({
          x: 20,
          y: 20,
          width: 572,
          height: 752,
          color: rgb(0.05, 0.04, 0.09)
        });

        // Banner
        page.drawRectangle({
          x: 20,
          y: 700,
          width: 572,
          height: 72,
          color: config.color
        });

        page.drawText("PDFNetizen Document Sample", {
          x: 40,
          y: 742,
          size: 13,
          font: subFont,
          color: rgb(1, 1, 1)
        });

        page.drawText(config.badge.toUpperCase(), {
          x: 40,
          y: 718,
          size: 17,
          font: font,
          color: rgb(1, 1, 1)
        });

        // Content
        page.drawText(config.title, {
          x: 40,
          y: 630,
          size: 18,
          font: font,
          color: rgb(0.97, 0.98, 1)
        });

        page.drawText(config.desc, {
          x: 40,
          y: 600,
          size: 12,
          font: subFont,
          color: rgb(0.65, 0.72, 0.85)
        });

        // Body card
        page.drawRectangle({
          x: 40,
          y: 200,
          width: 532,
          height: 360,
          color: rgb(0.09, 0.08, 0.16),
          borderColor: rgb(0.2, 0.18, 0.32),
          borderWidth: 1
        });

        page.drawText("Document Pagination Sample Overview", {
          x: 60,
          y: 520,
          size: 15,
          font: font,
          color: config.color
        });

        page.drawText("• Add headers or footers with automated vector page numbers.", {
          x: 60,
          y: 470,
          size: 12,
          font: subFont,
          color: rgb(0.85, 0.9, 0.98)
        });

        page.drawText("• Choose between 6 standard positions (Header / Footer: Left, Center, Right).", {
          x: 60,
          y: 435,
          size: 12,
          font: subFont,
          color: rgb(0.7, 0.75, 0.85)
        });

        page.drawText("• Customize format ('Page 1 of n' or '1 / n') and skip the cover page easily.", {
          x: 60,
          y: 400,
          size: 12,
          font: subFont,
          color: rgb(0.7, 0.75, 0.85)
        });

        page.drawText("• 100% In-Browser Privacy: All document processing runs locally on your device.", {
          x: 60,
          y: 365,
          size: 12,
          font: subFont,
          color: rgb(0.7, 0.75, 0.85)
        });
      }

      const sampleBytes = await samplePdfDoc.save();
      rawPdfBytes = sampleBytes.buffer;
      await processLoadedPdf(sampleBytes.buffer, "annual_report.pdf", formatBytes(sampleBytes.byteLength));

      const dict = translations[currentLang] || translations.en;
      showToast(dict.toast_sample, 'sparkles');

    } catch (err) {
      console.error("Error generating sample document:", err);
      const dict = translations[currentLang] || translations.en;
      showToast(dict.toast_error_load, 'alert-circle');
    }
  }

  // Process Loaded PDF & Render First Page Preview
  async function processLoadedPdf(arrayBuffer, name, sizeStr) {
    if (!window.pdfjsLib) {
      showToast("PDF.js library is loading, please try again in a moment.", "alert-circle");
      return;
    }

    try {
      isProcessing = true;
      if (btnApplyNumbers) btnApplyNumbers.disabled = true;

      dropzone.classList.add('hidden');
      successDownloadCard.classList.add('hidden');
      workspacePanel.classList.remove('hidden');
      if (btnHeaderReset) btnHeaderReset.disabled = false;

      fileNameDisplay.textContent = name;
      fileSizeDisplay.textContent = sizeStr;

      // Load with PDF.js
      const loadingTask = window.pdfjsLib.getDocument({ data: arrayBuffer });
      pdfJsDoc = await loadingTask.promise;
      totalOriginalPages = pdfJsDoc.numPages;

      const isAr = (currentLang === 'ar');
      pagesCountText.textContent = isAr
        ? `${totalOriginalPages} صفحات`
        : `${totalOriginalPages} ${totalOriginalPages === 1 ? 'Page' : 'Pages'}`;

      // Render Page 1 to preview canvas
      await renderPreviewPage(1);

      // Update interactive overlay
      updatePreviewOverlay();

      if (btnApplyNumbers) btnApplyNumbers.disabled = false;
      const dict = translations[currentLang] || translations.en;
      showToast(dict.toast_loaded.replace('{total}', totalOriginalPages), 'check-circle-2');

    } catch (err) {
      console.error("PDF loading error:", err);
      const dict = translations[currentLang] || translations.en;
      showToast(dict.toast_error_load, 'alert-circle');
      resetWorkspace();
    } finally {
      isProcessing = false;
    }
  }

  // Render Preview Page Thumbnail on Canvas
  async function renderPreviewPage(pageNum) {
    if (!pdfJsDoc) return;

    try {
      const page = await pdfJsDoc.getPage(pageNum);
      const unscaledViewport = page.getViewport({ scale: 1.0 });

      // Scale to fit ~380px preview container
      const scale = Math.min(1.5, 380 / unscaledViewport.width);
      const viewport = page.getViewport({ scale });

      previewCanvas.width = Math.floor(viewport.width);
      previewCanvas.height = Math.floor(viewport.height);

      const ctx = previewCanvas.getContext('2d', { alpha: false });
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, previewCanvas.width, previewCanvas.height);

      await page.render({ canvasContext: ctx, viewport }).promise;

      if (previewPageTag) {
        previewPageTag.textContent = `Page ${pageNum}`;
      }

    } catch (renderErr) {
      console.error("Error rendering preview canvas:", renderErr);
    }
  }

  // Compute Page Number Text based on Settings
  function computeNumberText(pageNum, totalPages) {
    const startPage = settings.skipCover ? 2 : settings.startPage;
    if (pageNum < startPage) {
      return (currentLang === 'ar') ? "(تخطي الغلاف)" : "(Skipped)";
    }

    const currentNumber = settings.firstNumber + (pageNum - startPage);
    const totalCount = totalPages || 10;

    if (settings.format === 'single') {
      return `${currentNumber}`;
    } else if (settings.format === 'slash') {
      return `${currentNumber} / ${totalCount}`;
    } else {
      // 'page-of'
      const dict = translations[currentLang] || translations.en;
      return dict.page_label.replace('{n}', currentNumber).replace('{total}', totalCount);
    }
  }

  // Update Live Preview Number Overlay Position & Styling
  function updatePreviewOverlay() {
    if (!numberOverlay || !previewWrapper) return;

    const total = totalOriginalPages || 10;
    const isSkipped = settings.skipCover;
    const text = computeNumberText(isSkipped ? 2 : 1, total);

    numberOverlay.textContent = text;
    numberOverlay.style.fontSize = `${Math.max(10, Math.min(18, settings.fontSize))}px`;
    numberOverlay.style.color = (settings.color === '#ffffff') ? '#000000' : '#ffffff';
    numberOverlay.style.background = (settings.color === '#ffffff') ? 'rgba(255, 255, 255, 0.95)' : settings.color;
    numberOverlay.style.borderColor = '#f59e0b';

    // Reset styles
    numberOverlay.style.top = 'auto';
    numberOverlay.style.bottom = 'auto';
    numberOverlay.style.left = 'auto';
    numberOverlay.style.right = 'auto';
    numberOverlay.style.transform = 'none';

    // Scale margin for preview box (~380px vs 612px page -> scale ~ 0.6)
    const scaledMargin = Math.max(8, Math.floor(settings.margin * 0.5));

    switch (settings.position) {
      case 'top-left':
        numberOverlay.style.top = `${scaledMargin}px`;
        numberOverlay.style.left = `${scaledMargin}px`;
        break;
      case 'top-center':
        numberOverlay.style.top = `${scaledMargin}px`;
        numberOverlay.style.left = '50%';
        numberOverlay.style.transform = 'translateX(-50%)';
        break;
      case 'top-right':
        numberOverlay.style.top = `${scaledMargin}px`;
        numberOverlay.style.right = `${scaledMargin}px`;
        break;
      case 'bottom-left':
        numberOverlay.style.bottom = `${scaledMargin}px`;
        numberOverlay.style.left = `${scaledMargin}px`;
        break;
      case 'bottom-center':
        numberOverlay.style.bottom = `${scaledMargin}px`;
        numberOverlay.style.left = '50%';
        numberOverlay.style.transform = 'translateX(-50%)';
        break;
      case 'bottom-right':
        numberOverlay.style.bottom = `${scaledMargin}px`;
        numberOverlay.style.right = `${scaledMargin}px`;
        break;
    }
  }

  // Setup Control Event Listeners
  // 1. Position Buttons
  positionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      positionButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      settings.position = btn.getAttribute('data-pos');
      updatePreviewOverlay();
    });
  });

  // 2. Format Buttons
  formatButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      formatButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      settings.format = btn.getAttribute('data-format');
      updatePreviewOverlay();
    });
  });

  // 3. Inputs (Start on page & first number)
  if (inputStartPage) {
    inputStartPage.addEventListener('input', () => {
      settings.startPage = Math.max(1, parseInt(inputStartPage.value, 10) || 1);
      updatePreviewOverlay();
    });
  }

  if (inputFirstNumber) {
    inputFirstNumber.addEventListener('input', () => {
      settings.firstNumber = parseInt(inputFirstNumber.value, 10) || 1;
      updatePreviewOverlay();
    });
  }

  // 4. Skip First Page Checkbox
  if (checkSkipFirst) {
    checkSkipFirst.addEventListener('change', () => {
      settings.skipCover = checkSkipFirst.checked;
      if (settings.skipCover && inputStartPage) {
        inputStartPage.value = '2';
        settings.startPage = 2;
      }
      updatePreviewOverlay();
    });
  }

  // 5. Font Size Slider
  if (rangeFontSize && valFontSize) {
    rangeFontSize.addEventListener('input', () => {
      settings.fontSize = parseInt(rangeFontSize.value, 10);
      valFontSize.textContent = `${settings.fontSize} pt`;
      updatePreviewOverlay();
    });
  }

  // 6. Margin Slider
  if (rangeMargin && valMargin) {
    rangeMargin.addEventListener('input', () => {
      settings.margin = parseInt(rangeMargin.value, 10);
      valMargin.textContent = `${settings.margin} pt`;
      updatePreviewOverlay();
    });
  }

  // 7. Color Preset Buttons
  colorPresetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      colorPresetButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      settings.color = btn.getAttribute('data-color') || '#000000';
      updatePreviewOverlay();
    });
  });

  // Helper: Hex Color to RGB components (0..1)
  function hexToRgb01(hex) {
    let cleanHex = hex.replace('#', '');
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split('').map(c => c + c).join('');
    }
    const num = parseInt(cleanHex, 16);
    const r = ((num >> 16) & 255) / 255;
    const g = ((num >> 8) & 255) / 255;
    const b = (num & 255) / 255;
    return { r, g, b };
  }

  // Apply Page Numbers & Compile Lossless PDF via PDF-Lib
  if (btnApplyNumbers) {
    btnApplyNumbers.addEventListener('click', async () => {
      if (!rawPdfBytes || isProcessing) return;

      if (!window.PDFLib) {
        showToast("PDF-Lib engine is loading, please try again in a moment.", 'alert-circle');
        return;
      }

      const dict = translations[currentLang] || translations.en;

      try {
        isProcessing = true;
        btnApplyNumbers.disabled = true;
        btnSaveSpinner.classList.remove('hidden');
        btnSaveIcon.classList.add('hidden');

        numberingProgress.classList.remove('hidden');
        progressBarFill.style.width = '15%';
        progressPercent.textContent = '15%';
        progressStatusText.textContent = dict.progress_stamping;

        // Load original document into PDF-Lib
        const pdfDoc = await window.PDFLib.PDFDocument.load(rawPdfBytes, { ignoreEncryption: true });
        const font = await pdfDoc.embedFont(window.PDFLib.StandardFonts.Helvetica);

        progressBarFill.style.width = '35%';
        progressPercent.textContent = '35%';

        const totalPages = pdfDoc.getPageCount();
        const startPage = settings.skipCover ? 2 : settings.startPage;
        const firstNumber = settings.firstNumber;
        const fontSize = settings.fontSize;
        const margin = settings.margin;
        const rgbColor = hexToRgb01(settings.color);
        const textColor = window.PDFLib.rgb(rgbColor.r, rgbColor.g, rgbColor.b);

        const pages = pdfDoc.getPages();

        for (let i = 0; i < pages.length; i++) {
          const pageNum = i + 1;

          // Check if page should be numbered
          if (pageNum >= startPage) {
            const currentNumber = firstNumber + (pageNum - startPage);
            let textStr = "";

            if (settings.format === 'single') {
              textStr = `${currentNumber}`;
            } else if (settings.format === 'slash') {
              textStr = `${currentNumber} / ${totalPages}`;
            } else {
              // 'page-of'
              textStr = (currentLang === 'ar')
                ? `صفحة ${currentNumber} من ${totalPages}`
                : `Page ${currentNumber} of ${totalPages}`;
            }

            const page = pages[i];
            const { width, height } = page.getSize();
            const textWidth = font.widthOfTextAtSize(textStr, fontSize);
            const textHeight = font.heightAtSize(fontSize);

            let x = 0;
            let y = 0;

            // Compute coordinates in PDF coordinate space (0,0 is bottom-left)
            switch (settings.position) {
              case 'top-left':
                x = margin;
                y = height - margin - textHeight;
                break;
              case 'top-center':
                x = (width - textWidth) / 2;
                y = height - margin - textHeight;
                break;
              case 'top-right':
                x = width - margin - textWidth;
                y = height - margin - textHeight;
                break;
              case 'bottom-left':
                x = margin;
                y = margin;
                break;
              case 'bottom-center':
                x = (width - textWidth) / 2;
                y = margin;
                break;
              case 'bottom-right':
                x = width - margin - textWidth;
                y = margin;
                break;
            }

            page.drawText(textStr, {
              x: Math.max(0, x),
              y: Math.max(0, y),
              size: fontSize,
              font: font,
              color: textColor
            });
          }

          // Progress update
          const pct = Math.floor(35 + ((i + 1) / pages.length * 55));
          progressBarFill.style.width = `${pct}%`;
          progressPercent.textContent = `${pct}%`;
        }

        progressBarFill.style.width = '95%';
        progressPercent.textContent = '95%';

        // Save numbered PDF
        const finalPdfBytes = await pdfDoc.save();

        progressBarFill.style.width = '100%';
        progressPercent.textContent = '100%';
        progressStatusText.textContent = dict.progress_complete;

        // Create Blob and URL
        const blob = new Blob([finalPdfBytes], { type: 'application/pdf' });
        if (compiledPdfBlobUrl) {
          URL.revokeObjectURL(compiledPdfBlobUrl);
        }
        compiledPdfBlobUrl = URL.createObjectURL(blob);

        let outName = (outputFilenameInput && outputFilenameInput.value.trim()) || `${docFileName}_numbered`;
        if (!outName.toLowerCase().endsWith('.pdf')) {
          outName += '.pdf';
        }

        // Setup Success Card
        pdfFilenameDisplay.textContent = outName;
        pdfFilesizeDisplay.textContent = formatBytes(finalPdfBytes.byteLength);

        btnDownloadPdf.onclick = () => {
          const a = document.createElement('a');
          a.href = compiledPdfBlobUrl;
          a.download = outName;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        };

        // Automatic Download trigger
        btnDownloadPdf.click();

        // Reveal Success Card
        successDownloadCard.classList.remove('hidden');
        successDownloadCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        showToast(dict.toast_saved, 'check-circle-2');

      } catch (err) {
        console.error("Error numbering PDF document:", err);
        showToast(dict.toast_error_save, 'alert-circle');
      } finally {
        isProcessing = false;
        btnApplyNumbers.disabled = false;
        btnSaveSpinner.classList.add('hidden');
        btnSaveIcon.classList.remove('hidden');
        setTimeout(() => {
          numberingProgress.classList.add('hidden');
        }, 2000);
      }
    });
  }

  // Reset Entire Workspace
  function resetWorkspace() {
    rawPdfBytes = null;
    pdfJsDoc = null;
    totalOriginalPages = 0;
    docFileName = "document";

    if (compiledPdfBlobUrl) {
      URL.revokeObjectURL(compiledPdfBlobUrl);
      compiledPdfBlobUrl = null;
    }

    if (fileInput) fileInput.value = '';
    if (outputFilenameInput) outputFilenameInput.value = '';

    // Clear Canvas
    if (previewCanvas) {
      const ctx = previewCanvas.getContext('2d');
      ctx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
    }

    if (workspacePanel) workspacePanel.classList.add('hidden');
    if (successDownloadCard) successDownloadCard.classList.add('hidden');
    if (numberingProgress) numberingProgress.classList.add('hidden');
    if (dropzone) dropzone.classList.remove('hidden');
    if (btnHeaderReset) btnHeaderReset.disabled = true;
    if (btnApplyNumbers) btnApplyNumbers.disabled = false;
  }

  // Cookie Consent Handler
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

  // Initial Lucide Icons Activation
  if (window.lucide) {
    lucide.createIcons();
  }

})();
