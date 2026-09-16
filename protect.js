/**
 * ProtectPDF Pro - Client-Side PDF Password Encryption & Protection
 * Utilizes: PDF-Lib & @pdfsmaller/pdf-encrypt (100% Client-Side Processing • Zero Server Uploads)
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
      nav_img2pdf: "Image to PDF",
      nav_reset: "Reset",
      hero_badge: "Local & Secure • 100% Client-Side PDF Encryption • Zero Server Uploads",
      hero_title: 'Protect & <span class="gradient-text">Encrypt PDF</span> Files',
      hero_subtitle: "Secure your sensitive documents with military-grade AES-256 encryption and a custom password right inside your browser.",
      dropzone_title: "Drop your PDF file here",
      dropzone_subtitle: "Drag and drop any PDF file to encrypt with a password, or browse from your device",
      btn_browse_file: "Browse PDF File",
      btn_load_sample: "Try Sample PDF",
      feature_aes: "AES-256 Bit Encryption",
      feature_client: "100% Client-Side Privacy",
      feature_compat: "Universal PDF Compatibility",
      btn_change_file: "Change File",
      label_enter_password: "Enter Password",
      placeholder_enter_password: "Enter a secure password",
      label_confirm_password: "Confirm Password",
      placeholder_confirm_password: "Repeat your password",
      match_idle: "Enter matching passwords to secure the document",
      match_success: "Passwords match securely",
      match_error: "Passwords do not match",
      strength_label: "Password Strength:",
      strength_empty: "Empty",
      strength_weak: "Weak",
      strength_medium: "Medium",
      strength_strong: "Strong",
      strength_verystrong: "Very Strong",
      label_algorithm: "Encryption Method",
      opt_aes256: "AES-256 (Recommended • High Security)",
      opt_rc4: "RC4 128-bit (Standard Compatibility)",
      label_output_filename: "Output File Name",
      placeholder_output_filename: "protected_document",
      label_permissions: "Document Permissions",
      perm_allow_printing: "Allow Printing",
      perm_allow_copying: "Allow Copying text and graphics",
      perm_allow_modifying: "Allow Modifying document",
      security_card_title: "Security & Privacy Assurance",
      security_bullet_1: "100% Client-Side encryption using modern Web Cryptography API.",
      security_bullet_2: "Your PDF and passwords are never transmitted to any server or third party.",
      security_bullet_3: "Protected documents can be opened in Adobe Acrobat, Chrome, Apple Preview, and all standard PDF readers.",
      security_bullet_4: "Make sure to remember your password. Due to client-side encryption, lost passwords cannot be recovered.",
      progress_encrypting: "Encrypting document with AES-256...",
      btn_cancel: "Cancel",
      btn_encrypt_pdf: "Encrypt & Download PDF",
      btn_encrypting: "Encrypting PDF...",
      pages_total: "{n} Pages Total",
      pages_single: "1 Page Total",
      toast_pwd_mismatch: "Passwords do not match. Please ensure both fields are identical.",
      toast_pwd_empty: "Please enter a password to protect your PDF document.",
      toast_encrypt_success: 'Document encrypted successfully as "{name}.pdf"!',
      toast_encrypt_error: "Encryption error: ",
      toast_sample_generating: "Generating clean sample PDF document...",
      toast_sample_error: "Error creating sample PDF: ",
      toast_invalid_pdf: "Please upload a valid PDF document.",
      toast_file_reset: "File cleared and settings reset.",
      toast_already_encrypted: "This PDF file is already encrypted or password protected.",
      protect_seo_badge: "Military-Grade Document Security",
      protect_seo_title: "How to Password Protect & Encrypt PDF Files Online",
      protect_seo_subtitle: "Secure your confidential files with strong AES-256 encryption and custom permission controls with 100% client-side privacy.",
      protect_step1_title: "1. Select Confidential PDF",
      protect_step1_desc: "Drop any PDF document you wish to lock and protect into the secure browser interface.",
      protect_step2_title: "2. Set Strong Password",
      protect_step2_desc: "Enter and confirm your secret password, check the real-time strength meter, and select document permissions.",
      protect_step3_title: "3. Encrypt & Download",
      protect_step3_desc: "Click Encrypt & Download to generate an AES-256 password-locked PDF compatible with all standard PDF readers.",
      protect_faq_title: "Frequently Asked Questions",
      protect_faq_q1: "Is my password or original PDF sent over the internet?",
      protect_faq_a1: "Never. Protect PDF Pro relies on 100% client-side processing using Web Cryptography. With no server uploads, your password and files never leave your device, ensuring total privacy.",
      protect_faq_q2: "Which PDF viewers can open my encrypted documents?",
      protect_faq_a2: "Your protected PDF complies with universal ISO PDF encryption standards and opens seamlessly in Adobe Acrobat, Google Chrome, Microsoft Edge, Apple Preview, and mobile readers.",
      protect_faq_q3: "Can you recover my PDF if I forget my password?",
      protect_faq_a3: "No. Because encryption is performed locally on your device without backdoors or master keys, forgotten passwords cannot be recovered. Be sure to remember or safely store your password."
    },
    ar: {
      badge_client_side: "محلي ١٠٠٪ في المتصفح",
      nav_home: "الرئيسية",
      nav_annotator: "محرر PDF",
      nav_merge: "دمج PDF",
      nav_split: "تقسيم PDF",
      nav_compress: "ضغط PDF",
      nav_watermark: "علامة مائية",
      nav_img2pdf: "تحويل الصور",
      nav_reset: "إعادة ضبط",
      hero_badge: "محلي وآمن • تشفير وحماية PDF في المتصفح • بدون رفع سحابي",
      hero_title: 'حماية وتشفير <span class="gradient-text">ملفات PDF</span>',
      hero_subtitle: "قم بحماية وتشفير مستنداتك السرية بأعلى معايير تشفير AES-256 وكلمة مرور مخصصة مباشرة في متصفحك.",
      dropzone_title: "اسحب ملف PDF هنا",
      dropzone_subtitle: "اسحب وأفلت أي ملف PDF لتشفيره بكلمة مرور، أو تصفح من جهازك",
      btn_browse_file: "استعراض ملف PDF",
      btn_load_sample: "تجربة ملف تجريبي",
      feature_aes: "تشفير AES-256 بت العسكري",
      feature_client: "خصوصية محلية ١٠٠٪",
      feature_compat: "توافق شامل مع جميع القارئات",
      btn_change_file: "تغيير الملف",
      label_enter_password: "أدخل كلمة المرور",
      placeholder_enter_password: "أدخل كلمة مرور قوية",
      label_confirm_password: "تأكيد كلمة المرور",
      placeholder_confirm_password: "أعد كتابة كلمة المرور",
      match_idle: "أدخل كلمتي مرور متطابقتين لحماية المستند",
      match_success: "كلمتا المرور متطابقتان بنجاح",
      match_error: "كلمتا المرور غير متطابقتين",
      strength_label: "قوة كلمة المرور:",
      strength_empty: "فارغة",
      strength_weak: "ضعيفة",
      strength_medium: "متوسطة",
      strength_strong: "قوية",
      strength_verystrong: "قوية جداً",
      label_algorithm: "خوارزمية التشفير",
      opt_aes256: "AES-256 (موصى به • أمان عالي)",
      opt_rc4: "RC4 128-بت (توافق قياسي)",
      label_output_filename: "اسم الملف الناتج",
      placeholder_output_filename: "protected_document",
      label_permissions: "أذونات وصلاحيات المستند",
      perm_allow_printing: "السماح بالطباعة",
      perm_allow_copying: "السماح بنسخ النصوص والرسومات",
      perm_allow_modifying: "السماح بتعديل المستند",
      security_card_title: "ضمان الأمان والخصوصية المطلقة",
      security_bullet_1: "تشفير محلي ١٠٠٪ بالكامل عبر واجهة Web Cryptography API في المتصفح.",
      security_bullet_2: "لا يتم إرسال ملفاتك أو كلمات المرور إلى أي خادم خارجي نهائياً.",
      security_bullet_3: "الملفات المشفرة متوافقة تماماً مع Adobe Acrobat، وChrome، وApple Preview، وكافة التطبيقات.",
      security_bullet_4: "تأكد من حفظ كلمة المرور الخاصة بك. نظراً للتشفير المحلي الصارم، لا يمكن استرجاع كلمة المرور في حال نسيانها.",
      progress_encrypting: "جاري تشفير المستند بواسطة AES-256...",
      btn_cancel: "إلغاء",
      btn_encrypt_pdf: "تشفير وتنزيل PDF",
      btn_encrypting: "جاري التشفير والتنزيل...",
      pages_total: "{n} صفحات إجمالاً",
      pages_single: "صفحة واحدة",
      toast_pwd_mismatch: "كلمتا المرور غير متطابقتين. يرجى التأكد من تطابق الحقلين.",
      toast_pwd_empty: "يرجى إدخال كلمة مرور لحماية ملف PDF الخاص بك.",
      toast_encrypt_success: 'تم تشفير المستند بنجاح باسم "{name}.pdf"!',
      toast_encrypt_error: "خطأ أثناء التشفير: ",
      toast_sample_generating: "جاري إنشاء ملف PDF تجريبي...",
      toast_sample_error: "حدث خطأ أثناء إنشاء الملف التجريبي: ",
      toast_invalid_pdf: "يرجى رفع ملف PDF صالح.",
      toast_file_reset: "تم إلغاء الملف وإعادة ضبط الإعدادات.",
      toast_already_encrypted: "ملف الـ PDF هذا مشفر ومحمي بكلمة مرور بالفعل.",
      protect_seo_badge: "حماية وتشفير المستندات بأعلى المعايير",
      protect_seo_title: "كيفية حماية وتشفير ملفات PDF بكلمة مرور عبر الإنترنت",
      protect_seo_subtitle: "احمِ مستنداتك السرية بتشفير AES-256 القوي مع التحكم في الصلاحيات وخصوصية محلية ١٠٠٪.",
      protect_step1_title: "١. اختيار المستند السري",
      protect_step1_desc: "أفلت أي مستند PDF ترغب في حمايته وإقفاله داخل واجهة المتصفح الآمنة.",
      protect_step2_title: "٢. تعيين كلمة مرور قوية",
      protect_step2_desc: "أدخل كلمة المرور وأكّدها، وتابع مقياس قوة كلمة المرور، وحدد أذونات الطباعة ونسخ النصوص.",
      protect_step3_title: "٣. التشفير والتحميل الفوري",
      protect_step3_desc: "اضغط على تشفير وتحميل PDF لتوليد مستند مشفر بتقنية AES-256 متوافق مع كافة برامج قراءة PDF.",
      protect_faq_title: "الأسئلة الشائعة",
      protect_faq_q1: "هل يتم إرسال كلمة المرور أو المستند الأصلي عبر الإنترنت؟",
      protect_faq_a1: "مستحيل. تعتمد أداة حماية وتشفير PDF على معالجة محلية ١٠٠٪ باستخدام التشفير البرمجي في المتصفح. مع انعدام الرفع إلى أي خادم، تظل ملفاتك وكلمات مرورك في أمان تام.",
      protect_faq_q2: "ما هي البرامج المتوافقة لفتح المستندات المشفرة؟",
      protect_faq_a2: "يتوافق مستندك المشفر مع معايير تشفير PDF العالمية (ISO)، ويفتح بسلاسة في برامج Adobe Acrobat و Google Chrome و Microsoft Edge و Apple Preview.",
      protect_faq_q3: "هل يمكنكم استرجاع المستند إذا نسيت كلمة المرور؟",
      protect_faq_a3: "كلا. نظراً لأن التشفير يتم محلياً على جهازك دون أي أبواب خلفية أو مفاتيح رئيسية، لا يمكن استرجاع كلمة المرور المنسية. يرجى حفظ كلمة المرور في مكان آمن."
    }
  };

  // State
  let currentFile = null;
  let currentPdfBytes = null;
  let currentPdfDoc = null;
  let pageCount = 0;
  let isEncrypting = false;
  let currentLang = 'en';

  // Cached DOM Elements
  let dropzone, fileInput, btnBrowseFile, btnLoadSample;
  let configPanel, fileNameDisplay, fileSizeDisplay, filePagesDisplay, btnChangeFile;
  let passwordInput, confirmPasswordInput, btnTogglePwd1, btnTogglePwd2, pwdIcon1, pwdIcon2;
  let pwdMatchStatus, matchStatusIcon, matchStatusText;
  let pwdStrengthLabel, pwdBar1, pwdBar2, pwdBar3, pwdBar4;
  let encryptionAlgorithmSelect, outputFilenameInput;
  let permPrintingCheck, permCopyingCheck, permModifyingCheck;
  let progressCard, progressStatusText, progressPercent, progressFill;
  let btnCancel, btnEncryptPdf, btnEncryptText, btnSpinner, btnHeaderReset;
  let btnLanguageToggle, langToggleText;
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

    configPanel = document.getElementById('config-panel');
    fileNameDisplay = document.getElementById('file-name-display');
    fileSizeDisplay = document.getElementById('file-size-display');
    filePagesDisplay = document.getElementById('file-pages-display');
    btnChangeFile = document.getElementById('btn-change-file');

    passwordInput = document.getElementById('password-input');
    confirmPasswordInput = document.getElementById('confirm-password-input');
    btnTogglePwd1 = document.getElementById('btn-toggle-pwd-1');
    btnTogglePwd2 = document.getElementById('btn-toggle-pwd-2');
    pwdIcon1 = document.getElementById('pwd-icon-1');
    pwdIcon2 = document.getElementById('pwd-icon-2');

    pwdMatchStatus = document.getElementById('pwd-match-status');
    matchStatusIcon = document.getElementById('match-status-icon');
    matchStatusText = document.getElementById('match-status-text');

    pwdStrengthLabel = document.getElementById('pwd-strength-label');
    pwdBar1 = document.getElementById('pwd-bar-1');
    pwdBar2 = document.getElementById('pwd-bar-2');
    pwdBar3 = document.getElementById('pwd-bar-3');
    pwdBar4 = document.getElementById('pwd-bar-4');

    encryptionAlgorithmSelect = document.getElementById('encryption-algorithm');
    outputFilenameInput = document.getElementById('output-filename');

    permPrintingCheck = document.getElementById('perm-printing');
    permCopyingCheck = document.getElementById('perm-copying');
    permModifyingCheck = document.getElementById('perm-modifying');

    progressCard = document.getElementById('progress-card');
    progressStatusText = document.getElementById('progress-status-text');
    progressPercent = document.getElementById('progress-percent');
    progressFill = document.getElementById('progress-fill');

    btnCancel = document.getElementById('btn-cancel');
    btnEncryptPdf = document.getElementById('btn-encrypt-pdf');
    btnEncryptText = document.getElementById('btn-encrypt-text');
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

    // Update page badges and live dynamic elements
    if (pageCount > 0 && filePagesDisplay) {
      filePagesDisplay.textContent = (pageCount === 1)
        ? t('pages_single')
        : t('pages_total', { n: pageCount });
    }

    // Update password match and strength display
    updatePasswordSecurityUI();

    // Update encrypt button text state
    if (btnEncryptText && !isEncrypting) {
      btnEncryptText.textContent = t('btn_encrypt_pdf');
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
      btnLoadSample.addEventListener('click', loadSamplePDF);
    }

    // Password Visibility Toggles
    if (btnTogglePwd1 && passwordInput) {
      btnTogglePwd1.addEventListener('click', () => togglePasswordVisibility(passwordInput, pwdIcon1));
    }

    if (btnTogglePwd2 && confirmPasswordInput) {
      btnTogglePwd2.addEventListener('click', () => togglePasswordVisibility(confirmPasswordInput, pwdIcon2));
    }

    // Password Input Listeners for Strength & Match validation
    if (passwordInput) {
      passwordInput.addEventListener('input', updatePasswordSecurityUI);
    }

    if (confirmPasswordInput) {
      confirmPasswordInput.addEventListener('input', updatePasswordSecurityUI);
    }

    // Reset & Cancel
    if (btnCancel) {
      btnCancel.addEventListener('click', resetWorkspace);
    }

    if (btnHeaderReset) {
      btnHeaderReset.addEventListener('click', resetWorkspace);
    }

    // Encrypt Action Button
    if (btnEncryptPdf) {
      btnEncryptPdf.addEventListener('click', executeEncryption);
    }
  }

  // Password Visibility Toggle Logic
  function togglePasswordVisibility(inputEl, iconEl) {
    if (!inputEl) return;
    const isPassword = inputEl.type === 'password';
    inputEl.type = isPassword ? 'text' : 'password';

    if (iconEl) {
      iconEl.setAttribute('data-lucide', isPassword ? 'eye-off' : 'eye');
      if (window.lucide) {
        window.lucide.createIcons();
      }
    }
  }

  // Password Strength & Match Validation Engine
  function calculatePasswordStrength(pwd) {
    if (!pwd || pwd.length === 0) return { score: 0, textKey: 'strength_empty' };

    let score = 0;
    if (pwd.length >= 6) score += 1;
    if (pwd.length >= 10) score += 1;
    if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

    // Normalize to 1..4 scale
    if (score <= 1) return { score: 1, textKey: 'strength_weak', color: '#f43f5e' };
    if (score === 2 || score === 3) return { score: 2, textKey: 'strength_medium', color: '#f59e0b' };
    if (score === 4) return { score: 3, textKey: 'strength_strong', color: '#10b981' };
    return { score: 4, textKey: 'strength_verystrong', color: '#06b6d4' };
  }

  function updatePasswordSecurityUI() {
    const pwd1 = passwordInput ? passwordInput.value : '';
    const pwd2 = confirmPasswordInput ? confirmPasswordInput.value : '';

    // 1. Password Strength
    const strength = calculatePasswordStrength(pwd1);
    if (pwdStrengthLabel) {
      pwdStrengthLabel.textContent = t(strength.textKey);
      pwdStrengthLabel.style.color = strength.color || 'var(--text-muted)';
    }

    const bars = [pwdBar1, pwdBar2, pwdBar3, pwdBar4];
    bars.forEach((bar, idx) => {
      if (!bar) return;
      if (idx < strength.score) {
        bar.style.background = strength.color;
        bar.style.boxShadow = `0 0 8px ${strength.color}80`;
      } else {
        bar.style.background = 'rgba(255, 255, 255, 0.1)';
        bar.style.boxShadow = 'none';
      }
    });

    // 2. Password Match Status
    if (!pwdMatchStatus || !matchStatusText) return;

    if (!pwd1 && !pwd2) {
      pwdMatchStatus.className = 'match-status match-idle';
      matchStatusText.textContent = t('match_idle');
      if (matchStatusIcon) matchStatusIcon.setAttribute('data-lucide', 'info');
    } else if (pwd1 && pwd2 && pwd1 === pwd2) {
      pwdMatchStatus.className = 'match-status match-success';
      matchStatusText.textContent = t('match_success');
      if (matchStatusIcon) matchStatusIcon.setAttribute('data-lucide', 'check-circle-2');
    } else if (pwd2.length > 0 && pwd1 !== pwd2) {
      pwdMatchStatus.className = 'match-status match-error';
      matchStatusText.textContent = t('match_error');
      if (matchStatusIcon) matchStatusIcon.setAttribute('data-lucide', 'alert-circle');
    } else {
      pwdMatchStatus.className = 'match-status match-idle';
      matchStatusText.textContent = t('match_idle');
      if (matchStatusIcon) matchStatusIcon.setAttribute('data-lucide', 'info');
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // Handle User File Selection
  async function handleFileSelection(file) {
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      showToast(t('toast_invalid_pdf'), 'error');
      return;
    }

    try {
      showToast(t('progress_encrypting'), 'info');
      const arrayBuffer = await file.arrayBuffer();
      const uint8 = new Uint8Array(arrayBuffer);

      // Verify PDF with PDFLib
      if (!window.PDFLib) {
        throw new Error('PDF-Lib is still loading. Please try again.');
      }

      const pdfDoc = await window.PDFLib.PDFDocument.load(uint8, {
        ignoreEncryption: true,
        updateMetadata: false
      });

      if (pdfDoc.isEncrypted) {
        showToast(t('toast_already_encrypted'), 'warning');
        return;
      }

      currentFile = file;
      currentPdfBytes = uint8;
      currentPdfDoc = pdfDoc;
      pageCount = pdfDoc.getPageCount();

      // Set default output filename based on uploaded file
      const baseName = file.name.replace(/\.[^/.]+$/, '');
      if (outputFilenameInput) {
        outputFilenameInput.value = `${baseName}_protected`;
      }

      // Update UI displays
      if (fileNameDisplay) fileNameDisplay.textContent = file.name;
      if (fileSizeDisplay) fileSizeDisplay.textContent = formatBytes(file.size);
      if (filePagesDisplay) {
        filePagesDisplay.textContent = (pageCount === 1)
          ? t('pages_single')
          : t('pages_total', { n: pageCount });
      }

      // Reveal Workspace
      if (dropzone) dropzone.classList.add('hidden');
      if (configPanel) configPanel.classList.remove('hidden');
      if (btnHeaderReset) btnHeaderReset.disabled = false;

      // Focus password input
      if (passwordInput) {
        passwordInput.value = '';
        if (confirmPasswordInput) confirmPasswordInput.value = '';
        updatePasswordSecurityUI();
        setTimeout(() => passwordInput.focus(), 150);
      }

      if (window.lucide) {
        window.lucide.createIcons();
      }

    } catch (err) {
      console.error('Failed to load PDF file:', err);
      showToast(t('toast_invalid_pdf') + ' (' + err.message + ')', 'error');
    }
  }

  // Load Sample PDF Generator
  async function loadSamplePDF() {
    try {
      showToast(t('toast_sample_generating'), 'info');

      if (!window.PDFLib) {
        throw new Error('PDF-Lib library not loaded');
      }

      const { PDFDocument, rgb, StandardFonts } = window.PDFLib;
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      // Page 1: Executive Overview
      const page1 = pdfDoc.addPage([600, 800]);
      page1.drawRectangle({
        x: 0,
        y: 730,
        width: 600,
        height: 70,
        color: rgb(0.95, 0.25, 0.37)
      });
      page1.drawText('CONFIDENTIAL FINANCIAL REPORT', {
        x: 50,
        y: 755,
        size: 20,
        font: fontBold,
        color: rgb(1, 1, 1)
      });
      page1.drawText('Q4 Strategic Revenue & Asset Security Overview', {
        x: 50,
        y: 690,
        size: 14,
        font: fontBold,
        color: rgb(0.1, 0.15, 0.25)
      });
      page1.drawText('This document contains sensitive proprietary data protected by client-side AES-256 encryption.', {
        x: 50,
        y: 660,
        size: 11,
        font: font,
        color: rgb(0.3, 0.35, 0.45)
      });
      page1.drawText('1. Executive Summary', {
        x: 50,
        y: 610,
        size: 13,
        font: fontBold,
        color: rgb(0.15, 0.2, 0.3)
      });
      page1.drawText('Enterprise revenue reached record expansion throughout global markets.', {
        x: 50,
        y: 585,
        size: 10.5,
        font: font,
        color: rgb(0.25, 0.3, 0.4)
      });
      page1.drawText('Security protocols mandate AES-256 password protection on all distributed copies.', {
        x: 50,
        y: 565,
        size: 10.5,
        font: font,
        color: rgb(0.25, 0.3, 0.4)
      });

      // Page 2: Audit Checklist
      const page2 = pdfDoc.addPage([600, 800]);
      page2.drawText('2. Compliance & Verification Checklist', {
        x: 50,
        y: 740,
        size: 16,
        font: fontBold,
        color: rgb(0.1, 0.15, 0.25)
      });
      page2.drawText('Client-side zero-trust password validation executed inside the browser memory.', {
        x: 50,
        y: 710,
        size: 11,
        font: font,
        color: rgb(0.3, 0.35, 0.45)
      });

      const samplePdfBytes = await pdfDoc.save();
      const sampleBlob = new Blob([samplePdfBytes], { type: 'application/pdf' });
      const sampleFile = new File([sampleBlob], 'sample_confidential_report.pdf', { type: 'application/pdf' });

      await handleFileSelection(sampleFile);

    } catch (err) {
      console.error('Error generating sample PDF:', err);
      showToast(t('toast_sample_error') + err.message, 'error');
    }
  }

  // Reset Workspace to Default
  function resetWorkspace() {
    currentFile = null;
    currentPdfBytes = null;
    currentPdfDoc = null;
    pageCount = 0;
    isEncrypting = false;

    if (fileInput) fileInput.value = '';
    if (passwordInput) passwordInput.value = '';
    if (confirmPasswordInput) confirmPasswordInput.value = '';
    if (outputFilenameInput) outputFilenameInput.value = 'protected_document';

    updatePasswordSecurityUI();

    if (progressCard) progressCard.classList.add('hidden');
    if (configPanel) configPanel.classList.add('hidden');
    if (dropzone) dropzone.classList.remove('hidden');
    if (btnHeaderReset) btnHeaderReset.disabled = true;

    showToast(t('toast_file_reset'), 'info');
  }

  // Execute PDF Password Encryption
  async function executeEncryption() {
    if (isEncrypting) return;

    if (!currentPdfBytes) {
      showToast(t('toast_invalid_pdf'), 'error');
      return;
    }

    const password = passwordInput ? passwordInput.value : '';
    const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value : '';

    // Validate Passwords
    if (!password || password.trim().length === 0) {
      showToast(t('toast_pwd_empty'), 'warning');
      if (passwordInput) passwordInput.focus();
      return;
    }

    if (password !== confirmPassword) {
      showToast(t('toast_pwd_mismatch'), 'error');
      if (confirmPasswordInput) confirmPasswordInput.focus();
      return;
    }

    // Check encryption library availability
    if (!window.PDFEncrypt || typeof window.PDFEncrypt.encryptPDF !== 'function') {
      showToast('Encryption engine (@pdfsmaller/pdf-encrypt) is loading. Please wait a moment...', 'warning');
      return;
    }

    isEncrypting = true;
    setLoadingState(true);

    try {
      updateProgress(15, t('progress_encrypting'));

      const algorithm = encryptionAlgorithmSelect ? encryptionAlgorithmSelect.value : 'AES-256';
      const allowPrinting = permPrintingCheck ? permPrintingCheck.checked : true;
      const allowCopying = permCopyingCheck ? permCopyingCheck.checked : true;
      const allowModifying = permModifyingCheck ? permModifyingCheck.checked : false;

      const encryptOptions = {
        algorithm: algorithm,
        ownerPassword: password,
        allowPrinting: allowPrinting,
        allowCopying: allowCopying,
        allowModifying: allowModifying,
        allowAnnotating: allowModifying,
        allowFillingForms: true,
        allowContentAccessibility: true
      };

      updateProgress(45, t('progress_encrypting'));

      // Perform encryption client-side
      const encryptedBytes = await window.PDFEncrypt.encryptPDF(currentPdfBytes, password, encryptOptions);

      updateProgress(85, 'Finalizing encrypted package...');

      const outputName = (outputFilenameInput && outputFilenameInput.value.trim())
        ? outputFilenameInput.value.trim()
        : 'protected_document';

      // Download file
      const blob = new Blob([encryptedBytes], { type: 'application/pdf' });
      downloadBlob(blob, `${outputName}.pdf`);

      updateProgress(100, 'Complete!');

      setTimeout(() => {
        showToast(t('toast_encrypt_success', { name: outputName }), 'success');
        setLoadingState(false);
        if (progressCard) progressCard.classList.add('hidden');
      }, 400);

    } catch (err) {
      console.error('Encryption failed:', err);
      let errMsg = err.message || err.toString();
      if (err.name === 'AlreadyEncryptedError' || errMsg.includes('AlreadyEncrypted')) {
        errMsg = t('toast_already_encrypted');
      }
      showToast(t('toast_encrypt_error') + errMsg, 'error');
      setLoadingState(false);
      if (progressCard) progressCard.classList.add('hidden');
    } finally {
      isEncrypting = false;
    }
  }

  function setLoadingState(loading) {
    if (btnEncryptPdf) btnEncryptPdf.disabled = loading;
    if (btnCancel) btnCancel.disabled = loading;
    if (btnChangeFile) btnChangeFile.disabled = loading;
    if (btnHeaderReset) btnHeaderReset.disabled = loading;

    if (btnSpinner) {
      if (loading) btnSpinner.classList.remove('hidden');
      else btnSpinner.classList.add('hidden');
    }

    if (btnEncryptText) {
      btnEncryptText.textContent = loading ? t('btn_encrypting') : t('btn_encrypt_pdf');
    }

    if (progressCard) {
      if (loading) progressCard.classList.remove('hidden');
    }
  }

  function updateProgress(percent, statusText) {
    if (progressPercent) progressPercent.textContent = `${percent}%`;
    if (progressFill) progressFill.style.width = `${percent}%`;
    if (progressStatusText && statusText) progressStatusText.textContent = statusText;
  }

  // Trigger Browser File Download
  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  }

  // Helper: Format File Bytes
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
