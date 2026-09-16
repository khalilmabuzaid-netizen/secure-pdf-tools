/**
 * WatermarkPDF Pro - Client-Side PDF Watermark Generator
 * Utilizes: PDF-Lib (100% Client-Side Processing • Zero Server Uploads)
 * Full Bilingual English / Arabic (RTL) Support
 */

(function () {
  'use strict';

  // Multi-Language Translation Dictionary
  const translations = {
    en: {
      badge_client_side: "100% Client-Side",
      nav_home: "Home",
      nav_annotator: "Annotator",
      nav_merge: "Merge PDF",
      nav_split: "Split PDF",
      nav_compress: "Compress PDF",
      nav_reset: "Reset",
      hero_badge: "Local & Secure • 100% Client-Side Watermarking • Zero Server Uploads",
      hero_title: 'Add Custom <span class="gradient-text">Watermarks</span> to PDFs',
      hero_subtitle: "Protect and brand your PDF documents with customizable text watermarks, custom opacity, color, and angle.",
      dropzone_title: "Drop your PDF file here",
      dropzone_subtitle: "Drag and drop any PDF file to apply a watermark, or browse from your device",
      btn_browse_file: "Browse PDF File",
      btn_load_sample: "Try Sample PDF",
      feature_presets: "Custom Text & Quick Presets",
      feature_opacity: "Adjustable Opacity & Angle",
      feature_client: "100% Client-Side Processing",
      btn_change_file: "Change File",
      label_watermark_text: "Watermark Text",
      placeholder_watermark_text: "e.g. CONFIDENTIAL, DRAFT, DO NOT COPY",
      presets_label: "Presets:",
      preset_confidential: "CONFIDENTIAL",
      preset_draft: "DRAFT",
      preset_do_not_copy: "DO NOT COPY",
      preset_top_secret: "TOP SECRET",
      preset_sample: "SAMPLE",
      preset_approved: "APPROVED",
      label_color: "Watermark Color",
      label_opacity: "Opacity",
      label_fontsize: "Font Size",
      label_rotation: "Rotation Angle",
      opt_diagonal: "45° (Diagonal)",
      opt_horizontal: "0° (Horizontal)",
      opt_reverse_diagonal: "-45° (Reverse Diagonal)",
      opt_vertical: "90° (Vertical)",
      preview_title: "Live Watermark Preview",
      preview_subtitle: "Visual representation of how the watermark will appear across pages",
      label_output_filename: "Output File Name",
      placeholder_output_filename: "watermarked_document",
      progress_applying: "Applying watermark to pages...",
      btn_cancel: "Cancel",
      btn_apply_watermark: "Apply Watermark & Download",
      btn_applying: "Applying Watermark...",
      page_singular: "Page",
      pages_plural: "Pages",
      total_suffix: "Total",
      toast_valid_pdf: "Please select a valid PDF file (.pdf)",
      toast_read_fail: "Failed to read the selected file.",
      toast_pdf_loaded: "PDF loaded: {pages} ready for watermarking.",
      toast_specify_text: "Please enter watermark text.",
      toast_watermark_success: "Watermark applied successfully across {n} page(s)!",
      toast_sample_generating: "Generating interactive sample PDF...",
      toast_sample_error: "Error creating sample: "
    },
    ar: {
      badge_client_side: "محلي ١٠٠٪ في المتصفح",
      nav_home: "الرئيسية",
      nav_annotator: "محرر PDF",
      nav_merge: "دمج PDF",
      nav_split: "تقسيم PDF",
      nav_compress: "ضغط PDF",
      nav_reset: "إعادة ضبط",
      hero_badge: "محلي وآمن • علامة مائية ١٠٠٪ في المتصفح • بدون رفع سحابي",
      hero_title: 'إضافة <span class="gradient-text">علامة مائية</span> لملفات PDF',
      hero_subtitle: "احمِ مستنداتك ووثقها بعلامات مائية مخصصة مع تحكم كامل بالشفافية واللون وزاوية الدوران.",
      dropzone_title: "اسحب ملف PDF هنا",
      dropzone_subtitle: "اسحب وأفلت ملف PDF لإضافة علامة مائية، أو تصفح من جهازك",
      btn_browse_file: "استعراض ملف PDF",
      btn_load_sample: "تجربة نموذج جاهز",
      feature_presets: "نصوص مخصصة وقوالب جاهزة",
      feature_opacity: "تحكم بالشفافية والزاوية",
      feature_client: "معالجة محلية ١٠٠٪ في المتصفح",
      btn_change_file: "تغيير الملف",
      label_watermark_text: "نص العلامة المائية",
      placeholder_watermark_text: "مثال: سري للغاية، مسودة، ممنوع النسخ",
      presets_label: "قوالب سريعة:",
      preset_confidential: "سري للغاية",
      preset_draft: "مسودة",
      preset_do_not_copy: "ممنوع النسخ",
      preset_top_secret: "سري",
      preset_sample: "نموذج",
      preset_approved: "معتمد",
      label_color: "لون العلامة المائية",
      label_opacity: "الشفافية",
      label_fontsize: "حجم الخط",
      label_rotation: "زاوية الدوران",
      opt_diagonal: "٤٥° (مائل قطري)",
      opt_horizontal: "٠° (أفقي)",
      opt_reverse_diagonal: "-٤٥° (مائل عكسي)",
      opt_vertical: "٩٠° (عمودي)",
      preview_title: "معاينة حية للعلامة المائية",
      preview_subtitle: "عرض مباشر لشكل العلامة المائية وموضعها على الصفحات",
      label_output_filename: "اسم الملف الناتج",
      placeholder_output_filename: "watermarked_document",
      progress_applying: "جاري تطبيق العلامة المائية على الصفحات...",
      btn_cancel: "إلغاء",
      btn_apply_watermark: "تطبيق العلامة وتنزيل PDF",
      btn_applying: "جاري تطبيق العلامة المائية...",
      page_singular: "صفحة",
      pages_plural: "صفحات",
      total_suffix: "إجمالي",
      toast_valid_pdf: "يرجى اختيار ملف PDF صالح (.pdf)",
      toast_read_fail: "فشل في قراءة الملف المحدد.",
      toast_pdf_loaded: "تم تحميل PDF: {pages} جاهزة للعلامة المائية.",
      toast_specify_text: "يرجى إدخال نص العلامة المائية.",
      toast_watermark_success: "تمت إضافة العلامة المائية بنجاح إلى {n} صفحة!",
      toast_sample_generating: "جاري إنشاء نموذج تفاعلي...",
      toast_sample_error: "حدث خطأ أثناء إنشاء النموذج: "
    }
  };

  // State
  let currentPdfBytes = null;
  let currentFileName = "document.pdf";
  let currentTotalPages = 0;
  let currentFileSize = 0;
  let isProcessing = false;
  let currentLang = 'en';

  // Watermark Settings
  let watermarkText = "CONFIDENTIAL";
  let watermarkColor = "#dc2626";
  let watermarkOpacity = 0.30;
  let watermarkFontSize = 52;
  let watermarkAngle = 45;

  // Cached DOM Elements
  let dropzone, fileInput, btnBrowseFile, btnLoadSample;
  let configPanel, fileNameDisplay, fileSizeDisplay, filePagesDisplay, btnChangeFile, btnHeaderReset;
  let btnLanguageToggle, langToggleText;
  let watermarkTextInput, presetChipsRow;
  let watermarkColorInput, colorWrapper, swatchBtns;
  let opacitySlider, opacityVal;
  let fontSizeSlider, fontSizeVal;
  let rotationSelect, outputFilenameInput;
  let liveWatermarkOverlay, previewPageCanvas;
  let progressCard, progressStatusText, progressPercent, progressFill;
  let btnCancel, btnApplyWatermark, btnApplyText, btnSpinner;
  let toastEl, toastMsgEl, toastIconEl;

  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    cacheElements();
    bindEvents();
    applyLanguage(currentLang);
    updateLivePreview();

    if (window.lucide) {
      window.lucide.createIcons();
    }
  });

  function cacheElements() {
    dropzone = document.getElementById('dropzone');
    fileInput = document.getElementById('pdf-file-input');
    btnBrowseFile = document.getElementById('btn-browse-file');
    btnLoadSample = document.getElementById('btn-load-sample');
    configPanel = document.getElementById('config-panel');
    fileNameDisplay = document.getElementById('file-name-display');
    fileSizeDisplay = document.getElementById('file-size-display');
    filePagesDisplay = document.getElementById('file-pages-display');
    btnChangeFile = document.getElementById('btn-change-file');
    btnHeaderReset = document.getElementById('btn-header-reset');
    btnLanguageToggle = document.getElementById('btn-language-toggle');
    langToggleText = document.getElementById('lang-toggle-text');
    watermarkTextInput = document.getElementById('watermark-text-input');
    presetChipsRow = document.getElementById('preset-chips-row');
    watermarkColorInput = document.getElementById('watermark-color-input');
    colorWrapper = document.getElementById('color-wrapper');
    swatchBtns = document.querySelectorAll('.swatch-btn');
    opacitySlider = document.getElementById('watermark-opacity-slider');
    opacityVal = document.getElementById('opacity-val');
    fontSizeSlider = document.getElementById('watermark-fontsize-slider');
    fontSizeVal = document.getElementById('fontsize-val');
    rotationSelect = document.getElementById('watermark-rotation-select');
    outputFilenameInput = document.getElementById('output-filename');
    liveWatermarkOverlay = document.getElementById('live-watermark-overlay');
    previewPageCanvas = document.getElementById('preview-page-canvas');
    progressCard = document.getElementById('progress-card');
    progressStatusText = document.getElementById('progress-status-text');
    progressPercent = document.getElementById('progress-percent');
    progressFill = document.getElementById('progress-fill');
    btnCancel = document.getElementById('btn-cancel');
    btnApplyWatermark = document.getElementById('btn-apply-watermark');
    btnApplyText = document.getElementById('btn-apply-text');
    btnSpinner = document.getElementById('btn-spinner');
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

    // Update active file pages display if file is loaded
    if (currentTotalPages > 0 && filePagesDisplay) {
      const pageLabel = currentTotalPages === 1 ? t('page_singular') : t('pages_plural');
      filePagesDisplay.textContent = `${currentTotalPages} ${pageLabel} ${t('total_suffix')}`;
    }

    // Update button text state if not processing
    if (btnApplyText && !isProcessing) {
      btnApplyText.textContent = t('btn_apply_watermark');
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

    // File Input Trigger
    if (btnBrowseFile && fileInput) {
      btnBrowseFile.addEventListener('click', () => fileInput.click());
    }

    // Dropzone Handlers
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
        if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          const file = e.dataTransfer.files[0];
          if (file) handleFileSelected(file);
        }
      });
    }

    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files.length > 0) {
          handleFileSelected(e.target.files[0]);
        }
      });
    }

    // Try Sample PDF Button
    if (btnLoadSample) {
      btnLoadSample.addEventListener('click', loadSamplePDF);
    }

    // File Change and Workspace Reset
    if (btnChangeFile) {
      btnChangeFile.addEventListener('click', () => {
        if (fileInput) fileInput.click();
      });
    }

    if (btnCancel) {
      btnCancel.addEventListener('click', resetWorkspace);
    }

    if (btnHeaderReset) {
      btnHeaderReset.addEventListener('click', resetWorkspace);
    }

    // Watermark Text Input & Presets
    if (watermarkTextInput) {
      watermarkTextInput.addEventListener('input', (e) => {
        watermarkText = e.target.value;
        updateLivePreview();
      });
    }

    document.querySelectorAll('.preset-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const text = chip.textContent.trim();
        watermarkText = text;
        if (watermarkTextInput) watermarkTextInput.value = text;
        updateLivePreview();
      });
    });

    // Color Picker & Color Swatches
    if (watermarkColorInput) {
      watermarkColorInput.addEventListener('input', (e) => {
        setColor(e.target.value);
      });
    }

    swatchBtns.forEach(swatch => {
      swatch.addEventListener('click', () => {
        const col = swatch.getAttribute('data-color');
        if (col) {
          setColor(col);
          if (watermarkColorInput) watermarkColorInput.value = col;
        }
      });
    });

    // Opacity Slider
    if (opacitySlider) {
      opacitySlider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        watermarkOpacity = val / 100;
        if (opacityVal) opacityVal.textContent = `${val}%`;
        updateLivePreview();
      });
    }

    // Font Size Slider
    if (fontSizeSlider) {
      fontSizeSlider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        watermarkFontSize = val;
        if (fontSizeVal) fontSizeVal.textContent = `${val}px`;
        updateLivePreview();
      });
    }

    // Rotation Select
    if (rotationSelect) {
      rotationSelect.addEventListener('change', (e) => {
        watermarkAngle = parseInt(e.target.value, 10) || 0;
        updateLivePreview();
      });
    }

    // Apply Watermark Primary Action
    if (btnApplyWatermark) {
      btnApplyWatermark.addEventListener('click', executeApplyWatermark);
    }
  }

  function setColor(hex) {
    watermarkColor = hex;
    if (colorWrapper) colorWrapper.style.backgroundColor = hex;
    swatchBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-color') === hex);
    });
    updateLivePreview();
  }

  // Update Live Preview Canvas Overlay
  function updateLivePreview() {
    if (!liveWatermarkOverlay) return;

    const displayText = watermarkText.trim() || "CONFIDENTIAL";
    liveWatermarkOverlay.textContent = displayText;
    liveWatermarkOverlay.style.color = watermarkColor;
    liveWatermarkOverlay.style.opacity = watermarkOpacity;

    // Scale font size proportionally for simulated canvas preview
    const scaledSize = Math.max(14, Math.round(watermarkFontSize * 0.42));
    liveWatermarkOverlay.style.fontSize = `${scaledSize}px`;
    liveWatermarkOverlay.style.transform = `rotate(${watermarkAngle}deg)`;
  }

  // File Handling
  function handleFileSelected(file) {
    if (!file) return;

    if (file.type && file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      showToast(t('toast_valid_pdf'), "warning");
      if (fileInput) fileInput.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = async function (e) {
      const rawBuffer = e.target.result;
      currentPdfBytes = new Uint8Array(rawBuffer);
      currentFileName = file.name || "document.pdf";
      currentFileSize = file.size || currentPdfBytes.byteLength;
      await processLoadedPdf(currentPdfBytes, currentFileName, currentFileSize);
    };
    reader.onerror = function () {
      showToast(t('toast_read_fail'), "error");
    };
    reader.readAsArrayBuffer(file);
  }

  async function processLoadedPdf(bytes, filename, sizeBytes) {
    try {
      if (!window.PDFLib) {
        throw new Error("PDF-Lib library is not loaded. Please check your internet connection.");
      }

      const pdfDoc = await PDFLib.PDFDocument.load(bytes.slice(0), { ignoreEncryption: true });
      currentTotalPages = pdfDoc.getPageCount();

      if (currentTotalPages === 0) {
        throw new Error("The selected document contains no pages.");
      }

      const pageLabel = currentTotalPages === 1 ? t('page_singular') : t('pages_plural');
      if (fileNameDisplay) fileNameDisplay.textContent = filename;
      if (filePagesDisplay) filePagesDisplay.textContent = `${currentTotalPages} ${pageLabel} ${t('total_suffix')}`;
      if (fileSizeDisplay) fileSizeDisplay.textContent = formatBytes(sizeBytes || bytes.byteLength);

      // Populate output filename
      if (outputFilenameInput) {
        const base = filename.replace(/\.pdf$/i, '');
        outputFilenameInput.value = `${base}_watermarked`;
      }

      // Switch views
      if (dropzone) dropzone.classList.add('hidden');
      if (configPanel) configPanel.classList.remove('hidden');
      if (progressCard) progressCard.classList.add('hidden');
      if (btnHeaderReset) btnHeaderReset.disabled = false;

      updateLivePreview();
      showToast(t('toast_pdf_loaded', { pages: `${currentTotalPages} ${pageLabel}` }), "success");
    } catch (err) {
      console.error("PDF Parsing Error:", err);
      showToast(`Failed to parse PDF: ${err.message}`, "error");
      resetWorkspace();
    }
  }

  // Core Watermark Execution
  async function executeApplyWatermark() {
    if (isProcessing) return;

    if (!currentPdfBytes || currentTotalPages === 0) {
      showToast("Please upload a PDF document first.", "warning");
      return;
    }

    const textToDraw = watermarkTextInput?.value?.trim() || "CONFIDENTIAL";
    if (!textToDraw) {
      showToast(t('toast_specify_text'), "warning");
      return;
    }

    setProcessingState(true);
    if (progressCard) progressCard.classList.remove('hidden');
    updateProgress(5, t('progress_applying'));

    try {
      if (!window.PDFLib) {
        throw new Error("PDF-Lib library not loaded.");
      }

      // Load document copy
      const pdfDoc = await PDFLib.PDFDocument.load(currentPdfBytes.slice(0), { ignoreEncryption: true });
      const helveticaFont = await pdfDoc.embedFont(PDFLib.StandardFonts.HelveticaBold);
      const pages = pdfDoc.getPages();
      const totalPages = pages.length;

      const rgbColor = hexToRgb(watermarkColor);
      const angleRad = (watermarkAngle * Math.PI) / 180;

      for (let i = 0; i < totalPages; i++) {
        const page = pages[i];
        const { width, height } = page.getSize();

        // Calculate text dimensions
        const textWidth = helveticaFont.widthOfTextAtSize(textToDraw, watermarkFontSize);
        const textHeight = helveticaFont.heightAtSize(watermarkFontSize);

        // Center calculation with rotation offset
        const centerX = width / 2;
        const centerY = height / 2;
        const halfW = textWidth / 2;
        const halfH = textHeight / 3;

        const deltaX = halfW * Math.cos(angleRad) - halfH * Math.sin(angleRad);
        const deltaY = halfW * Math.sin(angleRad) + halfH * Math.cos(angleRad);

        const drawX = centerX - deltaX;
        const drawY = centerY - deltaY;

        page.drawText(textToDraw, {
          x: drawX,
          y: drawY,
          size: watermarkFontSize,
          font: helveticaFont,
          color: PDFLib.rgb(rgbColor.r, rgbColor.g, rgbColor.b),
          opacity: watermarkOpacity,
          rotate: PDFLib.degrees(watermarkAngle)
        });

        const percent = Math.round(((i + 1) / totalPages) * 85);
        updateProgress(percent, t('progress_applying'));
      }

      updateProgress(95, "Saving watermarked document...");

      const modifiedPdfBytes = await pdfDoc.save();
      updateProgress(100, "Done! Downloading...");

      let outName = outputFilenameInput?.value?.trim() || "watermarked_document";
      if (!outName.toLowerCase().endsWith('.pdf')) {
        outName += '.pdf';
      }

      downloadBlob(modifiedPdfBytes, outName, 'application/pdf');

      showToast(t('toast_watermark_success', { n: totalPages }), "success");
    } catch (err) {
      console.error("Watermark Execution Error:", err);
      showToast(`Error applying watermark: ${err.message}`, "error");
    } finally {
      setProcessingState(false);
    }
  }

  function updateProgress(percent, message) {
    if (progressPercent) progressPercent.textContent = `${percent}%`;
    if (progressFill) progressFill.style.width = `${percent}%`;
    if (progressStatusText && message) progressStatusText.textContent = message;
  }

  function setProcessingState(active) {
    isProcessing = active;
    if (!btnApplyWatermark) return;

    btnApplyWatermark.disabled = active;
    if (btnSpinner) btnSpinner.classList.toggle('hidden', !active);
    if (btnApplyText) {
      btnApplyText.textContent = active ? t('btn_applying') : t('btn_apply_watermark');
    }
  }

  // Interactive Sample PDF Generator
  async function loadSamplePDF() {
    try {
      showToast(t('toast_sample_generating'), "info");

      if (!window.PDFLib) {
        throw new Error("PDF-Lib is not loaded.");
      }

      const sampleDoc = await PDFLib.PDFDocument.create();
      const font = await sampleDoc.embedFont(PDFLib.StandardFonts.Helvetica);
      const fontBold = await sampleDoc.embedFont(PDFLib.StandardFonts.HelveticaBold);

      const sections = [
        { title: "CONFIDENTIAL BUSINESS PROPOSAL", subtitle: "Project Alpha: Executive Summary & Financials", color: [245, 158, 11] },
        { title: "TECHNICAL SPECIFICATIONS", subtitle: "Architecture Diagrams & Security Overview", color: [99, 102, 241] },
        { title: "TERMS OF AGREEMENT & SIGNATURES", subtitle: "Authorized Sign-Off & Legal Disclaimers", color: [16, 185, 129] }
      ];

      for (let i = 0; i < sections.length; i++) {
        const page = sampleDoc.addPage([595.28, 841.89]); // A4
        const sec = sections[i];

        // Header colored banner
        page.drawRectangle({
          x: 0,
          y: 841.89 - 16,
          width: 595.28,
          height: 16,
          color: PDFLib.rgb(sec.color[0] / 255, sec.color[1] / 255, sec.color[2] / 255)
        });

        // Title
        page.drawText(sec.title, {
          x: 50,
          y: 770,
          size: 20,
          font: fontBold,
          color: PDFLib.rgb(0.12, 0.16, 0.23)
        });

        page.drawText(sec.subtitle, {
          x: 50,
          y: 745,
          size: 12,
          font: font,
          color: PDFLib.rgb(0.4, 0.45, 0.55)
        });

        // Content box
        page.drawRectangle({
          x: 50,
          y: 250,
          width: 495.28,
          height: 450,
          color: PDFLib.rgb(0.97, 0.98, 0.99),
          borderColor: PDFLib.rgb(0.88, 0.91, 0.94),
          borderWidth: 1
        });

        page.drawText("This is an interactive demonstration document generated entirely in your browser.", {
          x: 70,
          y: 660,
          size: 11,
          font: font,
          color: PDFLib.rgb(0.3, 0.35, 0.45)
        });

        page.drawText("Use the controls to customize text, color, opacity, and rotation angle.", {
          x: 70,
          y: 630,
          size: 11,
          font: font,
          color: PDFLib.rgb(0.3, 0.35, 0.45)
        });

        page.drawText(`Document Section 0${i + 1} • Watermark PDF Pro`, {
          x: 50,
          y: 30,
          size: 9,
          font: font,
          color: PDFLib.rgb(0.6, 0.65, 0.72)
        });
      }

      const sampleBytes = await sampleDoc.save();
      currentPdfBytes = sampleBytes;
      currentFileName = "sample_watermark_document.pdf";
      currentFileSize = sampleBytes.byteLength;

      await processLoadedPdf(sampleBytes, currentFileName, currentFileSize);
    } catch (err) {
      console.error("Sample generation error:", err);
      showToast(`${t('toast_sample_error')}${err.message}`, "error");
    }
  }

  // Workspace Reset
  function resetWorkspace() {
    currentPdfBytes = null;
    currentFileName = "document.pdf";
    currentTotalPages = 0;
    currentFileSize = 0;
    isProcessing = false;

    if (fileInput) fileInput.value = '';
    if (configPanel) configPanel.classList.add('hidden');
    if (dropzone) dropzone.classList.remove('hidden');
    if (progressCard) progressCard.classList.add('hidden');
    if (btnHeaderReset) btnHeaderReset.disabled = true;

    updateLivePreview();
  }

  // Helpers
  function hexToRgb(hex) {
    let clean = hex.replace('#', '');
    if (clean.length === 3) {
      clean = clean.split('').map(c => c + c).join('');
    }
    const num = parseInt(clean, 16);
    return {
      r: ((num >> 16) & 255) / 255,
      g: ((num >> 8) & 255) / 255,
      b: (num & 255) / 255
    };
  }

  function downloadBlob(bytes, filename, mimeType) {
    const blob = new Blob([bytes], { type: mimeType });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    }, 100);
  }

  function formatBytes(bytes, decimals = 1) {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  function showToast(message, type = "info") {
    if (!toastEl || !toastMsgEl) return;

    toastMsgEl.textContent = message;
    toastEl.className = `toast toast-${type}`;

    if (toastIconEl) {
      let iconName = 'info';
      if (type === 'success') iconName = 'check-circle-2';
      if (type === 'error') iconName = 'alert-triangle';
      if (type === 'warning') iconName = 'alert-circle';
      toastIconEl.setAttribute('data-lucide', iconName);
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }

    toastEl.classList.remove('hidden');
    clearTimeout(toastEl._timer);
    toastEl._timer = setTimeout(() => {
      toastEl.classList.add('hidden');
    }, 4000);
  }
})();
