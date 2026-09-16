/**
 * OCR Text Extractor - Client-Side Optical Character Recognition
 * Powered by Tesseract.js v5 & Mozilla PDF.js
 * 100% Client-Side Processing • Zero Server Uploads • Full Arabic & English Bilingual Support
 */

(function () {
  'use strict';

  // Configure PDF.js Worker
  if (window.pdfjsLib) {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  }

  // Bilingual Translation Dictionary
  const translations = {
    en: {
      badge_client_side: "100% Client-Side",
      nav_home: "Home",
      ocr_hero_badge: "Local OCR • Extract Text From Images & PDFs",
      ocr_hero_title: 'Extract Text with <span class="gradient-text">Optical Character Recognition</span>',
      ocr_hero_subtitle: "Convert scanned documents, photos, screenshots, and PDF pages into clean, editable text directly in your browser. 100% private with zero server uploads.",
      ocr_dropzone_title: "Drop your PDF or Image here",
      ocr_dropzone_subtitle: "Supports PDF documents, PNG, JPG, JPEG, and WebP images. Processing runs securely on your CPU.",
      ocr_btn_browse: "Browse Files",
      ocr_btn_sample: "Try Sample Document",
      ocr_feature_lang: "English & Arabic OCR",
      ocr_feature_pdf: "PDF & Image Support",
      ocr_feature_privacy: "100% Browser-Side Privacy",
      ocr_btn_change: "Change File",
      ocr_settings_title: "Extraction Settings",
      ocr_label_language: "Recognition Language",
      ocr_lang_eng: "English",
      ocr_lang_ara: "العربية",
      ocr_lang_both: "Bilingual (Both)",
      ocr_label_pdf_page: "Select PDF Page to OCR",
      ocr_btn_start: "Extract Text (OCR)",
      ocr_preview_title: "Document Preview",
      ocr_status_init: "Initializing OCR engine...",
      ocr_status_loading_core: "Loading OCR neural core...",
      ocr_status_loading_lang: "Loading language trained data...",
      ocr_status_recognizing: "Recognizing characters & text...",
      ocr_status_done: "OCR completed successfully!",
      ocr_progress_tip: "First-time language downloads may take a few seconds and are cached in your browser.",
      ocr_result_title: "Extracted Text Output",
      ocr_stat_chars: "Characters:",
      ocr_stat_words: "Words:",
      ocr_btn_copy: "Copy to Clipboard",
      ocr_btn_download: "Download .TXT",
      ocr_placeholder_output: "Extracted text will appear here...",
      ad_space_label: "Advertisement Space (728x90)",
      footer_tagline: "100% Client-side, private, and secure document processing directly in your browser.",
      footer_privacy: "Privacy Policy",
      footer_terms: "Terms of Service",
      footer_contact: "Contact Us",
      footer_copyright: "© 2026 PDF Hub. All rights reserved.",
      cookie_consent_text: "We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.",
      cookie_learn_more: "Privacy Policy",
      cookie_accept_btn: "Accept",
      toast_copied: "Extracted text copied to clipboard!",
      toast_ocr_success: "Text extracted successfully!",
      toast_no_text: "No readable text was detected in the document.",
      toast_error: "An error occurred during OCR processing. Please try again.",
      toast_sample_loaded: "Sample document loaded successfully.",
      toast_pdf_page_changed: "Rendered page {n} of {total}."
    },
    ar: {
      badge_client_side: "محلي ١٠٠٪ في المتصفح",
      nav_home: "الرئيسية",
      ocr_hero_badge: "التعرف الضوئي على النصوص (OCR) • محلي وآمن",
      ocr_hero_title: 'استخراج النصوص بتقنية <span class="gradient-text">التعرف الضوئي OCR</span>',
      ocr_hero_subtitle: "حوّل المستندات الممسوحة ضوئياً، والصور، ولقطات الشاشة، وملفات PDF إلى نصوص قابلة للنسخ والتعديل مباشرة في متصفحك وبأمان تام.",
      ocr_dropzone_title: "اسحب ملف PDF أو صورة هنا",
      ocr_dropzone_subtitle: "يدعم مستندات PDF وصور PNG وJPG وJPEG وWebP. تتم المعالجة بالكامل محلياً على جهازك.",
      ocr_btn_browse: "استعراض الملفات",
      ocr_btn_sample: "تجربة مستند نموذجي",
      ocr_feature_lang: "يدعم العربية والإنجليزية",
      ocr_feature_pdf: "يدعم الـ PDF والصور",
      ocr_feature_privacy: "خصوصية كاملة ١٠٠٪",
      ocr_btn_change: "تغيير الملف",
      ocr_settings_title: "إعدادات استخراج النص",
      ocr_label_language: "لغة المستند للتعرف",
      ocr_lang_eng: "English",
      ocr_lang_ara: "العربية",
      ocr_lang_both: "ثنائي اللغة (عربي + إنجليزي)",
      ocr_label_pdf_page: "اختر صفحة PDF للمعالجة",
      ocr_btn_start: "بدء استخراج النص (OCR)",
      ocr_preview_title: "معاينة المستند",
      ocr_status_init: "جاري تهيئة محرك OCR...",
      ocr_status_loading_core: "جاري تحميل محرك الذكاء الاصطناعي...",
      ocr_status_loading_lang: "جاري تحميل بيانات اللغة المدربة...",
      ocr_status_recognizing: "جاري قراءة واستخراج النصوص...",
      ocr_status_done: "تم استخراج النص بنجاح!",
      ocr_progress_tip: "قد يستغرق تنزيل بيانات اللغة في المرة الأولى بضع ثوانٍ وسيتم حفظها في ذاكرة متصفحك.",
      ocr_result_title: "النص المستخرج",
      ocr_stat_chars: "الأحرف:",
      ocr_stat_words: "الكلمات:",
      ocr_btn_copy: "نسخ إلى الحافظة",
      ocr_btn_download: "تحميل كملف .TXT",
      ocr_placeholder_output: "سيظهر النص المستخرج هنا فور انتهاء المعالجة...",
      ad_space_label: "مساحة إعلانية (728x90)",
      footer_tagline: "معالجة مستندات محلية ١٠٠٪، خاصة وآمنة تماماً مباشرة في متصفحك.",
      footer_privacy: "سياسة الخصوصية",
      footer_terms: "شروط الاستخدام",
      footer_contact: "اتصل بنا",
      footer_copyright: "© ٢٠٢٦ PDF Hub. جميع الحقوق محفوظة.",
      cookie_consent_text: "نحن نستخدم ملفات تعريف الارتباط لتحسين تجربتك. باستمرارك في زيارة هذا الموقع، فإنك توافق على استخدامنا لملفات تعريف الارتباط.",
      cookie_learn_more: "سياسة الخصوصية",
      cookie_accept_btn: "موافق",
      toast_copied: "تم نسخ النص المستخرج إلى الحافظة بنجاح!",
      toast_ocr_success: "تم استخراج النص بنجاح!",
      toast_no_text: "لم يتم العثور على نصوص واضحة في المستند.",
      toast_error: "حدث خطأ أثناء معالجة المستند. يرجى المحاولة مرة أخرى.",
      toast_sample_loaded: "تم تحميل المستند النموذجي بنجاح.",
      toast_pdf_page_changed: "تم عرض الصفحة {n} من {total}."
    }
  };

  // State
  let currentLang = 'en';
  let currentFile = null;
  let isPdf = false;
  let pdfDoc = null;
  let currentPdfPageNumber = 1;
  let totalPdfPages = 1;
  let selectedOcrLanguage = 'eng';
  let isProcessing = false;

  // DOM Elements
  const dropzone = document.getElementById('dropzone');
  const fileInput = document.getElementById('file-input');
  const btnBrowse = document.getElementById('btn-browse');
  const btnLoadSample = document.getElementById('btn-load-sample');
  const dropzoneSection = document.getElementById('dropzone-section');
  const workspaceSection = document.getElementById('workspace-section');
  const fileNameDisplay = document.getElementById('file-name-display');
  const fileStatsDisplay = document.getElementById('file-stats-display');
  const fileTypeIcon = document.getElementById('file-type-icon');
  const btnChangeFile = document.getElementById('btn-change-file');
  const btnStartOcr = document.getElementById('btn-start-ocr');
  const previewCanvas = document.getElementById('preview-canvas');
  const pdfPageWrapper = document.getElementById('pdf-page-wrapper');
  const btnPrevPage = document.getElementById('btn-prev-page');
  const btnNextPage = document.getElementById('btn-next-page');
  const pdfPageIndicator = document.getElementById('pdf-page-indicator');
  const progressCard = document.getElementById('progress-card');
  const ocrStatusMessage = document.getElementById('ocr-status-message');
  const ocrProgressPercent = document.getElementById('ocr-progress-percent');
  const ocrProgressFill = document.getElementById('ocr-progress-fill');
  const resultCard = document.getElementById('result-card');
  const extractedTextarea = document.getElementById('extracted-text');
  const statChars = document.getElementById('stat-chars');
  const statWords = document.getElementById('stat-words');
  const btnCopyText = document.getElementById('btn-copy-text');
  const btnDownloadTxt = document.getElementById('btn-download-txt');
  const toast = document.getElementById('toast');
  const toastIcon = document.getElementById('toast-icon');
  const toastMessage = document.getElementById('toast-message');
  const btnLanguageToggle = document.getElementById('btn-language-toggle');
  const langToggleText = document.getElementById('lang-toggle-text');
  const cookieBanner = document.getElementById('cookie-banner');
  const btnAcceptCookies = document.getElementById('btn-accept-cookies');
  const langChips = document.querySelectorAll('.lang-chip');

  // Initialize
  function init() {
    setupEventListeners();
    setupDropzone();
    setupLanguageSelector();
    setupCookieBanner();
    if (window.lucide) {
      lucide.createIcons();
    }
  }

  // Toast Notification
  let toastTimer = null;
  function showToast(messageKeyOrText, type = 'info', params = {}) {
    if (!toast) return;
    clearTimeout(toastTimer);

    const dict = translations[currentLang] || translations.en;
    let msg = dict[messageKeyOrText] || messageKeyOrText;

    Object.keys(params).forEach(k => {
      msg = msg.replace(`{${k}}`, params[k]);
    });

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

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const dict = translations[currentLang] || translations.en;
      if (dict[key]) {
        el.placeholder = dict[key];
      }
    });

    updatePdfPageIndicator();

    if (window.lucide) {
      lucide.createIcons();
    }
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
        currentFile = null;
        pdfDoc = null;
        workspaceSection.classList.add('hidden');
        dropzoneSection.classList.remove('hidden');
        resultCard.classList.add('hidden');
        progressCard.classList.add('hidden');
      });
    }

    if (btnStartOcr) {
      btnStartOcr.addEventListener('click', executeOcrExtraction);
    }

    if (btnPrevPage) {
      btnPrevPage.addEventListener('click', () => changePdfPage(-1));
    }

    if (btnNextPage) {
      btnNextPage.addEventListener('click', () => changePdfPage(1));
    }

    if (btnCopyText) {
      btnCopyText.addEventListener('click', copyExtractedText);
    }

    if (btnDownloadTxt) {
      btnDownloadTxt.addEventListener('click', downloadExtractedText);
    }

    if (extractedTextarea) {
      extractedTextarea.addEventListener('input', updateTextStatistics);
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

  // Language Chip Selectors
  function setupLanguageSelector() {
    langChips.forEach(chip => {
      chip.addEventListener('click', () => {
        langChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        selectedOcrLanguage = chip.getAttribute('data-lang') || 'eng';
      });
    });
  }

  // Handle Input File
  function handleFileInput(e) {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  }

  // Process Uploaded File
  async function processFile(file) {
    currentFile = file;
    isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');

    if (fileNameDisplay) fileNameDisplay.textContent = file.name;
    if (fileStatsDisplay) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
      fileStatsDisplay.textContent = `${sizeMB} MB • ${isPdf ? 'PDF Document' : 'Image File'}`;
    }

    if (fileTypeIcon) {
      fileTypeIcon.setAttribute('data-lucide', isPdf ? 'file-text' : 'image');
      if (window.lucide) lucide.createIcons();
    }

    dropzoneSection.classList.add('hidden');
    workspaceSection.classList.remove('hidden');
    resultCard.classList.add('hidden');
    progressCard.classList.add('hidden');

    if (isPdf) {
      await loadPdfDocument(file);
    } else {
      if (pdfPageWrapper) pdfPageWrapper.classList.add('hidden');
      await loadImageFile(file);
    }
  }

  // Load and Render PDF
  async function loadPdfDocument(file) {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = window.pdfjsLib.getDocument({ data: arrayBuffer });
      pdfDoc = await loadingTask.promise;
      totalPdfPages = pdfDoc.numPages;
      currentPdfPageNumber = 1;

      if (pdfPageWrapper) {
        if (totalPdfPages > 1) {
          pdfPageWrapper.classList.remove('hidden');
        } else {
          pdfPageWrapper.classList.add('hidden');
        }
      }

      updatePdfPageIndicator();
      await renderPdfPage(currentPdfPageNumber);
    } catch (err) {
      console.error("PDF load error:", err);
      showToast('toast_error', 'error');
    }
  }

  // Render a specific PDF Page onto Preview Canvas
  async function renderPdfPage(pageNumber) {
    if (!pdfDoc || !previewCanvas) return;
    try {
      const page = await pdfDoc.getPage(pageNumber);
      const viewport = page.getViewport({ scale: 2.0 }); // 2x scale for crisp OCR recognition

      previewCanvas.width = viewport.width;
      previewCanvas.height = viewport.height;

      const ctx = previewCanvas.getContext('2d');
      ctx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);

      const renderContext = {
        canvasContext: ctx,
        viewport: viewport
      };

      await page.render(renderContext).promise;
    } catch (err) {
      console.error("PDF render page error:", err);
      showToast('toast_error', 'error');
    }
  }

  // Change PDF Page
  async function changePdfPage(delta) {
    const newPage = currentPdfPageNumber + delta;
    if (newPage >= 1 && newPage <= totalPdfPages) {
      currentPdfPageNumber = newPage;
      updatePdfPageIndicator();
      await renderPdfPage(currentPdfPageNumber);
      showToast('toast_pdf_page_changed', 'info', { n: currentPdfPageNumber, total: totalPdfPages });
    }
  }

  function updatePdfPageIndicator() {
    if (pdfPageIndicator) {
      const isAr = (currentLang === 'ar');
      pdfPageIndicator.textContent = isAr
        ? `صفحة ${currentPdfPageNumber} من ${totalPdfPages}`
        : `Page ${currentPdfPageNumber} of ${totalPdfPages}`;
    }
    if (btnPrevPage) btnPrevPage.disabled = (currentPdfPageNumber <= 1);
    if (btnNextPage) btnNextPage.disabled = (currentPdfPageNumber >= totalPdfPages);
  }

  // Load Image File onto Preview Canvas
  function loadImageFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
          if (!previewCanvas) return;
          previewCanvas.width = img.width;
          previewCanvas.height = img.height;
          const ctx = previewCanvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          resolve();
        };
        img.onerror = reject;
        img.src = e.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // Interactive Sample Document Generator
  function loadSampleDocument() {
    if (!previewCanvas) return;

    previewCanvas.width = 1200;
    previewCanvas.height = 700;
    const ctx = previewCanvas.getContext('2d');

    // Clean background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, previewCanvas.width, previewCanvas.height);

    // Decorative Header Banner
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, previewCanvas.width, 100);

    // Header Title
    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 34px sans-serif";
    ctx.fillText("AnnotatePDF Pro • Client-Side OCR Test Document", 50, 62);

    // English Body
    ctx.fillStyle = "#1e293b";
    ctx.font = "bold 26px sans-serif";
    ctx.fillText("1. English Optical Character Recognition (OCR)", 50, 160);

    ctx.fillStyle = "#334155";
    ctx.font = "20px sans-serif";
    ctx.fillText("This is a high-resolution client-side test document processed directly via Tesseract.js.", 50, 205);
    ctx.fillText("No documents or personal files are ever transmitted to any external cloud servers.", 50, 245);
    ctx.fillText("Every character is processed in real-time on your local machine with 100% privacy.", 50, 285);

    // Divider Line
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(50, 330);
    ctx.lineTo(1150, 330);
    ctx.stroke();

    // Arabic Body
    ctx.fillStyle = "#1e293b";
    ctx.font = "bold 26px sans-serif";
    ctx.fillText("٢. التعرف الضوئي على النصوص العربية (OCR)", 50, 390);

    ctx.fillStyle = "#334155";
    ctx.font = "22px sans-serif";
    ctx.fillText("هذا مستند اختباري عالي الدقة لإثبات كفاءة استخراج النصوص محلياً داخل المتصفح.", 50, 440);
    ctx.fillText("تتم المعالجة بالكامل باستخدام مكتبة Tesseract.js مع الحفاظ التام على سرية البيانات.", 50, 485);
    ctx.fillText("منصة AnnotatePDF Pro توفر حزمة أدوات متكاملة وسريعة بدون أي خوادم وسيطة.", 50, 530);

    // Footer Stamp
    ctx.fillStyle = "#059669";
    ctx.font = "bold 18px sans-serif";
    ctx.fillText("✔ VERIFIED CLIENT-SIDE ENGINE • 100% PRIVATE • ZERO DATA LEAKAGE", 50, 620);

    if (fileNameDisplay) fileNameDisplay.textContent = "Sample_OCR_Document.png";
    if (fileStatsDisplay) fileStatsDisplay.textContent = "Interactive Sample Document • Ready for OCR";
    if (fileTypeIcon) fileTypeIcon.setAttribute('data-lucide', 'sparkles');

    dropzoneSection.classList.add('hidden');
    workspaceSection.classList.remove('hidden');
    resultCard.classList.add('hidden');
    progressCard.classList.add('hidden');
    if (pdfPageWrapper) pdfPageWrapper.classList.add('hidden');

    if (window.lucide) lucide.createIcons();
    showToast('toast_sample_loaded', 'success');
  }

  // Execute OCR with Tesseract.js
  async function executeOcrExtraction() {
    if (isProcessing) return;
    if (!previewCanvas) return;

    isProcessing = true;
    btnStartOcr.disabled = true;
    progressCard.classList.remove('hidden');
    resultCard.classList.add('hidden');

    updateProgressUI(0, 'ocr_status_init');

    try {
      const worker = await Tesseract.createWorker(selectedOcrLanguage, 1, {
        logger: m => handleTesseractProgress(m)
      });

      const ret = await worker.recognize(previewCanvas);
      await worker.terminate();

      const text = ret.data.text ? ret.data.text.trim() : '';

      updateProgressUI(100, 'ocr_status_done');

      setTimeout(() => {
        progressCard.classList.add('hidden');
        displayOcrResult(text);
        isProcessing = false;
        btnStartOcr.disabled = false;
      }, 500);

    } catch (err) {
      console.error("Tesseract recognition error:", err);
      progressCard.classList.add('hidden');
      isProcessing = false;
      btnStartOcr.disabled = false;
      showToast('toast_error', 'error');
    }
  }

  // Handle Tesseract Logger Messages
  function handleTesseractProgress(m) {
    if (!m) return;
    let statusKey = 'ocr_status_recognizing';
    let progressVal = 0;

    if (m.status === 'loading tesseract core') {
      statusKey = 'ocr_status_loading_core';
      progressVal = Math.round((m.progress || 0.1) * 20);
    } else if (m.status === 'loading language traineddata') {
      statusKey = 'ocr_status_loading_lang';
      progressVal = 20 + Math.round((m.progress || 0.1) * 30);
    } else if (m.status === 'initializing tesseract' || m.status === 'initializing api') {
      statusKey = 'ocr_status_init';
      progressVal = 50;
    } else if (m.status === 'recognizing text') {
      statusKey = 'ocr_status_recognizing';
      progressVal = 50 + Math.round((m.progress || 0) * 50);
    }

    updateProgressUI(progressVal, statusKey);
  }

  function updateProgressUI(percent, statusKey) {
    const boundedPercent = Math.min(Math.max(percent, 0), 100);
    if (ocrProgressPercent) ocrProgressPercent.textContent = `${boundedPercent}%`;
    if (ocrProgressFill) ocrProgressFill.style.width = `${boundedPercent}%`;
    if (ocrStatusMessage) {
      const dict = translations[currentLang] || translations.en;
      ocrStatusMessage.textContent = dict[statusKey] || statusKey;
    }
  }

  // Display Extracted OCR Result
  function displayOcrResult(text) {
    if (extractedTextarea) {
      extractedTextarea.value = text;
    }

    updateTextStatistics();
    resultCard.classList.remove('hidden');
    resultCard.scrollIntoView({ behavior: 'smooth', block: 'start' });

    if (text.length > 0) {
      showToast('toast_ocr_success', 'success');
    } else {
      showToast('toast_no_text', 'info');
    }
  }

  // Update Character and Word Count
  function updateTextStatistics() {
    if (!extractedTextarea) return;
    const val = extractedTextarea.value || '';
    const charCount = val.length;
    const wordCount = val.trim() ? val.trim().split(/\s+/).length : 0;

    if (statChars) statChars.textContent = charCount.toLocaleString();
    if (statWords) statWords.textContent = wordCount.toLocaleString();
  }

  // Copy Extracted Text to Clipboard
  async function copyExtractedText() {
    if (!extractedTextarea) return;
    const text = extractedTextarea.value;
    if (!text) return;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        extractedTextarea.select();
        document.execCommand('copy');
      }
      showToast('toast_copied', 'success');
    } catch (err) {
      console.error("Clipboard write error:", err);
      extractedTextarea.select();
      document.execCommand('copy');
      showToast('toast_copied', 'success');
    }
  }

  // Download Extracted Text as .TXT
  function downloadExtractedText() {
    if (!extractedTextarea) return;
    const text = extractedTextarea.value;
    if (!text) return;

    const baseName = currentFile ? currentFile.name.replace(/\.[^/.]+$/, "") : "extracted_text";
    const fileName = `${baseName}_ocr.txt`;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
