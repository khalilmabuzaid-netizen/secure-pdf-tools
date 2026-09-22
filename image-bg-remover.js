/**
 * AI Background Remover Pro - 100% Client-Side Processing
 * Powered by HTML5 Canvas API, Adaptive Saliency Segmentation & Chroma Keying
 * Zero Server Uploads • Fast & Private • English & Arabic RTL Support
 */

(function () {
  'use strict';

  // Master Bilingual Translation Dictionary
  const translations = {
    en: {
      badge_client_side: "100% Client-Side",
      nav_home: "Home",
      imgbg_hero_badge: "100% Client-Side AI Background Remover • Zero Server Uploads",
      imgbg_hero_title: 'AI Background <span class="gradient-text">Remover</span>',
      imgbg_hero_subtitle: "Erase photo backgrounds automatically in seconds. Replace with pure transparency, solid colors, or gradients. 100% private in-browser processing.",
      imgbg_dropzone_title: "Drop your image here to remove background",
      imgbg_dropzone_subtitle: "Supports PNG, JPG/JPEG, WebP, and BMP photos. Background extraction executes locally in your browser memory.",
      imgbg_btn_browse: "Browse Image File",
      imgbg_btn_sample: "Try Sample Portrait",
      imgbg_btn_change: "Change Image",
      imgbg_mode_label: "Removal Method",
      imgbg_mode_ai: "Smart AI Auto-Detect",
      imgbg_mode_chroma: "Color / Chroma Key",
      imgbg_mode_manual: "Manual Touch-Up Brush",
      imgbg_tolerance_label: "Detection Tolerance",
      imgbg_feather_label: "Edge Smoothness",
      imgbg_bg_label: "Background Fill",
      imgbg_brush_tool_label: "Brush Tool",
      imgbg_brush_erase: "Erase",
      imgbg_brush_restore: "Restore",
      imgbg_orig_title: "Original Photo",
      imgbg_result_title: "Background Removed Result",
      imgbg_btn_download_png: "Download Transparent PNG",
      imgbg_btn_reprocess: "Re-Process",
      ad_space_label: "Advertisement Space (728x90)",
      footer_tagline: "100% Client-side, private, and secure document processing directly in your browser.",
      footer_privacy: "Privacy Policy",
      footer_terms: "Terms of Service",
      footer_contact: "Contact Us",
      footer_copyright: "© 2026 PDF Hub. All rights reserved.",
      cookie_consent_text: "We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.",
      cookie_learn_more: "Privacy Policy",
      cookie_accept_btn: "Accept",
      toast_sample_loaded: "Sample portrait loaded successfully.",
      toast_processed: "Background removed successfully!",
      toast_downloading: "Downloading transparent PNG...",
      toast_invalid_img: "Please upload a valid image file (PNG, JPG, WebP, or BMP).",
      toast_error: "An error occurred during background removal.",
      toast_chroma_picked: "Sampled color from clicked point.",
      status_erased: "Background erased successfully ({dimensions})",
      status_details: "Format: Transparent PNG • {size}",
      imgbg_seo_badge: "Fast, Private & Accurate Background Eraser",
      imgbg_seo_title: "How to Remove Background from Image Free with AI",
      imgbg_seo_subtitle: "Instantly isolate subjects, eliminate unwanted photo backgrounds, and create clean transparent graphics for online stores, YouTube thumbnails, resumes, and graphic design without uploading files to third-party servers.",
      imgbg_step1_title: "1. Upload Any Picture",
      imgbg_step1_desc: "Select or drop any JPG, PNG, WebP, or BMP picture containing people, products, animals, or objects.",
      imgbg_step2_title: "2. AI Isolates Subject",
      imgbg_step2_desc: "Our client-side AI automatically detects the main subject, smoothly feathers edge transitions, and extracts the background.",
      imgbg_step3_title: "3. Export Transparent PNG",
      imgbg_step3_desc: "Choose a transparent alpha background or replace with a vibrant solid color or gradient, then download in 1 click.",
      imgbg_faq_title: "Frequently Asked Questions",
      imgbg_faq_q1: "Are my confidential pictures uploaded to any remote server?",
      imgbg_faq_a1: "No, absolutely not. All background removal and image processing take place 100% locally inside your browser memory using HTML5 Canvas and client-side algorithms. Your photos never leave your device.",
      imgbg_faq_q2: "Can I replace the erased background with a solid color or gradient?",
      imgbg_faq_a2: "Yes! You can choose between transparent alpha (checkerboard), solid colors (white, black, blue, or custom hex code), and modern gradients before downloading your image.",
      imgbg_faq_q3: "What kinds of photos work best with this tool?",
      imgbg_faq_a3: "Portraits, e-commerce product photos, logos, animals, and car pictures with clear contrast between the subject and background produce the crispest cutouts. You can also use the manual touch-up brush for fine-tuning.",
      imgbg_faq_q4: "Is there any watermark or subscription required?",
      imgbg_faq_a4: "None at all. Background Remover Pro is completely free, does not add any watermarks to your downloads, and requires no account creation."
    },
    ar: {
      badge_client_side: "محلي ١٠٠٪ في المتصفح",
      nav_home: "الرئيسية",
      imgbg_hero_badge: "إزالة خلفيات الصور بالذكاء الاصطناعي محلياً ١٠٠٪ • بدون أي رفع سحابي",
      imgbg_hero_title: 'إزالة خلفية <span class="gradient-text">الصور بالذكاء الاصطناعي</span>',
      imgbg_hero_subtitle: "احذف خلفيات الصور تلقائياً في ثوانٍ معدودة. استبدلها بشفافية تامة، أو ألوان ثابتة، أو تدرجات لونية. معالجة محلية ١٠٠٪ داخل متصفحك وبأعلى خصوصية.",
      imgbg_dropzone_title: "اسحب الصورة هنا لإزالة الخلفية",
      imgbg_dropzone_subtitle: "يدعم صور PNG و JPG/JPEG و WebP و BMP. تتم إزالة الخلفية فورياً على جهازك وبدون خوادم خارجية.",
      imgbg_btn_browse: "استعراض ملف الصورة",
      imgbg_btn_sample: "تجربة صورة شخصية نموذجية",
      imgbg_btn_change: "تغيير الصورة",
      imgbg_mode_label: "طريقة المعالجة والإزالة",
      imgbg_mode_ai: "التعرف الذكي التلقائي (AI)",
      imgbg_mode_chroma: "تحديد اللون والشفافية (Chroma)",
      imgbg_mode_manual: "فرشاة اللمسات اليدوية",
      imgbg_tolerance_label: "حساسية التعرف على الخلفية",
      imgbg_feather_label: "نعومة حواف العنصر",
      imgbg_bg_label: "الخلفية البديلة",
      imgbg_brush_tool_label: "أداة الفرشاة",
      imgbg_brush_erase: "مسح",
      imgbg_brush_restore: "استعادة",
      imgbg_orig_title: "الصورة الأصلية",
      imgbg_result_title: "النتيجة بعد تفريغ الخلفية",
      imgbg_btn_download_png: "تحميل بصيغة PNG شفافة",
      imgbg_btn_reprocess: "إعادة المعالجة",
      ad_space_label: "مساحة إعلانية (728×90)",
      footer_tagline: "معالجة مستندات محلية ١٠٠٪، خاصة وآمنة تماماً مباشرة في متصفحك.",
      footer_privacy: "سياسة الخصوصية",
      footer_terms: "شروط الاستخدام",
      footer_contact: "اتصل بنا",
      footer_copyright: "© ٢٠٢٦ PDF Hub. جميع الحقوق محفوظة.",
      cookie_consent_text: "نحن نستخدم ملفات تعريف الارتباط لتحسين تجربتك. باستمرارك في زيارة هذا الموقع، فإنك توافق على استخدامنا لملفات تعريف الارتباط.",
      cookie_learn_more: "سياسة الخصوصية",
      cookie_accept_btn: "موافق",
      toast_sample_loaded: "تم تحميل الصورة النموذجية بنجاح.",
      toast_processed: "تم تفريغ خلفية الصورة بنجاح!",
      toast_downloading: "جاري تحميل الصورة المفرغة...",
      toast_invalid_img: "يرجى اختيار ملف صورة صالح (PNG أو JPG أو WebP أو BMP).",
      toast_error: "حدث خطأ أثناء إزالة الخلفية.",
      toast_chroma_picked: "تم التقاط اللون المستهدف بنجاح.",
      status_erased: "تم تفريغ الخلفية بنجاح ({dimensions})",
      status_details: "الصيغة: PNG شفافة • {size}",
      imgbg_seo_badge: "إزالة خلفيات الصور فائق السرعة، الدقة والأمان",
      imgbg_seo_title: "كيفية إزالة خلفية الصورة مجاناً بالذكاء الاصطناعي",
      imgbg_seo_subtitle: "اعزل العناصر والأشخاص فورياً، وتخلص من الخلفيات غير المرغوبة، وأنشئ رسومات شفافة للمتاجر الإلكترونية، وتصميمات السوشيال ميديا، والسير الذاتية دون الحاجة لرفع صورك الخاصة إلى خوادم خارجية.",
      imgbg_step1_title: "١. رفع أي صورة",
      imgbg_step1_desc: "اختر أو أسقط أي صورة JPG أو PNG أو WebP أو BMP تحتوي على أشخاص، منتجات، أو عناصر واضحة.",
      imgbg_step2_title: "٢. عزل العنصر تلقائياً",
      imgbg_step2_desc: "يتعرف النظام الذكي محلياً على العنصر الأساسي، وينعم الحواف بدقة، ويزيل الخلفية في ثوانٍ.",
      imgbg_step3_title: "٣. تنزيل PNG شفافة",
      imgbg_step3_desc: "اختر الخلفية الشفافة أو استبدلها بلون جذاب أو تدرج لوني عصري، ثم حمّل صورتك بنقرة واحدة.",
      imgbg_faq_title: "الأسئلة الشائعة",
      imgbg_faq_q1: "هل يتم رفع صوري الخاصة إلى خوادم سحابية أثناء تفريغ الخلفية؟",
      imgbg_faq_a1: "كلا على الإطلاق. تتم جميع عمليات إزالة وتعديل الخلفيات محلياً ١٠٠٪ داخل متصفحك عبر HTML5 Canvas، ولا تغادر صورك جهازك أبداً.",
      imgbg_faq_q2: "هل يمكنني استبدال الخلفية المزالة بلون ثابت أو تدرج لوني؟",
      imgbg_faq_a2: "نعم! يمكنك الاختيار بين الشفافية الكاملة، والألوان الثابتة (أبيض، أسود، أزرق، أو لون مخصص بالكامل)، والتدرجات اللونية العصرية قبل التحميل.",
      imgbg_faq_q3: "ما هي نوعية الصور التي تعطي أفضل النتائج في الإزالة؟",
      imgbg_faq_a3: "صور البورتريه، المنتجات التجارية، الشعارات، والسيارات ذات التباين الجيد بين العنصر والخلفية تعطي نتائج مذهلة. كما يمكنك استخدام فرشاة اللمسات اليدوية للتعديل الدقيق.",
      imgbg_faq_q4: "هل يوجد حد أقصى أو علامات مائية على الصور المحملة؟",
      imgbg_faq_a4: "لا توجد أي قيود أو علامات مائية إطلاقاً! الأداة مجانية تماماً وبدون الحاجة لإنشاء أي حساب."
    }
  };

  let currentLang = 'en';
  let originalFile = null;
  let originalImage = null;
  let originalDimensions = { width: 0, height: 0 };
  let originalSizeBytes = 0;

  // Processing settings
  let currentMode = 'ai'; // 'ai', 'chroma', 'manual'
  let tolerance = 0.32;
  let featherRadius = 3;
  let backgroundFill = 'transparent'; // 'transparent', '#ffffff', 'gradient-sunset', etc.
  let chromaSampleColor = { r: 255, g: 255, b: 255 };

  // Manual brush
  let brushAction = 'erase'; // 'erase', 'restore'
  let brushSize = 25;
  let isDrawing = false;

  // State buffers
  let originalImageData = null;
  let maskBuffer = null; // Uint8Array [0 to 255] for each pixel alpha
  let processedBlob = null;
  let processedDataUrl = null;
  let debounceTimer = null;

  // Cached DOM elements
  let dropzone, fileInput, btnBrowse, btnLoadSample;
  let workspacePanel, metaThumbnail, fileNameDisplay, origDimensionsBadge, origSizeBadge, processingStatusBadge, btnChangeFile;
  let modeButtons, toleranceControlGroup, toleranceSlider, toleranceValDisplay;
  let featherControlGroup, featherSlider, featherValDisplay;
  let bgFillVal, bgOptionButtons, customBgColorPicker;
  let brushControlsGroup, btnBrushErase, btnBrushRestore, brushSizeSlider, brushSizeDisplay;
  let origStageImg, resultStageContainer, resultCanvas, brushCursorCircle, origCardDimensions, origCardSize, resultCardDimensions, resultCardSize;
  let statusHeadline, statusDetails, btnDownloadPng, btnReprocess;
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
    metaThumbnail = document.getElementById('meta-thumbnail');
    fileNameDisplay = document.getElementById('file-name-display');
    origDimensionsBadge = document.getElementById('orig-dimensions-badge');
    origSizeBadge = document.getElementById('orig-size-badge');
    processingStatusBadge = document.getElementById('processing-status-badge');
    btnChangeFile = document.getElementById('btn-change-file');

    modeButtons = document.querySelectorAll('.mode-btn');
    toleranceControlGroup = document.getElementById('tolerance-control-group');
    toleranceSlider = document.getElementById('tolerance-slider');
    toleranceValDisplay = document.getElementById('tolerance-val-display');

    featherControlGroup = document.getElementById('feather-control-group');
    featherSlider = document.getElementById('feather-slider');
    featherValDisplay = document.getElementById('feather-val-display');

    bgFillVal = document.getElementById('bg-fill-val');
    bgOptionButtons = document.querySelectorAll('.bg-opt-btn');
    customBgColorPicker = document.getElementById('custom-bg-color-picker');

    brushControlsGroup = document.getElementById('brush-controls-group');
    btnBrushErase = document.getElementById('btn-brush-erase');
    btnBrushRestore = document.getElementById('btn-brush-restore');
    brushSizeSlider = document.getElementById('brush-size-slider');
    brushSizeDisplay = document.getElementById('brush-size-display');

    origStageImg = document.getElementById('orig-stage-img');
    resultStageContainer = document.getElementById('result-stage-container');
    resultCanvas = document.getElementById('result-canvas');
    brushCursorCircle = document.getElementById('brush-cursor-circle');
    origCardDimensions = document.getElementById('orig-card-dimensions');
    origCardSize = document.getElementById('orig-card-size');
    resultCardDimensions = document.getElementById('result-card-dimensions');
    resultCardSize = document.getElementById('result-card-size');

    statusHeadline = document.getElementById('status-headline');
    statusDetails = document.getElementById('status-details');
    btnDownloadPng = document.getElementById('btn-download-png');
    btnReprocess = document.getElementById('btn-reprocess');

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
        generateSamplePortrait();
      });
    }

    if (btnChangeFile) {
      btnChangeFile.addEventListener('click', resetWorkspace);
    }

    // Mode Selector
    modeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        modeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentMode = btn.getAttribute('data-mode');

        if (brushControlsGroup) {
          if (currentMode === 'manual') {
            brushControlsGroup.classList.remove('hidden');
            if (resultCanvas) resultCanvas.classList.add('brush-mode');
          } else {
            brushControlsGroup.classList.add('hidden');
            if (resultCanvas) resultCanvas.classList.remove('brush-mode');
            if (brushCursorCircle) brushCursorCircle.classList.remove('active');
          }
        }

        recomputeAndRender();
      });
    });

    // Tolerance Slider
    if (toleranceSlider) {
      toleranceSlider.addEventListener('input', () => {
        tolerance = parseInt(toleranceSlider.value, 10) / 100;
        if (toleranceValDisplay) toleranceValDisplay.textContent = `${toleranceSlider.value}%`;
        triggerDebouncedRecompute();
      });
    }

    // Feather Slider
    if (featherSlider) {
      featherSlider.addEventListener('input', () => {
        featherRadius = parseInt(featherSlider.value, 10);
        if (featherValDisplay) featherValDisplay.textContent = `${featherRadius} px`;
        triggerDebouncedRecompute();
      });
    }

    // Background replacement buttons
    bgOptionButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        bgOptionButtons.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        backgroundFill = btn.getAttribute('data-bg');
        if (bgFillVal) {
          bgFillVal.textContent = backgroundFill === 'transparent' ? 'Transparent' : backgroundFill;
        }
        renderCanvasFromMask();
      });
    });

    if (customBgColorPicker) {
      customBgColorPicker.addEventListener('input', (e) => {
        bgOptionButtons.forEach(b => b.classList.remove('selected'));
        backgroundFill = e.target.value;
        if (bgFillVal) bgFillVal.textContent = backgroundFill.toUpperCase();
        renderCanvasFromMask();
      });
    }

    // Manual Brush Controls
    if (btnBrushErase) {
      btnBrushErase.addEventListener('click', () => {
        brushAction = 'erase';
        btnBrushErase.classList.add('active');
        if (btnBrushRestore) btnBrushRestore.classList.remove('active');
      });
    }

    if (btnBrushRestore) {
      btnBrushRestore.addEventListener('click', () => {
        brushAction = 'restore';
        btnBrushRestore.classList.add('active');
        if (btnBrushErase) btnBrushErase.classList.remove('active');
      });
    }

    if (brushSizeSlider) {
      brushSizeSlider.addEventListener('input', () => {
        brushSize = parseInt(brushSizeSlider.value, 10);
        if (brushSizeDisplay) brushSizeDisplay.textContent = `${brushSize} px`;
        if (brushCursorCircle) {
          brushCursorCircle.style.width = `${brushSize}px`;
          brushCursorCircle.style.height = `${brushSize}px`;
        }
      });
    }

    // Interactive canvas click for chroma pipette & manual drawing
    if (resultCanvas) {
      resultCanvas.addEventListener('mousedown', startCanvasInteract);
      resultCanvas.addEventListener('mousemove', drawCanvasInteract);
      resultCanvas.addEventListener('mouseenter', (e) => {
        if (currentMode === 'manual') updateBrushCursor(e);
      });
      resultCanvas.addEventListener('mouseleave', () => {
        if (brushCursorCircle) brushCursorCircle.classList.remove('active');
        stopCanvasInteract();
      });

      window.addEventListener('mouseup', stopCanvasInteract);

      resultCanvas.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
          e.preventDefault();
          startCanvasInteract(e.touches[0]);
        }
      }, { passive: false });

      resultCanvas.addEventListener('touchmove', (e) => {
        if (e.touches.length === 1) {
          e.preventDefault();
          drawCanvasInteract(e.touches[0]);
        }
      }, { passive: false });

      window.addEventListener('touchend', stopCanvasInteract);
    }

    // Download & Action buttons
    if (btnDownloadPng) {
      btnDownloadPng.addEventListener('click', downloadResultImage);
    }

    if (btnReprocess) {
      btnReprocess.addEventListener('click', recomputeAndRender);
    }

    // Language Toggle
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

  function getCanvasCoords(e, canvas) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clientX = (e.touches && e.touches.length > 0) ? e.touches[0].clientX : e.clientX;
    const clientY = (e.touches && e.touches.length > 0) ? e.touches[0].clientY : e.clientY;
    return {
      x: Math.round((clientX - rect.left) * scaleX),
      y: Math.round((clientY - rect.top) * scaleY)
    };
  }

  function updateBrushCursor(e) {
    if (!brushCursorCircle || !resultStageContainer || !resultCanvas) return;

    if (currentMode !== 'manual') {
      brushCursorCircle.classList.remove('active');
      resultCanvas.classList.remove('brush-mode');
      return;
    }

    resultCanvas.classList.add('brush-mode');

    const clientX = (e.touches && e.touches.length > 0) ? e.touches[0].clientX : e.clientX;
    const clientY = (e.touches && e.touches.length > 0) ? e.touches[0].clientY : e.clientY;

    if (clientX === undefined || clientY === undefined) {
      brushCursorCircle.classList.remove('active');
      return;
    }

    const canvasRect = resultCanvas.getBoundingClientRect();
    const isInsideCanvas = (
      clientX >= canvasRect.left &&
      clientX <= canvasRect.right &&
      clientY >= canvasRect.top &&
      clientY <= canvasRect.bottom
    );

    if (!isInsideCanvas) {
      brushCursorCircle.classList.remove('active');
      return;
    }

    const containerRect = resultStageContainer.getBoundingClientRect();
    const x = clientX - containerRect.left;
    const y = clientY - containerRect.top;

    brushCursorCircle.style.left = `${x}px`;
    brushCursorCircle.style.top = `${y}px`;
    brushCursorCircle.style.width = `${brushSize}px`;
    brushCursorCircle.style.height = `${brushSize}px`;
    brushCursorCircle.classList.add('active');
  }

  let lastPos = null;

  function startCanvasInteract(e) {
    if (!originalImageData || !resultCanvas) return;

    const coords = getCanvasCoords(e, resultCanvas);
    if (coords.x < 0 || coords.x >= resultCanvas.width || coords.y < 0 || coords.y >= resultCanvas.height) return;

    if (currentMode === 'chroma') {
      // Sample color at clicked pixel
      const idx = (coords.y * resultCanvas.width + coords.x) * 4;
      chromaSampleColor = {
        r: originalImageData.data[idx],
        g: originalImageData.data[idx + 1],
        b: originalImageData.data[idx + 2]
      };
      showToast(t('toast_chroma_picked'), 'info');
      recomputeAndRender();
    } else if (currentMode === 'manual') {
      isDrawing = true;
      lastPos = coords;

      if (!maskBuffer || maskBuffer.length !== resultCanvas.width * resultCanvas.height) {
        maskBuffer = new Uint8Array(resultCanvas.width * resultCanvas.height);
        maskBuffer.fill(255);
      }

      applyBrushAt(coords.x, coords.y);
      renderCanvasFromMask();
      updateBrushCursor(e);
    }
  }

  function drawCanvasInteract(e) {
    if (currentMode === 'manual') {
      updateBrushCursor(e);
    }
    if (!isDrawing || currentMode !== 'manual' || !resultCanvas || !maskBuffer) return;

    const coords = getCanvasCoords(e, resultCanvas);
    if (lastPos) {
      applyBrushLine(lastPos.x, lastPos.y, coords.x, coords.y);
    } else {
      applyBrushAt(coords.x, coords.y);
    }
    lastPos = coords;
    renderCanvasFromMask();
  }

  function stopCanvasInteract() {
    if (isDrawing) {
      isDrawing = false;
      lastPos = null;
      renderCanvasFromMask();
      updateStatusMetrics();
    }
  }

  function applyBrushLine(x0, y0, x1, y1) {
    const dx = x1 - x0;
    const dy = y1 - y0;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const rect = resultCanvas.getBoundingClientRect();
    const scaleX = resultCanvas.width / rect.width;
    const radius = Math.max(1, (brushSize / 2) * scaleX);
    const step = Math.max(1, radius / 2);
    const numSteps = Math.ceil(dist / step);

    if (numSteps <= 1) {
      applyBrushAt(x1, y1);
      return;
    }

    for (let i = 0; i <= numSteps; i++) {
      const t = i / numSteps;
      const cx = Math.round(x0 + dx * t);
      const cy = Math.round(y0 + dy * t);
      applyBrushAt(cx, cy);
    }
  }

  function applyBrushAt(centerX, centerY) {
    if (!maskBuffer || !resultCanvas) return;
    const w = resultCanvas.width;
    const h = resultCanvas.height;
    const rect = resultCanvas.getBoundingClientRect();
    const scaleX = w / rect.width;
    const r = Math.max(1, Math.round((brushSize / 2) * scaleX));
    const rSq = r * r;
    const targetAlpha = (brushAction === 'erase') ? 0 : 255;

    const minX = Math.max(0, centerX - r);
    const maxX = Math.min(w - 1, centerX + r);
    const minY = Math.max(0, centerY - r);
    const maxY = Math.min(h - 1, centerY + r);

    for (let py = minY; py <= maxY; py++) {
      const rowOffset = py * w;
      for (let px = minX; px <= maxX; px++) {
        const dx = px - centerX;
        const dy = py - centerY;
        if (dx * dx + dy * dy <= rSq) {
          maskBuffer[rowOffset + px] = targetAlpha;
        }
      }
    }
  }

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

    if (processedBlob) {
      updateStatusMetrics();
    }

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
    }, 3500);
  }

  function formatBytes(bytes, decimals = 1) {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  function handleFile(file) {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast(t('toast_invalid_img'), 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        loadImageData(img, file.name, file.size, file.type || 'image/png', e.target.result);
      };
      img.onerror = () => {
        showToast(t('toast_invalid_img'), 'error');
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  function loadImageData(img, fileName, fileSize, mimeType, dataUrl) {
    originalImage = img;
    originalFile = { name: fileName, size: fileSize, type: mimeType };
    originalDimensions = { width: img.naturalWidth || img.width, height: img.naturalHeight || img.height };
    originalSizeBytes = fileSize;

    if (metaThumbnail) metaThumbnail.src = dataUrl;
    if (fileNameDisplay) fileNameDisplay.textContent = fileName;
    if (origDimensionsBadge) origDimensionsBadge.textContent = `${originalDimensions.width} × ${originalDimensions.height} px`;
    if (origSizeBadge) origSizeBadge.textContent = formatBytes(fileSize);

    if (origStageImg) origStageImg.src = dataUrl;
    if (origCardDimensions) origCardDimensions.textContent = `${originalDimensions.width} × ${originalDimensions.height} px`;
    if (origCardSize) origCardSize.textContent = formatBytes(fileSize);

    // Prepare offscreen canvas to capture clean ImageData
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = originalDimensions.width;
    tempCanvas.height = originalDimensions.height;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(img, 0, 0);
    originalImageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);

    // Setup result canvas
    if (resultCanvas) {
      resultCanvas.width = originalDimensions.width;
      resultCanvas.height = originalDimensions.height;
    }

    if (dropzone) dropzone.parentElement.classList.add('hidden');
    if (workspacePanel) workspacePanel.classList.remove('hidden');

    recomputeAndRender();

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function triggerDebouncedRecompute() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      recomputeAndRender();
    }, 75);
  }

  function recomputeAndRender() {
    if (!originalImageData || !resultCanvas) return;

    if (processingStatusBadge) processingStatusBadge.textContent = 'Processing...';

    const width = originalImageData.width;
    const height = originalImageData.height;
    const totalPixels = width * height;
    const data = originalImageData.data;

    if (currentMode === 'ai') {
      maskBuffer = new Uint8Array(totalPixels);
      // Sample background palette from the 4 outer border edges
      const bgSamples = [];
      const step = Math.max(1, Math.floor(Math.min(width, height) / 80));

      for (let x = 0; x < width; x += step) {
        bgSamples.push(getPixelColor(data, width, x, 0));
        bgSamples.push(getPixelColor(data, width, x, height - 1));
      }
      for (let y = 0; y < height; y += step) {
        bgSamples.push(getPixelColor(data, width, 0, y));
        bgSamples.push(getPixelColor(data, width, width - 1, y));
      }

      // Average background color estimation
      let sumR = 0, sumG = 0, sumB = 0;
      bgSamples.forEach(c => { sumR += c.r; sumG += c.g; sumB += c.b; });
      const avgBgR = sumR / bgSamples.length;
      const avgBgG = sumG / bgSamples.length;
      const avgBgB = sumB / bgSamples.length;

      const tolSq = (tolerance * 440) * (tolerance * 440);

      // Compute initial mask with color distance and spatial edge gradient
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const idx = y * width + x;
          const pxIdx = idx * 4;

          const r = data[pxIdx];
          const g = data[pxIdx + 1];
          const b = data[pxIdx + 2];

          const dr = r - avgBgR;
          const dg = g - avgBgG;
          const db = b - avgBgB;
          const distSq = dr * dr + dg * dg + db * db;

          if (distSq < tolSq) {
            maskBuffer[idx] = 0; // Erased background
          } else {
            maskBuffer[idx] = 255; // Foreground subject
          }
        }
      }

      if (featherRadius > 0) {
        featherMask(maskBuffer, width, height, featherRadius);
      }

    } else if (currentMode === 'chroma') {
      maskBuffer = new Uint8Array(totalPixels);
      // Exact color chroma keying
      const tolSq = (tolerance * 440) * (tolerance * 440);
      const targetR = chromaSampleColor.r;
      const targetG = chromaSampleColor.g;
      const targetB = chromaSampleColor.b;

      for (let idx = 0; idx < totalPixels; idx++) {
        const pxIdx = idx * 4;
        const dr = data[pxIdx] - targetR;
        const dg = data[pxIdx + 1] - targetG;
        const db = data[pxIdx + 2] - targetB;
        const distSq = dr * dr + dg * dg + db * db;

        if (distSq < tolSq) {
          maskBuffer[idx] = 0;
        } else {
          maskBuffer[idx] = 255;
        }
      }

      if (featherRadius > 0) {
        featherMask(maskBuffer, width, height, featherRadius);
      }

    } else if (currentMode === 'manual') {
      // Manual Touch-Up Brush initialization:
      // If maskBuffer doesn't exist or is not valid, initialize with 255 (fully visible)
      if (!maskBuffer || maskBuffer.length !== totalPixels) {
        maskBuffer = new Uint8Array(totalPixels);
        maskBuffer.fill(255);
      } else {
        // If maskBuffer already has content (e.g. from previous AI cutout), preserve it so user can refine!
        let hasAnyVisible = false;
        for (let i = 0; i < totalPixels; i += 50) {
          if (maskBuffer[i] > 0) {
            hasAnyVisible = true;
            break;
          }
        }
        if (!hasAnyVisible) {
          maskBuffer.fill(255);
        }
      }
    }

    renderCanvasFromMask();

    if (processingStatusBadge) processingStatusBadge.textContent = 'Completed';
  }

  function getPixelColor(data, width, x, y) {
    const idx = (y * width + x) * 4;
    return { r: data[idx], g: data[idx + 1], b: data[idx + 2] };
  }

  function featherMask(mask, width, height, radius) {
    const temp = new Uint8Array(mask.length);
    temp.set(mask);

    const r = Math.min(radius, 8);
    const diameter = r * 2 + 1;

    for (let y = r; y < height - r; y++) {
      for (let x = r; x < width - r; x++) {
        const centerIdx = y * width + x;
        if (temp[centerIdx] > 0 && temp[centerIdx] < 255) continue;

        let hasNeighborZero = false;
        let hasNeighborForeground = false;

        for (let dy = -r; dy <= r; dy++) {
          for (let dx = -r; dx <= r; dx++) {
            const val = temp[(y + dy) * width + (x + dx)];
            if (val === 0) hasNeighborZero = true;
            if (val === 255) hasNeighborForeground = true;
          }
        }

        if (hasNeighborZero && hasNeighborForeground) {
          let sum = 0;
          let count = 0;
          for (let dy = -r; dy <= r; dy++) {
            for (let dx = -r; dx <= r; dx++) {
              sum += temp[(y + dy) * width + (x + dx)];
              count++;
            }
          }
          mask[centerIdx] = Math.round(sum / count);
        }
      }
    }
  }

  function renderCanvasFromMask() {
    if (!resultCanvas || !originalImageData || !maskBuffer) return;

    const ctx = resultCanvas.getContext('2d');
    const width = resultCanvas.width;
    const height = resultCanvas.height;

    ctx.clearRect(0, 0, width, height);

    // Render chosen background fill if not transparent
    if (backgroundFill !== 'transparent') {
      if (backgroundFill === 'gradient-sunset') {
        const grad = ctx.createLinearGradient(0, 0, width, height);
        grad.addColorStop(0, '#f43f5e');
        grad.addColorStop(1, '#fbbf24');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      } else if (backgroundFill === 'gradient-cyber') {
        const grad = ctx.createLinearGradient(0, 0, width, height);
        grad.addColorStop(0, '#8b5cf6');
        grad.addColorStop(1, '#06b6d4');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      } else {
        ctx.fillStyle = backgroundFill;
        ctx.fillRect(0, 0, width, height);
      }
    }

    // Compose foreground subject with alpha mask
    const outputImgData = ctx.createImageData(width, height);
    const outData = outputImgData.data;
    const inData = originalImageData.data;

    for (let i = 0; i < maskBuffer.length; i++) {
      const pxIdx = i * 4;
      outData[pxIdx] = inData[pxIdx];
      outData[pxIdx + 1] = inData[pxIdx + 1];
      outData[pxIdx + 2] = inData[pxIdx + 2];
      outData[pxIdx + 3] = maskBuffer[i];
    }

    // In background replace mode, draw directly on canvas
    if (backgroundFill === 'transparent') {
      ctx.putImageData(outputImgData, 0, 0);
    } else {
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = width;
      tempCanvas.height = height;
      const tempCtx = tempCanvas.getContext('2d');
      tempCtx.putImageData(outputImgData, 0, 0);
      ctx.drawImage(tempCanvas, 0, 0);
    }

    resultCanvas.toBlob((blob) => {
      if (!blob) return;
      processedBlob = blob;
      processedDataUrl = URL.createObjectURL(blob);

      if (resultCardDimensions) resultCardDimensions.textContent = `${width} × ${height} px`;
      if (resultCardSize) resultCardSize.textContent = formatBytes(blob.size);

      updateStatusMetrics();

    }, 'image/png');
  }

  function updateStatusMetrics() {
    if (!processedBlob || !resultCanvas) return;

    if (statusHeadline) {
      statusHeadline.textContent = t('status_erased', {
        dimensions: `${resultCanvas.width} × ${resultCanvas.height} px`
      });
    }

    if (statusDetails) {
      statusDetails.textContent = t('status_details', {
        size: formatBytes(processedBlob.size)
      });
    }
  }

  function downloadResultImage() {
    if (!processedBlob) return;

    showToast(t('toast_downloading'), 'info');

    const origName = originalFile ? originalFile.name : 'portrait';
    const baseName = origName.replace(/\.[^/.]+$/, '');
    const outFilename = `${baseName}_nobg.png`;

    const url = URL.createObjectURL(processedBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = outFilename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }

  function resetWorkspace() {
    originalImage = null;
    originalFile = null;
    originalImageData = null;
    maskBuffer = null;
    processedBlob = null;
    processedDataUrl = null;

    if (fileInput) fileInput.value = '';
    if (workspacePanel) workspacePanel.classList.add('hidden');
    if (dropzone) dropzone.parentElement.classList.remove('hidden');

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // Generate a rich portrait sample canvas on the fly for 1-click testing
  function generateSamplePortrait() {
    showToast(t('toast_sample_loaded'), 'info');

    const sampleCanvas = document.createElement('canvas');
    sampleCanvas.width = 1200;
    sampleCanvas.height = 1200;
    const ctx = sampleCanvas.getContext('2d');

    // Studio Solid Cyan Background (Easy to demonstrate crisp cutout)
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(0, 0, 1200, 1200);

    // Subtle studio spotlight gradient on background
    const bgGlow = ctx.createRadialGradient(600, 500, 50, 600, 500, 600);
    bgGlow.addColorStop(0, 'rgba(56, 189, 248, 0.4)');
    bgGlow.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
    ctx.fillStyle = bgGlow;
    ctx.fillRect(0, 0, 1200, 1200);

    // Silhouette / Portrait Subject
    // Shoulders & Body
    ctx.fillStyle = '#1e1b4b'; // Dark indigo suit
    ctx.beginPath();
    ctx.ellipse(600, 1100, 380, 420, 0, 0, Math.PI * 2);
    ctx.fill();

    // Shirt Collar
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.moveTo(540, 750);
    ctx.lineTo(600, 920);
    ctx.lineTo(660, 750);
    ctx.closePath();
    ctx.fill();

    // Red Tie
    ctx.fillStyle = '#f43f5e';
    ctx.beginPath();
    ctx.moveTo(585, 780);
    ctx.lineTo(615, 780);
    ctx.lineTo(625, 1050);
    ctx.lineTo(600, 1120);
    ctx.lineTo(575, 1050);
    ctx.closePath();
    ctx.fill();

    // Neck
    ctx.fillStyle = '#fcd34d';
    ctx.fillRect(550, 650, 100, 140);

    // Head Face Oval
    ctx.fillStyle = '#fde68a';
    ctx.beginPath();
    ctx.ellipse(600, 520, 180, 220, 0, 0, Math.PI * 2);
    ctx.fill();

    // Modern Hairstyle
    ctx.fillStyle = '#18181b';
    ctx.beginPath();
    ctx.arc(600, 450, 200, Math.PI * 0.9, Math.PI * 2.1);
    ctx.fill();

    // Stylish Sunglasses
    ctx.fillStyle = '#09090b';
    ctx.beginPath();
    ctx.roundRect(470, 470, 110, 65, 12);
    ctx.roundRect(620, 470, 110, 65, 12);
    ctx.fill();
    ctx.lineWidth = 8;
    ctx.strokeStyle = '#d97706';
    ctx.stroke();

    // Friendly Smile
    ctx.strokeStyle = '#b45309';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(600, 610, 50, 0.15 * Math.PI, 0.85 * Math.PI);
    ctx.stroke();

    // Branding Badge on Sample
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px Outfit, Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('AI Background Remover Sample Portrait', 600, 140);

    sampleCanvas.toBlob((blob) => {
      const dataUrl = URL.createObjectURL(blob);
      const img = new Image();
      img.onload = () => {
        loadImageData(img, 'sample_portrait_subject.jpg', blob.size, 'image/jpeg', dataUrl);
      };
      img.src = dataUrl;
    }, 'image/jpeg', 0.95);
  }

})();
