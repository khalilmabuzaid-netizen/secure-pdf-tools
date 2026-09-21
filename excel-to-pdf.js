/**
 * Excel to PDF - Interactive Client-Side Spreadsheet Converter Engine
 * Powered by SheetJS, jsPDF & jsPDF-AutoTable
 * 100% In-Browser Privacy • Zero Server Uploads • Multi-Sheet Support
 */

(function () {
  'use strict';

  // Bilingual Translation Dictionary
  const translations = {
    en: {
      badge_client_side: "100% Client-Side",
      nav_reset: "Reset",
      hero_badge: "100% Client-Side Excel to PDF Conversion • Zero Uploads",
      hero_title: 'Convert <span class="gradient-text">Excel to PDF</span> Online',
      hero_subtitle: "Convert Microsoft Excel spreadsheets (.xlsx, .xls, .csv) into clean, printable PDF documents directly in your browser. 100% secure and private.",
      dropzone_title: "Drop your Excel spreadsheet here",
      dropzone_subtitle: "Select or drag & drop any .xlsx, .xls, or .csv workbook to convert into a structured, printable PDF document.",
      btn_browse_file: "Browse Excel File",
      btn_load_sample: "Try Sample Spreadsheet",
      pill_multi_sheet: "Multi-Sheet Workbook Support",
      pill_auto_fit: "Landscape & Auto Column Fit",
      pill_client_privacy: "100% In-Browser Privacy",
      btn_change_file: "Change File",
      label_orientation: "Page Orientation",
      opt_landscape: "Landscape (Recommended)",
      opt_portrait: "Portrait",
      label_page_size: "Paper Size",
      label_table_theme: "Table Styling Theme",
      label_options: "Options",
      label_repeat_headers: "Repeat header row on each page",
      label_fit_width: "Fit columns to page width",
      label_output_filename: "Output File Name",
      btn_convert_excel: "Convert to PDF & Download",
      progress_converting: "Parsing workbook and styling table...",
      progress_complete: "PDF compiled successfully!",
      success_title: "Excel Converted to PDF Successfully!",
      success_desc: "Your spreadsheet has been compiled into a clean, structured PDF document with high-quality vector typography. Download your file below.",
      btn_download_pdf: "Download PDF",
      btn_convert_another: "Convert Another Spreadsheet",
      ad_space_label: "Advertisement Space (728x90)",
      guide_badge: "Instant Table Conversion",
      guide_title: "How to Convert Excel Spreadsheets to PDF Online",
      guide_subtitle: "Transform complex spreadsheets, budgets, and invoices into clean PDF documents in three easy steps.",
      step1_title: "Upload Excel Workbook",
      step1_desc: "Drag and drop your .xlsx, .xls, or .csv spreadsheet file into the upload zone. SheetJS reads the data completely in local browser memory.",
      step2_title: "Preview & Configure Layout",
      step2_desc: "Select your desired worksheet tab, choose Landscape or Portrait orientation, pick your table theme, and adjust column fitting options.",
      step3_title: "Download Printable PDF",
      step3_desc: "Click 'Convert to PDF & Download' to generate a formatted, multi-page vector PDF table ready for printing and sharing.",
      faq_badge: "Got Questions?",
      faq_title: "Frequently Asked Questions",
      faq_subtitle: "Everything you need to know about our free client-side Excel to PDF converter.",
      faq_q1: "Are my financial spreadsheets uploaded to any remote server?",
      faq_a1: "Never. All workbook parsing and PDF document generation occur 100% locally in your web browser memory using SheetJS and jsPDF. Your confidential numbers, salaries, and customer records never leave your computer.",
      faq_q2: "Can I convert workbooks with multiple worksheets?",
      faq_a2: "Yes! The tool automatically detects all sheets in your Excel workbook. You can switch between sheet tabs to preview and convert individual sheets or compile all sheets into a single document.",
      faq_q3: "Will wide spreadsheets fit properly onto PDF pages?",
      faq_a3: "Yes. Landscape orientation is enabled by default to provide maximum width for wide data columns, and our layout algorithm automatically scales columns and wraps text across multi-page tables.",
      faq_q4: "Which spreadsheet file formats are supported?",
      faq_a4: "We support modern Microsoft Excel files (.xlsx), legacy Excel spreadsheets (.xls), and standard comma-separated text files (.csv).",
      faq_q5: "Are table headers repeated on every page?",
      faq_a5: "Yes, by default the 'Repeat header row on each page' setting is enabled, ensuring multi-page accounting ledgers and reports remain easy to read.",
      faq_q6: "Is this service free to use without limits?",
      faq_a6: "Yes! The converter is 100% free with unlimited document conversions, no account sign-ups, and zero watermarks added to your files.",
      footer_tagline: "100% Client-side, private, and secure document processing directly in your browser.",
      footer_privacy: "Privacy Policy",
      footer_terms: "Terms of Service",
      footer_contact: "Contact Us",
      footer_copyright: "© 2026 PDFNetizen. All rights reserved.",
      cookie_consent_text: "We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.",
      cookie_learn_more: "Privacy Policy",
      cookie_accept_btn: "Accept",
      toast_loaded: "Excel workbook loaded successfully: {sheets} sheets found.",
      toast_sample: "Sample 2-sheet corporate Excel workbook loaded.",
      toast_converted: "Excel spreadsheet converted to PDF successfully!",
      toast_error_load: "Failed to read Excel file. Please ensure it is a valid .xlsx, .xls, or .csv document.",
      toast_error_empty: "The selected worksheet is empty.",
      toast_error_convert: "An error occurred while compiling the PDF document."
    },
    ar: {
      badge_client_side: "محلي ١٠٠٪ في المتصفح",
      nav_reset: "إعادة تعيين",
      hero_badge: "تحويل Excel إلى PDF محلياً في المتصفح • أمان وخصوصية مطلقة",
      hero_title: 'تحويل <span class="gradient-text">Excel إلى PDF</span> أونلاين',
      hero_subtitle: "حوّل جداول بيانات Microsoft Excel بصيغ (.xlsx, .xls, .csv) إلى مستندات PDF منسقة وجاهزة للطباعة مباشرة داخل متصفحك بأمان وخصوصية ١٠٠٪.",
      dropzone_title: "أفلت جدول بيانات Excel هنا لتحويله",
      dropzone_subtitle: "اختر أو اسحب وأفلت أي ملف .xlsx أو .xls أو .csv لتحويله إلى مستند PDF احترافي ومنسق.",
      btn_browse_file: "تصفح ملف Excel",
      btn_load_sample: "تجربة جدول نموذجي",
      pill_multi_sheet: "دعم المصنفات متعددة الأوراق",
      pill_auto_fit: "ملاءمة تلقائية للأعمدة والاتجاه الأفقي",
      pill_client_privacy: "خصوصية محلية ١٠٠٪ في المتصفح",
      btn_change_file: "تغيير المستند",
      label_orientation: "اتجاه الصفحة",
      opt_landscape: "أفقي (موصى به للجداول)",
      opt_portrait: "عمودي",
      label_page_size: "حجم الورق",
      label_table_theme: "نمط وتنسيق الجدول",
      label_options: "خيارات التحويل",
      label_repeat_headers: "تكرار رأس الجدول في كل صفحة",
      label_fit_width: "ملاءمة الأعمدة لعرض الصفحة",
      label_output_filename: "اسم الملف المخرج",
      btn_convert_excel: "تحويل إلى PDF وتنزيل",
      progress_converting: "جارٍ تحليل الجداول وتنسيق صفحات PDF...",
      progress_complete: "تم تحويل المستند بنجاح!",
      success_title: "تم تحويل Excel إلى PDF بنجاح!",
      success_desc: "تم تجميع جدول البيانات الخاص بك في مستند PDF أنيق ومنظم بجودة خطوط متجهية فائقة. يمكنك تنزيل ملفك أدناه.",
      btn_download_pdf: "تنزيل مستند PDF",
      btn_convert_another: "تحويل جدول بيانات آخر",
      ad_space_label: "مساحة إعلانية (728×90)",
      guide_badge: "تحويل فوري للجداول",
      guide_title: "كيفية تحويل جداول Excel إلى PDF أونلاين",
      guide_subtitle: "حوّل الميزانيات والفواتير والبيانات المحاسبية المعقدة إلى مستندات PDF منسقة في ثلاث خطوات سهلة.",
      step1_title: "رفع مصنف Excel",
      step1_desc: "اسحب وأفلت ملف .xlsx أو .xls أو .csv في منطقة التحميل. تتم قراءة البيانات محلياً ١٠٠٪ داخل ذاكرة المتصفح.",
      step2_title: "المعاينة وضبط التنسيق",
      step2_desc: "اختر ورقة العمل المطلوبة، وحدد اتجاه الصفحة (أفقي أو عمودي)، واختر نمط الألوان وملاءمة الأعمدة.",
      step3_title: "تنزيل مستند PDF",
      step3_desc: "اضغط على 'تحويل إلى PDF وتنزيل' لتوليد مستند PDF جاهز للمشاركة والطباعة في ثوانٍ معدودة.",
      faq_badge: "لديك استفسار؟",
      faq_title: "الأسئلة الشائعة",
      faq_subtitle: "كل ما تحتاج معرفته حول أداة تحويل Excel إلى PDF المجانية والمحلية.",
      faq_q1: "هل يتم رفع ملفاتي المالية إلى أي خادم خارجي؟",
      faq_a1: "أبداً. تتم كافة عمليات قراءة الجداول وتوليد مستندات الـ PDF محلياً بنسبة ١٠٠٪ في ذاكرة متصفحك دون رفع أي بيانات إطلاقاً.",
      faq_q2: "هل يمكنني تحويل ملفات تحتوي على أوراق عمل متعددة؟",
      faq_a2: "نعم! تكتشف الأداة تلقائياً كافة أوراق العمل في المصنف، وتتيح لك التبديل بينها لمعاينتها وتحويلها بشكل مستقل أو تحويل كافة الأوراق.",
      faq_q3: "هل تتناسب الجداول العريضة مع صفحات الـ PDF بشكل منسق؟",
      faq_a3: "نعم. يتم تفعيل الوضع الأفقي افتراضياً لمنح أقصى مساحة للأعمدة العريضة، ويقوم المحرك بضبط قياسات الأعمدة وتفاف النصوص بذكاء عبر الصفحات.",
      faq_q4: "ما هي صيغ الجداول المدعومة للتحويل؟",
      faq_a4: "ندعم ملفات Excel الحديثة (.xlsx)، والملفات السابقة (.xls)، بالإضافة إلى ملفات القيم المفصولة بفواصل (.csv).",
      faq_q5: "هل يتكرر صف رأس الجدول في الصفحات المتعددة؟",
      faq_a5: "نعم، يتم تفعيل خيار 'تكرار رأس الجدول في كل صفحة' افتراضياً لضمان سهولة قراءة القيود المحاسبية الطويلة عبر صفحات المستند.",
      faq_q6: "هل توجد أي رسوم أو حدود لعدد مرات التحويل؟",
      faq_a6: "لا. الأداة مجانية بالكامل ١٠٠٪ بلا قيود وبدون اشتراكات أو علامات مائية مضافة على ملفاتك.",
      footer_tagline: "معالجة مستندات محلية ١٠٠٪، خاصة وآمنة تماماً مباشرة في متصفحك.",
      footer_privacy: "سياسة الخصوصية",
      footer_terms: "شروط الاستخدام",
      footer_contact: "اتصل بنا",
      footer_copyright: "© ٢٠٢٦ PDFNetizen. جميع الحقوق محفوظة.",
      cookie_consent_text: "نحن نستخدم ملفات تعريف الارتباط لتحسين تجربتك. باستمرارك في زيارة هذا الموقع، فإنك توافق على استخدامنا لملفات تعريف الارتباط.",
      cookie_learn_more: "سياسة الخصوصية",
      cookie_accept_btn: "موافق",
      toast_loaded: "تم تحميل مصنف Excel بنجاح: تم العثور على {sheets} أوراق.",
      toast_sample: "تم تحميل مصنف Excel النموذجي (ورقتان عمل).",
      toast_converted: "تم تحويل جدول Excel إلى PDF بنجاح!",
      toast_error_load: "فشل قراءة ملف Excel. يرجى التأكد من سلامة صيغة الملف.",
      toast_error_empty: "ورقة العمل المختارة فارغة.",
      toast_error_convert: "حدث خطأ أثناء تجميع ملف الـ PDF."
    }
  };

  let currentLang = 'en';

  // Application State
  let parsedWorkbook = null;
  let docFileName = "spreadsheet";
  let activeSheetName = "";
  let compiledPdfBlobUrl = null;
  let isProcessing = false;

  // Conversion Settings
  const settings = {
    orientation: 'landscape',
    pageSize: 'a4',
    theme: 'emerald',
    repeatHeaders: true,
    fitWidth: true
  };

  // DOM References
  const fileInput = document.getElementById('excel-file-input');
  const dropzone = document.getElementById('dropzone');
  const btnBrowseFile = document.getElementById('btn-browse-file');
  const btnLoadSample = document.getElementById('btn-load-sample');

  const workspacePanel = document.getElementById('workspace-panel');
  const fileNameDisplay = document.getElementById('file-name-display');
  const fileSizeDisplay = document.getElementById('file-size-display');
  const sheetsCountText = document.getElementById('sheets-count-text');
  const rowsCountText = document.getElementById('rows-count-text');
  const btnChangeFile = document.getElementById('btn-change-file');
  const btnHeaderReset = document.getElementById('btn-header-reset');

  // Preview elements
  const sheetTabsBar = document.getElementById('sheet-tabs-bar');
  const previewSheetTitle = document.getElementById('preview-sheet-title');
  const previewDimensionsText = document.getElementById('preview-dimensions-text');
  const previewDataTable = document.getElementById('preview-data-table');

  // Control inputs
  const optOrientationLandscape = document.getElementById('opt-orientation-landscape');
  const optOrientationPortrait = document.getElementById('opt-orientation-portrait');
  const selectPageSize = document.getElementById('select-page-size');
  const selectTableTheme = document.getElementById('select-table-theme');
  const checkRepeatHeaders = document.getElementById('check-repeat-headers');
  const checkFitWidth = document.getElementById('check-fit-width');
  const outputFilenameInput = document.getElementById('output-filename-input');

  // Action & Progress
  const btnConvertExcel = document.getElementById('btn-convert-excel');
  const btnConvertSpinner = document.getElementById('btn-convert-spinner');
  const btnConvertIcon = document.getElementById('btn-convert-icon');
  const btnConvertText = document.getElementById('btn-convert-text');

  const conversionProgress = document.getElementById('conversion-progress');
  const progressStatusText = document.getElementById('progress-status-text');
  const progressPercent = document.getElementById('progress-percent');
  const progressBarFill = document.getElementById('progress-bar-fill');

  const successDownloadCard = document.getElementById('success-download-card');
  const pdfFilenameDisplay = document.getElementById('pdf-filename-display');
  const pdfFilesizeDisplay = document.getElementById('pdf-filesize-display');
  const btnDownloadPdf = document.getElementById('btn-download-pdf');
  const btnConvertAnother = document.getElementById('btn-convert-another');

  const toastEl = document.getElementById('toast');
  const toastMessageEl = document.getElementById('toast-message');
  let toastTimeout = null;

  const btnLanguageToggle = document.getElementById('btn-language-toggle');
  const langToggleText = document.getElementById('lang-toggle-text');

  // Format File Size Helper
  function formatBytes(bytes) {
    if (!bytes || bytes === 0) return '0 KB';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Toast Notification System
  function showToast(msg, iconName = 'info') {
    if (!toastEl) return;
    if (toastTimeout) clearTimeout(toastTimeout);

    toastMessageEl.textContent = msg;
    const toastIcon = document.getElementById('toast-icon');
    if (toastIcon) {
      toastIcon.setAttribute('data-lucide', iconName);
    }
    if (window.lucide) lucide.createIcons();

    toastEl.classList.remove('hidden');
    toastTimeout = setTimeout(() => {
      toastEl.classList.add('hidden');
    }, 3800);
  }

  // Language & i18n Handling
  function applyLanguage(lang) {
    currentLang = lang;
    const isAr = (lang === 'ar');

    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;

    if (langToggleText) {
      langToggleText.textContent = isAr ? 'English' : 'العربية';
    }

    const dict = translations[currentLang] || translations.en;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.innerHTML = dict[key];
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key]) {
        el.setAttribute('placeholder', dict[key]);
      }
    });

    if (parsedWorkbook) {
      updateWorkbookMetaInfo();
    }

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  function toggleLanguage() {
    currentLang = (currentLang === 'en') ? 'ar' : 'en';
    applyLanguage(currentLang);
  }

  if (btnLanguageToggle) {
    btnLanguageToggle.addEventListener('click', toggleLanguage);
  }

  // File Upload & Drag-and-Drop Event Bindings
  if (dropzone && fileInput) {
    dropzone.addEventListener('click', () => fileInput.click());

    ['dragenter', 'dragover'].forEach(eventName => {
      dropzone.addEventListener(eventName, e => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.add('drag-over');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropzone.addEventListener(eventName, e => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.remove('drag-over');
      });
    });

    dropzone.addEventListener('drop', e => {
      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        handleFileSelection(files[0]);
      }
    });

    fileInput.addEventListener('change', e => {
      if (e.target.files && e.target.files.length > 0) {
        handleFileSelection(e.target.files[0]);
      }
    });
  }

  if (btnBrowseFile && fileInput) {
    btnBrowseFile.addEventListener('click', e => {
      e.stopPropagation();
      fileInput.click();
    });
  }

  if (btnChangeFile && fileInput) {
    btnChangeFile.addEventListener('click', () => fileInput.click());
  }

  if (btnHeaderReset) {
    btnHeaderReset.addEventListener('click', resetWorkspace);
  }

  if (btnConvertAnother) {
    btnConvertAnother.addEventListener('click', resetWorkspace);
  }

  // Handle Excel File Selection
  async function handleFileSelection(file) {
    if (!file) return;

    const validExts = ['.xlsx', '.xls', '.csv'];
    const lowerName = file.name.toLowerCase();
    const isValid = validExts.some(ext => lowerName.endsWith(ext));

    if (!isValid) {
      const dict = translations[currentLang] || translations.en;
      showToast(dict.toast_error_load, 'alert-circle');
      return;
    }

    docFileName = file.name.replace(/\.[^/.]+$/, "") || "spreadsheet";
    if (outputFilenameInput) {
      outputFilenameInput.value = `${docFileName}`;
    }

    try {
      const arrayBuffer = await file.arrayBuffer();
      processWorkbookBuffer(arrayBuffer, file.name, formatBytes(file.size));
    } catch (err) {
      console.error("Error reading file:", err);
      const dict = translations[currentLang] || translations.en;
      showToast(dict.toast_error_load, 'alert-circle');
    }
  }

  // Try Sample Spreadsheet Button
  if (btnLoadSample) {
    btnLoadSample.addEventListener('click', e => {
      e.stopPropagation();
      loadSampleWorkbook();
    });
  }

  // Generate Sample 2-Sheet Excel Workbook via SheetJS
  function loadSampleWorkbook() {
    if (!window.XLSX) {
      showToast("SheetJS engine loading, please try again in a moment.", "alert-circle");
      return;
    }

    try {
      docFileName = "corporate_financials_2026";
      if (outputFilenameInput) {
        outputFilenameInput.value = "corporate_financials_2026";
      }

      // Create new workbook
      const wb = window.XLSX.utils.book_new();

      // Sheet 1: Q1 Financial Summary
      const sheet1Data = [
        ["Department", "Budget Allocation", "Q1 Actual Spend", "Variance ($)", "Utilization (%)", "Compliance Status"],
        ["Engineering & Infrastructure", "$450,000", "$412,800", "$37,200", "91.7%", "Approved"],
        ["Product Design & UX", "$180,000", "$174,500", "$5,500", "96.9%", "Approved"],
        ["Enterprise Sales & Growth", "$320,000", "$298,000", "$22,000", "93.1%", "Approved"],
        ["Marketing & Brand Expansion", "$240,000", "$232,400", "$7,600", "96.8%", "Approved"],
        ["Customer Success & Support", "$160,000", "$152,900", "$7,100", "95.6%", "Approved"],
        ["Legal, Governance & Audit", "$120,000", "$98,000", "$22,000", "81.7%", "Approved"],
        ["Corporate Operations & Admin", "$140,000", "$135,200", "$4,800", "96.6%", "Approved"],
        ["Total Consolidated Portfolio", "$1,610,000", "$1,503,800", "$106,200", "93.4%", "Audited"]
      ];
      const ws1 = window.XLSX.utils.aoa_to_sheet(sheet1Data);
      window.XLSX.utils.book_append_sheet(wb, ws1, "Q1 Financial Summary");

      // Sheet 2: Global Inventory Assets
      const sheet2Data = [
        ["SKU Code", "Item Description", "Category", "Warehouse Location", "Stock Level", "Unit Price ($)", "Asset Value ($)"],
        ["NET-SRV-01", "Enterprise Rack Server Node A1", "Hardware", "US-East Hub", "42", "$3,250", "$136,500"],
        ["NET-SW-08", "Managed 48-Port Fiber Switch", "Networking", "US-East Hub", "85", "$1,120", "$95,200"],
        ["NET-SSD-4T", "Enterprise NVMe SSD 4TB", "Storage", "EU-Central", "210", "$380", "$79,800"],
        ["NET-UPS-3K", "Smart Online UPS 3000VA", "Power", "US-West Hub", "34", "$890", "$30,260"],
        ["NET-CAM-4K", "AI Visual Inspection Unit", "Sensors", "Asia-East", "68", "$450", "$30,600"],
        ["NET-CAB-6A", "Shielded Cat6A Spool 1000ft", "Cabling", "US-East Hub", "120", "$145", "$17,400"],
        ["Total Asset Inventory", "6 Product Lines Across 4 Warehouses", "Consolidated", "Global", "559 Units", "-", "$389,760"]
      ];
      const ws2 = window.XLSX.utils.aoa_to_sheet(sheet2Data);
      window.XLSX.utils.book_append_sheet(wb, ws2, "Global Inventory Assets");

      // Write to binary buffer
      const wbout = window.XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      processWorkbookBuffer(wbout, "corporate_financials_2026.xlsx", "18.4 KB");

      const dict = translations[currentLang] || translations.en;
      showToast(dict.toast_sample, 'sparkles');

    } catch (err) {
      console.error("Error generating sample workbook:", err);
      const dict = translations[currentLang] || translations.en;
      showToast(dict.toast_error_load, 'alert-circle');
    }
  }

  // Parse and Process Workbook
  function processWorkbookBuffer(arrayBuffer, name, sizeStr) {
    if (!window.XLSX) {
      showToast("SheetJS library is loading, please try again in a moment.", "alert-circle");
      return;
    }

    try {
      parsedWorkbook = window.XLSX.read(arrayBuffer, { type: 'array' });

      if (!parsedWorkbook.SheetNames || parsedWorkbook.SheetNames.length === 0) {
        throw new Error("No worksheets found in workbook");
      }

      dropzone.classList.add('hidden');
      successDownloadCard.classList.add('hidden');
      workspacePanel.classList.remove('hidden');
      if (btnHeaderReset) btnHeaderReset.disabled = false;

      fileNameDisplay.textContent = name;
      fileSizeDisplay.textContent = sizeStr;

      // Render Sheet Selection Tabs
      renderSheetTabs();

      // Render First Sheet Preview
      activeSheetName = parsedWorkbook.SheetNames[0];
      selectSheetTab(activeSheetName);

      updateWorkbookMetaInfo();

      const dict = translations[currentLang] || translations.en;
      showToast(dict.toast_loaded.replace('{sheets}', parsedWorkbook.SheetNames.length), 'check-circle-2');

    } catch (err) {
      console.error("Workbook parsing error:", err);
      const dict = translations[currentLang] || translations.en;
      showToast(dict.toast_error_load, 'alert-circle');
      resetWorkspace();
    }
  }

  // Render Sheet Selection Tabs Bar
  function renderSheetTabs() {
    sheetTabsBar.innerHTML = '';
    const sheetNames = parsedWorkbook.SheetNames;

    sheetNames.forEach((sheetName, index) => {
      const tabBtn = document.createElement('button');
      tabBtn.type = 'button';
      tabBtn.className = `sheet-tab-btn ${index === 0 ? 'active' : ''}`;
      tabBtn.dataset.sheet = sheetName;
      tabBtn.innerHTML = `
        <i data-lucide="sheet" style="width: 14px; height: 14px;"></i>
        <span>${escapeHtml(sheetName)}</span>
      `;

      tabBtn.addEventListener('click', () => {
        selectSheetTab(sheetName);
      });

      sheetTabsBar.appendChild(tabBtn);
    });

    if (window.lucide) lucide.createIcons();
  }

  // Switch Active Worksheet
  function selectSheetTab(sheetName) {
    activeSheetName = sheetName;

    // Update Tab UI
    sheetTabsBar.querySelectorAll('.sheet-tab-btn').forEach(btn => {
      if (btn.dataset.sheet === sheetName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    renderActiveSheetTablePreview(sheetName);
  }

  // Render HTML Table Preview for active sheet
  function renderActiveSheetTablePreview(sheetName) {
    if (!parsedWorkbook || !parsedWorkbook.Sheets[sheetName]) return;

    const worksheet = parsedWorkbook.Sheets[sheetName];
    const data = window.XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: "" });

    previewSheetTitle.textContent = sheetName;

    if (!data || data.length === 0) {
      previewDataTable.innerHTML = `<tr><td style="padding: 20px; text-align: center; color: var(--text-muted);">No data in worksheet</td></tr>`;
      previewDimensionsText.textContent = "0 rows × 0 columns";
      rowsCountText.textContent = "0 Rows";
      return;
    }

    const totalRows = data.length;
    const totalCols = Math.max(...data.map(r => (Array.isArray(r) ? r.length : 0)));

    previewDimensionsText.textContent = `${totalRows} rows × ${totalCols} columns`;
    const isAr = (currentLang === 'ar');
    rowsCountText.textContent = isAr ? `${totalRows} صفوف` : `${totalRows} Rows`;

    let html = '';

    // First row as table header
    const headerRow = data[0] || [];
    html += '<thead><tr>';
    for (let c = 0; c < totalCols; c++) {
      const val = headerRow[c] !== undefined ? headerRow[c] : `Col ${c + 1}`;
      html += `<th>${escapeHtml(String(val))}</th>`;
    }
    html += '</tr></thead>';

    // Body rows (render up to 40 rows for snappy preview)
    html += '<tbody>';
    const previewRows = data.slice(1, 41);
    previewRows.forEach(row => {
      html += '<tr>';
      for (let c = 0; c < totalCols; c++) {
        const val = (row && row[c] !== undefined) ? row[c] : "";
        html += `<td>${escapeHtml(String(val))}</td>`;
      }
      html += '</tr>';
    });

    if (totalRows > 41) {
      html += `<tr><td colspan="${totalCols}" style="text-align: center; color: var(--text-muted); font-style: italic; padding: 8px;">+ ${totalRows - 41} more rows will be included in the exported PDF</td></tr>`;
    }
    html += '</tbody>';

    previewDataTable.innerHTML = html;
  }

  // Update Workbook Metadata tags
  function updateWorkbookMetaInfo() {
    if (!parsedWorkbook) return;
    const isAr = (currentLang === 'ar');
    const sheetCount = parsedWorkbook.SheetNames.length;
    sheetsCountText.textContent = isAr
      ? `${sheetCount} أوراق`
      : `${sheetCount} ${sheetCount === 1 ? 'Sheet' : 'Sheets'}`;
  }

  // Escape HTML string helper
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Setup Event Listeners for Controls
  // 1. Orientation Toggle Buttons
  if (optOrientationLandscape && optOrientationPortrait) {
    optOrientationLandscape.addEventListener('click', () => {
      optOrientationLandscape.classList.add('active');
      optOrientationPortrait.classList.remove('active');
      settings.orientation = 'landscape';
    });

    optOrientationPortrait.addEventListener('click', () => {
      optOrientationPortrait.classList.add('active');
      optOrientationLandscape.classList.remove('active');
      settings.orientation = 'portrait';
    });
  }

  // 2. Select Page Size
  if (selectPageSize) {
    selectPageSize.addEventListener('change', () => {
      settings.pageSize = selectPageSize.value;
    });
  }

  // 3. Select Table Theme
  if (selectTableTheme) {
    selectTableTheme.addEventListener('change', () => {
      settings.theme = selectTableTheme.value;
    });
  }

  // 4. Repeat Headers & Fit Width Checkboxes
  if (checkRepeatHeaders) {
    checkRepeatHeaders.addEventListener('change', () => {
      settings.repeatHeaders = checkRepeatHeaders.checked;
    });
  }

  if (checkFitWidth) {
    checkFitWidth.addEventListener('change', () => {
      settings.fitWidth = checkFitWidth.checked;
    });
  }

  // Convert Workbook to PDF via jsPDF & jsPDF-AutoTable
  if (btnConvertExcel) {
    btnConvertExcel.addEventListener('click', async () => {
      if (!parsedWorkbook || isProcessing) return;

      if (!window.jspdf || !window.jspdf.jsPDF) {
        showToast("jsPDF library is loading, please try again in a moment.", "alert-circle");
        return;
      }

      const dict = translations[currentLang] || translations.en;

      try {
        isProcessing = true;
        btnConvertExcel.disabled = true;
        btnConvertSpinner.classList.remove('hidden');
        btnConvertIcon.classList.add('hidden');

        conversionProgress.classList.remove('hidden');
        progressBarFill.style.width = '15%';
        progressPercent.textContent = '15%';
        progressStatusText.textContent = dict.progress_converting;

        const { jsPDF } = window.jspdf;
        const pdfDoc = new jsPDF({
          orientation: settings.orientation,
          unit: 'pt',
          format: settings.pageSize
        });

        const sheetNames = parsedWorkbook.SheetNames;
        let isFirstSheet = true;

        for (let s = 0; s < sheetNames.length; s++) {
          const sName = sheetNames[s];
          const ws = parsedWorkbook.Sheets[sName];
          const rawData = window.XLSX.utils.sheet_to_json(ws, { header: 1, defval: "" });

          if (!rawData || rawData.length === 0) continue;

          // Add new page for subsequent sheets
          if (!isFirstSheet) {
            pdfDoc.addPage(settings.pageSize, settings.orientation);
          }
          isFirstSheet = false;

          // Header & Body rows
          const headerRow = rawData[0].map(cell => (cell !== undefined ? String(cell) : ""));
          const bodyRows = rawData.slice(1).map(row => {
            if (!Array.isArray(row)) return [];
            return row.map(cell => (cell !== undefined ? String(cell) : ""));
          });

          // Theme styling presets
          let headStyles = {
            fillColor: [16, 185, 129], // Emerald
            textColor: [255, 255, 255],
            fontStyle: 'bold',
            halign: 'left',
            fontSize: 9
          };

          let alternateRowStyles = {
            fillColor: [240, 253, 244]
          };

          let tableThemeStyle = 'grid';

          if (settings.theme === 'striped') {
            headStyles.fillColor = [51, 65, 85]; // Slate
            alternateRowStyles.fillColor = [248, 250, 252];
            tableThemeStyle = 'striped';
          } else if (settings.theme === 'plain') {
            headStyles.fillColor = [241, 245, 249];
            headStyles.textColor = [15, 23, 42];
            alternateRowStyles.fillColor = [255, 255, 255];
            tableThemeStyle = 'plain';
          }

          // Sheet Title Header
          pdfDoc.setFont('helvetica', 'bold');
          pdfDoc.setFontSize(14);
          pdfDoc.setTextColor(15, 23, 42);
          pdfDoc.text(sName, 40, 32);

          // Render AutoTable
          if (pdfDoc.autoTable) {
            pdfDoc.autoTable({
              head: [headerRow],
              body: bodyRows,
              startY: 45,
              theme: tableThemeStyle,
              headStyles: headStyles,
              alternateRowStyles: alternateRowStyles,
              styles: {
                font: 'helvetica',
                fontSize: 8.5,
                cellPadding: 5,
                overflow: 'linebreak'
              },
              showHead: settings.repeatHeaders ? 'everyPage' : 'firstPage',
              margin: { left: 40, right: 40, bottom: 40 }
            });
          }

          // Progress update
          const pct = Math.floor(20 + ((s + 1) / sheetNames.length * 70));
          progressBarFill.style.width = `${pct}%`;
          progressPercent.textContent = `${pct}%`;
        }

        // Add page numbers at the bottom of each page
        const totalPages = pdfDoc.internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
          pdfDoc.setPage(i);
          pdfDoc.setFont('helvetica', 'normal');
          pdfDoc.setFontSize(8.5);
          pdfDoc.setTextColor(148, 163, 184);

          const pageWidth = pdfDoc.internal.pageSize.getWidth();
          const pageHeight = pdfDoc.internal.pageSize.getHeight();
          const pageNumStr = `Page ${i} of ${totalPages} • PDFNetizen`;
          pdfDoc.text(pageNumStr, pageWidth / 2, pageHeight - 15, { align: 'center' });
        }

        progressBarFill.style.width = '100%';
        progressPercent.textContent = '100%';
        progressStatusText.textContent = dict.progress_complete;

        // Compile PDF Blob
        const pdfBlob = pdfDoc.output('blob');
        if (compiledPdfBlobUrl) {
          URL.revokeObjectURL(compiledPdfBlobUrl);
        }
        compiledPdfBlobUrl = URL.createObjectURL(pdfBlob);

        let outName = (outputFilenameInput && outputFilenameInput.value.trim()) || `${docFileName}`;
        if (!outName.toLowerCase().endsWith('.pdf')) {
          outName += '.pdf';
        }

        // Setup Success Card
        pdfFilenameDisplay.textContent = outName;
        pdfFilesizeDisplay.textContent = formatBytes(pdfBlob.size);

        btnDownloadPdf.onclick = () => {
          const a = document.createElement('a');
          a.href = compiledPdfBlobUrl;
          a.download = outName;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        };

        // Automatic Download trigger
        btnDownloadPdf.click();

        // Reveal Success Card
        successDownloadCard.classList.remove('hidden');
        successDownloadCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        showToast(dict.toast_converted, 'check-circle-2');

      } catch (err) {
        console.error("Error generating PDF:", err);
        showToast(dict.toast_error_convert, 'alert-circle');
      } finally {
        isProcessing = false;
        btnConvertExcel.disabled = false;
        btnConvertSpinner.classList.add('hidden');
        btnConvertIcon.classList.remove('hidden');
        setTimeout(() => {
          conversionProgress.classList.add('hidden');
        }, 2000);
      }
    });
  }

  // Reset Entire Workspace
  function resetWorkspace() {
    parsedWorkbook = null;
    docFileName = "spreadsheet";
    activeSheetName = "";

    if (compiledPdfBlobUrl) {
      URL.revokeObjectURL(compiledPdfBlobUrl);
      compiledPdfBlobUrl = null;
    }

    if (fileInput) fileInput.value = '';
    if (outputFilenameInput) outputFilenameInput.value = '';
    if (sheetTabsBar) sheetTabsBar.innerHTML = '';
    if (previewDataTable) previewDataTable.innerHTML = '';

    if (workspacePanel) workspacePanel.classList.add('hidden');
    if (successDownloadCard) successDownloadCard.classList.add('hidden');
    if (conversionProgress) conversionProgress.classList.add('hidden');
    if (dropzone) dropzone.classList.remove('hidden');
    if (btnHeaderReset) btnHeaderReset.disabled = true;
    if (btnConvertExcel) btnConvertExcel.disabled = false;
  }

  // Cookie Consent Handler
  const cookieBanner = document.getElementById('cookie-banner');
  const btnAcceptCookies = document.getElementById('btn-accept-cookies');

  if (localStorage.getItem('pdfnetizen_cookie_consent') === 'accepted') {
    if (cookieBanner) cookieBanner.classList.add('hidden');
  }

  if (btnAcceptCookies && cookieBanner) {
    btnAcceptCookies.addEventListener('click', () => {
      localStorage.setItem('pdfnetizen_cookie_consent', 'accepted');
      cookieBanner.style.opacity = '0';
      cookieBanner.style.transform = (document.documentElement.dir === 'rtl')
        ? 'translate(50%, 20px)'
        : 'translate(-50%, 20px)';
      setTimeout(() => {
        cookieBanner.classList.add('hidden');
      }, 300);
    });
  }

  // Initial Lucide Icons Activation
  if (window.lucide) {
    lucide.createIcons();
  }

})();
