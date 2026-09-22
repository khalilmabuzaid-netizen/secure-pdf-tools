/**
 * ==========================================================================
 * compare-pdf.js - PDF Visual Difference & Comparison Engine
 * Powered by Mozilla PDF.js & PDF-Lib
 * 100% Client-Side Privacy • Pixel-Level Diff Overlay • Synchronized Scrolling
 * ==========================================================================
 */

(function () {
  'use strict';

  // Configure PDF.js Worker
  if (window.pdfjsLib) {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  }

  // Bilingual Translation Dictionary (English & Arabic)
  const translations = {
    en: {
      badge_client_side: "100% Client-Side",
      nav_home: "Home",
      breadcrumb_home: "Home",
      breadcrumb_current: "Compare PDF",
      hero_badge: "100% Client-Side • Visual Pixel Diff & Synchronized Comparison • Zero Server Uploads",
      hero_title: 'Compare <span class="gradient-text">PDF Files</span>',
      hero_subtitle: "Visually compare two PDF documents side-by-side or highlight differences with automated pixel diff overlay. 100% private in-browser comparison.",
      tag_doc_a: "Document A (Original)",
      tag_doc_b: "Document B (Modified)",
      dropzone_a_title: "Original PDF (Doc A)",
      dropzone_a_desc: "Drop your first/original PDF document here",
      dropzone_b_title: "Modified PDF (Doc B)",
      dropzone_b_desc: "Drop your second/revised PDF document here",
      btn_browse_a: "Browse Doc A",
      btn_browse_a_label: "Browse Doc A",
      btn_browse_b: "Browse Doc B",
      btn_browse_b_label: "Browse Doc B",
      btn_clear: "Clear",
      btn_start_compare: "Compare Documents",
      btn_start_compare_label: "Compare Documents",
      btn_load_sample: "Try Sample Comparison",
      btn_load_sample_label: "Try Sample Comparison",
      mismatch_alert_text: "Document page length discrepancy detected: Doc A has {countA} pages, Doc B has {countB} pages.",
      tab_side_by_side: "Side-by-Side",
      tab_side_by_side_label: "Side-by-Side",
      tab_overlay: "Diff Overlay",
      tab_overlay_label: "Diff Overlay",
      tab_swipe: "Split Swipe",
      tab_swipe_label: "Split Swipe",
      btn_sync_scroll: "Sync Scroll: ON",
      btn_sync_scroll_label: "Sync Scroll: ON",
      btn_sync_scroll_label_on: "Sync Scroll: ON",
      btn_sync_scroll_label_off: "Sync Scroll: OFF",
      label_page: "Page",
      diff_calculating: "Calculating diff...",
      diff_badge_identical: "100% Identical (0% Diff)",
      diff_badge_changed: "{percent}% Difference Detected",
      label_diff_opacity: "Diff Opacity:",
      label_diff_threshold: "Sensitivity:",
      opt_high_sens: "High (Subtle Shifts)",
      opt_norm_sens: "Normal (Standard)",
      opt_low_sens: "Low (Major Edits)",
      btn_export_diff: "Export Diff",
      btn_export_diff_label: "Export Diff",
      btn_change_files: "Change PDFs",
      btn_change_files_label: "Change PDFs",
      card_page_missing: "Page not present in this document",
      ad_space_label: "Advertisement Space (728x90)",
      guide_h2: "4 Easy Steps to Compare PDF Files Online",
      guide_subtitle: "Discover all visual and typographical differences between two PDF versions in seconds without sending files to any server.",
      step1_title: "1. Upload Both PDFs",
      step1_desc: "Drag and drop Document A (Original) into the left box and Document B (Modified) into the right box.",
      step2_title: "2. In-Browser Local Rendering",
      step2_desc: "Our engine renders pages locally at full vector sharpness using Mozilla PDF.js with zero server uploads.",
      step3_title: "3. Choose Comparison View",
      step3_desc: "Switch seamlessly between synchronized Side-by-Side, Pixel Diff Overlay, or Split Swipe Curtain views.",
      step4_title: "4. Inspect & Export Diff",
      step4_desc: "Review percentage differences across all pages and export high-resolution visual diff snapshot images.",
      features_h2: "Why Compare PDF Documents with PDF Netizen?",
      features_subtitle: "Engineered for privacy, precision, and speed with enterprise-grade pixel comparison directly in your web browser.",
      fb_privacy_title: "100% Client-Side Privacy",
      fb_privacy_desc: "All comparison processing runs locally inside your browser. Your sensitive files and contracts never touch any external server.",
      fb_diff_title: "Pixel-Level Visual Diff Engine",
      fb_diff_desc: "Detect modified paragraphs, numerical changes, shifted margins, and font adjustments with automated color overlays.",
      fb_sync_title: "Synchronized Dual-Page Scrolling",
      fb_sync_desc: "Scroll through both versions simultaneously in lockstep, with an easy toggle to unlock independent navigation.",
      fb_swipe_title: "Interactive Split Swipe Mode",
      fb_swipe_desc: "Drag the interactive dividing handle left and right to inspect subtle design or textual shifts before and after revision.",
      fb_mismatch_title: "Length Mismatch & Missing Page Alerts",
      fb_mismatch_desc: "Smart page count discrepancy detection alerts you when documents have differing total pages or removed sections.",
      fb_free_title: "Completely Free with Zero Limits",
      fb_free_desc: "No registration required, zero watermarks added, and no file size limits. Compare unlimited PDF documents instantly.",
      faq_h2: "Frequently Asked Questions",
      faq_subtitle: "Everything you need to know about comparing PDF documents online with PDF Netizen.",
      faq_q1: "How do I compare two PDF files online for free?",
      faq_a1: "Upload Document A (Original) into the left dropzone and Document B (Modified) into the right dropzone. The tool instantly renders both documents locally in your browser and lets you compare them side-by-side or with automated visual diff highlighting.",
      faq_q2: "How does the visual diff overlay work?",
      faq_a2: "Our engine renders matching pages onto normalized off-screen HTML5 canvases and runs a pixel-by-pixel color comparison. Changed, added, or deleted content is highlighted in high-contrast red/magenta overlay against a ghosted background.",
      faq_q3: "Are my confidential contracts or documents uploaded to any server?",
      faq_a3: "No. All comparison algorithms run 100% locally inside your web browser using Mozilla PDF.js and WebAssembly. Your files never leave your computer or phone.",
      faq_q4: "What happens if the two PDF files have different page counts?",
      faq_a4: "The tool automatically detects length discrepancies, displays an alert banner showing the exact page counts of both files, and lets you navigate all available pages with missing-page indicators.",
      cookie_consent_text: "We use cookies to ensure optimal functionality and analyze traffic in compliance with privacy policies.",
      cookie_learn_more: "Learn more",
      cookie_accept_btn: "Accept & Close",
      footer_tagline: "100% Client-side, private, and secure document processing directly in your browser.",
      footer_privacy: "Privacy Policy",
      footer_terms: "Terms of Service",
      footer_contact: "Contact Us",
      footer_copyright: "© 2026 PDF Netizen. All rights reserved.",
      toast_doc_a_loaded: "Document A (Original) loaded: {pages} pages.",
      toast_doc_b_loaded: "Document B (Modified) loaded: {pages} pages.",
      toast_comparing: "Comparing Document A and Document B...",
      toast_sample_loaded: "Sample comparison documents generated and loaded!",
      toast_diff_exported: "Diff snapshot image downloaded successfully!",
      toast_invalid_pdf: "Invalid PDF file. Please upload a valid document.",
      toast_cleared: "Documents reset."
    },
    ar: {
      badge_client_side: "100% معالجة محلية",
      nav_home: "الرئيسية",
      breadcrumb_home: "الرئيسية",
      breadcrumb_current: "مقارنة ملفات PDF",
      hero_badge: "100% معالجة داخل المتصفح • كشف الفروقات البصرية • بدون رفع على خوادم",
      hero_title: 'مقارنة <span class="gradient-text">ملفات PDF</span>',
      hero_subtitle: "قارن بين مستندي PDF جنباً إلى جنب بصرياً أو أظهر الفروقات والاختلافات تلقائياً بطبقة تلوين حرارية. مقارنة محلية خاصة وآمنة 100%.",
      tag_doc_a: "المستند أ (الأصلي)",
      tag_doc_b: "المستند ب (المعدل)",
      dropzone_a_title: "ملف PDF الأصلي (المستند أ)",
      dropzone_a_desc: "اسحب وأفلت مستند PDF الأول/الأصلي هنا",
      dropzone_b_title: "ملف PDF المعدل (المستند ب)",
      dropzone_b_desc: "اسحب وأفلت مستند PDF الثاني/المعدل هنا",
      btn_browse_a: "استعراض المستند أ",
      btn_browse_a_label: "استعراض المستند أ",
      btn_browse_b: "استعراض المستند ب",
      btn_browse_b_label: "استعراض المستند ب",
      btn_clear: "مسح",
      btn_start_compare: "مقارنة المستندين",
      btn_start_compare_label: "مقارنة المستندين",
      btn_load_sample: "تجربة مقارنة نموذجية",
      btn_load_sample_label: "تجربة مقارنة نموذجية",
      mismatch_alert_text: "تم رصد اختلاف في عدد الصفحات: المستند أ يحتوي على {countA} صفحات، والمستند ب يحتوي على {countB} صفحات.",
      tab_side_by_side: "جنباً إلى جنب",
      tab_side_by_side_label: "جنباً إلى جنب",
      tab_overlay: "طبقة الفروقات (Diff)",
      tab_overlay_label: "طبقة الفروقات (Diff)",
      tab_swipe: "شريط السحب التفاعلي",
      tab_swipe_label: "شريط السحب التفاعلي",
      btn_sync_scroll: "التمرير المتزامن: مفعّل",
      btn_sync_scroll_label: "التمرير المتزامن: مفعّل",
      btn_sync_scroll_label_on: "التمرير المتزامن: مفعّل",
      btn_sync_scroll_label_off: "التمرير المتزامن: معطّل",
      label_page: "الصفحة",
      diff_calculating: "جارٍ حساب الفروقات...",
      diff_badge_identical: "متطابق 100% (لا توجد فروقات)",
      diff_badge_changed: "تم رصد اختلاف بنسبة {percent}%",
      label_diff_opacity: "شفافية الفروقات:",
      label_diff_threshold: "حساسية الكشف:",
      opt_high_sens: "عالية (التعديلات الدقيقة)",
      opt_norm_sens: "عادية (الافتراضية)",
      opt_low_sens: "منخفضة (التغييرات الكبيرة فقط)",
      btn_export_diff: "تصدير صورة الفروقات",
      btn_export_diff_label: "تصدير صورة الفروقات",
      btn_change_files: "تغيير الملفات",
      btn_change_files_label: "تغيير الملفات",
      card_page_missing: "هذه الصفحة غير متوفرة في هذا المستند",
      ad_space_label: "مساحة إعلانية (728×90)",
      guide_h2: "4 خطوات سهلة لمقارنة ملفات PDF عبر الإنترنت",
      guide_subtitle: "اكتشف جميع الفروقات النصية والتصميمية بين نسختين من ملفات PDF في ثوانٍ دون إرسال ملفاتك لأي خادم.",
      step1_title: "1. رفع كلا المستندين",
      step1_desc: "اسحب وأفلت المستند أ (الأصلي) في المربع الأيسر والمستند ب (المعدل) في المربع الأيمن.",
      step2_title: "2. المعالجة المحلية داخل المتصفح",
      step2_desc: "يقوم محركنا بعرض الصفحات محلياً بدقة متناهية عبر Mozilla PDF.js دون رفع أي بيانات.",
      step3_title: "3. اختيار طريقة المقارنة",
      step3_desc: "بدّل بسلاسة بين العرض المتزامن جنباً إلى جنب، أو طبقة تلوين الفروقات، أو شريط السحب التفاعلي.",
      step4_title: "4. فحص الفروقات وتصدير النتائج",
      step4_desc: "راجع نسب الاختلاف عبر جميع الصفحات وقم بتحميل صورة عالية الدقة للفروقات المرصودة.",
      features_h2: "لماذا تقارن مستندات PDF عبر PDF Netizen؟",
      features_subtitle: "مصممة للخصوصية المطلقة والدقة والسرعة الفائقة مع محرك كشف البكسلات المتقدم مباشرة في المتصفح.",
      fb_privacy_title: "خصوصية محلية 100%",
      fb_privacy_desc: "تتم كافة عمليات المقارنة محلياً داخل جهازك دون رفع أي مستندات أو عقود حساسة لأي جهة خارجية.",
      fb_diff_title: "محرك كشف الفروقات بالبكسل",
      fb_diff_desc: "اكشف الفقرات المعدلة، الأرقام المغيرة، الهوامش المنزاحة، وتغييرات الخطوط بطبقات تلوين بارزة.",
      fb_sync_title: "تمرير متزامن لكلا الصفحتين",
      fb_sync_desc: "تصفح كلا المستندين في تناغم وتزامن تام مع إمكانية فك التزامن للتنقل المستقل بنقرة واحدة.",
      fb_swipe_title: "شريط السحب المقسم التفاعلي",
      fb_swipe_desc: "اسحب مقبض التقسيم يميناً ويساراً لمقارنة تفاصيل التعديلات قبل وبعد التغيير بكل وضوح.",
      fb_mismatch_title: "تنبيهات اختلاف عدد الصفحات",
      fb_mismatch_desc: "كشف ذكي ينبهك فورياً عند اختلاف عدد صفحات المستندين مع توضيح الصفحات المفقودة.",
      fb_free_title: "مجاني بالكامل وبدون قيود",
      fb_free_desc: "بدون تسجيل، بدون علامات مائية، وبدون حدود لحجم الملفات. قارن عدداً غير محدود من الملفات فورياً.",
      faq_h2: "الأسئلة الشائعة",
      faq_subtitle: "كل ما تحتاج معرفته حول مقارنة ملفات ومستندات PDF عبر الإنترنت.",
      faq_q1: "كيف أقارن بين ملفين PDF أونلاين مجاناً؟",
      faq_a1: "قم برفع المستند أ (الأصلي) في منطقة الرفع الأولى والمستند ب (المعدل) في منطقة الرفع الثانية. يقوم النظام بعرضهما محلياً في متصفحك ويسمح لك بمقارنتهما جنباً إلى جنب أو عبر طبقة الفروقات.",
      faq_q2: "كيف تعمل ميزة طبقة الفروقات البصرية (Diff Overlay)؟",
      faq_a2: "يقوم محركنا برسم الصفحات على كانفاس موحد ومقارنة ألوان كل بكسل بدقة. يتم تظليل المحتوى المعدل أو المضاف أو المحذوف بلون أحمر بارز مع تعتيم الأجزاء المتطابقة.",
      faq_q3: "هل يتم رفع العقود أو المستندات الحساسة إلى أي خادم خارجي؟",
      faq_a3: "أبداً. تتم كافة خوارزميات المقارنة داخل متصفحك محلياً 100% باستخدام WebAssembly و PDF.js. لا تخرج مستنداتك من جهازك على الإطلاق.",
      faq_q4: "ماذا يحدث إذا كان لملفي الـ PDF عدد صفحات مختلف؟",
      faq_a4: "يكتشف المحرك الاختلاف تلقائياً ويظهر شريط تنبيه يوضح عدد صفحات كل ملف، مع تمكينك من استعراض الصفحات المتوفرة وتمييز الصفحات المحذوفة.",
      cookie_consent_text: "نحن نستخدم ملفات تعريف الارتباط لتحسين تجربتك وتوفير أفضل أداء وفقاً لسياسات الخصوصية.",
      cookie_learn_more: "معرفة المزيد",
      cookie_accept_btn: "قبول وإغلاق",
      footer_tagline: "معالجة مستندات محلية 100%، خاصة وآمنة تماماً مباشرة داخل متصفحك.",
      footer_privacy: "سياسة الخصوصية",
      footer_terms: "شروط الخدمة",
      footer_contact: "اتصل بنا",
      footer_copyright: "© 2026 PDF Netizen. جميع الحقوق محفوظة.",
      toast_doc_a_loaded: "تم تحميل المستند أ (الأصلي): {pages} صفحات.",
      toast_doc_b_loaded: "تم تحميل المستند ب (المعدل): {pages} صفحات.",
      toast_comparing: "جارٍ مقارنة المستند أ مع المستند ب...",
      toast_sample_loaded: "تم إنشاء وتحميل ملفي المقارنة النموذجيين بنجاح!",
      toast_diff_exported: "تم تنزيل صورة الفروقات بنجاح!",
      toast_invalid_pdf: "ملف PDF غير صالح أو تالف. يرجى تجربة ملف آخر.",
      toast_cleared: "تمت إعادة تعيين المستندات."
    }
  };

  // State
  let currentLang = 'en';
  let docA = null; // { file, buffer, pdfDoc, numPages, name, size }
  let docB = null; // { file, buffer, pdfDoc, numPages, name, size }
  let currentPage = 1;
  let totalPages = 1;
  let currentMode = 'side'; // 'side' | 'overlay' | 'swipe'
  let syncScroll = true;
  let isSyncing = false;
  let zoomScale = 1.0;
  let diffThreshold = 30;
  let diffOpacity = 0.85;
  let isDraggingSwipe = false;
  let swipePercent = 50;

  // DOM Elements
  const dropzoneA = document.getElementById('dropzone-a');
  const dropzoneB = document.getElementById('dropzone-b');
  const fileInputA = document.getElementById('file-input-a');
  const fileInputB = document.getElementById('file-input-b');
  const btnBrowseA = document.getElementById('btn-browse-a');
  const btnBrowseB = document.getElementById('btn-browse-b');
  const btnClearA = document.getElementById('btn-clear-a');
  const btnClearB = document.getElementById('btn-clear-b');
  const badgeFileA = document.getElementById('badge-file-a');
  const badgeFileB = document.getElementById('badge-file-b');
  const nameFileA = document.getElementById('name-file-a');
  const nameFileB = document.getElementById('name-file-b');
  const metaFileA = document.getElementById('meta-file-a');
  const metaFileB = document.getElementById('meta-file-b');
  const btnStartCompare = document.getElementById('btn-start-compare');
  const btnLoadSample = document.getElementById('btn-load-sample');

  const uploadSection = document.getElementById('upload-section');
  const workspaceSection = document.getElementById('workspace-area');
  const mismatchAlert = document.getElementById('mismatch-alert');
  const mismatchAlertText = document.getElementById('mismatch-alert-text');

  const btnViewSide = document.getElementById('btn-view-side');
  const btnViewOverlay = document.getElementById('btn-view-overlay');
  const btnViewSwipe = document.getElementById('btn-view-swipe');
  const btnToggleSync = document.getElementById('btn-toggle-sync');

  const btnPrevPage = document.getElementById('btn-prev-page');
  const btnNextPage = document.getElementById('btn-next-page');
  const pageInput = document.getElementById('page-input');
  const totalPagesEl = document.getElementById('total-pages');
  const diffStatsBadge = document.getElementById('diff-stats-badge');
  const diffStatsText = document.getElementById('diff-stats-text');

  const btnZoomOut = document.getElementById('btn-zoom-out');
  const btnZoomIn = document.getElementById('btn-zoom-in');
  const btnZoomReset = document.getElementById('btn-zoom-reset');
  const zoomLevelEl = document.getElementById('zoom-level');
  const btnExportDiff = document.getElementById('btn-export-diff-png');
  const btnChangeFiles = document.getElementById('btn-change-files');

  const stageSide = document.getElementById('stage-side');
  const stageOverlay = document.getElementById('stage-overlay');
  const stageSwipe = document.getElementById('stage-swipe');

  const viewportA = document.getElementById('viewport-a');
  const viewportB = document.getElementById('viewport-b');
  const canvasA = document.getElementById('canvas-a');
  const canvasB = document.getElementById('canvas-b');
  const vpPageA = document.getElementById('vp-page-a');
  const vpPageB = document.getElementById('vp-page-b');

  const canvasOverlay = document.getElementById('canvas-overlay');
  const diffOpacitySlider = document.getElementById('diff-opacity-slider');
  const diffOpacityVal = document.getElementById('diff-opacity-val');
  const diffThresholdSelect = document.getElementById('diff-threshold-select');

  const swipeBox = document.getElementById('swipe-box');
  const canvasSwipeA = document.getElementById('canvas-swipe-a');
  const canvasSwipeB = document.getElementById('canvas-swipe-b');
  const swipeLayerB = document.getElementById('swipe-layer-b');
  const swipeHandle = document.getElementById('swipe-handle');

  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  const toastIcon = document.getElementById('toast-icon');

  // Format File Size
  function formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  // Toast Notification
  let toastTimer = null;
  function showToast(msg, icon = 'info') {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = msg;
    if (toastIcon && window.lucide) {
      toastIcon.setAttribute('data-lucide', icon);
      window.lucide.createIcons({ root: toast });
    }
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3800);
  }

  // Translation Engine
  function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    const langToggleText = document.getElementById('lang-toggle-text');
    if (langToggleText) {
      langToggleText.textContent = lang === 'ar' ? 'English' : 'العربية';
    }

    const dict = translations[lang] || translations.en;

    // Apply data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        if (el.tagName === 'INPUT' && (el.type === 'button' || el.type === 'submit')) {
          el.value = dict[key];
        } else {
          el.innerHTML = dict[key];
        }
      }
    });

    // Apply data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key]) {
        el.placeholder = dict[key];
      }
    });

    updateSyncButtonState();

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function updateSyncButtonState() {
    if (!btnToggleSync) return;
    const dict = translations[currentLang] || translations.en;
    const label = syncScroll ? dict.btn_sync_scroll_label_on : dict.btn_sync_scroll_label_off;
    const textSpan = btnToggleSync.querySelector('span');
    if (textSpan) {
      textSpan.textContent = label;
    } else {
      btnToggleSync.textContent = label;
    }
    btnToggleSync.classList.toggle('btn-primary', syncScroll);
    btnToggleSync.classList.toggle('btn-secondary', !syncScroll);
  }

  // Read File as ArrayBuffer
  async function readFileBuffer(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  }

  // Handle Document Loading
  async function handleFileA(file) {
    if (!file || file.type !== 'application/pdf') {
      const dict = translations[currentLang] || translations.en;
      showToast(dict.toast_invalid_pdf, 'alert-triangle');
      return;
    }
    try {
      const buffer = await readFileBuffer(file);
      const pdfDoc = await window.pdfjsLib.getDocument({ data: buffer.slice(0) }).promise;
      docA = {
        file,
        buffer,
        pdfDoc,
        numPages: pdfDoc.numPages,
        name: file.name,
        size: file.size
      };

      dropzoneA.classList.add('loaded');
      nameFileA.textContent = docA.name;
      metaFileA.textContent = `${formatBytes(docA.size)} • ${docA.numPages} ${docA.numPages === 1 ? 'Page' : 'Pages'}`;
      btnClearA.style.display = 'inline-flex';

      const dict = translations[currentLang] || translations.en;
      showToast(dict.toast_doc_a_loaded.replace('{pages}', docA.numPages), 'check-circle');

      checkBothReady();
    } catch (err) {
      console.error('Error loading Doc A:', err);
      const dict = translations[currentLang] || translations.en;
      showToast(dict.toast_invalid_pdf, 'alert-triangle');
    }
  }

  async function handleFileB(file) {
    if (!file || file.type !== 'application/pdf') {
      const dict = translations[currentLang] || translations.en;
      showToast(dict.toast_invalid_pdf, 'alert-triangle');
      return;
    }
    try {
      const buffer = await readFileBuffer(file);
      const pdfDoc = await window.pdfjsLib.getDocument({ data: buffer.slice(0) }).promise;
      docB = {
        file,
        buffer,
        pdfDoc,
        numPages: pdfDoc.numPages,
        name: file.name,
        size: file.size
      };

      dropzoneB.classList.add('loaded');
      nameFileB.textContent = docB.name;
      metaFileB.textContent = `${formatBytes(docB.size)} • ${docB.numPages} ${docB.numPages === 1 ? 'Page' : 'Pages'}`;
      btnClearB.style.display = 'inline-flex';

      const dict = translations[currentLang] || translations.en;
      showToast(dict.toast_doc_b_loaded.replace('{pages}', docB.numPages), 'check-circle');

      checkBothReady();
    } catch (err) {
      console.error('Error loading Doc B:', err);
      const dict = translations[currentLang] || translations.en;
      showToast(dict.toast_invalid_pdf, 'alert-triangle');
    }
  }

  function checkBothReady() {
    if (docA && docB) {
      btnStartCompare.disabled = false;
      startComparison();
    } else {
      btnStartCompare.disabled = true;
    }
  }

  function resetDocA() {
    docA = null;
    dropzoneA.classList.remove('loaded');
    fileInputA.value = '';
    btnClearA.style.display = 'none';
    btnStartCompare.disabled = true;
  }

  function resetDocB() {
    docB = null;
    dropzoneB.classList.remove('loaded');
    fileInputB.value = '';
    btnClearB.style.display = 'none';
    btnStartCompare.disabled = true;
  }

  function resetAll() {
    resetDocA();
    resetDocB();
    workspaceSection.classList.remove('active');
    uploadSection.style.display = 'block';
    mismatchAlert.classList.remove('show');
    const dict = translations[currentLang] || translations.en;
    showToast(dict.toast_cleared, 'refresh-cw');
  }

  // Start Comparison Mode
  async function startComparison() {
    if (!docA || !docB) return;

    totalPages = Math.max(docA.numPages, docB.numPages);
    currentPage = 1;
    pageInput.value = '1';
    pageInput.max = totalPages;
    totalPagesEl.textContent = totalPages;

    // Check for length mismatch
    if (docA.numPages !== docB.numPages) {
      const dict = translations[currentLang] || translations.en;
      mismatchAlertText.textContent = dict.mismatch_alert_text
        .replace('{countA}', docA.numPages)
        .replace('{countB}', docB.numPages);
      mismatchAlert.classList.add('show');
    } else {
      mismatchAlert.classList.remove('show');
    }

    uploadSection.style.display = 'none';
    workspaceSection.classList.add('active');

    const dict = translations[currentLang] || translations.en;
    showToast(dict.toast_comparing, 'git-compare');

    await renderCurrentPage();
  }

  // Render Current Page
  async function renderCurrentPage() {
    if (!docA || !docB) return;

    pageInput.value = currentPage;
    vpPageA.textContent = `${translations[currentLang].label_page || 'Page'} ${currentPage}`;
    vpPageB.textContent = `${translations[currentLang].label_page || 'Page'} ${currentPage}`;

    diffStatsBadge.classList.remove('identical');
    diffStatsText.textContent = translations[currentLang].diff_calculating || 'Calculating diff...';

    const dpr = window.devicePixelRatio || 1;
    const baseScale = 1.35 * zoomScale;

    let pageAObj = null;
    let pageBObj = null;

    if (currentPage <= docA.numPages) {
      pageAObj = await docA.pdfDoc.getPage(currentPage);
    }
    if (currentPage <= docB.numPages) {
      pageBObj = await docB.pdfDoc.getPage(currentPage);
    }

    let viewportAObj = pageAObj ? pageAObj.getViewport({ scale: baseScale * dpr }) : null;
    let viewportBObj = pageBObj ? pageBObj.getViewport({ scale: baseScale * dpr }) : null;

    const width = Math.max(viewportAObj ? viewportAObj.width : 0, viewportBObj ? viewportBObj.width : 0) || 800;
    const height = Math.max(viewportAObj ? viewportAObj.height : 0, viewportBObj ? viewportBObj.height : 0) || 1100;

    const cssWidth = width / dpr;
    const cssHeight = height / dpr;

    // Render Canvas A
    canvasA.width = width;
    canvasA.height = height;
    canvasA.style.width = `${cssWidth}px`;
    canvasA.style.height = `${cssHeight}px`;
    const ctxA = canvasA.getContext('2d', { willReadFrequently: true });
    ctxA.fillStyle = '#ffffff';
    ctxA.fillRect(0, 0, width, height);

    if (pageAObj && viewportAObj) {
      await pageAObj.render({ canvasContext: ctxA, viewport: viewportAObj }).promise;
    } else {
      drawMissingPagePlaceholder(ctxA, width, height, 'Document A');
    }

    // Render Canvas B
    canvasB.width = width;
    canvasB.height = height;
    canvasB.style.width = `${cssWidth}px`;
    canvasB.style.height = `${cssHeight}px`;
    const ctxB = canvasB.getContext('2d', { willReadFrequently: true });
    ctxB.fillStyle = '#ffffff';
    ctxB.fillRect(0, 0, width, height);

    if (pageBObj && viewportBObj) {
      await pageBObj.render({ canvasContext: ctxB, viewport: viewportBObj }).promise;
    } else {
      drawMissingPagePlaceholder(ctxB, width, height, 'Document B');
    }

    // Render Canvas Swipe A & B
    canvasSwipeA.width = width;
    canvasSwipeA.height = height;
    canvasSwipeA.style.width = `${cssWidth}px`;
    canvasSwipeA.style.height = `${cssHeight}px`;
    const ctxSwipeA = canvasSwipeA.getContext('2d');
    ctxSwipeA.drawImage(canvasA, 0, 0);

    canvasSwipeB.width = width;
    canvasSwipeB.height = height;
    canvasSwipeB.style.width = `${cssWidth}px`;
    canvasSwipeB.style.height = `${cssHeight}px`;
    const ctxSwipeB = canvasSwipeB.getContext('2d');
    ctxSwipeB.drawImage(canvasB, 0, 0);

    updateSwipeDivider();

    // Compute Pixel Diff Overlay
    computeDiffOverlay(width, height, cssWidth, cssHeight, ctxA, ctxB);
  }

  // Missing Page Placeholder Pattern
  function drawMissingPagePlaceholder(ctx, width, height, docLabel) {
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 8]);
    ctx.strokeRect(20, 20, width - 40, height - 40);
    ctx.setLineDash([]);

    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 24px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${docLabel}: ${translations[currentLang].card_page_missing || 'Page not present'}`, width / 2, height / 2);
  }

  // Compute Pixel Difference Overlay
  function computeDiffOverlay(width, height, cssWidth, cssHeight, ctxA, ctxB) {
    canvasOverlay.width = width;
    canvasOverlay.height = height;
    canvasOverlay.style.width = `${cssWidth}px`;
    canvasOverlay.style.height = `${cssHeight}px`;

    const ctxOverlay = canvasOverlay.getContext('2d');
    const imgDataA = ctxA.getImageData(0, 0, width, height);
    const imgDataB = ctxB.getImageData(0, 0, width, height);
    const diffImgData = ctxOverlay.createImageData(width, height);

    const dataA = imgDataA.data;
    const dataB = imgDataB.data;
    const diffData = diffImgData.data;

    let diffPixels = 0;
    const totalPixels = width * height;
    const threshold = diffThreshold;
    const alphaOverlay = Math.floor(diffOpacity * 255);

    for (let i = 0; i < dataA.length; i += 4) {
      const rA = dataA[i];
      const gA = dataA[i + 1];
      const bA = dataA[i + 2];

      const rB = dataB[i];
      const gB = dataB[i + 1];
      const bB = dataB[i + 2];

      const delta = Math.abs(rA - rB) + Math.abs(gA - gB) + Math.abs(bA - bB);

      if (delta > threshold) {
        diffPixels++;
        // Vivid Red / Magenta Diff Highlight
        diffData[i] = 239;     // R
        diffData[i + 1] = 68;  // G
        diffData[i + 2] = 68;  // B
        diffData[i + 3] = alphaOverlay;
      } else {
        // Ghosted base from Doc A
        const lum = 0.299 * rA + 0.587 * gA + 0.114 * bA;
        diffData[i] = lum;
        diffData[i + 1] = lum;
        diffData[i + 2] = lum;
        diffData[i + 3] = 255;
      }
    }

    ctxOverlay.putImageData(diffImgData, 0, 0);

    const diffPercent = ((diffPixels / totalPixels) * 100).toFixed(2);
    const dict = translations[currentLang] || translations.en;

    if (diffPixels === 0 || diffPercent === '0.00') {
      diffStatsBadge.classList.add('identical');
      diffStatsText.textContent = dict.diff_badge_identical;
    } else {
      diffStatsBadge.classList.remove('identical');
      diffStatsText.textContent = dict.diff_badge_changed.replace('{percent}', diffPercent);
    }
  }

  // Update Swipe Divider Position
  function updateSwipeDivider() {
    if (!swipeLayerB || !swipeHandle) return;
    swipeLayerB.style.width = `${swipePercent}%`;
    swipeHandle.style.left = `${swipePercent}%`;
  }

  // View Mode Switching
  function switchMode(mode) {
    currentMode = mode;

    btnViewSide.classList.toggle('active', mode === 'side');
    btnViewOverlay.classList.toggle('active', mode === 'overlay');
    btnViewSwipe.classList.toggle('active', mode === 'swipe');

    stageSide.style.display = mode === 'side' ? 'grid' : 'none';
    stageOverlay.style.display = mode === 'overlay' ? 'flex' : 'none';
    stageSwipe.style.display = mode === 'swipe' ? 'flex' : 'none';

    if (window.lucide) window.lucide.createIcons();
  }

  // Synchronized Scrolling Logic
  function setupSyncScroll() {
    if (!viewportA || !viewportB) return;

    viewportA.addEventListener('scroll', () => {
      if (!syncScroll || isSyncing) return;
      isSyncing = true;
      viewportB.scrollTop = viewportA.scrollTop;
      viewportB.scrollLeft = viewportA.scrollLeft;
      requestAnimationFrame(() => { isSyncing = false; });
    });

    viewportB.addEventListener('scroll', () => {
      if (!syncScroll || isSyncing) return;
      isSyncing = true;
      viewportA.scrollTop = viewportB.scrollTop;
      viewportA.scrollLeft = viewportB.scrollLeft;
      requestAnimationFrame(() => { isSyncing = false; });
    });
  }

  // Setup Swipe Dragging Handlers
  function setupSwipeEvents() {
    if (!swipeBox || !swipeHandle) return;

    function handleMove(clientX) {
      const rect = swipeBox.getBoundingClientRect();
      let percent = ((clientX - rect.left) / rect.width) * 100;
      percent = Math.max(0, Math.min(100, percent));
      swipePercent = percent;
      updateSwipeDivider();
    }

    swipeHandle.addEventListener('mousedown', (e) => {
      isDraggingSwipe = true;
      e.preventDefault();
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDraggingSwipe) return;
      handleMove(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isDraggingSwipe = false;
    });

    // Touch events for mobile
    swipeHandle.addEventListener('touchstart', (e) => {
      isDraggingSwipe = true;
      e.preventDefault();
    }, { passive: false });

    window.addEventListener('touchmove', (e) => {
      if (!isDraggingSwipe || !e.touches[0]) return;
      handleMove(e.touches[0].clientX);
    }, { passive: false });

    window.addEventListener('touchend', () => {
      isDraggingSwipe = false;
    });
  }

  // Generate Sample PDFs in Memory via PDF-Lib
  async function generateSamplePDFs() {
    const pdfLib = window.PDFLib || (typeof PDFLib !== 'undefined' ? PDFLib : null);
    if (!pdfLib) {
      showToast('PDF-Lib is initializing. Please try again.', 'alert-circle');
      return;
    }

    try {
      showToast('Generating sample documents...', 'sparkles');

      // Create Document A (Original Contract / Agreement)
      const docAPdf = await pdfLib.PDFDocument.create();
      const pageA1 = docAPdf.addPage([595, 842]); // A4
      const fontA = await docAPdf.embedFont(pdfLib.StandardFonts.Helvetica);
      const fontBoldA = await docAPdf.embedFont(pdfLib.StandardFonts.HelveticaBold);

      // Page A1 content
      pageA1.drawText('MASTER SERVICES AGREEMENT', { x: 50, y: 780, size: 20, font: fontBoldA, color: pdfLib.rgb(0.06, 0.09, 0.16) });
      pageA1.drawText('Document Version: 1.0 (Original Draft)', { x: 50, y: 755, size: 10, font: fontA, color: pdfLib.rgb(0.4, 0.45, 0.55) });
      pageA1.drawLine({ start: { x: 50, y: 745 }, end: { x: 545, y: 745 }, thickness: 1.5, color: pdfLib.rgb(0.55, 0.36, 0.96) });

      pageA1.drawText('1. Project Scope & Deliverables', { x: 50, y: 715, size: 13, font: fontBoldA, color: pdfLib.rgb(0.1, 0.15, 0.25) });
      pageA1.drawText('The Contractor agrees to provide technical software consulting and deployment services.', { x: 50, y: 695, size: 10, font: fontA, color: pdfLib.rgb(0.2, 0.25, 0.35) });
      pageA1.drawText('All code shall be delivered in modular ES6+ and fully documented.', { x: 50, y: 680, size: 10, font: fontA, color: pdfLib.rgb(0.2, 0.25, 0.35) });

      pageA1.drawText('2. Payment Terms & Milestone Fees', { x: 50, y: 645, size: 13, font: fontBoldA, color: pdfLib.rgb(0.1, 0.15, 0.25) });
      pageA1.drawText('Total Agreed Fixed Compensation: $12,500 USD', { x: 50, y: 625, size: 11, font: fontBoldA, color: pdfLib.rgb(0.1, 0.5, 0.3) });
      pageA1.drawText('Initial Deposit: $3,500 due upon signature.', { x: 50, y: 608, size: 10, font: fontA, color: pdfLib.rgb(0.2, 0.25, 0.35) });
      pageA1.drawText('Completion Milestone: $9,000 upon QA sign-off.', { x: 50, y: 593, size: 10, font: fontA, color: pdfLib.rgb(0.2, 0.25, 0.35) });

      // Visual box in A
      pageA1.drawRectangle({
        x: 50, y: 480, width: 495, height: 90,
        borderColor: pdfLib.rgb(0.55, 0.36, 0.96),
        borderWidth: 1,
        color: pdfLib.rgb(0.96, 0.94, 1.0)
      });
      pageA1.drawText('CONFIDENTIAL NOTICE', { x: 70, y: 545, size: 11, font: fontBoldA, color: pdfLib.rgb(0.4, 0.2, 0.8) });
      pageA1.drawText('This document contains proprietary information belonging to Netizen Corp.', { x: 70, y: 525, size: 9, font: fontA, color: pdfLib.rgb(0.3, 0.35, 0.45) });
      pageA1.drawText('Unauthorized distribution is strictly prohibited under federal regulations.', { x: 70, y: 510, size: 9, font: fontA, color: pdfLib.rgb(0.3, 0.35, 0.45) });

      // Page A2
      const pageA2 = docAPdf.addPage([595, 842]);
      pageA2.drawText('3. Signatures & Approvals', { x: 50, y: 780, size: 14, font: fontBoldA, color: pdfLib.rgb(0.06, 0.09, 0.16) });
      pageA2.drawText('Client Signature: John Doe', { x: 50, y: 740, size: 11, font: fontA, color: pdfLib.rgb(0.2, 0.25, 0.35) });
      pageA2.drawText('Date Signed: September 15, 2026', { x: 50, y: 720, size: 11, font: fontA, color: pdfLib.rgb(0.2, 0.25, 0.35) });
      pageA2.drawText('Approval Status: PENDING REVIEW', { x: 50, y: 700, size: 11, font: fontBoldA, color: pdfLib.rgb(0.85, 0.55, 0.1) });

      const bytesA = await docAPdf.save();

      // Create Document B (Modified Revision with subtle and major diffs)
      const docBPdf = await pdfLib.PDFDocument.create();
      const pageB1 = docBPdf.addPage([595, 842]);
      const fontB = await docBPdf.embedFont(pdfLib.StandardFonts.Helvetica);
      const fontBoldB = await docBPdf.embedFont(pdfLib.StandardFonts.HelveticaBold);

      // Page B1 content (Modifications: Title version, price increased, added extra clause, red box)
      pageB1.drawText('MASTER SERVICES AGREEMENT', { x: 50, y: 780, size: 20, font: fontBoldB, color: pdfLib.rgb(0.06, 0.09, 0.16) });
      pageB1.drawText('Document Version: 2.1 (Revised & Final)', { x: 50, y: 755, size: 10, font: fontB, color: pdfLib.rgb(0.9, 0.2, 0.2) });
      pageB1.drawLine({ start: { x: 50, y: 745 }, end: { x: 545, y: 745 }, thickness: 1.5, color: pdfLib.rgb(0.9, 0.2, 0.2) });

      pageB1.drawText('1. Project Scope & Deliverables', { x: 50, y: 715, size: 13, font: fontBoldB, color: pdfLib.rgb(0.1, 0.15, 0.25) });
      pageB1.drawText('The Contractor agrees to provide technical software consulting, AI architecture, and deployment.', { x: 50, y: 695, size: 10, font: fontB, color: pdfLib.rgb(0.2, 0.25, 0.35) });
      pageB1.drawText('All code shall be delivered in modular TypeScript and fully unit-tested.', { x: 50, y: 680, size: 10, font: fontB, color: pdfLib.rgb(0.2, 0.25, 0.35) });

      pageB1.drawText('2. Payment Terms & Milestone Fees', { x: 50, y: 645, size: 13, font: fontBoldB, color: pdfLib.rgb(0.1, 0.15, 0.25) });
      pageB1.drawText('Total Agreed Fixed Compensation: $18,900 USD', { x: 50, y: 625, size: 11, font: fontBoldB, color: pdfLib.rgb(0.9, 0.2, 0.2) });
      pageB1.drawText('Initial Deposit: $5,000 due upon signature.', { x: 50, y: 608, size: 10, font: fontB, color: pdfLib.rgb(0.2, 0.25, 0.35) });
      pageB1.drawText('Completion Milestone: $13,900 upon QA sign-off.', { x: 50, y: 593, size: 10, font: fontB, color: pdfLib.rgb(0.2, 0.25, 0.35) });

      // Changed box color & text in B
      pageB1.drawRectangle({
        x: 50, y: 480, width: 495, height: 90,
        borderColor: pdfLib.rgb(0.9, 0.2, 0.2),
        borderWidth: 1.5,
        color: pdfLib.rgb(1.0, 0.94, 0.94)
      });
      pageB1.drawText('EXPEDITED CONFIDENTIAL NOTICE', { x: 70, y: 545, size: 11, font: fontBoldB, color: pdfLib.rgb(0.8, 0.1, 0.1) });
      pageB1.drawText('This agreement includes urgent priority 24/7 client SLA coverage.', { x: 70, y: 525, size: 9, font: fontB, color: pdfLib.rgb(0.3, 0.35, 0.45) });
      pageB1.drawText('All revisions are subject to expedited arbitration clause 9.', { x: 70, y: 510, size: 9, font: fontB, color: pdfLib.rgb(0.3, 0.35, 0.45) });

      // Page B2 (Modified Status & Date)
      const pageB2 = docBPdf.addPage([595, 842]);
      pageB2.drawText('3. Signatures & Approvals', { x: 50, y: 780, size: 14, font: fontBoldB, color: pdfLib.rgb(0.06, 0.09, 0.16) });
      pageB2.drawText('Client Signature: John Doe', { x: 50, y: 740, size: 11, font: fontB, color: pdfLib.rgb(0.2, 0.25, 0.35) });
      pageB2.drawText('Date Signed: September 22, 2026', { x: 50, y: 720, size: 11, font: fontB, color: pdfLib.rgb(0.2, 0.25, 0.35) });
      pageB2.drawText('Approval Status: FULLY APPROVED & EXECUTED', { x: 50, y: 700, size: 11, font: fontBoldB, color: pdfLib.rgb(0.05, 0.6, 0.3) });

      const bytesB = await docBPdf.save();

      // Load both generated sample buffers
      const fileA = new File([bytesA], 'Sample-Contract-v1.0.pdf', { type: 'application/pdf' });
      const fileB = new File([bytesB], 'Sample-Contract-v2.1-Revised.pdf', { type: 'application/pdf' });

      await handleFileA(fileA);
      await handleFileB(fileB);

      const dict = translations[currentLang] || translations.en;
      showToast(dict.toast_sample_loaded, 'sparkles');
    } catch (err) {
      console.error('Error generating samples:', err);
      showToast('Error generating samples', 'alert-triangle');
    }
  }

  // Export Diff Snapshot
  function exportDiffSnapshot() {
    if (!canvasOverlay) return;
    try {
      const dataUrl = canvasOverlay.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `pdf-diff-page-${currentPage}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      const dict = translations[currentLang] || translations.en;
      showToast(dict.toast_diff_exported, 'download');
    } catch (err) {
      console.error('Error exporting diff snapshot:', err);
    }
  }

  // Bind Events
  function initEvents() {
    // Language Toggle
    const btnLanguageToggle = document.getElementById('btn-language-toggle');
    if (btnLanguageToggle) {
      btnLanguageToggle.addEventListener('click', () => {
        setLanguage(currentLang === 'en' ? 'ar' : 'en');
        if (docA && docB) renderCurrentPage();
      });
    }

    // Dropzone A Events
    if (dropzoneA) {
      dropzoneA.addEventListener('click', (e) => {
        if (e.target !== btnClearA && !btnClearA.contains(e.target)) {
          fileInputA.click();
        }
      });
      dropzoneA.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzoneA.classList.add('dragover');
      });
      dropzoneA.addEventListener('dragleave', () => dropzoneA.classList.remove('dragover'));
      dropzoneA.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzoneA.classList.remove('dragover');
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          handleFileA(e.dataTransfer.files[0]);
        }
      });
    }
    if (fileInputA) {
      fileInputA.addEventListener('change', () => {
        if (fileInputA.files && fileInputA.files[0]) {
          handleFileA(fileInputA.files[0]);
        }
      });
    }
    if (btnBrowseA) {
      btnBrowseA.addEventListener('click', (e) => {
        e.stopPropagation();
        fileInputA.click();
      });
    }
    if (btnClearA) {
      btnClearA.addEventListener('click', (e) => {
        e.stopPropagation();
        resetDocA();
      });
    }

    // Dropzone B Events
    if (dropzoneB) {
      dropzoneB.addEventListener('click', (e) => {
        if (e.target !== btnClearB && !btnClearB.contains(e.target)) {
          fileInputB.click();
        }
      });
      dropzoneB.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzoneB.classList.add('dragover');
      });
      dropzoneB.addEventListener('dragleave', () => dropzoneB.classList.remove('dragover'));
      dropzoneB.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzoneB.classList.remove('dragover');
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          handleFileB(e.dataTransfer.files[0]);
        }
      });
    }
    if (fileInputB) {
      fileInputB.addEventListener('change', () => {
        if (fileInputB.files && fileInputB.files[0]) {
          handleFileB(fileInputB.files[0]);
        }
      });
    }
    if (btnBrowseB) {
      btnBrowseB.addEventListener('click', (e) => {
        e.stopPropagation();
        fileInputB.click();
      });
    }
    if (btnClearB) {
      btnClearB.addEventListener('click', (e) => {
        e.stopPropagation();
        resetDocB();
      });
    }

    // Compare & Sample Action Buttons
    if (btnStartCompare) {
      btnStartCompare.addEventListener('click', startComparison);
    }
    if (btnLoadSample) {
      btnLoadSample.addEventListener('click', generateSamplePDFs);
    }

    // View Switchers
    if (btnViewSide) btnViewSide.addEventListener('click', () => switchMode('side'));
    if (btnViewOverlay) btnViewOverlay.addEventListener('click', () => switchMode('overlay'));
    if (btnViewSwipe) btnViewSwipe.addEventListener('click', () => switchMode('swipe'));

    // Toggle Synchronized Scroll
    if (btnToggleSync) {
      btnToggleSync.addEventListener('click', () => {
        syncScroll = !syncScroll;
        updateSyncButtonState();
      });
    }

    // Page Navigation
    if (btnPrevPage) {
      btnPrevPage.addEventListener('click', () => {
        if (currentPage > 1) {
          currentPage--;
          renderCurrentPage();
        }
      });
    }
    if (btnNextPage) {
      btnNextPage.addEventListener('click', () => {
        if (currentPage < totalPages) {
          currentPage++;
          renderCurrentPage();
        }
      });
    }
    if (pageInput) {
      pageInput.addEventListener('change', () => {
        let val = parseInt(pageInput.value, 10);
        if (isNaN(val) || val < 1) val = 1;
        if (val > totalPages) val = totalPages;
        currentPage = val;
        renderCurrentPage();
      });
    }

    // Zoom Controls
    if (btnZoomIn) {
      btnZoomIn.addEventListener('click', () => {
        if (zoomScale < 2.5) {
          zoomScale += 0.2;
          zoomLevelEl.textContent = `${Math.round(zoomScale * 100)}%`;
          renderCurrentPage();
        }
      });
    }
    if (btnZoomOut) {
      btnZoomOut.addEventListener('click', () => {
        if (zoomScale > 0.5) {
          zoomScale -= 0.2;
          zoomLevelEl.textContent = `${Math.round(zoomScale * 100)}%`;
          renderCurrentPage();
        }
      });
    }
    if (btnZoomReset) {
      btnZoomReset.addEventListener('click', () => {
        zoomScale = 1.0;
        zoomLevelEl.textContent = '100%';
        renderCurrentPage();
      });
    }

    // Diff Sensitivity & Opacity
    if (diffOpacitySlider) {
      diffOpacitySlider.addEventListener('input', () => {
        diffOpacity = parseInt(diffOpacitySlider.value, 10) / 100;
        diffOpacityVal.textContent = `${diffOpacitySlider.value}%`;
        if (docA && docB) renderCurrentPage();
      });
    }
    if (diffThresholdSelect) {
      diffThresholdSelect.addEventListener('change', () => {
        diffThreshold = parseInt(diffThresholdSelect.value, 10);
        if (docA && docB) renderCurrentPage();
      });
    }

    // Export & Reset
    if (btnExportDiff) btnExportDiff.addEventListener('click', exportDiffSnapshot);
    if (btnChangeFiles) btnChangeFiles.addEventListener('click', resetAll);

    // FAQ Accordion
    document.querySelectorAll('.faq-question').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        if (item) item.classList.toggle('open');
      });
    });

    // Cookie Banner
    const cookieBanner = document.getElementById('cookie-banner');
    const btnAcceptCookies = document.getElementById('btn-accept-cookies');
    if (cookieBanner && btnAcceptCookies) {
      if (localStorage.getItem('pdf_netizen_cookie_consent')) {
        cookieBanner.classList.add('hidden');
      }
      btnAcceptCookies.addEventListener('click', () => {
        localStorage.setItem('pdf_netizen_cookie_consent', 'true');
        cookieBanner.classList.add('hidden');
      });
    }

    // Sync scroll & swipe listeners
    setupSyncScroll();
    setupSwipeEvents();
  }

  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    initEvents();
    if (window.lucide) {
      window.lucide.createIcons();
    }
  });

  // Expose translation for master sync scripts
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { translations };
  }
})();
