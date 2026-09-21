/**
 * Rotate PDF - Lossless Client-Side Page Rotation Engine
 * Powered by Mozilla PDF.js & PDF-Lib
 * 100% In-Browser Privacy • Zero Quality Loss • Live CSS Transform Previews
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
      nav_pdf2jpg: "PDF to JPG",
      breadcrumb_home: "Home",
      breadcrumb_tools: "Tools",
      breadcrumb_current: "Rotate PDF",
      hero_badge: "100% Client-Side • Lossless Vector Rotation • Zero Server Uploads",
      hero_title: 'Rotate <span class="gradient-text">PDF Pages</span> Online',
      hero_subtitle: "Turn individual upside-down pages or rotate your entire document permanently. Fast, lossless in-browser processing with zero quality degradation.",
      dropzone_title: "Drop your PDF file here",
      dropzone_subtitle: "Select or drag & drop any PDF document to rotate and fix page orientations instantly with 100% privacy.",
      btn_browse: "Browse PDF File",
      btn_sample: "Try Sample PDF",
      feature_privacy: "100% Browser Privacy",
      feature_lossless: "Lossless Vector Rotation",
      feature_individual: "Rotate Individual or All Pages",
      feature_instant: "Instant Live Preview",
      btn_change_pdf: "Change PDF",
      btn_clear: "Clear",
      toolbar_title: "Rotation Controls",
      btn_rotate_all_left: "Rotate All Left (90°)",
      btn_rotate_all_right: "Rotate All Right (90°)",
      btn_reset_rotations: "Reset All",
      btn_save_pdf: "Save & Download PDF",
      progress_saving: "Applying vector page rotations...",
      progress_complete: "PDF rotated and saved successfully!",
      grid_title: "Document Pages",
      btn_rotate_left: "Rotate Left",
      btn_rotate_right: "Rotate Right",
      ad_space_label: "Advertisement Space (728x90)",
      seo_badge: "100% Client-Side Private PDF Rotation",
      seo_title: "How to Rotate PDF Pages Online for Free",
      seo_subtitle: "Easily fix sideways or upside-down scanned pages, turn entire documents, and download permanently rotated PDF files with zero privacy risks.",
      guide_h2: "3 Simple Steps to Rotate PDF Pages",
      guide_p: "Whether you are correcting upside-down scanned invoices, rotating landscape spreadsheets, or adjusting legal agreements, PDFNetizen provides the quickest and safest way to rotate PDF files permanently:",
      step1_title: "1. Upload Your PDF",
      step1_desc: "Drag and drop your PDF document into the upload dropzone or browse from your desktop, iPhone, iPad, or Android device.",
      step2_title: "2. Rotate Pages as Needed",
      step2_desc: "Click the rotate buttons on individual page thumbnails to adjust orientation, or use 'Rotate All' to turn the entire document at once.",
      step3_title: "3. Save & Download",
      step3_desc: "Click 'Save & Download PDF' to apply the permanent orientation changes and download your newly rotated document in seconds.",
      table_h2: "Supported PDF Rotation Angles & Orientation Use Cases",
      table_p: "Our native vector modification engine handles every rotation direction smoothly:",
      th_angle: "Rotation Angle",
      th_direction: "Direction",
      th_common_use: "Common Use Case",
      th_quality_impact: "Visual Quality Impact",
      td_cw: "Turn Right",
      td_cw_use: "Landscape spreadsheets, presentations, and wide scanned diagrams",
      td_flip: "Flip Upside Down",
      td_flip_use: "Inverted scanner feeds and misfed multi-page contracts",
      td_ccw: "Turn Left",
      td_ccw_use: "Sideways legal annexures, drawings, and architectural blueprints",
      features_h2: "Why Rotate PDF Documents with PDFNetizen?",
      fb_privacy_title: "100% Client-Side Privacy",
      fb_privacy_desc: "All rotation logic executes exclusively inside your local browser memory using pdf-lib. Your confidential documents, contracts, and financial statements never touch a remote server.",
      fb_lossless_title: "Lossless Vector Preservation",
      fb_lossless_desc: "Unlike converters that rasterize pages into compressed images, our engine modifies native PDF metadata. Text remains searchable and vector graphics retain crystal-clear sharpness.",
      fb_individual_title: "Individual & Global Control",
      fb_individual_desc: "Rotate individual pages that were scanned sideways, or rotate all pages together with a single click.",
      fb_free_title: "Free with Zero Limitations",
      fb_free_desc: "No subscriptions, no registration forms, no page limits, and zero watermarks stamped onto your documents.",
      fb_cross_title: "Universal Compatibility",
      fb_cross_desc: "Works seamlessly across Chrome, Safari, Edge, and Firefox on Windows, Mac, Linux, iPhone, iPad, and Android.",
      fb_speed_title: "Instantaneous On-Device Speed",
      fb_speed_desc: "Powered directly by your computer hardware with WebAssembly. Rotate hundreds of pages in a fraction of a second without waiting for cloud queues.",
      faq_h2: "Frequently Asked Questions",
      faq_q1: "How do I rotate PDF pages online for free?",
      faq_a1: "Drag and drop your PDF into the upload area, use the global toolbar to rotate all pages or click the rotate buttons on individual page thumbnails, and click 'Save & Download PDF' to permanently save your changes.",
      faq_q2: "Are my documents uploaded to a remote server?",
      faq_a2: "No. Rotate PDF runs 100% client-side inside your browser using WebAssembly and pdf-lib. Your confidential files never leave your computer or mobile device.",
      faq_q3: "Does rotating PDF pages reduce text or image quality?",
      faq_a3: "No. Our tool modifies only the native page rotation metadata in the PDF document without re-compressing or re-rasterizing images and text. All original vector fonts, forms, and image resolution remain 100% preserved.",
      faq_q4: "Can I rotate only specific upside-down pages?",
      faq_a4: "Yes! Each page thumbnail card has dedicated rotate left (90° CCW) and rotate right (90° CW) buttons, allowing you to fix individual pages without affecting the rest of the document.",
      faq_q5: "Is the rotation permanently saved in the downloaded file?",
      faq_a5: "Yes. When you download the PDF, the new orientation is permanently embedded and will open correctly in Adobe Acrobat, Google Chrome, Apple Preview, and all standard PDF readers.",
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
      toast_rotated_all_left: "All pages rotated 90° counter-clockwise.",
      toast_rotated_all_right: "All pages rotated 90° clockwise.",
      toast_reset_all: "All rotations reset to default.",
      toast_saved: "Rotated PDF downloaded successfully!",
      toast_error_load: "Failed to load PDF file. Please ensure it is a valid, uncorrupted PDF.",
      toast_error_save: "An error occurred while saving the rotated PDF."
    },
    ar: {
      badge_client_side: "محلي ١٠٠٪ في المتصفح",
      nav_home: "الرئيسية",
      nav_annotator: "المحرر",
      nav_compress: "ضغط PDF",
      nav_split: "تقسيم PDF",
      nav_merge: "دمج PDF",
      nav_pdf2jpg: "تحويل إلى JPG",
      breadcrumb_home: "الرئيسية",
      breadcrumb_tools: "الأدوات",
      breadcrumb_current: "تدوير PDF",
      hero_badge: "معالجة محلية ١٠٠٪ • تدوير متجهي بدون فقدان للجودة • أمان وخصوصية مطلقة",
      hero_title: 'تدوير صفحات <span class="gradient-text">مستندات PDF</span>',
      hero_subtitle: "عدّل اتجاه الصفحات المقلوبة أو دوّر المستند بالكامل بشكل دائم. معالجة سريعة وبدون أي فقدان لجودة النصوص والرسومات مباشرة داخل متصفحك.",
      dropzone_title: "أفلت ملف PDF هنا",
      dropzone_subtitle: "اختر أو اسحب وأفلت أي مستند PDF لتدوير وتعديل اتجاه صفحاته فورياً وبخصوصية تامة.",
      btn_browse: "تصفح ملف PDF",
      btn_sample: "تجربة مستند نموذجي",
      feature_privacy: "خصوصية تامة داخل المتصفح",
      feature_lossless: "تدوير متجهي بدون أي تشويش",
      feature_individual: "تدوير صفحات مفردة أو الكل",
      feature_instant: "معاينة حية ومباشرة",
      btn_change_pdf: "تغيير المستند",
      btn_clear: "مسح",
      toolbar_title: "أدوات التدوير الجماعي",
      btn_rotate_all_left: "تدوير الكل يساراً (90°)",
      btn_rotate_all_right: "تدوير الكل يميناً (90°)",
      btn_reset_rotations: "إعادة الضبط",
      btn_save_pdf: "حفظ وتنزيل PDF",
      progress_saving: "جارٍ تطبيق زوايا التدوير على المستند...",
      progress_complete: "تم حفظ وتنزيل مستند PDF بنجاح!",
      grid_title: "صفحات المستند",
      btn_rotate_left: "تدوير يساراً",
      btn_rotate_right: "تدوير يميناً",
      ad_space_label: "مساحة إعلانية (728×90)",
      seo_badge: "تدوير PDF محلي وخاص ١٠٠٪",
      seo_title: "كيفية تدوير صفحات PDF مجاناً عبر الإنترنت",
      seo_subtitle: "صحح الصفحات الممسوحة ضوئياً بالمقلوب أو بالجانب، ودوّر المستندات بالكامل واحفظها بشكل دائم مع حماية كاملة لخصوصيتك.",
      guide_h2: "٣ خطوات بسيطة لتدوير صفحات PDF",
      guide_p: "سواء كنت تصحح فواتير ممسوحة ضوئياً بالمقلوب أو تعدل جداول بيانية عريضة، يمنحك PDFNetizen الطريقة الأسرع والأكثر أماناً:",
      step1_title: "١. رفع مستند PDF",
      step1_desc: "اسحب وأفلت مستند PDF داخل منطقة الرفع أو تصفح من جهازك المكتبي أو الهاتف.",
      step2_title: "٢. تدوير الصفحات حسب الحاجة",
      step2_desc: "انقر على أزرار التدوير في بطاقات الصفحات أو استخدم أزرار التدوير الجماعي لكامل المستند.",
      step3_title: "٣. الحفظ والتحميل",
      step3_desc: "انقر على 'حفظ وتنزيل PDF' لتطبيق التغييرات وتنزيل مستندك المعدل في ثوانٍ معدودة.",
      table_h2: "زوايا تدوير PDF المدعومة وحالات الاستخدام",
      table_p: "يتعامل محركنا المحلي مع كافة اتجاهات التدوير باحترافية تامة:",
      th_angle: "زاوية التدوير",
      th_direction: "الاتجاه",
      th_common_use: "حالة الاستخدام الشائعة",
      th_quality_impact: "تأثير الجودة البصرية",
      td_cw: "دوران لليمين",
      td_cw_use: "جداول البيانات العريضة، العروض التقديمية، والمخططات",
      td_flip: "انقلاب رأساً على عقب",
      td_flip_use: "المستندات والعقود الممسوحة ضوئياً بالمقلوب",
      td_ccw: "دوران لليسار",
      td_ccw_use: "المخططات الهندسية والرسومات الجانبية",
      features_h2: "لماذا تختار أداة تدوير PDF من PDFNetizen؟",
      fb_privacy_title: "خصوصية محلية بنسبة ١٠٠٪",
      fb_privacy_desc: "تتم كافة عمليات التدوير محلياً في ذاكرة متصفحك عبر pdf-lib دون رفع أي ملفات إلى خوادم خارجية إطلاقاً.",
      fb_lossless_title: "حفظ الجودة المتجهية الأصلية",
      fb_lossless_desc: "تقوم الأداة بتعديل بيانات التدوير الأصلية فقط، مما يحافظ على قابلية البحث في النصوص ونقاء الرسومات بنسبة ١٠٠٪.",
      fb_individual_title: "تحكم فردي وجماعي",
      fb_individual_desc: "دوّر صفحات معينة فقط تم مسحها بالخطأ أو دوّر كافة الصفحات دفعة واحدة بنقرة زر.",
      fb_free_title: "مجاني بالكامل وبدون قيود",
      fb_free_desc: "استمتع بالأداة بلا اشتراكات وبدون قيود على عدد الصفحات أو علامات مائية مضافة.",
      fb_cross_title: "توافق تام مع كافة الأجهزة",
      fb_cross_desc: "يعمل بسلاسة على الهواتف والأجهزة اللوحية والحواسيب عبر كافة المتصفحات الحديثة.",
      fb_speed_title: "سرعة فائقة بالمعالجة المحلية",
      fb_speed_desc: "تعتمد الأداة على قدرات جهازك مباشرة عبر WebAssembly لتدوير مئات الصفحات في أجزاء من الثانية.",
      faq_h2: "الأسئلة الشائعة",
      faq_q1: "كيف يمكنني تدوير صفحات PDF مجاناً عبر الإنترنت؟",
      faq_a1: "اسحب وأفلت ملف PDF في منطقة التحميل، استخدم أزرار التدوير الجماعي أو أزرار البطاقات الفردية، ثم اضغط على حفظ وتنزيل PDF.",
      faq_q2: "هل يتم رفع مستنداتي إلى أي خادم خارجي؟",
      faq_a2: "كلا على الإطلاق. تعمل الأداة محلياً ١٠٠٪ داخل متصفحك لضمان سرية مستنداتك وعقودك التامة.",
      faq_q3: "هل يؤثر التدوير على جودة النصوص أو الصور؟",
      faq_a3: "أبداً. يتم تعديل بيانات الزوايا الأصلية في ملف PDF مباشرة دون إعادة ضغط الصور أو تشويه الخطوط.",
      faq_q4: "هل يمكنني تدوير صفحات معينة مقلوبة فقط؟",
      faq_a4: "نعم بالتأكيد! كل صفحة تحتوي على أزرار تدوير يساراً ويميناً لتعديلها بشكل مستقل دون التأثير على باقي الصفحات.",
      faq_q5: "هل يثبت اتجاه التدوير في الملف المحمل بشكل دائم؟",
      faq_a5: "نعم. يتم حفظ الاتجاه الجديد بشكل دائم داخل ملف PDF ويعمل في كافة برامج قراءة PDF مثل Adobe Acrobat ومتصفحات الويب.",
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
      toast_rotated_all_left: "تم تدوير كافة الصفحات 90° يساراً.",
      toast_rotated_all_right: "تم تدوير كافة الصفحات 90° يميناً.",
      toast_reset_all: "تمت إعادة تعيين كافة الزوايا إلى الوضع الافتراضي.",
      toast_saved: "تم حفظ وتنزيل مستند PDF بنجاح!",
      toast_error_load: "فشل تحميل مستند PDF. يرجى التأكد من سلامة الملف وصيغته.",
      toast_error_save: "حدث خطأ أثناء حفظ المستند المعدل."
    }
  };

  let currentLang = 'en';

  // State
  let pdfDoc = null;
  let rawPdfBuffer = null;
  let docFileName = "document";
  let totalPages = 0;
  let pageRotations = {}; // pageNum (1-based) -> delta degrees (0, 90, 180, 270)
  let isSaving = false;

  // DOM References
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

  const btnRotateAllLeft = document.getElementById('btn-rotate-all-left');
  const btnRotateAllRight = document.getElementById('btn-rotate-all-right');
  const btnResetAllRotations = document.getElementById('btn-reset-all-rotations');
  const rotationSummaryBadge = document.getElementById('rotation-summary-badge');
  const outputFilenameInput = document.getElementById('output-filename');
  const btnSavePdf = document.getElementById('btn-save-pdf');

  const progressContainer = document.getElementById('progress-container');
  const progressMsg = document.getElementById('progress-msg');
  const progressPercent = document.getElementById('progress-percent');
  const progressBar = document.getElementById('progress-bar');

  const pagesGrid = document.getElementById('pages-grid');

  const toastEl = document.getElementById('toast');
  const toastMessageEl = document.getElementById('toast-message');
  let toastTimeout = null;

  const btnLanguageToggle = document.getElementById('btn-language-toggle');
  const langToggleText = document.getElementById('lang-toggle-text');

  // Format Bytes
  function formatBytes(bytes) {
    if (!bytes || bytes === 0) return '0 KB';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Toast Notification
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

    updateSummaryBadge();

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

  // File Selection & Drag-and-Drop
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

  // Sample PDF Loader
  if (btnSample) {
    btnSample.addEventListener('click', e => {
      e.stopPropagation();
      loadSamplePdf();
    });
  }

  async function handleFileSelection(file) {
    if (!file || (file.type && file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf'))) {
      const dict = translations[currentLang] || translations.en;
      showToast(dict.toast_error_load, 'alert-circle');
      return;
    }

    docFileName = file.name.replace(/\.[^/.]+$/, "") || "document";
    if (outputFilenameInput) outputFilenameInput.value = `${docFileName}_rotated`;
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

  async function loadSamplePdf() {
    docFileName = "sample_document";
    if (outputFilenameInput) outputFilenameInput.value = "sample_document_rotated";
    const sampleSize = "240 KB";

    const samplePdfBytes = generateDemoPdfBytes();
    rawPdfBuffer = samplePdfBytes.buffer;
    await processLoadedPdf(samplePdfBytes.buffer, "sample_document.pdf", sampleSize);

    const dict = translations[currentLang] || translations.en;
    showToast(dict.toast_sample, 'sparkles');
  }

  // Minimal multi-page vector PDF buffer for testing
  function generateDemoPdfBytes() {
    const pdfSource = `%PDF-1.4
1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj
2 0 obj << /Type /Pages /Kids [3 0 R 4 0 R 5 0 R] /Count 3 >> endobj
3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 6 0 R >> >> /Contents 7 0 R >> endobj
4 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 6 0 R >> >> /Contents 8 0 R >> endobj
5 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 6 0 R >> >> /Contents 9 0 R >> endobj
6 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >> endobj
7 0 obj << /Length 260 >> stream
0.02 0.71 0.83 rg 40 700 532 50 re f
0.07 0.09 0.15 rg 40 40 532 640 re f
1 1 1 rg
BT /F1 28 Tf 60 715 Td (PDFNetizen - Rotate PDF Page 01) Tj ET
BT /F1 16 Tf 60 620 Td (Lossless Vector Orientation Tool) Tj ET
BT /F1 12 Tf 60 580 Td (100% Client-Side In-Browser Processing) Tj ET
0.23 0.51 0.96 rg 60 400 492 120 re f
1 1 1 rg
BT /F1 14 Tf 80 460 Td (Click rotate buttons below to turn this page 90 degrees) Tj ET
endstream endobj
8 0 obj << /Length 230 >> stream
0.23 0.51 0.96 rg 40 700 532 50 re f
0.07 0.09 0.15 rg 40 40 532 640 re f
1 1 1 rg
BT /F1 28 Tf 60 715 Td (Page 02 - Landscape Chart Simulation) Tj ET
BT /F1 16 Tf 60 620 Td (Quarterly Financial Overview) Tj ET
0.96 0.62 0.04 rg 60 380 492 180 re f
1 1 1 rg
BT /F1 14 Tf 80 470 Td (Fix sideways or upside-down scanned documents easily) Tj ET
endstream endobj
9 0 obj << /Length 210 >> stream
0.39 0.4 0.95 rg 40 700 532 50 re f
0.07 0.09 0.15 rg 40 40 532 640 re f
1 1 1 rg
BT /F1 28 Tf 60 715 Td (Page 03 - Summary & Legal Sign-off) Tj ET
BT /F1 16 Tf 60 620 Td (Lossless output ready to save instantly) Tj ET
0.06 0.72 0.49 rg 60 420 492 100 re f
1 1 1 rg
BT /F1 14 Tf 80 465 Td (Click 'Save & Download PDF' to export rotated document) Tj ET
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

  // Process Loaded PDF
  async function processLoadedPdf(arrayBuffer, name, sizeStr) {
    if (!window.pdfjsLib) {
      alert("PDF.js library is loading, please try again in a moment.");
      return;
    }

    try {
      const loadingTask = window.pdfjsLib.getDocument({ data: arrayBuffer });
      pdfDoc = await loadingTask.promise;
      totalPages = pdfDoc.numPages;

      docFilenameEl.textContent = name;
      docPageCountEl.textContent = `${totalPages} ${totalPages === 1 ? 'Page' : 'Pages'}`;
      docFileSizeEl.textContent = sizeStr;

      // Initialize rotation angles
      pageRotations = {};
      for (let i = 1; i <= totalPages; i++) {
        pageRotations[i] = 0;
      }

      dropzone.style.display = 'none';
      workspaceSection.classList.add('active');

      await renderThumbnailsGrid();
      updateSummaryBadge();

      const dict = translations[currentLang] || translations.en;
      showToast(dict.toast_loaded.replace('{pages}', totalPages), 'check-circle-2');

    } catch (err) {
      console.error("PDF loading error:", err);
      const dict = translations[currentLang] || translations.en;
      showToast(dict.toast_error_load, 'alert-circle');
    }
  }

  // Reset Document
  function resetDocument() {
    pdfDoc = null;
    rawPdfBuffer = null;
    totalPages = 0;
    pageRotations = {};
    pagesGrid.innerHTML = '';

    if (fileInput) fileInput.value = '';

    workspaceSection.classList.remove('active');
    dropzone.style.display = 'block';
  }

  // Render Thumbnails Grid
  async function renderThumbnailsGrid() {
    pagesGrid.innerHTML = '';
    const dict = translations[currentLang] || translations.en;

    // Skeletons
    for (let p = 1; p <= totalPages; p++) {
      const card = document.createElement('div');
      card.className = 'page-card';
      card.id = `page-card-${p}`;

      card.innerHTML = `
        <div class="page-card-header">
          <span class="page-number-badge">Page ${p}</span>
          <span class="page-angle-badge" id="angle-badge-${p}">0°</span>
        </div>
        <div class="page-thumb-wrapper" id="thumb-wrap-${p}">
          <div class="page-canvas-rotator" id="rotator-${p}">
            <div class="skeleton-thumb"></div>
          </div>
        </div>
        <div class="page-card-footer">
          <button type="button" class="btn-rotate-single btn-rot-left" data-page="${p}" title="${dict.btn_rotate_left}">
            <i data-lucide="rotate-ccw"></i>
            <span>-90°</span>
          </button>
          <button type="button" class="btn-rotate-single btn-rot-right" data-page="${p}" title="${dict.btn_rotate_right}">
            <i data-lucide="rotate-cw"></i>
            <span>+90°</span>
          </button>
        </div>
      `;

      pagesGrid.appendChild(card);
    }

    if (window.lucide) lucide.createIcons();

    // Render preview canvases progressively
    for (let p = 1; p <= totalPages; p++) {
      try {
        const page = await pdfDoc.getPage(p);
        const unscaledViewport = page.getViewport({ scale: 1.0 });

        const thumbScale = Math.min(1.5, 340 / unscaledViewport.width);
        const thumbViewport = page.getViewport({ scale: thumbScale });

        const canvas = document.createElement('canvas');
        canvas.width = Math.floor(thumbViewport.width);
        canvas.height = Math.floor(thumbViewport.height);
        const ctx = canvas.getContext('2d', { alpha: false });

        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        await page.render({ canvasContext: ctx, viewport: thumbViewport }).promise;

        const rotator = document.getElementById(`rotator-${p}`);
        if (rotator) {
          const skeleton = rotator.querySelector('.skeleton-thumb');
          if (skeleton) skeleton.remove();
          rotator.appendChild(canvas);
        }

      } catch (err) {
        console.error(`Error rendering preview for page ${p}:`, err);
      }
    }

    attachRotateButtonListeners();
  }

  // Attach Per-Page Rotate Buttons
  function attachRotateButtonListeners() {
    document.querySelectorAll('.btn-rot-left').forEach(btn => {
      btn.addEventListener('click', () => {
        const p = parseInt(btn.getAttribute('data-page'), 10);
        rotatePage(p, -90);
      });
    });

    document.querySelectorAll('.btn-rot-right').forEach(btn => {
      btn.addEventListener('click', () => {
        const p = parseInt(btn.getAttribute('data-page'), 10);
        rotatePage(p, 90);
      });
    });
  }

  // Rotate a single page
  function rotatePage(pageNum, deltaAngle) {
    const current = pageRotations[pageNum] || 0;
    pageRotations[pageNum] = (current + deltaAngle + 360) % 360;
    updatePageRotationVisual(pageNum);
    updateSummaryBadge();
  }

  // Update visual CSS transform and angle badge for a page
  function updatePageRotationVisual(pageNum) {
    const deg = pageRotations[pageNum] || 0;
    const rotator = document.getElementById(`rotator-${pageNum}`);
    const badge = document.getElementById(`angle-badge-${pageNum}`);
    const card = document.getElementById(`page-card-${pageNum}`);

    if (rotator) {
      rotator.style.transform = `rotate(${deg}deg)`;
    }

    if (badge) {
      badge.textContent = `${deg}°`;
    }

    if (card) {
      if (deg !== 0) {
        card.classList.add('rotated');
      } else {
        card.classList.remove('rotated');
      }
    }
  }

  // Global Rotate Actions
  if (btnRotateAllLeft) {
    btnRotateAllLeft.addEventListener('click', () => {
      for (let p = 1; p <= totalPages; p++) {
        pageRotations[p] = ((pageRotations[p] || 0) - 90 + 360) % 360;
        updatePageRotationVisual(p);
      }
      updateSummaryBadge();
      const dict = translations[currentLang] || translations.en;
      showToast(dict.toast_rotated_all_left, 'rotate-ccw');
    });
  }

  if (btnRotateAllRight) {
    btnRotateAllRight.addEventListener('click', () => {
      for (let p = 1; p <= totalPages; p++) {
        pageRotations[p] = ((pageRotations[p] || 0) + 90) % 360;
        updatePageRotationVisual(p);
      }
      updateSummaryBadge();
      const dict = translations[currentLang] || translations.en;
      showToast(dict.toast_rotated_all_right, 'rotate-cw');
    });
  }

  if (btnResetAllRotations) {
    btnResetAllRotations.addEventListener('click', () => {
      for (let p = 1; p <= totalPages; p++) {
        pageRotations[p] = 0;
        updatePageRotationVisual(p);
      }
      updateSummaryBadge();
      const dict = translations[currentLang] || translations.en;
      showToast(dict.toast_reset_all, 'undo-2');
    });
  }

  // Update Summary Badge
  function updateSummaryBadge() {
    if (!rotationSummaryBadge) return;
    let rotatedCount = 0;
    for (let p = 1; p <= totalPages; p++) {
      if ((pageRotations[p] || 0) !== 0) rotatedCount++;
    }

    const isAr = (currentLang === 'ar');
    if (isAr) {
      rotationSummaryBadge.textContent = `${rotatedCount} صفحات تم تدويرها`;
    } else {
      rotationSummaryBadge.textContent = `${rotatedCount} ${rotatedCount === 1 ? 'Page' : 'Pages'} Rotated`;
    }
  }

  // Save & Download Lossless PDF via pdf-lib
  if (btnSavePdf) {
    btnSavePdf.addEventListener('click', async () => {
      if (!rawPdfBuffer || isSaving) return;

      if (!window.PDFLib) {
        alert("PDF-Lib library is loading, please try again in a moment.");
        return;
      }

      isSaving = true;
      btnSavePdf.disabled = true;

      const dict = translations[currentLang] || translations.en;
      progressContainer.classList.add('active');
      progressBar.style.width = '0%';
      progressPercent.textContent = '0%';
      progressMsg.textContent = dict.progress_saving;

      try {
        progressBar.style.width = '25%';
        progressPercent.textContent = '25%';

        // Load original document into PDF-Lib
        const loadedPdfDoc = await window.PDFLib.PDFDocument.load(rawPdfBuffer);
        const pages = loadedPdfDoc.getPages();

        progressBar.style.width = '55%';
        progressPercent.textContent = '55%';

        // Apply rotation to each page
        for (let i = 0; i < pages.length; i++) {
          const pageNum = i + 1;
          const additionalAngle = pageRotations[pageNum] || 0;
          const currentRotation = pages[i].getRotation().angle;
          const finalAngle = (currentRotation + additionalAngle) % 360;

          pages[i].setRotation(window.PDFLib.degrees(finalAngle));
        }

        progressBar.style.width = '80%';
        progressPercent.textContent = '80%';

        // Save new PDF
        const pdfBytes = await loadedPdfDoc.save();

        progressBar.style.width = '100%';
        progressPercent.textContent = '100%';
        progressMsg.textContent = dict.progress_complete;

        // Trigger Download
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);

        let outName = (outputFilenameInput && outputFilenameInput.value.trim()) || `${docFileName}_rotated`;
        if (!outName.toLowerCase().endsWith('.pdf')) outName += '.pdf';

        const a = document.createElement('a');
        a.href = url;
        a.download = outName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        setTimeout(() => URL.revokeObjectURL(url), 6000);

        showToast(dict.toast_saved, 'check-circle-2');

      } catch (err) {
        console.error("Error saving rotated PDF:", err);
        showToast(dict.toast_error_save, 'alert-circle');
      } finally {
        isSaving = false;
        btnSavePdf.disabled = false;
        setTimeout(() => {
          progressContainer.classList.remove('active');
        }, 3000);
      }
    });
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

  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

})();
