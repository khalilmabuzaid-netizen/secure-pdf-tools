const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '..');

const pages = [
  { name: 'Hub (index.html)', html: 'index.html', js: 'index.html', isInlineJs: true },
  { name: 'Annotator', html: 'annotator.html', js: 'app.js', isInlineJs: false },
  { name: 'Split PDF', html: 'split.html', js: 'split.js', isInlineJs: false },
  { name: 'Merge PDF', html: 'merge.html', js: 'merge.js', isInlineJs: false },
  { name: 'Compress PDF', html: 'compress.html', js: 'compress.js', isInlineJs: false },
  { name: 'Watermark PDF', html: 'watermark.html', js: 'watermark.js', isInlineJs: false },
  { name: 'Image to PDF', html: 'img2pdf.html', js: 'img2pdf.js', isInlineJs: false },
  { name: 'Protect PDF', html: 'protect.html', js: 'protect.js', isInlineJs: false },
  { name: 'Privacy Policy', html: 'privacy.html', js: 'privacy.html', isInlineJs: true },
  { name: 'Terms of Service', html: 'terms.html', js: 'terms.html', isInlineJs: true },
  { name: 'Contact Us', html: 'contact.html', js: 'contact.html', isInlineJs: true }
];

console.log('='.repeat(70));
console.log('VERIFYING GLOBAL SITE-WIDE I18N AND RTL TOGGLE ACROSS ALL PAGES');
console.log('='.repeat(70));

let allPassed = true;

pages.forEach(page => {
  console.log(`\nChecking: ${page.name}`);
  const htmlContent = fs.readFileSync(path.join(baseDir, page.html), 'utf8');
  const jsContent = fs.readFileSync(path.join(baseDir, page.js), 'utf8');

  const checks = [];

  // 1. Language Toggle Button in HTML
  const hasToggleBtn = htmlContent.includes('id="btn-language-toggle"');
  const hasToggleText = htmlContent.includes('id="lang-toggle-text"');
  checks.push({ name: 'Header Language Toggle button (#btn-language-toggle, #lang-toggle-text)', passed: hasToggleBtn && hasToggleText });

  // 2. data-i18n tags extracted
  const i18nMatches = [...htmlContent.matchAll(/data-i18n="([^"]+)"/g)].map(m => m[1]);
  const uniqueKeys = [...new Set(i18nMatches)];
  checks.push({ name: `Found ${uniqueKeys.length} unique data-i18n key(s)`, passed: uniqueKeys.length > 0 });

  // 3. Translations object in JS
  const hasTranslations = jsContent.includes('translations = {') || jsContent.includes('translations={') || jsContent.includes('const translations');
  const hasEn = jsContent.includes('en: {') || jsContent.includes('en:{');
  const hasAr = jsContent.includes('ar: {') || jsContent.includes('ar:{');
  checks.push({ name: 'Translations dictionary with "en" and "ar" defined', passed: hasTranslations && hasEn && hasAr });

  // 4. Check for toggle / dir RTL logic
  const hasDirToggle = jsContent.includes('dir =') || jsContent.includes('dir=') || jsContent.includes("document.documentElement.dir");
  checks.push({ name: 'RTL/LTR document.documentElement.dir toggle logic present', passed: hasDirToggle });

  // 5. Check if all data-i18n keys are present in JS translations
  const missingEnKeys = [];
  const missingArKeys = [];

  // Extract translations snippet
  uniqueKeys.forEach(k => {
    if (!jsContent.includes(`"${k}":`) && !jsContent.includes(`'${k}':`) && !jsContent.includes(`${k}:`)) {
      missingEnKeys.push(k);
    }
  });

  checks.push({
    name: 'All HTML data-i18n keys accounted for in translations dictionary',
    passed: missingEnKeys.length === 0,
    details: missingEnKeys.length > 0 ? `Missing keys: ${missingEnKeys.join(', ')}` : null
  });

  // Report results for this page
  checks.forEach(c => {
    const symbol = c.passed ? '[PASS]' : '[FAIL]';
    console.log(`  ${symbol} ${c.name}`);
    if (!c.passed) {
      allPassed = false;
      if (c.details) console.log(`         Details: ${c.details}`);
    }
  });
});

console.log('\n' + '='.repeat(70));
if (allPassed) {
  console.log('ALL TOOLS AND HUB PAGES FULLY PASS GLOBAL I18N AND RTL VERIFICATION!');
} else {
  console.log('SOME I18N CHECKS FAILED!');
  process.exit(1);
}
console.log('='.repeat(70));
