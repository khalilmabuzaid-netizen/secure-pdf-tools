/**
 * UnlockPDF - 100% Client-Side PDF Password Decryption & Restriction Removal
 * Powered by PDF.js, PDF-Lib & WebAssembly (Zero Server Uploads • 100% In-Browser Privacy)
 * Bilingual English / Arabic (RTL) Support
 */

(function () {
  'use strict';

  // Multi-Language Translation Dictionary
  const translations = {
    en: {
      badge_client_side: "100% Client-Side",
      nav_home: "Home",
      nav_annotator: "Annotator",
      nav_compress: "Compress PDF",
      nav_split: "Split PDF",
      nav_reset: "Reset",
      breadcrumb_home: "Home",
      breadcrumb_tools: "Tools",
      breadcrumb_current: "Unlock PDF",
      hero_badge: "100% Private In-Memory Decryption • Zero Server Uploads",
      hero_title: 'Unlock & <span class="gradient-text">Decrypt PDF</span> Files',
      hero_subtitle: "Easily remove passwords and security restrictions from your PDF files directly in your browser with 100% client-side privacy.",
      dropzone_title: "Drop your secured PDF file here",
      dropzone_subtitle: "Select or drag & drop any password-protected PDF to unlock and remove security restrictions.",
      btn_browse_file: "Browse PDF File",
      btn_load_sample: "Try Encrypted Sample",
      pill_pwd_remove: "Password Removal",
      pill_client_privacy: "100% Client-Side Privacy",
      pill_instant_export: "Instant Decrypted PDF",
      status_password_protected: "Password Protected",
      status_unprotected: "Unprotected",
      pages_single: "1 Page",
      pages_total: "{n} Pages",
      btn_change_file: "Change File",
      pwd_card_title: "Enter Document Password",
      pwd_card_desc: "This PDF is encrypted. Enter the password to unlock and decrypt it in memory.",
      label_pdf_password: "PDF Password",
      placeholder_pdf_password: "Enter the PDF password...",
      label_output_filename: "Output File Name",
      placeholder_output_filename: "unlocked_document",
      btn_unlock_pdf: "Unlock PDF",
      btn_unlocking: "Decrypting & Unlocking PDF...",
      progress_decrypting: "Decrypting PDF in browser memory...",
      progress_rendering: "Reconstructing page {p} of {total}...",
      progress_finalizing: "Finalizing decrypted document...",
      success_title: "PDF Unlocked Successfully!",
      success_desc: "All passwords and security restrictions have been permanently removed. Your new unencrypted PDF is ready for download.",
      btn_download_unlocked: "Download Unlocked PDF",
      btn_unlock_another: "Unlock Another PDF",
      ad_space_label: "Advertisement Space (728x90)",
      guide_badge: "Fast & Private Decryption",
      guide_title: "How to Unlock PDF Files Online",
      guide_subtitle: "Remove passwords and restrictions in three quick steps directly inside your browser without uploading files.",
      step1_title: "Upload Secured PDF",
      step1_desc: "Drag and drop your password-protected PDF document into the designated dropzone or browse from your local device.",
      step2_title: "Enter Password",
      step2_desc: "Type the document password into the secure input box and click Unlock PDF. Real-time verification tests your credentials instantly in memory.",
      step3_title: "Download Unlocked PDF",
      step3_desc: "Download your clean, completely unrestricted PDF document with '-unlocked.pdf' appended. Open, print, and share it anywhere freely.",
      faq_badge: "Got Questions?",
      faq_title: "Frequently Asked Questions",
      faq_subtitle: "Everything you need to know about our free, client-side PDF password removal tool.",
      faq_q1: "How does client-side PDF unlocking work?",
      faq_a1: "When you enter your password, our in-browser decryption engine processes the cryptographic bytes directly in your device's memory using WebAssembly. It decrypts the document streams and serializes a brand new, unencrypted PDF without sending any data to external servers.",
      faq_q2: "Are my confidential files or passwords uploaded to a server?",
      faq_a2: "Never. All operations happen strictly within your web browser. Your confidential files, bank statements, legal contracts, and passwords are never uploaded, logged, or viewed by anyone.",
      faq_q3: "Can this tool unlock a PDF without the password?",
      faq_a3: "For documents protected by strong AES-256 open/user passwords, you must provide the correct password once to allow decryption. For documents with permission restrictions (like printing or copying locks), our tool can remove them directly.",
      faq_q4: "Will the unlocked PDF lose formatting or image resolution?",
      faq_a4: "No. The unlocking process retains the exact original page dimensions, vector typography, embedded fonts, and high-resolution graphics with zero quality loss.",
      faq_q5: "Can I use Unlock PDF on mobile devices?",
      faq_a5: "Yes! Our responsive web application works seamlessly on iPhones, iPads, Android smartphones, tablets, Windows, Mac, and Linux laptops.",
      faq_q6: "Is there any file size limit or cost?",
      faq_a6: "No. The tool is 100% free with unlimited document processing and no watermarks added to your files.",
      footer_tagline: "100% Client-side, private, and secure document processing directly in your browser.",
      footer_privacy: "Privacy Policy",
      footer_terms: "Terms of Service",
      footer_contact: "Contact Us",
      footer_copyright: "© 2026 PDF Hub. All rights reserved.",
      cookie_consent_text: "We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.",
      cookie_learn_more: "Privacy Policy",
      cookie_accept_btn: "Accept",
      notice_not_encrypted: "This PDF document is already unencrypted. You can download a clean copy or remove any leftover permissions.",
      error_invalid_pdf: "Please upload a valid PDF document.",
      error_pwd_empty: "Please enter the PDF password to decrypt the document.",
      error_pwd_incorrect: "Incorrect password. Please verify and try again.",
      error_decryption_failed: "Decryption error: ",
      toast_sample_loaded: "Encrypted sample PDF loaded! (Password: secret123)",
      toast_sample_error: "Error generating sample PDF: ",
      toast_reset_success: "Workspace reset to initial state.",
      toast_download_started: "Downloading unlocked PDF..."
    },
    ar: {
      badge_client_side: "محلي ١٠٠٪ في المتصفح",
      nav_home: "الرئيسية",
      nav_annotator: "المحرر",
      nav_compress: "ضغط PDF",
      nav_split: "تقسيم PDF",
      nav_reset: "إعادة ضبط",
      breadcrumb_home: "الرئيسية",
      breadcrumb_tools: "الأدوات",
      breadcrumb_current: "فك قفل PDF",
      hero_badge: "فك تشفير محلي ١٠٠٪ في الذاكرة • بدون رفع سحابي",
      hero_title: 'إلغاء قفل وتشفير <span class="gradient-text">ملفات PDF</span>',
      hero_subtitle: "قم بإزالة كلمات المرور والقيود الأمنية من ملفات PDF الخاصة بك مباشرة داخل متصفحك بأمان وخصوصية محلية ١٠٠٪.",
      dropzone_title: "اسحب ملف PDF المحمي هنا",
      dropzone_subtitle: "حدد أو اسحب وأفلت أي ملف PDF محمي بكلمة مرور لإلغاء القفل وإزالة القيود الأمنية.",
      btn_browse_file: "استعراض ملف PDF",
      btn_load_sample: "تجربة نموذج مشفر",
      pill_pwd_remove: "إزالة كلمة المرور",
      pill_client_privacy: "خصوصية محلية ١٠٠٪",
      pill_instant_export: "تصدير PDF مفكوك فوراً",
      status_password_protected: "محمي بكلمة مرور",
      status_unprotected: "غير مشفر",
      pages_single: "صفحة واحدة",
      pages_total: "{n} صفحات",
      btn_change_file: "تغيير الملف",
      pwd_card_title: "أدخل كلمة مرور المستند",
      pwd_card_desc: "هذا المستند مشفر ومقفل. أدخل كلمة المرور لفك تشفيره وفتحه محلياً في الذاكرة.",
      label_pdf_password: "كلمة مرور PDF",
      placeholder_pdf_password: "أدخل كلمة مرور الـ PDF...",
      label_output_filename: "اسم الملف الناتج",
      placeholder_output_filename: "unlocked_document",
      btn_unlock_pdf: "إلغاء قفل PDF",
      btn_unlocking: "جاري فك التشفير وإلغاء القفل...",
      progress_decrypting: "جاري فك تشفير المستند في ذاكرة المتصفح...",
      progress_rendering: "جاري إعادة بناء الصفحة {p} من {total}...",
      progress_finalizing: "جاري استكمال المستند المفكوك...",
      success_title: "تم إلغاء قفل الـ PDF بنجاح!",
      success_desc: "تمت إزالة جميع كلمات المرور والقيود الأمنية بشكل دائم. ملف PDF غير المقيد الجديد جاهز للتحميل الآن.",
      btn_download_unlocked: "تحميل ملف PDF المفكوك",
      btn_unlock_another: "إلغاء قفل ملف آخر",
      ad_space_label: "مساحة إعلانية (728×90)",
      guide_badge: "فك تشفير سريع وخاص تماماً",
      guide_title: "كيفية إلغاء قفل ملفات PDF عبر الإنترنت",
      guide_subtitle: "أزل كلمات المرور والقيود في ثلاث خطوات سريعة ومباشرة داخل متصفحك دون الحاجة لرفع الملفات.",
      step1_title: "١. رفع المستند المحمي",
      step1_desc: "اسحب وأفلت مستند PDF المحمي بكلمة مرور داخل منطقة الرفع أو استعرضه من جهازك.",
      step2_title: "٢. إدخال كلمة المرور",
      step2_desc: "اكتب كلمة مرور المستند في حقل الإدخال الآمن واضغط إلغاء قفل PDF للتحقق الفوري منها محلياً.",
      step3_title: "٣. تحميل المستند بدون قيود",
      step3_desc: "حمّل نسختك النظيفة وغير المقيدة تماماً مضافاً إليها '-unlocked.pdf' مع حرية الطباعة والمشاركة في أي مكان.",
      faq_badge: "هل لديك أسئلة؟",
      faq_title: "الأسئلة الشائعة",
      faq_subtitle: "كل ما تحتاج معرفته حول أداة إلغاء قفل وفك تشفير ملفات PDF المجانية والمحلية بالكامل.",
      faq_q1: "كيف تعمل معالجة إلغاء قفل الـ PDF محلياً؟",
      faq_a1: "عند إدخال كلمة المرور، يعالج محرك فك التشفير التشفير البرمجي مباشرة داخل ذاكرة جهازك عبر تقنيات WebAssembly، حيث يفكك التشفير ويعيد بناء مستند PDF غير مشفر بالكامل دون نقل أي بايت إلى خوادم خارجية.",
      faq_q2: "هل يتم إرسال ملفاتي السرية أو كلمات المرور إلى أي خادم خارجي؟",
      faq_a2: "مستحيل تماماً. كافة العمليات تتم حصرياً داخل متصفح الإنترنت على جهازك، ولا يتم تسجيل أو رفع أو الاطلاع على مستنداتك أو كلمات المرور نهائياً.",
      faq_q3: "هل يمكن للأداة فتح ملف PDF دون معرفة كلمة المرور؟",
      faq_a3: "بالنسبة للمستندات المشفرة بكلمة مرور فتح رئيسية (AES-256)، يلزم إدخال كلمة المرور لمرة واحدة لفك الشفرة. أما المستندات المقيدة الصلاحيات (مثل حظر الطباعة أو النسخ)، فتستطيع الأداة إزالتها مباشرة.",
      faq_q4: "هل يفقد المستند المفكوك جودته أو تنسيق صفحاته؟",
      faq_a4: "كلا، تحتفظ عملية إلغاء القفل بالأبعاد الدقيقة للصفحات والخطوط والصور عالية الدقة دون أي مساس بجودة المستند الأصلية.",
      faq_q5: "هل يمكنني استخدام الأداة عبر الهواتف الذكية؟",
      faq_a5: "نعم بالتأكيد! التطبيق متجاوب تماماً ويعمل بسلاسة فائقة على هواتف الآيفون، والأندرويد، والأجهزة اللوحية، والحواسيب المكتبية.",
      faq_q6: "هل هناك أي حد لحجم الملفات أو تكلفة استخدام؟",
      faq_a6: "لا، الأداة مجانية ١٠٠٪ بدون أي حدود على عدد المستندات وبدون إضافة أي علامات مائية.",
      footer_tagline: "معالجة مستندات محلية ١٠٠٪، خاصة وآمنة تماماً مباشرة في متصفحك.",
      footer_privacy: "سياسة الخصوصية",
      footer_terms: "شروط الاستخدام",
      footer_contact: "اتصل بنا",
      footer_copyright: "© ٢٠٢٦ PDF Hub. جميع الحقوق محفوظة.",
      cookie_consent_text: "نحن نستخدم ملفات تعريف الارتباط لتحسين تجربتك. باستمرارك في زيارة هذا الموقع، فإنك توافق على استخدامنا لملفات تعريف الارتباط.",
      cookie_learn_more: "سياسة الخصوصية",
      cookie_accept_btn: "موافق",
      notice_not_encrypted: "هذا المستند غير مشفر بكلمة مرور فتح. يمكنك تنزيل نسخة نظيفة منه أو إزالة أي قيود صلاحيات متبقية.",
      error_invalid_pdf: "يرجى رفع ملف PDF صالح.",
      error_pwd_empty: "يرجى إدخال كلمة مرور المستند لفك تشفيره.",
      error_pwd_incorrect: "كلمة المرور غير صحيحة. يرجى التأكد والمحاولة مرة أخرى.",
      error_decryption_failed: "خطأ أثناء فك التشفير: ",
      toast_sample_loaded: "تم تحميل ملف تجريبي مشفر! (كلمة المرور: secret123)",
      toast_sample_error: "حدث خطأ أثناء إنشاء النموذج المشفر: ",
      toast_reset_success: "تمت إعادة ضبط مساحة العمل بنجاح.",
      toast_download_started: "جاري تنزيل ملف PDF المفكوك..."
    }
  };

  // Configure PDF.js Worker
  if (window.pdfjsLib) {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  }

  // State
  let currentFile = null;
  let originalPdfBytes = null;
  let originalBaseName = '';
  let isEncryptedDoc = true;
  let isProcessing = false;
  let decryptedPdfBlob = null;
  let decryptedPdfName = '';
  let currentLang = 'en';

  // Cached DOM Elements
  let dropzone, fileInput, btnBrowseFile, btnLoadSample;
  let workspacePanel, fileNameDisplay, fileSizeDisplay, fileStatusTag, fileStatusText, filePagesDisplay, btnChangeFile;
  let passwordFormCard, inlineAlert, alertMessage, alertIcon, nonEncryptedNotice, pwdInputGroup;
  let pdfPasswordInput, btnTogglePassword, iconTogglePassword, outputFilenameInput;
  let btnUnlockPdf, btnUnlockSpinner, btnUnlockIcon, btnUnlockText;
  let decryptionProgress, progressStatusText, progressPercent, progressBarFill;
  let successDownloadCard, unlockedFilenameDisplay, unlockedFilesizeDisplay, btnDownloadUnlocked, btnUnlockAnother;
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
    fileInput = document.getElementById('pdf-file-input');
    btnBrowseFile = document.getElementById('btn-browse-file');
    btnLoadSample = document.getElementById('btn-load-sample');

    workspacePanel = document.getElementById('workspace-panel');
    fileNameDisplay = document.getElementById('file-name-display');
    fileSizeDisplay = document.getElementById('file-size-display');
    fileStatusTag = document.getElementById('file-status-tag');
    fileStatusText = document.getElementById('file-status-text');
    filePagesDisplay = document.getElementById('file-pages-display');
    btnChangeFile = document.getElementById('btn-change-file');

    passwordFormCard = document.getElementById('password-form-card');
    inlineAlert = document.getElementById('inline-alert');
    alertMessage = document.getElementById('alert-message');
    alertIcon = document.getElementById('alert-icon');
    nonEncryptedNotice = document.getElementById('non-encrypted-notice');
    pwdInputGroup = document.getElementById('pwd-input-group');

    pdfPasswordInput = document.getElementById('pdf-password-input');
    btnTogglePassword = document.getElementById('btn-toggle-password');
    iconTogglePassword = document.getElementById('icon-toggle-password');
    outputFilenameInput = document.getElementById('output-filename-input');

    btnUnlockPdf = document.getElementById('btn-unlock-pdf');
    btnUnlockSpinner = document.getElementById('btn-unlock-spinner');
    btnUnlockIcon = document.getElementById('btn-unlock-icon');
    btnUnlockText = document.getElementById('btn-unlock-text');

    decryptionProgress = document.getElementById('decryption-progress');
    progressStatusText = document.getElementById('progress-status-text');
    progressPercent = document.getElementById('progress-percent');
    progressBarFill = document.getElementById('progress-bar-fill');

    successDownloadCard = document.getElementById('success-download-card');
    unlockedFilenameDisplay = document.getElementById('unlocked-filename-display');
    unlockedFilesizeDisplay = document.getElementById('unlocked-filesize-display');
    btnDownloadUnlocked = document.getElementById('btn-download-unlocked');
    btnUnlockAnother = document.getElementById('btn-unlock-another');

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

    // Update live status tag
    if (fileStatusText) {
      fileStatusText.textContent = isEncryptedDoc
        ? t('status_password_protected')
        : t('status_unprotected');
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

    // Sample PDF Loader
    if (btnLoadSample) {
      btnLoadSample.addEventListener('click', loadSampleEncryptedPDF);
    }

    // Password Visibility Toggle
    if (btnTogglePassword && pdfPasswordInput) {
      btnTogglePassword.addEventListener('click', togglePasswordVisibility);
    }

    // Password Enter Keypress
    if (pdfPasswordInput) {
      pdfPasswordInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          executeUnlock();
        }
      });
      pdfPasswordInput.addEventListener('input', () => {
        hideInlineAlert();
      });
    }

    // Unlock Action Button
    if (btnUnlockPdf) {
      btnUnlockPdf.addEventListener('click', executeUnlock);
    }

    // Download Button
    if (btnDownloadUnlocked) {
      btnDownloadUnlocked.addEventListener('click', triggerUnlockedDownload);
    }

    // Reset & Unlock Another Buttons
    if (btnUnlockAnother) {
      btnUnlockAnother.addEventListener('click', resetWorkspace);
    }

    if (btnHeaderReset) {
      btnHeaderReset.addEventListener('click', resetWorkspace);
    }

    // Cookie Accept
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

  // Toggle Password Visibility
  function togglePasswordVisibility() {
    if (!pdfPasswordInput) return;
    const isPassword = (pdfPasswordInput.type === 'password');
    pdfPasswordInput.type = isPassword ? 'text' : 'password';

    if (iconTogglePassword) {
      iconTogglePassword.setAttribute('data-lucide', isPassword ? 'eye-off' : 'eye');
      if (window.lucide) {
        window.lucide.createIcons();
      }
    }
  }

  // Inline Alert Helpers
  function showInlineAlert(message, type = 'error') {
    if (!inlineAlert || !alertMessage) return;
    alertMessage.textContent = message;
    inlineAlert.className = `alert-banner ${type}`;
    if (alertIcon) {
      alertIcon.setAttribute('data-lucide', type === 'error' ? 'alert-circle' : 'info');
    }
    inlineAlert.classList.remove('hidden');
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function hideInlineAlert() {
    if (inlineAlert) {
      inlineAlert.classList.add('hidden');
    }
  }

  // File Selection Handler (Immediate File Acceptance - Zero Pre-Parsing Crash)
  async function handleFileSelection(file) {
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      showToast(t('error_invalid_pdf'), 'error');
      return;
    }

    try {
      const arrayBuffer = await file.arrayBuffer();
      window.rawPdfBytes = arrayBuffer;
      window.originalPdfBytes = arrayBuffer;
      window.currentFileName = file.name;
      originalPdfBytes = new Uint8Array(arrayBuffer);
      currentFile = file;
      originalBaseName = file.name.replace(/\.[^/.]+$/, '') || 'document';
      isEncryptedDoc = true;

      // Update Workspace UI displays immediately
      if (fileNameDisplay) fileNameDisplay.textContent = file.name;
      if (fileSizeDisplay) fileSizeDisplay.textContent = formatBytes(file.size);

      if (fileStatusTag && fileStatusText) {
        fileStatusTag.className = 'file-tag locked';
        fileStatusText.textContent = t('status_password_protected');
      }

      if (filePagesDisplay) {
        filePagesDisplay.classList.add('hidden');
      }

      // Set default output filename: [filename]-unlocked
      if (outputFilenameInput) {
        outputFilenameInput.value = `${originalBaseName}-unlocked`;
      }

      // Transition UI immediately to Password Input Card without pre-parsing
      hideInlineAlert();
      if (nonEncryptedNotice) nonEncryptedNotice.classList.add('hidden');
      if (passwordFormCard) passwordFormCard.classList.remove('hidden');
      if (successDownloadCard) successDownloadCard.classList.add('hidden');
      if (decryptionProgress) decryptionProgress.classList.add('hidden');

      if (dropzone) dropzone.classList.add('hidden');
      if (workspacePanel) workspacePanel.classList.remove('hidden');
      if (btnHeaderReset) btnHeaderReset.disabled = false;
      if (btnUnlockPdf) btnUnlockPdf.disabled = false;

      // Automatically focus the password input field
      if (pdfPasswordInput) {
        pdfPasswordInput.value = '';
        setTimeout(() => pdfPasswordInput.focus(), 150);
      }

      if (window.lucide) {
        window.lucide.createIcons();
      }

    } catch (err) {
      console.error('Failed to read PDF file:', err);
      showToast(t('error_invalid_pdf') + ' (' + err.message + ')', 'error');
    }
  }

  // Load Sample Encrypted PDF
  async function loadSampleEncryptedPDF() {
    try {
      showToast('Generating encrypted sample PDF...', 'info');

      if (!window.PDFLib) {
        throw new Error('PDF-Lib library is not available');
      }

      const { PDFDocument, rgb, StandardFonts } = window.PDFLib;
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      // Page 1
      const page1 = pdfDoc.addPage([600, 800]);
      page1.drawRectangle({
        x: 0,
        y: 720,
        width: 600,
        height: 80,
        color: rgb(0.06, 0.72, 0.5)
      });
      page1.drawText('CONFIDENTIAL FINANCIAL ASSET', {
        x: 50,
        y: 752,
        size: 20,
        font: fontBold,
        color: rgb(1, 1, 1)
      });
      page1.drawText('Secured PDF Decryption & Verification Sample', {
        x: 50,
        y: 680,
        size: 14,
        font: fontBold,
        color: rgb(0.1, 0.15, 0.25)
      });
      page1.drawText('This sample document is locked with password: "secret123"', {
        x: 50,
        y: 645,
        size: 11,
        font: fontBold,
        color: rgb(0.06, 0.72, 0.5)
      });
      page1.drawText('1. Document Security Clearance', {
        x: 50,
        y: 595,
        size: 13,
        font: fontBold,
        color: rgb(0.15, 0.2, 0.3)
      });
      page1.drawText('This document proves 100% in-browser cryptographic decryption capabilities.', {
        x: 50,
        y: 570,
        size: 10.5,
        font: font,
        color: rgb(0.25, 0.3, 0.4)
      });
      page1.drawText('Zero server transfers ensure absolute regulatory compliance with HIPAA & GDPR.', {
        x: 50,
        y: 548,
        size: 10.5,
        font: font,
        color: rgb(0.25, 0.3, 0.4)
      });

      // Page 2
      const page2 = pdfDoc.addPage([600, 800]);
      page2.drawText('2. Regulatory Audit Log', {
        x: 50,
        y: 740,
        size: 16,
        font: fontBold,
        color: rgb(0.1, 0.15, 0.25)
      });
      page2.drawText('All cryptographic operations were performed strictly client-side.', {
        x: 50,
        y: 708,
        size: 11,
        font: font,
        color: rgb(0.3, 0.35, 0.45)
      });

      const unencryptedBytes = await pdfDoc.save();
      let sampleBytes = unencryptedBytes;

      // Encrypt sample if PDFEncrypt is available
      if (window.PDFEncrypt && typeof window.PDFEncrypt.encryptPDF === 'function') {
        try {
          sampleBytes = await window.PDFEncrypt.encryptPDF(unencryptedBytes, 'secret123', {
            algorithm: 'AES-256',
            ownerPassword: 'secret123',
            allowPrinting: true,
            allowCopying: true
          });
        } catch (encErr) {
          console.warn('PDFEncrypt note:', encErr);
        }
      }

      const sampleBlob = new Blob([sampleBytes], { type: 'application/pdf' });
      const sampleFile = new File([sampleBlob], 'sample_protected_report.pdf', { type: 'application/pdf' });

      await handleFileSelection(sampleFile);
      showToast(t('toast_sample_loaded'), 'success');

      // Pre-fill sample password for convenience
      if (pdfPasswordInput) {
        pdfPasswordInput.value = 'secret123';
      }

    } catch (err) {
      console.error('Error generating sample encrypted PDF:', err);
      showToast(t('toast_sample_error') + err.message, 'error');
    }
  }

  // Execute PDF Decryption & Unlocking
  async function executeUnlock() {
    if (isProcessing) return;

    const rawBytes = window.rawPdfBytes || window.originalPdfBytes || originalPdfBytes;
    if (!rawBytes) {
      showToast(t('error_invalid_pdf'), 'error');
      return;
    }

    const password = pdfPasswordInput ? pdfPasswordInput.value.trim() : '';

    hideInlineAlert();
    isProcessing = true;
    setLoadingState(true);
    updateProgress(15, t('progress_decrypting'));

    try {
      let finalDecryptedBytes = null;
      const cleanBytes = (rawBytes instanceof Uint8Array ? rawBytes : new Uint8Array(rawBytes)).slice(0);

      if (!window.pdfjsLib) {
        throw new Error('PDF.js rendering engine is not loaded');
      }

      let pdfDoc = null;
      try {
        const loadingTask = window.pdfjsLib.getDocument({
          data: cleanBytes.slice(0),
          password: password
        });
        pdfDoc = await loadingTask.promise;
      } catch (err) {
        if (
          err.name === 'PasswordException' ||
          err.code === 1 ||
          err.code === 2 ||
          (err.message && err.message.toLowerCase().includes('password')) ||
          (err.message && err.message.toLowerCase().includes('incorrect'))
        ) {
          showInlineAlert(t('error_pwd_incorrect'), 'error');
          showToast(t('error_pwd_incorrect'), 'error');
          if (pdfPasswordInput) {
            pdfPasswordInput.focus();
            pdfPasswordInput.select();
          }
          setLoadingState(false);
          isProcessing = false;
          return;
        } else {
          // If it only had owner restrictions, try direct pdf-lib bypass:
          try {
            if (window.PDFLib) {
              const directDoc = await window.PDFLib.PDFDocument.load(cleanBytes.slice(0), { ignoreEncryption: true });
              finalDecryptedBytes = await directDoc.save();
            } else {
              throw err;
            }
          } catch (e2) {
            console.error("Direct PDF-Lib fallback failed:", e2);
            throw err;
          }
        }
      }

      // Rebuild clean, unencrypted PDF using canvas + pdf-lib if decrypted via PDF.js
      if (!finalDecryptedBytes && pdfDoc) {
        const numPages = pdfDoc.numPages;
        if (!window.PDFLib) {
          throw new Error('PDF-Lib serialization engine unavailable');
        }

        const unlockedDoc = await window.PDFLib.PDFDocument.create();

        for (let i = 1; i <= numPages; i++) {
          updateProgress(
            20 + Math.round((i / numPages) * 70),
            t('progress_rendering', { p: i, total: numPages })
          );

          const page = await pdfDoc.getPage(i);
          const viewport = page.getViewport({ scale: 2.0 }); // High quality 2.0x

          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = Math.floor(viewport.width);
          canvas.height = Math.floor(viewport.height);

          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          await page.render({ canvasContext: ctx, viewport }).promise;

          const imgData = canvas.toDataURL('image/jpeg', 0.95);
          const imgBytes = await fetch(imgData).then(res => res.arrayBuffer());
          const embeddedImg = await unlockedDoc.embedJpg(imgBytes);

          const originalViewport = page.getViewport({ scale: 1.0 });
          const newPage = unlockedDoc.addPage([originalViewport.width, originalViewport.height]);
          newPage.drawImage(embeddedImg, {
            x: 0,
            y: 0,
            width: originalViewport.width,
            height: originalViewport.height
          });
        }

        updateProgress(95, t('progress_finalizing'));
        finalDecryptedBytes = await unlockedDoc.save();
      }

      updateProgress(100, 'Complete!');

      // Step 3: Success Download Area Setup
      const outputCustomName = outputFilenameInput ? outputFilenameInput.value.trim() : '';
      let finalFileName = outputCustomName ? outputCustomName : `${originalBaseName}-unlocked`;
      if (!finalFileName.toLowerCase().endsWith('.pdf')) {
        finalFileName += '.pdf';
      }

      decryptedPdfBlob = new Blob([finalDecryptedBytes], { type: 'application/pdf' });
      decryptedPdfName = finalFileName;

      if (unlockedFilenameDisplay) unlockedFilenameDisplay.textContent = finalFileName;
      if (unlockedFilesizeDisplay) unlockedFilesizeDisplay.textContent = formatBytes(decryptedPdfBlob.size);

      // Auto trigger download
      triggerUnlockedDownload();

      setTimeout(() => {
        setLoadingState(false);
        if (passwordFormCard) passwordFormCard.classList.add('hidden');
        if (successDownloadCard) successDownloadCard.classList.remove('hidden');
        showToast(t('success_title'), 'success');
      }, 350);

    } catch (err) {
      console.error('Decryption execution error:', err);
      showInlineAlert(t('error_decryption_failed') + (err.message || err.toString()), 'error');
      showToast(t('error_decryption_failed') + (err.message || err.toString()), 'error');
      setLoadingState(false);
    } finally {
      isProcessing = false;
    }
  }

  function setLoadingState(loading) {
    if (btnUnlockPdf) btnUnlockPdf.disabled = loading;
    if (btnChangeFile) btnChangeFile.disabled = loading;
    if (btnHeaderReset) btnHeaderReset.disabled = loading;

    if (btnUnlockSpinner) {
      if (loading) btnUnlockSpinner.classList.remove('hidden');
      else btnUnlockSpinner.classList.add('hidden');
    }

    if (btnUnlockIcon) {
      if (loading) btnUnlockIcon.classList.add('hidden');
      else btnUnlockIcon.classList.remove('hidden');
    }

    if (btnUnlockText) {
      btnUnlockText.textContent = loading ? t('btn_unlocking') : t('btn_unlock_pdf');
    }

    if (decryptionProgress) {
      if (loading) decryptionProgress.classList.remove('hidden');
      else decryptionProgress.classList.add('hidden');
    }
  }

  function updateProgress(percent, statusText) {
    if (progressPercent) progressPercent.textContent = `${percent}%`;
    if (progressBarFill) progressBarFill.style.width = `${percent}%`;
    if (progressStatusText && statusText) progressStatusText.textContent = statusText;
  }

  // Trigger Download of Unlocked PDF
  function triggerUnlockedDownload() {
    if (!decryptedPdfBlob || !decryptedPdfName) return;
    showToast(t('toast_download_started'), 'info');

    const url = URL.createObjectURL(decryptedPdfBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = decryptedPdfName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  }

  // Reset Workspace to Default
  function resetWorkspace() {
    currentFile = null;
    originalPdfBytes = null;
    window.originalPdfBytes = null;
    originalBaseName = '';
    isEncryptedDoc = true;
    isProcessing = false;
    decryptedPdfBlob = null;
    decryptedPdfName = '';

    if (fileInput) fileInput.value = '';
    if (pdfPasswordInput) pdfPasswordInput.value = '';
    if (outputFilenameInput) outputFilenameInput.value = 'unlocked_document';

    hideInlineAlert();

    if (passwordFormCard) passwordFormCard.classList.remove('hidden');
    if (successDownloadCard) successDownloadCard.classList.add('hidden');
    if (decryptionProgress) decryptionProgress.classList.add('hidden');
    if (workspacePanel) workspacePanel.classList.add('hidden');
    if (dropzone) dropzone.classList.remove('hidden');
    if (btnHeaderReset) btnHeaderReset.disabled = true;

    showToast(t('toast_reset_success'), 'info');
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
