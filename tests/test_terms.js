const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '..');
const htmlPath = path.join(baseDir, 'terms.html');
const html = fs.readFileSync(htmlPath, 'utf8');

console.log('='.repeat(70));
console.log('VERIFYING TERMS OF SERVICE (TERMS.HTML) ADSENSE COMPLIANCE & I18N');
console.log('='.repeat(70));

const tests = [];

// 1. Header & Navigation
tests.push({
  name: 'HTML contains Top Nav with Home link',
  passed: html.includes('id="top-nav"') && html.includes('href="index.html"') && html.includes('data-lucide="home"')
});
tests.push({
  name: 'HTML contains Language Toggle button (#btn-language-toggle)',
  passed: html.includes('id="btn-language-toggle"') && html.includes('id="lang-toggle-text"')
});

// 2. Title & Effective Date
tests.push({
  name: 'HTML contains Terms of Service title with data-i18n',
  passed: html.includes('data-i18n="terms_title"') && html.includes('Terms of')
});

// 3. Section 1: Acceptance of Terms
const s1Text = "By accessing and using this tool, you accept and agree to be bound by the terms and provisions of this agreement.";
tests.push({
  name: 'HTML contains Section 1: Acceptance of Terms with exact required wording',
  passed: html.includes('data-i18n="terms_s1_title"') && html.includes('data-i18n="terms_s1_desc"') && html.includes(s1Text)
});

// 4. Section 2: Disclaimer of Warranties
const s2Text = "This tool is provided 'as is' without warranty of any kind. Since processing happens locally on your device, we are not responsible for any browser crashes or data loss.";
tests.push({
  name: 'HTML contains Section 2: Disclaimer of Warranties with exact required wording',
  passed: html.includes('data-i18n="terms_s2_title"') && html.includes('data-i18n="terms_s2_desc"') && html.includes(s2Text)
});

// 5. Section 3: Prohibited Use
const s3Text = "You agree not to use this tool for any illegal activities or to process malicious files.";
tests.push({
  name: 'HTML contains Section 3: Prohibited Use with exact required wording',
  passed: html.includes('data-i18n="terms_s3_title"') && html.includes('data-i18n="terms_s3_desc"') && html.includes(s3Text)
});

// 6. Universal Footer
tests.push({
  name: 'HTML contains universal semantic footer with links to privacy, terms, contact',
  passed: html.includes('<footer class="site-footer"') && html.includes('href="privacy.html"') && html.includes('href="terms.html"') && html.includes('href="contact.html"')
});

// 7. Cookie Banner
tests.push({
  name: 'HTML contains Cookie Consent banner (#cookie-banner)',
  passed: html.includes('id="cookie-banner"') && html.includes('id="btn-accept-cookies"')
});

// 8. Bilingual Translation Dictionary & RTL logic
tests.push({
  name: 'JS defines translations dictionary with EN and AR',
  passed: html.includes('translations = {') && html.includes('en: {') && html.includes('ar: {')
});
tests.push({
  name: 'JS implements toggleLanguage and applyLanguage with RTL dir switch',
  passed: html.includes('function toggleLanguage') && html.includes('function applyLanguage') && html.includes("document.documentElement.dir = isAr ? 'rtl' : 'ltr'")
});
tests.push({
  name: 'AR translations contain complete Arabic legal translation',
  passed: html.includes('شروط') && html.includes('قبول الشروط') && html.includes('إخلاء المسؤولية عن الضمانات') && html.includes('الاستخدام المحظور')
});

// 9. All data-i18n tags extracted and verified against dictionary
const i18nMatches = [...html.matchAll(/data-i18n="([^"]+)"/g)].map(m => m[1]);
const uniqueKeys = [...new Set(i18nMatches)];
let missingKeys = [];
uniqueKeys.forEach(k => {
  if (!html.includes(`${k}:`)) {
    missingKeys.push(k);
  }
});
tests.push({
  name: `All ${uniqueKeys.length} data-i18n tags present in translations dictionary`,
  passed: missingKeys.length === 0,
  details: missingKeys.join(', ')
});

// Report
let allPassed = true;
tests.forEach(t => {
  const symbol = t.passed ? '[PASS]' : '[FAIL]';
  console.log(`  ${symbol} ${t.name}`);
  if (!t.passed) {
    allPassed = false;
    if (t.details) console.log(`         Details: ${t.details}`);
  }
});

console.log('='.repeat(70));
if (allPassed) {
  console.log(`ALL ${tests.length} TERMS OF SERVICE TESTS PASSED SUCCESSFULLY!`);
} else {
  console.log('SOME TESTS FAILED!');
  process.exit(1);
}
console.log('='.repeat(70));
