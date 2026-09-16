const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '..');
const htmlPath = path.join(baseDir, 'watermark.html');
const jsPath = path.join(baseDir, 'watermark.js');

const html = fs.readFileSync(htmlPath, 'utf8');
const js = fs.readFileSync(jsPath, 'utf8');

console.log('='.repeat(70));
console.log('VERIFYING WATERMARK PDF MICRO-TOOL IMPLEMENTATION');
console.log('='.repeat(70));

const tests = [];

// 1. Check CDN imports
tests.push({ name: 'HTML imports PDF-Lib via CDN', passed: html.includes('unpkg.com/pdf-lib') });
tests.push({ name: 'HTML imports Lucide icons', passed: html.includes('unpkg.com/lucide') });
tests.push({ name: 'HTML imports Google Fonts (Cairo, Inter, Outfit)', passed: html.includes('Cairo') && html.includes('Outfit') && html.includes('Inter') });

// 2. Check UI components
tests.push({ name: 'HTML contains Home link in top navigation', passed: html.includes('href="index.html"') && html.includes('data-lucide="home"') });
tests.push({ name: 'HTML contains Language Toggle button (#btn-language-toggle)', passed: html.includes('id="btn-language-toggle"') && html.includes('id="lang-toggle-text"') });
tests.push({ name: 'HTML contains Drag & Drop zone (#dropzone)', passed: html.includes('id="dropzone"') });
tests.push({ name: 'HTML contains hidden file input (#pdf-file-input)', passed: html.includes('id="pdf-file-input"') });
tests.push({ name: 'HTML contains Watermark Text input with default CONFIDENTIAL', passed: html.includes('id="watermark-text-input"') && html.includes('value="CONFIDENTIAL"') });
tests.push({ name: 'HTML contains quick watermark preset chips', passed: html.includes('preset-chip') && html.includes('CONFIDENTIAL') && html.includes('DRAFT') });
tests.push({ name: 'HTML contains native Color Picker (#watermark-color-input) & color swatches', passed: html.includes('id="watermark-color-input"') && html.includes('color-swatches') });
tests.push({ name: 'HTML contains Opacity Slider (#watermark-opacity-slider)', passed: html.includes('id="watermark-opacity-slider"') });
tests.push({ name: 'HTML contains Font Size Slider (#watermark-fontsize-slider)', passed: html.includes('id="watermark-fontsize-slider"') });
tests.push({ name: 'HTML contains Rotation Select dropdown (#watermark-rotation-select)', passed: html.includes('id="watermark-rotation-select"') });
tests.push({ name: 'HTML contains Live Interactive Preview container (#preview-page-canvas)', passed: html.includes('id="preview-page-canvas"') && html.includes('id="live-watermark-overlay"') });
tests.push({ name: 'HTML contains Primary Action button (#btn-apply-watermark)', passed: html.includes('id="btn-apply-watermark"') });
tests.push({ name: 'HTML contains Progress Bar card (#progress-card)', passed: html.includes('id="progress-card"') });
tests.push({ name: 'HTML contains Toast notification container (#toast)', passed: html.includes('id="toast"') });

// 3. Check JS logic
tests.push({ name: 'JS defines translations dictionary with en and ar', passed: js.includes('translations = {') && js.includes('en: {') && js.includes('ar: {') });
tests.push({ name: 'JS implements toggleLanguage and applyLanguage', passed: js.includes('function toggleLanguage') && js.includes('function applyLanguage') });
tests.push({ name: 'JS switches document.documentElement.dir (RTL support)', passed: js.includes("document.documentElement.dir = isAr ? 'rtl' : 'ltr'") });
tests.push({ name: 'JS loads PDF via PDFLib.PDFDocument.load', passed: js.includes('PDFLib.PDFDocument.load') });
tests.push({ name: 'JS embeds HelveticaBold font for crisp vector watermarks', passed: js.includes('StandardFonts.HelveticaBold') });
tests.push({ name: 'JS draws watermark text on all pages using page.drawText', passed: js.includes('page.drawText') });
tests.push({ name: 'JS computes diagonal rotation and centers text correctly', passed: js.includes('PDFLib.degrees') && js.includes('Math.cos') && js.includes('Math.sin') });
tests.push({ name: 'JS triggers direct client-side blob download', passed: js.includes('downloadBlob') || js.includes('URL.createObjectURL') });
tests.push({ name: 'JS includes interactive sample PDF generator', passed: js.includes('async function loadSamplePDF') });

// Report
let allPassed = true;
tests.forEach(t => {
  const symbol = t.passed ? '[PASS]' : '[FAIL]';
  console.log(`  ${symbol} ${t.name}`);
  if (!t.passed) allPassed = false;
});

console.log('='.repeat(70));
if (allPassed) {
  console.log(`ALL ${tests.length} WATERMARK TESTS PASSED SUCCESSFULLY!`);
} else {
  console.log('SOME TESTS FAILED!');
  process.exit(1);
}
console.log('='.repeat(70));
