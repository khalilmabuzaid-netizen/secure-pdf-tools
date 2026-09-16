/**
 * SignPDF Pro - Client-Side Electronic Signature (eSign) Tool
 * Powered by HTML5 Canvas & PDF-Lib
 * 100% Client-Side Processing • Zero Server Uploads • Full Bilingual English / Arabic Support
 */

(function () {
  'use strict';

  // Multi-Language Translation Dictionary
  const translations = {
    en: {
      badge_client_side: "100% Client-Side",
      nav_home: "Home",
      sign_hero_badge: "Local eSign • Secure & Private Document Signing",
      sign_hero_title: 'Sign Your <span class="gradient-text">PDF Documents</span> Electronically',
      sign_hero_subtitle: "Draw your custom electronic signature smoothly with mouse or touch, and securely stamp it onto any page of your PDF. 100% client-side privacy.",
      sign_dropzone_title: "Drop your PDF document here",
      sign_dropzone_subtitle: "Drag and drop any PDF file to add your electronic signature, or browse from your device.",
      sign_btn_browse: "Browse PDF File",
      sign_btn_sample: "Try Sample Document",
      sign_feature_smooth: "Ultra-Smooth Signature Pad",
      sign_feature_pages: "Any Page Placement",
      sign_feature_privacy: "100% Client-Side Security",
      sign_btn_change: "Change File",
      sign_pad_title: "Draw Electronic Signature",
      sign_badge_confirmed: "Signature Ready",
      sign_guide_text: "Sign above line",
      sign_placeholder: "Draw your signature here with mouse or finger...",
      sign_label_ink: "Ink:",
      sign_label_stroke: "Width:",
      sign_btn_clear: "Clear Signature",
      sign_btn_confirm: "Confirm Signature",
      sign_stamp_settings_title: "Signature Placement",
      sign_label_page: "Apply Signature to Page",
      sign_label_position: "Stamp Position",
      sign_pos_br: "Bottom Right",
      sign_pos_bl: "Bottom Left",
      sign_pos_bc: "Bottom Center",
      sign_pos_tr: "Top Right",
      sign_pos_tl: "Top Left",
      sign_pos_center: "Center Page",
      sign_label_scale: "Signature Size",
      sign_label_preview: "Signature Preview",
      sign_preview_empty: "No signature drawn yet",
      sign_btn_download: "Download Signed PDF",
      sign_status_processing: "Embedding signature into PDF...",
      sign_status_done: "Signed PDF created successfully!",
      ad_space_label: "Advertisement Space (728x90)",
      footer_tagline: "100% Client-side, private, and secure document processing directly in your browser.",
      footer_privacy: "Privacy Policy",
      footer_terms: "Terms of Service",
      footer_contact: "Contact Us",
      footer_copyright: "© 2026 PDF Hub. All rights reserved.",
      cookie_consent_text: "We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.",
      cookie_learn_more: "Privacy Policy",
      cookie_accept_btn: "Accept",
      toast_sig_cleared: "Signature cleared.",
      toast_sig_confirmed: "Signature confirmed and ready to stamp!",
      toast_no_sig: "Please draw your signature on the pad first.",
      toast_no_file: "Please upload a PDF document first.",
      toast_signed_success: "Document signed and downloaded successfully!",
      toast_sample_loaded: "Sample agreement document loaded.",
      toast_error: "An error occurred while signing the document.",
      sign_seo_badge: "Confidential & Private eSignatures",
      sign_seo_title: "How to Electronically Sign PDF Documents Online",
      sign_seo_subtitle: "Draw your custom signature and stamp it securely onto any page with 100% client-side processing and zero cloud uploads.",
      sign_step1_title: "1. Open Your PDF File",
      sign_step1_desc: "Drop your agreement, contract, or form into the secure dropzone to open it locally in your browser.",
      sign_step2_title: "2. Draw Electronic Signature",
      sign_step2_desc: "Use your mouse, finger, or digital pen on the canvas. Customize your ink color and stroke thickness to match your style.",
      sign_step3_title: "3. Position & Save Document",
      sign_step3_desc: "Select the target page, choose the signature position (e.g. Bottom Right), adjust the size, and download your signed PDF.",
      sign_faq_title: "Frequently Asked Questions",
      sign_faq_q1: "Does anyone else see my signature or contract?",
      sign_faq_a1: "Never. Sign PDF Pro operates with 100% client-side processing directly in your browser session. With no server uploads, your signature data and document content remain completely private on your own device.",
      sign_faq_q2: "Can I sign documents on my phone or tablet screen?",
      sign_faq_a2: "Yes! The signature pad is fully optimized for touchscreens and stylus pens, offering smooth stroke rendering for authentic, professional signatures on mobile and desktop.",
      sign_faq_q3: "Can I place multiple signatures or sign specific pages?",
      sign_faq_a3: "You can designate any page of your document and precisely position the signature in standard signing locations such as bottom right, bottom left, or center with adjustable scaling."
    },
    ar: {
      badge_client_side: "محلي ١٠٠٪ في المتصفح",
      nav_home: "الرئيسية",
      sign_hero_badge: "توقيع إلكتروني محلي • آمن وخاص تماماً",
      sign_hero_title: 'توقيع <span class="gradient-text">مستندات PDF</span> إلكترونياً',
      sign_hero_subtitle: "ارسم توقيعك الإلكتروني بسلاسة ودقة باستخدام الماوس أو شاشة اللمس، وثبّته في أي صفحة ومكان تريده داخل مستند PDF بأمان تام.",
      sign_dropzone_title: "اسحب ملف الـ PDF هنا للتوقيع",
      sign_dropzone_subtitle: "اسحب وأفلت أي مستند PDF لإضافة توقيعك الإلكتروني عليه، أو تصفح من جهازك.",
      sign_btn_browse: "استعراض ملف PDF",
      sign_btn_sample: "تجربة مستند نموذجي",
      sign_feature_smooth: "لوحة توقيع فائقة السلاسة",
      sign_feature_pages: "تثبيت في أي صفحة وموضع",
      sign_feature_privacy: "أمان وخصوصية محلية ١٠٠٪",
      sign_btn_change: "تغيير الملف",
      sign_pad_title: "رسم التوقيع الإلكتروني",
      sign_badge_confirmed: "التوقيع جاهز",
      sign_guide_text: "وقع أعلى هذا الخط",
      sign_placeholder: "ارسم توقيعك هنا باستخدام الماوس أو إصبعك...",
      sign_label_ink: "لون الحبر:",
      sign_label_stroke: "سُمك الخط:",
      sign_btn_clear: "مسح التوقيع",
      sign_btn_confirm: "تأكيد التوقيع",
      sign_stamp_settings_title: "إعدادات موضع التوقيع",
      sign_label_page: "تطبيق التوقيع على الصفحة",
      sign_label_position: "موضع التوقيع في الصفحة",
      sign_pos_br: "أسفل اليمين",
      sign_pos_bl: "أسفل اليسار",
      sign_pos_bc: "أسفل الوسط",
      sign_pos_tr: "أعلى اليمين",
      sign_pos_tl: "أعلى اليسار",
      sign_pos_center: "وسط الصفحة",
      sign_label_scale: "حجم التوقيع",
      sign_label_preview: "معاينة التوقيع",
      sign_preview_empty: "لم يتم رسم توقيع بعد",
      sign_btn_download: "تحميل المستند الموقع",
      sign_status_processing: "جاري دمج التوقيع وتوليد المستند...",
      sign_status_done: "تم توقيع المستند بنجاح!",
      ad_space_label: "مساحة إعلانية (728×90)",
      footer_tagline: "معالجة مستندات محلية ١٠٠٪، خاصة وآمنة تماماً مباشرة في متصفحك.",
      footer_privacy: "سياسة الخصوصية",
      footer_terms: "شروط الاستخدام",
      footer_contact: "اتصل بنا",
      footer_copyright: "© ٢٠٢٦ PDF Hub. جميع الحقوق محفوظة.",
      cookie_consent_text: "نحن نستخدم ملفات تعريف الارتباط لتحسين تجربتك. باستمرارك في زيارة هذا الموقع، فإنك توافق على استخدامنا لملفات تعريف الارتباط.",
      cookie_learn_more: "سياسة الخصوصية",
      cookie_accept_btn: "موافق",
      toast_sig_cleared: "تم مسح لوحة التوقيع.",
      toast_sig_confirmed: "تم تأكيد التوقيع وجاهز للتثبيت!",
      toast_no_sig: "يرجى رسم توقيعك أولاً في لوحة التوقيع.",
      toast_no_file: "يرجى رفع ملف PDF أولاً.",
      toast_signed_success: "تم توقيع المستند وتحميله بنجاح!",
      toast_sample_loaded: "تم تحميل المستند النموذجي بنجاح.",
      toast_error: "حدث خطأ أثناء معالجة التوقيع. يرجى المحاولة مجدداً.",
      sign_seo_badge: "توقيع إلكتروني آمن وخاص تماماً",
      sign_seo_title: "كيفية توقيع مستندات PDF إلكترونياً عبر الإنترنت",
      sign_seo_subtitle: "ارسم توقيعك المخصص وثبته بأمان في أي صفحة مع معالجة محلية ١٠٠٪ وبدون أي رفع سحابي.",
      sign_step1_title: "١. فتح ملف PDF",
      sign_step1_desc: "أفلت اتفاقيتك أو عقدك أو نموذجك داخل منطقة الرفع لفتحه محلياً وفورياً داخل متصفحك.",
      sign_step2_title: "٢. رسم التوقيع الإلكتروني",
      sign_step2_desc: "استخدم الفأرة أو إصبعك أو القلم الرقمي على لوحة الرسم. خصص لون الحبر وسُمك الخط بما يناسب أسلوبك.",
      sign_step3_title: "٣. تحديد الموضع والحفظ",
      sign_step3_desc: "حدد الصفحة المستهدفة، واختر موضع التوقيع (مثل أسفل اليمين)، واضبط الحجم، ثم حمّل المستند الموقع فوراً.",
      sign_faq_title: "الأسئلة الشائعة",
      sign_faq_q1: "هل يمكن لأي جهة رؤية توقيعي أو محتوى عقودي؟",
      sign_faq_a1: "مستحيل. تعمل أداة التوقيع بمعالجة محلية ١٠٠٪ في المتصفح. ومع عدم وجود أي رفع للخوادم، تظل بيانات توقيعك ومحتوى مستنداتك خاصة ومحمية بالكامل على جهازك الشخصي.",
      sign_faq_q2: "هل يمكنني التوقيع باستخدام شاشة الهاتف أو الجهاز اللوحي؟",
      sign_faq_a2: "نعم! لوحة التوقيع مهيأة بالكامل لشاشات اللمس والأقلام الرقمية، مما يتيح لك تجربة توقيع طبيعية واحترافية على الهواتف والأجهزة اللوحية.",
      sign_faq_q3: "هل يمكنني اختيار صفحة محددة وموضع دقيق للتوقيع؟",
      sign_faq_a3: "يمكنك اختيار أي صفحة من صفحات المستند وتحديد موضع التوقيع بدقة متناهية (أسفل اليمين، أسفل اليسار، الوسط) مع التحكم الكامل في حجم التوقيع."
    }
  };

  // State
  let currentLang = 'en';
  let currentPdfBytes = null;
  let currentPdfDoc = null;
  let totalPdfPages = 1;
  let currentFileName = "document.pdf";
  let currentInkColor = '#0f172a';
  let currentStrokeWidth = 3;
  let isDrawing = false;
  let hasDrawn = false;
  let confirmedSignatureDataUrl = null;
  let selectedPosition = 'bottom-right';
  let selectedScale = 1.0;

  // DOM Elements
  const dropzone = document.getElementById('dropzone');
  const fileInput = document.getElementById('file-input');
  const btnBrowse = document.getElementById('btn-browse');
  const btnLoadSample = document.getElementById('btn-load-sample');
  const dropzoneSection = document.getElementById('dropzone-section');
  const workspaceSection = document.getElementById('workspace-section');
  const fileNameDisplay = document.getElementById('file-name-display');
  const fileStatsDisplay = document.getElementById('file-stats-display');
  const btnChangeFile = document.getElementById('btn-change-file');

  const signatureCanvas = document.getElementById('signature-pad');
  const padPlaceholder = document.getElementById('pad-placeholder');
  const btnClearSig = document.getElementById('btn-clear-sig');
  const btnConfirmSig = document.getElementById('btn-confirm-sig');
  const sigConfirmedBadge = document.getElementById('sig-confirmed-badge');
  const sigPreviewImg = document.getElementById('sig-preview-img');
  const sigPreviewEmpty = document.getElementById('sig-preview-empty');

  const colorSwatches = document.querySelectorAll('.color-swatch');
  const strokeChips = document.querySelectorAll('.stroke-chip');
  const posChips = document.querySelectorAll('.pos-chip');
  const pageSelect = document.getElementById('page-select');
  const sigScaleSlider = document.getElementById('sig-scale-slider');
  const sigScaleVal = document.getElementById('sig-scale-val');
  const btnDownloadSigned = document.getElementById('btn-download-signed');

  const progressCard = document.getElementById('progress-card');
  const signStatusMessage = document.getElementById('sign-status-message');
  const signProgressPercent = document.getElementById('sign-progress-percent');
  const signProgressFill = document.getElementById('sign-progress-fill');

  const toast = document.getElementById('toast');
  const toastIcon = document.getElementById('toast-icon');
  const toastMessage = document.getElementById('toast-message');
  const btnLanguageToggle = document.getElementById('btn-language-toggle');
  const langToggleText = document.getElementById('lang-toggle-text');
  const cookieBanner = document.getElementById('cookie-banner');
  const btnAcceptCookies = document.getElementById('btn-accept-cookies');

  let ctx = null;

  // Initialize
  function init() {
    setupCanvas();
    setupEventListeners();
    setupDropzone();
    setupCookieBanner();
    applyLanguage(currentLang);
    if (window.lucide) {
      lucide.createIcons();
    }
  }

  // Toast Notification
  let toastTimer = null;
  function showToast(messageKeyOrText, type = 'info') {
    if (!toast) return;
    clearTimeout(toastTimer);

    const dict = translations[currentLang] || translations.en;
    const msg = dict[messageKeyOrText] || messageKeyOrText;

    toast.className = `toast toast-${type}`;
    if (toastMessage) toastMessage.textContent = msg;

    if (toastIcon) {
      const iconName = (type === 'success') ? 'check-circle-2' : (type === 'error') ? 'alert-triangle' : 'info';
      toastIcon.setAttribute('data-lucide', iconName);
    }

    if (window.lucide) {
      lucide.createIcons();
    }

    toast.classList.remove('hidden');
    toastTimer = setTimeout(() => {
      toast.classList.add('hidden');
    }, 4000);
  }

  // Language Toggling
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

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const dict = translations[currentLang] || translations.en;
      if (dict[key]) {
        if (dict[key].includes('<span')) {
          el.innerHTML = dict[key];
        } else {
          el.textContent = dict[key];
        }
      }
    });

    updatePageSelectOptions();

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  // Setup High-DPI Canvas
  function setupCanvas() {
    if (!signatureCanvas) return;
    ctx = signatureCanvas.getContext('2d');
    resizeCanvas();

    window.addEventListener('resize', () => {
      // Save content before resize
      if (hasDrawn) {
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = signatureCanvas.width;
        tempCanvas.height = signatureCanvas.height;
        const tempCtx = tempCanvas.getContext('2d');
        tempCtx.drawImage(signatureCanvas, 0, 0);

        resizeCanvas();
        ctx.drawImage(tempCanvas, 0, 0, signatureCanvas.width, signatureCanvas.height);
      } else {
        resizeCanvas();
      }
    });
  }

  function resizeCanvas() {
    if (!signatureCanvas) return;
    const rect = signatureCanvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    signatureCanvas.width = rect.width * dpr;
    signatureCanvas.height = rect.height * dpr;

    ctx.scale(dpr, dpr);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = currentInkColor;
    ctx.lineWidth = currentStrokeWidth;
  }

  // Signature Pad Drawing Logic
  let lastX = 0;
  let lastY = 0;

  function getCanvasCoordinates(e) {
    const rect = signatureCanvas.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  }

  function startDrawing(e) {
    e.preventDefault();
    isDrawing = true;
    hasDrawn = true;
    if (padPlaceholder) padPlaceholder.classList.add('hidden');

    const coords = getCanvasCoordinates(e);
    lastX = coords.x;
    lastY = coords.y;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(lastX + 0.1, lastY + 0.1);
    ctx.strokeStyle = currentInkColor;
    ctx.lineWidth = currentStrokeWidth;
    ctx.stroke();
  }

  function draw(e) {
    if (!isDrawing) return;
    e.preventDefault();

    const coords = getCanvasCoordinates(e);
    const midX = (lastX + coords.x) / 2;
    const midY = (lastY + coords.y) / 2;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.quadraticCurveTo(lastX, lastY, midX, midY);
    ctx.strokeStyle = currentInkColor;
    ctx.lineWidth = currentStrokeWidth;
    ctx.stroke();

    lastX = coords.x;
    lastY = coords.y;
  }

  function stopDrawing(e) {
    if (!isDrawing) return;
    isDrawing = false;
    ctx.closePath();
  }

  // Clear Signature Pad
  function clearSignature() {
    if (!signatureCanvas || !ctx) return;
    const rect = signatureCanvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
    hasDrawn = false;
    confirmedSignatureDataUrl = null;

    if (padPlaceholder) padPlaceholder.classList.remove('hidden');
    if (sigConfirmedBadge) sigConfirmedBadge.classList.add('hidden');
    if (sigPreviewImg) {
      sigPreviewImg.src = '';
      sigPreviewImg.classList.add('hidden');
    }
    if (sigPreviewEmpty) sigPreviewEmpty.classList.remove('hidden');

    showToast('toast_sig_cleared', 'info');
  }

  // Crop Transparent Margins Around Drawn Signature
  function getCroppedSignatureDataUrl() {
    if (!signatureCanvas || !hasDrawn) return null;

    const dpr = window.devicePixelRatio || 1;
    const fullWidth = signatureCanvas.width;
    const fullHeight = signatureCanvas.height;
    const imgData = ctx.getImageData(0, 0, fullWidth, fullHeight);
    const data = imgData.data;

    let minX = fullWidth, minY = fullHeight, maxX = 0, maxY = 0;
    let foundPixel = false;

    for (let y = 0; y < fullHeight; y++) {
      for (let x = 0; x < fullWidth; x++) {
        const alpha = data[(y * fullWidth + x) * 4 + 3];
        if (alpha > 10) {
          foundPixel = true;
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    if (!foundPixel) return null;

    const padding = 12 * dpr;
    minX = Math.max(0, minX - padding);
    minY = Math.max(0, minY - padding);
    maxX = Math.min(fullWidth, maxX + padding);
    maxY = Math.min(fullHeight, maxY + padding);

    const cropWidth = maxX - minX;
    const cropHeight = maxY - minY;

    const cropCanvas = document.createElement('canvas');
    cropCanvas.width = cropWidth;
    cropCanvas.height = cropHeight;
    const cropCtx = cropCanvas.getContext('2d');

    cropCtx.drawImage(signatureCanvas, minX, minY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
    return cropCanvas.toDataURL('image/png');
  }

  // Confirm Signature
  function confirmSignature() {
    if (!hasDrawn) {
      showToast('toast_no_sig', 'error');
      return false;
    }

    const croppedDataUrl = getCroppedSignatureDataUrl();
    if (!croppedDataUrl) {
      showToast('toast_no_sig', 'error');
      return false;
    }

    confirmedSignatureDataUrl = croppedDataUrl;

    if (sigPreviewImg) {
      sigPreviewImg.src = confirmedSignatureDataUrl;
      sigPreviewImg.classList.remove('hidden');
    }
    if (sigPreviewEmpty) sigPreviewEmpty.classList.add('hidden');
    if (sigConfirmedBadge) sigConfirmedBadge.classList.remove('hidden');

    showToast('toast_sig_confirmed', 'success');
    return true;
  }

  // Setup Event Listeners
  function setupEventListeners() {
    if (btnLanguageToggle) {
      btnLanguageToggle.addEventListener('click', toggleLanguage);
    }

    if (btnBrowse) {
      btnBrowse.addEventListener('click', (e) => {
        e.stopPropagation();
        if (fileInput) fileInput.click();
      });
    }

    if (fileInput) {
      fileInput.addEventListener('change', handleFileInput);
    }

    if (btnLoadSample) {
      btnLoadSample.addEventListener('click', (e) => {
        e.stopPropagation();
        loadSampleDocument();
      });
    }

    if (btnChangeFile) {
      btnChangeFile.addEventListener('click', () => {
        if (fileInput) fileInput.value = '';
        currentPdfBytes = null;
        currentPdfDoc = null;
        workspaceSection.classList.add('hidden');
        dropzoneSection.classList.remove('hidden');
        progressCard.classList.add('hidden');
      });
    }

    // Signature Canvas Events (Pointer + Touch + Mouse)
    if (signatureCanvas) {
      signatureCanvas.addEventListener('pointerdown', startDrawing);
      signatureCanvas.addEventListener('pointermove', draw);
      signatureCanvas.addEventListener('pointerup', stopDrawing);
      signatureCanvas.addEventListener('pointercancel', stopDrawing);
      signatureCanvas.addEventListener('pointerleave', stopDrawing);

      signatureCanvas.addEventListener('touchstart', startDrawing, { passive: false });
      signatureCanvas.addEventListener('touchmove', draw, { passive: false });
      signatureCanvas.addEventListener('touchend', stopDrawing, { passive: false });
    }

    if (btnClearSig) {
      btnClearSig.addEventListener('click', clearSignature);
    }

    if (btnConfirmSig) {
      btnConfirmSig.addEventListener('click', confirmSignature);
    }

    // Color Swatches
    colorSwatches.forEach(swatch => {
      swatch.addEventListener('click', () => {
        colorSwatches.forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');
        currentInkColor = swatch.getAttribute('data-color') || '#0f172a';
      });
    });

    // Stroke Width Chips
    strokeChips.forEach(chip => {
      chip.addEventListener('click', () => {
        strokeChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        currentStrokeWidth = parseFloat(chip.getAttribute('data-width')) || 3;
      });
    });

    // Position Chips
    posChips.forEach(chip => {
      chip.addEventListener('click', () => {
        posChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        selectedPosition = chip.getAttribute('data-pos') || 'bottom-right';
      });
    });

    // Scale Slider
    if (sigScaleSlider) {
      sigScaleSlider.addEventListener('input', (e) => {
        const val = e.target.value;
        selectedScale = val / 100;
        if (sigScaleVal) sigScaleVal.textContent = `${val}%`;
      });
    }

    // Download Signed PDF Action
    if (btnDownloadSigned) {
      btnDownloadSigned.addEventListener('click', executePdfSigning);
    }
  }

  // Dropzone Setup
  function setupDropzone() {
    if (!dropzone) return;

    ['dragenter', 'dragover'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.add('drag-active');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.remove('drag-active');
      });
    });

    dropzone.addEventListener('drop', (e) => {
      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        processFile(files[0]);
      }
    });

    dropzone.addEventListener('click', () => {
      if (fileInput) fileInput.click();
    });
  }

  // Handle Input File
  function handleFileInput(e) {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  }

  // Process Uploaded PDF File
  async function processFile(file) {
    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      showToast('toast_error', 'error');
      return;
    }

    currentFileName = file.name;
    const arrayBuffer = await file.arrayBuffer();
    currentPdfBytes = new Uint8Array(arrayBuffer);

    try {
      currentPdfDoc = await PDFLib.PDFDocument.load(currentPdfBytes);
      totalPdfPages = currentPdfDoc.getPageCount();

      if (fileNameDisplay) fileNameDisplay.textContent = currentFileName;
      if (fileStatsDisplay) {
        const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
        fileStatsDisplay.textContent = `${sizeMB} MB • ${totalPdfPages} ${totalPdfPages === 1 ? 'Page' : 'Pages'}`;
      }

      updatePageSelectOptions();

      dropzoneSection.classList.add('hidden');
      workspaceSection.classList.remove('hidden');
      progressCard.classList.add('hidden');

      setTimeout(resizeCanvas, 100);

    } catch (err) {
      console.error("PDF load error:", err);
      showToast('toast_error', 'error');
    }
  }

  // Update Page Selector Dropdown
  function updatePageSelectOptions() {
    if (!pageSelect) return;
    pageSelect.innerHTML = '';

    const isAr = (currentLang === 'ar');
    for (let i = 1; i <= totalPdfPages; i++) {
      const opt = document.createElement('option');
      opt.value = i;
      opt.textContent = isAr ? `الصفحة ${i} من ${totalPdfPages}` : `Page ${i} of ${totalPdfPages}`;
      pageSelect.appendChild(opt);
    }
  }

  // Generate Sample PDF Document
  async function loadSampleDocument() {
    try {
      const pdfDoc = await PDFLib.PDFDocument.create();
      const page = pdfDoc.addPage([595.28, 841.89]); // Standard A4 (points)
      const font = await pdfDoc.embedFont(PDFLib.StandardFonts.HelveticaBold);
      const fontRegular = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);

      // Title & Header Banner
      page.drawRectangle({
        x: 0,
        y: 760,
        width: 595.28,
        height: 81.89,
        color: PDFLib.rgb(0.06, 0.09, 0.16)
      });

      page.drawText("AnnotatePDF Pro • Confidential Service Agreement", {
        x: 40,
        y: 795,
        size: 16,
        font: font,
        color: PDFLib.rgb(0.22, 0.83, 0.97)
      });

      page.drawText("NON-DISCLOSURE & PROPRIETARY RIGHTS AGREEMENT", {
        x: 40,
        y: 700,
        size: 14,
        font: font,
        color: PDFLib.rgb(0.06, 0.09, 0.16)
      });

      const bodyLines = [
        "1. Scope of Agreement: This agreement governs the confidential relationship between the",
        "parties concerning client-side security, zero-knowledge processing, and local computing.",
        "",
        "2. Zero Cloud Transmission: All documents, annotations, signatures, and credentials remain",
        "strictly stored inside the local browser memory and are never uploaded to any external server.",
        "",
        "3. Acknowledgment & Electronic Signature: By signing below, the authorized party accepts",
        "and ratifies all terms of service and client-side processing policies."
      ];

      let yPos = 650;
      bodyLines.forEach(line => {
        if (line) {
          page.drawText(line, {
            x: 40,
            y: yPos,
            size: 11,
            font: fontRegular,
            color: PDFLib.rgb(0.2, 0.25, 0.35)
          });
        }
        yPos -= 22;
      });

      // Signature Box Area Outline
      page.drawRectangle({
        x: 40,
        y: 120,
        width: 515.28,
        height: 140,
        borderColor: PDFLib.rgb(0.8, 0.85, 0.9),
        borderWidth: 1,
        color: PDFLib.rgb(0.98, 0.99, 1.0)
      });

      page.drawText("Authorized Signer Acknowledgement:", {
        x: 55,
        y: 235,
        size: 11,
        font: font,
        color: PDFLib.rgb(0.1, 0.15, 0.25)
      });

      page.drawLine({
        start: { x: 55, y: 155 },
        end: { x: 300, y: 155 },
        thickness: 1,
        color: PDFLib.rgb(0.7, 0.75, 0.8)
      });

      page.drawText("Signer Full Name & Title", {
        x: 55,
        y: 140,
        size: 9,
        font: fontRegular,
        color: PDFLib.rgb(0.5, 0.55, 0.65)
      });

      page.drawLine({
        start: { x: 350, y: 155 },
        end: { x: 520, y: 155 },
        thickness: 1,
        color: PDFLib.rgb(0.7, 0.75, 0.8)
      });

      page.drawText("Date of Execution", {
        x: 350,
        y: 140,
        size: 9,
        font: fontRegular,
        color: PDFLib.rgb(0.5, 0.55, 0.65)
      });

      const samplePdfBytes = await pdfDoc.save();
      currentPdfBytes = samplePdfBytes;
      currentPdfDoc = pdfDoc;
      totalPdfPages = 1;
      currentFileName = "Sample_Service_Agreement.pdf";

      if (fileNameDisplay) fileNameDisplay.textContent = currentFileName;
      if (fileStatsDisplay) fileStatsDisplay.textContent = "Sample PDF Document • 1 Page";

      updatePageSelectOptions();

      dropzoneSection.classList.add('hidden');
      workspaceSection.classList.remove('hidden');
      progressCard.classList.add('hidden');

      setTimeout(resizeCanvas, 100);
      showToast('toast_sample_loaded', 'success');

    } catch (err) {
      console.error("Sample PDF generation error:", err);
      showToast('toast_error', 'error');
    }
  }

  // Execute PDF Signing & Download
  async function executePdfSigning() {
    if (!currentPdfBytes) {
      showToast('toast_no_file', 'error');
      return;
    }

    if (!confirmedSignatureDataUrl) {
      const confirmed = confirmSignature();
      if (!confirmed) return;
    }

    btnDownloadSigned.disabled = true;
    progressCard.classList.remove('hidden');
    updateProgressUI(20, 'sign_status_processing');

    try {
      // 1. Convert Data URL to Uint8Array
      const response = await fetch(confirmedSignatureDataUrl);
      const signatureImageBytes = await response.arrayBuffer();

      updateProgressUI(40, 'sign_status_processing');

      // 2. Load PDF with PDFLib
      const pdfDoc = await PDFLib.PDFDocument.load(currentPdfBytes);
      const signatureImage = await pdfDoc.embedPng(signatureImageBytes);

      updateProgressUI(60, 'sign_status_processing');

      // 3. Target Page
      const selectedPageNum = parseInt(pageSelect ? pageSelect.value : "1", 10) || 1;
      const targetPageIndex = Math.min(Math.max(selectedPageNum - 1, 0), pdfDoc.getPageCount() - 1);
      const page = pdfDoc.getPage(targetPageIndex);

      const pageWidth = page.getWidth();
      const pageHeight = page.getHeight();

      // 4. Calculate Signature Stamp Dimensions
      const baseWidth = 150 * selectedScale;
      const imgDims = signatureImage.scaleToFit(baseWidth, baseWidth * 0.7);
      const sigWidth = imgDims.width;
      const sigHeight = imgDims.height;

      // 5. Calculate (X, Y) Coordinates (0,0 is bottom-left in PDF)
      const padding = 45;
      let x = 0;
      let y = 0;

      switch (selectedPosition) {
        case 'bottom-right':
          x = pageWidth - sigWidth - padding;
          y = padding;
          break;
        case 'bottom-left':
          x = padding;
          y = padding;
          break;
        case 'bottom-center':
          x = (pageWidth - sigWidth) / 2;
          y = padding;
          break;
        case 'top-right':
          x = pageWidth - sigWidth - padding;
          y = pageHeight - sigHeight - padding;
          break;
        case 'top-left':
          x = padding;
          y = pageHeight - sigHeight - padding;
          break;
        case 'center':
          x = (pageWidth - sigWidth) / 2;
          y = (pageHeight - sigHeight) / 2;
          break;
        default:
          x = pageWidth - sigWidth - padding;
          y = padding;
      }

      // 6. Draw Signature on Page
      page.drawImage(signatureImage, {
        x: x,
        y: y,
        width: sigWidth,
        height: sigHeight
      });

      updateProgressUI(85, 'sign_status_processing');

      // 7. Save PDF & Download
      const modifiedPdfBytes = await pdfDoc.save();
      const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
      const downloadUrl = URL.createObjectURL(blob);

      const downloadLink = document.createElement('a');
      const baseName = currentFileName.replace(/\.[^/.]+$/, "");
      downloadLink.href = downloadUrl;
      downloadLink.download = `${baseName}_signed.pdf`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(downloadUrl);

      updateProgressUI(100, 'sign_status_done');

      setTimeout(() => {
        progressCard.classList.add('hidden');
        btnDownloadSigned.disabled = false;
        showToast('toast_signed_success', 'success');
      }, 600);

    } catch (err) {
      console.error("PDF signing error:", err);
      progressCard.classList.add('hidden');
      btnDownloadSigned.disabled = false;
      showToast('toast_error', 'error');
    }
  }

  function updateProgressUI(percent, statusKey) {
    const boundedPercent = Math.min(Math.max(percent, 0), 100);
    if (signProgressPercent) signProgressPercent.textContent = `${boundedPercent}%`;
    if (signProgressFill) signProgressFill.style.width = `${boundedPercent}%`;
    if (signStatusMessage) {
      const dict = translations[currentLang] || translations.en;
      signStatusMessage.textContent = dict[statusKey] || statusKey;
    }
  }

  // Cookie Consent Banner Setup
  function setupCookieBanner() {
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

  // Initialize on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
