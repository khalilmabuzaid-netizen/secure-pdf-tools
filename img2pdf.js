/**
 * ImageToPDF Pro - Client-Side Image to PDF Converter
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
      nav_watermark: "Watermark PDF",
      nav_reset: "Reset",
      hero_badge: "Local & Secure • 100% Client-Side Image to PDF • Zero Server Uploads",
      hero_title: 'Convert <span class="gradient-text">Images to PDF</span> Instantly',
      hero_subtitle: "Combine and convert your JPG, PNG, and WebP images into a single, beautifully formatted PDF document right inside your browser.",
      dropzone_title: "Drop your image files here",
      dropzone_subtitle: "Drag and drop multiple PNG or JPG photos, or browse from your computer",
      btn_browse_images: "Browse Image Files",
      btn_load_sample: "Try Sample Images",
      feature_multiple: "Multiple Images Supported",
      feature_reorder: "Reorder & Organize Pages",
      feature_client: "100% Client-Side Engine",
      queue_title: "Images to Convert",
      btn_add_more: "Add More Images",
      btn_clear_all: "Clear All",
      empty_title: "No images selected yet",
      empty_desc: "Upload at least 1 image above to begin converting to PDF.",
      label_layout_mode: "Page Sizing",
      opt_original: "Fit to Image (Original Dimensions)",
      opt_a4: "Standard A4 (Auto-Fit Page)",
      opt_letter: "US Letter (Auto-Fit Page)",
      label_output_filename: "Output File Name",
      placeholder_output_filename: "converted_images",
      progress_converting: "Converting images to PDF...",
      btn_cancel: "Cancel",
      btn_convert_pdf: "Convert to PDF & Download",
      btn_converting: "Converting to PDF...",
      image_singular: "image",
      images_plural: "images",
      total_suffix: "total",
      move_up: "Move Left",
      move_down: "Move Right",
      delete_image: "Remove",
      toast_skipped: "{n} non-image file(s) skipped. Please upload JPG or PNG files only.",
      toast_adding: "Adding {n} image(s)...",
      toast_added: "Added {n} image(s). Total: {total}",
      toast_removed: 'Removed "{name}"',
      toast_cleared: "All images removed from queue.",
      toast_select_min: "Please select at least 1 image file.",
      toast_success: "Successfully converted {n} image(s) to PDF!",
      toast_sample_generating: "Generating high-resolution sample images...",
      toast_sample_error: "Error creating sample images: "
    },
    ar: {
      badge_client_side: "محلي ١٠٠٪ في المتصفح",
      nav_home: "الرئيسية",
      nav_annotator: "محرر PDF",
      nav_merge: "دمج PDF",
      nav_split: "تقسيم PDF",
      nav_compress: "ضغط PDF",
      nav_watermark: "علامة مائية",
      nav_reset: "إعادة ضبط",
      hero_badge: "محلي وآمن • تحويل الصور إلى PDF في المتصفح • بدون رفع سحابي",
      hero_title: 'تحويل <span class="gradient-text">الصور إلى PDF</span> فوراً',
      hero_subtitle: "اجمع وحوّل صور JPG وPNG وWebP إلى ملف PDF واحد عالي الجودة ومنسق بدقة مباشرة في متصفحك.",
      dropzone_title: "اسحب ملفات الصور هنا",
      dropzone_subtitle: "اسحب وأفلت عدة صور بصيغتي PNG أو JPG، أو تصفح من جهازك",
      btn_browse_images: "استعراض الصور",
      btn_load_sample: "تجربة صور تجريبية",
      feature_multiple: "دعم عدة صور معاً",
      feature_reorder: "إعادة ترتيب وتنظيم الصفحات",
      feature_client: "محرك محلي ١٠٠٪ في المتصفح",
      queue_title: "الصور المراد تحويلها",
      btn_add_more: "إضافة المزيد من الصور",
      btn_clear_all: "مسح الكل",
      empty_title: "لم يتم اختيار أي صور بعد",
      empty_desc: "قم برفع صورة واحدة على الأقل أعلاه للبدء في التحويل إلى PDF.",
      label_layout_mode: "حجم الصفحات",
      opt_original: "حسب أبعاد الصورة الأصلية",
      opt_a4: "مقاس A4 قياسي (ملاءمة تلقائية)",
      opt_letter: "مقاس Letter (ملاءمة تلقائية)",
      label_output_filename: "اسم الملف الناتج",
      placeholder_output_filename: "converted_images",
      progress_converting: "جاري تحويل الصور إلى PDF...",
      btn_cancel: "إلغاء",
      btn_convert_pdf: "تحويل إلى PDF وتنزيل",
      btn_converting: "جاري التحويل إلى PDF...",
      image_singular: "صورة",
      images_plural: "صور",
      total_suffix: "إجمالي",
      move_up: "تحريك لليمين",
      move_down: "تحريك لليسار",
      delete_image: "حذف",
      toast_skipped: "تم تخطي {n} ملف(ات) غير متوافقة. يرجى رفع ملفات صور فقط.",
      toast_adding: "جاري إضافة {n} صورة...",
      toast_added: "تمت إضافة {n} صورة. الإجمالي: {total}",
      toast_removed: 'تم حذف "{name}"',
      toast_cleared: "تم مسح جميع الصور من القائمة.",
      toast_select_min: "يرجى اختيار صورة واحدة على الأقل.",
      toast_success: "تم تحويل {n} صورة إلى PDF بنجاح!",
      toast_sample_generating: "جاري توليد صور تجريبية عالية الدقة...",
      toast_sample_error: "حدث خطأ أثناء إنشاء الصور التجريبية: "
    }
  };

  // State
  let queuedImages = []; // Array of { id, file, name, size, type, dataUrl, width, height, buffer }
  let isConverting = false;
  let currentLang = 'en';
  let nextImageId = 1;

  // Cached DOM Elements
  let dropzone, fileInput, btnBrowseImages, btnLoadSample;
  let workspacePanel, imageCountBadge, btnAddMore, btnClearAll, imageGrid;
  let pageSizeSelect, outputFilenameInput;
  let progressCard, progressStatusText, progressPercent, progressFill;
  let btnCancel, btnConvertPdf, btnConvertText, btnSpinner, btnHeaderReset;
  let btnLanguageToggle, langToggleText;
  let toastEl, toastMsgEl, toastIconEl;

  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    cacheElements();
    bindEvents();
    applyLanguage(currentLang);
    renderQueue();

    if (window.lucide) {
      window.lucide.createIcons();
    }
  });

  function cacheElements() {
    dropzone = document.getElementById('dropzone');
    fileInput = document.getElementById('image-file-input');
    btnBrowseImages = document.getElementById('btn-browse-images');
    btnLoadSample = document.getElementById('btn-load-sample');
    workspacePanel = document.getElementById('workspace-panel');
    imageCountBadge = document.getElementById('image-count-badge');
    btnAddMore = document.getElementById('btn-add-more');
    btnClearAll = document.getElementById('btn-clear-all');
    imageGrid = document.getElementById('image-grid');
    pageSizeSelect = document.getElementById('page-size-select');
    outputFilenameInput = document.getElementById('output-filename');
    progressCard = document.getElementById('progress-card');
    progressStatusText = document.getElementById('progress-status-text');
    progressPercent = document.getElementById('progress-percent');
    progressFill = document.getElementById('progress-fill');
    btnCancel = document.getElementById('btn-cancel');
    btnConvertPdf = document.getElementById('btn-convert-pdf');
    btnConvertText = document.getElementById('btn-convert-text');
    btnSpinner = document.getElementById('btn-spinner');
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

    // Re-render queue with updated translations
    renderQueue();

    // Update button text state if not converting
    if (btnConvertText && !isConverting) {
      btnConvertText.textContent = t('btn_convert_pdf');
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
    if (btnBrowseImages && fileInput) {
      btnBrowseImages.addEventListener('click', () => fileInput.click());
    }

    if (btnAddMore && fileInput) {
      btnAddMore.addEventListener('click', () => fileInput.click());
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
        if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          handleFiles(Array.from(e.dataTransfer.files));
        }
      });
    }

    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files.length > 0) {
          handleFiles(Array.from(e.target.files));
          fileInput.value = ''; // Reset for re-selection
        }
      });
    }

    // Clear All & Reset
    if (btnClearAll) {
      btnClearAll.addEventListener('click', clearQueue);
    }

    if (btnCancel) {
      btnCancel.addEventListener('click', clearQueue);
    }

    if (btnHeaderReset) {
      btnHeaderReset.addEventListener('click', clearQueue);
    }

    // Sample Images Loader
    if (btnLoadSample) {
      btnLoadSample.addEventListener('click', loadSampleImages);
    }

    // Primary Conversion Action
    if (btnConvertPdf) {
      btnConvertPdf.addEventListener('click', executeConversion);
    }
  }

  // Handle uploaded files
  async function handleFiles(files) {
    if (!files || files.length === 0) return;

    const validFiles = [];
    let skippedCount = 0;

    for (const file of files) {
      const type = (file.type || '').toLowerCase();
      const name = (file.name || '').toLowerCase();
      const isImg = type.startsWith('image/') || name.endsWith('.png') || name.endsWith('.jpg') || name.endsWith('.jpeg') || name.endsWith('.webp');

      if (isImg) {
        validFiles.push(file);
      } else {
        skippedCount++;
      }
    }

    if (skippedCount > 0) {
      showToast(t('toast_skipped', { n: skippedCount }), "warning");
    }

    if (validFiles.length === 0) return;

    showToast(t('toast_adding', { n: validFiles.length }), "info");

    for (const file of validFiles) {
      try {
        const item = await processSingleImage(file);
        queuedImages.push(item);
      } catch (err) {
        console.error("Error processing image file:", file.name, err);
      }
    }

    renderQueue();
    showToast(t('toast_added', { n: validFiles.length, total: queuedImages.length }), "success");
  }

  function processSingleImage(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        const buffer = new Uint8Array(e.target.result);
        const blob = new Blob([buffer], { type: file.type || 'image/jpeg' });
        const dataUrl = URL.createObjectURL(blob);

        const img = new Image();
        img.onload = function () {
          resolve({
            id: nextImageId++,
            file: file,
            name: file.name || `image_${nextImageId}.jpg`,
            size: file.size || buffer.byteLength,
            type: file.type || 'image/jpeg',
            dataUrl: dataUrl,
            width: img.naturalWidth || 800,
            height: img.naturalHeight || 600,
            buffer: buffer
          });
        };
        img.onerror = function () {
          resolve({
            id: nextImageId++,
            file: file,
            name: file.name || `image_${nextImageId}.jpg`,
            size: file.size || buffer.byteLength,
            type: file.type || 'image/jpeg',
            dataUrl: dataUrl,
            width: 800,
            height: 600,
            buffer: buffer
          });
        };
        img.src = dataUrl;
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  }

  // Render Queue UI Grid
  function renderQueue() {
    const hasImages = queuedImages.length > 0;

    if (dropzone) dropzone.classList.toggle('hidden', hasImages);
    if (workspacePanel) workspacePanel.classList.toggle('hidden', !hasImages);
    if (btnHeaderReset) btnHeaderReset.disabled = !hasImages;

    if (imageCountBadge) {
      const countLabel = queuedImages.length === 1 ? t('image_singular') : t('images_plural');
      imageCountBadge.textContent = `${queuedImages.length} ${countLabel} ${t('total_suffix')}`;
    }

    if (!imageGrid) return;
    imageGrid.innerHTML = '';

    if (!hasImages) return;

    queuedImages.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'image-card';
      card.setAttribute('data-id', item.id);

      card.innerHTML = `
        <div class="thumbnail-box">
          <img src="${item.dataUrl}" alt="${escapeHtml(item.name)}" class="thumbnail-img">
          <span class="page-order-tag">#${index + 1}</span>
        </div>
        <div class="image-meta">
          <span class="image-name" title="${escapeHtml(item.name)}">${escapeHtml(item.name)}</span>
          <div class="image-submeta">
            <span>${item.width}×${item.height}</span>
            <span>${formatBytes(item.size)}</span>
          </div>
        </div>
        <div class="image-card-controls">
          <div class="card-btn-group">
            <button type="button" class="icon-action-btn move-left-btn" title="${t('move_up')}" ${index === 0 ? 'disabled' : ''}>
              <i data-lucide="chevron-left"></i>
            </button>
            <button type="button" class="icon-action-btn move-right-btn" title="${t('move_down')}" ${index === queuedImages.length - 1 ? 'disabled' : ''}>
              <i data-lucide="chevron-right"></i>
            </button>
          </div>
          <button type="button" class="icon-action-btn delete-btn" title="${t('delete_image')}">
            <i data-lucide="trash-2"></i>
          </button>
        </div>
      `;

      // Event Listeners for Card Actions
      const moveLeftBtn = card.querySelector('.move-left-btn');
      const moveRightBtn = card.querySelector('.move-right-btn');
      const deleteBtn = card.querySelector('.delete-btn');

      if (moveLeftBtn) {
        moveLeftBtn.addEventListener('click', () => moveImage(index, index - 1));
      }

      if (moveRightBtn) {
        moveRightBtn.addEventListener('click', () => moveImage(index, index + 1));
      }

      if (deleteBtn) {
        deleteBtn.addEventListener('click', () => removeImage(index));
      }

      imageGrid.appendChild(card);
    });

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function moveImage(fromIndex, toIndex) {
    if (toIndex < 0 || toIndex >= queuedImages.length) return;
    const item = queuedImages.splice(fromIndex, 1)[0];
    queuedImages.splice(toIndex, 0, item);
    renderQueue();
  }

  function removeImage(index) {
    if (index < 0 || index >= queuedImages.length) return;
    const item = queuedImages.splice(index, 1)[0];
    renderQueue();
    showToast(t('toast_removed', { name: item.name }), "info");
  }

  function clearQueue() {
    queuedImages = [];
    if (fileInput) fileInput.value = '';
    renderQueue();
    if (progressCard) progressCard.classList.add('hidden');
    showToast(t('toast_cleared'), "info");
  }

  // Core Conversion Execution using PDF-Lib
  async function executeConversion() {
    if (isConverting) return;

    if (queuedImages.length === 0) {
      showToast(t('toast_select_min'), "warning");
      return;
    }

    setConvertingState(true);
    if (progressCard) progressCard.classList.remove('hidden');
    updateProgress(5, t('progress_converting'));

    try {
      if (!window.PDFLib) {
        throw new Error("PDF-Lib library is not loaded.");
      }

      const pdfDoc = await PDFLib.PDFDocument.create();
      const totalImages = queuedImages.length;
      const layoutMode = pageSizeSelect ? pageSizeSelect.value : 'original';

      for (let i = 0; i < totalImages; i++) {
        const item = queuedImages[i];
        let embeddedImg = null;

        // Try embedding based on MIME type or fallback to canvas conversion
        const isPng = item.type.includes('png') || item.name.toLowerCase().endsWith('.png');
        const isJpg = item.type.includes('jpeg') || item.type.includes('jpg') || item.name.toLowerCase().endsWith('.jpg') || item.name.toLowerCase().endsWith('.jpeg');

        try {
          if (isPng) {
            embeddedImg = await pdfDoc.embedPng(item.buffer);
          } else if (isJpg) {
            embeddedImg = await pdfDoc.embedJpg(item.buffer);
          } else {
            // Convert WebP or other formats via Canvas to JPEG bytes
            const jpegBytes = await convertImageToJpegBytes(item.dataUrl);
            embeddedImg = await pdfDoc.embedJpg(jpegBytes);
          }
        } catch (embedErr) {
          console.warn("Direct embed failed, rasterizing via Canvas fallback:", embedErr);
          const jpegBytes = await convertImageToJpegBytes(item.dataUrl);
          embeddedImg = await pdfDoc.embedJpg(jpegBytes);
        }

        const imgWidth = embeddedImg.width;
        const imgHeight = embeddedImg.height;

        if (layoutMode === 'a4') {
          // Standard A4 dimensions: 595.28 x 841.89 pt
          const isLandscape = imgWidth > imgHeight;
          const pageWidth = isLandscape ? 841.89 : 595.28;
          const pageHeight = isLandscape ? 595.28 : 841.89;

          const scale = Math.min((pageWidth * 0.92) / imgWidth, (pageHeight * 0.92) / imgHeight);
          const drawW = imgWidth * scale;
          const drawH = imgHeight * scale;
          const drawX = (pageWidth - drawW) / 2;
          const drawY = (pageHeight - drawH) / 2;

          const page = pdfDoc.addPage([pageWidth, pageHeight]);
          page.drawImage(embeddedImg, { x: drawX, y: drawY, width: drawW, height: drawH });
        } else if (layoutMode === 'letter') {
          // US Letter dimensions: 612 x 792 pt
          const isLandscape = imgWidth > imgHeight;
          const pageWidth = isLandscape ? 792 : 612;
          const pageHeight = isLandscape ? 612 : 792;

          const scale = Math.min((pageWidth * 0.92) / imgWidth, (pageHeight * 0.92) / imgHeight);
          const drawW = imgWidth * scale;
          const drawH = imgHeight * scale;
          const drawX = (pageWidth - drawW) / 2;
          const drawY = (pageHeight - drawH) / 2;

          const page = pdfDoc.addPage([pageWidth, pageHeight]);
          page.drawImage(embeddedImg, { x: drawX, y: drawY, width: drawW, height: drawH });
        } else {
          // Fit to Original Dimensions
          const page = pdfDoc.addPage([imgWidth, imgHeight]);
          page.drawImage(embeddedImg, { x: 0, y: 0, width: imgWidth, height: imgHeight });
        }

        const percent = Math.round(((i + 1) / totalImages) * 90);
        updateProgress(percent, `Processing image ${i + 1} of ${totalImages}...`);
      }

      updateProgress(95, "Generating final PDF document...");

      const pdfBytes = await pdfDoc.save();
      updateProgress(100, "Done! Downloading...");

      let outName = outputFilenameInput?.value?.trim() || "converted_images";
      if (!outName.toLowerCase().endsWith('.pdf')) {
        outName += '.pdf';
      }

      downloadBlob(pdfBytes, outName, 'application/pdf');

      showToast(t('toast_success', { n: totalImages }), "success");
    } catch (err) {
      console.error("Conversion Error:", err);
      showToast(`Conversion failed: ${err.message}`, "error");
    } finally {
      setConvertingState(false);
    }
  }

  function convertImageToJpegBytes(dataUrl) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || 800;
        canvas.height = img.naturalHeight || 600;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        canvas.toBlob(async (blob) => {
          if (blob) {
            const buffer = new Uint8Array(await blob.arrayBuffer());
            resolve(buffer);
          } else {
            reject(new Error("Canvas toBlob failed"));
          }
        }, 'image/jpeg', 0.92);
      };
      img.onerror = reject;
      img.src = dataUrl;
    });
  }

  function updateProgress(percent, message) {
    if (progressPercent) progressPercent.textContent = `${percent}%`;
    if (progressFill) progressFill.style.width = `${percent}%`;
    if (progressStatusText && message) progressStatusText.textContent = message;
  }

  function setConvertingState(active) {
    isConverting = active;
    if (!btnConvertPdf) return;

    btnConvertPdf.disabled = active;
    if (btnSpinner) btnSpinner.classList.toggle('hidden', !active);
    if (btnConvertText) {
      btnConvertText.textContent = active ? t('btn_converting') : t('btn_convert_pdf');
    }
  }

  // Interactive Sample Images Generator
  async function loadSampleImages() {
    try {
      showToast(t('toast_sample_generating'), "info");

      const samples = [
        { title: "Presentation Slide 01", subtitle: "Project Architecture & Design", color1: "#4f46e5", color2: "#06b6d4" },
        { title: "Infographic Diagram 02", subtitle: "Performance Metrics & Benchmarks", color1: "#10b981", color2: "#3b82f6" },
        { title: "Executive Report 03", subtitle: "100% Client-Side Private Document", color1: "#f59e0b", color2: "#ef4444" }
      ];

      for (let i = 0; i < samples.length; i++) {
        const s = samples[i];
        const canvas = document.createElement('canvas');
        canvas.width = 1200;
        canvas.height = 800;
        const ctx = canvas.getContext('2d');

        // Background Gradient
        const grad = ctx.createLinearGradient(0, 0, 1200, 800);
        grad.addColorStop(0, s.color1);
        grad.addColorStop(1, s.color2);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 1200, 800);

        // Glass Card Box
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.roundRect(80, 80, 1040, 640, 24);
        ctx.fill();
        ctx.stroke();

        // Title & Text
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 54px sans-serif';
        ctx.fillText(s.title, 140, 220);

        ctx.font = '32px sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.fillText(s.subtitle, 140, 290);

        // Graphics / Stats
        for (let c = 0; c < 3; c++) {
          ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
          ctx.beginPath();
          ctx.roundRect(140 + (c * 320), 360, 280, 260, 16);
          ctx.fill();

          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 44px monospace';
          ctx.fillText(`0${c + 1}`, 170, 440);

          ctx.font = '22px sans-serif';
          ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
          ctx.fillText(`Asset Metric ${c + 1}`, 170, 500);
          ctx.fillText(`Client Verified: OK`, 170, 540);
        }

        const blob = await new Promise(r => canvas.toBlob(r, 'image/jpeg', 0.95));
        const buffer = new Uint8Array(await blob.arrayBuffer());
        const dataUrl = URL.createObjectURL(blob);

        queuedImages.push({
          id: nextImageId++,
          file: new File([blob], `sample_slide_0${i + 1}.jpg`, { type: 'image/jpeg' }),
          name: `sample_slide_0${i + 1}.jpg`,
          size: buffer.byteLength,
          type: 'image/jpeg',
          dataUrl: dataUrl,
          width: 1200,
          height: 800,
          buffer: buffer
        });
      }

      renderQueue();
      showToast(t('toast_added', { n: samples.length, total: queuedImages.length }), "success");
    } catch (err) {
      console.error("Sample images generator error:", err);
      showToast(`${t('toast_sample_error')}${err.message}`, "error");
    }
  }

  // Helpers
  function escapeHtml(str) {
    return (str || '').replace(/[&<>"']/g, function (m) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m];
    });
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
