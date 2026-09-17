/**
 * Image Compressor Pro - 100% Client-Side Processing
 * Uses HTML5 Canvas API for compression, resizing, and format conversion
 * Zero Server Uploads • Fast & Private • English & Arabic RTL Support
 */

(function () {
  'use strict';

  // Master Bilingual Translation Dictionary
  const translations = {
    en: {
      badge_client_side: "100% Client-Side",
      nav_home: "Home",
      imgcomp_hero_badge: "100% Client-Side Image Optimizer • Fast & Private",
      imgcomp_hero_title: 'Compress & Resize <span class="gradient-text">Images</span>',
      imgcomp_hero_subtitle: "Reduce JPG, PNG, and WebP image file sizes by up to 85% with high visual clarity. 100% private client-side processing directly in your browser.",
      imgcomp_dropzone_title: "Drop your image here",
      imgcomp_dropzone_subtitle: "Supports PNG, JPG, JPEG, and WebP images. Compression executes directly on your CPU with zero uploads.",
      imgcomp_btn_browse: "Browse Image File",
      imgcomp_btn_sample: "Try Sample Image",
      imgcomp_feature_reduction: "Up to 85% Size Reduction",
      imgcomp_feature_formats: "PNG, JPG, WebP Supported",
      imgcomp_feature_privacy: "100% Client-Side Privacy",
      imgcomp_btn_change: "Change Image",
      imgcomp_settings_title: "Compression & Resize Options",
      imgcomp_label_quality: "Compression Quality",
      imgcomp_preset_max: "Max (40%)",
      imgcomp_preset_balanced: "Balanced (75%)",
      imgcomp_preset_high: "High (88%)",
      imgcomp_preset_lossless: "Crisp (98%)",
      imgcomp_label_format: "Output Image Format",
      imgcomp_fmt_auto: "Auto (Best for current image)",
      imgcomp_label_dimensions: "Resize Dimensions",
      imgcomp_label_width: "Width (px)",
      imgcomp_label_height: "Height (px)",
      imgcomp_btn_recompress: "Re-Compress Image",
      imgcomp_preview_title: "Visual Quality Comparison",
      imgcomp_preview_orig: "Original Image",
      imgcomp_preview_opt: "Optimized Result",
      imgcomp_btn_download: "Download Optimized Image",
      ad_space_label: "Advertisement Space (728x90)",
      footer_tagline: "100% Client-side, private, and secure document processing directly in your browser.",
      footer_privacy: "Privacy Policy",
      footer_terms: "Terms of Service",
      footer_contact: "Contact Us",
      footer_copyright: "© 2026 PDF Hub. All rights reserved.",
      cookie_consent_text: "We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.",
      cookie_learn_more: "Privacy Policy",
      cookie_accept_btn: "Accept",
      toast_sample_loaded: "Sample high-resolution image loaded successfully.",
      toast_compressed: "Image optimized successfully!",
      toast_downloading: "Downloading optimized image...",
      toast_invalid_img: "Please upload a valid PNG, JPG, or WebP image.",
      toast_error: "An error occurred during image processing.",
      savings_headline_text: "Reduced by {pct}% ({saved} saved)",
      savings_details_text: "Original: {orig} ➔ Compressed: {comp}",
      imgcomp_seo_badge: "Fast & Private Client-Side Optimization",
      imgcomp_seo_title: "How to Compress & Resize Images Online for Free",
      imgcomp_seo_subtitle: "Optimize your JPG, PNG, and WebP images with custom compression levels, resolution scaling, and 100% browser-side privacy without quality degradation.",
      imgcomp_step1_title: "1. Upload Any Image",
      imgcomp_step1_desc: "Drag and drop your PNG, JPEG, or WebP photo into the secure workspace to begin instant processing.",
      imgcomp_step2_title: "2. Adjust Quality & Scale",
      imgcomp_step2_desc: "Choose your desired compression preset (Max, Balanced, High), scale dimensions, or switch formats in real-time.",
      imgcomp_step3_title: "3. Compare & Download",
      imgcomp_step3_desc: "Inspect the side-by-side visual comparison, verify your exact kilobyte savings, and download your optimized image.",
      imgcomp_faq_title: "Frequently Asked Questions",
      imgcomp_faq_q1: "Are my private photos uploaded to a cloud server?",
      imgcomp_faq_a1: "No. Image Compressor Pro operates entirely using HTML5 Canvas and JavaScript inside your browser. Your photos, documents, and private graphics never leave your local device.",
      imgcomp_faq_q2: "How much file size reduction can I achieve?",
      imgcomp_faq_a2: "Depending on the original format and selected quality preset, images typically achieve between 40% and 85% file size reduction while retaining sharp visual clarity for websites, emails, and apps.",
      imgcomp_faq_q3: "Can I convert PNG images with transparent backgrounds to WebP?",
      imgcomp_faq_a3: "Yes! When you select WebP or PNG format, transparency channels (alpha transparency) are fully preserved while compressing the image size dramatically.",
      imgcomp_faq_q4: "Is there any limit on image file sizes or dimensions?",
      imgcomp_faq_a4: "Because processing uses your computer or phone hardware directly, you can compress high-resolution photos up to 50MB and 8K dimensions smoothly with zero watermarks or subscriptions."
    },
    ar: {
      badge_client_side: "محلي ١٠٠٪ في المتصفح",
      nav_home: "الرئيسية",
      imgcomp_hero_badge: "ضغط وتحسين الصور محلياً ١٠٠٪ • سرعة وخصوصية",
      imgcomp_hero_title: 'ضغط وتصغير حجم <span class="gradient-text">الصور</span>',
      imgcomp_hero_subtitle: "قلل حجم صور JPG و PNG و WebP بنسبة تصل إلى ٨٥٪ مع الحفاظ على نقاء وجودة الصورة. معالجة محلية ١٠٠٪ داخل متصفحك وبدون أي رفع سحابي.",
      imgcomp_dropzone_title: "اسحب الصورة هنا للضغط",
      imgcomp_dropzone_subtitle: "يدعم صور PNG و JPG و JPEG و WebP. تتم المعالجة بالكامل محلياً على جهازك وبأعلى درجات الأمان.",
      imgcomp_btn_browse: "استعراض ملف الصورة",
      imgcomp_btn_sample: "تجربة صورة نموذجية",
      imgcomp_feature_reduction: "تقليل الحجم حتى ٨٥٪",
      imgcomp_feature_formats: "يدعم PNG و JPG و WebP",
      imgcomp_feature_privacy: "خصوصية محلية ١٠٠٪",
      imgcomp_btn_change: "تغيير الصورة",
      imgcomp_settings_title: "خيارات الضغط وتغيير الأبعاد",
      imgcomp_label_quality: "مستوى جودة الضغط",
      imgcomp_preset_max: "أقصى ضغط (40%)",
      imgcomp_preset_balanced: "متوازن (75%)",
      imgcomp_preset_high: "عالي الجودة (88%)",
      imgcomp_preset_lossless: "فائق النقاء (98%)",
      imgcomp_label_format: "صيغة الصورة المخرجة",
      imgcomp_fmt_auto: "تلقائي (أفضل خيار للصورة الحالية)",
      imgcomp_label_dimensions: "أبعاد الصورة والتحجيم",
      imgcomp_label_width: "العرض (بكسل)",
      imgcomp_label_height: "الارتفاع (بكسل)",
      imgcomp_btn_recompress: "إعادة ضغط الصورة",
      imgcomp_preview_title: "مقارنة الجودة المرئية",
      imgcomp_preview_orig: "الصورة الأصلية",
      imgcomp_preview_opt: "النتيجة بعد التحسين",
      imgcomp_btn_download: "تحميل الصورة المحسنة",
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
      toast_compressed: "تم ضغط وتحسين الصورة بنجاح!",
      toast_downloading: "جاري تحميل الصورة المحسنة...",
      toast_invalid_img: "يرجى اختيار صورة صالحة بصيغة PNG أو JPG أو WebP.",
      toast_error: "حدث خطأ أثناء معالجة الصورة.",
      savings_headline_text: "تم توفير {pct}% (تم توفير {saved})",
      savings_details_text: "الحجم الأصلي: {orig} ➔ بعد الضغط: {comp}",
      imgcomp_seo_badge: "تحسين وضغط صور فائق السرعة والأمان",
      imgcomp_seo_title: "كيفية ضغط وتصغير حجم الصور أونلاين مجاناً",
      imgcomp_seo_subtitle: "قم بتحسين صور JPG و PNG و WebP مع مستويات ضغط مخصصة، وتغيير الأبعاد بدقة، وخصوصية تامة داخل متصفحك دون تشويه للصور.",
      imgcomp_step1_title: "١. رفع أي صورة",
      imgcomp_step1_desc: "اسحب وأفلت صورة PNG أو JPEG أو WebP داخل مساحة العمل الآمنة لبدء المعالجة الفورية.",
      imgcomp_step2_title: "٢. ضبط الجودة والأبعاد",
      imgcomp_step2_desc: "اختر مستوى الضغط المطلوب (أقصى ضغط، متوازن، عالي) أو غيّر الأبعاد والصيغة فورياً.",
      imgcomp_step3_title: "٣. المعاينة والتحميل",
      imgcomp_step3_desc: "قارن النتيجة جنباً إلى جنب مع الصورة الأصلية واطلع على نسبة التوفير ثم حمّل صورتك المحسنة.",
      imgcomp_faq_title: "الأسئلة الشائعة",
      imgcomp_faq_q1: "هل يتم رفع صوري الخاصة إلى خوادم سحابية؟",
      imgcomp_faq_a1: "كلا على الإطلاق. تعمل أداة ضغط الصور محلياً ١٠٠٪ داخل متصفحك عبر تقنيات HTML5 Canvas، دون أن تغادر صورك أو ملفاتك جهازك أبداً.",
      imgcomp_faq_q2: "ما هي نسبة تقليل حجم الملف التي يمكنني تحقيقها؟",
      imgcomp_faq_a2: "اعتماداً على الصيغة ومستوى الجودة المختار، تحقق الصور عادة تقليلاً للحجم يتراوح بين ٤٠٪ و ٨٥٪ مع الحفاظ على نقاء ووضوح التفاصيل للويب والبريد والتطبيقات.",
      imgcomp_faq_q3: "هل يمكنني تحويل صور PNG الشفافة إلى WebP؟",
      imgcomp_faq_a3: "نعم! عند اختيار صيغة WebP أو PNG، يتم الحفاظ على الشفافية بدقة عالية مع تقليل حجم الصورة بصورة مذهلة.",
      imgcomp_faq_q4: "هل يوجد حد أقصى لحجم أو أبعاد الصور المدعومة؟",
      imgcomp_faq_a4: "نظراً لأن المعالجة تعتمد على معالج جهازك مباشرة، يمكنك ضغط صور عالية الدقة حتى ٥٠ ميجابايت بدقة 8K بسلاسة وبدون أي علامات مائية أو قيود."
    }
  };

  let currentLang = 'en';
  let originalImage = null;
  let originalFile = null;
  let originalDimensions = { width: 0, height: 0 };
  let originalSizeBytes = 0;

  let currentQuality = 0.75;
  let currentScale = 1.0;
  let targetWidth = 0;
  let targetHeight = 0;
  let chosenMimeType = 'auto';

  let compressedBlob = null;
  let compressedDataUrl = null;
  let isProcessing = false;
  let debounceTimer = null;

  // DOM Elements Cache
  let dropzone, fileInput, btnBrowse, btnLoadSample;
  let workspacePanel, fileNameDisplay, origSizeBadge, origDimensionsBadge, outputFormatBadge, btnChangeFile;
  let savingsHeadline, savingsDetails;
  let btnDownloadImage, btnDownloadSecondary;
  let qualityValueDisplay, qualitySlider, presetButtons;
  let formatSelect, scaleButtons, widthInput, heightInput, targetDimensionsDisplay, btnRecompress;
  let origImgPreview, optImgPreview, previewOrigSize, previewOptSize, previewOrigRes, previewOptRes, previewSavingsTag;
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
    origSizeBadge = document.getElementById('orig-size-badge');
    origDimensionsBadge = document.getElementById('orig-dimensions-badge');
    outputFormatBadge = document.getElementById('output-format-badge');
    btnChangeFile = document.getElementById('btn-change-file');

    savingsHeadline = document.getElementById('savings-headline');
    savingsDetails = document.getElementById('savings-details');
    btnDownloadImage = document.getElementById('btn-download-image');
    btnDownloadSecondary = document.getElementById('btn-download-secondary');

    qualityValueDisplay = document.getElementById('quality-value-display');
    qualitySlider = document.getElementById('quality-slider');
    presetButtons = document.querySelectorAll('.preset-btn[data-quality]');

    formatSelect = document.getElementById('format-select');
    scaleButtons = document.querySelectorAll('.preset-btn[data-scale]');
    widthInput = document.getElementById('width-input');
    heightInput = document.getElementById('height-input');
    targetDimensionsDisplay = document.getElementById('target-dimensions-display');
    btnRecompress = document.getElementById('btn-recompress');

    origImgPreview = document.getElementById('orig-img-preview');
    optImgPreview = document.getElementById('opt-img-preview');
    previewOrigSize = document.getElementById('preview-orig-size');
    previewOptSize = document.getElementById('preview-opt-size');
    previewOrigRes = document.getElementById('preview-orig-res');
    previewOptRes = document.getElementById('preview-opt-res');
    previewSavingsTag = document.getElementById('preview-savings-tag');

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

    // Quality Slider
    if (qualitySlider) {
      qualitySlider.addEventListener('input', () => {
        currentQuality = parseInt(qualitySlider.value, 10) / 100;
        if (qualityValueDisplay) qualityValueDisplay.textContent = `${qualitySlider.value}%`;

        // Clear active preset buttons
        presetButtons.forEach(btn => btn.classList.remove('active'));
        presetButtons.forEach(btn => {
          if (parseInt(btn.getAttribute('data-quality'), 10) === parseInt(qualitySlider.value, 10)) {
            btn.classList.add('active');
          }
        });

        triggerDebouncedCompression();
      });
    }

    // Quality Presets
    presetButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        presetButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const q = parseInt(btn.getAttribute('data-quality'), 10);
        if (qualitySlider) qualitySlider.value = q;
        currentQuality = q / 100;
        if (qualityValueDisplay) qualityValueDisplay.textContent = `${q}%`;
        triggerDebouncedCompression();
      });
    });

    // Format Selector
    if (formatSelect) {
      formatSelect.addEventListener('change', () => {
        chosenMimeType = formatSelect.value;
        updateFormatBadge();
        triggerDebouncedCompression();
      });
    }

    // Scale Presets
    scaleButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        scaleButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const s = parseInt(btn.getAttribute('data-scale'), 10) / 100;
        currentScale = s;

        if (originalDimensions.width > 0) {
          targetWidth = Math.round(originalDimensions.width * s);
          targetHeight = Math.round(originalDimensions.height * s);
          if (widthInput) widthInput.value = targetWidth;
          if (heightInput) heightInput.value = targetHeight;
          updateDimensionsDisplay();
          triggerDebouncedCompression();
        }
      });
    });

    // Custom Width Input
    if (widthInput) {
      widthInput.addEventListener('input', () => {
        scaleButtons.forEach(b => b.classList.remove('active'));
        const w = parseInt(widthInput.value, 10);
        if (!isNaN(w) && w > 0 && originalDimensions.width > 0) {
          targetWidth = w;
          const ratio = originalDimensions.height / originalDimensions.width;
          targetHeight = Math.round(w * ratio);
          if (heightInput) heightInput.value = targetHeight;
          updateDimensionsDisplay();
          triggerDebouncedCompression();
        }
      });
    }

    // Custom Height Input
    if (heightInput) {
      heightInput.addEventListener('input', () => {
        scaleButtons.forEach(b => b.classList.remove('active'));
        const h = parseInt(heightInput.value, 10);
        if (!isNaN(h) && h > 0 && originalDimensions.height > 0) {
          targetHeight = h;
          const ratio = originalDimensions.width / originalDimensions.height;
          targetWidth = Math.round(h * ratio);
          if (widthInput) widthInput.value = targetWidth;
          updateDimensionsDisplay();
          triggerDebouncedCompression();
        }
      });
    }

    if (btnRecompress) {
      btnRecompress.addEventListener('click', executeCompression);
    }

    // Download Buttons
    if (btnDownloadImage) {
      btnDownloadImage.addEventListener('click', downloadOptimizedImage);
    }

    if (btnDownloadSecondary) {
      btnDownloadSecondary.addEventListener('click', downloadOptimizedImage);
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

  // Translation Helper
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

    if (compressedBlob && originalSizeBytes > 0) {
      updateSavingsMetrics();
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
        loadImageData(img, file.name, file.size, file.type, e.target.result);
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

    targetWidth = originalDimensions.width;
    targetHeight = originalDimensions.height;

    // Reset settings
    currentScale = 1.0;
    currentQuality = 0.75;
    if (qualitySlider) qualitySlider.value = 75;
    if (qualityValueDisplay) qualityValueDisplay.textContent = '75%';

    presetButtons.forEach(b => {
      b.classList.remove('active');
      if (b.getAttribute('data-quality') === '75') b.classList.add('active');
    });

    scaleButtons.forEach(b => {
      b.classList.remove('active');
      if (b.getAttribute('data-scale') === '100') b.classList.add('active');
    });

    if (widthInput) widthInput.value = targetWidth;
    if (heightInput) heightInput.value = targetHeight;

    // UI Updates
    if (fileNameDisplay) fileNameDisplay.textContent = fileName;
    if (origSizeBadge) origSizeBadge.textContent = formatBytes(fileSize);
    if (origDimensionsBadge) origDimensionsBadge.textContent = `${targetWidth} × ${targetHeight} px`;
    if (previewOrigSize) previewOrigSize.textContent = formatBytes(fileSize);
    if (previewOrigRes) previewOrigRes.textContent = `${targetWidth} × ${targetHeight} px`;
    if (origImgPreview) origImgPreview.src = dataUrl;

    updateFormatBadge();
    updateDimensionsDisplay();

    // Reveal Workspace
    if (dropzone) dropzone.parentElement.classList.add('hidden');
    if (workspacePanel) workspacePanel.classList.remove('hidden');

    // Run initial compression
    executeCompression();

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function updateDimensionsDisplay() {
    if (targetDimensionsDisplay) {
      targetDimensionsDisplay.textContent = `${targetWidth} × ${targetHeight} px`;
    }
  }

  function updateFormatBadge() {
    if (!outputFormatBadge) return;
    let label = 'JPEG';
    if (chosenMimeType === 'auto') {
      if (originalFile && originalFile.type === 'image/png') label = 'PNG';
      else if (originalFile && originalFile.type === 'image/webp') label = 'WebP';
      else label = 'JPEG';
    } else if (chosenMimeType === 'image/png') {
      label = 'PNG';
    } else if (chosenMimeType === 'image/webp') {
      label = 'WebP';
    } else {
      label = 'JPEG';
    }
    outputFormatBadge.textContent = label;
  }

  function getEffectiveMimeType() {
    if (chosenMimeType !== 'auto') return chosenMimeType;
    if (originalFile && originalFile.type === 'image/png') return 'image/png';
    if (originalFile && originalFile.type === 'image/webp') return 'image/webp';
    return 'image/jpeg';
  }

  function triggerDebouncedCompression() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      executeCompression();
    }, 80);
  }

  function executeCompression() {
    if (!originalImage || isProcessing) return;

    isProcessing = true;
    try {
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, targetWidth);
      canvas.height = Math.max(1, targetHeight);

      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      const mimeType = getEffectiveMimeType();

      // If output is JPEG and source might have transparency, fill with clean white
      if (mimeType === 'image/jpeg') {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);

      canvas.toBlob((blob) => {
        isProcessing = false;
        if (!blob) {
          showToast(t('toast_error'), 'error');
          return;
        }

        compressedBlob = blob;
        compressedDataUrl = URL.createObjectURL(blob);

        if (optImgPreview) optImgPreview.src = compressedDataUrl;
        if (previewOptSize) previewOptSize.textContent = formatBytes(blob.size);
        if (previewOptRes) previewOptRes.textContent = `${canvas.width} × ${canvas.height} px`;

        updateSavingsMetrics();

      }, mimeType, currentQuality);

    } catch (err) {
      isProcessing = false;
      console.error('Compression error:', err);
      showToast(t('toast_error') + ` (${err.message})`, 'error');
    }
  }

  function updateSavingsMetrics() {
    if (!compressedBlob || originalSizeBytes === 0) return;

    const compSize = compressedBlob.size;
    const diff = originalSizeBytes - compSize;
    const pct = Math.max(0, Math.round((diff / originalSizeBytes) * 100));

    if (previewSavingsTag) {
      if (pct > 0) {
        previewSavingsTag.textContent = `-${pct}%`;
        previewSavingsTag.style.color = '#34d399';
      } else {
        previewSavingsTag.textContent = `+0%`;
        previewSavingsTag.style.color = '#fbbf24';
      }
    }

    if (savingsHeadline) {
      savingsHeadline.textContent = t('savings_headline_text', {
        pct: pct,
        saved: formatBytes(Math.max(0, diff))
      });
    }

    if (savingsDetails) {
      savingsDetails.textContent = t('savings_details_text', {
        orig: formatBytes(originalSizeBytes),
        comp: formatBytes(compSize)
      });
    }
  }

  function downloadOptimizedImage() {
    if (!compressedBlob) return;

    showToast(t('toast_downloading'), 'info');

    const origName = originalFile ? originalFile.name : 'image.jpg';
    const baseName = origName.replace(/\.[^/.]+$/, '');
    const mimeType = getEffectiveMimeType();

    let ext = '.jpg';
    if (mimeType === 'image/png') ext = '.png';
    else if (mimeType === 'image/webp') ext = '.webp';

    const outFilename = `${baseName}_optimized${ext}`;

    const url = URL.createObjectURL(compressedBlob);
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
    compressedBlob = null;
    compressedDataUrl = null;
    isProcessing = false;

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

    // Gradient background
    const grad = ctx.createLinearGradient(0, 0, 1600, 1000);
    grad.addColorStop(0, '#0f172a');
    grad.addColorStop(0.5, '#1e1b4b');
    grad.addColorStop(1, '#0284c7');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1600, 1000);

    // Decorative geometric patterns & gradients
    for (let i = 0; i < 40; i++) {
      ctx.beginPath();
      ctx.arc(
        Math.random() * 1600,
        Math.random() * 1000,
        Math.random() * 150 + 20,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 200)}, 255, ${Math.random() * 0.25 + 0.05})`;
      ctx.fill();
    }

    // Modern Header Card Box
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.roundRect(100, 100, 1400, 800, 30);
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.stroke();

    // Typography & Branding Stamp
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 54px Outfit, Inter, sans-serif';
    ctx.fillText('PDF NETIZEN • IMAGE COMPRESSOR PRO', 160, 240);

    ctx.fillStyle = '#fbbf24';
    ctx.font = '36px Outfit, Inter, sans-serif';
    ctx.fillText('High-Resolution 1600 × 1000 px Sample Canvas', 160, 310);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '28px Inter, sans-serif';
    ctx.fillText('100% Client-Side In-Browser Image Optimization & Resizing', 160, 380);

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 44px Cairo, sans-serif';
    ctx.fillText('تجربة ضغط الصور الذكية وعالية الدقة محلياً', 160, 480);

    // Visual Color Grid Chips
    const colors = ['#f43f5e', '#ec4899', '#a855f7', '#6366f1', '#3b82f6', '#06b6d4', '#10b981', '#f59e0b'];
    colors.forEach((col, idx) => {
      ctx.fillStyle = col;
      ctx.roundRect(160 + (idx * 155), 580, 130, 180, 16);
      ctx.fill();
    });

    sampleCanvas.toBlob((blob) => {
      const dataUrl = URL.createObjectURL(blob);
      const img = new Image();
      img.onload = () => {
        loadImageData(img, 'sample_landscape_photo.jpg', blob.size, 'image/jpeg', dataUrl);
      };
      img.src = dataUrl;
    }, 'image/jpeg', 0.96);
  }

})();
