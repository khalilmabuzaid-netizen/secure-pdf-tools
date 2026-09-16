const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '..');
const htmlPath = path.join(baseDir, 'img2pdf.html');
const jsPath = path.join(baseDir, 'img2pdf.js');

const html = fs.readFileSync(htmlPath, 'utf8');
const js = fs.readFileSync(jsPath, 'utf8');

console.log('='.repeat(70));
console.log('VERIFYING IMAGE TO PDF MICRO-TOOL IMPLEMENTATION');
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
tests.push({ name: 'HTML file input accepts multiple PNG & JPG images', passed: html.includes('accept="image/png, image/jpeg, image/jpg, image/webp"') && html.includes('multiple') });
tests.push({ name: 'HTML contains Image Preview Grid (#image-grid)', passed: html.includes('id="image-grid"') });
tests.push({ name: 'HTML contains Page Sizing dropdown (#page-size-select)', passed: html.includes('id="page-size-select"') });
tests.push({ name: 'HTML contains Primary Action button (#btn-convert-pdf)', passed: html.includes('id="btn-convert-pdf"') });
tests.push({ name: 'HTML contains Progress Bar card (#progress-card)', passed: html.includes('id="progress-card"') });
tests.push({ name: 'HTML contains Toast notification container (#toast)', passed: html.includes('id="toast"') });

// 3. Check JS logic
tests.push({ name: 'JS defines translations dictionary with en and ar', passed: js.includes('translations = {') && js.includes('en: {') && js.includes('ar: {') });
tests.push({ name: 'JS implements toggleLanguage and applyLanguage', passed: js.includes('function toggleLanguage') && js.includes('function applyLanguage') });
tests.push({ name: 'JS switches document.documentElement.dir (RTL support)', passed: js.includes("document.documentElement.dir = isAr ? 'rtl' : 'ltr'") });
tests.push({ name: 'JS creates new PDF document via PDFLib.PDFDocument.create', passed: js.includes('PDFLib.PDFDocument.create') });
tests.push({ name: 'JS embeds PNG images via pdfDoc.embedPng', passed: js.includes('pdfDoc.embedPng') });
tests.push({ name: 'JS embeds JPG images via pdfDoc.embedJpg', passed: js.includes('pdfDoc.embedJpg') });
tests.push({ name: 'JS adds pages and draws images with dimensions', passed: js.includes('pdfDoc.addPage') && js.includes('page.drawImage') });
tests.push({ name: 'JS triggers direct client-side blob download', passed: js.includes('downloadBlob') || js.includes('URL.createObjectURL') });
tests.push({ name: 'JS includes interactive sample images generator', passed: js.includes('async function loadSampleImages') });

// Report
let allPassed = true;
tests.forEach(t => {
  const symbol = t.passed ? '[PASS]' : '[FAIL]';
  console.log(`  ${symbol} ${t.name}`);
  if (!t.passed) allPassed = false;
});

console.log('='.repeat(70));
if (allPassed) {
  console.log(`ALL ${tests.length} IMAGE TO PDF TESTS PASSED SUCCESSFULLY!`);
} else {
  console.log('SOME TESTS FAILED!');
  process.exit(1);
}
console.log('='.repeat(70));
