const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '..');
const htmlPath = path.join(baseDir, 'protect.html');
const jsPath = path.join(baseDir, 'protect.js');

const html = fs.readFileSync(htmlPath, 'utf8');
const js = fs.readFileSync(jsPath, 'utf8');

console.log('='.repeat(70));
console.log('VERIFYING PROTECT PDF (PASSWORD ENCRYPTION) MICRO-TOOL');
console.log('='.repeat(70));

const tests = [];

// 1. CDN Imports
tests.push({ name: 'HTML imports PDF-Lib via CDN', passed: html.includes('unpkg.com/pdf-lib') });
tests.push({ name: 'HTML imports @pdfsmaller/pdf-encrypt via CDN', passed: html.includes('unpkg.com/@pdfsmaller/pdf-encrypt') });
tests.push({ name: 'HTML imports Lucide icons', passed: html.includes('unpkg.com/lucide') });
tests.push({ name: 'HTML imports Google Fonts (Cairo, Inter, Outfit)', passed: html.includes('Cairo') && html.includes('Outfit') && html.includes('Inter') });

// 2. Navigation & Glassmorphism Theme
tests.push({ name: 'HTML contains Home link in top navigation', passed: html.includes('href="index.html"') && html.includes('data-lucide="home"') });
tests.push({ name: 'HTML contains Language Toggle button (#btn-language-toggle)', passed: html.includes('id="btn-language-toggle"') && html.includes('id="lang-toggle-text"') });

// 3. Dropzone & File Management
tests.push({ name: 'HTML contains Drag & Drop zone (#dropzone)', passed: html.includes('id="dropzone"') });
tests.push({ name: 'HTML contains hidden file input (#pdf-file-input)', passed: html.includes('id="pdf-file-input"') });
tests.push({ name: 'HTML contains Sample PDF loader button (#btn-load-sample)', passed: html.includes('id="btn-load-sample"') });
tests.push({ name: 'HTML contains active configuration panel (#config-panel)', passed: html.includes('id="config-panel"') });

// 4. Password Security Controls
tests.push({ name: 'HTML contains Enter Password input (#password-input)', passed: html.includes('id="password-input"') });
tests.push({ name: 'HTML contains Confirm Password input (#confirm-password-input)', passed: html.includes('id="confirm-password-input"') });
tests.push({ name: 'HTML contains eye visibility toggles for both passwords', passed: html.includes('id="btn-toggle-pwd-1"') && html.includes('id="btn-toggle-pwd-2"') });
tests.push({ name: 'HTML contains Password Strength meter (#pwd-strength-label, bars)', passed: html.includes('id="pwd-strength-label"') && html.includes('id="pwd-bar-1"') });
tests.push({ name: 'HTML contains Real-time Match Status indicator (#pwd-match-status)', passed: html.includes('id="pwd-match-status"') });
tests.push({ name: 'HTML contains Encryption Algorithm selector (#encryption-algorithm)', passed: html.includes('id="encryption-algorithm"') && html.includes('AES-256') });
tests.push({ name: 'HTML contains Document Permissions toggles', passed: html.includes('id="perm-printing"') && html.includes('id="perm-copying"') });
tests.push({ name: 'HTML contains Output Filename input (#output-filename)', passed: html.includes('id="output-filename"') });

// 5. Action Buttons & Feedback
tests.push({ name: 'HTML contains Primary Encrypt Action button (#btn-encrypt-pdf)', passed: html.includes('id="btn-encrypt-pdf"') });
tests.push({ name: 'HTML contains Progress Bar card (#progress-card)', passed: html.includes('id="progress-card"') });
tests.push({ name: 'HTML contains Toast notification container (#toast)', passed: html.includes('id="toast"') });

// 6. JavaScript Logic & Encryption Execution
tests.push({ name: 'JS defines bilingual translations dictionary (EN/AR)', passed: js.includes('translations = {') && js.includes('en: {') && js.includes('ar: {') });
tests.push({ name: 'JS implements toggleLanguage and applyLanguage with RTL support', passed: js.includes('function toggleLanguage') && js.includes('function applyLanguage') && js.includes("document.documentElement.dir = isAr ? 'rtl' : 'ltr'") });
tests.push({ name: 'JS implements password visibility toggling', passed: js.includes('function togglePasswordVisibility') });
tests.push({ name: 'JS calculates password strength and validates matches', passed: js.includes('function calculatePasswordStrength') && js.includes('function updatePasswordSecurityUI') });
tests.push({ name: 'JS loads PDF document with PDFLib', passed: js.includes('PDFLib.PDFDocument.load') });
tests.push({ name: 'JS calls PDFEncrypt.encryptPDF with AES-256/RC4 options', passed: js.includes('window.PDFEncrypt.encryptPDF') });
tests.push({ name: 'JS triggers direct browser download of encrypted PDF blob', passed: js.includes('downloadBlob') || js.includes('URL.createObjectURL') });
tests.push({ name: 'JS provides interactive sample PDF generator', passed: js.includes('async function loadSamplePDF') });

// Report
let allPassed = true;
tests.forEach(t => {
  const symbol = t.passed ? '[PASS]' : '[FAIL]';
  console.log(`  ${symbol} ${t.name}`);
  if (!t.passed) allPassed = false;
});

console.log('='.repeat(70));
if (allPassed) {
  console.log(`ALL ${tests.length} PROTECT PDF TESTS PASSED SUCCESSFULLY!`);
} else {
  console.log('SOME TESTS FAILED!');
  process.exit(1);
}
console.log('='.repeat(70));
