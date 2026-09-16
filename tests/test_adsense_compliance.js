const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '..');
const htmlPath = path.join(baseDir, 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');

console.log('='.repeat(70));
console.log('VERIFYING GOOGLE ADSENSE COMPLIANCE & UNIVERSAL FOOTER IN INDEX.HTML');
console.log('='.repeat(70));

const tests = [];

// 1. Cookie Consent Banner
tests.push({ name: 'HTML contains Cookie Consent banner (#cookie-banner)', passed: html.includes('id="cookie-banner"') && html.includes('class="cookie-banner"') });
tests.push({ name: 'HTML contains Cookie Consent text with data-i18n', passed: html.includes('data-i18n="cookie_consent_text"') && html.includes('We use cookies') });
tests.push({ name: 'HTML contains Cookie Accept button (#btn-accept-cookies)', passed: html.includes('id="btn-accept-cookies"') && html.includes('data-i18n="cookie_accept_btn"') });
tests.push({ name: 'HTML contains Privacy Policy link inside cookie banner', passed: html.includes('data-i18n="cookie_learn_more"') && html.includes('href="privacy.html"') });
tests.push({ name: 'JS implements dismissible cookie consent with localStorage', passed: html.includes("localStorage.getItem('pdf_hub_cookie_consent')") && html.includes("localStorage.setItem('pdf_hub_cookie_consent'") });

// 2. Ad Slot Placeholder
tests.push({ name: 'HTML contains Ad Slot Placeholder (.ad-slot-horizontal)', passed: html.includes('class="ad-slot-horizontal"') && html.includes('ad-container') });
tests.push({ name: 'HTML contains Ad Slot text with data-i18n', passed: html.includes('data-i18n="ad_space_label"') && html.includes('Advertisement Space (728x90)') });

// 3. Universal Semantic Footer
tests.push({ name: 'HTML contains semantic <footer> element (.site-footer)', passed: html.includes('<footer class="site-footer"') });
tests.push({ name: 'Footer contains link to Privacy Policy (privacy.html)', passed: html.includes('href="privacy.html"') && html.includes('data-i18n="footer_privacy"') });
tests.push({ name: 'Footer contains link to Terms of Service (terms.html)', passed: html.includes('href="terms.html"') && html.includes('data-i18n="footer_terms"') });
tests.push({ name: 'Footer contains link to Contact Us (contact.html)', passed: html.includes('href="contact.html"') && html.includes('data-i18n="footer_contact"') });
tests.push({ name: 'Footer contains Copyright Notice', passed: html.includes('data-i18n="footer_copyright"') && html.includes('© 2026 PDF Hub. All rights reserved.') });

// 4. Bilingual i18n Coverage
tests.push({ name: 'EN translations contain all new keys', passed: html.includes('cookie_consent_text:') && html.includes('footer_privacy:') && html.includes('ad_space_label:') });
tests.push({ name: 'AR translations contain all new Arabic text', passed: html.includes('ملفات تعريف الارتباط') && html.includes('سياسة الخصوصية') && html.includes('مساحة إعلانية') });

let allPassed = true;
tests.forEach(t => {
  const symbol = t.passed ? '[PASS]' : '[FAIL]';
  console.log(`  ${symbol} ${t.name}`);
  if (!t.passed) allPassed = false;
});

console.log('='.repeat(70));
if (allPassed) {
  console.log(`ALL ${tests.length} ADSENSE COMPLIANCE TESTS PASSED SUCCESSFULLY!`);
} else {
  console.log('SOME TESTS FAILED!');
  process.exit(1);
}
console.log('='.repeat(70));
