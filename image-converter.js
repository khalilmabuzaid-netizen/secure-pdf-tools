/**
 * Image Converter Pro - 100% Client-Side Processing
 * Converts images between PNG, JPEG/JPG, and WebP using HTML5 Canvas API
 * Zero Server Uploads • Fast & Private • English & Arabic RTL Support
 */

(function () {
  'use strict';

  // Master Bilingual Translation Dictionary
  const translations = {
    en: {
      badge_client_side: "100% Client-Side",
      nav_home: "Home",
      imgconv_hero_badge: "100% Client-Side Image Converter • Zero Server Uploads",
      imgconv_hero_title: 'Convert <span class="gradient-text">Image Formats</span>',
      imgconv_hero_subtitle: "Transform PNG, JPG/JPEG, and WebP images instantly inside your browser. Fast, private, and 100% client-side with custom quality control and transparency options.",
      imgconv_dropzone_title: "Drop your image here to convert",
      imgconv_dropzone_subtitle: "Supports PNG, JPG/JPEG, WebP, GIF, BMP, and SVG files. Conversion executes locally in your browser memory.",
      imgconv_btn_browse: "Browse Image File",
      imgconv_btn_sample: "Try Sample Image",
      imgconv_btn_change: "Change Image",
      imgconv_target_format_label: "Select Target Output Format",
      imgconv_badge_lossless: "Lossless",
      imgconv_badge_universal: "Universal",
      imgconv_badge_modern: "Modern Web",
      imgconv_desc_png: "Crystal-clear clarity with alpha channel transparency. Best for graphics, logos, and icons.",
      imgconv_desc_jpeg: "High compression and small file sizes. Universal compatibility across all web and mobile apps.",
      imgconv_desc_webp: "Next-gen Google format offering up to 35% smaller sizes than JPG while retaining transparency.",
      imgconv_quality_label: "Output Quality",
      imgconv_q_low: "50% (Small)",
      imgconv_q_med: "75% (Balanced)",
      imgconv_q_high: "90% (High)",
      imgconv_q_max: "100% (Max)",
      imgconv_bg_color_label: "JPEG Background Fill",
      imgconv_bg_color_hint: "Used when converting transparency to JPG",
      imgconv_orig_preview_title: "Original Image",
      imgconv_conv_preview_title: "Converted Result",
      imgconv_btn_download: "Download Converted Image",
      ad_space_label: "Advertisement Space (728x90)",
      footer_tagline: "100% Client-side, private, and secure document processing directly in your browser.",
      footer_privacy: "Privacy Policy",
      footer_terms: "Terms of Service",
      footer_contact: "Contact Us",
      footer_copyright: "© 2026 PDF Hub. All rights reserved.",
      cookie_consent_text: "We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.",
      cookie_learn_more: "Privacy Policy",
      cookie_accept_btn: "Accept",
      toast_sample_loaded: "Sample multi-colored image loaded successfully.",
      toast_converted: "Image successfully converted!",
      toast_downloading: "Downloading converted image...",
      toast_invalid_img: "Please upload a valid image file (PNG, JPG, WebP, GIF, BMP, or SVG).",
      toast_error: "An error occurred during image conversion.",
      savings_headline_text: "{fromFmt} converted to {toFmt} ({status})",
      savings_details_text: "Original: {origSize} ➔ Converted: {convSize}",
      status_size_reduced: "{pct}% smaller",
      status_size_increased: "{pct}% larger (high fidelity)",
      status_lossless: "100% Lossless fidelity",
      imgconv_seo_badge: "Fast, Private & High-Fidelity Conversion",
      imgconv_seo_title: "How to Convert Images Online for Free",
      imgconv_seo_subtitle: "Effortlessly switch image formats between PNG, JPG, and WebP using client-side HTML5 canvas technology without uploading your sensitive pictures to remote servers.",
      imgconv_step1_title: "1. Upload Any Image",
      imgconv_step1_desc: "Drop any PNG, JPG, JPEG, WebP, GIF, or BMP image directly into the browser workspace to load it instantly.",
      imgconv_step2_title: "2. Choose Target Format",
      imgconv_step2_desc: "Select your desired output format (PNG, JPEG, WebP) and fine-tune quality settings and background fills.",
      imgconv_step3_title: "3. Instant Download",
      imgconv_step3_desc: "Preview the converted result side-by-side with the original and download the optimized file locally in 1 click.",
      imgconv_matrix_from: "Source Format",
      imgconv_matrix_to: "Target Formats",
      imgconv_matrix_features: "Key Advantage",
      imgconv_matrix_png_desc: "Massive file size reduction, transparent background to color fill or WebP alpha preservation.",
      imgconv_matrix_jpg_desc: "Lossless re-encoding or next-gen WebP compression for faster web page loading.",
      imgconv_matrix_webp_desc: "Convert modern WebP graphics to universal formats compatible with legacy software and printers.",
      imgconv_faq_title: "Frequently Asked Questions",
      imgconv_faq_q1: "Are my images uploaded to any cloud server during conversion?",
      imgconv_faq_a1: "No, never. All image format conversions are processed 100% locally inside your browser using HTML5 Canvas and client-side JavaScript. Your files never leave your computer or phone.",
      imgconv_faq_q2: "What happens to transparent backgrounds when converting PNG to JPG?",
      imgconv_faq_a2: "Since the JPEG standard does not support alpha transparency channels, any transparent pixels are cleanly filled with your chosen background color (pure white by default or customizable to black or any custom color).",
      imgconv_faq_q3: "Why should I convert my images to WebP?",
      imgconv_faq_a3: "WebP is a modern image format developed by Google that provides superior lossless and lossy compression. WebP images are typically 25% to 35% smaller than comparable JPEGs and PNGs while maintaining the exact same visual quality and supporting transparency.",
      imgconv_faq_q4: "Is there any limit on how many images I can convert?",
      imgconv_faq_a4: "There are zero limits! You can convert as many images as you need with zero registrations, zero watermarks, and completely free of charge."
    },
    ar: {
      badge_client_side: "محلي ١٠٠٪ في المتصفح",
      nav_home: "الرئيسية",
      imgconv_hero_badge: "تحويل صيغ الصور محلياً ١٠٠٪ • بدون أي رفع سحابي",
      imgconv_hero_title: 'تحويل <span class="gradient-text">صيغ الصور</span>',
      imgconv_hero_subtitle: "حوّل صور PNG و JPG/JPEG و WebP فورياً ومباشرة في متصفحك. سريع، خاص، وبمعالجة محلية ١٠٠٪ مع تحكم في الجودة وخيارات الشفافية.",
      imgconv_dropzone_title: "اسحب الصورة هنا لتحويل صيغتها",
      imgconv_dropzone_subtitle: "يدعم ملفات PNG و JPG/JPEG و WebP و GIF و BMP و SVG. تتم عملية التحويل محلياً في ذاكرة متصفحك.",
      imgconv_btn_browse: "استعراض ملف الصورة",
      imgconv_btn_sample: "تجربة صورة نموذجية",
      imgconv_btn_change: "تغيير الصورة",
      imgconv_target_format_label: "اختر الصيغة المستهدفة للتحويل",
      imgconv_badge_lossless: "فائق النقاء",
      imgconv_badge_universal: "شامل التوافق",
      imgconv_badge_modern: "ويب حديث",
      imgconv_desc_png: "وضوح فائق الدقة مع دعم قنوات الشفافية الكاملة. الأفضل للرسومات والشعارات والأيقونات.",
      imgconv_desc_jpeg: "ضغط عالٍ وحجم ملفات صغير جداً. توافق شامل مع كافة التطبيقات والمواقع والأجهزة.",
      imgconv_desc_webp: "صيغة متطورة من Google توفر حجماً أصغر بنسبة تصل إلى ٣٥٪ مقارنة بـ JPG مع دعم الشفافية.",
      imgconv_quality_label: "مستوى الجودة",
      imgconv_q_low: "٥٠٪ (حجم صغير)",
      imgconv_q_med: "٧٥٪ (متوازن)",
      imgconv_q_high: "٩٠٪ (عالي)",
      imgconv_q_max: "١٠٠٪ (أقصى جودة)",
      imgconv_bg_color_label: "لون خلفية JPEG",
      imgconv_bg_color_hint: "يستخدم عند تحويل الصور الشفافة إلى JPG",
      imgconv_orig_preview_title: "الصورة الأصلية",
      imgconv_conv_preview_title: "النتيجة بعد التحويل",
      imgconv_btn_download: "تحميل الصورة المحولة",
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
      toast_converted: "تم تحويل صيغة الصورة بنجاح!",
      toast_downloading: "جاري تحميل الصورة المحولة...",
      toast_invalid_img: "يرجى اختيار ملف صورة صالح (PNG أو JPG أو WebP أو GIF أو BMP أو SVG).",
      toast_error: "حدث خطأ أثناء تحويل الصورة.",
      savings_headline_text: "تم التحويل من {fromFmt} إلى {toFmt} ({status})",
      savings_details_text: "الحجم الأصلي: {origSize} ➔ بعد التحويل: {convSize}",
      status_size_reduced: "توفير {pct}٪ من الحجم",
      status_size_increased: "أكبر بـ {pct}٪ (دقة فائقة)",
      status_lossless: "دقة وجودة كاملة ١٠٠٪",
      imgconv_seo_badge: "تحويل فائق السرعة، الأمان والدقة",
      imgconv_seo_title: "كيفية تحويل صيغ الصور أونلاين مجاناً",
      imgconv_seo_subtitle: "بدل بين صيغ PNG و JPG و WebP بسهولة باستخدام تقنيات HTML5 Canvas دون الحاجة لرفع صورك الخاصة إلى خوادم خارجية.",
      imgconv_step1_title: "١. رفع أي صورة",
      imgconv_step1_desc: "أفلت أي صورة PNG أو JPG أو JPEG أو WebP أو GIF أو BMP مباشرة داخل المتصفح لتحميلها فورياً.",
      imgconv_step2_title: "٢. اختيار الصيغة المستهدفة",
      imgconv_step2_desc: "حدد الصيغة المرغوبة (PNG أو JPEG أو WebP) واضبط إعدادات الجودة ولون الخلفية كما تحب.",
      imgconv_step3_title: "٣. التحميل الفوري",
      imgconv_step3_desc: "عاين النتيجة جنباً إلى جنب مع الصورة الأصلية وحمّل الصورة الجديدة بنقرة واحدة.",
      imgconv_matrix_from: "صيغة المصدر",
      imgconv_matrix_to: "الصيغ المدعومة",
      imgconv_matrix_features: "الميزة الأساسية",
      imgconv_matrix_png_desc: "تقليل هائل للحجم، تعبئة الشفافية بلون مخصص، أو الحفاظ على الشفافية بصيغة WebP.",
      imgconv_matrix_jpg_desc: "إعادة ترميز فائقة النقاء أو تحويل لصيغة WebP الحديثة لتسريع تحميل المواقع.",
      imgconv_matrix_webp_desc: "تحويل صور WebP الحديثة إلى صيغ شاملة التوافق مع كافة البرامج والمطابع.",
      imgconv_faq_title: "الأسئلة الشائعة",
      imgconv_faq_q1: "هل يتم رفع صوري إلى خوادم سحابية أثناء عملية التحويل؟",
      imgconv_faq_a1: "كلا على الإطلاق. تتم جميع عمليات تحويل صيغ الصور محلياً ١٠٠٪ داخل متصفحك عبر HTML5 Canvas و JavaScript، ولا تغادر صورك جهازك أبداً.",
      imgconv_faq_q2: "ماذا يحدث للخلفيات الشفافة عند التحويل من PNG إلى JPG؟",
      imgconv_faq_a2: "نظراً لأن صيغة JPG لا تدعم الشفافية، يتم ملء البكسلات الشفافة بلون الخلفية الذي تختاره (أبيض ناصع افتراضياً، أو أسود، أو أي لون مخصص تختاره).",
      imgconv_faq_q3: "لماذا ينصح بتحويل الصور إلى صيغة WebP؟",
      imgconv_faq_a3: "تعد WebP صيغة عصرية طورتها Google لضغط الصور بكفاءة فائقة. فهي توفر أحجاماً أصغر بنسبة تتراوح بين ٢٥٪ و ٣٥٪ مقارنة بـ JPG و PNG مع الحفاظ على نفس النقاء ودعم الشفافية.",
      imgconv_faq_q4: "هل هناك حد أقصى لعدد الصور التي يمكنني تحويلها؟",
      imgconv_faq_a4: "لا توجد أي قيود إطلاقاً! يمكنك تحويل أي عدد من الصور مجاناً بدون تسجيل وبدون أي علامات مائية."
    }
  };

  let currentLang = 'en';
  let originalImage = null;
  let originalFile = null;
  let originalDimensions = { width: 0, height: 0 };
  let originalSizeBytes = 0;
  let originalMimeType = 'image/png';

  let targetMimeType = 'image/png';
  let targetQuality = 0.90;
  let jpegBgColor = '#ffffff';

  let convertedBlob = null;
  let convertedDataUrl = null;
  let isConverting = false;
  let debounceTimer = null;

  // Cached DOM Elements
  let dropzone, fileInput, btnBrowse, btnLoadSample;
  let workspacePanel, metaThumbnail, fileNameDisplay, origFormatBadge, origSizeBadge, origDimensionsBadge, btnChangeFile;
  let formatCards, qualityControlGroup, qualitySlider, qualityValDisplay, qualityPresetBtns;
  let bgColorControlGroup, bgColorVal, colorOptions, customColorPicker;
  let origPreviewImg, convPreviewImg, previewOrigFormatTag, previewConvFormatTag;
  let previewOrigSize, previewOrigDimensions, previewConvSize, previewConvDimensions;
  let savingsHeadline, savingsDetails, btnDownloadImage, btnDownloadText;
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
    origFormatBadge = document.getElementById('orig-format-badge');
    origSizeBadge = document.getElementById('orig-size-badge');
    origDimensionsBadge = document.getElementById('orig-dimensions-badge');
    btnChangeFile = document.getElementById('btn-change-file');

    formatCards = document.querySelectorAll('.format-card');
    qualityControlGroup = document.getElementById('quality-control-group');
    qualitySlider = document.getElementById('quality-slider');
    qualityValDisplay = document.getElementById('quality-val-display');
    qualityPresetBtns = document.querySelectorAll('.preset-btn[data-quality]');

    bgColorControlGroup = document.getElementById('bg-color-control-group');
    bgColorVal = document.getElementById('bg-color-val');
    colorOptions = document.querySelectorAll('.color-option');
    customColorPicker = document.getElementById('custom-color-picker');

    origPreviewImg = document.getElementById('orig-preview-img');
    convPreviewImg = document.getElementById('conv-preview-img');
    previewOrigFormatTag = document.getElementById('preview-orig-format-tag');
    previewConvFormatTag = document.getElementById('preview-conv-format-tag');
    previewOrigSize = document.getElementById('preview-orig-size');
    previewOrigDimensions = document.getElementById('preview-orig-dimensions');
    previewConvSize = document.getElementById('preview-conv-size');
    previewConvDimensions = document.getElementById('preview-conv-dimensions');

    savingsHeadline = document.getElementById('savings-headline');
    savingsDetails = document.getElementById('savings-details');
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

    // Format selection cards
    formatCards.forEach(card => {
      card.addEventListener('click', () => {
        formatCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        targetMimeType = card.getAttribute('data-target-fmt');
        updateControlsVisibility();
        triggerDebouncedConversion();
      });
    });

    // Quality slider
    if (qualitySlider) {
      qualitySlider.addEventListener('input', () => {
        targetQuality = parseInt(qualitySlider.value, 10) / 100;
        if (qualityValDisplay) qualityValDisplay.textContent = `${qualitySlider.value}%`;

        qualityPresetBtns.forEach(btn => btn.classList.remove('active'));
        qualityPresetBtns.forEach(btn => {
          if (parseInt(btn.getAttribute('data-quality'), 10) === parseInt(qualitySlider.value, 10)) {
            btn.classList.add('active');
          }
        });

        triggerDebouncedConversion();
      });
    }

    // Quality preset buttons
    qualityPresetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        qualityPresetBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const q = parseInt(btn.getAttribute('data-quality'), 10);
        if (qualitySlider) qualitySlider.value = q;
        targetQuality = q / 100;
        if (qualityValDisplay) qualityValDisplay.textContent = `${q}%`;
        triggerDebouncedConversion();
      });
    });

    // Background color options for JPEG
    colorOptions.forEach(opt => {
      opt.addEventListener('click', () => {
        colorOptions.forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        jpegBgColor = opt.getAttribute('data-color');
        if (bgColorVal) bgColorVal.textContent = jpegBgColor.toUpperCase();
        if (customColorPicker) customColorPicker.value = jpegBgColor;
        triggerDebouncedConversion();
      });
    });

    if (customColorPicker) {
      customColorPicker.addEventListener('input', (e) => {
        colorOptions.forEach(o => o.classList.remove('selected'));
        jpegBgColor = e.target.value;
        if (bgColorVal) bgColorVal.textContent = jpegBgColor.toUpperCase();
        triggerDebouncedConversion();
      });
    }

    // Download Button
    if (btnDownloadImage) {
      btnDownloadImage.addEventListener('click', downloadConvertedImage);
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

  function updateControlsVisibility() {
    if (bgColorControlGroup) {
      if (targetMimeType === 'image/jpeg') {
        bgColorControlGroup.style.display = 'flex';
      } else {
        bgColorControlGroup.style.display = 'none';
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

    if (convertedBlob && originalSizeBytes > 0) {
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

  function getFormatName(mimeType) {
    if (mimeType === 'image/png') return 'PNG';
    if (mimeType === 'image/jpeg' || mimeType === 'image/jpg') return 'JPG';
    if (mimeType === 'image/webp') return 'WebP';
    if (mimeType === 'image/gif') return 'GIF';
    if (mimeType === 'image/bmp') return 'BMP';
    if (mimeType === 'image/svg+xml') return 'SVG';
    return 'IMAGE';
  }

  function handleFile(file) {
    if (!file) return;

    if (!file.type.startsWith('image/') && !file.name.match(/\.(png|jpe?g|webp|gif|bmp|svg)$/i)) {
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
    originalMimeType = mimeType;

    // Pick smart default target format
    if (mimeType === 'image/png') {
      targetMimeType = 'image/webp';
    } else if (mimeType === 'image/jpeg' || mimeType === 'image/jpg') {
      targetMimeType = 'image/png';
    } else {
      targetMimeType = 'image/png';
    }

    // Update target format cards
    formatCards.forEach(c => {
      c.classList.remove('selected');
      if (c.getAttribute('data-target-fmt') === targetMimeType) {
        c.classList.add('selected');
      }
    });

    // Populate file info
    if (metaThumbnail) metaThumbnail.src = dataUrl;
    if (fileNameDisplay) fileNameDisplay.textContent = fileName;
    if (origFormatBadge) origFormatBadge.textContent = getFormatName(mimeType);
    if (origSizeBadge) origSizeBadge.textContent = formatBytes(fileSize);
    if (origDimensionsBadge) origDimensionsBadge.textContent = `${originalDimensions.width} × ${originalDimensions.height} px`;

    if (origPreviewImg) origPreviewImg.src = dataUrl;
    if (previewOrigFormatTag) previewOrigFormatTag.textContent = getFormatName(mimeType);
    if (previewOrigSize) previewOrigSize.textContent = formatBytes(fileSize);
    if (previewOrigDimensions) previewOrigDimensions.textContent = `${originalDimensions.width} × ${originalDimensions.height} px`;

    updateControlsVisibility();

    // Reveal Workspace
    if (dropzone) dropzone.parentElement.classList.add('hidden');
    if (workspacePanel) workspacePanel.classList.remove('hidden');

    // Run initial conversion
    executeConversion();

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function triggerDebouncedConversion() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      executeConversion();
    }, 60);
  }

  function executeConversion() {
    if (!originalImage || isConverting) return;

    isConverting = true;
    try {
      const canvas = document.createElement('canvas');
      canvas.width = originalDimensions.width;
      canvas.height = originalDimensions.height;

      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // If converting to JPEG, fill background with chosen color (white by default)
      if (targetMimeType === 'image/jpeg') {
        ctx.fillStyle = jpegBgColor || '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);

      canvas.toBlob((blob) => {
        isConverting = false;
        if (!blob) {
          showToast(t('toast_error'), 'error');
          return;
        }

        convertedBlob = blob;
        convertedDataUrl = URL.createObjectURL(blob);

        if (convPreviewImg) convPreviewImg.src = convertedDataUrl;
        if (previewConvFormatTag) previewConvFormatTag.textContent = getFormatName(targetMimeType);
        if (previewConvSize) previewConvSize.textContent = formatBytes(blob.size);
        if (previewConvDimensions) previewConvDimensions.textContent = `${canvas.width} × ${canvas.height} px`;

        updateStatusMetrics();

      }, targetMimeType, targetQuality);

    } catch (err) {
      isConverting = false;
      console.error('Conversion error:', err);
      showToast(t('toast_error') + ` (${err.message})`, 'error');
    }
  }

  function updateStatusMetrics() {
    if (!convertedBlob || originalSizeBytes === 0) return;

    const convSize = convertedBlob.size;
    const diff = originalSizeBytes - convSize;
    const fromFmt = getFormatName(originalMimeType);
    const toFmt = getFormatName(targetMimeType);

    let statusText = '';
    if (diff > 0) {
      const pct = Math.round((diff / originalSizeBytes) * 100);
      statusText = t('status_size_reduced', { pct: pct });
    } else if (diff < 0) {
      const pct = Math.round((Math.abs(diff) / originalSizeBytes) * 100);
      statusText = t('status_size_increased', { pct: pct });
    } else {
      statusText = t('status_lossless');
    }

    if (savingsHeadline) {
      savingsHeadline.textContent = t('savings_headline_text', {
        fromFmt: fromFmt,
        toFmt: toFmt,
        status: statusText
      });
    }

    if (savingsDetails) {
      savingsDetails.textContent = t('savings_details_text', {
        origSize: formatBytes(originalSizeBytes),
        convSize: formatBytes(convSize)
      });
    }

    if (btnDownloadText) {
      btnDownloadText.textContent = `${t('imgconv_btn_download')} (${toFmt})`;
    }
  }

  function downloadConvertedImage() {
    if (!convertedBlob) return;

    showToast(t('toast_downloading'), 'info');

    const origName = originalFile ? originalFile.name : 'image';
    const baseName = origName.replace(/\.[^/.]+$/, '');

    let ext = '.png';
    if (targetMimeType === 'image/jpeg') ext = '.jpg';
    else if (targetMimeType === 'image/webp') ext = '.webp';

    const outFilename = `${baseName}_converted${ext}`;

    const url = URL.createObjectURL(convertedBlob);
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
    convertedBlob = null;
    convertedDataUrl = null;
    isConverting = false;

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
    grad.addColorStop(0, '#090d16');
    grad.addColorStop(0.4, '#083344');
    grad.addColorStop(1, '#0e7490');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1600, 1000);

    // Decorative geometric patterns & glowing bubbles
    for (let i = 0; i < 35; i++) {
      ctx.beginPath();
      ctx.arc(
        Math.random() * 1600,
        Math.random() * 1000,
        Math.random() * 160 + 25,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = `rgba(34, 211, 238, ${Math.random() * 0.2 + 0.05})`;
      ctx.fill();
    }

    // Glass Card Frame
    ctx.fillStyle = 'rgba(255, 255, 255, 0.07)';
    ctx.roundRect(120, 120, 1360, 760, 28);
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(34, 211, 238, 0.35)';
    ctx.stroke();

    // Typography
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 52px Outfit, Inter, sans-serif';
    ctx.fillText('PDF NETIZEN • IMAGE CONVERTER PRO', 180, 260);

    ctx.fillStyle = '#22d3ee';
    ctx.font = '34px Outfit, Inter, sans-serif';
    ctx.fillText('PNG ➔ JPG ➔ WebP In-Browser Format Engine', 180, 330);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '26px Inter, sans-serif';
    ctx.fillText('100% Client-Side Processing • Ultra-Fast • No Server Uploads', 180, 400);

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 42px Cairo, sans-serif';
    ctx.fillText('تحويل صيغ الصور فورياً ومحلياً بأعلى دقة', 180, 500);

    // Color Badges
    const palette = ['#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'];
    palette.forEach((color, idx) => {
      ctx.fillStyle = color;
      ctx.roundRect(180 + (idx * 160), 600, 130, 180, 16);
      ctx.fill();
    });

    sampleCanvas.toBlob((blob) => {
      const dataUrl = URL.createObjectURL(blob);
      const img = new Image();
      img.onload = () => {
        loadImageData(img, 'sample_vector_graphic.png', blob.size, 'image/png', dataUrl);
      };
      img.src = dataUrl;
    }, 'image/png');
  }

})();
