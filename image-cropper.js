/**
 * Image Cropper Pro - 100% Client-Side Processing
 * Powered by Cropper.js & HTML5 Canvas API
 * Zero Server Uploads • Fast & Private • English & Arabic RTL Support
 */

(function () {
  'use strict';

  // Master Bilingual Translation Dictionary
  const translations = {
    en: {
      badge_client_side: "100% Client-Side",
      nav_home: "Home",
      imgcrop_hero_badge: "100% Client-Side Image Cropper & Resizer • Zero Uploads",
      imgcrop_hero_title: 'Crop & Resize <span class="gradient-text">Images</span>',
      imgcrop_hero_subtitle: "Crop photos with precision aspect ratios (1:1, 16:9, 4:3, 9:16), rotate, flip, and resize by pixels or scale. 100% private in-browser processing.",
      imgcrop_dropzone_title: "Drop your image here to crop",
      imgcrop_dropzone_subtitle: "Supports PNG, JPG/JPEG, WebP, GIF, and BMP. Cropping and resizing execute instantly on your hardware.",
      imgcrop_btn_browse: "Browse Image File",
      imgcrop_btn_sample: "Try Sample Image",
      imgcrop_btn_change: "Change Image",
      imgcrop_aspect_label: "Crop Aspect Ratio",
      imgcrop_ratio_free: "Freeform",
      imgcrop_ratio_1_1: "1:1 Square",
      imgcrop_ratio_16_9: "16:9 Landscape",
      imgcrop_ratio_4_3: "4:3 Standard",
      imgcrop_ratio_9_16: "9:16 Story/Reel",
      imgcrop_ratio_3_2: "3:2 Photo",
      imgcrop_ratio_4_5: "4:5 Portrait",
      imgcrop_ratio_2_1: "2:1 Banner",
      imgcrop_tool_rotate_l: "Rotate Left",
      imgcrop_tool_rotate_r: "Rotate Right",
      imgcrop_tool_flip_h: "Flip H",
      imgcrop_tool_flip_v: "Flip V",
      imgcrop_tool_reset: "Reset",
      imgcrop_dimensions_label: "Output Dimensions",
      imgcrop_label_width: "Width (px)",
      imgcrop_label_height: "Height (px)",
      imgcrop_lock_aspect: "Maintain aspect ratio when resizing",
      imgcrop_format_label: "Output Image Format",
      imgcrop_quality_label: "JPEG / WebP Quality",
      imgcrop_preview_title: "Live Cropped Preview",
      imgcrop_btn_download: "Download Cropped Image",
      ad_space_label: "Advertisement Space (728x90)",
      footer_tagline: "100% Client-side, private, and secure document processing directly in your browser.",
      footer_privacy: "Privacy Policy",
      footer_terms: "Terms of Service",
      footer_contact: "Contact Us",
      footer_copyright: "© 2026 PDF Hub. All rights reserved.",
      cookie_consent_text: "We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.",
      cookie_learn_more: "Privacy Policy",
      cookie_accept_btn: "Accept",
      toast_sample_loaded: "Sample high-resolution photo loaded successfully.",
      toast_cropped: "Image cropped successfully!",
      toast_downloading: "Downloading cropped image...",
      toast_invalid_img: "Please upload a valid image file (PNG, JPG, WebP, GIF, or BMP).",
      toast_error: "An error occurred during image cropping.",
      status_ready: "Image cropped and ready ({dimensions})",
      status_details: "Format: {format} • File size: {size}",
      imgcrop_seo_badge: "Precision In-Browser Image Cropper",
      imgcrop_seo_title: "How to Crop & Resize Images Online for Free",
      imgcrop_seo_subtitle: "Easily crop pictures to perfect dimensions for Instagram, YouTube, TikTok, passports, and website graphics with 100% private on-device processing.",
      imgcrop_step1_title: "1. Upload Image",
      imgcrop_step1_desc: "Drop any JPG, PNG, WebP, GIF, or BMP file into the workspace to open the interactive canvas cropper.",
      imgcrop_step2_title: "2. Adjust Crop & Orientation",
      imgcrop_step2_desc: "Select preset aspect ratios (1:1, 16:9, 4:3, 9:16), rotate by 90°, flip horizontally or vertically, and customize pixel dimensions.",
      imgcrop_step3_title: "3. Export & Download",
      imgcrop_step3_desc: "Inspect the live cropped preview, select your desired format (PNG, JPG, WebP), and download with zero watermarks.",
      imgcrop_table_ratio: "Aspect Ratio",
      imgcrop_table_usecase: "Best Use Case",
      imgcrop_table_dimensions: "Typical Dimensions",
      imgcrop_usecase_1_1: "Instagram posts, profile avatars, eCommerce product listings.",
      imgcrop_usecase_16_9: "YouTube thumbnails, presentation slides, widescreen wallpapers.",
      imgcrop_usecase_9_16: "TikTok videos, Instagram Stories, YouTube Shorts, mobile wallpapers.",
      imgcrop_usecase_4_5: "Instagram portrait posts, vertical social media feeds.",
      imgcrop_usecase_4_3: "Classic camera photography, iPad presentations, blog headers.",
      imgcrop_faq_title: "Frequently Asked Questions",
      imgcrop_faq_q1: "Are my private photos uploaded to a cloud server when cropped?",
      imgcrop_faq_a1: "Never. Image Cropper Pro runs 100% locally in your browser memory using HTML5 Canvas. Your photos never leave your computer, smartphone, or tablet.",
      imgcrop_faq_q2: "Can I specify custom pixel dimensions when cropping?",
      imgcrop_faq_a2: "Yes! You can manually enter any desired target width and height in pixels, with an optional aspect ratio lock to prevent distortion.",
      imgcrop_faq_q3: "Does cropping reduce image resolution or clarity?",
      imgcrop_faq_a3: "No. Our cropper extracts pixels from the full native resolution of your original photo using high-quality bilinear interpolation, ensuring razor-sharp clarity.",
      imgcrop_faq_q4: "Can I crop PNG images with transparent backgrounds?",
      imgcrop_faq_a4: "Yes! When you choose PNG or WebP as the export format, full alpha transparency is preserved exactly as in the original."
    },
    ar: {
      badge_client_side: "محلي ١٠٠٪ في المتصفح",
      nav_home: "الرئيسية",
      imgcrop_hero_badge: "قص وتصغير الصور محلياً ١٠٠٪ • بدون أي رفع سحابي",
      imgcrop_hero_title: 'قص وتعديل أبعاد <span class="gradient-text">الصور</span>',
      imgcrop_hero_subtitle: "قص الصور بنسب أبعاد دقيقة (1:1، 16:9، 4:3، 9:16)، مع إمكانية التدوير، والقلب، والتحجيم بالبكسل. معالجة محلية ١٠٠٪ داخل متصفحك وبأعلى خصوصية.",
      imgcrop_dropzone_title: "اسحب الصورة هنا للقص والتحجيم",
      imgcrop_dropzone_subtitle: "يدعم صيغ PNG و JPG/JPEG و WebP و GIF و BMP. تتم المعالجة فورياً على معالج جهازك وبدون خوادم.",
      imgcrop_btn_browse: "استعراض ملف الصورة",
      imgcrop_btn_sample: "تجربة صورة نموذجية",
      imgcrop_btn_change: "تغيير الصورة",
      imgcrop_aspect_label: "نسبة أبعاد القص",
      imgcrop_ratio_free: "حر ومخصص",
      imgcrop_ratio_1_1: "1:1 مربع",
      imgcrop_ratio_16_9: "16:9 عريض",
      imgcrop_ratio_4_3: "4:3 قياسي",
      imgcrop_ratio_9_16: "9:16 ستوري / ريلز",
      imgcrop_ratio_3_2: "3:2 صور فوتوغرافية",
      imgcrop_ratio_4_5: "4:5 بورتريه",
      imgcrop_ratio_2_1: "2:1 غلاف وبانر",
      imgcrop_tool_rotate_l: "تدوير لليسار",
      imgcrop_tool_rotate_r: "تدوير لليمين",
      imgcrop_tool_flip_h: "قلب أفقي",
      imgcrop_tool_flip_v: "قلب رأسي",
      imgcrop_tool_reset: "إعادة ضبط",
      imgcrop_dimensions_label: "الأبعاد المخرجة",
      imgcrop_label_width: "العرض (بكسل)",
      imgcrop_label_height: "الارتفاع (بكسل)",
      imgcrop_lock_aspect: "الحفاظ على نسبة الأبعاد عند التحجيم",
      imgcrop_format_label: "صيغة الصورة المخرجة",
      imgcrop_quality_label: "جودة JPEG / WebP",
      imgcrop_preview_title: "معاينة القص المباشرة",
      imgcrop_btn_download: "تحميل الصورة المقصوصة",
      ad_space_label: "مساحة إعلانية (728×90)",
      footer_tagline: "معالجة مستندات محلية ١٠٠٪، خاصة وآمنة تماماً مباشرة في متصفحك.",
      footer_privacy: "سياسة الخصوصية",
      footer_terms: "شروط الاستخدام",
      footer_contact: "اتصل بنا",
      footer_copyright: "© ٢٠٢٦ PDF Hub. جميع الحقوق محفوظة.",
      cookie_consent_text: "نحن نستخدم ملفات تعريف الارتباط لتحسين تجربتك. باستمرارك في زيارة هذا الموقع، فإنك توافق على استخدامنا لملفات تعريف الارتباط.",
      cookie_learn_more: "سياسة الخصوصية",
      cookie_accept_btn: "موافق",
      toast_sample_loaded: "تم تحميل الصورة النموذجية عالية الدقة بنجاح.",
      toast_cropped: "تم قص الصورة بنجاح!",
      toast_downloading: "جاري تحميل الصورة المقصوصة...",
      toast_invalid_img: "يرجى اختيار ملف صورة صالح (PNG أو JPG أو WebP أو GIF أو BMP).",
      toast_error: "حدث خطأ أثناء قص الصورة.",
      status_ready: "تم قص الصورة وجاهزة للتحميل ({dimensions})",
      status_details: "الصيغة: {format} • حجم الملف: {size}",
      imgcrop_seo_badge: "قص وتحجيم صور فائق الدقة والأمان",
      imgcrop_seo_title: "كيفية قص وتغيير أبعاد الصور أونلاين مجاناً",
      imgcrop_seo_subtitle: "قص الصور بدقة متناهية لتناسب إنستغرام، يوتيوب، تيك توك، صور جواز السفر، وتصميمات المواقع مع خصوصية تامة دون أي خوادم.",
      imgcrop_step1_title: "١. رفع الصورة",
      imgcrop_step1_desc: "أفلت أي ملف JPG أو PNG أو WebP أو GIF أو BMP داخل المتصفح لفتح أداة القص التفاعلية فورياً.",
      imgcrop_step2_title: "٢. تحديد نسبة القص والتدوير",
      imgcrop_step2_desc: "اختر نسب الأبعاد الجاهزة (1:1، 16:9، 4:3، 9:16)، مع إمكانية التدوير بزاوية ٩٠ درجة، والقلب وتعديل الأبعاد بالبكسل.",
      imgcrop_step3_title: "٣. التصدير والتحميل",
      imgcrop_step3_desc: "عاين نتيجة القص مباشرة، واختر صيغة الحفظ المفضلة (PNG أو JPG أو WebP) وحمّل الصورة فوراً بدون أي علامات مائية.",
      imgcrop_table_ratio: "نسبة الأبعاد",
      imgcrop_table_usecase: "أفضل استخدام",
      imgcrop_table_dimensions: "الأبعاد الشائعة",
      imgcrop_usecase_1_1: "منشورات إنستغرام، الصور الشخصية، صور المنتجات للمتاجر الإلكترونية.",
      imgcrop_usecase_16_9: "صور مصغرة لليوتيوب، شرائح العرض، خلفيات الشاشات العريضة.",
      imgcrop_usecase_9_16: "فيديوهات تيك توك، ستوري إنستغرام، يوتيوب شورتس، خلفيات الهواتف.",
      imgcrop_usecase_4_5: "منشورات البورتريه الرأسية على إنستغرام وخلاصات السوشيال ميديا.",
      imgcrop_usecase_4_3: "التصوير الفوتوغرافي التقليدي، عروض الآيباد، ترويسات المدونات والمقالات.",
      imgcrop_faq_title: "الأسئلة الشائعة",
      imgcrop_faq_q1: "هل يتم رفع صوري إلى أي خادم سحابي عند القص؟",
      imgcrop_faq_a1: "مستحيل. تعمل أداة قص الصور محلياً ١٠٠٪ داخل ذاكرة متصفحك عبر HTML5 Canvas، ولا تغادر صورك جهازك أو هاتفك المحمول أبداً.",
      imgcrop_faq_q2: "هل يمكنني تحديد أبعاد بكسل مخصصة عند القص؟",
      imgcrop_faq_a2: "نعم بكل تأكيد! يمكنك إدخال العرض والارتفاع المستهدف بالبكسل يدوياً، مع قفل نسبة الأبعاد التلقائي لمنع تمدد أو تشوه الصورة.",
      imgcrop_faq_q3: "هل يؤثر القص على دقة أو نقاء الصورة الأصلية؟",
      imgcrop_faq_a3: "لا. تستخرج أداة القص البكسلات مباشرة من الدقة الكاملة للصورة الأصلية مع خوارزميات تنعيم عالية الجودة، مما يضمن أقصى درجات الوضوح.",
      imgcrop_faq_q4: "هل يمكنني قص صور PNG ذات خلفيات شفافة؟",
      imgcrop_faq_a4: "نعم! عند اختيار صيغة PNG أو WebP للتصدير، يتم الحفاظ على الشفافية بنقاء كامل تماماً كما في الصورة الأصلية."
    }
  };

  let currentLang = 'en';
  let cropperInstance = null;
  let originalFile = null;
  let originalImage = null;
  let originalDimensions = { width: 0, height: 0 };
  let originalSizeBytes = 0;

  let flipX = 1;
  let flipY = 1;
  let outputMimeType = 'image/jpeg';
  let outputQuality = 0.92;
  let croppedBlob = null;
  let croppedDataUrl = null;
  let debounceTimer = null;

  // Cached DOM elements
  let dropzone, fileInput, btnBrowse, btnLoadSample;
  let workspacePanel, fileNameDisplay, origDimensionsBadge, origSizeBadge, cropSelectionBadge, btnChangeFile;
  let cropperImage, aspectButtons;
  let btnRotateLeft, btnRotateRight, btnFlipH, btnFlipV, btnZoomIn, btnZoomOut, btnResetCrop;
  let outputWidthInput, outputHeightInput, lockAspectRatioCheckbox, outputDimVal;
  let outputFormatSelect, qualitySliderContainer, qualitySlider, qualityValDisplay;
  let previewResultImg, previewResultMeta, statusHeadline, statusDetails, btnDownloadImage, btnDownloadText;
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
    origDimensionsBadge = document.getElementById('orig-dimensions-badge');
    origSizeBadge = document.getElementById('orig-size-badge');
    cropSelectionBadge = document.getElementById('crop-selection-badge');
    btnChangeFile = document.getElementById('btn-change-file');

    cropperImage = document.getElementById('cropper-image');
    aspectButtons = document.querySelectorAll('.aspect-btn');

    btnRotateLeft = document.getElementById('btn-rotate-left');
    btnRotateRight = document.getElementById('btn-rotate-right');
    btnFlipH = document.getElementById('btn-flip-h');
    btnFlipV = document.getElementById('btn-flip-v');
    btnZoomIn = document.getElementById('btn-zoom-in');
    btnZoomOut = document.getElementById('btn-zoom-out');
    btnResetCrop = document.getElementById('btn-reset-crop');

    outputWidthInput = document.getElementById('output-width-input');
    outputHeightInput = document.getElementById('output-height-input');
    lockAspectRatioCheckbox = document.getElementById('lock-aspect-ratio');
    outputDimVal = document.getElementById('output-dim-val');

    outputFormatSelect = document.getElementById('output-format-select');
    qualitySliderContainer = document.getElementById('quality-slider-container');
    qualitySlider = document.getElementById('quality-slider');
    qualityValDisplay = document.getElementById('quality-val-display');

    previewResultImg = document.getElementById('preview-result-img');
    previewResultMeta = document.getElementById('preview-result-meta');
    statusHeadline = document.getElementById('status-headline');
    statusDetails = document.getElementById('status-details');
    btnDownloadImage = document.getElementById('btn-download-image');
    btnDownloadText = document.getElementById('btn-download-text');

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
        generateSampleImage();
      });
    }

    if (btnChangeFile) {
      btnChangeFile.addEventListener('click', resetWorkspace);
    }

    // Aspect Ratio Selection
    aspectButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        aspectButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const ratio = parseFloat(btn.getAttribute('data-ratio'));
        if (cropperInstance) {
          cropperInstance.setAspectRatio(ratio);
        }
      });
    });

    // Toolbar actions
    if (btnRotateLeft) {
      btnRotateLeft.addEventListener('click', () => {
        if (cropperInstance) cropperInstance.rotate(-90);
      });
    }

    if (btnRotateRight) {
      btnRotateRight.addEventListener('click', () => {
        if (cropperInstance) cropperInstance.rotate(90);
      });
    }

    if (btnFlipH) {
      btnFlipH.addEventListener('click', () => {
        if (cropperInstance) {
          flipX = -flipX;
          cropperInstance.scaleX(flipX);
        }
      });
    }

    if (btnFlipV) {
      btnFlipV.addEventListener('click', () => {
        if (cropperInstance) {
          flipY = -flipY;
          cropperInstance.scaleY(flipY);
        }
      });
    }

    if (btnZoomIn) {
      btnZoomIn.addEventListener('click', () => {
        if (cropperInstance) cropperInstance.zoom(0.1);
      });
    }

    if (btnZoomOut) {
      btnZoomOut.addEventListener('click', () => {
        if (cropperInstance) cropperInstance.zoom(-0.1);
      });
    }

    if (btnResetCrop) {
      btnResetCrop.addEventListener('click', () => {
        if (cropperInstance) {
          flipX = 1;
          flipY = 1;
          cropperInstance.reset();
        }
      });
    }

    // Dimension Inputs
    if (outputWidthInput) {
      outputWidthInput.addEventListener('input', () => {
        const w = parseInt(outputWidthInput.value, 10);
        if (!isNaN(w) && w > 0 && lockAspectRatioCheckbox && lockAspectRatioCheckbox.checked && cropperInstance) {
          const data = cropperInstance.getData();
          if (data.width > 0) {
            const h = Math.round(w * (data.height / data.width));
            if (outputHeightInput) outputHeightInput.value = h;
          }
        }
        triggerDebouncedPreview();
      });
    }

    if (outputHeightInput) {
      outputHeightInput.addEventListener('input', () => {
        const h = parseInt(outputHeightInput.value, 10);
        if (!isNaN(h) && h > 0 && lockAspectRatioCheckbox && lockAspectRatioCheckbox.checked && cropperInstance) {
          const data = cropperInstance.getData();
          if (data.height > 0) {
            const w = Math.round(h * (data.width / data.height));
            if (outputWidthInput) outputWidthInput.value = w;
          }
        }
        triggerDebouncedPreview();
      });
    }

    // Format Selector
    if (outputFormatSelect) {
      outputFormatSelect.addEventListener('change', () => {
        outputMimeType = outputFormatSelect.value;
        if (qualitySliderContainer) {
          if (outputMimeType === 'image/png') {
            qualitySliderContainer.style.display = 'none';
          } else {
            qualitySliderContainer.style.display = 'block';
          }
        }
        triggerDebouncedPreview();
      });
    }

    // Quality Slider
    if (qualitySlider) {
      qualitySlider.addEventListener('input', () => {
        outputQuality = parseInt(qualitySlider.value, 10) / 100;
        if (qualityValDisplay) qualityValDisplay.textContent = `${qualitySlider.value}%`;
        triggerDebouncedPreview();
      });
    }

    // Download Button
    if (btnDownloadImage) {
      btnDownloadImage.addEventListener('click', downloadCroppedImage);
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

    if (croppedBlob) {
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

    if (!file.type.startsWith('image/') && !file.name.match(/\.(png|jpe?g|webp|gif|bmp)$/i)) {
      showToast(t('toast_invalid_img'), 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        initCropperWithImage(img, file.name, file.size, file.type || 'image/jpeg', e.target.result);
      };
      img.onerror = () => {
        showToast(t('toast_invalid_img'), 'error');
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  function initCropperWithImage(img, fileName, fileSize, mimeType, dataUrl) {
    originalImage = img;
    originalFile = { name: fileName, size: fileSize, type: mimeType };
    originalDimensions = { width: img.naturalWidth || img.width, height: img.naturalHeight || img.height };
    originalSizeBytes = fileSize;

    flipX = 1;
    flipY = 1;

    if (fileNameDisplay) fileNameDisplay.textContent = fileName;
    if (origDimensionsBadge) origDimensionsBadge.textContent = `${originalDimensions.width} × ${originalDimensions.height} px`;
    if (origSizeBadge) origSizeBadge.textContent = formatBytes(fileSize);

    if (dropzone) dropzone.parentElement.classList.add('hidden');
    if (workspacePanel) workspacePanel.classList.remove('hidden');

    if (cropperInstance) {
      cropperInstance.destroy();
      cropperInstance = null;
    }

    if (cropperImage) {
      cropperImage.src = dataUrl;

      // Initialize Cropper.js
      cropperInstance = new Cropper(cropperImage, {
        viewMode: 1,
        dragMode: 'move',
        aspectRatio: NaN,
        autoCropArea: 0.88,
        restore: false,
        guides: true,
        center: true,
        highlight: false,
        cropBoxMovable: true,
        cropBoxResizable: true,
        toggleDragModeOnDblclick: false,
        ready() {
          updateInputsFromCrop();
          triggerDebouncedPreview();
        },
        crop() {
          updateInputsFromCrop();
          triggerDebouncedPreview();
        }
      });
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function updateInputsFromCrop() {
    if (!cropperInstance) return;
    const data = cropperInstance.getData(true);
    const w = Math.max(1, Math.round(data.width));
    const h = Math.max(1, Math.round(data.height));

    if (cropSelectionBadge) {
      cropSelectionBadge.textContent = `${w} × ${h} px`;
    }

    if (outputDimVal) {
      outputDimVal.textContent = `${w} × ${h} px`;
    }

    if (outputWidthInput && document.activeElement !== outputWidthInput) {
      outputWidthInput.value = w;
    }

    if (outputHeightInput && document.activeElement !== outputHeightInput) {
      outputHeightInput.value = h;
    }
  }

  function triggerDebouncedPreview() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      generateCroppedPreview();
    }, 70);
  }

  function generateCroppedPreview() {
    if (!cropperInstance) return;

    try {
      const targetW = parseInt(outputWidthInput.value, 10) || undefined;
      const targetH = parseInt(outputHeightInput.value, 10) || undefined;

      const canvasOptions = {
        imageSmoothingEnabled: true,
        imageSmoothingQuality: 'high'
      };

      if (targetW && targetW > 0) canvasOptions.width = targetW;
      if (targetH && targetH > 0) canvasOptions.height = targetH;

      if (outputMimeType === 'image/jpeg') {
        canvasOptions.fillColor = '#ffffff';
      }

      const croppedCanvas = cropperInstance.getCroppedCanvas(canvasOptions);
      if (!croppedCanvas) return;

      croppedCanvas.toBlob((blob) => {
        if (!blob) return;

        croppedBlob = blob;
        croppedDataUrl = URL.createObjectURL(blob);

        if (previewResultImg) {
          previewResultImg.src = croppedDataUrl;
        }

        if (previewResultMeta) {
          previewResultMeta.textContent = `${croppedCanvas.width} × ${croppedCanvas.height} px • ${formatBytes(blob.size)}`;
        }

        updateStatusMetrics(croppedCanvas.width, croppedCanvas.height, blob.size);

      }, outputMimeType, outputQuality);

    } catch (err) {
      console.error('Cropper preview error:', err);
    }
  }

  function updateStatusMetrics(w, h, size) {
    const width = w || (outputWidthInput ? outputWidthInput.value : 0);
    const height = h || (outputHeightInput ? outputHeightInput.value : 0);
    const bytes = size || (croppedBlob ? croppedBlob.size : 0);

    let formatLabel = 'JPEG';
    if (outputMimeType === 'image/png') formatLabel = 'PNG';
    else if (outputMimeType === 'image/webp') formatLabel = 'WebP';

    if (statusHeadline) {
      statusHeadline.textContent = t('status_ready', {
        dimensions: `${width} × ${height} px`
      });
    }

    if (statusDetails) {
      statusDetails.textContent = t('status_details', {
        format: formatLabel,
        size: formatBytes(bytes)
      });
    }

    if (btnDownloadText) {
      btnDownloadText.textContent = `${t('imgcrop_btn_download')} (${formatLabel})`;
    }
  }

  function downloadCroppedImage() {
    if (!croppedBlob) return;

    showToast(t('toast_downloading'), 'info');

    const origName = originalFile ? originalFile.name : 'image';
    const baseName = origName.replace(/\.[^/.]+$/, '');

    let ext = '.jpg';
    if (outputMimeType === 'image/png') ext = '.png';
    else if (outputMimeType === 'image/webp') ext = '.webp';

    const outFilename = `${baseName}_cropped${ext}`;

    const url = URL.createObjectURL(croppedBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = outFilename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }

  function resetWorkspace() {
    if (cropperInstance) {
      cropperInstance.destroy();
      cropperInstance = null;
    }

    originalImage = null;
    originalFile = null;
    croppedBlob = null;
    croppedDataUrl = null;

    if (fileInput) fileInput.value = '';
    if (workspacePanel) workspacePanel.classList.add('hidden');
    if (dropzone) dropzone.parentElement.classList.remove('hidden');

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // Generate a rich sample canvas image on the fly for 1-click testing
  function generateSampleImage() {
    showToast(t('toast_sample_loaded'), 'info');

    const sampleCanvas = document.createElement('canvas');
    sampleCanvas.width = 1600;
    sampleCanvas.height = 1000;
    const ctx = sampleCanvas.getContext('2d');

    // Rich Sunset Gradient
    const grad = ctx.createLinearGradient(0, 0, 1600, 1000);
    grad.addColorStop(0, '#0f172a');
    grad.addColorStop(0.4, '#4c0519');
    grad.addColorStop(0.7, '#881337');
    grad.addColorStop(1, '#f43f5e');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1600, 1000);

    // Decorative geometric patterns & glowing bubbles
    for (let i = 0; i < 35; i++) {
      ctx.beginPath();
      ctx.arc(
        Math.random() * 1600,
        Math.random() * 1000,
        Math.random() * 160 + 20,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = `rgba(251, 113, 133, ${Math.random() * 0.25 + 0.05})`;
      ctx.fill();
    }

    // Glass Card Frame
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.roundRect(120, 120, 1360, 760, 28);
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(251, 113, 133, 0.4)';
    ctx.stroke();

    // Typography
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 52px Outfit, Inter, sans-serif';
    ctx.fillText('PDF NETIZEN • IMAGE CROPPER PRO', 180, 260);

    ctx.fillStyle = '#fb7185';
    ctx.font = '34px Outfit, Inter, sans-serif';
    ctx.fillText('Interactive 16:9 • 1:1 • 4:3 • 9:16 Canvas Cropping Engine', 180, 330);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '26px Inter, sans-serif';
    ctx.fillText('100% Client-Side In-Browser Processing • Zero Server Uploads', 180, 400);

    ctx.fillStyle = '#fda4af';
    ctx.font = 'bold 42px Cairo, sans-serif';
    ctx.fillText('قص وتعديل أبعاد الصور باحترافية وسرعة فائقة', 180, 500);

    // Color Badges
    const palette = ['#f43f5e', '#fb7185', '#fda4af', '#f43f5e', '#be123c', '#881337'];
    palette.forEach((color, idx) => {
      ctx.fillStyle = color;
      ctx.roundRect(180 + (idx * 160), 600, 130, 180, 16);
      ctx.fill();
    });

    sampleCanvas.toBlob((blob) => {
      const dataUrl = URL.createObjectURL(blob);
      const img = new Image();
      img.onload = () => {
        initCropperWithImage(img, 'sample_landscape_banner.jpg', blob.size, 'image/jpeg', dataUrl);
      };
      img.src = dataUrl;
    }, 'image/jpeg', 0.95);
  }

})();
