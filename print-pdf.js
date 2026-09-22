/**
 * ==========================================================================
 * print-pdf.js - Direct In-Browser PDF Printing Engine
 * Powered by Mozilla PDF.js & PDF-Lib
 * 100% Client-Side Privacy • Zero Server Uploads • Flexible Page Range Filter
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
      breadcrumb_current: "Print PDF",
      hero_badge: "100% Client-Side • Instant Direct Printing • Zero Server Uploads",
      hero_title: 'Print <span class="gradient-text">PDF Directly</span>',
      hero_subtitle: "Print entire PDF documents or selected page ranges directly from your browser with complete privacy and zero cloud uploads.",
      dropzone_title: "Drop your PDF file here to print",
      dropzone_desc: "Drag & drop any PDF document to inspect thumbnails, select custom print ranges, and print directly.",
      btn_browse: "Browse PDF File",
      btn_browse_label: "Browse PDF File",
      btn_sample: "Try Sample PDF",
      btn_sample_label: "Try Sample PDF",
      btn_print_now: "Print Document",
      btn_print_now_label: "Print Document",
      btn_open_tab: "Open in Print Tab",
      btn_open_tab_label: "Open in Print Tab",
      btn_change_file: "Change PDF",
      btn_change_file_label: "Change PDF",
      label_page_range: "Print Range:",
      preset_all: "All Pages",
      preset_odd: "Odd Pages Only",
      preset_even: "Even Pages Only",
      preset_custom: "Custom Range",
      placeholder_range: "e.g. 1-3, 5",
      selected_badge_text: "{selected} of {total} Pages",
      btn_select_all: "Select All",
      btn_deselect_all: "Deselect All",
      preview_title: "Page Layout Preview",
      preview_tip: "Click any page card to toggle its print selection",
      card_page_num: "Page {num}",
      ad_space_label: "Advertisement Space (728x90)",
      guide_h2: "4 Easy Steps to Print PDF Documents Online",
      guide_subtitle: "Print entire PDF files or tailored page ranges directly to your local printer with 100% privacy and zero server latency.",
      step1_title: "1. Upload PDF",
      step1_desc: "Drag and drop your PDF file into the dropzone or choose a document from your computer or phone.",
      step2_title: "2. Preview Live Thumbnails",
      step2_desc: "Review high-resolution page thumbnails locally rendered inside your browser via Mozilla PDF.js.",
      step3_title: "3. Configure Print Range",
      step3_desc: "Choose All Pages, Odd/Even presets, type a custom range (e.g. 1-4, 7), or click cards to select pages.",
      step4_title: "4. Trigger Direct Print",
      step4_desc: "Click 'Print Document' to trigger your operating system's native printer dialog instantly.",
      features_h2: "Why Print PDF Files with PDF Netizen?",
      features_subtitle: "Designed for maximum privacy, razor-sharp vector output, and effortless printing across all modern devices.",
      fb_privacy_title: "100% Client-Side Privacy",
      fb_privacy_desc: "All printing runs locally in your browser memory via temporary Blob URLs. No document data is ever sent to any remote server.",
      fb_direct_title: "Direct In-Browser Printing",
      fb_direct_desc: "Triggers your operating system's native printer dialog through a silent, background iframe mechanism in milliseconds.",
      fb_range_title: "Flexible Page Range Subsets",
      fb_range_desc: "Filter out unnecessary pages before sending to print using Odd/Even presets, custom intervals, or direct visual selection.",
      fb_vector_title: "Lossless Vector Fidelity",
      fb_vector_desc: "Preserves original vector lines, embedded color profiles, and sharp typographic fonts for pristine paper printing quality.",
      fb_cross_title: "Universal Cross-Device Compatibility",
      fb_cross_desc: "Works seamlessly on desktop computers, MacBooks, iPads, iPhones, and Android smartphones with reliable mobile fallbacks.",
      fb_free_title: "Completely Free & Unlimited",
      fb_free_desc: "Zero registration, no daily printing limits, and no added watermarks. Enjoy unlimited document printing forever.",
      faq_h2: "Frequently Asked Questions",
      faq_subtitle: "Common questions about printing PDF files securely directly in your browser.",
      faq_q1: "How do I print a PDF file directly in my browser?",
      faq_a1: "Drag and drop your PDF into the upload dropzone. Select your desired page range (All pages, Odd, Even, or a custom range like 1-3, 5), review the live thumbnail preview, and click 'Print Document'. The browser's native print dialog opens instantly.",
      faq_q2: "Are my confidential files uploaded to any external server?",
      faq_a2: "No. All PDF processing and printing occurs 100% locally in your web browser using in-memory Blob URLs and Mozilla PDF.js. Your documents never leave your computer or phone.",
      faq_q3: "Can I print only specific pages instead of the whole document?",
      faq_a3: "Yes! You can choose quick presets (Odd or Even pages), type a custom range (e.g. 1-4, 7), or click directly on individual page thumbnail cards to toggle their selection before printing.",
      faq_q4: "Does direct printing affect vector quality or text sharpness?",
      faq_a4: "Not at all. The tool passes the original raw PDF vector stream directly to the printer subsystem, ensuring crystal-clear text, sharp diagrams, and 100% vector fidelity.",
      cookie_consent_text: "We use cookies to ensure optimal functionality and analyze traffic in compliance with privacy policies.",
      cookie_learn_more: "Learn more",
      cookie_accept_btn: "Accept & Close",
      footer_tagline: "100% Client-side, private, and secure document processing directly in your browser.",
      footer_privacy: "Privacy Policy",
      footer_terms: "Terms of Service",
      footer_contact: "Contact Us",
      footer_copyright: "© 2026 PDF Netizen. All rights reserved.",
      toast_loaded: "PDF loaded successfully: {pages} pages available.",
      toast_sample_loaded: "Sample 3-page business document generated and loaded!",
      toast_invalid_pdf: "Invalid PDF file. Please select a valid document.",
      toast_printing_initiated: "Printer dialog opened!",
      toast_error_range: "Invalid page range format. Please use numbers and hyphens (e.g. 1-3, 5).",
      toast_no_pages_selected: "Please select at least one page to print.",
      toast_tab_opened: "PDF opened in print-ready tab!"
    },
    ar: {
      badge_client_side: "100% معالجة محلية",
      nav_home: "الرئيسية",
      breadcrumb_home: "الرئيسية",
      breadcrumb_current: "طباعة PDF",
      hero_badge: "100% معالجة داخل المتصفح • طباعة فورية ومباشرة • بدون رفع على خوادم",
      hero_title: 'طباعة <span class="gradient-text">PDF مباشرة</span>',
      hero_subtitle: "اطبع مستندات PDF بالكامل أو صفحات محددة مباشرة من متصفحك بخصوصية مطلقة ودون رفع أي بيانات للسحابة.",
      dropzone_title: "اسحب وأفلت ملف PDF هنا للطباعة",
      dropzone_desc: "اسحب أي مستند PDF لمعاينة الصفحات واختيار نطاق الطباعة وبدء الطباعة فورياً.",
      btn_browse: "استعراض ملف PDF",
      btn_browse_label: "استعراض ملف PDF",
      btn_sample: "تجربة ملف نموذجي",
      btn_sample_label: "تجربة ملف نموذجي",
      btn_print_now: "طباعة المستند",
      btn_print_now_label: "طباعة المستند",
      btn_open_tab: "فتح في تبويب للطباعة",
      btn_open_tab_label: "فتح في تبويب للطباعة",
      btn_change_file: "تغيير المستند",
      btn_change_file_label: "تغيير المستند",
      label_page_range: "نطاق الطباعة:",
      preset_all: "كافة الصفحات",
      preset_odd: "الصفحات الفردية فقط",
      preset_even: "الصفحات الزوجية فقط",
      preset_custom: "نطاق مخصص",
      placeholder_range: "مثال: 1-3, 5",
      selected_badge_text: "تم تحديد {selected} من أصل {total} صفحات",
      btn_select_all: "تحديد الكل",
      btn_deselect_all: "إلغاء التحديد",
      preview_title: "معاينة تصميم الصفحات",
      preview_tip: "انقر على أي بطاقة صفحة لتحديدها أو استبعادها من الطباعة",
      card_page_num: "الصفحة {num}",
      ad_space_label: "مساحة إعلانية (728×90)",
      guide_h2: "4 خطوات سهلة لطباعة ملفات PDF مباشرة أونلاين",
      guide_subtitle: "اطبع مستندات PDF بالكامل أو نطاقات مخصصة مباشرة عبر طابعتك المحلية بخصوصية 100% وبدون تأخير.",
      step1_title: "1. رفع ملف PDF",
      step1_desc: "اسحب وأفلت مستند PDF داخل منطقة الرفع أو اختره مباشرة من جهازك.",
      step2_title: "2. معاينة الصفحات",
      step2_desc: "استعرض مصغرات الصفحات عالية الدقة التي يتم رسمها محلياً داخل المتصفح عبر Mozilla PDF.js.",
      step3_title: "3. ضبط نطاق الطباعة",
      step3_desc: "اختر طباعة الكل، الصفحات الفردية/الزوجية، أو اكتب نطاقاً مخصصاً (مثل 1-4, 7).",
      step4_title: "4. بدء الطباعة الفورية",
      step4_desc: "انقر على 'طباعة المستند' لفتح نافذة الطباعة الخاصة بنظام التشغيل فورياً.",
      features_h2: "لماذا تطبع ملفات PDF عبر PDF Netizen؟",
      features_subtitle: "مصممة للخصوصية القصوى والوضوح المتجهي الفائق والطباعة السلسة عبر جميع الأجهزة.",
      fb_privacy_title: "خصوصية محلية 100%",
      fb_privacy_desc: "تتم كافة عمليات الطباعة محلياً في ذاكرة متصفحك عبر روابط Blob المؤقتة دون رفع أي مستندات لخوادم خارجية.",
      fb_direct_title: "طباعة مباشرة داخل المتصفح",
      fb_direct_desc: "استدعاء نافذة الطباعة الرسمية لنظامك في أجزاء من الثانية عبر آلية الإطار الخفي المباشرة.",
      fb_range_title: "تخصيص نطاق الصفحات",
      fb_range_desc: "استبعد الصفحات غير المطلوبة قبل الطباعة باستخدام الخيارات الجاهزة أو التحديد البصري المباشر.",
      fb_vector_title: "دقة وجودة متجهية أصلية",
      fb_vector_desc: "الحفاظ على وضوح الخطوط ودقة الأشكال والرسومات البيانية لأفضل جودة طباعة على الورق.",
      fb_cross_title: "توافق شامل مع كافة الأجهزة",
      fb_cross_desc: "يعمل بسلاسة على الحواسيب الشخصية، أجهزة الماك، الآيباد، هواتف الآيفون والأندرويد.",
      fb_free_title: "مجاني بالكامل وبلا حدود",
      fb_free_desc: "بدون تسجيل، بدون قيود يومية، وبدون أي علامات مائية مضافة على مستنداتك.",
      faq_h2: "الأسئلة الشائعة",
      faq_subtitle: "كل ما تحتاج معرفته حول طباعة ملفات PDF بأمان ومباشرة عبر المتصفح.",
      faq_q1: "كيف أطبع ملف PDF مباشرة من المتصفح؟",
      faq_a1: "اسحب ملف الـ PDF وأفلته داخل منطقة الرفع، حدد نطاق الصفحات المراد طباعتها، راجع المعاينة البصرية، ثم انقر على 'طباعة المستند' لتفتح نافذة الطابعة فورياً.",
      faq_q2: "هل يتم رفع ملفاتي الخاصة إلى أي خادم خارجي؟",
      faq_a2: "أبداً. تتم كافة عمليات المعالجة محلياً داخل جهازك عبر روابط Blob المشفرة داخل الذاكرة دون أي اتصال بخوادم خارجية.",
      faq_q3: "هل يمكنني طباعة صفحات معينة فقط بدلاً من المستند كاملاً؟",
      faq_a3: "نعم! يمكنك اختيار الصفحات الفردية أو الزوجية، كتابة نطاق مخصص (مثل 1-3, 5)، أو النقر مباشرة على صور الصفحات لتحديدها.",
      faq_q4: "هل تؤثر الطباعة المباشرة على جودة النصوص والخطوط؟",
      faq_a4: "كلا، يقوم المحرك بنقل البث المتجهي الأصلي للمستند مباشرة إلى نظام الطباعة، مما يضمن أعلى دقة ووضوح للخطوط والرسوم.",
      cookie_consent_text: "نحن نستخدم ملفات تعريف الارتباط لتحسين تجربتك وتوفير أفضل أداء وفقاً لسياسات الخصوصية.",
      cookie_learn_more: "معرفة المزيد",
      cookie_accept_btn: "قبول وإغلاق",
      footer_tagline: "معالجة مستندات محلية 100%، خاصة وآمنة تماماً مباشرة داخل متصفحك.",
      footer_privacy: "سياسة الخصوصية",
      footer_terms: "شروط الخدمة",
      footer_contact: "اتصل بنا",
      footer_copyright: "© 2026 PDF Netizen. جميع الحقوق محفوظة.",
      toast_loaded: "تم تحميل ملف PDF بنجاح: {pages} صفحة متوفرة.",
      toast_sample_loaded: "تم إنشاء وتحميل مستند نموذجي مكون من 3 صفحات!",
      toast_invalid_pdf: "ملف PDF غير صالح. يرجى اختيار مستند صحيح.",
      toast_printing_initiated: "تم فتح نافذة الطابعة بنجاح!",
      toast_error_range: "صيغة نطاق الصفحات غير صحيحة. يرجى استخدام أرقام وشرطات (مثال: 1-3, 5).",
      toast_no_pages_selected: "يرجى تحديد صفحة واحدة على الأقل للطباعة.",
      toast_tab_opened: "تم فتح المستند في تبويب جاهز للطباعة!"
    }
  };

  // State
  let currentLang = 'en';
  let currentPdfBytes = null;
  let currentPdfDoc = null;
  let totalPages = 0;
  let selectedPages = new Set(); // 1-based page numbers
  let currentRangeMode = 'all'; // 'all' | 'odd' | 'even' | 'custom'
  let fileName = 'document.pdf';
  let fileSize = 0;

  // DOM Elements
  const uploadSection = document.getElementById('upload-section');
  const workspaceArea = document.getElementById('workspace-area');
  const dropzone = document.getElementById('dropzone');
  const fileInput = document.getElementById('file-input');
  const btnBrowse = document.getElementById('btn-browse');
  const btnSamplePdf = document.getElementById('btn-sample-pdf');
  const docNameEl = document.getElementById('doc-name');
  const docMetaEl = document.getElementById('doc-meta');
  const btnDirectPrint = document.getElementById('btn-direct-print');
  const btnOpenTab = document.getElementById('btn-open-tab');
  const btnChangeFile = document.getElementById('btn-change-file');
  const customRangeBox = document.getElementById('custom-range-box');
  const customRangeInput = document.getElementById('custom-range-input');
  const selectedCountBadge = document.getElementById('selected-count-badge');
  const btnSelectAll = document.getElementById('btn-select-all');
  const btnDeselectAll = document.getElementById('btn-deselect-all');
  const thumbnailsGrid = document.getElementById('thumbnails-grid');
  const presetChips = document.querySelectorAll('.preset-chip');

  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  const toastIcon = document.getElementById('toast-icon');

  // Format File Size
  function formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  // Toast System
  let toastTimer = null;
  function showToast(msg, icon = 'info') {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = msg;
    if (toastIcon && window.lucide) {
      toastIcon.setAttribute('data-lucide', icon);
      window.lucide.createIcons({ root: toast });
    }
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3800);
  }

  // Translation System
  function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    const langToggleText = document.getElementById('lang-toggle-text');
    if (langToggleText) {
      langToggleText.textContent = lang === 'ar' ? 'English' : 'العربية';
    }

    const dict = translations[lang] || translations.en;

    // Apply data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        if (el.tagName === 'INPUT' && (el.type === 'button' || el.type === 'submit')) {
          el.value = dict[key];
        } else {
          el.innerHTML = dict[key];
        }
      }
    });

    // Apply data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key]) {
        el.placeholder = dict[key];
      }
    });

    updateCountBadge();

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // Range String Parser (e.g. "1-3, 5, 8") -> Set of 1-based page numbers
  function parseRangeString(str, maxPages) {
    const result = new Set();
    if (!str || !str.trim()) return result;

    const parts = str.split(',');
    for (const part of parts) {
      const trimmed = part.trim();
      if (!trimmed) continue;

      if (trimmed.includes('-')) {
        const range = trimmed.split('-');
        if (range.length === 2) {
          const start = parseInt(range[0], 10);
          const end = parseInt(range[1], 10);
          if (!isNaN(start) && !isNaN(end) && start <= end) {
            for (let i = Math.max(1, start); i <= Math.min(maxPages, end); i++) {
              result.add(i);
            }
          }
        }
      } else {
        const num = parseInt(trimmed, 10);
        if (!isNaN(num) && num >= 1 && num <= maxPages) {
          result.add(num);
        }
      }
    }
    return result;
  }

  // Set of numbers -> Concise string (e.g. [1,2,3,5] -> "1-3, 5")
  function formatRangeSet(set) {
    const arr = Array.from(set).sort((a, b) => a - b);
    if (arr.length === 0) return '';

    const ranges = [];
    let start = arr[0];
    let end = arr[0];

    for (let i = 1; i < arr.length; i++) {
      if (arr[i] === end + 1) {
        end = arr[i];
      } else {
        ranges.push(start === end ? `${start}` : `${start}-${end}`);
        start = arr[i];
        end = arr[i];
      }
    }
    ranges.push(start === end ? `${start}` : `${start}-${end}`);
    return ranges.join(', ');
  }

  // Update Page Selection UI & Badges
  function updateSelectionUI() {
    // Update thumbnail card classes
    document.querySelectorAll('.page-card').forEach(card => {
      const pageNum = parseInt(card.getAttribute('data-page'), 10);
      const isSelected = selectedPages.has(pageNum);
      card.classList.toggle('selected', isSelected);
      card.classList.toggle('disabled', !isSelected);
      const checkbox = card.querySelector('.page-checkbox');
      if (checkbox) checkbox.checked = isSelected;
    });

    updateCountBadge();
  }

  function updateCountBadge() {
    if (!selectedCountBadge) return;
    const dict = translations[currentLang] || translations.en;
    selectedCountBadge.textContent = dict.selected_badge_text
      .replace('{selected}', selectedPages.size)
      .replace('{total}', totalPages);
  }

  // Apply Range Preset
  function applyPreset(mode) {
    currentRangeMode = mode;
    presetChips.forEach(chip => {
      chip.classList.toggle('active', chip.getAttribute('data-range-mode') === mode);
    });

    if (mode === 'all') {
      customRangeBox.style.display = 'none';
      selectedPages.clear();
      for (let i = 1; i <= totalPages; i++) selectedPages.add(i);
    } else if (mode === 'odd') {
      customRangeBox.style.display = 'none';
      selectedPages.clear();
      for (let i = 1; i <= totalPages; i += 2) selectedPages.add(i);
    } else if (mode === 'even') {
      customRangeBox.style.display = 'none';
      selectedPages.clear();
      for (let i = 2; i <= totalPages; i += 2) selectedPages.add(i);
    } else if (mode === 'custom') {
      customRangeBox.style.display = 'flex';
      customRangeInput.value = formatRangeSet(selectedPages);
    }

    updateSelectionUI();
  }

  // Load and Render PDF Document
  async function loadPDF(arrayBuffer, name, size) {
    try {
      currentPdfBytes = arrayBuffer;
      fileName = name || 'document.pdf';
      fileSize = size || arrayBuffer.byteLength;

      const pdfDoc = await window.pdfjsLib.getDocument({ data: arrayBuffer.slice(0) }).promise;
      currentPdfDoc = pdfDoc;
      totalPages = pdfDoc.numPages;

      docNameEl.textContent = fileName;
      docMetaEl.textContent = `${formatBytes(fileSize)} • ${totalPages} ${totalPages === 1 ? 'Page' : 'Pages'}`;

      // Initialize selected pages (all by default)
      selectedPages.clear();
      for (let i = 1; i <= totalPages; i++) {
        selectedPages.add(i);
      }

      applyPreset('all');

      uploadSection.style.display = 'none';
      workspaceArea.classList.add('active');

      await renderThumbnails();

      const dict = translations[currentLang] || translations.en;
      showToast(dict.toast_loaded.replace('{pages}', totalPages), 'check-circle');
    } catch (err) {
      console.error('Error loading PDF:', err);
      const dict = translations[currentLang] || translations.en;
      showToast(dict.toast_invalid_pdf, 'alert-triangle');
    }
  }

  // Render Page Thumbnails in Grid
  async function renderThumbnails() {
    if (!currentPdfDoc || !thumbnailsGrid) return;
    thumbnailsGrid.innerHTML = '';

    const dpr = window.devicePixelRatio || 1;

    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
      const page = await currentPdfDoc.getPage(pageNum);
      const viewport = page.getViewport({ scale: 0.35 * dpr });

      const card = document.createElement('div');
      card.className = 'page-card selected';
      card.setAttribute('data-page', pageNum);

      const canvasWrapper = document.createElement('div');
      canvasWrapper.className = 'page-canvas-wrapper';

      const canvas = document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      canvas.style.width = `${viewport.width / dpr}px`;
      canvas.style.height = `${viewport.height / dpr}px`;

      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      canvasWrapper.appendChild(canvas);

      // Render thumbnail asynchronously
      page.render({ canvasContext: ctx, viewport }).promise.catch(e => console.error(e));

      // Card footer with page number & checkbox
      const footer = document.createElement('div');
      footer.className = 'page-card-footer';

      const pageLabel = document.createElement('span');
      pageLabel.textContent = (translations[currentLang].card_page_num || 'Page {num}').replace('{num}', pageNum);

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'page-checkbox';
      checkbox.checked = true;

      footer.appendChild(pageLabel);
      footer.appendChild(checkbox);

      card.appendChild(canvasWrapper);
      card.appendChild(footer);

      // Click card to toggle selection
      card.addEventListener('click', (e) => {
        if (e.target === checkbox) {
          if (checkbox.checked) selectedPages.add(pageNum);
          else selectedPages.delete(pageNum);
        } else {
          if (selectedPages.has(pageNum)) {
            selectedPages.delete(pageNum);
          } else {
            selectedPages.add(pageNum);
          }
        }

        currentRangeMode = 'custom';
        presetChips.forEach(chip => chip.classList.toggle('active', chip.getAttribute('data-range-mode') === 'custom'));
        customRangeBox.style.display = 'flex';
        customRangeInput.value = formatRangeSet(selectedPages);

        updateSelectionUI();
      });

      thumbnailsGrid.appendChild(card);
    }
  }

  // Print Document (Direct Iframe or Open Tab)
  async function printDocument(openInTab = false) {
    if (!currentPdfBytes) return;

    const dict = translations[currentLang] || translations.en;

    if (selectedPages.size === 0) {
      showToast(dict.toast_no_pages_selected, 'alert-circle');
      return;
    }

    try {
      let bytesToPrint = currentPdfBytes;

      // If a subset is selected, build filtered PDF via PDF-Lib
      if (selectedPages.size < totalPages) {
        showToast('Filtering pages for print...', 'sliders-horizontal');
        const pdfLib = window.PDFLib || (typeof PDFLib !== 'undefined' ? PDFLib : null);
        if (!pdfLib) {
          throw new Error('PDF-Lib is not initialized');
        }

        const srcDoc = await pdfLib.PDFDocument.load(currentPdfBytes.slice(0));
        const printDoc = await pdfLib.PDFDocument.create();

        const sortedPageIndices = Array.from(selectedPages)
          .sort((a, b) => a - b)
          .map(p => p - 1); // 0-based for PDF-Lib

        const copiedPages = await printDoc.copyPages(srcDoc, sortedPageIndices);
        copiedPages.forEach(page => printDoc.addPage(page));

        bytesToPrint = await printDoc.save();
      }

      const blob = new Blob([bytesToPrint], { type: 'application/pdf' });
      const blobUrl = URL.createObjectURL(blob);

      if (openInTab) {
        window.open(blobUrl, '_blank');
        showToast(dict.toast_tab_opened, 'external-link');
        return;
      }

      // Direct iframe printing mechanism
      const iframe = document.createElement('iframe');
      iframe.style.position = 'fixed';
      iframe.style.right = '0';
      iframe.style.bottom = '0';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = '0';
      iframe.style.visibility = 'hidden';
      iframe.src = blobUrl;
      document.body.appendChild(iframe);

      iframe.onload = () => {
        setTimeout(() => {
          try {
            iframe.contentWindow.focus();
            iframe.contentWindow.print();
            showToast(dict.toast_printing_initiated, 'printer');
          } catch (e) {
            console.warn('Direct iframe print blocked by browser sandbox. Fallback to open tab:', e);
            window.open(blobUrl, '_blank');
          }
        }, 350);
      };

      // Clean up iframe and object URL after delay
      setTimeout(() => {
        try {
          document.body.removeChild(iframe);
          URL.revokeObjectURL(blobUrl);
        } catch (e) {}
      }, 45000);

    } catch (err) {
      console.error('Error preparing print document:', err);
      showToast('Error preparing document for printing', 'alert-triangle');
    }
  }

  // Generate Sample Multi-Page PDF Document via PDF-Lib
  async function generateSampleDocument() {
    const pdfLib = window.PDFLib || (typeof PDFLib !== 'undefined' ? PDFLib : null);
    if (!pdfLib) {
      showToast('PDF-Lib is initializing. Please try again.', 'alert-circle');
      return;
    }

    try {
      showToast('Generating sample 3-page document...', 'sparkles');

      const sampleDoc = await pdfLib.PDFDocument.create();
      const font = await sampleDoc.embedFont(pdfLib.StandardFonts.Helvetica);
      const fontBold = await sampleDoc.embedFont(pdfLib.StandardFonts.HelveticaBold);

      // Page 1: Official Corporate Invoice
      const p1 = sampleDoc.addPage([595, 842]); // A4
      p1.drawText('INVOICE / BILLING STATEMENT', { x: 50, y: 780, size: 20, font: fontBold, color: pdfLib.rgb(0.06, 0.09, 0.16) });
      p1.drawText('Invoice Number: #INV-2026-8942', { x: 50, y: 755, size: 10, font, color: pdfLib.rgb(0.4, 0.45, 0.55) });
      p1.drawText('Issue Date: September 22, 2026', { x: 380, y: 755, size: 10, font, color: pdfLib.rgb(0.4, 0.45, 0.55) });
      p1.drawLine({ start: { x: 50, y: 740 }, end: { x: 545, y: 740 }, thickness: 1.5, color: pdfLib.rgb(0.06, 0.72, 0.5) });

      p1.drawText('Billed To: Global Tech Enterprises LLC', { x: 50, y: 705, size: 11, font: fontBold, color: pdfLib.rgb(0.1, 0.15, 0.25) });
      p1.drawText('Client Account: #ACC-908124', { x: 50, y: 690, size: 10, font, color: pdfLib.rgb(0.3, 0.35, 0.45) });

      // Table Box
      p1.drawRectangle({ x: 50, y: 520, width: 495, height: 140, borderColor: pdfLib.rgb(0.85, 0.88, 0.92), borderWidth: 1, color: pdfLib.rgb(0.98, 0.99, 1.0) });
      p1.drawText('Description', { x: 65, y: 635, size: 11, font: fontBold, color: pdfLib.rgb(0.1, 0.15, 0.25) });
      p1.drawText('Qty', { x: 340, y: 635, size: 11, font: fontBold, color: pdfLib.rgb(0.1, 0.15, 0.25) });
      p1.drawText('Amount', { x: 460, y: 635, size: 11, font: fontBold, color: pdfLib.rgb(0.1, 0.15, 0.25) });
      p1.drawLine({ start: { x: 50, y: 620 }, end: { x: 545, y: 620 }, thickness: 1, color: pdfLib.rgb(0.85, 0.88, 0.92) });

      p1.drawText('Enterprise Cloud PDF Processing License', { x: 65, y: 595, size: 10, font, color: pdfLib.rgb(0.2, 0.25, 0.35) });
      p1.drawText('1', { x: 345, y: 595, size: 10, font, color: pdfLib.rgb(0.2, 0.25, 0.35) });
      p1.drawText('$4,500.00', { x: 460, y: 595, size: 10, font: fontBold, color: pdfLib.rgb(0.2, 0.25, 0.35) });

      p1.drawText('Priority Client Technical SLA (Annual)', { x: 65, y: 565, size: 10, font, color: pdfLib.rgb(0.2, 0.25, 0.35) });
      p1.drawText('1', { x: 345, y: 565, size: 10, font, color: pdfLib.rgb(0.2, 0.25, 0.35) });
      p1.drawText('$1,200.00', { x: 460, y: 565, size: 10, font: fontBold, color: pdfLib.rgb(0.2, 0.25, 0.35) });

      p1.drawText('Total Paid: $5,700.00 USD', { x: 360, y: 480, size: 14, font: fontBold, color: pdfLib.rgb(0.06, 0.72, 0.5) });

      // Page 2: Service Terms & Conditions
      const p2 = sampleDoc.addPage([595, 842]);
      p2.drawText('TERMS OF SERVICE & PRIVACY POLICY', { x: 50, y: 780, size: 18, font: fontBold, color: pdfLib.rgb(0.06, 0.09, 0.16) });
      p2.drawText('Document ID: #TOS-SEC-2026', { x: 50, y: 755, size: 10, font, color: pdfLib.rgb(0.4, 0.45, 0.55) });
      p2.drawLine({ start: { x: 50, y: 740 }, end: { x: 545, y: 740 }, thickness: 1.5, color: pdfLib.rgb(0.06, 0.72, 0.5) });

      p2.drawText('1. Privacy & Client-Side Execution Guarantee', { x: 50, y: 705, size: 12, font: fontBold, color: pdfLib.rgb(0.1, 0.15, 0.25) });
      p2.drawText('All document manipulation algorithms execute directly inside the end-user browser sandbox.', { x: 50, y: 685, size: 10, font, color: pdfLib.rgb(0.25, 0.3, 0.4) });
      p2.drawText('No confidential records or payload packets are ever uploaded to external cloud storage.', { x: 50, y: 670, size: 10, font, color: pdfLib.rgb(0.25, 0.3, 0.4) });

      p2.drawText('2. SLA & Printing Standards', { x: 50, y: 630, size: 12, font: fontBold, color: pdfLib.rgb(0.1, 0.15, 0.25) });
      p2.drawText('Documents printed via PDF Netizen adhere to international ISO 32000 PDF standards.', { x: 50, y: 610, size: 10, font, color: pdfLib.rgb(0.25, 0.3, 0.4) });
      p2.drawText('Fonts and vector path elements maintain 100% precision across color and thermal printers.', { x: 50, y: 595, size: 10, font, color: pdfLib.rgb(0.25, 0.3, 0.4) });

      // Page 3: Compliance & Verification Certificate
      const p3 = sampleDoc.addPage([595, 842]);
      p3.drawRectangle({ x: 35, y: 35, width: 525, height: 772, borderColor: pdfLib.rgb(0.06, 0.72, 0.5), borderWidth: 2, color: pdfLib.rgb(0.99, 1.0, 0.99) });
      p3.drawText('CERTIFICATE OF VERIFICATION', { x: 130, y: 720, size: 22, font: fontBold, color: pdfLib.rgb(0.05, 0.5, 0.35) });
      p3.drawText('Client-Side Cryptographic & Security Verification', { x: 165, y: 690, size: 11, font, color: pdfLib.rgb(0.3, 0.35, 0.45) });

      p3.drawText('This certifies that all document processing operations adhere to zero-data-leakage principles.', { x: 60, y: 620, size: 10, font, color: pdfLib.rgb(0.2, 0.25, 0.35) });
      p3.drawText('Verified By: Netizen Compliance Officer', { x: 60, y: 500, size: 11, font: fontBold, color: pdfLib.rgb(0.1, 0.15, 0.25) });
      p3.drawText('Signature: __________________________', { x: 60, y: 460, size: 11, font, color: pdfLib.rgb(0.3, 0.35, 0.45) });

      const sampleBytes = await sampleDoc.save();
      await loadPDF(sampleBytes, 'Sample-Business-Document.pdf', sampleBytes.byteLength);

      const dict = translations[currentLang] || translations.en;
      showToast(dict.toast_sample_loaded, 'sparkles');
    } catch (err) {
      console.error('Error creating sample document:', err);
      showToast('Error generating sample document', 'alert-triangle');
    }
  }

  // Reset Document State
  function resetDocument() {
    currentPdfBytes = null;
    currentPdfDoc = null;
    totalPages = 0;
    selectedPages.clear();
    fileInput.value = '';
    thumbnailsGrid.innerHTML = '';
    workspaceArea.classList.remove('active');
    uploadSection.style.display = 'block';
  }

  // Event Listeners
  function initEvents() {
    // Language Toggle
    const btnLanguageToggle = document.getElementById('btn-language-toggle');
    if (btnLanguageToggle) {
      btnLanguageToggle.addEventListener('click', () => {
        setLanguage(currentLang === 'en' ? 'ar' : 'en');
      });
    }

    // Dropzone Events
    if (dropzone) {
      dropzone.addEventListener('click', () => fileInput.click());
      dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
      });
      dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
      dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          const file = e.dataTransfer.files[0];
          if (file.type === 'application/pdf') {
            const reader = new FileReader();
            reader.onload = () => loadPDF(reader.result, file.name, file.size);
            reader.readAsArrayBuffer(file);
          } else {
            const dict = translations[currentLang] || translations.en;
            showToast(dict.toast_invalid_pdf, 'alert-triangle');
          }
        }
      });
    }

    // File Input change
    if (fileInput) {
      fileInput.addEventListener('change', () => {
        if (fileInput.files && fileInput.files[0]) {
          const file = fileInput.files[0];
          if (file.type === 'application/pdf') {
            const reader = new FileReader();
            reader.onload = () => loadPDF(reader.result, file.name, file.size);
            reader.readAsArrayBuffer(file);
          } else {
            const dict = translations[currentLang] || translations.en;
            showToast(dict.toast_invalid_pdf, 'alert-triangle');
          }
        }
      });
    }

    // Browse & Sample Buttons
    if (btnBrowse) {
      btnBrowse.addEventListener('click', (e) => {
        e.stopPropagation();
        fileInput.click();
      });
    }
    if (btnSamplePdf) {
      btnSamplePdf.addEventListener('click', (e) => {
        e.stopPropagation();
        generateSampleDocument();
      });
    }

    // Preset Chips
    presetChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const mode = chip.getAttribute('data-range-mode');
        applyPreset(mode);
      });
    });

    // Custom Range Input
    if (customRangeInput) {
      customRangeInput.addEventListener('input', () => {
        selectedPages = parseRangeString(customRangeInput.value, totalPages);
        updateSelectionUI();
      });
    }

    // Select All / Deselect All
    if (btnSelectAll) {
      btnSelectAll.addEventListener('click', () => {
        applyPreset('all');
      });
    }
    if (btnDeselectAll) {
      btnDeselectAll.addEventListener('click', () => {
        selectedPages.clear();
        currentRangeMode = 'custom';
        presetChips.forEach(chip => chip.classList.toggle('active', chip.getAttribute('data-range-mode') === 'custom'));
        customRangeBox.style.display = 'flex';
        customRangeInput.value = '';
        updateSelectionUI();
      });
    }

    // Print Action Buttons
    if (btnDirectPrint) {
      btnDirectPrint.addEventListener('click', () => printDocument(false));
    }
    if (btnOpenTab) {
      btnOpenTab.addEventListener('click', () => printDocument(true));
    }
    if (btnChangeFile) {
      btnChangeFile.addEventListener('click', resetDocument);
    }

    // FAQ Accordion
    document.querySelectorAll('.faq-question').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        if (item) item.classList.toggle('open');
      });
    });

    // Cookie Consent Banner
    const cookieBanner = document.getElementById('cookie-banner');
    const btnAcceptCookies = document.getElementById('btn-accept-cookies');
    if (cookieBanner && btnAcceptCookies) {
      if (localStorage.getItem('pdf_netizen_cookie_consent')) {
        cookieBanner.classList.add('hidden');
      }
      btnAcceptCookies.addEventListener('click', () => {
        localStorage.setItem('pdf_netizen_cookie_consent', 'true');
        cookieBanner.classList.add('hidden');
      });
    }
  }

  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    initEvents();
    if (window.lucide) {
      window.lucide.createIcons();
    }
  });

  // Expose translation for master sync scripts
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { translations };
  }
})();
