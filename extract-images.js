/**
 * ==========================================================================
 * extract-images.js - PDF Embedded Image Extractor Engine
 * Powered by Mozilla PDF.js & JSZip
 * 100% Client-Side Privacy • Zero Server Uploads • Batch & Single Downloads
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
      breadcrumb_current: "Extract Images",
      hero_badge: "100% Client-Side • Lossless Embedded Photo Extraction • Zero Server Uploads",
      hero_title: 'Extract <span class="gradient-text">Images from PDF</span>',
      hero_subtitle: "Extract every embedded photo, drawing, and graphic from your PDF in original resolution. Download single images or export a batch ZIP file in seconds.",
      dropzone_title: "Drop your PDF file here",
      dropzone_subtitle: "Select or drag & drop any PDF document to extract all embedded raster images. 100% private in-browser extraction.",
      btn_browse: "Browse PDF File",
      btn_sample: "Try Sample PDF",
      feature_privacy: "100% In-Browser Privacy",
      feature_original_res: "Original Resolution",
      feature_zip: "Batch ZIP Archive Packaging",
      feature_instant: "Instant Extraction",
      btn_change_pdf: "Change PDF",
      btn_clear: "Clear",
      label_filter_size: "Filter Size:",
      filter_all: "All Images",
      filter_medium: "> 100px (Hide Icons)",
      filter_large: "> 300px (Photos Only)",
      btn_download_selected_zip: "Download Selected as ZIP",
      btn_download_all_zip: "Download All as ZIP (.zip)",
      progress_scanning: "Scanning PDF for embedded images...",
      progress_zipping: "Packaging images into ZIP archive...",
      gallery_title: "Extracted Images",
      btn_select_all: "Select All",
      btn_deselect_all: "Deselect All",
      btn_download_image: "Download",
      btn_copy_image: "Copy",
      btn_copied: "Copied!",
      zero_state_title: "No Embedded Images Found",
      zero_state_desc: "This document consists solely of vector text and shapes without separate embedded raster photos. If you want to convert entire PDF pages into images, use our PDF to JPG converter.",
      btn_try_pdf2jpg: "Try PDF to JPG Converter",
      ad_space_label: "Advertisement Space (728x90)",
      seo_badge: "100% Client-Side In-Browser Extraction",
      seo_title: "How to Extract Images from PDF Documents Online for Free",
      seo_subtitle: "Extract raw photos, illustrations, and figures from any PDF without re-compressing pages or compromising your sensitive document privacy.",
      guide_h2: "4 Easy Steps to Extract Images from PDF",
      step1_title: "1. Upload PDF",
      step1_desc: "Drag and drop your PDF document into the dropzone or choose a file from your device.",
      step2_title: "2. In-Browser Scan",
      step2_desc: "Our engine scans all internal PDF page operators to locate and decode embedded raster objects.",
      step3_title: "3. Filter & Preview",
      step3_desc: "View image thumbnails, inspect exact pixel resolutions, and filter out tiny icons or logos.",
      step4_title: "4. Download PNG/ZIP",
      step4_desc: "Download individual photos directly or export the entire collection in a single organized ZIP file.",
      features_h2: "Why Extract PDF Images with PDFNetizen?",
      fb_privacy_title: "100% Client-Side Privacy",
      fb_privacy_desc: "All extraction runs locally inside your browser. No files or images are ever uploaded to any cloud server.",
      fb_resolution_title: "Original Native Resolution",
      fb_resolution_desc: "Retrieves photos in their true embedded dimensions without losing sharpness or suffering re-compression artifacts.",
      fb_zip_title: "One-Click Batch ZIP Export",
      fb_zip_desc: "Effortlessly package dozens of extracted pictures into a single, clean ZIP archive generated in memory via JSZip.",
      fb_filter_title: "Dimension Filtering",
      fb_filter_desc: "Easily filter out small bullet points, header graphics, and decorative logos to focus only on full-size photos.",
      fb_free_title: "Zero Limits or Watermarks",
      fb_free_desc: "Completely free with unlimited extractions, zero file size caps, and no watermarks added to your images.",
      fb_cross_title: "Universal Compatibility",
      fb_cross_desc: "Works flawlessly on iPhones, iPads, Android smartphones, Mac, Windows, and Linux laptops with no software installs.",
      faq_h2: "Frequently Asked Questions",
      faq_q1: "How do I extract images from a PDF file online for free?",
      faq_a1: "Drag and drop your PDF into the secure upload dropzone. The tool scans every page for embedded raster image objects and displays them in a preview gallery. Click 'Download All as ZIP' or download individual photos directly.",
      faq_q2: "What is the difference between extracting images and converting PDF to JPG?",
      faq_a2: "Converting PDF to JPG renders entire document pages (including text, margins, and layout) as a single snapshot. Extracting images retrieves only the raw, embedded photo and graphic files in their original pixel dimensions without page backgrounds or surrounding text.",
      faq_q3: "Are my files uploaded to any external server?",
      faq_a3: "No. All extraction runs 100% in your browser using Mozilla PDF.js and WebAssembly. Your files never leave your computer or phone.",
      faq_q4: "Can I filter out small logos and icons from extraction?",
      faq_a4: "Yes! Use the built-in dimension filter to show all images, ignore tiny icons (<100px), or view only high-resolution photographs (>300px).",
      cookie_consent_text: "We use cookies to ensure optimal functionality and analyze traffic in compliance with privacy policies.",
      cookie_learn_more: "Learn more",
      cookie_accept_btn: "Accept & Close",
      footer_privacy: "Privacy Policy",
      footer_terms: "Terms of Service",
      footer_contact: "Contact Us",
      footer_tagline: "100% Client-side, private, and secure document processing directly in your browser.",
      footer_copyright: "© 2026 PDF Netizen. All rights reserved.",
      toast_loaded: "PDF loaded successfully!",
      toast_extracted_count: "Found and extracted {count} embedded images.",
      toast_no_images: "No embedded raster images found in this PDF.",
      toast_invalid_pdf: "Invalid or corrupt PDF file. Please try another.",
      toast_copy_success: "Image copied to clipboard!",
      toast_zip_started: "Generating ZIP file with {count} images...",
      toast_zip_ready: "ZIP download started!",
      card_page: "Page {page}",
      card_img_num: "Img {num}"
    },
    ar: {
      badge_client_side: "100% معالجة محلية",
      nav_home: "الرئيسية",
      breadcrumb_home: "الرئيسية",
      breadcrumb_current: "استخراج الصور",
      hero_badge: "100% معالجة داخل المتصفح • استخراج الصور الأصلية • بدون رفع على خوادم",
      hero_title: 'استخراج <span class="gradient-text">الصور من PDF</span>',
      hero_subtitle: "استخرج كافة الصور والرسومات المدمجة في مستند PDF بدقتها الأصلية. حمّل صوراً مفردة أو قم بتنزيل ملف ZIP مجمع في ثوانٍ.",
      dropzone_title: "اسحب وأفلت ملف PDF هنا",
      dropzone_subtitle: "اختر أو اسحب أي مستند PDF لاستخراج كافة الصور النقطية المدمجة. استخراج محلي خاص وآمن 100%.",
      btn_browse: "استعراض ملف PDF",
      btn_sample: "تجربة ملف نموذجي",
      feature_privacy: "خصوصية تامة 100%",
      feature_original_res: "دقة وجودة أصلية",
      feature_zip: "تجميع في ملف ZIP",
      feature_instant: "استخراج فوري",
      btn_change_pdf: "تغيير الملف",
      btn_clear: "مسح",
      label_filter_size: "تصفية الحجم:",
      filter_all: "كافة الصور",
      filter_medium: "> 100 بكسل (إخفاء الأيقونات)",
      filter_large: "> 300 بكسل (الصور الكبيرة)",
      btn_download_selected_zip: "تحميل المحدد في ZIP",
      btn_download_all_zip: "تحميل الكل كملف ZIP (.zip)",
      progress_scanning: "جارٍ فحص المستند واستخراج الصور...",
      progress_zipping: "جارٍ تجميع الصور في ملف مضغوط ZIP...",
      gallery_title: "الصور المستخرجة",
      btn_select_all: "تحديد الكل",
      btn_deselect_all: "إلغاء التحديد",
      btn_download_image: "تحميل",
      btn_copy_image: "نسخ",
      btn_copied: "تم النسخ!",
      zero_state_title: "لم يتم العثور على صور نقطية مدمجة",
      zero_state_desc: "هذا المستند يتكون فقط من نصوص وأشكال متجهة (Vector) بدون صور نقطية مدمجة. إذا أردت تحويل صفحات PDF بالكامل إلى صور، استخدم أداة تحويل PDF إلى JPG.",
      btn_try_pdf2jpg: "تجربة تحويل PDF إلى JPG",
      ad_space_label: "مساحة إعلانية (728x90)",
      seo_badge: "استخراج صور PDF داخل المتصفح بأمان 100%",
      seo_title: "كيفية استخراج الصور من ملفات PDF مجاناً عبر الإنترنت",
      seo_subtitle: "استخرج الصور والرسومات التوضيحية من أي ملف PDF دون إعادة ضغط أو المساس بخصوصية بياناتك.",
      guide_h2: "4 خطوات بسيطة لاستخراج الصور من PDF",
      step1_title: "1. رفع ملف PDF",
      step1_desc: "اسحب ملف PDF وأفلته في منطقة الرفع أو اختر الملف من جهازك.",
      step2_title: "2. الفحص داخل المتصفح",
      step2_desc: "يقوم محركنا بفحص كائنات المستند الداخلية والتعرف على الصور النقطية المدمجة.",
      step3_title: "3. المعاينة والتصفية",
      step3_desc: "عاين مصغرات الصور، واطلع على أبعادها بدقة، واستبعد الأيقونات والشعارات الصغيرة.",
      step4_title: "4. تنزيل الصور أو ملف ZIP",
      step4_desc: "حمّل الصور المفردة بصيغة PNG أو نزّل المجموعة كاملة في ملف ZIP مضغوط بنقرة واحدة.",
      features_h2: "لماذا تستخرج الصور عبر PDFNetizen؟",
      fb_privacy_title: "خصوصية تامة داخل المتصفح",
      fb_privacy_desc: "تتم كافة العمليات داخل متصفحك مباشرة دون رفع أي ملفات أو صور إلى أي خادم خارجي.",
      fb_resolution_title: "دقة وجودة أصلية بدون فقدان",
      fb_resolution_desc: "استخراج الصور بأبعادها الحقيقية المضمنة دون إعادة ضغط أو فقدان للجودة.",
      fb_zip_title: "تصدير مجمع في ملف ZIP",
      fb_zip_desc: "تجميع عشرات الصور المستخرجة في ملف مضغوط واحد بسهولة وفورية عبر تقنية JSZip.",
      fb_filter_title: "تصفية ذكية للأبعاد",
      fb_filter_desc: "تصفية الأيقونات والنقاط الصغيرة والشعارات للتركيز على الصور الفوتوغرافية الكاملة.",
      fb_free_title: "بدون حدود أو علامات مائية",
      fb_free_desc: "أداة مجانية بالكامل دون قيود على حجم الملفات وبدون إضافة أي علامات مائية.",
      fb_cross_title: "توافق شامل مع كافة الأجهزة",
      fb_cross_desc: "تعمل بسلاسة على الآيفون والأندرويد وأجهزة ماك وويندوز ولينكس بدون تثبيت برامج.",
      faq_h2: "الأسئلة الشائعة",
      faq_q1: "كيف أستخرج الصور من ملف PDF مجاناً؟",
      faq_a1: "اسحب ملف PDF وأفلته في مربع الرفع. ستقوم الأداة بفحص كل صفحة واستخراج كافة الصور المدمجة وعرضها في المعرض. انقر على 'تحميل الكل كملف ZIP' أو حمّل صوراً فردية.",
      faq_q2: "ما الفرق بين استخراج الصور وتحويل PDF إلى JPG؟",
      faq_a2: "تحويل PDF إلى JPG يحول الصفحة بأكملها (شاملة النصوص والهوامش والتنسيق) إلى صورة كاملة، بينما استخراج الصور يستخرج فقط ملفات الصور المدمجة داخل المستند بدقتها الأصلية دون خلفيات الصفحات أو النصوص المحيطة.",
      faq_q3: "هل يتم رفع ملفاتي إلى أي خادم؟",
      faq_a3: "لا إطلاقاً. تتم كل العمليات 100% داخل متصفحك باستخدام Mozilla PDF.js وWebAssembly ولا تغادر ملفاتك جهازك أبداً.",
      faq_q4: "هل يمكنني استبعاد الأيقونات والشعارات الصغيرة؟",
      faq_a4: "نعم! يمكنك استخدام أزرار التصفية لعرض كل الصور أو إخفاء الأيقونات الصغيرة (<100 بكسل) أو عرض الصور الكبيرة فقط (>300 بكسل).",
      cookie_consent_text: "نستخدم ملفات تعريف الارتباط لتحسين تجربة التصفح وتحليل حركة الزوار وفقاً لسياسة الخصوصية.",
      cookie_learn_more: "معرفة المزيد",
      cookie_accept_btn: "قبول وإغلاق",
      footer_privacy: "سياسة الخصوصية",
      footer_terms: "شروط الخدمة",
      footer_contact: "اتصل بنا",
      footer_tagline: "معالجة مستندات آمنة، خاصة، ومحلية 100% داخل متصفحك مباشرة.",
      footer_copyright: "© 2026 PDF Netizen. جميع الحقوق محفوظة.",
      toast_loaded: "تم تحميل ملف PDF بنجاح!",
      toast_extracted_count: "تم العثور على {count} صورة مدمجة واستخراجها.",
      toast_no_images: "لم يتم العثور على صور نقطية مدمجة في هذا الملف.",
      toast_invalid_pdf: "ملف PDF غير صالح أو تالف. يرجى تجربة ملف آخر.",
      toast_copy_success: "تم نسخ الصورة إلى الحافظة بنجاح!",
      toast_zip_started: "جارٍ إنشاء ملف ZIP يحتوي على {count} صورة...",
      toast_zip_ready: "بدأ تنزيل ملف ZIP!",
      card_page: "صفحة {page}",
      card_img_num: "صورة {num}"
    }
  };

  // State
  const state = {
    file: null,
    fileName: 'document.pdf',
    pdfDoc: null,
    images: [], // array of { id, pageNum, imgIndex, name, width, height, format, blob, dataUrl, sizeBytes, selected }
    filterMinSize: 0, // 0 | 100 | 300
    isScanning: false,
    currentLang: localStorage.getItem('language') || 'en'
  };

  // DOM Elements
  const dropzoneCard = document.getElementById('dropzone-card');
  const fileInput = document.getElementById('pdf-file-input');
  const btnBrowse = document.getElementById('btn-browse-file');
  const btnSample = document.getElementById('btn-sample-pdf');
  const workspaceSection = document.getElementById('workspace-section');
  const fileNameText = document.getElementById('file-name-text');
  const filePagesBadge = document.getElementById('file-pages-badge');
  const fileImagesBadge = document.getElementById('file-images-badge');
  const fileSizeBadge = document.getElementById('file-size-badge');
  const btnChangePdf = document.getElementById('btn-change-pdf');
  const btnClearPdf = document.getElementById('btn-clear-pdf');
  const progressBanner = document.getElementById('progress-banner');
  const progressStatusText = document.getElementById('progress-status-text');
  const progressPercentage = document.getElementById('progress-percentage');
  const progressFill = document.getElementById('progress-fill');
  const galleryCountBadge = document.getElementById('gallery-count-badge');
  const imagesGrid = document.getElementById('images-grid');
  const zeroStateCard = document.getElementById('zero-state-card');
  const btnSelectAll = document.getElementById('btn-select-all');
  const btnDeselectAll = document.getElementById('btn-deselect-all');
  const btnDownloadSelectedZip = document.getElementById('btn-download-selected-zip');
  const btnDownloadAllZip = document.getElementById('btn-download-all-zip');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxMeta = document.getElementById('lightbox-meta');
  const lightboxClose = document.getElementById('lightbox-close');
  const toast = document.getElementById('toast');
  const toastIcon = document.getElementById('toast-icon');
  const toastMessage = document.getElementById('toast-message');
  const btnLanguageToggle = document.getElementById('btn-language-toggle');
  const langToggleText = document.getElementById('lang-toggle-text');
  const cookieBanner = document.getElementById('cookie-banner');
  const btnAcceptCookies = document.getElementById('btn-accept-cookies');

  let toastTimeout = null;

  /**
   * Initialize UI and Event Listeners
   */
  function init() {
    initI18n();
    initCookieConsent();
    bindEvents();
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  /**
   * Bind DOM Events
   */
  function bindEvents() {
    // Dropzone Click & Drag/Drop
    btnBrowse.addEventListener('click', () => fileInput.click());
    dropzoneCard.addEventListener('click', (e) => {
      if (e.target !== btnSample && !btnSample.contains(e.target)) {
        fileInput.click();
      }
    });

    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files.length > 0) {
        handleFileSelection(e.target.files[0]);
      }
    });

    ['dragenter', 'dragover'].forEach((eventName) => {
      dropzoneCard.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzoneCard.classList.add('dragover');
      });
    });

    ['dragleave', 'drop'].forEach((eventName) => {
      dropzoneCard.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzoneCard.classList.remove('dragover');
      });
    });

    dropzoneCard.addEventListener('drop', (e) => {
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];
        if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
          handleFileSelection(file);
        } else {
          showToast(t('toast_invalid_pdf'), 'error');
        }
      }
    });

    // Sample PDF
    btnSample.addEventListener('click', (e) => {
      e.stopPropagation();
      loadSamplePdf();
    });

    // Change / Clear PDF
    btnChangePdf.addEventListener('click', () => fileInput.click());
    btnClearPdf.addEventListener('click', resetWorkspace);

    // Filters
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        state.filterMinSize = parseInt(btn.getAttribute('data-size-filter') || '0', 10);
        renderGallery();
      });
    });

    // Selection buttons
    btnSelectAll.addEventListener('click', () => setAllSelection(true));
    btnDeselectAll.addEventListener('click', () => setAllSelection(false));

    // Download ZIP
    btnDownloadAllZip.addEventListener('click', () => downloadZip(false));
    btnDownloadSelectedZip.addEventListener('click', () => downloadZip(true));

    // Lightbox
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
        closeLightbox();
      }
    });

    // Language Toggle
    if (btnLanguageToggle) {
      btnLanguageToggle.addEventListener('click', toggleLanguage);
    }
  }

  /**
   * Handle File Selection
   */
  async function handleFileSelection(file) {
    if (!file) return;
    state.file = file;
    state.fileName = file.name;
    state.images = [];

    // Update UI headers
    fileNameText.textContent = file.name;
    fileSizeBadge.textContent = formatBytes(file.size);

    // Show Workspace, hide dropzone
    dropzoneCard.classList.add('hidden');
    workspaceSection.classList.remove('hidden');
    zeroStateCard.classList.add('hidden');

    showToast(t('toast_loaded'), 'success');

    try {
      const arrayBuffer = await file.arrayBuffer();
      await processPdf(arrayBuffer);
    } catch (err) {
      console.error('Error reading PDF file:', err);
      showToast(t('toast_invalid_pdf'), 'error');
      resetWorkspace();
    }
  }

  /**
   * Process PDF and extract embedded images
   */
  async function processPdf(arrayBuffer) {
    state.isScanning = true;
    showProgress(0, t('progress_scanning'));

    try {
      // Defensive slice of ArrayBuffer
      const safeBuffer = arrayBuffer.slice(0);
      const loadingTask = pdfjsLib.getDocument({ data: safeBuffer });
      const pdfDoc = await loadingTask.promise;
      state.pdfDoc = pdfDoc;

      const numPages = pdfDoc.numPages;
      filePagesBadge.textContent = `${numPages} ${numPages === 1 ? 'Page' : 'Pages'}`;

      const allExtractedImages = [];
      let globalImageCounter = 0;

      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const percent = Math.round((pageNum / numPages) * 100);
        showProgress(percent, `${t('progress_scanning')} (${pageNum}/${numPages})`);

        const page = await pdfDoc.getPage(pageNum);
        const ops = await page.getOperatorList();
        const imageRefs = [];

        // Collect paintImageXObject and paintInlineImageXObject operators
        for (let i = 0; i < ops.fnArray.length; i++) {
          const fn = ops.fnArray[i];
          if (fn === pdfjsLib.OPS.paintImageXObject) {
            const imgName = ops.argsArray[i][0];
            imageRefs.push({ type: 'xobject', name: imgName });
          } else if (fn === pdfjsLib.OPS.paintInlineImageXObject) {
            const inlineObj = ops.argsArray[i][0];
            imageRefs.push({ type: 'inline', obj: inlineObj });
          } else if (fn === pdfjsLib.OPS.paintImageMaskXObject) {
            const maskName = ops.argsArray[i][0];
            imageRefs.push({ type: 'mask', name: maskName });
          }
        }

        let pageImgIndex = 0;
        for (const ref of imageRefs) {
          try {
            let imgData = null;
            if (ref.type === 'xobject' || ref.type === 'mask') {
              imgData = await new Promise((resolve) => {
                page.objs.get(ref.name, (obj) => resolve(obj));
              });
            } else if (ref.type === 'inline') {
              imgData = ref.obj;
            }

            if (!imgData) continue;

            pageImgIndex++;
            globalImageCounter++;

            const extracted = await convertPdfImageToBlob(
              imgData,
              pageNum,
              pageImgIndex,
              globalImageCounter,
              ref.name || `inline_${globalImageCounter}`
            );

            if (extracted) {
              allExtractedImages.push(extracted);
            }
          } catch (imgErr) {
            console.warn(`Could not extract image on page ${pageNum}:`, imgErr);
          }
        }
      }

      state.images = allExtractedImages;
      hideProgress();

      // Update count badge
      fileImagesBadge.textContent = `${allExtractedImages.length} Images Found`;
      galleryCountBadge.textContent = allExtractedImages.length.toString();

      if (allExtractedImages.length === 0) {
        zeroStateCard.classList.remove('hidden');
        imagesGrid.innerHTML = '';
        showToast(t('toast_no_images'), 'info');
      } else {
        zeroStateCard.classList.add('hidden');
        renderGallery();
        showToast(t('toast_extracted_count').replace('{count}', allExtractedImages.length), 'success');
      }

    } catch (err) {
      console.error('Failed to parse and extract PDF images:', err);
      hideProgress();
      showToast(t('toast_invalid_pdf'), 'error');
    } finally {
      state.isScanning = false;
      updateBatchButtonsState();
    }
  }

  /**
   * Convert PDF Image Data Object to PNG Blob and Data URL
   */
  async function convertPdfImageToBlob(imgData, pageNum, imgIndex, globalId, objName) {
    let width = imgData.width || 0;
    let height = imgData.height || 0;

    if (!width || !height) {
      if (imgData.bitmap) {
        width = imgData.bitmap.width;
        height = imgData.bitmap.height;
      } else if (imgData instanceof HTMLImageElement || imgData instanceof ImageBitmap) {
        width = imgData.width;
        height = imgData.height;
      }
    }

    if (!width || !height || width <= 0 || height <= 0) {
      return null;
    }

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    if (imgData instanceof ImageBitmap || imgData instanceof HTMLImageElement) {
      ctx.drawImage(imgData, 0, 0, width, height);
    } else if (imgData.bitmap && (imgData.bitmap instanceof ImageBitmap || imgData.bitmap instanceof HTMLImageElement)) {
      ctx.drawImage(imgData.bitmap, 0, 0, width, height);
    } else if (imgData.data) {
      const data = imgData.data;
      const expectedRgbaLen = width * height * 4;
      const expectedRgbLen = width * height * 3;
      const expectedGrayLen = width * height;

      const imageData = ctx.createImageData(width, height);

      if (data.length === expectedRgbaLen) {
        // Direct RGBA
        imageData.data.set(data);
      } else if (data.length === expectedRgbLen) {
        // RGB -> RGBA
        let srcIdx = 0;
        let dstIdx = 0;
        for (let i = 0; i < width * height; i++) {
          imageData.data[dstIdx] = data[srcIdx];
          imageData.data[dstIdx + 1] = data[srcIdx + 1];
          imageData.data[dstIdx + 2] = data[srcIdx + 2];
          imageData.data[dstIdx + 3] = 255;
          srcIdx += 3;
          dstIdx += 4;
        }
      } else if (data.length === expectedGrayLen) {
        // Grayscale 8bpp -> RGBA
        let dstIdx = 0;
        for (let i = 0; i < width * height; i++) {
          const val = data[i];
          imageData.data[dstIdx] = val;
          imageData.data[dstIdx + 1] = val;
          imageData.data[dstIdx + 2] = val;
          imageData.data[dstIdx + 3] = 255;
          dstIdx += 4;
        }
      } else {
        // 1-bit or variable bpp mask
        let dstIdx = 0;
        for (let i = 0; i < width * height; i++) {
          const byteIdx = Math.floor(i / 8);
          const bitIdx = 7 - (i % 8);
          const bit = byteIdx < data.length ? (data[byteIdx] >> bitIdx) & 1 : 0;
          const val = bit ? 255 : 0;
          imageData.data[dstIdx] = val;
          imageData.data[dstIdx + 1] = val;
          imageData.data[dstIdx + 2] = val;
          imageData.data[dstIdx + 3] = 255;
          dstIdx += 4;
        }
      }

      ctx.putImageData(imageData, 0, 0);
    } else {
      return null;
    }

    // Convert Canvas to Blob
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
    if (!blob) return null;

    const dataUrl = URL.createObjectURL(blob);

    return {
      id: globalId,
      pageNum,
      imgIndex,
      name: objName || `image_${globalId}`,
      width,
      height,
      format: 'PNG',
      blob,
      dataUrl,
      sizeBytes: blob.size,
      selected: true
    };
  }

  /**
   * Render Extracted Images Gallery Grid
   */
  function renderGallery() {
    imagesGrid.innerHTML = '';

    const minSize = state.filterMinSize;
    const filtered = state.images.filter(
      (img) => Math.max(img.width, img.height) >= minSize
    );

    galleryCountBadge.textContent = `${filtered.length} / ${state.images.length}`;

    if (filtered.length === 0) {
      zeroStateCard.classList.remove('hidden');
      return;
    } else {
      zeroStateCard.classList.add('hidden');
    }

    filtered.forEach((img) => {
      const card = document.createElement('div');
      card.className = `image-card ${img.selected ? 'selected' : ''}`;
      card.setAttribute('data-id', img.id);

      const pageText = t('card_page').replace('{page}', img.pageNum);
      const imgNumText = t('card_img_num').replace('{num}', img.imgIndex);

      card.innerHTML = `
        <div class="card-top-bar">
          <label class="select-checkbox-label">
            <input type="checkbox" class="img-select-checkbox" ${img.selected ? 'checked' : ''}>
            <span>${pageText}</span>
          </label>
          <span class="page-tag">${imgNumText}</span>
        </div>

        <div class="image-preview-wrap" title="Click to enlarge preview">
          <img src="${img.dataUrl}" alt="Extracted Image ${img.id}" loading="lazy">
          <div class="preview-overlay">
            <i data-lucide="zoom-in"></i>
            <span>Preview</span>
          </div>
        </div>

        <div class="card-meta-row">
          <span>${img.width} × ${img.height} px</span>
          <span>${formatBytes(img.sizeBytes)}</span>
        </div>

        <div class="card-actions-row">
          <button type="button" class="btn btn-primary btn-sm btn-card-action btn-download-single">
            <i data-lucide="download"></i>
            <span>${t('btn_download_image')}</span>
          </button>
          <button type="button" class="btn btn-secondary btn-sm btn-card-action btn-copy-single" title="Copy to clipboard">
            <i data-lucide="copy"></i>
            <span>${t('btn_copy_image')}</span>
          </button>
        </div>
      `;

      // Checkbox selection
      const checkbox = card.querySelector('.img-select-checkbox');
      checkbox.addEventListener('change', (e) => {
        img.selected = e.target.checked;
        card.classList.toggle('selected', img.selected);
        updateBatchButtonsState();
      });

      // Preview Lightbox
      const previewWrap = card.querySelector('.image-preview-wrap');
      previewWrap.addEventListener('click', () => openLightbox(img));

      // Single Image Download
      const btnDownload = card.querySelector('.btn-download-single');
      btnDownload.addEventListener('click', () => downloadSingleImage(img));

      // Copy Image to Clipboard
      const btnCopy = card.querySelector('.btn-copy-single');
      btnCopy.addEventListener('click', () => copyImageToClipboard(img, btnCopy));

      imagesGrid.appendChild(card);
    });

    if (window.lucide) {
      window.lucide.createIcons();
    }

    updateBatchButtonsState();
  }

  /**
   * Set selection state for all images
   */
  function setAllSelection(selected) {
    state.images.forEach((img) => (img.selected = selected));
    document.querySelectorAll('.img-select-checkbox').forEach((cb) => (cb.checked = selected));
    document.querySelectorAll('.image-card').forEach((card) => card.classList.toggle('selected', selected));
    updateBatchButtonsState();
  }

  /**
   * Update state of batch buttons
   */
  function updateBatchButtonsState() {
    const selectedCount = state.images.filter((img) => img.selected).length;
    btnDownloadSelectedZip.disabled = selectedCount === 0;
    btnDownloadSelectedZip.innerHTML = `<i data-lucide="archive"></i> <span>${t('btn_download_selected_zip')} (${selectedCount})</span>`;
    btnDownloadAllZip.disabled = state.images.length === 0;

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  /**
   * Download a single image
   */
  function downloadSingleImage(img) {
    const baseName = sanitizeBaseName(state.fileName);
    const fileName = `${baseName}_p${img.pageNum}_img${img.imgIndex}.png`;

    const a = document.createElement('a');
    a.href = img.dataUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  /**
   * Copy image to clipboard
   */
  async function copyImageToClipboard(img, btnElement) {
    try {
      if (navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': img.blob })
        ]);
        showToast(t('toast_copy_success'), 'success');
        const origText = btnElement.querySelector('span').textContent;
        btnElement.querySelector('span').textContent = t('btn_copied');
        setTimeout(() => {
          btnElement.querySelector('span').textContent = origText;
        }, 1500);
      } else {
        // Fallback: download
        downloadSingleImage(img);
      }
    } catch (err) {
      console.warn('Clipboard write failed, downloading instead:', err);
      downloadSingleImage(img);
    }
  }

  /**
   * Batch Download Images as ZIP
   */
  async function downloadZip(onlySelected = false) {
    const targets = onlySelected
      ? state.images.filter((img) => img.selected)
      : state.images;

    if (targets.length === 0) return;

    if (!window.JSZip) {
      showToast('JSZip library is missing.', 'error');
      return;
    }

    showProgress(20, t('progress_zipping'));
    showToast(t('toast_zip_started').replace('{count}', targets.length), 'info');

    try {
      const zip = new JSZip();
      const baseName = sanitizeBaseName(state.fileName);
      const folderName = `${baseName}_images`;
      const imgFolder = zip.folder(folderName);

      targets.forEach((img, idx) => {
        const filename = `page_${img.pageNum}_img_${img.imgIndex}.png`;
        imgFolder.file(filename, img.blob);
      });

      showProgress(70, t('progress_zipping'));

      const zipBlob = await zip.generateAsync(
        {
          type: 'blob',
          compression: 'DEFLATE',
          compressionOptions: { level: 6 }
        },
        (metadata) => {
          showProgress(Math.round(metadata.percent), t('progress_zipping'));
        }
      );

      const zipUrl = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = zipUrl;
      a.download = `${baseName}_extracted_images.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setTimeout(() => URL.revokeObjectURL(zipUrl), 20000);
      hideProgress();
      showToast(t('toast_zip_ready'), 'success');

    } catch (zipErr) {
      console.error('Failed to generate ZIP archive:', zipErr);
      hideProgress();
      showToast('Failed to create ZIP archive.', 'error');
    }
  }

  /**
   * Lightbox Modal Functions
   */
  function openLightbox(img) {
    lightboxImg.src = img.dataUrl;
    lightboxMeta.textContent = `Page ${img.pageNum} • Image ${img.imgIndex} • ${img.width} × ${img.height} px • ${formatBytes(img.sizeBytes)}`;
    lightboxModal.classList.add('active');
  }

  function closeLightbox() {
    lightboxModal.classList.remove('active');
    lightboxImg.src = '';
  }

  /**
   * Generate and Load Sample PDF with embedded graphics
   */
  async function loadSamplePdf() {
    showToast('Creating sample PDF with embedded images...', 'info');

    // Create Canvas with sample graphic
    const sampleCanvas = document.createElement('canvas');
    sampleCanvas.width = 600;
    sampleCanvas.height = 400;
    const ctx = sampleCanvas.getContext('2d');

    // Draw vibrant background gradient
    const grad = ctx.createLinearGradient(0, 0, 600, 400);
    grad.addColorStop(0, '#6366f1');
    grad.addColorStop(0.5, '#06b6d4');
    grad.addColorStop(1, '#3b82f6');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 600, 400);

    // Draw geometric shapes
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(300, 200, 90, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#1e1b4b';
    ctx.font = 'bold 28px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('PDF Netizen', 300, 190);

    ctx.font = '16px sans-serif';
    ctx.fillStyle = '#6366f1';
    ctx.fillText('Embedded Sample Image', 300, 225);

    const sampleBlob = await new Promise((res) => sampleCanvas.toBlob(res, 'image/jpeg', 0.9));
    const sampleBytes = new Uint8Array(await sampleBlob.arrayBuffer());

    // Generate valid raw minimal PDF containing the JPEG image stream
    const pdfBytes = createMinimalPdfWithImage(sampleBytes, 600, 400);
    const samplePdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
    const sampleFile = new File([samplePdfBlob], 'sample_presentation_images.pdf', { type: 'application/pdf' });

    handleFileSelection(sampleFile);
  }

  /**
   * Minimal PDF generator with embedded DCTDecode image XObject
   */
  function createMinimalPdfWithImage(jpgBytes, width, height) {
    const header = "%PDF-1.4\n";
    let obj1 = "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n";
    let obj2 = "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n";
    let obj3 = "3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /XObject << /Im1 5 0 R >> >> >>\nendobj\n";
    let contentStream = "q 500 0 0 333 56 300 cm /Im1 Do Q";
    let obj4 = `4 0 obj\n<< /Length ${contentStream.length} >>\nstream\n${contentStream}\nendstream\nendobj\n`;

    let obj5Head = `5 0 obj\n<< /Type /XObject /Subtype /Image /Width ${width} /Height ${height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpgBytes.length} >>\nstream\n`;
    let obj5Tail = "\nendstream\nendobj\n";

    const enc = new TextEncoder();
    const bHeader = enc.encode(header);
    const bObj1 = enc.encode(obj1);
    const bObj2 = enc.encode(obj2);
    const bObj3 = enc.encode(obj3);
    const bObj4 = enc.encode(obj4);
    const bObj5Head = enc.encode(obj5Head);
    const bObj5Tail = enc.encode(obj5Tail);

    const off1 = bHeader.length;
    const off2 = off1 + bObj1.length;
    const off3 = off2 + bObj2.length;
    const off4 = off3 + bObj3.length;
    const off5 = off4 + bObj4.length;
    const offXref = off5 + bObj5Head.length + jpgBytes.length + bObj5Tail.length;

    const xref = `xref\n0 6\n0000000000 65535 f \n${String(off1).padStart(10, '0')} 00000 n \n${String(off2).padStart(10, '0')} 00000 n \n${String(off3).padStart(10, '0')} 00000 n \n${String(off4).padStart(10, '0')} 00000 n \n${String(off5).padStart(10, '0')} 00000 n \n`;
    const trailer = `trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${offXref}\n%%EOF`;
    const bXref = enc.encode(xref + trailer);

    const totalLen = offXref + bXref.length;
    const fullPdf = new Uint8Array(totalLen);

    let p = 0;
    fullPdf.set(bHeader, p); p += bHeader.length;
    fullPdf.set(bObj1, p); p += bObj1.length;
    fullPdf.set(bObj2, p); p += bObj2.length;
    fullPdf.set(bObj3, p); p += bObj3.length;
    fullPdf.set(bObj4, p); p += bObj4.length;
    fullPdf.set(bObj5Head, p); p += bObj5Head.length;
    fullPdf.set(jpgBytes, p); p += jpgBytes.length;
    fullPdf.set(bObj5Tail, p); p += bObj5Tail.length;
    fullPdf.set(bXref, p);

    return fullPdf;
  }

  /**
   * Reset workspace to initial dropzone state
   */
  function resetWorkspace() {
    state.file = null;
    state.pdfDoc = null;
    state.images = [];
    fileInput.value = '';

    workspaceSection.classList.add('hidden');
    zeroStateCard.classList.add('hidden');
    dropzoneCard.classList.remove('hidden');
    imagesGrid.innerHTML = '';
  }

  /**
   * Progress Bar Helpers
   */
  function showProgress(percent, text) {
    progressBanner.classList.remove('hidden');
    progressPercentage.textContent = `${percent}%`;
    progressFill.style.width = `${percent}%`;
    if (text) {
      progressStatusText.querySelector('span').textContent = text;
    }
  }

  function hideProgress() {
    progressBanner.classList.add('hidden');
    progressFill.style.width = '0%';
  }

  /**
   * Toast notification helper
   */
  function showToast(msg, type = 'info') {
    if (toastTimeout) clearTimeout(toastTimeout);

    toastMessage.textContent = msg;
    toast.className = `toast toast-${type}`;

    if (toastIcon) {
      if (type === 'error') {
        toastIcon.setAttribute('data-lucide', 'alert-triangle');
      } else if (type === 'success') {
        toastIcon.setAttribute('data-lucide', 'check-circle-2');
      } else {
        toastIcon.setAttribute('data-lucide', 'info');
      }
      if (window.lucide) {
        window.lucide.createIcons();
      }
    }

    toast.classList.remove('hidden');
    toastTimeout = setTimeout(() => {
      toast.classList.add('hidden');
    }, 4000);
  }

  /**
   * Formatting Helpers
   */
  function formatBytes(bytes) {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  function sanitizeBaseName(filename) {
    return filename.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '_');
  }

  /**
   * i18n & Localization Engine
   */
  function t(key) {
    const lang = state.currentLang;
    if (translations[lang] && translations[lang][key]) {
      return translations[lang][key];
    }
    if (translations.en && translations.en[key]) {
      return translations.en[key];
    }
    return key;
  }

  function initI18n() {
    applyLanguage(state.currentLang);
  }

  function toggleLanguage() {
    state.currentLang = state.currentLang === 'en' ? 'ar' : 'en';
    localStorage.setItem('language', state.currentLang);
    applyLanguage(state.currentLang);
  }

  function applyLanguage(lang) {
    const isAr = lang === 'ar';
    document.documentElement.lang = lang;
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';

    if (langToggleText) {
      langToggleText.textContent = isAr ? 'English' : 'العربية';
    }

    // Apply translations to all DOM elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const translation = t(key);
      if (translation) {
        el.innerHTML = translation;
      }
    });

    // Re-render gallery with updated labels if images are present
    if (state.images.length > 0) {
      renderGallery();
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  /**
   * Cookie Consent Banner
   */
  function initCookieConsent() {
    const consent = localStorage.getItem('pdf_hub_cookie_consent');
    if (!consent && cookieBanner) {
      cookieBanner.classList.remove('hidden');
    }
    if (btnAcceptCookies) {
      btnAcceptCookies.addEventListener('click', () => {
        localStorage.setItem('pdf_hub_cookie_consent', 'accepted');
        if (cookieBanner) cookieBanner.classList.add('hidden');
      });
    }
  }

  // Export translations dictionary for test suite / master sync
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = translations;
  }

  // Execute on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
