/**
 * AnnotatePDF Pro - Interactive Client-Side PDF Annotator
 * Utilizes: Mozilla pdf.js, Fabric.js, MathJax 3, and PDF-Lib
 */

// Configure PDF.js Worker
if (window.pdfjsLib) {
  window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
}

/* ==========================================================================
   1. Multi-Language (i18n) Dictionary & System
   ========================================================================== */
const translations = {
  en: {
    badge_client_side: "100% Client-Side",
    nav_home: "Home",
    nav_upload: "Upload PDF",
    nav_sample: "Try Sample",
    nav_merge: "Merge PDF",
    nav_compress: "Compress PDF",
    nav_split: "Split PDF",
    nav_clear: "Clear Page",
    nav_export: "Download PDF",
    tool_select: "Select",
    tool_pen: "Pen",
    tool_highlighter: "Highlighter",
    tool_text: "Text",
    tool_math: "Math LaTeX",
    tool_delete: "Delete",
    action_undo: "Undo",
    action_redo: "Redo",
    prop_color: "Color",
    prop_size: "Size",
    prop_opacity: "Opacity",
    prop_font: "Font",
    prop_font_size: "Size",
    hint_default: "Select or draw on the document",
    hint_pen: "Drawing with freehand pen",
    hint_highlighter: "Highlighting text and diagrams",
    hint_text: "Click anywhere on canvas to place text",
    hint_math: "Insert MathJax equation",
    dropzone_title: "Drop your PDF here",
    dropzone_desc: "Drag and drop any PDF file to start annotating immediately with zero cloud uploads.",
    dropzone_browse: "Browse Local File",
    dropzone_sample: "Load Sample File",
    feature_private: "100% Private Client-Side",
    feature_math: "MathJax LaTeX Integration",
    feature_flatten: "Flatten & Export to PDF",
    label_page: "Page",
    math_modal_title: "Insert Math Formula",
    math_presets: "Presets:",
    math_input_label: "LaTeX Equation Syntax",
    math_preview_label: "Live Formula Preview",
    math_preview_placeholder: "Type LaTeX above to render live preview",
    math_color_label: "Formula Color",
    math_scale_label: "Initial Scale",
    btn_cancel: "Cancel",
    btn_insert_formula: "Insert onto PDF",
    loading_text: "Rendering document...",
    toast_pdf_loaded: "PDF loaded successfully!",
    toast_sample_loaded: "Interactive sample loaded!",
    toast_exported: "Annotated PDF downloaded successfully!",
    toast_no_pdf: "Please upload or load a PDF first.",
    toast_cleared: "Current page annotations cleared.",
    ad_space_label: "Advertisement Space (728x90)",
    footer_tagline: "100% Client-side, private, and secure document processing directly in your browser.",
    footer_privacy: "Privacy Policy",
    footer_terms: "Terms of Service",
    footer_contact: "Contact Us",
    footer_copyright: "© 2026 PDF Hub. All rights reserved.",
    cookie_consent_text: "We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.",
    cookie_learn_more: "Privacy Policy",
    cookie_accept_btn: "Accept",

    // OCR Tool SEO & FAQ
    ocr_seo_badge: "Privacy-First Text Recognition",
    ocr_seo_title: "How to Extract Text from PDF & Images with OCR",
    ocr_seo_subtitle: "Convert scanned documents and image files into searchable, editable text with 100% client-side processing and zero server uploads.",
    ocr_step1_title: "1. Upload Document",
    ocr_step1_desc: "Select or drag-and-drop any PDF file or image (PNG, JPG, WebP) directly into the secure browser workspace.",
    ocr_step2_title: "2. Choose Recognition Language",
    ocr_step2_desc: "Select English, Arabic, or Bilingual recognition, and pick the specific document page you wish to process.",
    ocr_step3_title: "3. Extract & Export Text",
    ocr_step3_desc: "Click Extract Text to run instant on-device OCR. Copy the editable text to your clipboard or download it as a .TXT file.",
    ocr_faq_title: "Frequently Asked Questions",
    ocr_faq_q1: "Are my documents or confidential files uploaded to any server?",
    ocr_faq_a1: "No. Our OCR engine operates with 100% client-side processing directly in your browser. With no server uploads, your confidential files never leave your computer, ensuring absolute privacy as part of our secure PDF tools suite.",
    ocr_faq_q2: "What file formats and image types can I extract text from?",
    ocr_faq_a2: "You can extract text from single or multi-page PDF documents, as well as PNG, JPG, JPEG, and WebP image formats. The built-in renderer preserves clarity for crisp character recognition.",
    ocr_faq_q3: "Can I extract mixed English and Arabic text from the same page?",
    ocr_faq_a3: "Yes! You can choose the Bilingual mode to recognize both English and Arabic script simultaneously on contracts, invoices, receipts, and research papers.",

    // Sign Tool SEO & FAQ
    sign_seo_badge: "Confidential & Private eSignatures",
    sign_seo_title: "How to Electronically Sign PDF Documents Online",
    sign_seo_subtitle: "Draw your custom signature and stamp it securely onto any page with 100% client-side processing and zero cloud uploads.",
    sign_step1_title: "1. Open Your PDF File",
    sign_step1_desc: "Drop your agreement, contract, or form into the secure dropzone to open it locally in your browser.",
    sign_step2_title: "2. Draw Electronic Signature",
    sign_step2_desc: "Use your mouse, finger, or digital pen on the canvas. Customize your ink color and stroke thickness to match your style.",
    sign_step3_title: "3. Position & Save Document",
    sign_step3_desc: "Select the target page, choose the signature position (e.g. Bottom Right), adjust the size, and download your signed PDF.",
    sign_faq_title: "Frequently Asked Questions",
    sign_faq_q1: "Does anyone else see my signature or contract?",
    sign_faq_a1: "Never. Sign PDF Pro operates with 100% client-side processing directly in your browser session. With no server uploads, your signature data and document content remain completely private on your own device.",
    sign_faq_q2: "Can I sign documents on my phone or tablet screen?",
    sign_faq_a2: "Yes! The signature pad is fully optimized for touchscreens and stylus pens, offering smooth stroke rendering for authentic, professional signatures on mobile and desktop.",
    sign_faq_q3: "Can I place multiple signatures or sign specific pages?",
    sign_faq_a3: "You can designate any page of your document and precisely position the signature in standard signing locations such as bottom right, bottom left, or center with adjustable scaling.",

    // Merge Tool SEO & FAQ
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
    merge_faq_a3: "You can combine multiple documents simultaneously. The process is powered directly by your computer hardware for lightning-fast results.",

    // Split Tool SEO & FAQ
    split_seo_badge: "Precision Page Extraction",
    split_seo_title: "How to Split & Extract Pages from PDF Documents",
    split_seo_subtitle: "Extract specific pages or custom ranges to create a new organized document in seconds with 100% client-side privacy.",
    split_step1_title: "1. Open PDF Document",
    split_step1_desc: "Select or drag your PDF file into the dropzone to inspect its total page count.",
    split_step2_title: "2. Define Pages or Use Presets",
    split_step2_desc: "Type custom page numbers (e.g. 1, 3-5, 8) or select presets such as Odd Pages, Even Pages, or First Half.",
    split_step3_title: "3. Extract & Download",
    split_step3_desc: "Set your output document name and click Split & Download to instantly save your tailored PDF.",
    split_faq_title: "Frequently Asked Questions",
    split_faq_q1: "Is my document uploaded to a server during page extraction?",
    split_faq_a1: "No. Split PDF Pro operates with 100% client-side processing in your browser. With no server uploads, your financial statements and confidential files retain complete privacy on your local machine.",
    split_faq_q2: "How do I format complex page ranges for extraction?",
    split_faq_a2: "You can combine individual numbers and hyphens separated by commas, such as '1, 3, 5-9, 12'. The live counter confirms the exact page count before you extract.",
    split_faq_q3: "Can I extract pages from password-protected or large PDFs?",
    split_faq_a3: "Yes, our client-side engine rapidly scans and extracts pages from documents of any length directly using your device's memory.",

    // Compress Tool SEO & FAQ
    compress_seo_badge: "Smart Client-Side Optimization",
    compress_seo_title: "How to Compress & Reduce PDF File Size Online",
    compress_seo_subtitle: "Shrink heavy PDF documents with intelligent quality presets while maintaining crisp text and 100% client-side privacy.",
    compress_step1_title: "1. Upload Your PDF File",
    compress_step1_desc: "Select any PDF document up to 25MB to begin on-device compression directly inside your browser.",
    compress_step2_title: "2. Choose Compression Level",
    compress_step2_desc: "Select Low Quality (maximum reduction), Medium Quality (recommended balance), or High Quality (crisp graphics).",
    compress_step3_title: "3. Compress & Save",
    compress_step3_desc: "Click Compress & Download to process pages in real-time, view your saved kilobytes, and download your optimized PDF.",
    compress_faq_title: "Frequently Asked Questions",
    compress_faq_q1: "Are my documents uploaded to a remote server for compression?",
    compress_faq_a1: "No. Our compression engine runs with 100% client-side processing. With no server uploads, your private financial, legal, and personal files stay securely on your computer.",
    compress_faq_q2: "How much file size reduction can I expect?",
    compress_faq_a2: "Depending on your selected preset and original image density, you can achieve between 30% and 85% reduction in total file size, making documents ideal for email attachments.",
    compress_faq_q3: "Why is there a 25MB file limit for compression?",
    compress_faq_a3: "Because processing runs entirely within your device's browser memory, the 25MB threshold prevents browser tab crashes and guarantees lightning-fast performance on all devices.",

    // Protect Tool SEO & FAQ
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
    nav_upload: "رفع ملف PDF",
    nav_sample: "تجربة نموذج",
    nav_merge: "دمج PDF",
    nav_compress: "ضغط PDF",
    nav_split: "تقسيم PDF",
    nav_clear: "مسح الصفحة",
    nav_export: "تحميل PDF",
    tool_select: "تحديد",
    tool_pen: "قلم حر",
    tool_highlighter: "قلم تمييز",
    tool_text: "نص",
    tool_math: "معادلة رياضية",
    tool_delete: "حذف",
    action_undo: "تراجع",
    action_redo: "إعادة",
    prop_color: "اللون",
    prop_size: "الحجم",
    prop_opacity: "الشفافية",
    prop_font: "الخط",
    prop_font_size: "الحجم",
    hint_default: "حدد عنصراً أو ارسم على المستند",
    hint_pen: "الرسم بالقلم الحر",
    hint_highlighter: "تمييز النصوص والرسوم",
    hint_text: "انقر على اللوحة لإضافة نص",
    hint_math: "إدراج معادلة رياضية بتنسيق LaTeX",
    dropzone_title: "اسحب ملف PDF هنا",
    dropzone_desc: "اسحب وأفلت أي ملف PDF للبدء في تدوين الملاحظات فوراً دون رفع أي بيانات للسحابة.",
    dropzone_browse: "استعراض ملف محلي",
    dropzone_sample: "تجربة نموذج جاهز",
    feature_private: "خصوصية كاملة ١٠٠٪ بدون خوادم",
    feature_math: "دعم معادلات MathJax و LaTeX",
    feature_flatten: "دمج وتصدير ملف PDF النهائي",
    label_page: "الصفحة",
    math_modal_title: "إدراج معادلة رياضية",
    math_presets: "نماذج جاهزة:",
    math_input_label: "صيغة معادلة LaTeX",
    math_preview_label: "معاينة مباشرة للمعادلة",
    math_preview_placeholder: "اكتب كود LaTeX أعلاه لمعاينة المعادلة",
    math_color_label: "لون المعادلة",
    math_scale_label: "الحجم المبدئي",
    btn_cancel: "إلغاء",
    btn_insert_formula: "إدراج في المستند",
    loading_text: "جاري تحميل المستند...",
    toast_pdf_loaded: "تم تحميل ملف PDF بنجاح!",
    toast_sample_loaded: "تم تحميل المستند النموذجي!",
    toast_exported: "تم دمج وتنزيل المستند بنجاح!",
    toast_no_pdf: "يرجى رفع أو فتح ملف PDF أولاً.",
    toast_cleared: "تم مسح ملاحظات الصفحة الحالية.",
    ad_space_label: "مساحة إعلانية (728×90)",
    footer_tagline: "معالجة مستندات محلية ١٠٠٪، خاصة وآمنة تماماً مباشرة في متصفحك.",
    footer_privacy: "سياسة الخصوصية",
    footer_terms: "شروط الاستخدام",
    footer_contact: "اتصل بنا",
    footer_copyright: "© ٢٠٢٦ PDF Hub. جميع الحقوق محفوظة.",
    cookie_consent_text: "نحن نستخدم ملفات تعريف الارتباط لتحسين تجربتك. باستمرارك في زيارة هذا الموقع، فإنك توافق على استخدامنا لملفات تعريف الارتباط.",
    cookie_learn_more: "سياسة الخصوصية",
    cookie_accept_btn: "موافق",

    // OCR Tool SEO & FAQ
    ocr_seo_badge: "التعرف الضوئي على النصوص مع حماية الخصوصية",
    ocr_seo_title: "كيفية استخراج النصوص من ملفات PDF والصور باستخدام OCR",
    ocr_seo_subtitle: "حول المستندات الممسوحة ضوئياً وملفات الصور إلى نصوص قابلة للبحث والتعديل مع معالجة محلية ١٠٠٪ دون رفع إلى خوادم.",
    ocr_step1_title: "١. رفع المستند أو الصورة",
    ocr_step1_desc: "حدد أو اسحب وأفلت أي ملف PDF أو صورة (PNG, JPG, WebP) مباشرة داخل مساحة العمل الآمنة في المتصفح.",
    ocr_step2_title: "٢. اختيار لغة التعرف",
    ocr_step2_desc: "اختر اللغة الإنجليزية أو العربية أو التعرف ثنائي اللغة، وحدد صفحة المستند المحددة التي ترغب في معالجتها.",
    ocr_step3_title: "٣. استخراج النص وتصديره",
    ocr_step3_desc: "انقر على استخراج النص لتشغيل التعرف الفوري محلياً. انسخ النص القابل للتعديل إلى الحافظة أو قم بتنزيله كملف TXT.",
    ocr_faq_title: "الأسئلة الشائعة",
    ocr_faq_q1: "هل يتم رفع مستنداتي أو ملفاتي الحساسة إلى أي خادم خارجي؟",
    ocr_faq_a1: "لا على الإطلاق. يعمل محرك OCR لدينا بمعالجة محلية ١٠٠٪ مباشرة داخل متصفحك. مع انعدام الرفع إلى الخوادم تماماً، لا تغادر مستنداتك جهازك أبداً، مما يضمن أقصى درجات الخصوصية والأمان.",
    ocr_faq_q2: "ما هي صيغ الملفات والصور المدعومة لاستخراج النصوص؟",
    ocr_faq_a2: "يمكنك استخراج النصوص من مستندات PDF متعددة الصفحات بالإضافة إلى صيغ الصور PNG و JPG و JPEG و WebP بدقة ووضوح فائقين.",
    ocr_faq_q3: "هل يمكنني استخراج نصوص تحتوي على اللغتين العربية والإنجليزية معاً؟",
    ocr_faq_a3: "نعم بكل تأكيد! يمكنك اختيار وضع ثنائي اللغة للتعرف على النصوص العربية والإنجليزية في وقت واحد على العقود والفواتير والأوراق البحثية.",

    // Sign Tool SEO & FAQ
    sign_seo_badge: "توقيع إلكتروني آمن وخاص تماماً",
    sign_seo_title: "كيفية توقيع مستندات PDF إلكترونياً عبر الإنترنت",
    sign_seo_subtitle: "ارسم توقيعك المخصص وثبته بأمان في أي صفحة مع معالجة محلية ١٠٠٪ وبدون أي رفع سحابي.",
    sign_step1_title: "١. فتح ملف PDF",
    sign_step1_desc: "أفلت اتفاقيتك أو عقدك أو نموذجك داخل منطقة الرفع لفتحه محلياً وفورياً داخل متصفحك.",
    sign_step2_title: "٢. رسم التوقيع الإلكتروني",
    sign_step2_desc: "استخدم الماوس أو إصبعك أو القلم الرقمي على لوحة الرسم. خصص لون الحبر وسُمك الخط كما يناسبك.",
    sign_step3_title: "٣. تحديد الموضع وحفظ المستند",
    sign_step3_desc: "اختر الصفحة المستهدفة، وحدد موضع التوقيع (مثل: أسفل اليمين)، واضبط الحجم ثم حمّل المستند الموقع.",
    sign_faq_title: "الأسئلة الشائعة",
    sign_faq_q1: "هل يمكن لأي شخص آخر الاطلاع على توقيعي أو عقودي؟",
    sign_faq_a1: "مستحيل. تعمل أداة توقيع PDF بمعالجة محلية ١٠٠٪ داخل جلسة المتصفح الخاصة بك. مع عدم وجود خوادم، يبقى توقيعك ومستنداتك ملكك وحدك بأمان تام.",
    sign_faq_q2: "هل يمكنني توقيع المستندات عبر شاشة الهاتف أو الجهاز اللوحي؟",
    sign_faq_a2: "نعم بالتأكيد! تم تصميم لوحة التوقيع لتستجيب بسلاسة فائقة للمس وشاشات الهواتف والأجهزة اللوحية مع دعم الأقلام الرقمية.",
    sign_faq_q3: "هل يمكنني تثبيت التوقيع في صفحات محددة ومواضع متعددة؟",
    sign_faq_a3: "نعم، يمكنك اختيار أي صفحة وتحديد موضع التوقيع بدقة (مثل أسفل اليمين أو أسفل اليسار أو المنتصف) مع إمكانية تكبير وتصغير حجم التوقيع.",

    // Merge Tool SEO & FAQ
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
    merge_faq_a3: "يمكنك دمج العديد من الملفات في نفس الوقت بكل سلاسة، حيث تعتمد سرعة المعالجة على موارد جهازك مباشرة.",

    // Split Tool SEO & FAQ
    split_seo_badge: "استخراج الصفحات بدقة واحترافية",
    split_seo_title: "كيفية تقسيم واستخراج صفحات من مستندات PDF",
    split_seo_subtitle: "استخرج صفحات محددة أو نطاقات مخصصة لإنشاء مستند جديد منظم في ثوانٍ مع خصوصية محلية ١٠٠٪.",
    split_step1_title: "١. فتح مستند PDF",
    split_step1_desc: "اختر أو اسحب ملف PDF الخاص بك إلى منطقة الرفع لمعاينة إجمالي عدد الصفحات.",
    split_step2_title: "٢. تحديد الصفحات أو استخدام النماذج",
    split_step2_desc: "اكتب أرقام الصفحات المطلوبة (مثل: 1, 3-5, 8) أو اختر من الخيارات الجاهزة مثل الصفحات الفردية أو الزوجية.",
    split_step3_title: "٣. الاستخراج والتنزيل",
    split_step3_desc: "حدد اسم الملف المخرج واضغط على تقسيم وتنزيل PDF لحفظ مستندك المستخرج فوراً.",
    split_faq_title: "الأسئلة الشائعة",
    split_faq_q1: "هل يتم رفع مستندي إلى أي خادم أثناء استخراج الصفحات؟",
    split_faq_a1: "كلا. تعمل أداة تقسيم PDF بمعالجة محلية ١٠٠٪ داخل المتصفح. ومع انعدام الرفع للخوادم، تحظى كشوفات حساباتك ومستنداتك الحساسة بخصوصية مطلقة.",
    split_faq_q2: "كيف يمكنني كتابة نطاقات صفحات متعددة ومخصصة؟",
    split_faq_a2: "يمكنك الجمع بين الأرقام الفردية والنطاقات مفصولة بفواصل، مثل '1, 3, 5-9, 12'. ويقوم العداد التفاعلي بتأكيد عدد الصفحات المختارة فوراً.",
    split_faq_q3: "هل يمكنني استخراج صفحات محددة من مستندات كبيرة؟",
    split_faq_a3: "نعم، يستطيع المحرك المحلي معالجة وتقسيم المستندات الكبيرة بسرعة فائقة بالاعتماد على ذاكرة جهازك.",

    // Compress Tool SEO & FAQ
    compress_seo_badge: "ضغط ذكي ومحلي لملفات PDF",
    compress_seo_title: "كيفية ضغط وتقليل حجم ملفات PDF عبر الإنترنت",
    compress_seo_subtitle: "قلل حجم ملفات PDF الكبيرة عبر مستويات جودة ذكية مع الحفاظ على وضوح النصوص وخصوصية محلية ١٠٠٪.",
    compress_step1_title: "١. رفع ملف PDF",
    compress_step1_desc: "اختر أي مستند PDF بحجم حتى 25 ميجابايت لبدء الضغط المباشر داخل متصفحك.",
    compress_step2_title: "٢. اختيار مستوى الضغط",
    compress_step2_desc: "اختر الجودة المنخفضة (أقصى تقليل للحجم)، أو المتوسطة (توازن موصى به)، أو العالية (أعلى وضوح للصور).",
    compress_step3_title: "٣. الضغط والحفظ",
    compress_step3_desc: "انقر على ضغط وتنزيل PDF لمعالجة الصفحات وحساب الحجم الموفر فوراً وتحميل ملفك المضغوط.",
    compress_faq_title: "الأسئلة الشائعة",
    compress_faq_q1: "هل يتم رفع مستنداتي إلى خادم خارجي لضغطها؟",
    compress_faq_a1: "كلا. يتم الضغط محلياً بنسبة ١٠٠٪ داخل المتصفح. مع انعدام الرفع لأي خوادم خارجية، تظل ملفاتك المالية والقانونية آمنة على جهازك.",
    compress_faq_q2: "ما هي نسبة تقليل حجم الملف التي يمكنني توقعها؟",
    compress_faq_a2: "اعتماداً على المستوى المختار وطبيعة الصور داخل المستند، يمكنك توفير ما بين ٣٠٪ إلى ٨٥٪ من الحجم الأصلي مما يجعله مثالياً للإرسال بالبريد.",
    compress_faq_q3: "لماذا يوجد حد أقصى للحجم 25 ميجابايت للضغط؟",
    compress_faq_a3: "نظراً لأن المعالجة تتم داخل ذاكرة المتصفح مباشرة، يضمن حد 25 ميجابايت عدم استنزاف الذاكرة وسرعة استجابة فائقة على كافة الأجهزة.",

    // Protect Tool SEO & FAQ
    protect_seo_badge: "تشفير وأمان مستندات فائق الدقة",
    protect_seo_title: "كيفية تشفير وحماية ملفات PDF بكلمة مرور عبر الإنترنت",
    protect_seo_subtitle: "احمِ ملفاتك الحساسة بتشفير AES-256 قوي وصلاحيات مخصصة مع خصوصية محلية ١٠٠٪ دون رفع إلى خوادم.",
    protect_step1_title: "١. اختيار ملف PDF المراد حمايته",
    protect_step1_desc: "أفلت أي مستند PDF ترغب في قفله وتأمينه داخل واجهة المتصفح الآمنة.",
    protect_step2_title: "٢. تعيين كلمة مرور قوية",
    protect_step2_desc: "اكتب كلمة المرور وأكدها، واطلع على مقياس قوة كلمة المرور، وحدد الصلاحيات المرغوبة للمستند.",
    protect_step3_title: "٣. التشفير والتنزيل",
    protect_step3_desc: "اضغط على تشفير وتنزيل PDF لإنشاء ملف PDF محمي بتشفير AES-256 متوافق مع كافة قارئات الـ PDF.",
    protect_faq_title: "الأسئلة الشائعة",
    protect_faq_q1: "هل يتم إرسال كلمة المرور أو الملف الأصلي عبر الإنترنت؟",
    protect_faq_a1: "مستحيل. تعتمد أداة تشفير PDF على المعالجة المحلية ١٠٠٪ بواسطة تقنيات Web Cryptography. مع انعدام الرفع للخوادم، لا يغادر ملفك أو كلمة مرورك جهازك أبداً.",
    protect_faq_q2: "ما هي برامج قراءة الـ PDF التي يمكنها فتح ملفاتي المشفرة؟",
    protect_faq_a2: "يتوافق الملف المشفر مع المعايير القياسية العالمية لـ PDF ويعمل بسلاسة على Adobe Acrobat، وGoogle Chrome، وMicrosoft Edge، وApple Preview وكافة الهواتف.",
    protect_faq_q3: "هل يمكنكم استعادة ملفي إذا نسيت كلمة المرور؟",
    protect_faq_a3: "كلا. نظراً لأن التشفير يتم محلياً دون أي أبواب خلفية، لا يمكن استرجاع كلمة المرور المنسية. يرجى تدوين كلمة المرور وحفظها في مكان آمن."
  }
};

// Maintain compatibility reference
const I18N_TRANSLATIONS = translations;

let currentLang = 'en';

function protectCanvasLTR() {
  const canvasElements = document.querySelectorAll(
    '#canvas-stage-wrapper, #canvas-shadow-container, .canvas-container, #pdf-canvas, #annotation-canvas'
  );
  canvasElements.forEach(el => {
    if (el) {
      el.setAttribute('dir', 'ltr');
      el.style.direction = 'ltr';
      el.style.unicodeBidi = 'isolate';
      el.style.textAlign = 'left';
    }
  });
}

function setLanguage(lang) {
  currentLang = (lang === 'ar') ? 'ar' : 'en';
  const isArabic = currentLang === 'ar';

  // 1. Set HTML direction & language attribute
  document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
  document.documentElement.lang = currentLang;

  // 2. Set Typography Font for Arabic vs English
  if (isArabic) {
    document.body.style.fontFamily = "'Segoe UI Arabic', 'Tahoma', 'Cairo', sans-serif";
  } else {
    document.body.style.fontFamily = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  }

  // 3. Update all UI text with data-i18n attribute
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[currentLang] && translations[currentLang][key]) {
      el.textContent = translations[currentLang][key];
    }
  });

  // 4. Update language toggle button label
  const toggleBtnText = document.getElementById('lang-toggle-text');
  if (toggleBtnText) {
    toggleBtnText.textContent = isArabic ? 'English' : 'العربية';
  }

  // 5. Update active tool status hint if needed
  const statusHint = document.getElementById('status-hint');
  if (statusHint && typeof AppState !== 'undefined' && AppState.activeTool) {
    if (AppState.activeTool === 'text') {
      statusHint.textContent = translations[currentLang].hint_text;
    } else if (AppState.activeTool === 'pen') {
      statusHint.textContent = translations[currentLang].hint_pen;
    } else if (AppState.activeTool === 'highlighter') {
      statusHint.textContent = translations[currentLang].hint_highlighter;
    } else {
      statusHint.textContent = translations[currentLang].hint_default;
    }
  }

  // 6. CRITICAL - Canvas Protection: Enforce LTR on rendering workspace
  protectCanvasLTR();
}

function toggleLanguage() {
  const nextLang = currentLang === 'en' ? 'ar' : 'en';
  setLanguage(nextLang);
}

/* ==========================================================================
   2. Core Application State
   ========================================================================== */
const AppState = {
  pdfDocument: null,
  pdfBytes: null,
  fileName: "document.pdf",
  currentPage: 1,
  totalPages: 1,
  zoomScale: 1.25,
  activeTool: 'select', // 'select' | 'pen' | 'highlighter' | 'text' | 'math'
  brushColor: '#6366f1',
  brushSize: 4,
  brushOpacity: 1.0,
  fontFamily: 'Inter, sans-serif',
  fontSize: 18,
  isBold: false,
  isItalic: false,
  pageAnnotations: {}, // pageNum -> serialized JSON of fabric canvas
  undoStack: [],
  redoStack: [],
  isPerformingHistory: false
};

// Global References
let currentPdfBytes = null;
window.currentPdfBytes = null;
let fabricCanvas = null;
let pdfCanvas = null;
let pdfCanvasCtx = null;

/* ==========================================================================
   3. Initialization & DOM Hookup
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  pdfCanvas = document.getElementById('pdf-canvas');
  if (pdfCanvas) pdfCanvasCtx = pdfCanvas.getContext('2d');

  initFabricCanvas();
  initToolEvents();
  initPropertiesEvents();
  initFileHandlers();
  initPaginationAndZoom();
  initMathJaxModal();
  initLanguageToggle();

  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Keyboard Shortcuts
  setupKeyboardShortcuts();
});

/* ==========================================================================
   4. Fabric.js Interactive Workspace Layer
   ========================================================================== */
function initFabricCanvas() {
  const canvasEl = document.getElementById('annotation-canvas');
  if (!canvasEl) return;

  fabricCanvas = new fabric.Canvas('annotation-canvas', {
    isDrawingMode: false,
    selection: true,
    preserveObjectStacking: true
  });

  // Track History
  fabricCanvas.on('object:added', () => recordHistoryState());
  fabricCanvas.on('object:modified', () => recordHistoryState());
  fabricCanvas.on('object:removed', () => recordHistoryState());

  // Click handler for text placement
  fabricCanvas.on('mouse:down', (e) => {
    if (AppState.activeTool === 'text' && !e.target) {
      const pointer = fabricCanvas.getPointer(e.e);
      addTextObject(pointer.x, pointer.y);
    }
  });

  // Apply default brush setup
  updateFabricBrush();

  // Enforce LTR direction for Fabric canvas
  protectCanvasLTR();
}

function updateFabricBrush() {
  if (!fabricCanvas) return;

  if (AppState.activeTool === 'pen') {
    fabricCanvas.isDrawingMode = true;
    fabricCanvas.freeDrawingBrush = new fabric.PencilBrush(fabricCanvas);
    fabricCanvas.freeDrawingBrush.color = hexToRgba(AppState.brushColor, AppState.brushOpacity);
    fabricCanvas.freeDrawingBrush.width = parseInt(AppState.brushSize, 10);
  } else if (AppState.activeTool === 'highlighter') {
    fabricCanvas.isDrawingMode = true;
    fabricCanvas.freeDrawingBrush = new fabric.PencilBrush(fabricCanvas);
    // Translucent highlighter color
    const highlighterOpacity = Math.min(AppState.brushOpacity * 0.38, 0.45);
    fabricCanvas.freeDrawingBrush.color = hexToRgba(AppState.brushColor, highlighterOpacity);
    fabricCanvas.freeDrawingBrush.width = parseInt(AppState.brushSize, 10) * 4;
  } else {
    fabricCanvas.isDrawingMode = false;
  }
}

function hexToRgba(hex, alpha = 1) {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const num = parseInt(c, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/* ==========================================================================
   5. Tools & Properties Management
   ========================================================================== */
function setActiveTool(tool) {
  AppState.activeTool = tool;

  // Update UI tool buttons
  document.querySelectorAll('.tool-btn[data-tool]').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tool') === tool);
  });

  // Toggle Property Groups
  const propsDrawing = document.getElementById('props-drawing');
  const propsText = document.getElementById('props-text');
  const statusHint = document.getElementById('status-hint');

  if (tool === 'text') {
    propsDrawing.classList.add('hidden');
    propsText.classList.remove('hidden');
    if (statusHint) statusHint.textContent = I18N_TRANSLATIONS[currentLang].hint_text;
  } else if (tool === 'pen' || tool === 'highlighter') {
    propsDrawing.classList.remove('hidden');
    propsText.classList.add('hidden');
    if (statusHint) {
      statusHint.textContent = tool === 'pen'
        ? I18N_TRANSLATIONS[currentLang].hint_pen
        : I18N_TRANSLATIONS[currentLang].hint_highlighter;
    }
  } else {
    propsDrawing.classList.remove('hidden');
    propsText.classList.add('hidden');
    if (statusHint) statusHint.textContent = I18N_TRANSLATIONS[currentLang].hint_default;
  }

  updateFabricBrush();
}

function initToolEvents() {
  document.querySelectorAll('.tool-btn[data-tool]').forEach(btn => {
    btn.addEventListener('click', () => {
      const tool = btn.getAttribute('data-tool');
      if (tool === 'math') {
        openMathModal();
      } else {
        setActiveTool(tool);
      }
    });
  });

  // Delete tool button
  const deleteBtn = document.getElementById('tool-delete');
  if (deleteBtn) {
    deleteBtn.addEventListener('click', deleteSelectedObjects);
  }

  // Undo / Redo buttons
  const undoBtn = document.getElementById('btn-undo');
  const redoBtn = document.getElementById('btn-redo');
  if (undoBtn) undoBtn.addEventListener('click', undo);
  if (redoBtn) redoBtn.addEventListener('click', redo);

  // Clear page button
  const clearBtn = document.getElementById('btn-clear-page');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (!fabricCanvas) return;
      fabricCanvas.clear();
      recordHistoryState();
      showToast(I18N_TRANSLATIONS[currentLang].toast_cleared);
    });
  }

  // Export PDF button
  const exportBtn = document.getElementById('btn-export-pdf');
  if (exportBtn) {
    exportBtn.addEventListener('click', exportPDF);
  }
}

function deleteSelectedObjects() {
  if (!fabricCanvas) return;
  const activeObjects = fabricCanvas.getActiveObjects();
  if (activeObjects.length > 0) {
    activeObjects.forEach(obj => fabricCanvas.remove(obj));
    fabricCanvas.discardActiveObject();
    fabricCanvas.requestRenderAll();
    recordHistoryState();
  }
}

function addTextObject(x, y) {
  if (!fabricCanvas) return;

  const text = new fabric.IText('Double-click to edit', {
    left: x,
    top: y,
    fontFamily: AppState.fontFamily,
    fontSize: parseInt(AppState.fontSize, 10),
    fill: AppState.brushColor,
    fontWeight: AppState.isBold ? 'bold' : 'normal',
    fontStyle: AppState.isItalic ? 'italic' : 'normal',
    padding: 6,
    transparentCorners: false,
    cornerColor: '#6366f1',
    cornerStrokeColor: '#ffffff',
    borderColor: '#6366f1',
    cornerSize: 8
  });

  fabricCanvas.add(text);
  fabricCanvas.setActiveObject(text);
  text.enterEditing();
  text.selectAll();
  fabricCanvas.requestRenderAll();
  recordHistoryState();

  // Switch back to select tool so user can easily position it
  setActiveTool('select');
}

function initPropertiesEvents() {
  // Color Picker & Presets
  const brushColorInput = document.getElementById('brush-color');
  if (brushColorInput) {
    brushColorInput.addEventListener('input', (e) => {
      AppState.brushColor = e.target.value;
      updateFabricBrush();
      applyColorToSelectedObjects(AppState.brushColor);
    });
  }

  document.querySelectorAll('.preset-color').forEach(btn => {
    btn.addEventListener('click', () => {
      const color = btn.getAttribute('data-color');
      AppState.brushColor = color;
      if (brushColorInput) brushColorInput.value = color;
      updateFabricBrush();
      applyColorToSelectedObjects(color);
    });
  });

  // Brush Size
  const brushSizeInput = document.getElementById('brush-size');
  const brushSizeVal = document.getElementById('brush-size-val');
  if (brushSizeInput) {
    brushSizeInput.addEventListener('input', (e) => {
      AppState.brushSize = e.target.value;
      if (brushSizeVal) brushSizeVal.textContent = `${AppState.brushSize}px`;
      updateFabricBrush();
    });
  }

  // Brush Opacity
  const brushOpacityInput = document.getElementById('brush-opacity');
  const brushOpacityVal = document.getElementById('brush-opacity-val');
  if (brushOpacityInput) {
    brushOpacityInput.addEventListener('input', (e) => {
      AppState.brushOpacity = parseFloat(e.target.value);
      if (brushOpacityVal) brushOpacityVal.textContent = `${Math.round(AppState.brushOpacity * 100)}%`;
      updateFabricBrush();
    });
  }

  // Font Family
  const fontSelect = document.getElementById('font-family-select');
  if (fontSelect) {
    fontSelect.addEventListener('change', (e) => {
      AppState.fontFamily = e.target.value;
      const activeObj = fabricCanvas ? fabricCanvas.getActiveObject() : null;
      if (activeObj && activeObj.type === 'i-text') {
        activeObj.set('fontFamily', AppState.fontFamily);
        fabricCanvas.requestRenderAll();
        recordHistoryState();
      }
    });
  }

  // Font Size
  const fontSizeSelect = document.getElementById('font-size-select');
  if (fontSizeSelect) {
    fontSizeSelect.addEventListener('change', (e) => {
      AppState.fontSize = parseInt(e.target.value, 10);
      const activeObj = fabricCanvas ? fabricCanvas.getActiveObject() : null;
      if (activeObj && activeObj.type === 'i-text') {
        activeObj.set('fontSize', AppState.fontSize);
        fabricCanvas.requestRenderAll();
        recordHistoryState();
      }
    });
  }

  // Bold & Italic Toggles
  const boldBtn = document.getElementById('btn-text-bold');
  if (boldBtn) {
    boldBtn.addEventListener('click', () => {
      AppState.isBold = !AppState.isBold;
      boldBtn.classList.toggle('active', AppState.isBold);
      const activeObj = fabricCanvas ? fabricCanvas.getActiveObject() : null;
      if (activeObj && activeObj.type === 'i-text') {
        activeObj.set('fontWeight', AppState.isBold ? 'bold' : 'normal');
        fabricCanvas.requestRenderAll();
        recordHistoryState();
      }
    });
  }

  const italicBtn = document.getElementById('btn-text-italic');
  if (italicBtn) {
    italicBtn.addEventListener('click', () => {
      AppState.isItalic = !AppState.isItalic;
      italicBtn.classList.toggle('active', AppState.isItalic);
      const activeObj = fabricCanvas ? fabricCanvas.getActiveObject() : null;
      if (activeObj && activeObj.type === 'i-text') {
        activeObj.set('fontStyle', AppState.isItalic ? 'italic' : 'normal');
        fabricCanvas.requestRenderAll();
        recordHistoryState();
      }
    });
  }
}

function applyColorToSelectedObjects(color) {
  if (!fabricCanvas) return;
  const activeObjects = fabricCanvas.getActiveObjects();
  if (activeObjects.length > 0) {
    activeObjects.forEach(obj => {
      if (obj.type === 'i-text') {
        obj.set('fill', color);
      } else if (obj.type === 'path') {
        obj.set('stroke', color);
      } else if (obj.type === 'group') {
        // MathJax SVG group
        obj.getObjects().forEach(subObj => {
          if (subObj.fill && subObj.fill !== 'none') subObj.set('fill', color);
          if (subObj.stroke && subObj.stroke !== 'none') subObj.set('stroke', color);
        });
      }
    });
    fabricCanvas.requestRenderAll();
    recordHistoryState();
  }
}

/* ==========================================================================
   6. Undo & Redo History System
   ========================================================================== */
function recordHistoryState() {
  if (AppState.isPerformingHistory || !fabricCanvas) return;
  const jsonState = JSON.stringify(fabricCanvas.toJSON());

  // Prevent duplicate states
  if (AppState.undoStack.length > 0 && AppState.undoStack[AppState.undoStack.length - 1] === jsonState) {
    return;
  }

  AppState.undoStack.push(jsonState);
  if (AppState.undoStack.length > 30) AppState.undoStack.shift();
  AppState.redoStack = [];

  updateUndoRedoButtons();
}

function undo() {
  if (AppState.undoStack.length <= 1 || !fabricCanvas) return;
  AppState.isPerformingHistory = true;

  const currentState = AppState.undoStack.pop();
  AppState.redoStack.push(currentState);
  const prevState = AppState.undoStack[AppState.undoStack.length - 1];

  fabricCanvas.loadFromJSON(prevState, () => {
    fabricCanvas.renderAll();
    AppState.isPerformingHistory = false;
    updateUndoRedoButtons();
  });
}

function redo() {
  if (AppState.redoStack.length === 0 || !fabricCanvas) return;
  AppState.isPerformingHistory = true;

  const nextState = AppState.redoStack.pop();
  AppState.undoStack.push(nextState);

  fabricCanvas.loadFromJSON(nextState, () => {
    fabricCanvas.renderAll();
    AppState.isPerformingHistory = false;
    updateUndoRedoButtons();
  });
}

function updateUndoRedoButtons() {
  const undoBtn = document.getElementById('btn-undo');
  const redoBtn = document.getElementById('btn-redo');
  if (undoBtn) undoBtn.disabled = AppState.undoStack.length <= 1;
  if (redoBtn) redoBtn.disabled = AppState.redoStack.length === 0;
}

/* ==========================================================================
   7. PDF.js Engine: Loading & Page Rendering
   ========================================================================== */
async function loadPdfDocument(dataBuffer, name = "document.pdf") {
  showLoading(true);
  try {
    // 1. Store the raw PDF bytes in global variable currentPdfBytes
    if (dataBuffer instanceof Uint8Array) {
      currentPdfBytes = dataBuffer.slice(0);
    } else if (dataBuffer instanceof ArrayBuffer) {
      currentPdfBytes = new Uint8Array(dataBuffer).slice(0);
    } else if (dataBuffer) {
      currentPdfBytes = new Uint8Array(dataBuffer);
    }
    window.currentPdfBytes = currentPdfBytes;
    AppState.pdfBytes = currentPdfBytes;
    AppState.fileName = name;

    // Pass a clone to pdfjsLib so worker transfer doesn't detach/neuter currentPdfBytes
    const workerData = currentPdfBytes.slice(0);
    const loadingTask = pdfjsLib.getDocument({ data: workerData });
    AppState.pdfDocument = await loadingTask.promise;
    AppState.totalPages = AppState.pdfDocument.numPages;
    AppState.currentPage = 1;
    AppState.pageAnnotations = {}; // Reset annotation caches for new doc

    // Update Pagination UI
    const totalPagesEl = document.getElementById('total-pages-count');
    const currentPageInput = document.getElementById('current-page-input');
    if (totalPagesEl) totalPagesEl.textContent = AppState.totalPages;
    if (currentPageInput) {
      currentPageInput.value = 1;
      currentPageInput.max = AppState.totalPages;
    }

    // Hide Dropzone, show Canvas Stage
    const dropzone = document.getElementById('dropzone');
    const stageWrapper = document.getElementById('canvas-stage-wrapper');
    if (dropzone) dropzone.classList.add('hidden');
    if (stageWrapper) stageWrapper.classList.remove('hidden');

    // Render First Page
    await renderPage(1);
    showToast(I18N_TRANSLATIONS[currentLang].toast_pdf_loaded);
  } catch (err) {
    console.error("Error loading PDF document:", err);
    alert("Could not load PDF: " + err.message);
  } finally {
    showLoading(false);
  }
}

async function renderPage(pageNum) {
  if (!AppState.pdfDocument) return;
  showLoading(true);

  try {
    // 1. Save current page annotation state before switching
    saveCurrentPageAnnotations();

    const page = await AppState.pdfDocument.getPage(pageNum);
    const viewport = page.getViewport({ scale: AppState.zoomScale });

    // 2. Set Canvas Dimensions to match viewport exactly
    const width = Math.floor(viewport.width);
    const height = Math.floor(viewport.height);

    pdfCanvas.width = width;
    pdfCanvas.height = height;
    pdfCanvas.style.width = `${width}px`;
    pdfCanvas.style.height = `${height}px`;

    const shadowContainer = document.getElementById('canvas-shadow-container');
    if (shadowContainer) {
      shadowContainer.style.width = `${width}px`;
      shadowContainer.style.height = `${height}px`;
    }

    // 3. Render PDF page to base canvas
    const renderContext = {
      canvasContext: pdfCanvasCtx,
      viewport: viewport
    };
    await page.render(renderContext).promise;

    // 4. Align and resize Fabric.js overlay canvas
    if (fabricCanvas) {
      fabricCanvas.setWidth(width);
      fabricCanvas.setHeight(height);
      fabricCanvas.calcOffset();

      // Ensure the Fabric.js DOM container matches dimensions
      const fabricWrapper = shadowContainer.querySelector('.canvas-container');
      if (fabricWrapper) {
        fabricWrapper.style.width = `${width}px`;
        fabricWrapper.style.height = `${height}px`;
      }

      protectCanvasLTR();

      // 5. Restore or clear page annotations
      fabricCanvas.clear();
      AppState.undoStack = [];
      AppState.redoStack = [];

      if (AppState.pageAnnotations[pageNum]) {
        fabricCanvas.loadFromJSON(AppState.pageAnnotations[pageNum], () => {
          fabricCanvas.renderAll();
          recordHistoryState();
        });
      } else {
        recordHistoryState();
      }
    }

    // Update Page Number UI
    AppState.currentPage = pageNum;
    const curInput = document.getElementById('current-page-input');
    if (curInput) curInput.value = pageNum;

    updatePaginationButtons();
  } catch (err) {
    console.error(`Error rendering page ${pageNum}:`, err);
  } finally {
    showLoading(false);
  }
}

function saveCurrentPageAnnotations() {
  if (fabricCanvas && AppState.currentPage) {
    AppState.pageAnnotations[AppState.currentPage] = fabricCanvas.toJSON();
  }
}

/* ==========================================================================
   8. Pagination & Zoom Controls
   ========================================================================== */
function initPaginationAndZoom() {
  const prevBtn = document.getElementById('btn-prev-page');
  const nextBtn = document.getElementById('btn-next-page');
  const pageInput = document.getElementById('current-page-input');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (AppState.currentPage > 1) {
        renderPage(AppState.currentPage - 1);
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (AppState.currentPage < AppState.totalPages) {
        renderPage(AppState.currentPage + 1);
      }
    });
  }

  if (pageInput) {
    pageInput.addEventListener('change', (e) => {
      const page = parseInt(e.target.value, 10);
      if (page >= 1 && page <= AppState.totalPages) {
        renderPage(page);
      } else {
        e.target.value = AppState.currentPage;
      }
    });
  }

  // Zoom controls
  const zoomInBtn = document.getElementById('btn-zoom-in');
  const zoomOutBtn = document.getElementById('btn-zoom-out');
  const zoomFitBtn = document.getElementById('btn-zoom-fit');

  if (zoomInBtn) {
    zoomInBtn.addEventListener('click', () => {
      if (AppState.zoomScale < 3.0) {
        AppState.zoomScale += 0.25;
        updateZoomDisplay();
        renderPage(AppState.currentPage);
      }
    });
  }

  if (zoomOutBtn) {
    zoomOutBtn.addEventListener('click', () => {
      if (AppState.zoomScale > 0.5) {
        AppState.zoomScale -= 0.25;
        updateZoomDisplay();
        renderPage(AppState.currentPage);
      }
    });
  }

  if (zoomFitBtn) {
    zoomFitBtn.addEventListener('click', () => {
      AppState.zoomScale = 1.0;
      updateZoomDisplay();
      renderPage(AppState.currentPage);
    });
  }
}

function updateZoomDisplay() {
  const zoomText = document.getElementById('zoom-level-text');
  if (zoomText) {
    zoomText.textContent = `${Math.round(AppState.zoomScale * 100)}%`;
  }
}

function updatePaginationButtons() {
  const prevBtn = document.getElementById('btn-prev-page');
  const nextBtn = document.getElementById('btn-next-page');
  if (prevBtn) prevBtn.disabled = AppState.currentPage <= 1;
  if (nextBtn) nextBtn.disabled = AppState.currentPage >= AppState.totalPages;
}

/* ==========================================================================
   9. MathJax Formula Integration
   ========================================================================== */
function initMathJaxModal() {
  const modal = document.getElementById('math-modal');
  const closeBtn = document.getElementById('btn-close-math');
  const cancelBtn = document.getElementById('btn-cancel-math');
  const insertBtn = document.getElementById('btn-insert-math');
  const latexInput = document.getElementById('latex-input');
  const previewBox = document.getElementById('math-preview-box');

  if (closeBtn) closeBtn.addEventListener('click', closeMathModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeMathModal);

  // Live MathJax Preview updates as user types
  if (latexInput) {
    let debounceTimer;
    latexInput.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => updateMathPreview(latexInput.value), 250);
    });
  }

  // Formula Preset Buttons
  document.querySelectorAll('.preset-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      const latex = btn.getAttribute('data-latex');
      if (latexInput) {
        latexInput.value = latex;
        updateMathPreview(latex);
      }
    });
  });

  // Insert formula onto PDF canvas
  if (insertBtn) {
    insertBtn.addEventListener('click', async () => {
      const latex = latexInput ? latexInput.value.trim() : '';
      if (!latex) {
        alert("Please enter a LaTeX equation first.");
        return;
      }
      await insertMathFormulaOntoCanvas(latex);
      closeMathModal();
    });
  }
}

function openMathModal() {
  const modal = document.getElementById('math-modal');
  const latexInput = document.getElementById('latex-input');
  if (modal) modal.classList.remove('hidden');
  if (latexInput) {
    if (!latexInput.value) {
      latexInput.value = "E = mc^2";
    }
    updateMathPreview(latexInput.value);
    latexInput.focus();
  }
}

function closeMathModal() {
  const modal = document.getElementById('math-modal');
  if (modal) modal.classList.add('hidden');
  setActiveTool('select');
}

async function updateMathPreview(latex) {
  const previewBox = document.getElementById('math-preview-box');
  const mathColor = document.getElementById('math-color') ? document.getElementById('math-color').value : '#6366f1';
  if (!previewBox) return;

  if (!latex || !latex.trim()) {
    previewBox.innerHTML = `<span class="math-preview-placeholder">${I18N_TRANSLATIONS[currentLang].hint_math}</span>`;
    return;
  }

  if (!window.MathJax || !window.MathJax.tex2svgPromise) {
    previewBox.innerHTML = `<span style="color:${mathColor}">$$${latex}$$</span>`;
    return;
  }

  try {
    const svgWrapper = await window.MathJax.tex2svgPromise(latex, { display: true });
    const svg = svgWrapper.querySelector('svg');
    if (svg) {
      svg.style.color = mathColor;
      svg.style.fill = mathColor;
      previewBox.innerHTML = '';
      previewBox.appendChild(svgWrapper);
    }
  } catch (err) {
    previewBox.innerHTML = `<span style="color:#f43f5e;font-size:0.8rem">Syntax Error: ${err.message}</span>`;
  }
}

async function insertMathFormulaOntoCanvas(latex) {
  if (!fabricCanvas) return;
  const mathColor = document.getElementById('math-color') ? document.getElementById('math-color').value : '#6366f1';
  const scaleMultiplier = parseFloat(document.getElementById('math-scale')?.value || '1.5');

  try {
    let svgNode;
    if (window.MathJax && window.MathJax.tex2svgPromise) {
      const container = await window.MathJax.tex2svgPromise(latex, { display: true });
      svgNode = container.querySelector('svg');
    }

    if (!svgNode) {
      // Fallback: simple text rendering if MathJax fails
      const text = new fabric.IText(latex, {
        left: fabricCanvas.width / 2 - 50,
        top: fabricCanvas.height / 2 - 20,
        fontSize: 24,
        fill: mathColor,
        fontFamily: 'serif'
      });
      fabricCanvas.add(text);
      fabricCanvas.setActiveObject(text);
      fabricCanvas.requestRenderAll();
      recordHistoryState();
      return;
    }

    // Set colors directly on SVG paths
    svgNode.style.color = mathColor;
    svgNode.style.fill = mathColor;
    svgNode.querySelectorAll('path, text, g').forEach(el => {
      el.setAttribute('fill', mathColor);
      el.style.fill = mathColor;
    });

    const svgXml = new XMLSerializer().serializeToString(svgNode);

    fabric.loadSVGFromString(svgXml, (objects, options) => {
      const group = fabric.util.groupSVGElements(objects, options);

      // Center in current viewport
      group.set({
        left: Math.max(20, (fabricCanvas.width / 2) - (group.width * scaleMultiplier / 2)),
        top: Math.max(20, (fabricCanvas.height / 2) - (group.height * scaleMultiplier / 2)),
        scaleX: scaleMultiplier * 1.5,
        scaleY: scaleMultiplier * 1.5,
        cornerColor: '#6366f1',
        cornerStrokeColor: '#ffffff',
        borderColor: '#6366f1',
        cornerSize: 8,
        transparentCorners: false
      });

      fabricCanvas.add(group);
      fabricCanvas.setActiveObject(group);
      fabricCanvas.requestRenderAll();
      recordHistoryState();
    });
  } catch (err) {
    console.error("Error inserting MathJax equation:", err);
    alert("Could not insert formula: " + err.message);
  }
}

/* ==========================================================================
   10. PDF-Lib Client-Side Flattening & Direct Download
   ========================================================================== */
async function exportPDF() {
  const pdfLibObj = window.PDFLib || (typeof PDFLib !== 'undefined' ? PDFLib : null);

  // Validation: verify that the raw PDF bytes are loaded and available
  const rawBytes = currentPdfBytes || AppState.pdfBytes || window.currentPdfBytes;

  if (!rawBytes || rawBytes.byteLength === 0 || !pdfLibObj || !PDFLib.PDFDocument) {
    showToast(I18N_TRANSLATIONS[currentLang].toast_no_pdf);
    return;
  }

  showLoading(true, "Merging annotations & generating PDF...");

  try {
    // 1. Save current page state first
    saveCurrentPageAnnotations();

    // 2. Load original document into PDF-Lib using currentPdfBytes
    // PDFLib.PDFDocument.load(currentPdfBytes)
    const pdfDoc = await PDFLib.PDFDocument.load(currentPdfBytes);
    const pageCount = pdfDoc.getPageCount();

    // 3. For each page in original PDF, stamp annotations if any exist
    for (let i = 1; i <= pageCount; i++) {
      const annotationsJson = AppState.pageAnnotations[i];
      if (!annotationsJson || !annotationsJson.objects || annotationsJson.objects.length === 0) {
        continue;
      }

      // Create an offscreen Fabric canvas with the exact dimensions
      const offscreenCanvasEl = document.createElement('canvas');
      const offscreenFabric = new fabric.StaticCanvas(offscreenCanvasEl, {
        width: pdfCanvas.width,
        height: pdfCanvas.height
      });

      await new Promise((resolve) => {
        offscreenFabric.loadFromJSON(annotationsJson, () => {
          offscreenFabric.renderAll();
          resolve();
        });
      });

      // Export annotation layer to transparent PNG
      const pngDataUrl = offscreenFabric.toDataURL({ format: 'png', multiplier: 1 });
      const pngImage = await pdfDoc.embedPng(pngDataUrl);

      // Draw onto corresponding PDF page
      const pdfPage = pdfDoc.getPage(i - 1);
      const { width, height } = pdfPage.getSize();

      pdfPage.drawImage(pngImage, {
        x: 0,
        y: 0,
        width: width,
        height: height
      });

      offscreenFabric.dispose();
    }

    // 4. Save and trigger download
    const modifiedPdfBytes = await pdfDoc.save();
    const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
    const downloadUrl = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = downloadUrl;
    const baseName = AppState.fileName.replace(/\.pdf$/i, '');
    a.download = `${baseName}_annotated.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(downloadUrl);

    showToast(I18N_TRANSLATIONS[currentLang].toast_exported);
  } catch (err) {
    console.error("Export error:", err);
    alert("Export failed: " + err.message);
  } finally {
    showLoading(false);
  }
}

// Global aliases for PDF export
const exportAnnotatedPdf = exportPDF;
if (typeof window !== 'undefined') {
  window.exportPDF = exportPDF;
  window.exportAnnotatedPdf = exportPDF;
}

/* ==========================================================================
   11. Built-in Interactive Sample PDF Generator
   ========================================================================== */
async function generateSamplePDF() {
  showLoading(true, "Generating sample interactive document...");

  try {
    const pdfDoc = await PDFLib.PDFDocument.create();
    const font = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(PDFLib.StandardFonts.HelveticaBold);

    // Page 1: Physics & Mathematics Notes
    const page1 = pdfDoc.addPage([600, 800]);
    const { width: p1W, height: p1H } = page1.getSize();

    // Header banner
    page1.drawRectangle({
      x: 0,
      y: p1H - 80,
      width: p1W,
      height: 80,
      color: PDFLib.rgb(0.06, 0.09, 0.16)
    });

    page1.drawText("AnnotatePDF Pro - Interactive Sample", {
      x: 40,
      y: p1H - 50,
      size: 20,
      font: fontBold,
      color: PDFLib.rgb(0.95, 0.96, 0.98)
    });

    // Content
    let curY = p1H - 120;
    page1.drawText("Section 1: Theoretical Physics & Mathematical Proofs", {
      x: 40,
      y: curY,
      size: 14,
      font: fontBold,
      color: PDFLib.rgb(0.39, 0.40, 0.95)
    });

    curY -= 30;
    page1.drawText("Welcome to the interactive client-side PDF annotator workspace.", {
      x: 40,
      y: curY,
      size: 11,
      font: font,
      color: PDFLib.rgb(0.2, 0.25, 0.3)
    });

    curY -= 20;
    page1.drawText("You can highlight this text, use the pen to circle key terms, or insert equations.", {
      x: 40,
      y: curY,
      size: 11,
      font: font,
      color: PDFLib.rgb(0.2, 0.25, 0.3)
    });

    // Diagram Box
    curY -= 60;
    page1.drawRectangle({
      x: 40,
      y: curY - 140,
      width: 520,
      height: 160,
      borderColor: PDFLib.rgb(0.8, 0.85, 0.95),
      borderWidth: 1.5,
      color: PDFLib.rgb(0.97, 0.98, 1.0)
    });

    page1.drawText("Equation & Diagram Annotation Sandbox", {
      x: 60,
      y: curY - 25,
      size: 12,
      font: fontBold,
      color: PDFLib.rgb(0.2, 0.25, 0.3)
    });

    page1.drawText("1. Click the 'Math LaTeX' (Sigma) tool in the left dock.", {
      x: 60,
      y: curY - 55,
      size: 10.5,
      font: font,
      color: PDFLib.rgb(0.3, 0.35, 0.4)
    });

    page1.drawText("2. Select a preset (e.g. Einstein's E=mc^2 or Calculus integral) or write custom LaTeX.", {
      x: 60,
      y: curY - 80,
      size: 10.5,
      font: font,
      color: PDFLib.rgb(0.3, 0.35, 0.4)
    });

    page1.drawText("3. Position, resize, or rotate your equation anywhere inside this box.", {
      x: 60,
      y: curY - 105,
      size: 10.5,
      font: font,
      color: PDFLib.rgb(0.3, 0.35, 0.4)
    });

    // Page 2: Second Page for multi-page validation
    const page2 = pdfDoc.addPage([600, 800]);
    const { width: p2W, height: p2H } = page2.getSize();

    page2.drawRectangle({
      x: 0,
      y: p2H - 80,
      width: p2W,
      height: 80,
      color: PDFLib.rgb(0.06, 0.09, 0.16)
    });

    page2.drawText("Section 2: Multi-Page State Verification", {
      x: 40,
      y: p2H - 50,
      size: 20,
      font: fontBold,
      color: PDFLib.rgb(0.95, 0.96, 0.98)
    });

    page2.drawText("Annotations on this page are stored separately and preserved when navigating!", {
      x: 40,
      y: p2H - 120,
      size: 12,
      font: font,
      color: PDFLib.rgb(0.2, 0.25, 0.3)
    });

    page2.drawRectangle({
      x: 40,
      y: p2H - 350,
      width: 520,
      height: 200,
      borderColor: PDFLib.rgb(0.85, 0.9, 0.85),
      borderWidth: 1.5,
      color: PDFLib.rgb(0.96, 1.0, 0.96)
    });

    page2.drawText("Reviewer Sign-off & Verification Checkbox", {
      x: 60,
      y: p2H - 180,
      size: 13,
      font: fontBold,
      color: PDFLib.rgb(0.1, 0.45, 0.2)
    });

    page2.drawText("Freehand signature area - test the Pen or Highlighter tool here:", {
      x: 60,
      y: p2H - 210,
      size: 11,
      font: font,
      color: PDFLib.rgb(0.25, 0.3, 0.25)
    });

    const sampleBytes = await pdfDoc.save();
    // Save raw PDF bytes to global variable
    currentPdfBytes = new Uint8Array(sampleBytes).slice(0);
    window.currentPdfBytes = currentPdfBytes;
    AppState.pdfBytes = currentPdfBytes;

    await loadPdfDocument(currentPdfBytes.slice(0), "sample_physics_notes.pdf");
    showToast(I18N_TRANSLATIONS[currentLang].toast_sample_loaded);
  } catch (err) {
    console.error("Failed to generate sample PDF:", err);
    alert("Sample generation failed: " + err.message);
  } finally {
    showLoading(false);
  }
}

// Global aliases for sample PDF generator
const generateSamplePdf = generateSamplePDF;
if (typeof window !== 'undefined') {
  window.generateSamplePDF = generateSamplePDF;
  window.generateSamplePdf = generateSamplePDF;
}

/* ==========================================================================
   12. Drag & Drop and File Input Handlers
   ========================================================================== */
function initFileHandlers() {
  const fileInput = document.getElementById('pdf-file-input');
  const uploadTrigger = document.getElementById('btn-upload-trigger');
  const browseBtn = document.getElementById('btn-browse-file');
  const sampleBtn = document.getElementById('btn-sample-pdf');
  const dropzoneSampleBtn = document.getElementById('btn-dropzone-sample');
  const dropzone = document.getElementById('dropzone');
  const viewport = document.getElementById('document-viewport');

  // Trigger File Input Dialog
  if (uploadTrigger) uploadTrigger.addEventListener('click', () => fileInput && fileInput.click());
  if (browseBtn) browseBtn.addEventListener('click', () => fileInput && fileInput.click());

  // Trigger Sample PDF
  if (sampleBtn) sampleBtn.addEventListener('click', generateSamplePDF);
  if (dropzoneSampleBtn) dropzoneSampleBtn.addEventListener('click', generateSamplePDF);

  // File Input Changed
  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file && file.type === 'application/pdf') {
        readFile(file);
      }
    });
  }

  // Drag & Drop Listeners
  if (dropzone) {
    ['dragenter', 'dragover'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.add('drag-over');
      }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.remove('drag-over');
      }, false);
    });

    dropzone.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      const file = dt.files[0];
      if (file && file.type === 'application/pdf') {
        readFile(file);
      } else {
        alert("Please drop a valid PDF file.");
      }
    });
  }

  // Global window drop prevention so browser doesn't navigate away
  window.addEventListener('dragover', (e) => e.preventDefault());
  window.addEventListener('drop', (e) => {
    e.preventDefault();
    if (e.dataTransfer && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file && file.type === 'application/pdf') {
        readFile(file);
      }
    }
  });
}

function readFile(file) {
  const reader = new FileReader();
  reader.onload = function (e) {
    const rawBuffer = e.target.result;
    // Save raw PDF bytes to global variable
    currentPdfBytes = new Uint8Array(rawBuffer).slice(0);
    window.currentPdfBytes = currentPdfBytes;
    AppState.pdfBytes = currentPdfBytes;

    loadPdfDocument(currentPdfBytes.slice(0), file.name);
  };
  reader.readAsArrayBuffer(file);
}

/* ==========================================================================
   13. UI Helpers: Keyboard Shortcuts, Toast, Loading
   ========================================================================== */
function setupKeyboardShortcuts() {
  window.addEventListener('keydown', (e) => {
    // If active in an input/textarea, skip single key shortcuts
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
      return;
    }

    if (e.key === 'v' || e.key === 'V') setActiveTool('select');
    if (e.key === 'p' || e.key === 'P') setActiveTool('pen');
    if (e.key === 'h' || e.key === 'H') setActiveTool('highlighter');
    if (e.key === 't' || e.key === 'T') setActiveTool('text');
    if (e.key === 'm' || e.key === 'M') openMathModal();

    if (e.key === 'Delete' || e.key === 'Backspace') {
      deleteSelectedObjects();
    }

    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
      e.preventDefault();
      if (e.shiftKey) {
        redo();
      } else {
        undo();
      }
    }

    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
      e.preventDefault();
      redo();
    }

    if (e.key === 'ArrowLeft' && AppState.currentPage > 1) {
      renderPage(AppState.currentPage - 1);
    }
    if (e.key === 'ArrowRight' && AppState.currentPage < AppState.totalPages) {
      renderPage(AppState.currentPage + 1);
    }
  });
}

function initLanguageToggle() {
  const toggleBtn = document.getElementById('btn-language-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleLanguage();
    });
  }
}

function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.remove('hidden');

  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.add('hidden');
  }, 3200);
}

function showLoading(show, message = "Rendering document...") {
  const overlay = document.getElementById('loading-overlay');
  const text = document.getElementById('loading-text');
  if (!overlay) return;

  if (text && message) text.textContent = message;
  if (show) {
    overlay.classList.remove('hidden');
  } else {
    overlay.classList.add('hidden');
  }
}
