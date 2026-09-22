/**
 * PDFNetizen - Crop PDF Tool Engine
 * 100% Client-Side In-Browser PDF Visual Margin Trimming & Boundary Cropping
 */

// Configure PDF.js Worker
if (typeof pdfjsLib !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
}

// Global Application State
const state = {
  currentLang: localStorage.getItem('pdfnetizen_lang') || 'en',
  currentFile: null,
  croppedPdfBytes: null,
  croppedBlobUrl: null,
  currentPage: 1,
  totalPages: 1,
  activeUnit: 'pt', // 'pt' | 'mm'
  cropScope: 'all', // 'all' | 'current'
  pageDimensions: { width: 612, height: 792 }, // in points
  cropBox: { left: 0, top: 0, width: 0, height: 0 }, // in display CSS pixels
  isDragging: false,
  dragMode: null, // 'move' | 'nw' | 'ne' | 'se' | 'sw' | 'n' | 's' | 'e' | 'w'
  dragStart: { x: 0, y: 0 },
  cropBoxStart: { left: 0, top: 0, width: 0, height: 0 },
  isProcessing: false
};

// Conversion constants
const PT_TO_MM = 0.352778;
const MM_TO_PT = 2.83465;

// Bilingual Localization Dictionary
const i18n = {
  en: {
    nav_badge: "Crop PDF",
    badge_client_side: "100% Client-Side",
    nav_home: "Home",
    nav_annotator: "Annotator",
    nav_compress: "Compress PDF",
    nav_split: "Split PDF",
    btn_reset: "Reset",
    nav_all_tools: "All Tools",
    breadcrumb_home: "Home",
    breadcrumb_tools: "Tools",
    breadcrumb_current: "Crop PDF",
    hero_badge: "100% Client-Side In-Browser Security",
    hero_title: "Crop PDF & Trim Margins Online",
    hero_desc: "Visually select and trim unwanted white borders, header/footer margins, or scan edges with lossless vector precision directly in your browser.",
    dropzone_title: "Choose a PDF or Drag & Drop Here",
    dropzone_subtitle: "Supports documents, presentations, scanned receipts, papers, and books",
    btn_browse: "Select PDF File",
    btn_sample: "Try Sample Document",
    dropzone_hint: "🔒 100% private: Files never leave your browser or get uploaded to any server.",
    btn_change_file: "Change File",
    label_page: "Page",
    margins_title: "Margin Trimming",
    preset_auto: "Auto Trim Margins",
    preset_reset: "Reset Full Page",
    margin_top: "Top Margin:",
    margin_bottom: "Bottom Margin:",
    margin_left: "Left Margin:",
    margin_right: "Right Margin:",
    scope_title: "Apply Crop Scope",
    scope_all: "Apply crop to All Pages (Consistent margins)",
    scope_current: "Apply to Current Page Only",
    label_output_filename: "Output File Name:",
    btn_crop_now: "Crop PDF & Save",
    progress_cropping: "Cropping PDF pages...",
    success_title: "PDF Cropped Successfully!",
    success_subtitle: "Unwanted page margins and borders have been trimmed losslessly while preserving full vector sharpness.",
    btn_download_pdf: "Download Cropped PDF",
    btn_crop_another: "Crop Another Document",
    how_it_works_title: "How to Crop a PDF Document",
    how_it_works_desc: "Three simple steps to trim margins and remove unwanted PDF borders.",
    step1_title: "Upload Your PDF",
    step1_desc: "Drag and drop your PDF document or book into the browser workspace.",
    step2_title: "Adjust Visual Crop Box",
    step2_desc: "Drag and resize the crop selection handles or type exact margin numbers in points or mm.",
    step3_title: "Download Cropped PDF",
    step3_desc: "Click Crop & Save to instantly download your perfectly trimmed, vector-sharp PDF.",
    why_crop_title: "Why Crop Your PDF Files?",
    why_crop_desc: "Optimize presentation, reading comfort on tablets and e-readers, and eliminate scanner margins.",
    feat1_title: "Optimized for Tablets & E-Readers",
    feat1_desc: "Eliminate large blank page borders to make text larger and much easier to read on Kindle, iPad, and mobile screens.",
    feat2_title: "Lossless Vector Precision",
    feat2_desc: "Cropping sets native PDF boundary boxes without rasterizing text or re-encoding graphics, preserving 100% original quality.",
    feat3_title: "Cut Scanner Black Edges",
    feat3_desc: "Clean up dark borders, punch holes, and crooked scanning shadows on scanned receipts, book pages, and agreements.",
    feat4_title: "100% Client-Side Privacy",
    feat4_desc: "Your confidential documents remain strictly inside your browser memory. Zero files are uploaded to remote servers.",
    faq_title: "Frequently Asked Questions",
    faq_desc: "Everything you need to know about PDF cropping, margins, and resolution.",
    faq_q1: "Does cropping a PDF delete text or reduce quality?",
    faq_a1: "No. Cropping modifies the document view boundaries (CropBox and MediaBox) so that PDF readers render only the cropped region. All underlying vector text and original high-resolution elements remain intact and completely sharp.",
    faq_q2: "Can I apply the same crop to all pages of a book or report?",
    faq_a2: "Yes. By selecting 'Apply crop to All Pages', the exact margin proportions you configure will be applied consistently across every page in the document in a single click.",
    faq_q3: "Can I crop only a single specific page?",
    faq_a3: "Yes. Navigate to the desired page using the page navigation bar and select 'Apply to Current Page Only' before saving.",
    faq_q4: "Are my uploaded documents secure and private?",
    faq_a4: "Yes, 100%. All processing runs locally inside your browser memory using PDF.js and PDF-Lib. Your files never touch external servers or cloud databases.",
    faq_q5: "How do points (pt) convert to millimeters (mm)?",
    faq_a5: "Standard PDF points are 1/72 of an inch (approx. 0.3528 mm). You can use our unit switcher to work effortlessly in either points or millimeters.",
    footer_all_tools: "All PDF Tools",
    footer_image_cropper: "Image Cropper",
    footer_flatten: "Flatten PDF",
    footer_page_numbers: "Page Numbers",
    footer_excel: "Excel to PDF",
    footer_unlock: "Unlock PDF",
    footer_copy: "© 2026 PDFNetizen. Free, Private, Client-Side PDF Utilities.",
    footer_privacy: "Privacy Policy",
    footer_terms: "Terms of Service",
    cookie_text: "We use anonymous local storage and analytics cookies to optimize performance and enhance your experience. No personal document data is ever stored.",
    cookie_accept: "Got it",
    toast_loaded: "PDF document loaded successfully!",
    toast_sample_ready: "Sample PDF created and loaded!",
    toast_crop_complete: "PDF cropped and ready for download!",
    toast_error_load: "Failed to read PDF file. Please try another document.",
    toast_error_crop: "Error during PDF cropping. Please try again.",
    page_total_of: "of {total}"
  },
  ar: {
    nav_badge: "قص وتحديد PDF",
    badge_client_side: "محلي ١٠٠٪ في المتصفح",
    nav_home: "الرئيسية",
    nav_annotator: "المحرر",
    nav_compress: "ضغط PDF",
    nav_split: "تقسيم PDF",
    btn_reset: "إعادة ضبط",
    nav_all_tools: "كافة الأدوات",
    breadcrumb_home: "الرئيسية",
    breadcrumb_tools: "الأدوات",
    breadcrumb_current: "قص صفحات PDF",
    hero_badge: "أمان كامل 100% داخل المتصفح محلياً",
    hero_title: "قص وتحديد هوامش صفحات PDF",
    hero_desc: "حدد بصرياً وقص الهوامش البيضاء الزائدة، ترويسات وتذييلات الصفحات، وحواف المستندات الممسوحة بدقة متجهية تامة دون فقدان الجودة.",
    dropzone_title: "اختر ملف PDF أو اسحبه وأفلته هنا",
    dropzone_subtitle: "يدعم المستندات، الكتب، الإيصالات الممسوحة، الأوراق البحثية، والعروض",
    btn_browse: "اختيار ملف PDF",
    btn_sample: "تجربة مستند تجريبي",
    dropzone_hint: "🔒 أمان تام 100%: تتم المعالجة بالكامل داخل متصفحك دون رفع الملفات إلى أي خادم.",
    btn_change_file: "تغيير الملف",
    label_page: "الصفحة",
    margins_title: "تحديد وقص الهوامش",
    preset_auto: "قص الهوامش التلقائي",
    preset_reset: "إعادة ضبط الصفحة كاملة",
    margin_top: "الهامش العلوي:",
    margin_bottom: "الهامش السفلي:",
    margin_left: "الهامش الأيسر:",
    margin_right: "الهامش الأيمن:",
    scope_title: "نطاق تطبيق القص",
    scope_all: "تطبيق القص على كافة الصفحات (هوامش متطابقة)",
    scope_current: "تطبيق على الصفحة الحالية فقط",
    label_output_filename: "اسم الملف الناتج:",
    btn_crop_now: "قص المستند وحفظ PDF",
    progress_cropping: "جاري قص صفحات المستند...",
    success_title: "تم قص مستند PDF بنجاح!",
    success_subtitle: "تم اقتطاع الهوامش البيضاء والحواف الزائدة بنجاح مع الحفاظ الكامل على دقة النصوص المتجهية الأصلية.",
    btn_download_pdf: "تحميل ملف PDF المقصوص",
    btn_crop_another: "قص مستند آخر",
    how_it_works_title: "كيفية قص وتحديد مستند PDF",
    how_it_works_desc: "ثلاث خطوات بسيطة لضبط الهوامش وإزالة الحواف البيضاء من أي مستند.",
    step1_title: "ارفع ملف PDF",
    step1_desc: "اسحب وأفلت مستند PDF أو الكتاب في مساحة المعالجة الآمنة بالمتصفح.",
    step2_title: "اضبط مربع القص بصرياً",
    step2_desc: "اسحب مقابض القص المباشرة أو اكتب قيم الهوامش الدقيقة بالنقاط (pt) أو بالملم (mm).",
    step3_title: "حمّل المستند المقصوص",
    step3_desc: "انقر على زر القص وحمّل فوراً ملف PDF المنسق بأعلى درجات الوضوح والحدة.",
    why_crop_title: "لماذا تقوم بقص ملفات PDF؟",
    why_crop_desc: "تحسين راحة القراءة على الأجهزة اللوحية وتكبير النصوص وإزالة سواد الماسح الضوئي.",
    feat1_title: "مثالي للأجهزة اللوحية والقارئات",
    feat1_desc: "تخلص من الهوامش البيضاء الكبيرة لتكبير مساحة النصوص وتسهيل قراءتها على أجهزة كيندل والآيباد والهواتف.",
    feat2_title: "دقة متجهية بدون فقدان الجودة",
    feat2_desc: "يعدل إحداثيات وحدود الصفحة الأصلية دون تحويل النصوص إلى صور، مما يحافظ على نقاء 100% للخطوط.",
    feat3_title: "إزالة سواد وتظليل الماسح الضوئي",
    feat3_desc: "قص الحواف السوداء وثقوب الأوراق والظلال الناتجة عن المسح الضوئي للكتب والمستندات.",
    feat4_title: "خصوصية كاملة 100%",
    feat4_desc: "تتم جميع العمليات داخل ذاكرة متصفحك محلياً دون إرسال أي بايت لخوادم خارجية.",
    faq_title: "الأسئلة الشائعة",
    faq_desc: "كل ما تحتاج معرفته حول قص ملفات PDF وضبط الهوامش والوحدات.",
    faq_q1: "هل يؤدي قص PDF إلى حذف النصوص أو تقليل الجودة؟",
    faq_a1: "لا. يقوم القص بتعديل صندوق عرض المستند (CropBox و MediaBox) ليظهر الجزء المحدد فقط، مع بقاء كافة النصوص والصور الأصلية محتفظة بكامل وضوحها وجودتها العالية.",
    faq_q2: "هل يمكنني تطبيق نفس القص على جميع صفحات الكتاب أو التقرير؟",
    faq_a2: "نعم. باختيار 'تطبيق القص على كافة الصفحات'، يتم اقتطاع نفس الهوامش بالضبط من كافة صفحات المستند بنقرة واحدة.",
    faq_q3: "هل يمكنني قص صفحة واحدة محددة فقط؟",
    faq_a3: "نعم. انتقل إلى الصفحة المطلوبة عبر شريط التنقل واختر 'تطبيق على الصفحة الحالية فقط' قبل الحفظ.",
    faq_q4: "هل مستنداتي الحساسة آمنة؟",
    faq_a4: "نعم 100%. تتم جميع العمليات محلياً داخل متصفحك دون رفع الملفات إلى أي خادم خارجي.",
    faq_q5: "كيف يتم التحويل بين النقاط (pt) والملم (mm)؟",
    faq_a5: "نقطة PDF الواحدة تعادل 1/72 من البوصة (حوالي 0.3528 ملم). يمكنك التبديل بسهولة بين الوحدتين عبر زر التبديل المدمج.",
    footer_all_tools: "كافة أدوات PDF",
    footer_image_cropper: "قص وتعديل الصور",
    footer_flatten: "تسطيح PDF",
    footer_page_numbers: "ترقيم الصفحات",
    footer_excel: "تحويل Excel إلى PDF",
    footer_unlock: "فك قفل PDF",
    footer_copy: "© 2026 PDFNetizen. أدوات PDF مجانية، خاصة وتعمل محلياً.",
    footer_privacy: "سياسة الخصوصية",
    footer_terms: "شروط الاستخدام",
    cookie_text: "نستخدم التخزين المحلي وملفات تعريف الارتباط التحليلية المجهولة لتعزيز الأداء وتجربة الاستخدام. لا يتم حفظ أو نقل بيانات المستندات نهائياً.",
    cookie_accept: "موافق",
    toast_loaded: "تم تحميل مستند PDF بنجاح!",
    toast_sample_ready: "تم إنشاء وتحميل المستند التجريبي!",
    toast_crop_complete: "تم قص المستند وجاهز للتحميل!",
    toast_error_load: "تعذر قراءة ملف PDF. يرجى تجربة مستند آخر.",
    toast_error_crop: "حدث خطأ أثناء قص المستند. يرجى المحاولة ثانية.",
    page_total_of: "من {total}"
  }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  initLucideIcons();
  initI18n();
  initEventListeners();
  initCropperDragListeners();
  initFaqAccordion();
  initCookieBanner();
});

function initLucideIcons() {
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }
}

// Internationalization
function initI18n() {
  applyLanguage(state.currentLang);
  const langToggleBtn = document.getElementById('langToggleBtn');
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      const newLang = state.currentLang === 'en' ? 'ar' : 'en';
      applyLanguage(newLang);
    });
  }
}

function applyLanguage(lang) {
  state.currentLang = lang;
  localStorage.setItem('pdfnetizen_lang', lang);
  const isRtl = lang === 'ar';
  document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  document.documentElement.lang = lang;

  const langLabel = document.getElementById('langLabel');
  if (langLabel) {
    langLabel.textContent = isRtl ? 'English' : 'العربية';
  }

  const dict = i18n[lang] || i18n.en;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  if (state.currentFile) {
    updateMetadataDisplay();
    updatePageNavDisplay();
  }

  initLucideIcons();
}

function t(key, replacements = {}) {
  const dict = i18n[state.currentLang] || i18n.en;
  let text = dict[key] || i18n.en[key] || key;
  for (const [k, v] of Object.entries(replacements)) {
    text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
  }
  return text;
}

// Toast Notifications
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  
  let iconName = 'info';
  let iconColor = '#fb7185';
  if (type === 'success') {
    iconName = 'check-circle-2';
    iconColor = '#34d399';
  } else if (type === 'error') {
    iconName = 'alert-circle';
    iconColor = '#f43f5e';
  }

  toast.innerHTML = `
    <i data-lucide="${iconName}" style="width: 16px; height: 16px; color: ${iconColor};"></i>
    <span>${message}</span>
  `;
  container.appendChild(toast);
  initLucideIcons();

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px) scale(0.95)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Event Listeners
function initEventListeners() {
  const dropzone = document.getElementById('dropzone');
  const fileInput = document.getElementById('fileInput');
  const browseBtn = document.getElementById('browseBtn');
  const samplePdfBtn = document.getElementById('samplePdfBtn');
  const changeFileBtn = document.getElementById('changeFileBtn');
  const resetWorkspaceBtn = document.getElementById('resetWorkspaceBtn');
  const prevPageBtn = document.getElementById('prevPageBtn');
  const nextPageBtn = document.getElementById('nextPageBtn');
  const pageJumpInput = document.getElementById('pageJumpInput');
  const unitPtBtn = document.getElementById('unitPtBtn');
  const unitMmBtn = document.getElementById('unitMmBtn');
  const cropBtn = document.getElementById('cropBtn');
  const downloadPdfBtn = document.getElementById('downloadPdfBtn');
  const cropAnotherBtn = document.getElementById('cropAnotherBtn');

  // Drag & Drop
  if (dropzone && fileInput) {
    dropzone.addEventListener('click', (e) => {
      if (e.target.closest('button')) return;
      fileInput.click();
    });

    if (browseBtn) {
      browseBtn.addEventListener('click', () => fileInput.click());
    }

    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files.length > 0) {
        handleFileSelect(e.target.files[0]);
      }
    });

    ['dragenter', 'dragover'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.add('dragover');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.remove('dragover');
      });
    });

    dropzone.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      if (dt && dt.files && dt.files.length > 0) {
        const file = dt.files[0];
        if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
          handleFileSelect(file);
        } else {
          showToast(t('toast_error_load'), 'error');
        }
      }
    });
  }

  // Sample PDF Button
  if (samplePdfBtn) {
    samplePdfBtn.addEventListener('click', loadSamplePdfDocument);
  }

  // Change File & Reset
  if (changeFileBtn) {
    changeFileBtn.addEventListener('click', () => fileInput && fileInput.click());
  }

  if (resetWorkspaceBtn) {
    resetWorkspaceBtn.addEventListener('click', resetWorkspace);
  }

  // Page Navigation
  if (prevPageBtn) {
    prevPageBtn.addEventListener('click', () => {
      if (state.currentPage > 1) {
        state.currentPage--;
        renderCurrentPage();
      }
    });
  }

  if (nextPageBtn) {
    nextPageBtn.addEventListener('click', () => {
      if (state.currentPage < state.totalPages) {
        state.currentPage++;
        renderCurrentPage();
      }
    });
  }

  if (pageJumpInput) {
    pageJumpInput.addEventListener('change', (e) => {
      let pageNum = parseInt(e.target.value, 10);
      if (isNaN(pageNum) || pageNum < 1) pageNum = 1;
      if (pageNum > state.totalPages) pageNum = state.totalPages;
      state.currentPage = pageNum;
      renderCurrentPage();
    });
  }

  // Units Toggle (pt vs mm)
  if (unitPtBtn && unitMmBtn) {
    unitPtBtn.addEventListener('click', () => setUnit('pt'));
    unitMmBtn.addEventListener('click', () => setUnit('mm'));
  }

  // Margin Inputs Handlers (Bi-directional sync)
  ['marginTopInput', 'marginBottomInput', 'marginLeftInput', 'marginRightInput'].forEach(id => {
    const input = document.getElementById(id);
    if (input) {
      input.addEventListener('input', updateCropBoxFromMarginInputs);
    }
  });

  // Presets
  const presetAutoTrim = document.getElementById('presetAutoTrim');
  const preset10Pct = document.getElementById('preset10Pct');
  const preset5Pct = document.getElementById('preset5Pct');
  const presetReset = document.getElementById('presetReset');

  if (presetAutoTrim) presetAutoTrim.addEventListener('click', () => applyMarginPreset(0.08, 0.08, 0.08, 0.08));
  if (preset10Pct) preset10Pct.addEventListener('click', () => applyMarginPreset(0.10, 0.10, 0.10, 0.10));
  if (preset5Pct) preset5Pct.addEventListener('click', () => applyMarginPreset(0.05, 0.05, 0.05, 0.05));
  if (presetReset) presetReset.addEventListener('click', () => applyMarginPreset(0, 0, 0, 0));

  // Scope Radios
  document.querySelectorAll('input[name="cropScope"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      state.cropScope = e.target.value;
    });
  });

  // Action Buttons
  if (cropBtn) cropBtn.addEventListener('click', executePdfCropping);
  if (downloadPdfBtn) downloadPdfBtn.addEventListener('click', triggerDownload);
  if (cropAnotherBtn) cropAnotherBtn.addEventListener('click', resetWorkspace);
}

// Unit Switcher
function setUnit(unit) {
  if (state.activeUnit === unit) return;
  state.activeUnit = unit;

  const unitPtBtn = document.getElementById('unitPtBtn');
  const unitMmBtn = document.getElementById('unitMmBtn');
  if (unit === 'pt') {
    unitPtBtn?.classList.add('active');
    unitMmBtn?.classList.remove('active');
  } else {
    unitMmBtn?.classList.add('active');
    unitPtBtn?.classList.remove('active');
  }

  document.querySelectorAll('.unit-label').forEach(el => {
    el.textContent = unit;
  });

  // Refresh margin input numbers with newly selected unit
  updateMarginInputsFromCropBox();
}

// File Selection Handler
async function handleFileSelect(file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    await processAndLoadPdf(bytes, file.name, file.size);
    showToast(t('toast_loaded'), 'success');
  } catch (err) {
    console.error('Failed to load PDF file:', err);
    showToast(t('toast_error_load'), 'error');
  }
}

// Process & Load PDF Document
async function processAndLoadPdf(bytes, fileName, fileSize) {
  let pdfLibDoc;
  let totalPages = 1;

  try {
    pdfLibDoc = await PDFLib.PDFDocument.load(bytes.slice(0), { ignoreEncryption: true });
    totalPages = pdfLibDoc.getPageCount();
  } catch (e) {
    console.warn('PDF-Lib parse warning:', e);
  }

  const pdfJsDoc = await pdfjsLib.getDocument({ data: bytes.slice() }).promise;
  totalPages = pdfJsDoc.numPages;

  state.currentFile = {
    name: fileName,
    size: fileSize,
    bytes: bytes,
    pdfLibDoc: pdfLibDoc,
    pdfJsDoc: pdfJsDoc
  };
  state.totalPages = totalPages;
  state.currentPage = 1;

  // Show Workspace UI
  const dropzone = document.getElementById('dropzone');
  const workspacePanel = document.getElementById('workspacePanel');
  const resetWorkspaceBtn = document.getElementById('resetWorkspaceBtn');
  const successCard = document.getElementById('successCard');
  const progressContainer = document.getElementById('progressContainer');
  const outputFilenameInput = document.getElementById('outputFilenameInput');

  if (dropzone) dropzone.style.display = 'none';
  if (workspacePanel) workspacePanel.style.display = 'flex';
  if (resetWorkspaceBtn) resetWorkspaceBtn.style.display = 'inline-flex';
  if (successCard) successCard.style.display = 'none';
  if (progressContainer) progressContainer.style.display = 'none';

  if (outputFilenameInput) {
    const baseName = fileName.replace(/\.pdf$/i, '');
    outputFilenameInput.value = `${baseName}-cropped.pdf`;
  }

  // Render Page & Initialize Crop Overlay
  await renderCurrentPage(true);
  updateMetadataDisplay();
  updatePageNavDisplay();
  initLucideIcons();
}

function updateMetadataDisplay() {
  if (!state.currentFile) return;

  const metaFileName = document.getElementById('metaFileName');
  const metaFileSize = document.getElementById('metaFileSize');
  const metaPageCount = document.getElementById('metaPageCount');
  const metaDimensions = document.getElementById('metaDimensions');

  if (metaFileName) {
    metaFileName.textContent = state.currentFile.name;
    metaFileName.title = state.currentFile.name;
  }

  if (metaFileSize) {
    metaFileSize.textContent = formatBytes(state.currentFile.size);
  }

  if (metaPageCount) {
    const p = state.totalPages;
    metaPageCount.textContent = p === 1 ? "1 Page" : `${p} Pages`;
  }

  if (metaDimensions) {
    metaDimensions.textContent = `${Math.round(state.pageDimensions.width)} × ${Math.round(state.pageDimensions.height)} pt`;
  }
}

function updatePageNavDisplay() {
  const pageJumpInput = document.getElementById('pageJumpInput');
  const pageTotalLabel = document.getElementById('pageTotalLabel');
  const prevPageBtn = document.getElementById('prevPageBtn');
  const nextPageBtn = document.getElementById('nextPageBtn');

  if (pageJumpInput) {
    pageJumpInput.value = state.currentPage;
    pageJumpInput.max = state.totalPages;
  }

  if (pageTotalLabel) {
    pageTotalLabel.textContent = t('page_total_of', { total: state.totalPages });
  }

  if (prevPageBtn) prevPageBtn.disabled = state.currentPage <= 1;
  if (nextPageBtn) nextPageBtn.disabled = state.currentPage >= state.totalPages;
}

// Render Active PDF Page on Canvas
async function renderCurrentPage(isInitial = false) {
  if (!state.currentFile || !state.currentFile.pdfJsDoc) return;

  const page = await state.currentFile.pdfJsDoc.getPage(state.currentPage);
  const viewport = page.getViewport({ scale: 1.5 });
  const canvas = document.getElementById('pdfCanvas');
  const canvasContainer = document.getElementById('canvasContainer');
  if (!canvas || !canvasContainer) return;

  const context = canvas.getContext('2d');
  canvas.width = viewport.width;
  canvas.height = viewport.height;

  // Read unscaled page dimensions in points
  const unscaledViewport = page.getViewport({ scale: 1.0 });
  state.pageDimensions = {
    width: unscaledViewport.width,
    height: unscaledViewport.height
  };

  await page.render({ canvasContext: context, viewport: viewport }).promise;

  // Align Canvas Container
  canvasContainer.style.width = `${canvas.offsetWidth}px`;
  canvasContainer.style.height = `${canvas.offsetHeight}px`;

  // On initial load or page switch, set crop box (e.g. 5% default margin or previous proportions)
  if (isInitial) {
    applyMarginPreset(0.04, 0.04, 0.04, 0.04);
  } else {
    updateCropBoxVisuals();
  }

  updateMetadataDisplay();
  updatePageNavDisplay();
}

// Apply Margin Preset (fraction of width / height)
function applyMarginPreset(topRatio, bottomRatio, leftRatio, rightRatio) {
  const container = document.getElementById('canvasContainer');
  if (!container) return;

  const dW = container.offsetWidth || 400;
  const dH = container.offsetHeight || 550;

  const left = Math.round(dW * leftRatio);
  const top = Math.round(dH * topRatio);
  const right = Math.round(dW * rightRatio);
  const bottom = Math.round(dH * bottomRatio);

  state.cropBox = {
    left: left,
    top: top,
    width: Math.max(20, dW - left - right),
    height: Math.max(20, dH - top - bottom)
  };

  updateCropBoxVisuals();
  updateMarginInputsFromCropBox();
}

// Update Crop Box & Dark Mask CSS elements
function updateCropBoxVisuals() {
  const container = document.getElementById('canvasContainer');
  const cropBox = document.getElementById('cropBox');
  const maskTop = document.getElementById('maskTop');
  const maskBottom = document.getElementById('maskBottom');
  const maskLeft = document.getElementById('maskLeft');
  const maskRight = document.getElementById('maskRight');
  const cropBadge = document.getElementById('cropBadge');

  if (!container || !cropBox) return;

  const dW = container.offsetWidth;
  const dH = container.offsetHeight;

  const { left, top, width, height } = state.cropBox;

  // Crop Box Position
  cropBox.style.left = `${left}px`;
  cropBox.style.top = `${top}px`;
  cropBox.style.width = `${width}px`;
  cropBox.style.height = `${height}px`;

  // Masks
  if (maskTop) {
    maskTop.style.top = '0px';
    maskTop.style.left = '0px';
    maskTop.style.width = '100%';
    maskTop.style.height = `${top}px`;
  }

  if (maskBottom) {
    maskBottom.style.top = `${top + height}px`;
    maskBottom.style.left = '0px';
    maskBottom.style.width = '100%';
    maskBottom.style.height = `${Math.max(0, dH - (top + height))}px`;
  }

  if (maskLeft) {
    maskLeft.style.top = `${top}px`;
    maskLeft.style.left = '0px';
    maskLeft.style.width = `${left}px`;
    maskLeft.style.height = `${height}px`;
  }

  if (maskRight) {
    maskRight.style.top = `${top}px`;
    maskRight.style.left = `${left + width}px`;
    maskRight.style.width = `${Math.max(0, dW - (left + width))}px`;
    maskRight.style.height = `${height}px`;
  }

  // Dimension Badge
  if (cropBadge) {
    const scaleX = state.pageDimensions.width / dW;
    const scaleY = state.pageDimensions.height / dH;
    const ptW = Math.round(width * scaleX);
    const ptH = Math.round(height * scaleY);
    if (state.activeUnit === 'pt') {
      cropBadge.textContent = `${ptW} × ${ptH} pt`;
    } else {
      const mmW = Math.round(ptW * PT_TO_MM);
      const mmH = Math.round(ptH * PT_TO_MM);
      cropBadge.textContent = `${mmW} × ${mmH} mm`;
    }
  }
}

// Update Inputs when Crop Box is dragged/resized
function updateMarginInputsFromCropBox() {
  const container = document.getElementById('canvasContainer');
  if (!container) return;

  const dW = container.offsetWidth;
  const dH = container.offsetHeight;
  if (!dW || !dH) return;

  const scaleX = state.pageDimensions.width / dW;
  const scaleY = state.pageDimensions.height / dH;

  const { left, top, width, height } = state.cropBox;

  // Margins in PDF points
  const mLeftPt = left * scaleX;
  const mTopPt = top * scaleY;
  const mRightPt = Math.max(0, state.pageDimensions.width - (left + width) * scaleX);
  const mBottomPt = Math.max(0, state.pageDimensions.height - (top + height) * scaleY);

  const marginTopInput = document.getElementById('marginTopInput');
  const marginBottomInput = document.getElementById('marginBottomInput');
  const marginLeftInput = document.getElementById('marginLeftInput');
  const marginRightInput = document.getElementById('marginRightInput');

  if (state.activeUnit === 'pt') {
    if (marginTopInput) marginTopInput.value = Math.round(mTopPt);
    if (marginBottomInput) marginBottomInput.value = Math.round(mBottomPt);
    if (marginLeftInput) marginLeftInput.value = Math.round(mLeftPt);
    if (marginRightInput) marginRightInput.value = Math.round(mRightPt);
  } else {
    if (marginTopInput) marginTopInput.value = Math.round(mTopPt * PT_TO_MM);
    if (marginBottomInput) marginBottomInput.value = Math.round(mBottomPt * PT_TO_MM);
    if (marginLeftInput) marginLeftInput.value = Math.round(mLeftPt * PT_TO_MM);
    if (marginRightInput) marginRightInput.value = Math.round(mRightPt * PT_TO_MM);
  }
}

// Update Crop Box when user types in inputs
function updateCropBoxFromMarginInputs() {
  const container = document.getElementById('canvasContainer');
  if (!container) return;

  const dW = container.offsetWidth;
  const dH = container.offsetHeight;

  const marginTopInput = document.getElementById('marginTopInput');
  const marginBottomInput = document.getElementById('marginBottomInput');
  const marginLeftInput = document.getElementById('marginLeftInput');
  const marginRightInput = document.getElementById('marginRightInput');

  let mTop = parseFloat(marginTopInput?.value) || 0;
  let mBottom = parseFloat(marginBottomInput?.value) || 0;
  let mLeft = parseFloat(marginLeftInput?.value) || 0;
  let mRight = parseFloat(marginRightInput?.value) || 0;

  // Convert to points if user entered in mm
  if (state.activeUnit === 'mm') {
    mTop *= MM_TO_PT;
    mBottom *= MM_TO_PT;
    mLeft *= MM_TO_PT;
    mRight *= MM_TO_PT;
  }

  const scaleX = state.pageDimensions.width / dW;
  const scaleY = state.pageDimensions.height / dH;

  const left = Math.round(mLeft / scaleX);
  const top = Math.round(mTop / scaleY);
  const right = Math.round(mRight / scaleX);
  const bottom = Math.round(mBottom / scaleY);

  const width = Math.max(20, dW - left - right);
  const height = Math.max(20, dH - top - bottom);

  state.cropBox = {
    left: Math.min(Math.max(0, left), dW - 20),
    top: Math.min(Math.max(0, top), dH - 20),
    width: Math.min(width, dW - left),
    height: Math.min(height, dH - top)
  };

  updateCropBoxVisuals();
}

// Mouse & Touch Cropper Interactions
function initCropperDragListeners() {
  const cropBox = document.getElementById('cropBox');
  const canvasContainer = document.getElementById('canvasContainer');
  if (!cropBox || !canvasContainer) return;

  cropBox.addEventListener('pointerdown', handlePointerDown);
  window.addEventListener('pointermove', handlePointerMove);
  window.addEventListener('pointerup', handlePointerUp);
  window.addEventListener('pointercancel', handlePointerUp);
}

function handlePointerDown(e) {
  e.preventDefault();
  e.stopPropagation();

  const handle = e.target.closest('.crop-handle');
  if (handle) {
    state.dragMode = handle.getAttribute('data-handle');
  } else {
    state.dragMode = 'move';
  }

  state.isDragging = true;
  state.dragStart = { x: e.clientX, y: e.clientY };
  state.cropBoxStart = { ...state.cropBox };
}

function handlePointerMove(e) {
  if (!state.isDragging || !state.dragMode) return;
  e.preventDefault();

  const container = document.getElementById('canvasContainer');
  if (!container) return;

  const dW = container.offsetWidth;
  const dH = container.offsetHeight;

  const dx = e.clientX - state.dragStart.x;
  const dy = e.clientY - state.dragStart.y;
  const start = state.cropBoxStart;

  let newLeft = start.left;
  let newTop = start.top;
  let newWidth = start.width;
  let newHeight = start.height;

  const minSize = 24;

  switch (state.dragMode) {
    case 'move':
      newLeft = Math.max(0, Math.min(start.left + dx, dW - start.width));
      newTop = Math.max(0, Math.min(start.top + dy, dH - start.height));
      break;
    case 'se':
      newWidth = Math.max(minSize, Math.min(start.width + dx, dW - start.left));
      newHeight = Math.max(minSize, Math.min(start.height + dy, dH - start.top));
      break;
    case 'sw':
      const swRight = start.left + start.width;
      newLeft = Math.max(0, Math.min(start.left + dx, swRight - minSize));
      newWidth = swRight - newLeft;
      newHeight = Math.max(minSize, Math.min(start.height + dy, dH - start.top));
      break;
    case 'ne':
      const neBottom = start.top + start.height;
      newTop = Math.max(0, Math.min(start.top + dy, neBottom - minSize));
      newHeight = neBottom - newTop;
      newWidth = Math.max(minSize, Math.min(start.width + dx, dW - start.left));
      break;
    case 'nw':
      const nwRight = start.left + start.width;
      const nwBottom = start.top + start.height;
      newLeft = Math.max(0, Math.min(start.left + dx, nwRight - minSize));
      newWidth = nwRight - newLeft;
      newTop = Math.max(0, Math.min(start.top + dy, nwBottom - minSize));
      newHeight = nwBottom - newTop;
      break;
    case 'n':
      const nBottom = start.top + start.height;
      newTop = Math.max(0, Math.min(start.top + dy, nBottom - minSize));
      newHeight = nBottom - newTop;
      break;
    case 's':
      newHeight = Math.max(minSize, Math.min(start.height + dy, dH - start.top));
      break;
    case 'w':
      const wRight = start.left + start.width;
      newLeft = Math.max(0, Math.min(start.left + dx, wRight - minSize));
      newWidth = wRight - newLeft;
      break;
    case 'e':
      newWidth = Math.max(minSize, Math.min(start.width + dx, dW - start.left));
      break;
  }

  state.cropBox = {
    left: newLeft,
    top: newTop,
    width: newWidth,
    height: newHeight
  };

  updateCropBoxVisuals();
  updateMarginInputsFromCropBox();
}

function handlePointerUp() {
  if (state.isDragging) {
    state.isDragging = false;
    state.dragMode = null;
  }
}

// Execute PDF Cropping via PDF-Lib
async function executePdfCropping() {
  if (!state.currentFile || state.isProcessing) return;

  state.isProcessing = true;
  const progressContainer = document.getElementById('progressContainer');
  const progressFill = document.getElementById('progressFill');
  const progressPercent = document.getElementById('progressPercent');
  const successCard = document.getElementById('successCard');
  const cropBtn = document.getElementById('cropBtn');

  if (cropBtn) cropBtn.disabled = true;
  if (successCard) successCard.style.display = 'none';
  if (progressContainer) {
    progressContainer.style.display = 'block';
    progressContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  try {
    const container = document.getElementById('canvasContainer');
    const dW = container.offsetWidth;
    const dH = container.offsetHeight;

    const scaleX = state.pageDimensions.width / dW;
    const scaleY = state.pageDimensions.height / dH;

    const { left, top, width, height } = state.cropBox;

    // Calculate crop rectangle in PDF points (origin bottom-left)
    const pdfCropX = left * scaleX;
    const pdfCropWidth = width * scaleX;
    const pdfCropHeight = height * scaleY;
    const pdfCropY = state.pageDimensions.height - (top + height) * scaleY;

    if (progressFill) progressFill.style.width = '30%';
    if (progressPercent) progressPercent.textContent = '30%';

    const pdfDoc = await PDFLib.PDFDocument.load(state.currentFile.bytes.slice(0), { ignoreEncryption: true });
    const pages = pdfDoc.getPages();

    if (progressFill) progressFill.style.width = '60%';
    if (progressPercent) progressPercent.textContent = '60%';

    if (state.cropScope === 'all') {
      // Apply crop to all pages
      pages.forEach(page => {
        const pWidth = page.getWidth();
        const pHeight = page.getHeight();
        // Scale proportions if individual page has different dimensions
        const ratioX = pWidth / state.pageDimensions.width;
        const ratioY = pHeight / state.pageDimensions.height;

        const pX = pdfCropX * ratioX;
        const pY = pdfCropY * ratioY;
        const pW = pdfCropWidth * ratioX;
        const pH = pdfCropHeight * ratioY;

        page.setCropBox(pX, pY, pW, pH);
        page.setMediaBox(pX, pY, pW, pH);
      });
    } else {
      // Apply to current page only
      const targetIndex = state.currentPage - 1;
      if (pages[targetIndex]) {
        const page = pages[targetIndex];
        page.setCropBox(pdfCropX, pdfCropY, pdfCropWidth, pdfCropHeight);
        page.setMediaBox(pdfCropX, pdfCropY, pdfCropWidth, pdfCropHeight);
      }
    }

    if (progressFill) progressFill.style.width = '90%';
    if (progressPercent) progressPercent.textContent = '90%';

    const resultBytes = await pdfDoc.save();
    state.croppedPdfBytes = resultBytes;

    if (state.croppedBlobUrl) {
      URL.revokeObjectURL(state.croppedBlobUrl);
    }
    const blob = new Blob([resultBytes], { type: 'application/pdf' });
    state.croppedBlobUrl = URL.createObjectURL(blob);

    if (progressFill) progressFill.style.width = '100%';
    if (progressPercent) progressPercent.textContent = '100%';

    setTimeout(() => {
      if (progressContainer) progressContainer.style.display = 'none';
      displaySuccessState(resultBytes, Math.round(pdfCropWidth), Math.round(pdfCropHeight));
      showToast(t('toast_crop_complete'), 'success');
    }, 300);

  } catch (err) {
    console.error('Cropping error:', err);
    showToast(t('toast_error_crop'), 'error');
    if (progressContainer) progressContainer.style.display = 'none';
  } finally {
    state.isProcessing = false;
    if (cropBtn) cropBtn.disabled = false;
  }
}

function displaySuccessState(bytes, cropW, cropH) {
  const successCard = document.getElementById('successCard');
  const successMetaScope = document.getElementById('successMetaScope');
  const successMetaSize = document.getElementById('successMetaSize');
  const successMetaDimensions = document.getElementById('successMetaDimensions');

  if (successMetaScope) {
    successMetaScope.textContent = state.cropScope === 'all' ? 'Scope: All Pages' : `Scope: Page ${state.currentPage} Only`;
  }

  if (successMetaSize) {
    successMetaSize.textContent = `Size: ${formatBytes(bytes.byteLength)}`;
  }

  if (successMetaDimensions) {
    successMetaDimensions.textContent = `Trimmed: ${cropW} × ${cropH} pt`;
  }

  if (successCard) {
    successCard.style.display = 'flex';
    successCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

// Download Trigger
function triggerDownload() {
  if (!state.croppedBlobUrl) return;

  const outputFilenameInput = document.getElementById('outputFilenameInput');
  let filename = outputFilenameInput ? outputFilenameInput.value.trim() : '';

  if (!filename) {
    const base = state.currentFile ? state.currentFile.name.replace(/\.pdf$/i, '') : 'document';
    filename = `${base}-cropped.pdf`;
  }

  if (!filename.toLowerCase().endsWith('.pdf')) {
    filename += '.pdf';
  }

  const a = document.createElement('a');
  a.href = state.croppedBlobUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// Generate Sample Multi-page PDF for Demonstration
async function loadSamplePdfDocument() {
  try {
    const pdfDoc = await PDFLib.PDFDocument.create();
    const font = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(PDFLib.StandardFonts.HelveticaBold);

    // Page 1: Document with wide borders
    const page1 = pdfDoc.addPage([612, 792]);
    const { width, height } = page1.getSize();

    // Outer decorative background border (to demonstrate trimming)
    page1.drawRectangle({
      x: 20,
      y: 20,
      width: width - 40,
      height: height - 40,
      borderColor: PDFLib.rgb(0.9, 0.2, 0.35),
      borderWidth: 1.5,
      color: PDFLib.rgb(0.99, 0.96, 0.97)
    });

    page1.drawText("EXECUTIVE QUARTERLY REPORT", {
      x: 80,
      y: height - 120,
      size: 20,
      font: fontBold,
      color: PDFLib.rgb(0.5, 0.05, 0.15)
    });

    page1.drawText("CONFIDENTIAL FINANCIAL AUDIT & REVENUE ANALYSIS", {
      x: 80,
      y: height - 145,
      size: 9,
      font: font,
      color: PDFLib.rgb(0.4, 0.4, 0.4)
    });

    // Content Box
    page1.drawRectangle({
      x: 80,
      y: height - 380,
      width: width - 160,
      height: 200,
      color: PDFLib.rgb(1, 1, 1),
      borderColor: PDFLib.rgb(0.85, 0.85, 0.85),
      borderWidth: 1
    });

    page1.drawText("Section 1: Operating Summary", {
      x: 100,
      y: height - 210,
      size: 13,
      font: fontBold,
      color: PDFLib.rgb(0.1, 0.1, 0.1)
    });

    page1.drawText("This document contains wide decorative margin borders designed to demonstrate the precision", {
      x: 100,
      y: height - 240,
      size: 9,
      font: font,
      color: PDFLib.rgb(0.3, 0.3, 0.3)
    });

    page1.drawText("of the PDFNetizen Visual Cropping Tool. Drag the crop selection box to trim unwanted whitespace.", {
      x: 100,
      y: height - 260,
      size: 9,
      font: font,
      color: PDFLib.rgb(0.3, 0.3, 0.3)
    });

    page1.drawText("• Total Enterprise Revenue: $14,250,000 (+18.4% YoY)", {
      x: 100,
      y: height - 295,
      size: 9.5,
      font: fontBold,
      color: PDFLib.rgb(0.05, 0.5, 0.3)
    });

    page1.drawText("• Cloud Infrastructure Margin: 74.2% Operational Efficiency", {
      x: 100,
      y: height - 320,
      size: 9.5,
      font: fontBold,
      color: PDFLib.rgb(0.05, 0.5, 0.3)
    });

    page1.drawText("Page 1 of 2 - PDFNetizen Margin Trimming Sample", {
      x: 80,
      y: 50,
      size: 8,
      font: font,
      color: PDFLib.rgb(0.5, 0.5, 0.5)
    });

    // Page 2
    const page2 = pdfDoc.addPage([612, 792]);
    page2.drawRectangle({
      x: 20,
      y: 20,
      width: width - 40,
      height: height - 40,
      borderColor: PDFLib.rgb(0.9, 0.2, 0.35),
      borderWidth: 1.5,
      color: PDFLib.rgb(0.99, 0.96, 0.97)
    });

    page2.drawText("REGIONAL BREAKDOWN & PROJECTIONS", {
      x: 80,
      y: height - 120,
      size: 18,
      font: fontBold,
      color: PDFLib.rgb(0.5, 0.05, 0.15)
    });

    page2.drawText("Page 2 of 2 - All Pages will be cropped synchronously with identical margins.", {
      x: 80,
      y: height - 150,
      size: 9,
      font: font,
      color: PDFLib.rgb(0.3, 0.3, 0.3)
    });

    const sampleBytes = await pdfDoc.save();
    await processAndLoadPdf(sampleBytes, 'Sample-Document-With-Margins.pdf', sampleBytes.byteLength);
    showToast(t('toast_sample_ready'), 'success');
  } catch (err) {
    console.error('Failed to create sample PDF:', err);
    showToast(t('toast_error_load'), 'error');
  }
}

// Reset Workspace
function resetWorkspace() {
  if (state.croppedBlobUrl) {
    URL.revokeObjectURL(state.croppedBlobUrl);
    state.croppedBlobUrl = null;
  }
  state.currentFile = null;
  state.croppedPdfBytes = null;
  state.isProcessing = false;
  state.currentPage = 1;
  state.totalPages = 1;

  const fileInput = document.getElementById('fileInput');
  if (fileInput) fileInput.value = '';

  const dropzone = document.getElementById('dropzone');
  const workspacePanel = document.getElementById('workspacePanel');
  const resetWorkspaceBtn = document.getElementById('resetWorkspaceBtn');
  const successCard = document.getElementById('successCard');
  const progressContainer = document.getElementById('progressContainer');

  if (dropzone) dropzone.style.display = 'block';
  if (workspacePanel) workspacePanel.style.display = 'none';
  if (resetWorkspaceBtn) resetWorkspaceBtn.style.display = 'none';
  if (successCard) successCard.style.display = 'none';
  if (progressContainer) progressContainer.style.display = 'none';
}

// Helper: Format Bytes
function formatBytes(bytes, decimals = 1) {
  if (!bytes || bytes === 0) return '0 KB';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// FAQ Accordion
function initFaqAccordion() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-question');
    if (q) {
      q.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(other => other.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}

// Cookie Banner
function initCookieBanner() {
  const banner = document.getElementById('cookieBanner');
  const acceptBtn = document.getElementById('cookieAcceptBtn');
  if (!banner || !acceptBtn) return;

  if (!localStorage.getItem('pdfnetizen_cookie_consent')) {
    setTimeout(() => {
      banner.style.display = 'flex';
    }, 1500);
  }

  acceptBtn.addEventListener('click', () => {
    localStorage.setItem('pdfnetizen_cookie_consent', 'true');
    banner.style.display = 'none';
  });
}
