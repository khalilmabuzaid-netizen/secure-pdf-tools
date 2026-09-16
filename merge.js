/**
 * MergePDF Pro - Client-Side PDF Merger using pdf-lib
 * 100% Client-Side Processing • Zero Data Transmitted
 * Full Bilingual English / Arabic (RTL) Support
 */

(function () {
  'use strict';

  // Multi-language translation dictionary
  const translations = {
    en: {
      badge_client_side: "100% Client-Side",
      nav_home: "Home",
      nav_annotator: "Annotator",
      nav_compress: "Compress PDF",
      nav_split: "Split PDF",
      nav_add_files: "Add Files",
      nav_clear_all: "Clear All",
      hero_badge: "Local & Secure • No Files Ever Leave Your Device",
      hero_title: 'Merge Multiple <span class="gradient-text">PDF Files</span> Seamlessly',
      hero_subtitle: "Combine multiple documents into a single organized PDF. Reorder pages, organize files, and download your consolidated document in seconds.",
      dropzone_title: "Drop your PDF files here",
      dropzone_subtitle: "Drag and drop multiple PDF files simultaneously, or browse from your computer",
      btn_browse_files: "Browse PDF Files",
      feature_multiple: "Multiple Files Supported",
      feature_order: "Custom Merge Order",
      feature_instant: "Instant Client-Side Merging",
      queue_title: "Files to Merge",
      btn_add_more: "Add More",
      btn_clear_queue: "Clear All",
      empty_title: "No PDF files selected yet",
      empty_desc: "Upload at least 2 PDF documents above to enable merging.",
      label_output_filename: "Output File Name",
      placeholder_output_filename: "merged_document",
      progress_preparing: "Preparing documents...",
      btn_merge_action: "Merge PDFs",
      merge_helper_desc: "Add at least 2 PDF files to begin merging.",
      merge_helper_ready: "Ready! Documents will be merged in the exact order shown above.",
      merge_helper_min_req: "At least 2 PDF files are required for merging.",
      merge_merging: "Merging PDFs...",
      merge_btn_add_more: "Merge PDFs (Add {n} more)",
      merge_btn_ready: "Merge {n} PDFs",
      file_singular: "file",
      files_plural: "files",
      page_singular: "page",
      pages_plural: "pages",
      total_suffix: "total",
      loading_pages: "Loading...",
      unreadable_file: "Unreadable file",
      toast_skipped: "{n} non-PDF file(s) skipped. Please upload PDF files only.",
      toast_adding: "Adding {n} file(s)...",
      toast_added: "Added {n} file(s) to queue. Total: {total}",
      toast_removed: 'Removed "{name}"',
      toast_cleared: "Queue cleared",
      toast_select_min: "Please select at least 2 PDF files to merge.",
      toast_library_error: "PDF-Lib library is not ready. Please check your internet connection.",
      toast_success: "Merged {files} documents ({pages} pages) in {time}s!",
      merge_seo_badge: "Fast & Private PDF Combiner",
      merge_seo_title: "How to Merge Multiple PDF Files Online for Free",
      merge_seo_subtitle: "Combine reports, contracts, receipts, and scans into a single organized document with 100% client-side processing.",
      merge_step1_title: "1. Select Multiple PDFs",
      merge_step1_desc: "Drag and drop two or more PDF files into the upload box or browse from your desktop or mobile device.",
      merge_step2_title: "2. Verify Order & Pages",
      merge_step2_desc: "Review the queued files, check their total page counts, and arrange them into your preferred sequence.",
      merge_step3_title: "3. Merge & Save Instantly",
      merge_step3_desc: "Enter an output filename, click Merge PDFs, and download your consolidated PDF file in seconds.",
      merge_faq_title: "Frequently Asked Questions",
      merge_faq_q1: "Are my documents uploaded to a cloud server to merge?",
      merge_faq_a1: "No. Merge PDF Pro executes with 100% client-side processing in your browser. With no server uploads, your private files never touch the internet, ensuring optimal privacy and compliance.",
      merge_faq_q2: "Does merging affect the quality of text or images in my PDFs?",
      merge_faq_a2: "Not at all. The merging engine uses native vector page cloning, preserving original document formatting, sharp text, and high-resolution images without compression artifacts.",
      merge_faq_q3: "How many files can I combine in a single merge operation?",
      merge_faq_a3: "You can combine multiple documents simultaneously. The process is powered directly by your computer hardware for lightning-fast results."
    },
    ar: {
      badge_client_side: "محلي ١٠٠٪ في المتصفح",
      nav_home: "الرئيسية",
      nav_annotator: "محرر PDF",
      nav_compress: "ضغط PDF",
      nav_split: "تقسيم PDF",
      nav_add_files: "إضافة ملفات",
      nav_clear_all: "مسح الكل",
      hero_badge: "محلي وآمن • لا تغادر ملفاتك جهازك أبداً",
      hero_title: 'دمج عدة <span class="gradient-text">ملفات PDF</span> بسهولة فائقة',
      hero_subtitle: "اجمع عدة مستندات في ملف PDF واحد منظم. رتب الصفحات، ونظم الملفات، وحمّل مستندك المدمج خلال ثوانٍ.",
      dropzone_title: "اسحب ملفات PDF هنا",
      dropzone_subtitle: "اسحب وأفلت عدة ملفات PDF في وقت واحد، أو تصفح من جهازك",
      btn_browse_files: "استعراض ملفات PDF",
      feature_multiple: "دعم عدة ملفات معاً",
      feature_order: "ترتيب دمج مخصص",
      feature_instant: "دمج فوري محلياً",
      queue_title: "الملفات المراد دمجها",
      btn_add_more: "إضافة المزيد",
      btn_clear_queue: "مسح الكل",
      empty_title: "لم يتم اختيار أي ملفات PDF بعد",
      empty_desc: "قم برفع ملفين PDF على الأقل أعلاه للبدء في الدمج.",
      label_output_filename: "اسم الملف الناتج",
      placeholder_output_filename: "merged_document",
      progress_preparing: "جاري تجهيز المستندات...",
      btn_merge_action: "دمج ملفات PDF",
      merge_helper_desc: "أضف ملفين PDF على الأقل للبدء في الدمج.",
      merge_helper_ready: "جاهز! سيتم دمج المستندات بنفس الترتيب الموضح أعلاه.",
      merge_helper_min_req: "يلزم وجود ملفين PDF على الأقل للدمج.",
      merge_merging: "جاري دمج ملفات PDF...",
      merge_btn_add_more: "دمج ملفات PDF (أضف {n} إضافية)",
      merge_btn_ready: "دمج {n} ملفات PDF",
      file_singular: "ملف",
      files_plural: "ملفات",
      page_singular: "صفحة",
      pages_plural: "صفحات",
      total_suffix: "إجمالي",
      loading_pages: "جاري التحميل...",
      unreadable_file: "ملف غير قابل للقراءة",
      toast_skipped: "تم تخطي {n} ملف(ات) غير متوافقة. يرجى رفع ملفات PDF فقط.",
      toast_adding: "جاري إضافة {n} ملف(ات)...",
      toast_added: "تمت إضافة {n} ملف(ات). الإجمالي: {total}",
      toast_removed: 'تم حذف "{name}"',
      toast_cleared: "تم مسح قائمة الانتظار",
      toast_select_min: "يرجى اختيار ملفين PDF على الأقل للدمج.",
      toast_library_error: "مكتبة PDF-Lib غير جاهزة. يرجى التحقق من اتصالك بالإنترنت.",
      toast_success: "تم دمج {files} مستندات ({pages} صفحة) في {time} ثانية!",
      merge_seo_badge: "دمج ملفات PDF سريع وآمن",
      merge_seo_title: "كيفية دمج عدة ملفات PDF معاً عبر الإنترنت مجاناً",
      merge_seo_subtitle: "اجمع التقارير والعقود والإيصالات في مستند واحد منظم بسرعة فائقة ومعالجة محلية ١٠٠٪.",
      merge_step1_title: "١. اختيار ملفات PDF متعددة",
      merge_step1_desc: "اسحب وأفلت ملفين أو أكثر من ملفات PDF في منطقة التحميل أو تصفح من جهازك المكتبي أو المحمول.",
      merge_step2_title: "٢. التحقق من الترتيب والصفحات",
      merge_step2_desc: "راجع الملفات المدرجة في قائمة الانتظار، وتحقق من عدد صفحاتها، ورتبها بالترتيب المطلوب.",
      merge_step3_title: "٣. الدمج والتحميل الفوري",
      merge_step3_desc: "اكتب اسم الملف المدمج، ثم اضغط على زر دمج PDF لتحميل ملفك الموحد في ثوانٍ معدودة.",
      merge_faq_title: "الأسئلة الشائعة",
      merge_faq_q1: "هل يتم رفع مستنداتي إلى خادم سحابي لدمجها؟",
      merge_faq_a1: "كلا. تعمل أداة دمج PDF بمعالجة محلية ١٠٠٪ داخل متصفحك. مع انعدام الرفع إلى أي خادم، تبقى ملفاتك آمنة وخاصة على جهازك تماماً.",
      merge_faq_q2: "هل يؤثر الدمج على جودة النصوص أو الصور داخل المستند؟",
      merge_faq_a2: "أبداً. تعتمد الأداة على استنساخ الصفحات بصيغتها الأصلية، مما يحافظ على وضوح الخطوط وجودة الصور دون أي تشويه أو ضغط.",
      merge_faq_q3: "كم عدد الملفات التي يمكنني دمجها في عملية واحدة؟",
      merge_faq_a3: "يمكنك دمج العديد من الملفات في نفس الوقت بكل سلاسة، حيث تعتمد سرعة المعالجة على موارد جهازك مباشرة."
    }
  };

  let currentLang = 'en';

  // State
  let queuedFiles = []; // Array of { id, file, name, size, pageCount, buffer }
  let isMerging = false;
  let dragSrcIndex = null;

  // DOM Elements
  const dropzone = document.getElementById('dropzone');
  const fileInput = document.getElementById('pdf-file-input');
  const btnBrowseFiles = document.getElementById('btn-browse-files');
  const btnHeaderAdd = document.getElementById('btn-header-add');
  const btnHeaderClear = document.getElementById('btn-header-clear');
  const btnAddMore = document.getElementById('btn-add-more');
  const btnClearQueue = document.getElementById('btn-clear-queue');
  const btnLanguageToggle = document.getElementById('btn-language-toggle');
  const langToggleText = document.getElementById('lang-toggle-text');
  const queueList = document.getElementById('queue-list');
  const queueEmpty = document.getElementById('queue-empty');
  const fileCountBadge = document.getElementById('file-count-badge');
  const totalPagesBadge = document.getElementById('total-pages-badge');
  const btnMergeAction = document.getElementById('btn-merge-action');
  const mergeButtonText = document.getElementById('merge-button-text');
  const mergeHelperText = document.getElementById('merge-helper-text');
  const outputFilenameInput = document.getElementById('output-filename');
  const progressWrapper = document.getElementById('progress-wrapper');
  const progressStatus = document.getElementById('progress-status');
  const progressPercent = document.getElementById('progress-percent');
  const progressBar = document.getElementById('progress-bar');
  const toastEl = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  const toastIcon = document.getElementById('toast-icon');

  let toastTimeout = null;

  // Initialize
  function init() {
    setupEventListeners();
    applyLanguage(currentLang);
    renderQueue();
    if (window.lucide) {
      lucide.createIcons();
    }
  }

  // Translation helper
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

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const translation = t(key);
      if (translation) {
        el.placeholder = translation;
      }
    });

    renderQueue();

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  // Event Listeners
  function setupEventListeners() {
    // Language Toggle
    if (btnLanguageToggle) {
      btnLanguageToggle.addEventListener('click', toggleLanguage);
    }

    // Browse button triggers
    if (btnBrowseFiles) btnBrowseFiles.addEventListener('click', () => fileInput.click());
    if (btnHeaderAdd) btnHeaderAdd.addEventListener('click', () => fileInput.click());
    if (btnAddMore) btnAddMore.addEventListener('click', () => fileInput.click());

    // File input change
    if (fileInput) fileInput.addEventListener('change', handleFileInput);

    // Clear queue triggers
    if (btnHeaderClear) btnHeaderClear.addEventListener('click', clearQueue);
    if (btnClearQueue) btnClearQueue.addEventListener('click', clearQueue);

    // Merge Action
    if (btnMergeAction) btnMergeAction.addEventListener('click', executeMerge);

    // Dropzone Drag & Drop
    if (dropzone) {
      ['dragenter', 'dragover'].forEach((eventName) => {
        dropzone.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          dropzone.classList.add('drag-over');
        });
      });

      ['dragleave', 'drop'].forEach((eventName) => {
        dropzone.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          dropzone.classList.remove('drag-over');
        });
      });

      dropzone.addEventListener('drop', (e) => {
        const files = e.dataTransfer?.files;
        if (files && files.length > 0) {
          addFiles(Array.from(files));
        }
      });

      // Keyboard navigation on dropzone
      dropzone.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          fileInput.click();
        }
      });
    }

    // Prevent default drag/drop on window
    window.addEventListener('dragover', (e) => e.preventDefault(), false);
    window.addEventListener('drop', (e) => {
      e.preventDefault();
      if (!e.target.closest('#dropzone') && e.dataTransfer?.files?.length) {
        addFiles(Array.from(e.dataTransfer.files));
      }
    }, false);
  }

  // Handle multiple file input
  function handleFileInput(e) {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      addFiles(files);
    }
    fileInput.value = '';
  }

  // Format File Size
  function formatBytes(bytes, decimals = 1) {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  // Add Files to Queue
  async function addFiles(files) {
    const pdfFiles = files.filter((file) => {
      const isPdfType = file.type === 'application/pdf';
      const isPdfExt = file.name.toLowerCase().endsWith('.pdf');
      return isPdfType || isPdfExt;
    });

    const nonPdfCount = files.length - pdfFiles.length;
    if (nonPdfCount > 0) {
      showToast(t('toast_skipped', { n: nonPdfCount }), 'warning');
    }

    if (pdfFiles.length === 0) {
      return;
    }

    showToast(t('toast_adding', { n: pdfFiles.length }), 'info');

    let loadedCount = 0;
    for (const file of pdfFiles) {
      const fileId = 'pdf_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);

      const item = {
        id: fileId,
        file: file,
        name: file.name,
        size: file.size,
        pageCount: null,
        buffer: null,
        error: null
      };

      queuedFiles.push(item);
      renderQueue();

      try {
        const buffer = await file.arrayBuffer();
        item.buffer = buffer;

        if (window.PDFLib) {
          try {
            const pdfDoc = await PDFLib.PDFDocument.load(buffer, { ignoreEncryption: true });
            item.pageCount = pdfDoc.getPageCount();
          } catch (docErr) {
            console.warn('Could not inspect page count for', file.name, docErr);
            item.pageCount = null;
          }
        }
        loadedCount++;
      } catch (err) {
        console.error('Failed reading buffer for', file.name, err);
        item.error = t('unreadable_file');
      }

      renderQueue();
    }

    showToast(t('toast_added', { n: pdfFiles.length, total: queuedFiles.length }), 'success');
  }

  // Remove single file
  function removeFile(fileId) {
    if (isMerging) return;
    const index = queuedFiles.findIndex((f) => f.id === fileId);
    if (index !== -1) {
      const removed = queuedFiles.splice(index, 1)[0];
      renderQueue();
      showToast(t('toast_removed', { name: removed.name }), 'info');
    }
  }

  // Clear all files
  function clearQueue() {
    if (isMerging) return;
    if (queuedFiles.length === 0) return;
    queuedFiles = [];
    renderQueue();
    showToast(t('toast_cleared'), 'info');
  }

  // Move file up
  function moveUp(index) {
    if (isMerging || index <= 0) return;
    const temp = queuedFiles[index];
    queuedFiles[index] = queuedFiles[index - 1];
    queuedFiles[index - 1] = temp;
    renderQueue();
  }

  // Move file down
  function moveDown(index) {
    if (isMerging || index >= queuedFiles.length - 1) return;
    const temp = queuedFiles[index];
    queuedFiles[index] = queuedFiles[index + 1];
    queuedFiles[index + 1] = temp;
    renderQueue();
  }

  // Update UI & Render File Queue
  function renderQueue() {
    const count = queuedFiles.length;
    const fileUnit = count === 1 ? t('file_singular') : t('files_plural');
    if (fileCountBadge) {
      fileCountBadge.textContent = `${count} ${fileUnit}`;
    }

    // Compute total pages if available
    const knownPages = queuedFiles.reduce((acc, cur) => acc + (cur.pageCount || 0), 0);
    if (totalPagesBadge) {
      if (count > 0 && knownPages > 0) {
        const pageUnit = knownPages === 1 ? t('page_singular') : t('pages_plural');
        totalPagesBadge.textContent = `${knownPages} ${pageUnit} ${t('total_suffix')}`;
        totalPagesBadge.classList.remove('hidden');
      } else {
        totalPagesBadge.classList.add('hidden');
      }
    }

    // Header buttons state
    if (btnHeaderClear) btnHeaderClear.disabled = count === 0 || isMerging;
    if (btnClearQueue) btnClearQueue.disabled = count === 0 || isMerging;

    // Empty state vs items list
    if (count === 0) {
      if (queueEmpty) queueEmpty.classList.remove('hidden');
      if (queueList) queueList.innerHTML = '';
      if (btnMergeAction) btnMergeAction.disabled = true;
      if (mergeButtonText) mergeButtonText.textContent = t('btn_merge_action');
      if (mergeHelperText) {
        mergeHelperText.innerHTML = `<i data-lucide="info"></i><span>${t('merge_helper_desc')}</span>`;
      }
    } else {
      if (queueEmpty) queueEmpty.classList.add('hidden');
      if (queueList) {
        queueList.innerHTML = '';

        queuedFiles.forEach((fileItem, index) => {
          const itemEl = document.createElement('div');
          itemEl.className = 'file-item';
          itemEl.setAttribute('role', 'listitem');
          itemEl.setAttribute('draggable', isMerging ? 'false' : 'true');
          itemEl.dataset.index = index;

          const orderNum = index + 1;

          let pagesHtml = '';
          if (fileItem.pageCount !== null) {
            const pageWord = fileItem.pageCount === 1 ? t('page_singular') : t('pages_plural');
            pagesHtml = `<span class="file-pages">${fileItem.pageCount} ${pageWord}</span>`;
          } else if (fileItem.error) {
            pagesHtml = `<span class="file-pages text-danger">${fileItem.error}</span>`;
          } else {
            pagesHtml = `<span class="file-pages">${t('loading_pages')}</span>`;
          }

          itemEl.innerHTML = `
            <div class="file-left">
              <div class="drag-handle" title="Drag to reorder" aria-label="Drag to reorder">
                <i data-lucide="grip-vertical"></i>
              </div>
              <div class="file-order-badge">#${orderNum}</div>
              <div class="file-icon-wrap">
                <i data-lucide="file-text"></i>
              </div>
              <div class="file-details">
                <span class="file-name" title="${escapeHtml(fileItem.name)}">${escapeHtml(fileItem.name)}</span>
                <div class="file-meta">
                  <span>${formatBytes(fileItem.size)}</span>
                  <span>•</span>
                  ${pagesHtml}
                </div>
              </div>
            </div>
            <div class="file-right">
              <button class="item-btn move-up-btn" title="Move Up" ${index === 0 || isMerging ? 'disabled' : ''} aria-label="Move file up">
                <i data-lucide="chevron-up"></i>
              </button>
              <button class="item-btn move-down-btn" title="Move Down" ${index === queuedFiles.length - 1 || isMerging ? 'disabled' : ''} aria-label="Move file down">
                <i data-lucide="chevron-down"></i>
              </button>
              <button class="item-btn remove-btn" title="Remove from queue" ${isMerging ? 'disabled' : ''} aria-label="Remove file">
                <i data-lucide="trash-2"></i>
              </button>
            </div>
          `;

          const btnUp = itemEl.querySelector('.move-up-btn');
          const btnDown = itemEl.querySelector('.move-down-btn');
          const btnRemove = itemEl.querySelector('.remove-btn');

          btnUp.addEventListener('click', (e) => {
            e.stopPropagation();
            moveUp(index);
          });

          btnDown.addEventListener('click', (e) => {
            e.stopPropagation();
            moveDown(index);
          });

          btnRemove.addEventListener('click', (e) => {
            e.stopPropagation();
            removeFile(fileItem.id);
          });

          setupItemDragEvents(itemEl, index);
          queueList.appendChild(itemEl);
        });
      }

      // Merge button state
      if (count < 2) {
        if (btnMergeAction) btnMergeAction.disabled = true;
        if (mergeButtonText) mergeButtonText.textContent = t('merge_btn_add_more', { n: 2 - count });
        if (mergeHelperText) {
          mergeHelperText.innerHTML = `<i data-lucide="info"></i><span>${t('merge_helper_min_req')}</span>`;
        }
      } else {
        if (btnMergeAction) btnMergeAction.disabled = isMerging;
        if (mergeButtonText) mergeButtonText.textContent = t('merge_btn_ready', { n: count });
        if (mergeHelperText) {
          mergeHelperText.innerHTML = `<i data-lucide="sparkles"></i><span>${t('merge_helper_ready')}</span>`;
        }
      }
    }

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function setupItemDragEvents(el, index) {
    el.addEventListener('dragstart', (e) => {
      if (isMerging) return;
      dragSrcIndex = index;
      el.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', index);
    });

    el.addEventListener('dragend', () => {
      el.classList.remove('dragging');
      document.querySelectorAll('.file-item').forEach((item) => {
        item.classList.remove('drag-over-item');
      });
    });

    el.addEventListener('dragover', (e) => {
      e.preventDefault();
      if (isMerging) return;
      e.dataTransfer.dropEffect = 'move';
      el.classList.add('drag-over-item');
    });

    el.addEventListener('dragleave', () => {
      el.classList.remove('drag-over-item');
    });

    el.addEventListener('drop', (e) => {
      e.preventDefault();
      e.stopPropagation();
      el.classList.remove('drag-over-item');
      if (isMerging) return;

      const targetIndex = index;
      if (dragSrcIndex !== null && dragSrcIndex !== targetIndex) {
        const movedItem = queuedFiles.splice(dragSrcIndex, 1)[0];
        queuedFiles.splice(targetIndex, 0, movedItem);
        renderQueue();
      }
      dragSrcIndex = null;
    });
  }

  function setProgress(percent, statusText) {
    if (progressWrapper) progressWrapper.classList.remove('hidden');
    if (progressBar) progressBar.style.width = `${Math.min(100, Math.max(0, percent))}%`;
    if (progressPercent) progressPercent.textContent = `${Math.round(percent)}%`;
    if (statusText && progressStatus) {
      progressStatus.textContent = statusText;
    }
  }

  function hideProgress() {
    if (progressWrapper) progressWrapper.classList.add('hidden');
    if (progressBar) progressBar.style.width = '0%';
    if (progressPercent) progressPercent.textContent = '0%';
    if (progressStatus) progressStatus.textContent = t('progress_preparing');
  }

  // Execute Merge Operation
  async function executeMerge() {
    if (isMerging) return;

    if (queuedFiles.length < 2) {
      showToast(t('toast_select_min'), 'warning');
      return;
    }

    if (!window.PDFLib || !window.PDFLib.PDFDocument) {
      showToast(t('toast_library_error'), 'error');
      return;
    }

    isMerging = true;
    if (btnMergeAction) btnMergeAction.disabled = true;
    if (btnHeaderAdd) btnHeaderAdd.disabled = true;
    if (btnHeaderClear) btnHeaderClear.disabled = true;
    if (btnAddMore) btnAddMore.disabled = true;
    if (btnClearQueue) btnClearQueue.disabled = true;
    if (mergeButtonText) mergeButtonText.textContent = t('merge_merging');
    renderQueue();

    const startTime = Date.now();
    let totalMergedPages = 0;

    try {
      setProgress(5, t('progress_preparing'));

      const mergedPdf = await PDFLib.PDFDocument.create();
      const totalFiles = queuedFiles.length;

      for (let i = 0; i < totalFiles; i++) {
        const item = queuedFiles[i];
        const stepProgress = 10 + Math.round(((i + 1) / totalFiles) * 70);
        const statusMsg = currentLang === 'ar'
          ? `جاري دمج ملف ${i + 1} من ${totalFiles}: ${item.name}...`
          : `Merging file ${i + 1} of ${totalFiles}: ${item.name}...`;
        setProgress(stepProgress, statusMsg);

        let fileBuffer = item.buffer;
        if (!fileBuffer) {
          fileBuffer = await item.file.arrayBuffer();
          item.buffer = fileBuffer;
        }

        let pdfDoc;
        try {
          pdfDoc = await PDFLib.PDFDocument.load(fileBuffer, { ignoreEncryption: true });
        } catch (loadErr) {
          console.error(`Failed loading "${item.name}":`, loadErr);
          throw new Error(`File "${item.name}" could not be read.`);
        }

        const pageIndices = pdfDoc.getPageIndices();
        if (pageIndices.length > 0) {
          const copiedPages = await mergedPdf.copyPages(pdfDoc, pageIndices);
          copiedPages.forEach((page) => {
            mergedPdf.addPage(page);
          });
          totalMergedPages += pageIndices.length;
        }
      }

      setProgress(85, currentLang === 'ar' ? 'جاري إنهاء وتحسين المستند...' : 'Finalizing and compressing merged document...');
      const mergedPdfBytes = await mergedPdf.save();

      setProgress(95, currentLang === 'ar' ? 'جاري تجهيز التنزيل...' : 'Preparing download...');

      let finalName = (outputFilenameInput.value || 'merged_document').trim();
      finalName = finalName.replace(/\.pdf$/i, '');
      if (!finalName) finalName = 'merged_document';
      const downloadFilename = `${finalName}.pdf`;

      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
      const downloadUrl = URL.createObjectURL(blob);
      const downloadLink = document.createElement('a');
      downloadLink.href = downloadUrl;
      downloadLink.download = downloadFilename;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      setTimeout(() => {
        URL.revokeObjectURL(downloadUrl);
      }, 3000);

      setProgress(100, currentLang === 'ar' ? `تم! تم حفظ ${totalMergedPages} صفحة.` : `Done! Saved ${totalMergedPages} pages.`);

      const elapsedSec = ((Date.now() - startTime) / 1000).toFixed(1);
      showToast(t('toast_success', { files: totalFiles, pages: totalMergedPages, time: elapsedSec }), 'success');

      setTimeout(() => {
        hideProgress();
      }, 3500);

    } catch (err) {
      console.error('Error during merge execution:', err);
      showToast(err.message || 'Error merging PDFs.', 'error');
      hideProgress();
    } finally {
      isMerging = false;
      renderQueue();
    }
  }

  // Toast Notification System
  function showToast(message, type = 'info') {
    if (toastTimeout) {
      clearTimeout(toastTimeout);
    }

    if (toastMsg) toastMsg.textContent = message;

    if (toastEl) {
      toastEl.className = 'toast';
      toastEl.classList.add(`toast-${type}`);
    }

    if (toastIcon) {
      if (type === 'success') {
        toastIcon.setAttribute('data-lucide', 'check-circle-2');
      } else if (type === 'error') {
        toastIcon.setAttribute('data-lucide', 'alert-circle');
      } else if (type === 'warning') {
        toastIcon.setAttribute('data-lucide', 'alert-triangle');
      } else {
        toastIcon.setAttribute('data-lucide', 'info');
      }
    }

    if (window.lucide) {
      lucide.createIcons();
    }

    if (toastEl) toastEl.classList.remove('hidden');

    toastTimeout = setTimeout(() => {
      if (toastEl) toastEl.classList.add('hidden');
    }, 4500);
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
