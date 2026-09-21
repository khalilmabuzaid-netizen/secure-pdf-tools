/**
 * Organize PDF - Interactive Client-Side Page Reordering & Deletion Engine
 * Powered by Mozilla PDF.js, PDF-Lib & SortableJS
 * 100% In-Browser Privacy • Lossless Vector Preservation • Zero Server Uploads
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
      nav_reset: "Reset",
      breadcrumb_home: "Home",
      breadcrumb_tools: "Tools",
      breadcrumb_current: "Organize PDF",
      hero_badge: "100% Private Drag-and-Drop Page Organization • Zero Uploads",
      hero_title: 'Organize & <span class="gradient-text">Rearrange PDF</span> Pages',
      hero_subtitle: "Easily reorder, sort, and delete pages from PDF documents directly in your browser. 100% private, client-side, drag-and-drop organization.",
      dropzone_title: "Drop your PDF file here to organize",
      dropzone_subtitle: "Select or drag & drop any PDF document to sort, reorder, and remove pages interactively.",
      btn_browse_file: "Browse PDF File",
      btn_load_sample: "Try Sample PDF",
      pill_drag_drop: "Drag & Drop Reordering",
      pill_page_delete: "Delete & Restore Pages",
      pill_client_privacy: "100% In-Browser Privacy",
      btn_change_file: "Change File",
      btn_reset_order: "Reset Order",
      btn_reverse_order: "Reverse",
      btn_restore_deleted: "Restore Deleted",
      label_output_filename: "Output Name:",
      placeholder_output_filename: "organized_document",
      grid_title: "Document Pages",
      grid_hint: "Drag cards to reorder • Click trash icon to remove",
      btn_save_pdf: "Save & Download PDF",
      progress_rendering: "Rendering page thumbnails...",
      progress_saving: "Assembling organized vector PDF...",
      progress_complete: "PDF compiled successfully!",
      success_title: "PDF Organized Successfully!",
      success_desc: "Your pages have been reordered and assembled into a clean, lossless PDF document. Download your file below.",
      btn_download_pdf: "Download Organized PDF",
      btn_organize_another: "Organize Another PDF",
      ad_space_label: "Advertisement Space (728x90)",
      guide_badge: "Instant Visual Organization",
      guide_title: "How to Organize PDF Pages Online",
      guide_subtitle: "Reorder, delete, and rearrange PDF document pages in three easy steps directly in your browser.",
      step1_title: "Upload PDF Document",
      step1_desc: "Drag and drop your PDF file into the upload zone or choose it from your local device. All pages are rendered locally in browser memory.",
      step2_title: "Drag to Reorder & Delete",
      step2_desc: "Drag and drop page thumbnail cards into your desired order. Click the red trash icon on any card to delete unwanted pages instantly.",
      step3_title: "Download Organized PDF",
      step3_desc: "Click 'Save & Download PDF' to generate a pristine, lossless PDF assembled in your exact sequence with '-organized.pdf' appended.",
      faq_badge: "Got Questions?",
      faq_title: "Frequently Asked Questions",
      faq_subtitle: "Everything you need to know about our free client-side PDF page organization tool.",
      faq_q1: "Are my PDF documents uploaded to any server?",
      faq_a1: "Never. All page thumbnail rendering and PDF re-assembly execute 100% locally in your browser memory using PDF.js and PDF-Lib. Your confidential files never leave your computer or phone.",
      faq_q2: "Does organizing pages degrade quality or blur text?",
      faq_a2: "No. The reordering engine copies native vector PDF page structures directly without rasterizing or re-compressing contents. All original fonts, vector graphics, forms, and image resolution remain 100% intact.",
      faq_q3: "Can I restore deleted pages before downloading?",
      faq_a3: "Yes! Whenever you delete a page, a 'Restore Deleted' button appears in the toolbar. You can also click 'Reset Order' to revert the entire document to its original state.",
      faq_q4: "Can I reverse the entire page order with one click?",
      faq_a4: "Yes! Simply click the 'Reverse' button in the toolbar to flip the entire sequence from back to front instantly.",
      faq_q5: "Is there any limit on file size or number of pages?",
      faq_a5: "No. The tool is 100% free with unlimited document processing and no watermarks added to your files.",
      faq_q6: "Can I organize PDFs on mobile phones and tablets?",
      faq_a6: "Yes! Touch-friendly drag-and-drop and responsive controls work seamlessly on iPhones, iPads, Android smartphones, tablets, Windows, Mac, and Linux.",
      footer_tagline: "100% Client-side, private, and secure document processing directly in your browser.",
      footer_privacy: "Privacy Policy",
      footer_terms: "Terms of Service",
      footer_contact: "Contact Us",
      footer_copyright: "© 2026 PDFNetizen. All rights reserved.",
      cookie_consent_text: "We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.",
      cookie_learn_more: "Privacy Policy",
      cookie_accept_btn: "Accept",
      showing_pages_count: "Showing {visible} of {total} pages",
      deleted_pages_count: "{count} deleted",
      toast_loaded: "PDF loaded successfully: {total} pages.",
      toast_sample: "Sample 4-page PDF document loaded.",
      toast_page_deleted: "Page removed.",
      toast_restored: "All deleted pages restored.",
      toast_order_reset: "Page order and deletions reset to original.",
      toast_order_reversed: "Page order reversed.",
      toast_saved: "Organized PDF generated successfully!",
      toast_error_load: "Failed to load PDF file. Please ensure it is a valid, unencrypted PDF.",
      toast_error_no_pages: "Please keep at least one page in your document before saving.",
      toast_error_save: "An error occurred while compiling the organized PDF."
    },
    ar: {
      badge_client_side: "محلي ١٠٠٪ في المتصفح",
      nav_home: "الرئيسية",
      nav_annotator: "المحرر",
      nav_compress: "ضغط PDF",
      nav_split: "تقسيم PDF",
      nav_reset: "إعادة تعيين",
      breadcrumb_home: "الرئيسية",
      breadcrumb_tools: "الأدوات",
      breadcrumb_current: "تنظيم PDF",
      hero_badge: "تنظيم وترتيب صفحات PDF محلياً بالسحب والإفلات • أمان وخصوصية مطلقة",
      hero_title: 'تنظيم وإعادة <span class="gradient-text">ترتيب صفحات PDF</span>',
      hero_subtitle: "أعد ترتيب وفرز وحذف صفحات مستندات PDF بكل سهولة مباشرة داخل متصفحك. معالجة محلية ١٠٠٪، سريعة وخاصة تماماً بالسحب والإفلات.",
      dropzone_title: "أفلت ملف PDF هنا لتنظيمه",
      dropzone_subtitle: "اختر أو اسحب وأفلت أي مستند PDF لترتيب صفحاته وفرزها وحذف الصفحات غير المرغوبة تفاعلياً.",
      btn_browse_file: "تصفح ملف PDF",
      btn_load_sample: "تجربة مستند نموذجي",
      pill_drag_drop: "إعادة الترتيب بالسحب والإفلات",
      pill_page_delete: "حذف واستعادة الصفحات",
      pill_client_privacy: "خصوصية محلية ١٠٠٪ في المتصفح",
      btn_change_file: "تغيير المستند",
      btn_reset_order: "إعادة الترتيب الأصلي",
      btn_reverse_order: "عكس الترتيب",
      btn_restore_deleted: "استعادة المحذوف",
      label_output_filename: "اسم الملف المخرج:",
      placeholder_output_filename: "organized_document",
      grid_title: "صفحات المستند",
      grid_hint: "اسحب البطاقات لإعادة الترتيب • انقر على أيقونة السلة للحذف",
      btn_save_pdf: "حفظ وتنزيل PDF",
      progress_rendering: "جارٍ إنشاء الصور المصغرة للصفحات...",
      progress_saving: "جارٍ تجميع وتوليد مستند الـ PDF المنظم...",
      progress_complete: "تم تجميع المستند بنجاح!",
      success_title: "تم تنظيم مستند PDF بنجاح!",
      success_desc: "تمت إعادة ترتيب صفحاتك وتجميعها في مستند PDF متجهي نظيف وبدون أي فقدان للجودة. يمكنك تنزيل ملفك أدناه.",
      btn_download_pdf: "تنزيل مستند PDF المنظم",
      btn_organize_another: "تنظيم مستند PDF آخر",
      ad_space_label: "مساحة إعلانية (728×90)",
      guide_badge: "تنظيم بصري فوري وسهل",
      guide_title: "كيفية تنظيم وترتيب صفحات PDF أونلاين",
      guide_subtitle: "أعد ترتيب وحذف وفرز صفحات مستندات PDF في ثلاث خطوات سهلة مباشرة داخل متصفحك.",
      step1_title: "رفع مستند PDF",
      step1_desc: "اسحب وأفلت ملف PDF داخل منطقة الرفع أو اختره من جهازك. يتم إنشاء المعاينة محلياً داخل ذاكرة المتصفح.",
      step2_title: "السحب للترتيب والحذف",
      step2_desc: "اسحب وأفلت بطاقات الصفحات لترتيبها حسب رغبتك. انقر على أيقونة سلة المهملات الحمراء لحذف أي صفحة غير مرغوبة فورياً.",
      step3_title: "تنزيل مستند PDF المنظم",
      step3_desc: "انقر على 'حفظ وتنزيل PDF' لتوليد مستند PDF جديد ومتقن بالترتيب المحدد مع إضافة '-organized.pdf'.",
      faq_badge: "لديك استفسار؟",
      faq_title: "الأسئلة الشائعة",
      faq_subtitle: "كل ما تحتاج معرفته حول أداة تنظيم وترتيب صفحات PDF المجانية والمحلية.",
      faq_q1: "هل يتم رفع مستندات الـ PDF الخاصة بي إلى أي خادم خارجي؟",
      faq_a1: "أبداً. تتم كافة عمليات إنشاء المعاينات وتجميع ملف الـ PDF محلياً بنسبة ١٠٠٪ في ذاكرة متصفحك باستخدام PDF.js و PDF-Lib. لا تغادر ملفاتك الحساسة جهازك إطلاقاً.",
      faq_q2: "هل يؤثر تنظيم الصفحات على جودة الخطوط أو وضوح النصوص؟",
      faq_a2: "كلا. يقوم محرك إعادة الترتيب باستنساخ هياكل صفحات PDF المتجهية الأصلية مباشرة دون إعادة ضغط الصور أو تحويل النصوص إلى صور، مما يحافظ على وضوح الخطوط ودقة الرسومات بنسبة ١٠٠٪.",
      faq_q3: "هل يمكنني استعادة صفحة تم حذفها بالخطأ قبل التنزيل؟",
      faq_a3: "نعم! بمجرد حذف أي صفحة، يظهر زر 'استعادة المحذوف' في شريط الأدوات. يمكنك أيضاً النقر على 'إعادة الترتيب الأصلي' لاسترجاع المستند بالكامل لوضعه الأولي.",
      faq_q4: "هل يمكنني عكس ترتيب الصفحات بالكامل بنقرة واحدة؟",
      faq_a4: "نعم! ما عليك سوى النقر على زر 'عكس الترتيب' في شريط الأدوات لقلب تسلسل الصفحات من النهاية إلى البداية فورياً.",
      faq_q5: "هل توجد أي قيود على حجم الملف أو عدد الصفحات؟",
      faq_a5: "لا. الأداة مجانية ١٠٠٪ بلا حدود لعدد المستندات أو الصفحات، وبدون إضافة أي علامات مائية على ملفاتك.",
      faq_q6: "هل يمكنني تنظيم مستندات PDF عبر الهواتف الذكية والأجهزة اللوحية؟",
      faq_a6: "نعم! تم تصميم واجهة السحب والإفلات لتتوافق بسلاسة تامة مع شاشات اللمس على هواتف iPhone و iPad وأجهزة Android والحواسيب المحمولة.",
      footer_tagline: "معالجة مستندات محلية ١٠٠٪، خاصة وآمنة تماماً مباشرة في متصفحك.",
      footer_privacy: "سياسة الخصوصية",
      footer_terms: "شروط الاستخدام",
      footer_contact: "اتصل بنا",
      footer_copyright: "© ٢٠٢٦ PDFNetizen. جميع الحقوق محفوظة.",
      cookie_consent_text: "نحن نستخدم ملفات تعريف الارتباط لتحسين تجربتك. باستمرارك في زيارة هذا الموقع، فإنك توافق على استخدامنا لملفات تعريف الارتباط.",
      cookie_learn_more: "سياسة الخصوصية",
      cookie_accept_btn: "موافق",
      showing_pages_count: "عرض {visible} من أصل {total} صفحات",
      deleted_pages_count: "{count} محذوفة",
      toast_loaded: "تم تحميل مستند PDF بنجاح: {total} صفحات.",
      toast_sample: "تم تحميل مستند PDF النموذجي (٤ صفحات).",
      toast_page_deleted: "تم حذف الصفحة.",
      toast_restored: "تمت استعادة كافة الصفحات المحذوفة.",
      toast_order_reset: "تمت إعادة ترتيب الصفحات واستعادة المحذوفات للوضع الأصلي.",
      toast_order_reversed: "تم عكس ترتيب الصفحات.",
      toast_saved: "تم إنشاء وتنزيل مستند PDF المنظم بنجاح!",
      toast_error_load: "فشل تحميل مستند PDF. يرجى التأكد من سلامة الملف وصيغته.",
      toast_error_no_pages: "يرجى الإبقاء على صفحة واحدة على الأقل قبل حفظ المستند.",
      toast_error_save: "حدث خطأ أثناء تجميع ملف الـ PDF المنظم."
    }
  };

  let currentLang = 'en';

  // Application State
  let rawPdfBytes = null;
  let pdfJsDoc = null;
  let docFileName = "document";
  let totalOriginalPages = 0;
  let sortableInstance = null;
  let compiledPdfBlobUrl = null;
  let isProcessing = false;

  // Track page items: array of objects { origIndex, pageNum, cardEl, deleted }
  let pageItems = [];

  // DOM References
  const fileInput = document.getElementById('pdf-file-input');
  const dropzone = document.getElementById('dropzone');
  const btnBrowseFile = document.getElementById('btn-browse-file');
  const btnLoadSample = document.getElementById('btn-load-sample');

  const workspacePanel = document.getElementById('workspace-panel');
  const fileNameDisplay = document.getElementById('file-name-display');
  const fileSizeDisplay = document.getElementById('file-size-display');
  const pagesCountBadge = document.getElementById('pages-count-badge');
  const pagesCountText = document.getElementById('pages-count-text');
  const deletedCountBadge = document.getElementById('deleted-count-badge');
  const deletedCountText = document.getElementById('deleted-count-text');
  const btnChangeFile = document.getElementById('btn-change-file');
  const btnHeaderReset = document.getElementById('btn-header-reset');

  const btnResetOrder = document.getElementById('btn-reset-order');
  const btnReverseOrder = document.getElementById('btn-reverse-order');
  const btnRestoreDeleted = document.getElementById('btn-restore-deleted');
  const outputFilenameInput = document.getElementById('output-filename-input');
  const pagesGrid = document.getElementById('pages-grid');

  const btnSavePdf = document.getElementById('btn-save-pdf');
  const btnSaveSpinner = document.getElementById('btn-save-spinner');
  const btnSaveIcon = document.getElementById('btn-save-icon');
  const btnSaveText = document.getElementById('btn-save-text');

  const organizationProgress = document.getElementById('organization-progress');
  const progressStatusText = document.getElementById('progress-status-text');
  const progressPercent = document.getElementById('progress-percent');
  const progressBarFill = document.getElementById('progress-bar-fill');

  const successDownloadCard = document.getElementById('success-download-card');
  const pdfFilenameDisplay = document.getElementById('pdf-filename-display');
  const pdfFilesizeDisplay = document.getElementById('pdf-filesize-display');
  const btnDownloadPdf = document.getElementById('btn-download-pdf');
  const btnOrganizeAnother = document.getElementById('btn-organize-another');

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

    updateCountersAndBadges();

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

  if (btnOrganizeAnother) {
    btnOrganizeAnother.addEventListener('click', resetWorkspace);
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
      outputFilenameInput.value = `${docFileName}_organized`;
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

  // Try Sample PDF Button
  if (btnLoadSample) {
    btnLoadSample.addEventListener('click', async e => {
      e.stopPropagation();
      await loadSampleDocument();
    });
  }

  // Generate and Load a 4-Page Demo PDF locally using PDFLib
  async function loadSampleDocument() {
    if (!window.PDFLib) {
      showToast("Loading PDF engine, please try again in a moment...", "alert-circle");
      return;
    }

    try {
      docFileName = "sample_report";
      if (outputFilenameInput) {
        outputFilenameInput.value = "sample_report_organized";
      }

      // Create high-res 4-page sample PDF via PDF-Lib
      const samplePdfDoc = await window.PDFLib.PDFDocument.create();
      const rgb = window.PDFLib.rgb;
      const font = await samplePdfDoc.embedFont(window.PDFLib.StandardFonts.HelveticaBold);
      const subFont = await samplePdfDoc.embedFont(window.PDFLib.StandardFonts.Helvetica);

      const pageConfigs = [
        {
          title: "Page 1: Project Overview & Executive Summary",
          badge: "Cover & Overview",
          color: rgb(0.55, 0.36, 0.96), // Purple
          desc: "Annual Strategic Performance Report • Confidential Corporate Dossier",
          detail: "This page contains the executive overview, mission targets, and introductory briefing."
        },
        {
          title: "Page 2: Financial Analytics & Quarterly Metrics",
          badge: "Financial Data",
          color: rgb(0.23, 0.51, 0.96), // Indigo
          desc: "Q1-Q4 Revenue Distribution, EBITDA Growth & Performance Projections",
          detail: "Contains quantitative balance sheets, fiscal audits, and department cost analyses."
        },
        {
          title: "Page 3: Product Roadmap & Strategic Milestones",
          badge: "Strategic Roadmap",
          color: rgb(0.96, 0.62, 0.04), // Amber
          desc: "Engineering Deliverables, Feature Timelines & Global Expansion Targets",
          detail: "Outlines product architecture roadmap, infrastructure upgrades, and rollout phases."
        },
        {
          title: "Page 4: Governance Approvals & Final Sign-Off",
          badge: "Sign-Off & Legal",
          color: rgb(0.06, 0.72, 0.49), // Emerald
          desc: "Authorized Stakeholder Signatures, Compliance Audit & Legal Endorsements",
          detail: "Legal annexure verifying document accuracy, board compliance, and final authorizations."
        }
      ];

      for (let i = 0; i < pageConfigs.length; i++) {
        const config = pageConfigs[i];
        const page = samplePdfDoc.addPage([612, 792]); // Standard US Letter

        // Dark Background Card
        page.drawRectangle({
          x: 20,
          y: 20,
          width: 572,
          height: 752,
          color: rgb(0.05, 0.04, 0.09)
        });

        // Top Accent Banner
        page.drawRectangle({
          x: 20,
          y: 700,
          width: 572,
          height: 72,
          color: config.color
        });

        // Banner Text
        page.drawText(`PDFNetizen Sample Document`, {
          x: 40,
          y: 742,
          size: 14,
          font: subFont,
          color: rgb(1, 1, 1)
        });

        page.drawText(config.badge.toUpperCase(), {
          x: 40,
          y: 718,
          size: 18,
          font: font,
          color: rgb(1, 1, 1)
        });

        // Page Number Watermark
        page.drawText(`0${i + 1}`, {
          x: 460,
          y: 712,
          size: 52,
          font: font,
          color: rgb(1, 1, 1),
          opacity: 0.25
        });

        // Main Title
        page.drawText(config.title, {
          x: 40,
          y: 630,
          size: 19,
          font: font,
          color: rgb(0.97, 0.98, 1)
        });

        // Subtitle
        page.drawText(config.desc, {
          x: 40,
          y: 600,
          size: 12,
          font: subFont,
          color: rgb(0.65, 0.72, 0.85)
        });

        // Content Area Card
        page.drawRectangle({
          x: 40,
          y: 340,
          width: 532,
          height: 220,
          color: rgb(0.09, 0.08, 0.16),
          borderColor: rgb(0.2, 0.18, 0.32),
          borderWidth: 1
        });

        page.drawText("Document Content & Specifications:", {
          x: 60,
          y: 520,
          size: 14,
          font: font,
          color: config.color
        });

        page.drawText(config.detail, {
          x: 60,
          y: 480,
          size: 11,
          font: subFont,
          color: rgb(0.85, 0.9, 0.98),
          maxWidth: 490,
          lineHeight: 18
        });

        page.drawText("• Drag this card to reorder position in the final PDF.", {
          x: 60,
          y: 430,
          size: 11,
          font: subFont,
          color: rgb(0.7, 0.75, 0.85)
        });

        page.drawText("• Click the trash icon to remove this page before downloading.", {
          x: 60,
          y: 405,
          size: 11,
          font: subFont,
          color: rgb(0.7, 0.75, 0.85)
        });

        page.drawText("• 100% Vector Quality preserved with zero rasterization loss.", {
          x: 60,
          y: 380,
          size: 11,
          font: subFont,
          color: rgb(0.7, 0.75, 0.85)
        });

        // Footer Bar
        page.drawRectangle({
          x: 40,
          y: 45,
          width: 532,
          height: 35,
          color: rgb(0.08, 0.07, 0.14)
        });

        page.drawText(`PDFNetizen Client-Side Engine • Page ${i + 1} of ${pageConfigs.length}`, {
          x: 55,
          y: 58,
          size: 10,
          font: subFont,
          color: rgb(0.5, 0.55, 0.65)
        });
      }

      const sampleBytes = await samplePdfDoc.save();
      rawPdfBytes = sampleBytes.buffer;
      await processLoadedPdf(sampleBytes.buffer, "sample_report.pdf", formatBytes(sampleBytes.byteLength));

      const dict = translations[currentLang] || translations.en;
      showToast(dict.toast_sample, 'sparkles');

    } catch (err) {
      console.error("Error generating sample document:", err);
      const dict = translations[currentLang] || translations.en;
      showToast(dict.toast_error_load, 'alert-circle');
    }
  }

  // Process Loaded PDF & Render Thumbnails into Interactive Grid
  async function processLoadedPdf(arrayBuffer, name, sizeStr) {
    if (!window.pdfjsLib) {
      showToast("PDF.js library is loading, please try again in a moment.", "alert-circle");
      return;
    }

    try {
      isProcessing = true;
      if (btnSavePdf) btnSavePdf.disabled = true;

      // Show workspace, hide upload zone & success card
      dropzone.classList.add('hidden');
      successDownloadCard.classList.add('hidden');
      workspacePanel.classList.remove('hidden');
      if (btnHeaderReset) btnHeaderReset.disabled = false;

      // Update meta header
      fileNameDisplay.textContent = name;
      fileSizeDisplay.textContent = sizeStr;

      // Show progress
      organizationProgress.classList.remove('hidden');
      progressBarFill.style.width = '10%';
      progressPercent.textContent = '10%';
      const dict = translations[currentLang] || translations.en;
      progressStatusText.textContent = dict.progress_rendering;

      // Load document with PDF.js
      const loadingTask = window.pdfjsLib.getDocument({ data: arrayBuffer });
      pdfJsDoc = await loadingTask.promise;
      totalOriginalPages = pdfJsDoc.numPages;

      pagesGrid.innerHTML = '';
      pageItems = [];

      // Create skeleton cards for all pages
      for (let p = 1; p <= totalOriginalPages; p++) {
        const origIndex = p - 1;

        const card = document.createElement('div');
        card.className = 'page-card';
        card.id = `page-card-${origIndex}`;
        card.dataset.origIndex = origIndex;

        card.innerHTML = `
          <div class="page-card-header">
            <span class="page-seq-badge">${p}</span>
            <span class="page-orig-tag">Orig #${p}</span>
            <button type="button" class="btn-delete-page" title="Delete page" aria-label="Delete page ${p}" data-orig-index="${origIndex}">
              <i data-lucide="trash-2"></i>
            </button>
          </div>
          <div class="page-canvas-box" id="canvas-box-${origIndex}">
            <div class="spinner" style="border-color: rgba(139, 92, 246, 0.3); border-top-color: #8b5cf6;"></div>
          </div>
          <div style="display: flex; align-items: center; justify-content: center; gap: 4px; padding-top: 4px;" class="drag-grip-icon">
            <i data-lucide="grip-horizontal" style="width: 16px; height: 16px;"></i>
          </div>
        `;

        pagesGrid.appendChild(card);

        pageItems.push({
          origIndex: origIndex,
          pageNum: p,
          cardEl: card,
          deleted: false
        });
      }

      if (window.lucide) lucide.createIcons();

      // Initialize SortableJS
      if (sortableInstance) {
        sortableInstance.destroy();
      }

      if (window.Sortable) {
        sortableInstance = new window.Sortable(pagesGrid, {
          animation: 180,
          handle: '.page-card',
          ghostClass: 'sortable-ghost',
          chosenClass: 'sortable-chosen',
          dragClass: 'sortable-drag',
          onEnd: () => {
            updateSequenceAndCounters();
          }
        });
      }

      // Attach Delete Handlers
      attachDeleteListeners();

      // Render actual canvas thumbnails progressively
      for (let p = 1; p <= totalOriginalPages; p++) {
        const origIndex = p - 1;
        try {
          const page = await pdfJsDoc.getPage(p);
          const viewport = page.getViewport({ scale: 1.0 });

          // Scale for crisp ~320px thumbnail
          const thumbScale = Math.min(1.5, 320 / viewport.width);
          const thumbViewport = page.getViewport({ scale: thumbScale });

          const canvas = document.createElement('canvas');
          canvas.className = 'page-canvas';
          canvas.width = Math.floor(thumbViewport.width);
          canvas.height = Math.floor(thumbViewport.height);

          const ctx = canvas.getContext('2d', { alpha: false });
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          await page.render({ canvasContext: ctx, viewport: thumbViewport }).promise;

          const canvasBox = document.getElementById(`canvas-box-${origIndex}`);
          if (canvasBox) {
            canvasBox.innerHTML = '';
            canvasBox.appendChild(canvas);
          }

          // Update Progress
          const pct = Math.floor(10 + ((p / totalOriginalPages) * 90));
          progressBarFill.style.width = `${pct}%`;
          progressPercent.textContent = `${pct}%`;

        } catch (renderErr) {
          console.error(`Error rendering page ${p}:`, renderErr);
        }
      }

      // Finish rendering setup
      progressBarFill.style.width = '100%';
      progressPercent.textContent = '100%';
      setTimeout(() => {
        organizationProgress.classList.add('hidden');
      }, 500);

      updateSequenceAndCounters();

      if (btnSavePdf) btnSavePdf.disabled = false;
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

  // Attach Delete Button Listeners
  function attachDeleteListeners() {
    pagesGrid.querySelectorAll('.btn-delete-page').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const origIndex = parseInt(btn.getAttribute('data-orig-index'), 10);
        deletePage(origIndex);
      });
    });
  }

  // Delete Individual Page
  function deletePage(origIndex) {
    const item = pageItems.find(it => it.origIndex === origIndex);
    if (!item) return;

    item.deleted = true;
    item.cardEl.classList.add('hidden');

    updateSequenceAndCounters();

    const dict = translations[currentLang] || translations.en;
    showToast(dict.toast_page_deleted, 'trash-2');
  }

  // Update Sequence Badges, Counters, and Toolbar Action states
  function updateSequenceAndCounters() {
    const activeCards = Array.from(pagesGrid.querySelectorAll('.page-card:not(.hidden)'));
    const visibleCount = activeCards.length;
    const deletedCount = totalOriginalPages - visibleCount;

    // Update 1-based sequence badges on cards
    activeCards.forEach((card, seqIndex) => {
      const seqBadge = card.querySelector('.page-seq-badge');
      if (seqBadge) {
        seqBadge.textContent = `${seqIndex + 1}`;
      }
    });

    // Update Counter Badges
    updateCountersAndBadges(visibleCount, deletedCount);

    // Toggle Restore Deleted button
    if (deletedCount > 0) {
      btnRestoreDeleted.classList.remove('hidden');
    } else {
      btnRestoreDeleted.classList.add('hidden');
    }

    // Enable/Disable Save PDF button based on visible pages
    if (visibleCount === 0) {
      btnSavePdf.disabled = true;
    } else {
      btnSavePdf.disabled = false;
    }
  }

  // Localized Text Updates for Counters
  function updateCountersAndBadges(visible, deleted) {
    const activeCards = Array.from(pagesGrid.querySelectorAll('.page-card:not(.hidden)'));
    const visibleCount = (typeof visible === 'number') ? visible : activeCards.length;
    const deletedCount = (typeof deleted === 'number') ? deleted : (totalOriginalPages - visibleCount);

    const dict = translations[currentLang] || translations.en;

    if (pagesCountText) {
      pagesCountText.textContent = dict.showing_pages_count
        .replace('{visible}', visibleCount)
        .replace('{total}', totalOriginalPages);
    }

    if (deletedCountText) {
      deletedCountText.textContent = dict.deleted_pages_count.replace('{count}', deletedCount);
    }

    if (deletedCountBadge) {
      if (deletedCount > 0) {
        deletedCountBadge.classList.remove('hidden');
      } else {
        deletedCountBadge.classList.add('hidden');
      }
    }
  }

  // Restore All Deleted Pages
  if (btnRestoreDeleted) {
    btnRestoreDeleted.addEventListener('click', () => {
      pageItems.forEach(item => {
        item.deleted = false;
        item.cardEl.classList.remove('hidden');
      });

      updateSequenceAndCounters();

      const dict = translations[currentLang] || translations.en;
      showToast(dict.toast_restored, 'undo-2');
    });
  }

  // Reset Order & Restore Deleted to Initial State
  if (btnResetOrder) {
    btnResetOrder.addEventListener('click', () => {
      // Re-append cards in original index order (0..totalOriginalPages-1)
      pageItems.sort((a, b) => a.origIndex - b.origIndex);

      pageItems.forEach(item => {
        item.deleted = false;
        item.cardEl.classList.remove('hidden');
        pagesGrid.appendChild(item.cardEl);
      });

      updateSequenceAndCounters();

      const dict = translations[currentLang] || translations.en;
      showToast(dict.toast_order_reset, 'rotate-ccw');
    });
  }

  // Reverse Current Active Sequence
  if (btnReverseOrder) {
    btnReverseOrder.addEventListener('click', () => {
      const activeCards = Array.from(pagesGrid.querySelectorAll('.page-card:not(.hidden)'));
      if (activeCards.length <= 1) return;

      activeCards.reverse().forEach(card => {
        pagesGrid.appendChild(card);
      });

      updateSequenceAndCounters();

      const dict = translations[currentLang] || translations.en;
      showToast(dict.toast_order_reversed, 'arrow-down-up');
    });
  }

  // Save & Download Lossless Reordered PDF via PDF-Lib
  if (btnSavePdf) {
    btnSavePdf.addEventListener('click', async () => {
      if (!rawPdfBytes || isProcessing) return;

      const activeCards = Array.from(pagesGrid.querySelectorAll('.page-card:not(.hidden)'));
      const activeIndices = activeCards.map(c => parseInt(c.dataset.origIndex, 10));

      const dict = translations[currentLang] || translations.en;

      if (activeIndices.length === 0) {
        showToast(dict.toast_error_no_pages, 'alert-triangle');
        return;
      }

      if (!window.PDFLib) {
        showToast("PDF-Lib engine loading, please try again in a moment.", 'alert-circle');
        return;
      }

      try {
        isProcessing = true;
        btnSavePdf.disabled = true;
        btnSaveSpinner.classList.remove('hidden');
        btnSaveIcon.classList.add('hidden');

        organizationProgress.classList.remove('hidden');
        progressBarFill.style.width = '20%';
        progressPercent.textContent = '20%';
        progressStatusText.textContent = dict.progress_saving;

        // Load original source PDF into PDFLib
        const srcDoc = await window.PDFLib.PDFDocument.load(rawPdfBytes, { ignoreEncryption: true });

        progressBarFill.style.width = '50%';
        progressPercent.textContent = '50%';

        // Create clean destination PDF
        const newDoc = await window.PDFLib.PDFDocument.create();

        // Copy vector pages in the user-arranged sequence
        const copiedPages = await newDoc.copyPages(srcDoc, activeIndices);
        copiedPages.forEach(p => newDoc.addPage(p));

        progressBarFill.style.width = '85%';
        progressPercent.textContent = '85%';

        // Compile and serialize to bytes
        const finalPdfBytes = await newDoc.save();

        progressBarFill.style.width = '100%';
        progressPercent.textContent = '100%';
        progressStatusText.textContent = dict.progress_complete;

        // Prepare downloadable Blob
        const blob = new Blob([finalPdfBytes], { type: 'application/pdf' });
        if (compiledPdfBlobUrl) {
          URL.revokeObjectURL(compiledPdfBlobUrl);
        }
        compiledPdfBlobUrl = URL.createObjectURL(blob);

        let outName = (outputFilenameInput && outputFilenameInput.value.trim()) || `${docFileName}_organized`;
        if (!outName.toLowerCase().endsWith('.pdf')) {
          outName += '.pdf';
        }

        // Update Success Download Card
        pdfFilenameDisplay.textContent = outName;
        pdfFilesizeDisplay.textContent = formatBytes(finalPdfBytes.byteLength);

        // Bind download trigger
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

        // Reveal success card
        successDownloadCard.classList.remove('hidden');
        successDownloadCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        showToast(dict.toast_saved, 'check-circle-2');

      } catch (err) {
        console.error("Error assembling organized PDF:", err);
        showToast(dict.toast_error_save, 'alert-circle');
      } finally {
        isProcessing = false;
        btnSavePdf.disabled = false;
        btnSaveSpinner.classList.add('hidden');
        btnSaveIcon.classList.remove('hidden');
        setTimeout(() => {
          organizationProgress.classList.add('hidden');
        }, 2000);
      }
    });
  }

  // Reset Entire Workspace
  function resetWorkspace() {
    rawPdfBytes = null;
    pdfJsDoc = null;
    totalOriginalPages = 0;
    pageItems = [];
    docFileName = "document";

    if (sortableInstance) {
      sortableInstance.destroy();
      sortableInstance = null;
    }

    if (compiledPdfBlobUrl) {
      URL.revokeObjectURL(compiledPdfBlobUrl);
      compiledPdfBlobUrl = null;
    }

    if (fileInput) fileInput.value = '';
    if (pagesGrid) pagesGrid.innerHTML = '';
    if (outputFilenameInput) outputFilenameInput.value = '';

    if (workspacePanel) workspacePanel.classList.add('hidden');
    if (successDownloadCard) successDownloadCard.classList.add('hidden');
    if (organizationProgress) organizationProgress.classList.add('hidden');
    if (dropzone) dropzone.classList.remove('hidden');
    if (btnHeaderReset) btnHeaderReset.disabled = true;
    if (btnSavePdf) btnSavePdf.disabled = false;
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
