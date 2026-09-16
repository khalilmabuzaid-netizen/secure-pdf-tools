/**
 * SplitPDF Pro - Client-Side PDF Page Extractor & Splitter
 * Utilizes: PDF-Lib (100% Client-Side Processing)
 * Full Bilingual English / Arabic (RTL) Support
 */

/* ==========================================================================
   1. Multi-Language (i18n) Dictionary & System
   ========================================================================== */
const translations = {
  en: {
    badge_client_side: "100% Client-Side",
    nav_home: "Home",
    nav_annotator: "Annotator",
    nav_merge: "Merge PDF",
    nav_compress: "Compress PDF",
    nav_reset: "Reset",
    hero_badge: "Local & Secure • 100% Client-Side Processing • No Cloud Uploads",
    hero_title: 'Extract & Split <span class="gradient-text">PDF Pages</span> Instantly',
    hero_subtitle: "Select individual pages or custom ranges to create a new organized document in seconds right inside your browser.",
    dropzone_title: "Drop your PDF file here",
    dropzone_subtitle: "Drag and drop a PDF file to begin extracting pages, or browse from your device",
    btn_browse: "Browse PDF File",
    btn_sample: "Try Sample PDF",
    feature_ranges: "Extract Custom Ranges (e.g. 1, 3-5)",
    feature_private: "Zero Server Uploads",
    feature_instant: "Instant Client-Side Extraction",
    btn_change_file: "Change File",
    label_pages_to_extract: "Pages to Extract",
    helper_pages_desc: "Separate pages with commas or ranges with hyphens",
    placeholder_page_range: "e.g. 1, 3-5, 8",
    presets_label: "Presets:",
    preset_all: "All Pages",
    preset_first: "First Page (1)",
    preset_last: "Last Page",
    preset_odd: "Odd Pages",
    preset_even: "Even Pages",
    preset_first_half: "First Half",
    status_enter_pages: "Enter page numbers to extract",
    status_zero_pages: "0 pages",
    label_output_filename: "Output File Name",
    placeholder_output_filename: "extracted_document",
    btn_cancel: "Cancel",
    btn_split_download: "Split & Download PDF",
    btn_executing_split: "Extracting Pages...",
    page_singular: "Page",
    pages_plural: "Pages",
    total_suffix: "Total",
    pages_prefix: "Pages: ",
    more_suffix: "more",
    invalid_badge: "Invalid",
    toast_valid_pdf: "Please select a valid PDF document.",
    toast_loaded: "PDF loaded: {n} pages available.",
    toast_error_parse: "Failed to parse PDF: ",
    toast_specify_pages: "Please enter at least one page number or range.",
    toast_success: "Successfully extracted and saved {n} page(s)!",
    toast_error_split: "Extraction failed: ",
    toast_sample_generating: "Generating interactive sample document...",
    toast_sample_error: "Error creating sample: "
  },
  ar: {
    badge_client_side: "محلي ١٠٠٪ في المتصفح",
    nav_home: "الرئيسية",
    nav_annotator: "محرر PDF",
    nav_merge: "دمج PDF",
    nav_compress: "ضغط PDF",
    nav_reset: "إعادة ضبط",
    hero_badge: "محلي وآمن • معالجة بالكامل داخل المتصفح • بدون رفع سحابي",
    hero_title: 'استخراج وتقسيم <span class="gradient-text">صفحات PDF</span> فوراً',
    hero_subtitle: "حدد صفحات فردية أو نطاقات مخصصة لإنشاء مستند جديد ومنظم خلال ثوانٍ مباشرة في متصفحك.",
    dropzone_title: "اسحب ملف PDF هنا",
    dropzone_subtitle: "اسحب وأفلت ملف PDF لبدء استخراج الصفحات، أو تصفح من جهازك",
    btn_browse: "استعراض ملف PDF",
    btn_sample: "تجربة نموذج جاهز",
    feature_ranges: "استخراج نطاقات مخصصة (مثال: 1, 3-5)",
    feature_private: "خصوصية تامة بدون رفع للسحابة",
    feature_instant: "استخراج فوري داخل المتصفح",
    btn_change_file: "تغيير الملف",
    label_pages_to_extract: "الصفحات المراد استخراجها",
    helper_pages_desc: "افصل بين الصفحات بفواصل أو النطاقات بشرطات",
    placeholder_page_range: "مثال: 1, 3-5, 8",
    presets_label: "خيارات سريعة:",
    preset_all: "كل الصفحات",
    preset_first: "الصفحة الأولى (1)",
    preset_last: "الصفحة الأخيرة",
    preset_odd: "الصفحات الفردية",
    preset_even: "الصفحات الزوجية",
    preset_first_half: "النصف الأول",
    status_enter_pages: "أدخل أرقام الصفحات المراد استخراجها",
    status_zero_pages: "٠ صفحات",
    label_output_filename: "اسم الملف الناتج",
    placeholder_output_filename: "extracted_document",
    btn_cancel: "إلغاء",
    btn_split_download: "تقسيم وتنزيل PDF",
    btn_executing_split: "جاري استخراج الصفحات...",
    page_singular: "صفحة",
    pages_plural: "صفحات",
    total_suffix: "إجمالي",
    pages_prefix: "الصفحات: ",
    more_suffix: "إضافية",
    invalid_badge: "غير صالح",
    toast_valid_pdf: "يرجى اختيار ملف PDF صالح.",
    toast_loaded: "تم تحميل المستند: {n} صفحات متاحة.",
    toast_error_parse: "فشل تحليل ملف PDF: ",
    toast_specify_pages: "يرجى إدخال رقم صفحة أو نطاق صالح.",
    toast_success: "تم استخراج وحفظ {n} صفحة بنجاح!",
    toast_error_split: "فشل الاستخراج: ",
    toast_sample_generating: "جاري إنشاء المستند النموذجي...",
    toast_sample_error: "فشل إنشاء النموذج: "
  }
};

let currentLang = 'en';

// Application State
let currentPdfBytes = null;
let currentFileName = "document.pdf";
let currentTotalPages = 0;
let isProcessing = false;

// DOM Elements
let dropzone = null;
let fileInput = null;
let configPanel = null;
let pageRangeInput = null;
let outputFilenameInput = null;
let btnExecuteSplit = null;
let btnExecuteText = null;
let btnSpinner = null;
let btnBrowseFile = null;
let btnLoadSample = null;
let btnChangeFile = null;
let btnCancelSplit = null;
let btnHeaderReset = null;
let btnLanguageToggle = null;
let langToggleText = null;
let fileNameDisplay = null;
let fileSizeDisplay = null;
let filePagesDisplay = null;
let statusText = null;
let statusBadge = null;
let statusIcon = null;
let toastEl = null;
let toastMsgEl = null;
let toastIconEl = null;

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  cacheDOMElements();
  bindEventListeners();
  applyLanguage(currentLang);

  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
});

function cacheDOMElements() {
  dropzone = document.getElementById('dropzone');
  fileInput = document.getElementById('pdf-file-input');
  configPanel = document.getElementById('config-panel');
  pageRangeInput = document.getElementById('page-range-input');
  outputFilenameInput = document.getElementById('output-filename');
  btnExecuteSplit = document.getElementById('btn-execute-split');
  btnExecuteText = document.getElementById('btn-execute-text');
  btnSpinner = document.getElementById('btn-spinner');
  btnBrowseFile = document.getElementById('btn-browse-file');
  btnLoadSample = document.getElementById('btn-load-sample');
  btnChangeFile = document.getElementById('btn-change-file');
  btnCancelSplit = document.getElementById('btn-cancel-split');
  btnHeaderReset = document.getElementById('btn-header-reset');
  btnLanguageToggle = document.getElementById('btn-language-toggle');
  langToggleText = document.getElementById('lang-toggle-text');
  fileNameDisplay = document.getElementById('file-name-display');
  fileSizeDisplay = document.getElementById('file-size-display');
  filePagesDisplay = document.getElementById('file-pages-display');
  statusText = document.getElementById('status-text');
  statusBadge = document.getElementById('status-badge');
  statusIcon = document.getElementById('status-icon');
  toastEl = document.getElementById('toast');
  toastMsgEl = document.getElementById('toast-message');
  toastIconEl = document.getElementById('toast-icon');
}

function bindEventListeners() {
  // Language Toggle Button Listener
  if (btnLanguageToggle) {
    btnLanguageToggle.addEventListener('click', toggleLanguage);
  }

  // File Upload Triggers
  if (btnBrowseFile && fileInput) {
    btnBrowseFile.addEventListener('click', () => fileInput.click());
  }

  if (dropzone && fileInput) {
    dropzone.addEventListener('click', (e) => {
      if (e.target.closest('button')) return;
      fileInput.click();
    });

    // Drag & Drop Handlers
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
        if (file && file.type === 'application/pdf') {
          handleFileSelected(file);
        } else {
          showToast(t('toast_valid_pdf'), "warning");
        }
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

  // Sample PDF Loader
  if (btnLoadSample) {
    btnLoadSample.addEventListener('click', () => loadSamplePDF());
  }

  // Change / Reset Handlers
  if (btnChangeFile) {
    btnChangeFile.addEventListener('click', () => {
      if (fileInput) fileInput.click();
    });
  }

  if (btnCancelSplit) {
    btnCancelSplit.addEventListener('click', resetWorkspace);
  }

  if (btnHeaderReset) {
    btnHeaderReset.addEventListener('click', resetWorkspace);
  }

  // Live Validation on Page Range Input
  if (pageRangeInput) {
    pageRangeInput.addEventListener('input', () => updateLiveValidation());
  }

  // Preset Helper Chips
  document.querySelectorAll('.preset-chip[data-preset]').forEach(chip => {
    chip.addEventListener('click', () => {
      const presetType = chip.getAttribute('data-preset');
      applyPreset(presetType);
    });
  });

  // Execute Split & Download Button
  if (btnExecuteSplit) {
    btnExecuteSplit.addEventListener('click', executeSplitAndDownload);
  }
}

/* ==========================================================================
   2. Internationalization (i18n) & Language Toggle
   ========================================================================== */
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

  // Set RTL or LTR document direction
  document.documentElement.dir = isAr ? 'rtl' : 'ltr';
  document.documentElement.lang = lang;

  // Toggle button label
  if (langToggleText) {
    langToggleText.textContent = isAr ? 'English' : 'العربية';
  }

  // Update static text elements with data-i18n
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

  // Update placeholders with data-i18n-placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const translation = t(key);
    if (translation) {
      el.placeholder = translation;
    }
  });

  // Re-render dynamic components if active
  if (currentTotalPages > 0) {
    updatePageCountDisplay();
    updateLiveValidation();
  }

  // Refresh Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function updatePageCountDisplay() {
  if (filePagesDisplay && currentTotalPages > 0) {
    const isAr = currentLang === 'ar';
    const pageWord = currentTotalPages === 1 ? t('page_singular') : t('pages_plural');
    const totalWord = t('total_suffix');
    filePagesDisplay.textContent = isAr
      ? `${currentTotalPages} ${pageWord} ${totalWord}`
      : `${currentTotalPages} ${pageWord} ${totalWord}`;
  }
}

/* ==========================================================================
   3. File Ingestion & Parsing
   ========================================================================== */
function handleFileSelected(file) {
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async function (e) {
    const rawBuffer = e.target.result;
    currentPdfBytes = new Uint8Array(rawBuffer);
    currentFileName = file.name || "document.pdf";
    await processLoadedPdfBytes(currentPdfBytes, currentFileName, file.size);
  };
  reader.readAsArrayBuffer(file);
}

async function processLoadedPdfBytes(bytes, filename, sizeBytes = null) {
  try {
    if (!window.PDFLib || !window.PDFLib.PDFDocument) {
      throw new Error("PDF processing engine is loading. Please try again.");
    }

    // Load PDF with PDF-Lib to get page count
    const pdfDoc = await PDFLib.PDFDocument.load(bytes, { ignoreEncryption: true });
    currentTotalPages = pdfDoc.getPageCount();

    if (currentTotalPages === 0) {
      throw new Error("The selected PDF has 0 pages or is corrupt.");
    }

    // Update UI
    if (fileNameDisplay) fileNameDisplay.textContent = filename;
    updatePageCountDisplay();

    if (fileSizeDisplay) {
      const sizeFormatted = sizeBytes ? formatBytes(sizeBytes) : formatBytes(bytes.byteLength);
      fileSizeDisplay.textContent = sizeFormatted;
    }

    // Propose default output filename
    if (outputFilenameInput) {
      const base = filename.replace(/\.pdf$/i, '');
      outputFilenameInput.value = `${base}_extracted`;
    }

    // Show Config Panel, Hide Dropzone
    if (dropzone) dropzone.classList.add('hidden');
    if (configPanel) configPanel.classList.remove('hidden');
    if (btnHeaderReset) btnHeaderReset.disabled = false;

    // Apply default range (e.g. all or 1-3)
    if (pageRangeInput) {
      pageRangeInput.value = currentTotalPages > 1 ? `1-${Math.min(currentTotalPages, 3)}` : "1";
      updateLiveValidation();
      pageRangeInput.focus();
    }

    showToast(t('toast_loaded', { n: currentTotalPages }), "success");
  } catch (err) {
    console.error("Error loading PDF document:", err);
    showToast(`${t('toast_error_parse')}${err.message}`, "error");
    resetWorkspace();
  }
}

/* ==========================================================================
   4. Page Range Parsing & Validation
   ========================================================================== */
/**
 * Parses user input strings like "1, 3-5, 8" into an array of 1-based page numbers.
 * Supports Arabic commas (،) and dashes (–, —).
 */
function parsePageRanges(inputStr, totalPages) {
  if (!inputStr || !inputStr.trim()) {
    throw new Error(t('toast_specify_pages'));
  }

  // Replace Arabic commas and standard delimiters
  const cleanStr = inputStr.replace(/،/g, ',').trim();
  const tokens = cleanStr.split(/[\s,]+/).filter(Boolean);

  const pageSet = new Set();
  const pageList = [];

  for (const token of tokens) {
    // Check for range patterns: "1-5", "1:5", "1..5", "1 to 5"
    const rangeMatch = token.match(/^(\d+)\s*(?:-|–|—|:|\.\.)\s*(\d+)$/i);

    if (rangeMatch) {
      const start = parseInt(rangeMatch[1], 10);
      const end = parseInt(rangeMatch[2], 10);

      if (isNaN(start) || isNaN(end)) {
        throw new Error(`Invalid range format: "${token}"`);
      }

      if (start < 1 || start > totalPages) {
        throw new Error(`Start page ${start} is out of bounds (1 - ${totalPages}).`);
      }

      if (end < 1 || end > totalPages) {
        throw new Error(`End page ${end} is out of bounds (1 - ${totalPages}).`);
      }

      const step = start <= end ? 1 : -1;
      for (let p = start; start <= end ? p <= end : p >= end; p += step) {
        if (!pageSet.has(p)) {
          pageSet.add(p);
          pageList.push(p);
        }
      }
    } else if (/^\d+$/.test(token)) {
      const pageNum = parseInt(token, 10);
      if (isNaN(pageNum)) {
        throw new Error(`Invalid number: "${token}"`);
      }

      if (pageNum < 1 || pageNum > totalPages) {
        throw new Error(`Page ${pageNum} is out of range (1 - ${totalPages}).`);
      }

      if (!pageSet.has(pageNum)) {
        pageSet.add(pageNum);
        pageList.push(pageNum);
      }
    } else {
      throw new Error(`Unrecognized pattern "${token}". Use format like "1, 3-5, 8".`);
    }
  }

  if (pageList.length === 0) {
    throw new Error("No valid pages were specified.");
  }

  return pageList;
}

function updateLiveValidation() {
  if (!pageRangeInput || currentTotalPages === 0) return;

  const raw = pageRangeInput.value;
  if (!raw.trim()) {
    setValidationUI("neutral", t('status_enter_pages'), t('status_zero_pages'));
    return;
  }

  try {
    const pages = parsePageRanges(raw, currentTotalPages);
    const prefix = t('pages_prefix');
    const summary = pages.length > 8
      ? `${prefix}${pages.slice(0, 6).join(', ')}... (+${pages.length - 6} ${t('more_suffix')})`
      : `${prefix}${pages.join(', ')}`;

    const pageUnit = pages.length === 1 ? t('page_singular') : t('pages_plural');
    setValidationUI("valid", summary, `${pages.length} ${pageUnit}`);
    if (btnExecuteSplit) btnExecuteSplit.disabled = false;
  } catch (err) {
    setValidationUI("invalid", err.message, t('invalid_badge'));
    if (btnExecuteSplit) btnExecuteSplit.disabled = true;
  }
}

function setValidationUI(state, message, badgeText) {
  if (!statusText || !statusBadge || !statusIcon) return;

  statusText.textContent = message;
  statusBadge.textContent = badgeText;

  if (state === "valid") {
    statusText.style.color = "var(--text-primary)";
    statusBadge.style.color = "#34d399";
    statusIcon.setAttribute('data-lucide', 'check-circle-2');
    statusIcon.style.color = "var(--accent-emerald)";
  } else if (state === "invalid") {
    statusText.style.color = "#fda4af";
    statusBadge.style.color = "#fb7185";
    statusIcon.setAttribute('data-lucide', 'alert-circle');
    statusIcon.style.color = "var(--accent-rose)";
  } else {
    statusText.style.color = "var(--text-secondary)";
    statusBadge.style.color = "var(--text-muted)";
    statusIcon.setAttribute('data-lucide', 'info');
    statusIcon.style.color = "var(--text-secondary)";
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function applyPreset(presetType) {
  if (!pageRangeInput || currentTotalPages === 0) return;

  let val = "";
  switch (presetType) {
    case 'all':
      val = currentTotalPages === 1 ? "1" : `1-${currentTotalPages}`;
      break;
    case 'first':
      val = "1";
      break;
    case 'last':
      val = `${currentTotalPages}`;
      break;
    case 'odd': {
      const odds = [];
      for (let i = 1; i <= currentTotalPages; i += 2) odds.push(i);
      val = odds.join(', ');
      break;
    }
    case 'even': {
      const evens = [];
      for (let i = 2; i <= currentTotalPages; i += 2) evens.push(i);
      val = evens.length > 0 ? evens.join(', ') : "1";
      break;
    }
    case 'first-half': {
      const half = Math.max(1, Math.ceil(currentTotalPages / 2));
      val = half === 1 ? "1" : `1-${half}`;
      break;
    }
    default:
      val = "1";
  }

  pageRangeInput.value = val;
  updateLiveValidation();
  pageRangeInput.focus();
}

/* ==========================================================================
   5. Core Extraction & Splitting Execution with PDF-Lib
   ========================================================================== */
async function executeSplitAndDownload() {
  if (isProcessing) return;

  if (!currentPdfBytes || currentTotalPages === 0) {
    showToast(t('toast_no_pdf'), "warning");
    return;
  }

  const rawInput = pageRangeInput ? pageRangeInput.value : '';
  let pageNumbers = [];

  try {
    pageNumbers = parsePageRanges(rawInput, currentTotalPages);
  } catch (err) {
    showToast(err.message, "error");
    if (pageRangeInput) pageRangeInput.focus();
    return;
  }

  setSplittingState(true);

  try {
    // 1. Load source document in PDF-Lib
    const srcDoc = await PDFLib.PDFDocument.load(currentPdfBytes, { ignoreEncryption: true });

    // 2. Create target new document
    const newDoc = await PDFLib.PDFDocument.create();

    // 3. Convert 1-based page numbers to 0-based page indices
    const pageIndices = pageNumbers.map(n => n - 1);

    // 4. Copy pages from original document to new document
    const copiedPages = await newDoc.copyPages(srcDoc, pageIndices);
    copiedPages.forEach(page => newDoc.addPage(page));

    // 5. Save generated PDF bytes
    const outputPdfBytes = await newDoc.save();

    // 6. Output filename resolution
    let outName = outputFilenameInput?.value?.trim() || "extracted_document";
    if (!outName.toLowerCase().endsWith('.pdf')) {
      outName += '.pdf';
    }

    // 7. Trigger Direct Client-Side Download
    const blob = new Blob([outputPdfBytes], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = outName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(blobUrl), 15000);

    showToast(t('toast_success', { n: pageNumbers.length }), "success");
  } catch (err) {
    console.error("PDF Extraction failed:", err);
    showToast(`${t('toast_error_split')}${err.message}`, "error");
  } finally {
    setSplittingState(false);
  }
}

function setSplittingState(active) {
  isProcessing = active;
  if (!btnExecuteSplit) return;

  btnExecuteSplit.disabled = active;
  if (btnSpinner) btnSpinner.classList.toggle('hidden', !active);
  if (btnExecuteText) {
    btnExecuteText.textContent = active ? t('btn_executing_split') : t('btn_split_download');
  }
}

/* ==========================================================================
   6. Interactive Sample Generator (Instant Testing)
   ========================================================================== */
async function loadSamplePDF() {
  try {
    showToast(t('toast_sample_generating'), "info");

    const sampleDoc = await PDFLib.PDFDocument.create();
    const timesRomanFont = await sampleDoc.embedFont(PDFLib.StandardFonts.HelveticaBold);
    const bodyFont = await sampleDoc.embedFont(PDFLib.StandardFonts.Helvetica);

    const colors = [
      { r: 0.38, g: 0.40, b: 0.94 }, // Indigo
      { r: 0.95, g: 0.24, b: 0.36 }, // Rose
      { r: 0.06, g: 0.72, b: 0.50 }, // Emerald
      { r: 0.96, g: 0.62, b: 0.04 }, // Amber
      { r: 0.02, g: 0.71, b: 0.83 }  // Cyan
    ];

    const pageDescriptions = [
      "Page 1: Executive Summary & Project Introduction",
      "Page 2: Architecture Design & Data Flow Diagrams",
      "Page 3: Performance Benchmarks & Metrics Analysis",
      "Page 4: Security Protocols & Zero-Knowledge Architecture",
      "Page 5: Appendix, References & Export Manifest"
    ];

    for (let i = 0; i < 5; i++) {
      const page = sampleDoc.addPage([595.28, 841.89]); // A4 Size
      const { width, height } = page.getSize();
      const accent = colors[i];

      // Top colored bar
      page.drawRectangle({
        x: 0,
        y: height - 12,
        width: width,
        height: 12,
        color: PDFLib.rgb(accent.r, accent.g, accent.b)
      });

      // Header Brand
      page.drawText("AnnotatePDF Pro • Document Suite", {
        x: 50,
        y: height - 60,
        size: 13,
        font: timesRomanFont,
        color: PDFLib.rgb(0.4, 0.45, 0.55)
      });

      // Page Title
      page.drawText(pageDescriptions[i], {
        x: 50,
        y: height - 105,
        size: 20,
        font: timesRomanFont,
        color: PDFLib.rgb(0.08, 0.12, 0.2)
      });

      // Decorative Card Box
      page.drawRectangle({
        x: 50,
        y: height - 320,
        width: width - 100,
        height: 180,
        color: PDFLib.rgb(0.96, 0.97, 0.99),
        borderColor: PDFLib.rgb(accent.r, accent.g, accent.b),
        borderWidth: 1.5
      });

      // Sample Body Text
      page.drawText(`Interactive Sample Page #${i + 1}`, {
        x: 75,
        y: height - 170,
        size: 15,
        font: timesRomanFont,
        color: PDFLib.rgb(accent.r, accent.g, accent.b)
      });

      page.drawText("This page was generated completely client-side in your browser using PDF-Lib.", {
        x: 75,
        y: height - 205,
        size: 11,
        font: bodyFont,
        color: PDFLib.rgb(0.2, 0.25, 0.3)
      });

      page.drawText("You can test extracting any combination of pages (e.g., '1, 3-5' or '2, 4').", {
        x: 75,
        y: height - 230,
        size: 11,
        font: bodyFont,
        color: PDFLib.rgb(0.3, 0.35, 0.4)
      });

      page.drawText("Zero server uploads. 100% private, instant, and secure.", {
        x: 75,
        y: height - 255,
        size: 11,
        font: timesRomanFont,
        color: PDFLib.rgb(0.1, 0.65, 0.4)
      });

      // Footer
      page.drawText(`Page ${i + 1} of 5`, {
        x: width - 120,
        y: 40,
        size: 10,
        font: bodyFont,
        color: PDFLib.rgb(0.5, 0.55, 0.6)
      });
    }

    const sampleBytes = await sampleDoc.save();
    currentPdfBytes = sampleBytes;
    currentFileName = "sample_suite_5pages.pdf";
    await processLoadedPdfBytes(sampleBytes, currentFileName);
  } catch (err) {
    console.error("Failed to generate sample PDF:", err);
    showToast(`${t('toast_sample_error')}${err.message}`, "error");
  }
}

/* ==========================================================================
   7. Reset & Helpers
   ========================================================================== */
function resetWorkspace() {
  currentPdfBytes = null;
  currentFileName = "document.pdf";
  currentTotalPages = 0;
  isProcessing = false;

  if (fileInput) fileInput.value = '';
  if (pageRangeInput) pageRangeInput.value = '';
  if (configPanel) configPanel.classList.add('hidden');
  if (dropzone) dropzone.classList.remove('hidden');
  if (btnHeaderReset) btnHeaderReset.disabled = true;

  setValidationUI("neutral", t('status_enter_pages'), t('status_zero_pages'));
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
  }, 3600);
}
