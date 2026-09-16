const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '..');
const htmlPath = path.join(baseDir, 'privacy.html');
const html = fs.readFileSync(htmlPath, 'utf8');

console.log('='.repeat(70));
console.log('VERIFYING PRIVACY POLICY (PRIVACY.HTML) ADSENSE COMPLIANCE & I18N');
console.log('='.repeat(70));

const tests = [];

// 1. Header & Navigation
tests.push({ name: 'HTML contains Top Nav with Home link', passed: html.includes('id="top-nav"') && html.includes('href="index.html"') && html.includes('data-lucide="home"') });
tests.push({ name: 'HTML contains Language Toggle button (#btn-language-toggle)', passed: html.includes('id="btn-language-toggle"') && html.includes('id="lang-toggle-text"') });

// 2. Title & Effective Date
tests.push({ name: 'HTML contains Privacy Policy title with data-i18n', passed: html.includes('data-i18n="privacy_title"') && html.includes('Privacy') });
tests.push({ name: 'HTML contains Effective Date: September 2026', passed: html.includes('data-i18n="privacy_effective_date"') && html.includes('September 2026') });

// 3. Section 1: Local File Processing
const s1Text = "Your privacy is our priority. All PDF processing (merging, splitting, compressing, etc.) is executed 100% locally within your web browser. We do NOT upload, store, or view your files on any server. Your data never leaves your device.";
tests.push({ name: 'HTML contains Section 1: Local File Processing', passed: html.includes('data-i18n="privacy_s1_title"') && html.includes('data-i18n="privacy_s1_desc"') && html.includes(s1Text) });

// 4. Section 2: Cookies and Advertising
const s2Text = "We use cookies to save your UI preferences. Additionally, third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites. Users may opt out of personalized advertising by visiting Google's Ads Settings.";
tests.push({ name: 'HTML contains Section 2: Cookies and Advertising', passed: html.includes('data-i18n="privacy_s2_title"') && html.includes('data-i18n="privacy_s2_desc"') && html.includes(s2Text) });
tests.push({ name: 'HTML links to Google Ads Settings opt-out', passed: html.includes('https://www.google.com/settings/ads') });

// 5. Section 3: Contact Us
const s3Text = "If you have any questions about this Privacy Policy, please contact us.";
tests.push({ name: 'HTML contains Section: Contact Us', passed: html.includes('data-i18n="privacy_s6_title"') && html.includes('data-i18n="privacy_s6_desc"') && html.includes(s3Text) });
tests.push({ name: 'HTML contains Contact action button to contact.html', passed: html.includes('href="contact.html"') });

// 6. Universal Footer
tests.push({ name: 'HTML contains universal semantic footer', passed: html.includes('<footer class="site-footer"') && html.includes('href="privacy.html"') && html.includes('href="terms.html"') && html.includes('href="contact.html"') });

// 7. Cookie Banner
tests.push({ name: 'HTML contains Cookie Consent banner (#cookie-banner)', passed: html.includes('id="cookie-banner"') && html.includes('id="btn-accept-cookies"') });

// 8. Bilingual Translation Dictionary & RTL logic
tests.push({ name: 'JS defines translations dictionary with EN and AR', passed: html.includes('translations = {') && html.includes('en: {') && html.includes('ar: {') });
tests.push({ name: 'JS implements toggleLanguage and applyLanguage with RTL dir switch', passed: html.includes('function toggleLanguage') && html.includes('function applyLanguage') && html.includes("document.documentElement.dir = isAr ? 'rtl' : 'ltr'") });
tests.push({ name: 'AR translations contain complete Arabic legal translation', passed: html.includes('سياسة') && html.includes('معالجة الملفات محلياً') && html.includes('ملفات تعريف الارتباط') });

// 9. All data-i18n tags extracted and verified against dictionary
const i18nMatches = [...html.matchAll(/data-i18n="([^"]+)"/g)].map(m => m[1]);
const uniqueKeys = [...new Set(i18nMatches)];
let missingKeys = [];
uniqueKeys.forEach(k => {
  if (!html.includes(`${k}:`)) {
    missingKeys.push(k);
  }
});
tests.push({ name: `All ${uniqueKeys.length} data-i18n tags present in translations dictionary`, passed: missingKeys.length === 0, details: missingKeys.join(', ') });

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
  console.log(`ALL ${tests.length} PRIVACY POLICY TESTS PASSED SUCCESSFULLY!`);
} else {
  console.log('SOME TESTS FAILED!');
  process.exit(1);
}
console.log('='.repeat(70));
