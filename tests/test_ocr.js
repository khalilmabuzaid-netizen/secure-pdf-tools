const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '..');
const htmlPath = path.join(baseDir, 'ocr.html');
const jsPath = path.join(baseDir, 'ocr.js');

const html = fs.readFileSync(htmlPath, 'utf8');
const js = fs.readFileSync(jsPath, 'utf8');

console.log('='.repeat(70));
console.log('VERIFYING OCR TEXT EXTRACTION MICRO-TOOL IMPLEMENTATION');
console.log('='.repeat(70));

const tests = [];

// 1. Tech stack & CDN checks
tests.push({
  name: 'HTML imports Tesseract.js v5 via CDN',
  passed: html.includes('tesseract.js@5') || html.includes('tesseract.min.js')
});

tests.push({
  name: 'HTML imports PDF.js for PDF rendering via CDN',
  passed: html.includes('pdf.min.js')
});

tests.push({
  name: 'HTML imports Lucide icons',
  passed: html.includes('lucide@latest')
});

tests.push({
  name: 'HTML imports Google Fonts (Cairo, Inter, Outfit, JetBrains Mono)',
  passed: html.includes('family=Cairo') && html.includes('family=Inter') && html.includes('family=Outfit')
});

// 2. Navigation & Glassmorphism Header
tests.push({
  name: 'HTML contains Home link in top navigation',
  passed: html.includes('href="index.html"') && html.includes('data-lucide="home"')
});

tests.push({
  name: 'HTML contains Language Toggle button (#btn-language-toggle)',
  passed: html.includes('id="btn-language-toggle"') && html.includes('id="lang-toggle-text"')
});

// 3. Dropzone & File Input
tests.push({
  name: 'HTML contains Drag & Drop zone (#dropzone)',
  passed: html.includes('id="dropzone"') && html.includes('data-i18n="ocr_dropzone_title"')
});

tests.push({
  name: 'HTML file input accepts PDF and image files',
  passed: html.includes('accept=".pdf,image/png,image/jpeg,image/jpg,image/webp,image/bmp"')
});

tests.push({
  name: 'HTML contains Sample Document loader button (#btn-load-sample)',
  passed: html.includes('id="btn-load-sample"') && html.includes('data-i18n="ocr_btn_sample"')
});

// 4. Configuration & Preview Controls
tests.push({
  name: 'HTML contains OCR Language selector chips (ENG, ARA, MIX)',
  passed: html.includes('data-lang="eng"') && html.includes('data-lang="ara"') && html.includes('data-lang="eng+ara"')
});

tests.push({
  name: 'HTML contains PDF page selector controls (#pdf-page-wrapper)',
  passed: html.includes('id="pdf-page-wrapper"') && html.includes('id="btn-prev-page"') && html.includes('id="btn-next-page"')
});

tests.push({
  name: 'HTML contains Preview Canvas (#preview-canvas)',
  passed: html.includes('id="preview-canvas"')
});

tests.push({
  name: 'HTML contains Primary Action button (#btn-start-ocr)',
  passed: html.includes('id="btn-start-ocr"') && html.includes('data-i18n="ocr_btn_start"')
});

// 5. Progress & Results
tests.push({
  name: 'HTML contains Progress Bar card (#progress-card)',
  passed: html.includes('id="progress-card"') && html.includes('id="ocr-progress-fill"') && html.includes('id="ocr-progress-percent"')
});

tests.push({
  name: 'HTML contains Extracted Text textarea (#extracted-text)',
  passed: html.includes('id="extracted-text"') && html.includes('data-i18n-placeholder="ocr_placeholder_output"')
});

tests.push({
  name: 'HTML contains Copy to Clipboard button (#btn-copy-text)',
  passed: html.includes('id="btn-copy-text"') && html.includes('data-i18n="ocr_btn_copy"')
});

tests.push({
  name: 'HTML contains Download .TXT button (#btn-download-txt)',
  passed: html.includes('id="btn-download-txt"') && html.includes('data-i18n="ocr_btn_download"')
});

tests.push({
  name: 'HTML contains Universal Semantic Footer with legal links',
  passed: html.includes('class="site-footer"') && html.includes('href="privacy.html"') && html.includes('href="terms.html"') && html.includes('href="contact.html"')
});

tests.push({
  name: 'HTML contains Cookie Consent banner (#cookie-banner)',
  passed: html.includes('id="cookie-banner"') && html.includes('id="btn-accept-cookies"')
});

// 6. JavaScript Logic & i18n
tests.push({
  name: 'JS defines bilingual translations dictionary with en and ar',
  passed: js.includes('translations = {') && js.includes('en: {') && js.includes('ar: {')
});

tests.push({
  name: 'JS implements toggleLanguage and applyLanguage with RTL support',
  passed: js.includes('function toggleLanguage(') && js.includes('function applyLanguage(') && js.includes('document.documentElement.dir')
});

tests.push({
  name: 'JS configures PDF.js worker',
  passed: js.includes('GlobalWorkerOptions.workerSrc')
});

tests.push({
  name: 'JS executes Tesseract.createWorker and recognizes text',
  passed: js.includes('Tesseract.createWorker') && js.includes('worker.recognize')
});

tests.push({
  name: 'JS provides interactive sample document generator',
  passed: js.includes('function loadSampleDocument(') && js.includes('AnnotatePDF Pro')
});

tests.push({
  name: 'JS implements copy-to-clipboard functionality',
  passed: js.includes('function copyExtractedText(') && js.includes('navigator.clipboard.writeText')
});

tests.push({
  name: 'JS implements downloadExtractedText (.TXT download)',
  passed: js.includes('function downloadExtractedText(') && js.includes('Blob')
});

// Check all i18n keys from HTML exist in JS
const i18nKeyMatches = [...html.matchAll(/data-i18n="([^"]+)"/g)].map(m => m[1]);
const i18nPlaceholderMatches = [...html.matchAll(/data-i18n-placeholder="([^"]+)"/g)].map(m => m[1]);
const allHtmlKeys = new Set([...i18nKeyMatches, ...i18nPlaceholderMatches]);

let missingKeys = [];
allHtmlKeys.forEach(key => {
  if (!js.includes(`"${key}":`) && !js.includes(`'${key}':`) && !js.includes(`${key}:`)) {
    missingKeys.push(key);
  }
});

tests.push({
  name: `All ${allHtmlKeys.size} HTML data-i18n tags present in translations dictionary`,
  passed: missingKeys.length === 0,
  details: missingKeys.length > 0 ? `Missing: ${missingKeys.join(', ')}` : 'All keys matched'
});

// Report results
let passCount = 0;
let failCount = 0;

tests.forEach(t => {
  if (t.passed) {
    passCount++;
    console.log(`  [PASS] ${t.name}`);
  } else {
    failCount++;
    console.log(`  [FAIL] ${t.name} ${t.details ? `(${t.details})` : ''}`);
  }
});

console.log('='.repeat(70));
if (failCount === 0) {
  console.log(`ALL ${tests.length} OCR TOOL TESTS PASSED SUCCESSFULLY!`);
} else {
  console.log(`SOME TESTS FAILED: ${passCount} passed, ${failCount} failed.`);
}
console.log('='.repeat(70));
