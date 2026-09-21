/**
 * PowerPoint (.pptx) to PDF Converter - 100% Client-Side Processing
 * Powered by JSZip, HTML5 Canvas & PDF-Lib (Zero Server Uploads • Fast & Private)
 * Bilingual English / Arabic (RTL) Support
 */

(function () {
  'use strict';

  // Master Bilingual Translation Dictionary
  const translations = {
    en: {
      badge_client_side: "100% Client-Side",
      nav_reset: "Reset",
      hero_badge: "100% Client-Side PowerPoint to PDF • Fast & Private",
      hero_title: 'Convert PowerPoint to <span class="gradient-text">PDF Document</span>',
      hero_subtitle: "Convert PowerPoint presentations (.pptx) to PDF documents locally in your browser. Fast, secure, and preserves slide formatting.",
      dropzone_title: "Drop your PowerPoint (.pptx) file here",
      dropzone_subtitle: "Select or drag & drop any PowerPoint presentation to preview extracted slides and convert to PDF.",
      btn_browse_file: "Browse PPTX File",
      btn_load_sample: "Try Sample Presentation",
      pill_slide_rendering: "High-Fidelity Slide Rendering",
      pill_client_privacy: "100% In-Browser Privacy",
      pill_instant_pdf: "Crisp PDF Compilation",
      btn_change_file: "Change File",
      slides_total: "{n} Slides Total",
      slides_single: "1 Slide Total",
      ratio_16_9: "16:9 Widescreen",
      ratio_4_3: "4:3 Standard",
      ratio_custom: "Custom Ratio",
      label_page_format: "PDF Format:",
      opt_format_auto: "Auto (Match Slide Dimensions)",
      opt_format_a4: "A4 Landscape",
      opt_format_letter: "US Letter Landscape",
      label_output_filename: "Output File Name:",
      placeholder_output_filename: "presentation",
      preview_title: "Extracted Slide Previews",
      slide_number: "Slide {n}",
      btn_convert_pdf: "Convert to PDF",
      btn_converting: "Compiling PDF Document...",
      progress_parsing: "Decompressing and parsing presentation slides...",
      progress_rendering: "Rendering slide {n} of {total}...",
      progress_compiling: "Compiling multi-page PDF document...",
      progress_finalizing: "Finalizing PDF package...",
      success_title: "PDF Created Successfully!",
      success_desc: "Your PowerPoint slides have been converted into a high-fidelity, multi-page PDF document. Download your file below.",
      btn_download_pdf: "Download PDF Document",
      btn_convert_another: "Convert Another Presentation",
      ad_space_label: "Advertisement Space (728x90)",
      guide_badge: "Instant Client-Side Conversion",
      guide_title: "How to Convert PowerPoint (.pptx) to PDF Online",
      guide_subtitle: "Transform your presentation slides into clean, standardized PDF pages in three simple steps directly in your browser.",
      step1_title: "Upload PowerPoint Presentation",
      step1_desc: "Drag and drop your .pptx presentation file into the dropzone or choose it from your device. Your file is read 100% locally in browser memory.",
      step2_title: "Preview Extracted Slides",
      step2_desc: "Review the rendered slide thumbnails in the live interactive grid. Check slide order, text alignment, and embedded graphics.",
      step3_title: "Download PDF Document",
      step3_desc: "Click Convert to PDF to generate a multi-page document matching the original slide ratio, saved directly to your device as [filename].pdf.",
      faq_badge: "Got Questions?",
      faq_title: "Frequently Asked Questions",
      faq_subtitle: "Everything you need to know about our free client-side PowerPoint to PDF converter.",
      faq_q1: "Are my presentations uploaded to any server?",
      faq_a1: "Never. All PowerPoint parsing, XML decompression, slide rendering, and PDF compilation run 100% locally in your browser memory using JSZip and PDF-Lib. Your confidential slides never touch the cloud.",
      faq_q2: "Does this converter support both 16:9 and 4:3 slide ratios?",
      faq_a2: "Yes! The converter automatically detects presentation dimensions from the presentation metadata and generates matching widescreen (16:9) or standard (4:3) PDF pages.",
      faq_q3: "Does it support Arabic right-to-left (RTL) text?",
      faq_a3: "Yes! The engine includes bidirectional text parsing and Arabic font rendering support, preserving correct text alignment and formatting for Arabic and multilingual slides.",
      faq_q4: "Are images and graphics preserved in the PDF?",
      faq_a4: "Yes. Embedded JPEG, PNG, and WebP images, vector shapes, backgrounds, and colored text elements are drawn onto high-resolution canvases before embedding into the PDF.",
      faq_q5: "Is there any file size limit or cost?",
      faq_a5: "No. The tool is 100% free with unlimited conversions, zero subscriptions, and no watermarks added to your documents.",
      faq_q6: "Can I use this tool on mobile phones and tablets?",
      faq_a6: "Yes! The responsive interface works smoothly across all modern browsers on iOS, Android, Windows, Mac, and Linux.",
      footer_tagline: "100% Client-side, private, and secure document processing directly in your browser.",
      footer_privacy: "Privacy Policy",
      footer_terms: "Terms of Service",
      footer_contact: "Contact Us",
      footer_copyright: "© 2026 PDF Hub. All rights reserved.",
      cookie_consent_text: "We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.",
      cookie_learn_more: "Privacy Policy",
      cookie_accept_btn: "Accept",
      toast_invalid_pptx: "Please upload a valid Microsoft PowerPoint (.pptx) presentation.",
      toast_sample_generating: "Generating sample PowerPoint presentation in memory...",
      toast_sample_loaded: "Sample presentation loaded with 3 slides!",
      toast_sample_error: "Error generating sample presentation: ",
      toast_parse_error: "Error parsing PPTX presentation: ",
      toast_convert_success: "PDF generated successfully!",
      toast_reset_success: "Workspace reset to initial state.",
      toast_download_started: "Downloading converted PDF..."
    },
    ar: {
      badge_client_side: "محلي ١٠٠٪ في المتصفح",
      nav_reset: "إعادة ضبط",
      hero_badge: "تحويل PowerPoint إلى PDF محلياً ١٠٠٪ • سرعة وخصوصية",
      hero_title: 'تحويل عروض PowerPoint إلى <span class="gradient-text">ملف PDF</span>',
      hero_subtitle: "حوّل عروض البوربوينت (.pptx) إلى مستندات PDF عالية الجودة مباشرة داخل متصفحك بأمان وخصوصية محلية ١٠٠٪ مع الحفاظ على التنسيق.",
      dropzone_title: "اسحب ملف PowerPoint (.pptx) هنا للتحويل",
      dropzone_subtitle: "حدد أو اسحب وأفلت أي عرض تقديمي لمعاينة الشرائح المستخرجة وتحويلها فوراً إلى PDF.",
      btn_browse_file: "استعراض ملف PPTX",
      btn_load_sample: "تجربة عرض تقديمي نموذجي",
      pill_slide_rendering: "معاينة شرائح فائقة الدقة",
      pill_client_privacy: "خصوصية محلية ١٠٠٪",
      pill_instant_pdf: "توليد PDF نقي ومباشر",
      btn_change_file: "تغيير الملف",
      slides_total: "{n} شرائح إجمالاً",
      slides_single: "شريحة واحدة",
      ratio_16_9: "شاشة عريضة 16:9",
      ratio_4_3: "قياسي 4:3",
      ratio_custom: "أبعاد مخصصة",
      label_page_format: "صيغة الـ PDF:",
      opt_format_auto: "تلقائي (مطابقة أبعاد الشريحة)",
      opt_format_a4: "A4 أفقي (Landscape)",
      opt_format_letter: "Letter أفقي (US Letter)",
      label_output_filename: "اسم الملف الناتج:",
      placeholder_output_filename: "presentation",
      preview_title: "معاينة الشرائح المستخرجة",
      slide_number: "شريحة {n}",
      btn_convert_pdf: "تحويل إلى PDF",
      btn_converting: "جاري توليد ملف الـ PDF...",
      progress_parsing: "جاري فك ضغط وتحليل شرائح العرض التقديمي...",
      progress_rendering: "جاري رسم الشريحة {n} من {total}...",
      progress_compiling: "جاري تجميع صفحات الـ PDF متعددة الصفحات...",
      progress_finalizing: "جاري استكمال ملف الـ PDF...",
      success_title: "تم إنشاء ملف الـ PDF بنجاح!",
      success_desc: "تم تحويل شرائح PowerPoint إلى مستند PDF متناسق وعالي الدقة. يمكنك تنزيل ملفك مباشرة من الزر أدناه.",
      btn_download_pdf: "تحميل مستند PDF",
      btn_convert_another: "تحويل عرض تقديمي آخر",
      ad_space_label: "مساحة إعلانية (728×90)",
      guide_badge: "تحويل فوري بدون رفع سحابي",
      guide_title: "كيفية تحويل ملفات PowerPoint (.pptx) إلى PDF عبر الإنترنت",
      guide_subtitle: "حوّل شرائح عروضك التقديمية إلى صفحات PDF منظمة في ثلاث خطوات سريعة ومباشرة في متصفحك.",
      step1_title: "١. رفع العرض التقديمي",
      step1_desc: "اسحب وأفلت ملف البوربوينت (.pptx) داخل منطقة الرفع أو استعرضه من جهازك المكتبي أو المحمول.",
      step2_title: "٢. معاينة الشرائح المستخرجة",
      step2_desc: "شاهد مصغرات الشرائح التفاعلية وتأكد من ترتيب الصفحات ومحاذاة النصوص والرسومات بدقة.",
      step3_title: "٣. تحميل مستند PDF",
      step3_desc: "اضغط على زر التحويل لإنشاء مستند PDF مطابق لأبعاد الشريحة الأصلية وتنزيله فورياً على جهازك.",
      faq_badge: "هل لديك أسئلة؟",
      faq_title: "الأسئلة الشائعة",
      faq_subtitle: "كل ما تحتاج معرفته حول أداة تحويل البوربوينت إلى PDF المجانية والمحلية بالكامل.",
      faq_q1: "هل يتم رفع عروضي التقديمية إلى أي خادم خارجي؟",
      faq_a1: "لا على الإطلاق. تجري معالجة فك ضغط PPTX ورسم الشرائح وتوليد الـ PDF بالكامل محلياً بنسبة ١٠٠٪ في ذاكرة المتصفح دون نقل أي بيانات.",
      faq_q2: "هل تدعم الأداة نسب العرض 16:9 و 4:3؟",
      faq_a2: "نعم! يتعرف المحرك تلقائياً على أبعاد الشريحة الأصلية ويولّد صفحات PDF متوافقة تماماً مع الأبعاد العريضة (16:9) أو القياسية (4:3).",
      faq_q3: "هل تدعم الأداة النصوص العربية واتجاه اليمين لليسار (RTL)؟",
      faq_a3: "نعم بكل تأكيد! يدعم المحرك النصوص ثنائية الاتجاه والخطوط العربية مثل Cairo و Tahoma للحفاظ على سلامة النصوص والتنسيق العربي.",
      faq_q4: "هل يتم الحفاظ على الصور والأشكال التوضيحية داخل الـ PDF؟",
      faq_a4: "نعم، يتم استخراج الصور المضمنة والأشكال المتجهة والألوان والخلفيات ورسمها بدقة فائقة قبل تثبيتها داخل صفحات الـ PDF.",
      faq_q5: "هل هناك أي حد على حجم الملف أو تكلفة التحويل؟",
      faq_a5: "لا، الأداة مجانية بالكامل بدون أي اشتراكات أو قيود على عدد الشرائح وبدون إضافة أي علامات مائية.",
      faq_q6: "هل يمكن استخدام الأداة عبر الهواتف والأجهزة اللوحية؟",
      faq_a6: "نعم! الواجهة مصممة لتكون متجاوبة بالكامل وتعمل بسلاسة على الهواتف الذكية والأجهزة اللوحية وكافة أنظمة التشغيل.",
      footer_tagline: "معالجة مستندات محلية ١٠٠٪، خاصة وآمنة تماماً مباشرة في متصفحك.",
      footer_privacy: "سياسة الخصوصية",
      footer_terms: "شروط الاستخدام",
      footer_contact: "اتصل بنا",
      footer_copyright: "© ٢٠٢٦ PDF Hub. جميع الحقوق محفوظة.",
      cookie_consent_text: "نحن نستخدم ملفات تعريف الارتباط لتحسين تجربتك. باستمرارك في زيارة هذا الموقع، فإنك توافق على استخدامنا لملفات تعريف الارتباط.",
      cookie_learn_more: "سياسة الخصوصية",
      cookie_accept_btn: "موافق",
      toast_invalid_pptx: "يرجى اختيار ملف PowerPoint بصيغة .pptx صالحة.",
      toast_sample_generating: "جاري إنشاء عرض بوربوينت تجريبي في الذاكرة...",
      toast_sample_loaded: "تم تحميل العرض التجريبي بنجاح مع ٣ شرائح!",
      toast_sample_error: "حدث خطأ أثناء إنشاء العرض التجريبي: ",
      toast_parse_error: "خطأ أثناء قراءة ملف PPTX: ",
      toast_convert_success: "تم إنشاء ملف PDF بنجاح!",
      toast_reset_success: "تمت إعادة ضبط مساحة العمل بنجاح.",
      toast_download_started: "جاري تنزيل ملف PDF الناتج..."
    }
  };

  // State
  let currentFile = null;
  let originalBaseName = '';
  let parsedSlides = []; // Array of { id, canvas, width, height }
  let presentationDimensions = { widthEMU: 12192000, heightEMU: 6858000, widthPt: 960, heightPt: 540, ratio: '16:9' };
  let themeColors = {};
  let isConverting = false;
  let generatedPdfBlob = null;
  let generatedPdfFilename = '';
  let currentLang = 'en';

  // Cached DOM Elements
  let dropzone, fileInput, btnBrowseFile, btnLoadSample;
  let workspacePanel, fileNameDisplay, fileSizeDisplay, slidesCountBadge, slidesCountText, aspectRatioBadge, btnChangeFile;
  let pdfPageFormatSelect, outputFilenameInput, slidesGrid;
  let btnConvertPdf, btnConvertSpinner, btnConvertIcon, btnConvertText;
  let conversionProgress, progressStatusText, progressPercent, progressBarFill;
  let successDownloadCard, pdfFilenameDisplay, pdfFilesizeDisplay, btnDownloadPdf, btnConvertAnother;
  let btnHeaderReset, btnLanguageToggle, langToggleText;
  let toastEl, toastMsgEl, toastIconEl;

  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    cacheElements();
    bindEvents();
    applyLanguage(currentLang);

    if (window.lucide) {
      window.lucide.createIcons();
    }
  });

  function cacheElements() {
    dropzone = document.getElementById('dropzone');
    fileInput = document.getElementById('pptx-file-input');
    btnBrowseFile = document.getElementById('btn-browse-file');
    btnLoadSample = document.getElementById('btn-load-sample');

    workspacePanel = document.getElementById('workspace-panel');
    fileNameDisplay = document.getElementById('file-name-display');
    fileSizeDisplay = document.getElementById('file-size-display');
    slidesCountBadge = document.getElementById('slides-count-badge');
    slidesCountText = document.getElementById('slides-count-text');
    aspectRatioBadge = document.getElementById('aspect-ratio-badge');
    btnChangeFile = document.getElementById('btn-change-file');

    pdfPageFormatSelect = document.getElementById('pdf-page-format');
    outputFilenameInput = document.getElementById('output-filename-input');
    slidesGrid = document.getElementById('slides-grid');

    btnConvertPdf = document.getElementById('btn-convert-pdf');
    btnConvertSpinner = document.getElementById('btn-convert-spinner');
    btnConvertIcon = document.getElementById('btn-convert-icon');
    btnConvertText = document.getElementById('btn-convert-text');

    conversionProgress = document.getElementById('conversion-progress');
    progressStatusText = document.getElementById('progress-status-text');
    progressPercent = document.getElementById('progress-percent');
    progressBarFill = document.getElementById('progress-bar-fill');

    successDownloadCard = document.getElementById('success-download-card');
    pdfFilenameDisplay = document.getElementById('pdf-filename-display');
    pdfFilesizeDisplay = document.getElementById('pdf-filesize-display');
    btnDownloadPdf = document.getElementById('btn-download-pdf');
    btnConvertAnother = document.getElementById('btn-convert-another');

    btnHeaderReset = document.getElementById('btn-header-reset');
    btnLanguageToggle = document.getElementById('btn-language-toggle');
    langToggleText = document.getElementById('lang-toggle-text');

    toastEl = document.getElementById('toast');
    toastMsgEl = document.getElementById('toast-message');
    toastIconEl = document.getElementById('toast-icon');
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

    // Update static text elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = t(key);
      if (translation) {
        if (translation.includes('<span')) {
          el.innerHTML = translation;
        } else {
          el.textContent = translation;
        }
      }
    });

    // Update input placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const translation = t(key);
      if (translation) {
        el.placeholder = translation;
      }
    });

    // Update dynamic slide count badge
    if (parsedSlides.length > 0 && slidesCountText) {
      slidesCountText.textContent = (parsedSlides.length === 1)
        ? t('slides_single')
        : t('slides_total', { n: parsedSlides.length });
    }

    // Update aspect ratio badge
    if (aspectRatioBadge) {
      if (presentationDimensions.ratio === '16:9') aspectRatioBadge.textContent = t('ratio_16_9');
      else if (presentationDimensions.ratio === '4:3') aspectRatioBadge.textContent = t('ratio_4_3');
      else aspectRatioBadge.textContent = t('ratio_custom');
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function bindEvents() {
    // Language Toggle
    if (btnLanguageToggle) {
      btnLanguageToggle.addEventListener('click', toggleLanguage);
    }

    // File Input Trigger Buttons
    if (btnBrowseFile && fileInput) {
      btnBrowseFile.addEventListener('click', () => fileInput.click());
    }

    if (btnChangeFile && fileInput) {
      btnChangeFile.addEventListener('click', () => fileInput.click());
    }

    // Dropzone Drag & Drop
    if (dropzone && fileInput) {
      dropzone.addEventListener('click', (e) => {
        if (e.target.closest('button')) return;
        fileInput.click();
      });

      ['dragenter', 'dragover'].forEach(eventName => {
        dropzone.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          dropzone.classList.add('drag-over');
        });
      });

      ['dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          dropzone.classList.remove('drag-over');
        });
      });

      dropzone.addEventListener('drop', (e) => {
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
          handleFileSelection(files[0]);
        }
      });
    }

    // File Input change
    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files.length > 0) {
          handleFileSelection(e.target.files[0]);
        }
      });
    }

    // Sample PPTX Loader
    if (btnLoadSample) {
      btnLoadSample.addEventListener('click', loadSamplePresentation);
    }

    // Convert Action Button
    if (btnConvertPdf) {
      btnConvertPdf.addEventListener('click', executePdfConversion);
    }

    // Download Button
    if (btnDownloadPdf) {
      btnDownloadPdf.addEventListener('click', triggerPdfDownload);
    }

    // Reset & Convert Another Buttons
    if (btnConvertAnother) {
      btnConvertAnother.addEventListener('click', resetWorkspace);
    }

    if (btnHeaderReset) {
      btnHeaderReset.addEventListener('click', resetWorkspace);
    }

    // Cookie Consent
    const btnAcceptCookies = document.getElementById('btn-accept-cookies');
    const cookieBanner = document.getElementById('cookie-banner');
    if (btnAcceptCookies && cookieBanner) {
      btnAcceptCookies.addEventListener('click', () => {
        cookieBanner.classList.add('hidden');
        try {
          localStorage.setItem('cookie_consent', 'accepted');
        } catch (e) { }
      });
      try {
        if (localStorage.getItem('cookie_consent') === 'accepted') {
          cookieBanner.classList.add('hidden');
        }
      } catch (e) { }
    }
  }

  // Handle PPTX File Selection
  async function handleFileSelection(file) {
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.pptx')) {
      showToast(t('toast_invalid_pptx'), 'error');
      return;
    }

    if (!window.JSZip) {
      showToast('JSZip decompression library is still loading. Please try again in a moment.', 'warning');
      return;
    }

    try {
      showLoadingState(true);
      updateProgress(10, t('progress_parsing'));

      currentFile = file;
      originalBaseName = file.name.replace(/\.[^/.]+$/, '');

      if (fileNameDisplay) fileNameDisplay.textContent = file.name;
      if (fileSizeDisplay) fileSizeDisplay.textContent = formatBytes(file.size);
      if (outputFilenameInput) outputFilenameInput.value = originalBaseName;

      // Reveal Workspace
      if (dropzone) dropzone.classList.add('hidden');
      if (workspacePanel) workspacePanel.classList.remove('hidden');
      if (successDownloadCard) successDownloadCard.classList.add('hidden');
      if (btnHeaderReset) btnHeaderReset.disabled = false;

      // Parse PPTX Package with JSZip
      const arrayBuffer = await file.arrayBuffer();
      const zip = await window.JSZip.loadAsync(arrayBuffer);

      updateProgress(25, t('progress_parsing'));

      // 1. Parse Presentation Dimensions
      const domParser = new DOMParser();
      let slideWidthEMU = 12192000;
      let slideHeightEMU = 6858000;

      const presXmlFile = zip.file('ppt/presentation.xml');
      if (presXmlFile) {
        const presXmlText = await presXmlFile.async('text');
        const presDoc = domParser.parseFromString(presXmlText, 'application/xml');
        const sldSz = presDoc.getElementsByTagName('p:sldSz')[0] || presDoc.getElementsByTagName('sldSz')[0];
        if (sldSz) {
          const cx = parseInt(sldSz.getAttribute('cx'), 10);
          const cy = parseInt(sldSz.getAttribute('cy'), 10);
          if (cx && cy) {
            slideWidthEMU = cx;
            slideHeightEMU = cy;
          }
        }
      }

      // Convert EMUs (1 inch = 914,400 EMUs; 1 pt = 12,700 EMUs)
      const widthPt = Math.round(slideWidthEMU / 12700);
      const heightPt = Math.round(slideHeightEMU / 12700);
      const ratioValue = slideWidthEMU / slideHeightEMU;
      let ratioName = '16:9';
      if (Math.abs(ratioValue - (4 / 3)) < 0.1) ratioName = '4:3';
      else if (Math.abs(ratioValue - (16 / 9)) < 0.1) ratioName = '16:9';
      else ratioName = 'Custom';

      presentationDimensions = {
        widthEMU: slideWidthEMU,
        heightEMU: slideHeightEMU,
        widthPt: widthPt,
        heightPt: heightPt,
        ratio: ratioName
      };

      if (aspectRatioBadge) {
        if (ratioName === '16:9') aspectRatioBadge.textContent = t('ratio_16_9');
        else if (ratioName === '4:3') aspectRatioBadge.textContent = t('ratio_4_3');
        else aspectRatioBadge.textContent = `${widthPt}x${heightPt} pt`;
      }

      // 2. Parse Theme Colors (if available)
      themeColors = parseThemeColors(zip, domParser);

      // 3. Find and sort slide files
      const slideEntries = [];
      const relsFile = zip.file('ppt/_rels/presentation.xml.rels');
      if (relsFile) {
        const relsText = await relsFile.async('text');
        const relsDoc = domParser.parseFromString(relsText, 'application/xml');
        const relNodes = relsDoc.getElementsByTagName('Relationship');
        const rIdMap = {};
        for (let i = 0; i < relNodes.length; i++) {
          const id = relNodes[i].getAttribute('Id');
          const target = relNodes[i].getAttribute('Target');
          if (target && target.includes('slides/slide')) {
            const cleanTarget = target.startsWith('/') ? target.substring(1) : ('ppt/' + target.replace(/^ppt\//, ''));
            rIdMap[id] = cleanTarget;
          }
        }

        // Check slide order from presentation.xml
        if (presXmlFile) {
          const presText = await presXmlFile.async('text');
          const presDoc = domParser.parseFromString(presText, 'application/xml');
          const sldIds = presDoc.getElementsByTagName('p:sldId');
          for (let i = 0; i < sldIds.length; i++) {
            const rId = sldIds[i].getAttribute('r:id');
            if (rId && rIdMap[rId]) {
              slideEntries.push(rIdMap[rId]);
            }
          }
        }
      }

      // Fallback slide discovery if rels ordering didn't populate
      if (slideEntries.length === 0) {
        zip.forEach((relativePath) => {
          if (/^ppt\/slides\/slide\d+\.xml$/i.test(relativePath)) {
            slideEntries.push(relativePath);
          }
        });
        slideEntries.sort((a, b) => {
          const numA = parseInt((a.match(/\d+/) || [0])[0], 10);
          const numB = parseInt((b.match(/\d+/) || [0])[0], 10);
          return numA - numB;
        });
      }

      if (slideEntries.length === 0) {
        throw new Error('No slide files found inside the PowerPoint presentation.');
      }

      // 4. Render each slide onto canvas
      parsedSlides = [];
      if (slidesGrid) slidesGrid.innerHTML = '';

      const totalSlides = slideEntries.length;
      const targetCanvasWidth = (ratioName === '4:3') ? 1600 : 1920;
      const targetCanvasHeight = Math.round(targetCanvasWidth / (slideWidthEMU / slideHeightEMU));

      for (let sIdx = 0; sIdx < totalSlides; sIdx++) {
        const slidePath = slideEntries[sIdx];
        updateProgress(
          30 + Math.round(((sIdx + 1) / totalSlides) * 60),
          t('progress_rendering', { n: sIdx + 1, total: totalSlides })
        );

        const slideXmlFile = zip.file(slidePath);
        if (!slideXmlFile) continue;

        const slideXmlText = await slideXmlFile.async('text');
        const slideDoc = domParser.parseFromString(slideXmlText, 'application/xml');

        // Extract slide relationships (e.g. image links)
        const slideNumMatch = slidePath.match(/slide(\d+)\.xml/);
        const slideNum = slideNumMatch ? slideNumMatch[1] : (sIdx + 1);
        const slideRelsPath = `ppt/slides/_rels/slide${slideNum}.xml.rels`;
        const slideRelsFile = zip.file(slideRelsPath);
        const imageMap = {};

        if (slideRelsFile) {
          const sRelsText = await slideRelsFile.async('text');
          const sRelsDoc = domParser.parseFromString(sRelsText, 'application/xml');
          const sRelNodes = sRelsDoc.getElementsByTagName('Relationship');
          for (let r = 0; r < sRelNodes.length; r++) {
            const rId = sRelNodes[r].getAttribute('Id');
            const target = sRelNodes[r].getAttribute('Target');
            if (target && /media\//i.test(target)) {
              const cleanMedia = target.replace(/^..\//, 'ppt/');
              const imgFile = zip.file(cleanMedia);
              if (imgFile) {
                const imgBlob = await imgFile.async('blob');
                imageMap[rId] = URL.createObjectURL(imgBlob);
              }
            }
          }
        }

        // Render Slide to Canvas
        const canvas = document.createElement('canvas');
        canvas.width = targetCanvasWidth;
        canvas.height = targetCanvasHeight;
        const ctx = canvas.getContext('2d');

        await renderSlideToCanvas(ctx, slideDoc, targetCanvasWidth, targetCanvasHeight, slideWidthEMU, slideHeightEMU, imageMap, sIdx + 1);

        parsedSlides.push({
          id: sIdx + 1,
          canvas: canvas,
          width: targetCanvasWidth,
          height: targetCanvasHeight
        });

        // Add Thumbnail Card to Grid
        appendSlideThumbnailCard(canvas, sIdx + 1, ratioName);
      }

      // Update workspace metrics
      if (slidesCountText) {
        slidesCountText.textContent = (parsedSlides.length === 1)
          ? t('slides_single')
          : t('slides_total', { n: parsedSlides.length });
      }

      updateProgress(100, 'Ready');
      showLoadingState(false);

      if (window.lucide) {
        window.lucide.createIcons();
      }

    } catch (err) {
      console.error('PPTX Parsing Error:', err);
      showToast(t('toast_parse_error') + err.message, 'error');
      showLoadingState(false);
    }
  }

  // Helper: Append Slide Card to UI Grid
  function appendSlideThumbnailCard(canvas, slideNum, ratioName) {
    if (!slidesGrid) return;

    const card = document.createElement('div');
    card.className = 'slide-card';

    const canvasBox = document.createElement('div');
    canvasBox.className = `slide-canvas-box ${ratioName === '4:3' ? 'ratio-4-3' : ''}`;

    const thumbCanvas = document.createElement('canvas');
    thumbCanvas.className = 'slide-canvas';
    thumbCanvas.width = canvas.width;
    thumbCanvas.height = canvas.height;
    const tCtx = thumbCanvas.getContext('2d');
    tCtx.drawImage(canvas, 0, 0);

    canvasBox.appendChild(thumbCanvas);

    const footer = document.createElement('div');
    footer.className = 'slide-card-footer';
    footer.innerHTML = `
      <span class="slide-number-badge">
        <i data-lucide="file-text" style="width: 14px; height: 14px;"></i>
        ${t('slide_number', { n: slideNum })}
      </span>
      <span>${canvas.width} x ${canvas.height} px</span>
    `;

    card.appendChild(canvasBox);
    card.appendChild(footer);
    slidesGrid.appendChild(card);
  }

  // Parse Theme Color Schemes
  async function parseThemeColors(zip, domParser) {
    const colors = {
      dk1: '#000000',
      lt1: '#ffffff',
      dk2: '#1f2937',
      lt2: '#f3f4f6',
      accent1: '#f97316',
      accent2: '#3b82f6',
      accent3: '#10b981',
      accent4: '#8b5cf6',
      accent5: '#ec4899',
      accent6: '#06b6d4'
    };

    try {
      const themeFile = zip.file('ppt/theme/theme1.xml');
      if (themeFile) {
        const themeText = await themeFile.async('text');
        const themeDoc = domParser.parseFromString(themeText, 'application/xml');
        const clrScheme = themeDoc.getElementsByTagName('a:clrScheme')[0] || themeDoc.getElementsByTagName('clrScheme')[0];
        if (clrScheme) {
          for (const key of Object.keys(colors)) {
            const el = clrScheme.getElementsByTagName(`a:${key}`)[0] || clrScheme.getElementsByTagName(key)[0];
            if (el) {
              const srgb = el.getElementsByTagName('a:srgbClr')[0] || el.getElementsByTagName('srgbClr')[0];
              if (srgb && srgb.getAttribute('val')) {
                colors[key] = `#${srgb.getAttribute('val')}`;
              }
            }
          }
        }
      }
    } catch (e) {
      console.warn('Theme color parse note:', e);
    }

    return colors;
  }

  // Render Slide XML tree to Canvas Context
  async function renderSlideToCanvas(ctx, slideDoc, cWidth, cHeight, sWidthEMU, sHeightEMU, imageMap, slideIndex) {
    const scaleX = cWidth / sWidthEMU;
    const scaleY = cHeight / sHeightEMU;

    // 1. Draw Default Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, cWidth, cHeight);

    // Check for explicit slide background in XML
    const bgNode = slideDoc.getElementsByTagName('p:bg')[0] || slideDoc.getElementsByTagName('bg')[0];
    if (bgNode) {
      const solidFill = bgNode.getElementsByTagName('a:solidFill')[0] || bgNode.getElementsByTagName('solidFill')[0];
      if (solidFill) {
        const hex = extractColorHex(solidFill);
        if (hex) {
          ctx.fillStyle = hex;
          ctx.fillRect(0, 0, cWidth, cHeight);
        }
      }
    }

    // 2. Extract Shape Tree
    const spTree = slideDoc.getElementsByTagName('p:spTree')[0] || slideDoc.getElementsByTagName('spTree')[0];
    if (!spTree) return;

    const children = spTree.childNodes;

    for (let i = 0; i < children.length; i++) {
      const node = children[i];
      const nodeName = node.nodeName.toLowerCase();

      // Case A: Picture Shape <p:pic>
      if (nodeName === 'p:pic' || nodeName === 'pic') {
        await renderPictureShape(ctx, node, scaleX, scaleY, imageMap);
      }
      // Case B: Regular Shape / Text Box <p:sp>
      else if (nodeName === 'p:sp' || nodeName === 'sp') {
        renderStandardShape(ctx, node, scaleX, scaleY);
      }
      // Case C: Graphic Frame (e.g. Tables) <p:graphicFrame>
      else if (nodeName === 'p:graphicframe' || nodeName === 'graphicframe') {
        renderGraphicFrame(ctx, node, scaleX, scaleY);
      }
      // Case D: Group Shape <p:grpSp>
      else if (nodeName === 'p:grpsp' || nodeName === 'grpsp') {
        const grpChildren = node.childNodes;
        for (let g = 0; g < grpChildren.length; g++) {
          const gNode = grpChildren[g];
          const gName = gNode.nodeName.toLowerCase();
          if (gName === 'p:sp' || gName === 'sp') {
            renderStandardShape(ctx, gNode, scaleX, scaleY);
          } else if (gName === 'p:pic' || gName === 'pic') {
            await renderPictureShape(ctx, gNode, scaleX, scaleY, imageMap);
          }
        }
      }
    }
  }

  // Render Picture Shape
  async function renderPictureShape(ctx, picNode, scaleX, scaleY, imageMap) {
    const xfrm = picNode.getElementsByTagName('a:xfrm')[0] || picNode.getElementsByTagName('xfrm')[0];
    if (!xfrm) return;

    const off = xfrm.getElementsByTagName('a:off')[0] || xfrm.getElementsByTagName('off')[0];
    const ext = xfrm.getElementsByTagName('a:ext')[0] || xfrm.getElementsByTagName('ext')[0];
    if (!off || !ext) return;

    const x = parseInt(off.getAttribute('x'), 10) * scaleX;
    const y = parseInt(off.getAttribute('y'), 10) * scaleY;
    const w = parseInt(ext.getAttribute('cx'), 10) * scaleX;
    const h = parseInt(ext.getAttribute('cy'), 10) * scaleY;

    const blip = picNode.getElementsByTagName('a:blip')[0] || picNode.getElementsByTagName('blip')[0];
    if (!blip) return;

    const embedId = blip.getAttribute('r:embed') || blip.getAttribute('embed');
    if (embedId && imageMap[embedId]) {
      try {
        const img = new Image();
        img.src = imageMap[embedId];
        await new Promise((resolve) => {
          if (img.complete) resolve();
          else {
            img.onload = resolve;
            img.onerror = resolve;
          }
        });
        ctx.drawImage(img, x, y, w, h);
      } catch (err) {
        console.warn('Image render error:', err);
      }
    }
  }

  // Render Standard Shape & Text Body
  function renderStandardShape(ctx, spNode, scaleX, scaleY) {
    const spPr = spNode.getElementsByTagName('p:spPr')[0] || spNode.getElementsByTagName('spPr')[0];
    let x = 0, y = 0, w = 0, h = 0;

    if (spPr) {
      const xfrm = spPr.getElementsByTagName('a:xfrm')[0] || spPr.getElementsByTagName('xfrm')[0];
      if (xfrm) {
        const off = xfrm.getElementsByTagName('a:off')[0] || xfrm.getElementsByTagName('off')[0];
        const ext = xfrm.getElementsByTagName('a:ext')[0] || xfrm.getElementsByTagName('ext')[0];
        if (off && ext) {
          x = parseInt(off.getAttribute('x'), 10) * scaleX;
          y = parseInt(off.getAttribute('y'), 10) * scaleY;
          w = parseInt(ext.getAttribute('cx'), 10) * scaleX;
          h = parseInt(ext.getAttribute('cy'), 10) * scaleY;
        }
      }

      // Draw Shape Background Fill (if present)
      const solidFill = spPr.getElementsByTagName('a:solidFill')[0] || spPr.getElementsByTagName('solidFill')[0];
      if (solidFill && w > 0 && h > 0) {
        const color = extractColorHex(solidFill);
        if (color) {
          ctx.fillStyle = color;
          // Check for rounded corners
          const prstGeom = spPr.getElementsByTagName('a:prstGeom')[0] || spPr.getElementsByTagName('prstGeom')[0];
          const geomType = prstGeom ? prstGeom.getAttribute('prst') : 'rect';

          if (geomType === 'roundRect') {
            drawRoundedRect(ctx, x, y, w, h, 14);
            ctx.fill();
          } else if (geomType === 'ellipse') {
            ctx.beginPath();
            ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillRect(x, y, w, h);
          }
        }
      }

      // Draw Shape Border Outline
      const ln = spPr.getElementsByTagName('a:ln')[0] || spPr.getElementsByTagName('ln')[0];
      if (ln && w > 0 && h > 0) {
        const lnFill = ln.getElementsByTagName('a:solidFill')[0] || ln.getElementsByTagName('solidFill')[0];
        const lnColor = lnFill ? extractColorHex(lnFill) : '#cbd5e1';
        const lnW = Math.max(1, (parseInt(ln.getAttribute('w') || '12700', 10) / 12700) * (scaleX * 12700));
        ctx.strokeStyle = lnColor;
        ctx.lineWidth = lnW;
        ctx.strokeRect(x, y, w, h);
      }
    }

    // Draw Text Content <p:txBody>
    const txBody = spNode.getElementsByTagName('p:txBody')[0] || spNode.getElementsByTagName('txBody')[0];
    if (txBody) {
      renderTextBody(ctx, txBody, x, y, w, h, scaleY);
    }
  }

  // Render Text Body within bounding coordinates
  function renderTextBody(ctx, txBody, x, y, w, h, scaleY) {
    const paragraphs = txBody.getElementsByTagName('a:p');
    if (!paragraphs || paragraphs.length === 0) return;

    let curY = y + 24;
    const paddingX = 12;
    const maxWidth = Math.max(w - (paddingX * 2), 200);

    for (let pIdx = 0; pIdx < paragraphs.length; pIdx++) {
      const p = paragraphs[pIdx];
      const pPr = p.getElementsByTagName('a:pPr')[0];
      let align = 'left';
      let isRTL = false;

      if (pPr) {
        const algn = pPr.getAttribute('algn');
        if (algn === 'ctr') align = 'center';
        else if (algn === 'r') align = 'right';
        else if (algn === 'just') align = 'justify';
        if (pPr.getAttribute('rtl') === '1') isRTL = true;
      }

      // Collect text runs
      const runs = [];
      const children = p.childNodes;

      for (let c = 0; c < children.length; c++) {
        const cNode = children[c];
        const cName = cNode.nodeName.toLowerCase();
        if (cName === 'a:r' || cName === 'r' || cName === 'a:fld' || cName === 'fld') {
          const tNode = cNode.getElementsByTagName('a:t')[0] || cNode.getElementsByTagName('t')[0];
          if (tNode && tNode.textContent) {
            const text = tNode.textContent;
            const rPr = cNode.getElementsByTagName('a:rPr')[0] || cNode.getElementsByTagName('rPr')[0];
            let fontSize = 20;
            let isBold = false;
            let isItalic = false;
            let color = '#1e293b';

            if (rPr) {
              const sz = parseInt(rPr.getAttribute('sz'), 10);
              if (sz) {
                fontSize = Math.round((sz / 100) * 1.33); // Convert pt to canvas px
              }
              if (rPr.getAttribute('b') === '1') isBold = true;
              if (rPr.getAttribute('i') === '1') isItalic = true;

              const rSolidFill = rPr.getElementsByTagName('a:solidFill')[0] || rPr.getElementsByTagName('solidFill')[0];
              if (rSolidFill) {
                const hex = extractColorHex(rSolidFill);
                if (hex) color = hex;
              }
            }

            // Check if text has Arabic characters
            if (/[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/.test(text)) {
              isRTL = true;
            }

            runs.push({
              text,
              fontSize,
              isBold,
              isItalic,
              color
            });
          }
        }
      }

      if (runs.length === 0) {
        curY += 16;
        continue;
      }

      if (isRTL && align === 'left') align = 'right';

      // Draw runs line by line
      for (const run of runs) {
        ctx.fillStyle = run.color;
        const fontStyle = `${run.isItalic ? 'italic ' : ''}${run.isBold ? 'bold ' : ''}`;
        const fontFamily = isRTL
          ? "'Cairo', 'Segoe UI Arabic', 'Tahoma', 'Outfit', sans-serif"
          : "'Outfit', 'Inter', system-ui, -apple-system, sans-serif";

        ctx.font = `${fontStyle}${run.fontSize}px ${fontFamily}`;
        ctx.textAlign = align;

        let drawX = x + paddingX;
        if (align === 'center') drawX = x + (w / 2);
        else if (align === 'right') drawX = x + w - paddingX;

        // Wrap text
        const words = run.text.split(' ');
        let line = '';
        const lineHeight = Math.round(run.fontSize * 1.35);

        for (let n = 0; n < words.length; n++) {
          const testLine = line + words[n] + ' ';
          const metrics = ctx.measureText(testLine);
          if (metrics.width > maxWidth && n > 0) {
            ctx.fillText(line.trim(), drawX, curY);
            line = words[n] + ' ';
            curY += lineHeight;
          } else {
            line = testLine;
          }
        }
        ctx.fillText(line.trim(), drawX, curY);
        curY += lineHeight + 4;
      }
    }
  }

  // Render Graphic Frame (e.g. Tables)
  function renderGraphicFrame(ctx, frameNode, scaleX, scaleY) {
    const xfrm = frameNode.getElementsByTagName('p:xfrm')[0] || frameNode.getElementsByTagName('a:xfrm')[0];
    if (!xfrm) return;

    const off = xfrm.getElementsByTagName('a:off')[0] || xfrm.getElementsByTagName('off')[0];
    const ext = xfrm.getElementsByTagName('a:ext')[0] || xfrm.getElementsByTagName('ext')[0];
    if (!off || !ext) return;

    const x = parseInt(off.getAttribute('x'), 10) * scaleX;
    const y = parseInt(off.getAttribute('y'), 10) * scaleY;
    const w = parseInt(ext.getAttribute('cx'), 10) * scaleX;
    const h = parseInt(ext.getAttribute('cy'), 10) * scaleY;

    // Check for Table <a:tbl>
    const tbl = frameNode.getElementsByTagName('a:tbl')[0] || frameNode.getElementsByTagName('tbl')[0];
    if (tbl) {
      const rows = tbl.getElementsByTagName('a:tr');
      if (rows.length === 0) return;

      const rowHeight = h / rows.length;

      for (let r = 0; r < rows.length; r++) {
        const row = rows[r];
        const cells = row.getElementsByTagName('a:tc');
        if (cells.length === 0) continue;
        const colWidth = w / cells.length;

        for (let c = 0; c < cells.length; c++) {
          const cell = cells[c];
          const cellX = x + (c * colWidth);
          const cellY = y + (r * rowHeight);

          // Cell Background
          ctx.fillStyle = (r === 0) ? '#f97316' : (r % 2 === 0 ? '#f8fafc' : '#ffffff');
          ctx.fillRect(cellX, cellY, colWidth, rowHeight);

          // Cell Border
          ctx.strokeStyle = '#e2e8f0';
          ctx.lineWidth = 1;
          ctx.strokeRect(cellX, cellY, colWidth, rowHeight);

          // Cell Text
          const txBody = cell.getElementsByTagName('a:txBody')[0];
          if (txBody) {
            const paragraphs = txBody.getElementsByTagName('a:p');
            let cellText = '';
            for (let p = 0; p < paragraphs.length; p++) {
              cellText += paragraphs[p].textContent + ' ';
            }
            ctx.fillStyle = (r === 0) ? '#ffffff' : '#1e293b';
            ctx.font = `${r === 0 ? 'bold ' : ''}16px 'Outfit', sans-serif`;
            ctx.textAlign = 'center';
            ctx.fillText(cellText.trim(), cellX + colWidth / 2, cellY + (rowHeight / 2) + 6);
          }
        }
      }
    }
  }

  // Extract Hex color from XML node
  function extractColorHex(solidFillNode) {
    if (!solidFillNode) return null;

    // Direct RGB Color <a:srgbClr val="FF5500"/>
    const srgb = solidFillNode.getElementsByTagName('a:srgbClr')[0] || solidFillNode.getElementsByTagName('srgbClr')[0];
    if (srgb && srgb.getAttribute('val')) {
      return `#${srgb.getAttribute('val')}`;
    }

    // Scheme Color <a:schemeClr val="accent1"/>
    const scheme = solidFillNode.getElementsByTagName('a:schemeClr')[0] || solidFillNode.getElementsByTagName('schemeClr')[0];
    if (scheme && scheme.getAttribute('val')) {
      const val = scheme.getAttribute('val');
      if (themeColors[val]) return themeColors[val];
    }

    return null;
  }

  // Draw Rounded Rectangle
  function drawRoundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  // Execute PDF Compilation
  async function executePdfConversion() {
    if (isConverting || parsedSlides.length === 0) return;

    if (!window.PDFLib) {
      showToast('PDF-Lib compilation library not available.', 'error');
      return;
    }

    isConverting = true;
    showLoadingState(true);
    updateProgress(10, t('progress_compiling'));

    try {
      const { PDFDocument } = window.PDFLib;
      const pdfDoc = await PDFDocument.create();

      const formatOption = pdfPageFormatSelect ? pdfPageFormatSelect.value : 'auto';
      const totalSlides = parsedSlides.length;

      for (let i = 0; i < totalSlides; i++) {
        updateProgress(
          15 + Math.round(((i + 1) / totalSlides) * 75),
          t('progress_compiling') + ` (${i + 1}/${totalSlides})`
        );

        const slide = parsedSlides[i];
        const imgDataUrl = slide.canvas.toDataURL('image/jpeg', 0.95);
        const imgBytes = await fetch(imgDataUrl).then(res => res.arrayBuffer());
        const embeddedImg = await pdfDoc.embedJpg(imgBytes);

        let pageWidth = presentationDimensions.widthPt;
        let pageHeight = presentationDimensions.heightPt;
        let drawX = 0;
        let drawY = 0;
        let drawWidth = pageWidth;
        let drawHeight = pageHeight;

        if (formatOption === 'a4_landscape') {
          pageWidth = 841.89;
          pageHeight = 595.28;
          // Scale to fit page maintaining ratio
          const scale = Math.min(pageWidth / slide.width, pageHeight / slide.height);
          drawWidth = slide.width * scale;
          drawHeight = slide.height * scale;
          drawX = (pageWidth - drawWidth) / 2;
          drawY = (pageHeight - drawHeight) / 2;
        } else if (formatOption === 'letter_landscape') {
          pageWidth = 792;
          pageHeight = 612;
          const scale = Math.min(pageWidth / slide.width, pageHeight / slide.height);
          drawWidth = slide.width * scale;
          drawHeight = slide.height * scale;
          drawX = (pageWidth - drawWidth) / 2;
          drawY = (pageHeight - drawHeight) / 2;
        }

        const page = pdfDoc.addPage([pageWidth, pageHeight]);
        page.drawImage(embeddedImg, {
          x: drawX,
          y: drawY,
          width: drawWidth,
          height: drawHeight
        });
      }

      updateProgress(95, t('progress_finalizing'));

      const pdfBytes = await pdfDoc.save();
      const outputName = (outputFilenameInput && outputFilenameInput.value.trim())
        ? outputFilenameInput.value.trim()
        : originalBaseName || 'presentation';

      generatedPdfFilename = `${outputName}.pdf`;
      generatedPdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

      if (pdfFilenameDisplay) pdfFilenameDisplay.textContent = generatedPdfFilename;
      if (pdfFilesizeDisplay) pdfFilesizeDisplay.textContent = formatBytes(generatedPdfBlob.size);

      updateProgress(100, 'Complete!');

      setTimeout(() => {
        showLoadingState(false);
        if (successDownloadCard) successDownloadCard.classList.remove('hidden');
        showToast(t('toast_convert_success'), 'success');
      }, 350);

    } catch (err) {
      console.error('PDF Conversion Error:', err);
      showToast('Error creating PDF: ' + err.message, 'error');
      showLoadingState(false);
    } finally {
      isConverting = false;
    }
  }

  // Load In-Memory Sample PPTX Presentation
  async function loadSamplePresentation() {
    try {
      showToast(t('toast_sample_generating'), 'info');

      if (!window.JSZip) {
        throw new Error('JSZip library unavailable');
      }

      const zip = new window.JSZip();

      // Basic OpenXML PPTX Structure
      zip.file('[Content_Types].xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/ppt/presentation.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"/>
  <Override PartName="/ppt/slides/slide1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>
  <Override PartName="/ppt/slides/slide2.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>
  <Override PartName="/ppt/slides/slide3.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>
</Types>`);

      zip.file('_rels/.rels', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="ppt/presentation.xml"/>
</Relationships>`);

      zip.file('ppt/presentation.xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:presentation xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <p:sldSz cx="12192000" cy="6858000" type="screen16x9"/>
  <p:sldIdLst>
    <p:sldId id="256" r:id="rId1"/>
    <p:sldId id="257" r:id="rId2"/>
    <p:sldId id="258" r:id="rId3"/>
  </p:sldIdLst>
</p:presentation>`);

      zip.file('ppt/_rels/presentation.xml.rels', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide2.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide3.xml"/>
</Relationships>`);

      // Slide 1: Welcome & Executive Overview
      zip.file('ppt/slides/slide1.xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sld xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">
  <p:cSld>
    <p:bg>
      <p:bgPr>
        <a:solidFill><a:srgbClr val="0F172A"/></a:solidFill>
      </p:bgPr>
    </p:bg>
    <p:spTree>
      <p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>
      <p:grpSpPr/>
      <!-- Header Banner Box -->
      <p:sp>
        <p:spPr>
          <a:xfrm><a:off x="1000000" y="800000"/><a:ext cx="10192000" cy="1800000"/></a:xfrm>
          <a:solidFill><a:srgbClr val="F97316"/></a:solidFill>
          <a:prstGeom prst="roundRect"/>
        </p:spPr>
        <p:txBody>
          <a:p>
            <a:pPr algn="ctr"/>
            <a:r>
              <a:rPr sz="3800" b="1"><a:solidFill><a:srgbClr val="FFFFFF"/></a:solidFill></a:rPr>
              <a:t>GLOBAL INNOVATION STRATEGY 2026</a:t>
            </a:r>
          </a:p>
          <a:p>
            <a:pPr algn="ctr"/>
            <a:r>
              <a:rPr sz="2000" i="1"><a:solidFill><a:srgbClr val="FED7AA"/></a:solidFill></a:rPr>
              <a:t>Client-Side Enterprise Architecture &amp; PDF Conversion Engine</a:t>
            </a:r>
          </a:p>
        </p:txBody>
      </p:sp>
      <!-- Subtitle Card -->
      <p:sp>
        <p:spPr>
          <a:xfrm><a:off x="1000000" y="3000000"/><a:ext cx="10192000" cy="2800000"/></a:xfrm>
          <a:solidFill><a:srgbClr val="1E293B"/></a:solidFill>
          <a:prstGeom prst="roundRect"/>
        </p:spPr>
        <p:txBody>
          <a:p>
            <a:r>
              <a:rPr sz="2400" b="1"><a:solidFill><a:srgbClr val="FB923C"/></a:solidFill></a:rPr>
              <a:t>1. Executive Summary &amp; Privacy Vision</a:t>
            </a:r>
          </a:p>
          <a:p>
            <a:r>
              <a:rPr sz="1800"><a:solidFill><a:srgbClr val="E2E8F0"/></a:solidFill></a:rPr>
              <a:t>• 100% In-browser parsing and zero cloud server dependencies.</a:t>
            </a:r>
          </a:p>
          <a:p>
            <a:r>
              <a:rPr sz="1800"><a:solidFill><a:srgbClr val="E2E8F0"/></a:solidFill></a:rPr>
              <a:t>• High-resolution vector canvas reconstruction with crisp typography.</a:t>
            </a:r>
          </a:p>
          <a:p>
            <a:r>
              <a:rPr sz="1800"><a:solidFill><a:srgbClr val="E2E8F0"/></a:solidFill></a:rPr>
              <a:t>• Automatic aspect ratio detection preserving 16:9 and 4:3 slide standards.</a:t>
            </a:r>
          </a:p>
        </p:txBody>
      </p:sp>
    </p:spTree>
  </p:cSld>
</p:sld>`);

      // Slide 2: Feature Matrix & Metrics
      zip.file('ppt/slides/slide2.xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sld xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">
  <p:cSld>
    <p:bg>
      <p:bgPr>
        <a:solidFill><a:srgbClr val="0F172A"/></a:solidFill>
      </p:bgPr>
    </p:bg>
    <p:spTree>
      <p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>
      <p:grpSpPr/>
      <!-- Slide Title -->
      <p:sp>
        <p:spPr>
          <a:xfrm><a:off x="1000000" y="600000"/><a:ext cx="10192000" cy="1000000"/></a:xfrm>
        </p:spPr>
        <p:txBody>
          <a:p>
            <a:r>
              <a:rPr sz="3200" b="1"><a:solidFill><a:srgbClr val="FB923C"/></a:solidFill></a:rPr>
              <a:t>2. Enterprise Feature Comparison &amp; Security</a:t>
            </a:r>
          </a:p>
        </p:txBody>
      </p:sp>
      <!-- Column 1 -->
      <p:sp>
        <p:spPr>
          <a:xfrm><a:off x="1000000" y="1800000"/><a:ext cx="4800000" cy="4200000"/></a:xfrm>
          <a:solidFill><a:srgbClr val="1E293B"/></a:solidFill>
          <a:prstGeom prst="roundRect"/>
        </p:spPr>
        <p:txBody>
          <a:p>
            <a:r>
              <a:rPr sz="2200" b="1"><a:solidFill><a:srgbClr val="38BDF8"/></a:solidFill></a:rPr>
              <a:t>Client-Side Advantages</a:t>
            </a:r>
          </a:p>
          <a:p>
            <a:r>
              <a:rPr sz="1600"><a:solidFill><a:srgbClr val="CBD5E1"/></a:solidFill></a:rPr>
              <a:t>✔ Absolute data security with zero upload latency.</a:t>
            </a:r>
          </a:p>
          <a:p>
            <a:r>
              <a:rPr sz="1600"><a:solidFill><a:srgbClr val="CBD5E1"/></a:solidFill></a:rPr>
              <a:t>✔ Offline operational capability.</a:t>
            </a:r>
          </a:p>
          <a:p>
            <a:r>
              <a:rPr sz="1600"><a:solidFill><a:srgbClr val="CBD5E1"/></a:solidFill></a:rPr>
              <a:t>✔ Unlimited presentations with no paywalls.</a:t>
            </a:r>
          </a:p>
        </p:txBody>
      </p:sp>
      <!-- Column 2 -->
      <p:sp>
        <p:spPr>
          <a:xfrm><a:off x="6392000" y="1800000"/><a:ext cx="4800000" cy="4200000"/></a:xfrm>
          <a:solidFill><a:srgbClr val="1E293B"/></a:solidFill>
          <a:prstGeom prst="roundRect"/>
        </p:spPr>
        <p:txBody>
          <a:p>
            <a:r>
              <a:rPr sz="2200" b="1"><a:solidFill><a:srgbClr val="34D399"/></a:solidFill></a:rPr>
              <a:t>Document Formatting</a:t>
            </a:r>
          </a:p>
          <a:p>
            <a:r>
              <a:rPr sz="1600"><a:solidFill><a:srgbClr val="CBD5E1"/></a:solidFill></a:rPr>
              <a:t>✔ Multi-page continuous PDF compilation.</a:t>
            </a:r>
          </a:p>
          <a:p>
            <a:r>
              <a:rPr sz="1600"><a:solidFill><a:srgbClr val="CBD5E1"/></a:solidFill></a:rPr>
              <a:t>✔ Crisp font rendering across standard systems.</a:t>
            </a:r>
          </a:p>
          <a:p>
            <a:r>
              <a:rPr sz="1600"><a:solidFill><a:srgbClr val="CBD5E1"/></a:solidFill></a:rPr>
              <a:t>✔ Embedded graphic asset extraction.</a:t>
            </a:r>
          </a:p>
        </p:txBody>
      </p:sp>
    </p:spTree>
  </p:cSld>
</p:sld>`);

      // Slide 3: Arabic & RTL Support
      zip.file('ppt/slides/slide3.xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sld xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">
  <p:cSld>
    <p:bg>
      <p:bgPr>
        <a:solidFill><a:srgbClr val="0F172A"/></a:solidFill>
      </p:bgPr>
    </p:bg>
    <p:spTree>
      <p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>
      <p:grpSpPr/>
      <!-- Arabic Title -->
      <p:sp>
        <p:spPr>
          <a:xfrm><a:off x="1000000" y="800000"/><a:ext cx="10192000" cy="1400000"/></a:xfrm>
          <a:solidFill><a:srgbClr val="EA580C"/></a:solidFill>
          <a:prstGeom prst="roundRect"/>
        </p:spPr>
        <p:txBody>
          <a:p>
            <a:pPr algn="r" rtl="1"/>
            <a:r>
              <a:rPr sz="3400" b="1"><a:solidFill><a:srgbClr val="FFFFFF"/></a:solidFill></a:rPr>
              <a:t>٣. الدعم الكامل للغة العربية والاتجاه من اليمين لليسار</a:t>
            </a:r>
          </a:p>
        </p:txBody>
      </p:sp>
      <!-- Arabic Content Card -->
      <p:sp>
        <p:spPr>
          <a:xfrm><a:off x="1000000" y="2600000"/><a:ext cx="10192000" cy="3400000"/></a:xfrm>
          <a:solidFill><a:srgbClr val="1E293B"/></a:solidFill>
          <a:prstGeom prst="roundRect"/>
        </p:spPr>
        <p:txBody>
          <a:p>
            <a:pPr algn="r" rtl="1"/>
            <a:r>
              <a:rPr sz="2200" b="1"><a:solidFill><a:srgbClr val="FB923C"/></a:solidFill></a:rPr>
              <a:t>الميزات المتقدمة للعروض التقديمية العربية:</a:t>
            </a:r>
          </a:p>
          <a:p>
            <a:pPr algn="r" rtl="1"/>
            <a:r>
              <a:rPr sz="1800"><a:solidFill><a:srgbClr val="E2E8F0"/></a:solidFill></a:rPr>
              <a:t>• دعم النصوص العربية بدقة عالية مع الحفاظ على التشكيل والمحاذاة الصحيحة.</a:t>
            </a:r>
          </a:p>
          <a:p>
            <a:pPr algn="r" rtl="1"/>
            <a:r>
              <a:rPr sz="1800"><a:solidFill><a:srgbClr val="E2E8F0"/></a:solidFill></a:rPr>
              <a:t>• توافق تام مع قوالب PowerPoint والشرائح متعددة اللغات.</a:t>
            </a:r>
          </a:p>
          <a:p>
            <a:pPr algn="r" rtl="1"/>
            <a:r>
              <a:rPr sz="1800"><a:solidFill><a:srgbClr val="E2E8F0"/></a:solidFill></a:rPr>
              <a:t>• تصدير فوري لمستند PDF عالي الوضوح وجاهز للطباعة والمشاركة.</a:t>
            </a:r>
          </a:p>
        </p:txBody>
      </p:sp>
    </p:spTree>
  </p:cSld>
</p:sld>`);

      const samplePptxBlob = await zip.generateAsync({ type: 'blob' });
      const sampleFile = new File([samplePptxBlob], 'sample_powerpoint_strategy.pptx', {
        type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      });

      await handleFileSelection(sampleFile);
      showToast(t('toast_sample_loaded'), 'success');

    } catch (err) {
      console.error('Sample generation error:', err);
      showToast(t('toast_sample_error') + err.message, 'error');
    }
  }

  // Trigger Download
  function triggerPdfDownload() {
    if (!generatedPdfBlob || !generatedPdfFilename) return;
    showToast(t('toast_download_started'), 'info');

    const url = URL.createObjectURL(generatedPdfBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = generatedPdfFilename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  }

  // Reset Workspace
  function resetWorkspace() {
    currentFile = null;
    originalBaseName = '';
    parsedSlides = [];
    isConverting = false;
    generatedPdfBlob = null;
    generatedPdfFilename = '';

    if (fileInput) fileInput.value = '';
    if (outputFilenameInput) outputFilenameInput.value = 'presentation';
    if (slidesGrid) slidesGrid.innerHTML = '';

    if (workspacePanel) workspacePanel.classList.add('hidden');
    if (successDownloadCard) successDownloadCard.classList.add('hidden');
    if (conversionProgress) conversionProgress.classList.add('hidden');
    if (dropzone) dropzone.classList.remove('hidden');
    if (btnHeaderReset) btnHeaderReset.disabled = true;

    showToast(t('toast_reset_success'), 'info');
  }

  function showLoadingState(loading) {
    if (btnConvertPdf) btnConvertPdf.disabled = loading;
    if (btnChangeFile) btnChangeFile.disabled = loading;
    if (btnHeaderReset) btnHeaderReset.disabled = loading;

    if (btnConvertSpinner) {
      if (loading) btnConvertSpinner.classList.remove('hidden');
      else btnConvertSpinner.classList.add('hidden');
    }

    if (btnConvertIcon) {
      if (loading) btnConvertIcon.classList.add('hidden');
      else btnConvertIcon.classList.remove('hidden');
    }

    if (btnConvertText) {
      btnConvertText.textContent = loading ? t('btn_converting') : t('btn_convert_pdf');
    }

    if (conversionProgress) {
      if (loading) conversionProgress.classList.remove('hidden');
      else conversionProgress.classList.add('hidden');
    }
  }

  function updateProgress(percent, statusText) {
    if (progressPercent) progressPercent.textContent = `${percent}%`;
    if (progressBarFill) progressBarFill.style.width = `${percent}%`;
    if (progressStatusText && statusText) progressStatusText.textContent = statusText;
  }

  // Helper: Format Bytes
  function formatBytes(bytes, decimals = 1) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  // Toast Notifications
  let toastTimeout = null;
  function showToast(message, type = 'info') {
    if (!toastEl || !toastMsgEl) return;

    clearTimeout(toastTimeout);
    toastMsgEl.textContent = message;

    toastEl.className = 'toast';
    if (type === 'success') {
      toastEl.classList.add('toast-success');
      if (toastIconEl) toastIconEl.setAttribute('data-lucide', 'check-circle');
    } else if (type === 'error') {
      toastEl.classList.add('toast-error');
      if (toastIconEl) toastIconEl.setAttribute('data-lucide', 'alert-triangle');
    } else if (type === 'warning') {
      toastEl.classList.add('toast-warning');
      if (toastIconEl) toastIconEl.setAttribute('data-lucide', 'alert-circle');
    } else {
      if (toastIconEl) toastIconEl.setAttribute('data-lucide', 'info');
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }

    toastEl.classList.remove('hidden');

    toastTimeout = setTimeout(() => {
      toastEl.classList.add('hidden');
    }, 4500);
  }

})();
