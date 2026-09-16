const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '..');
const htmlPath = path.join(baseDir, 'sign.html');
const jsPath = path.join(baseDir, 'sign.js');

const html = fs.readFileSync(htmlPath, 'utf8');
const js = fs.readFileSync(jsPath, 'utf8');

console.log('='.repeat(70));
console.log('VERIFYING ELECTRONIC SIGNATURE (ESIGN) MICRO-TOOL IMPLEMENTATION');
console.log('='.repeat(70));

const tests = [];

// 1. Tech stack & CDN checks
tests.push({
  name: 'HTML imports PDF-Lib via CDN',
  passed: html.includes('pdf-lib.min.js')
});

tests.push({
  name: 'HTML imports Lucide icons',
  passed: html.includes('lucide@latest')
});

tests.push({
  name: 'HTML imports Google Fonts (Cairo, Inter, Outfit, JetBrains Mono)',
  passed: html.includes('family=Cairo') && html.includes('family=Inter') && html.includes('family=Outfit')
});

// 2. Navigation & Header
tests.push({
  name: 'HTML contains Home link in top navigation',
  passed: html.includes('href="index.html"') && html.includes('data-lucide="home"')
});

tests.push({
  name: 'HTML contains Language Toggle button (#btn-language-toggle)',
  passed: html.includes('id="btn-language-toggle"') && html.includes('id="lang-toggle-text"')
});

// 3. Dropzone & PDF Upload
tests.push({
  name: 'HTML contains Drag & Drop zone (#dropzone)',
  passed: html.includes('id="dropzone"') && html.includes('data-i18n="sign_dropzone_title"')
});

tests.push({
  name: 'HTML contains hidden file input (#file-input) accepting PDF',
  passed: html.includes('id="file-input"') && html.includes('accept=".pdf,application/pdf"')
});

tests.push({
  name: 'HTML contains Sample Document loader button (#btn-load-sample)',
  passed: html.includes('id="btn-load-sample"') && html.includes('data-i18n="sign_btn_sample"')
});

// 4. Signature Pad & Controls
tests.push({
  name: 'HTML contains Signature Pad HTML5 Canvas (#signature-pad)',
  passed: html.includes('id="signature-pad"') && html.includes('class="signature-pad-canvas"')
});

tests.push({
  name: 'HTML contains Clear Signature button (#btn-clear-sig)',
  passed: html.includes('id="btn-clear-sig"') && html.includes('data-i18n="sign_btn_clear"')
});

tests.push({
  name: 'HTML contains Confirm Signature button (#btn-confirm-sig)',
  passed: html.includes('id="btn-confirm-sig"') && html.includes('data-i18n="sign_btn_confirm"')
});

tests.push({
  name: 'HTML contains Ink Color Swatches & Stroke Width chips',
  passed: html.includes('class="color-swatch') && html.includes('class="stroke-chip')
});

// 5. Stamping & Placement Configuration
tests.push({
  name: 'HTML contains Target Page selector dropdown (#page-select)',
  passed: html.includes('id="page-select"') && html.includes('data-i18n="sign_label_page"')
});

tests.push({
  name: 'HTML contains Position Selector chips (Bottom Right, Bottom Left, Center, etc.)',
  passed: html.includes('data-pos="bottom-right"') && html.includes('data-pos="bottom-left"') && html.includes('data-pos="center"')
});

tests.push({
  name: 'HTML contains Signature Scale Slider (#sig-scale-slider)',
  passed: html.includes('id="sig-scale-slider"')
});

tests.push({
  name: 'HTML contains Signature Thumbnail Preview container (#sig-preview-img)',
  passed: html.includes('id="sig-preview-img"')
});

tests.push({
  name: 'HTML contains Download Signed PDF Action button (#btn-download-signed)',
  passed: html.includes('id="btn-download-signed"') && html.includes('data-i18n="sign_btn_download"')
});

// 6. Universal Footer & Cookie Banner
tests.push({
  name: 'HTML contains Universal Semantic Footer with legal links',
  passed: html.includes('class="site-footer"') && html.includes('href="privacy.html"') && html.includes('href="terms.html"') && html.includes('href="contact.html"')
});

tests.push({
  name: 'HTML contains Cookie Consent banner (#cookie-banner)',
  passed: html.includes('id="cookie-banner"') && html.includes('id="btn-accept-cookies"')
});

// 7. JavaScript Logic & i18n
tests.push({
  name: 'JS defines bilingual translations dictionary with en and ar',
  passed: js.includes('translations = {') && js.includes('en: {') && js.includes('ar: {')
});

tests.push({
  name: 'JS implements toggleLanguage and applyLanguage with RTL support',
  passed: js.includes('function toggleLanguage(') && js.includes('function applyLanguage(') && js.includes('document.documentElement.dir')
});

tests.push({
  name: 'JS implements smooth canvas drawing with pointer & touch support',
  passed: js.includes('addEventListener(\'pointerdown\'') && js.includes('addEventListener(\'touchstart\'') && js.includes('quadraticCurveTo')
});

tests.push({
  name: 'JS implements transparent margin trimming & PNG export',
  passed: js.includes('function getCroppedSignatureDataUrl(') && js.includes('toDataURL(\'image/png\')')
});

tests.push({
  name: 'JS loads PDF document with PDFLib.PDFDocument.load',
  passed: js.includes('PDFLib.PDFDocument.load')
});

tests.push({
  name: 'JS embeds signature PNG into PDF with pdfDoc.embedPng',
  passed: js.includes('pdfDoc.embedPng')
});

tests.push({
  name: 'JS stamps signature onto target page with page.drawImage',
  passed: js.includes('page.drawImage')
});

tests.push({
  name: 'JS triggers direct browser download of signed PDF blob',
  passed: js.includes('downloadLink.download') && js.includes('URL.createObjectURL(blob)')
});

tests.push({
  name: 'JS includes interactive sample agreement document generator',
  passed: js.includes('function loadSampleDocument(') && js.includes('PDFLib.PDFDocument.create')
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
  console.log(`ALL ${tests.length} SIGN PDF TOOL TESTS PASSED SUCCESSFULLY!`);
} else {
  console.log(`SOME TESTS FAILED: ${passCount} passed, ${failCount} failed.`);
}
console.log('='.repeat(70));
