const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '..');

const tools = [
  { html: 'ocr.html', js: 'ocr.js' },
  { html: 'sign.html', js: 'sign.js' },
  { html: 'merge.html', js: 'merge.js' },
  { html: 'split.html', js: 'split.js' },
  { html: 'compress.html', js: 'compress.js' },
  { html: 'protect.html', js: 'protect.js' },
  { html: 'annotator.html', js: 'app.js' },
  { html: 'watermark.html', js: 'watermark.js' },
  { html: 'img2pdf.html', js: 'img2pdf.js' },
  { html: 'index.html', js: 'index.html' },
  { html: 'privacy.html', js: 'privacy.html' },
  { html: 'terms.html', js: 'terms.html' },
  { html: 'contact.html', js: 'contact.html' }
];

console.log('='.repeat(70));
console.log('TESTING ALL 13 HTML FILES AGAINST LOCAL AND MASTER TRANSLATION FILES');
console.log('='.repeat(70));

const masterTranslations = require(path.join(baseDir, 'translations.js'));
const masterJson = JSON.parse(fs.readFileSync(path.join(baseDir, 'translations.json'), 'utf8'));
const masterI18n = require(path.join(baseDir, 'i18n.js'));

let hasErrors = false;

// 1. Verify Master Files
console.log('1. Checking Master Translation Files...');
if (Object.keys(masterTranslations.en).length === Object.keys(masterTranslations.ar).length) {
  console.log(`  [PASS] translations.js EN and AR keys match (${Object.keys(masterTranslations.en).length} keys)`);
} else {
  console.error('  [FAIL] translations.js EN and AR key counts differ');
  hasErrors = true;
}

if (Object.keys(masterJson.en).length === Object.keys(masterJson.ar).length) {
  console.log(`  [PASS] translations.json EN and AR keys match (${Object.keys(masterJson.en).length} keys)`);
} else {
  console.error('  [FAIL] translations.json EN and AR key counts differ');
  hasErrors = true;
}

if (Object.keys(masterI18n.en).length === Object.keys(masterI18n.ar).length) {
  console.log(`  [PASS] i18n.js EN and AR keys match (${Object.keys(masterI18n.en).length} keys)`);
} else {
  console.error('  [FAIL] i18n.js EN and AR key counts differ');
  hasErrors = true;
}

console.log('\n2. Checking Page-Level Translation Coverage...');
tools.forEach(t => {
  const htmlPath = path.join(baseDir, t.html);
  const jsPath = path.join(baseDir, t.js);
  const htmlContent = fs.readFileSync(htmlPath, 'utf8');
  const jsContent = fs.readFileSync(jsPath, 'utf8');

  const matches = [...htmlContent.matchAll(/data-i18n="([^"]+)"/g)].map(m => m[1]);
  const placeholders = [...htmlContent.matchAll(/data-i18n-placeholder="([^"]+)"/g)].map(m => m[1]);
  const allKeys = [...new Set([...matches, ...placeholders])];

  const missingLocal = [];
  const missingMaster = [];

  allKeys.forEach(k => {
    // Check local JS
    const hasInLocal = jsContent.includes(`"${k}":`) || jsContent.includes(`'${k}':`) || jsContent.includes(`${k}:`);
    if (!hasInLocal) {
      missingLocal.push(k);
    }
    // Check master translations.js
    if (!masterTranslations.en[k] || !masterTranslations.ar[k]) {
      missingMaster.push(k);
    }
  });

  if (missingLocal.length > 0) {
    console.error(`  [FAIL] ${t.html} -> ${t.js}: Missing local keys:`, missingLocal);
    hasErrors = true;
  } else {
    console.log(`  [PASS] ${t.html} -> ${t.js} (All ${allKeys.length} keys present in local JS)`);
  }

  if (missingMaster.length > 0) {
    console.error(`  [FAIL] ${t.html} -> translations.js: Missing in master:`, missingMaster);
    hasErrors = true;
  }
});

console.log('\n3. Verifying 6 Core Tools SEO & FAQ Keys...');
const requiredSeoPrefixes = ['ocr_', 'sign_', 'merge_', 'split_', 'compress_', 'protect_'];
const seoKeySuffixes = [
  'seo_badge', 'seo_title', 'seo_subtitle',
  'step1_title', 'step1_desc', 'step2_title', 'step2_desc', 'step3_title', 'step3_desc',
  'faq_title', 'faq_q1', 'faq_a1', 'faq_q2', 'faq_a2', 'faq_q3', 'faq_a3'
];

requiredSeoPrefixes.forEach(prefix => {
  let allPresent = true;
  seoKeySuffixes.forEach(suffix => {
    const key = prefix + suffix;
    if (!masterTranslations.en[key] || !masterTranslations.ar[key]) {
      console.error(`  [FAIL] Missing SEO/FAQ key in master: ${key}`);
      allPresent = false;
      hasErrors = true;
    }
  });
  if (allPresent) {
    console.log(`  [PASS] Tool prefix '${prefix}' has all 16 SEO/FAQ keys in EN & AR`);
  }
});

console.log('\n' + '='.repeat(70));
if (hasErrors) {
  console.error('TRANSLATION VERIFICATION FAILED!');
  process.exit(1);
} else {
  console.log('ALL VERIFICATIONS PASSED WITH ZERO ERRORS!');
}
console.log('='.repeat(70));
