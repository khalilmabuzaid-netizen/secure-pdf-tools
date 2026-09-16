const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '..');
const htmlPath = path.join(baseDir, 'contact.html');
const html = fs.readFileSync(htmlPath, 'utf8');

console.log('='.repeat(70));
console.log('VERIFYING CONTACT US (CONTACT.HTML) COMPLIANCE, FORM & I18N');
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

// 2. Title & Lead Description
const leadText = "Have a question or facing an issue? Send us a message.";
tests.push({
  name: 'HTML contains Contact Us title with data-i18n',
  passed: html.includes('data-i18n="contact_title"') && html.includes('Contact')
});
tests.push({
  name: 'HTML contains exact lead description text',
  passed: html.includes('data-i18n="contact_lead"') && html.includes(leadText)
});

// 3. Form Inputs: Name, Email, Textarea Message, Send Button
tests.push({
  name: 'HTML contains Name input (#contact-name)',
  passed: html.includes('id="contact-name"') && html.includes('data-i18n-placeholder="placeholder_name"') && html.includes('data-i18n="label_name"')
});
tests.push({
  name: 'HTML contains Email input (#contact-email)',
  passed: html.includes('id="contact-email"') && html.includes('type="email"') && html.includes('data-i18n="label_email"')
});
tests.push({
  name: 'HTML contains Message textarea (#contact-message)',
  passed: html.includes('<textarea') && html.includes('id="contact-message"') && html.includes('data-i18n="label_message"')
});
tests.push({
  name: 'HTML contains Send Message button with data-i18n',
  passed: html.includes('id="btn-submit-contact"') && html.includes('data-i18n="btn_send_message"')
});

// 4. Form Submit handling & Glassmorphism design
tests.push({
  name: 'HTML contains live Formspree POST action endpoint',
  passed: html.includes('action="https://formspree.io/f/xbglrzdv"') && html.includes('method="POST"')
});
tests.push({
  name: 'HTML includes glassmorphism card styling (.contact-form-card)',
  passed: html.includes('.contact-form-card') && html.includes('backdrop-filter: blur')
});

// 5. Universal Footer
tests.push({
  name: 'HTML contains universal semantic footer with links to privacy, terms, contact',
  passed: html.includes('<footer class="site-footer"') && html.includes('href="privacy.html"') && html.includes('href="terms.html"') && html.includes('href="contact.html"')
});

// 6. Cookie Banner
tests.push({
  name: 'HTML contains Cookie Consent banner (#cookie-banner)',
  passed: html.includes('id="cookie-banner"') && html.includes('id="btn-accept-cookies"')
});

// 7. Bilingual Translation Dictionary & RTL logic
tests.push({
  name: 'JS defines translations dictionary with EN and AR',
  passed: html.includes('translations = {') && html.includes('en: {') && html.includes('ar: {')
});
tests.push({
  name: 'JS implements toggleLanguage and applyLanguage with RTL dir switch',
  passed: html.includes('function toggleLanguage') && html.includes('function applyLanguage') && html.includes("document.documentElement.dir = isAr ? 'rtl' : 'ltr'")
});
tests.push({
  name: 'AR translations contain complete Arabic contact translation',
  passed: html.includes('اتصل') && html.includes('الاسم') && html.includes('البريد الإلكتروني') && html.includes('الرسالة') && html.includes('إرسال الرسالة')
});

// 8. All data-i18n & data-i18n-placeholder tags extracted and verified against dictionary
const i18nMatches = [...html.matchAll(/data-i18n="([^"]+)"/g)].map(m => m[1]);
const i18nPlaceholderMatches = [...html.matchAll(/data-i18n-placeholder="([^"]+)"/g)].map(m => m[1]);
const uniqueKeys = [...new Set([...i18nMatches, ...i18nPlaceholderMatches])];
let missingKeys = [];
uniqueKeys.forEach(k => {
  if (!html.includes(`${k}:`)) {
    missingKeys.push(k);
  }
});
tests.push({
  name: `All ${uniqueKeys.length} data-i18n & placeholder keys present in translations dictionary`,
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
  console.log(`ALL ${tests.length} CONTACT US TESTS PASSED SUCCESSFULLY!`);
} else {
  console.log('SOME TESTS FAILED!');
  process.exit(1);
}
console.log('='.repeat(70));
