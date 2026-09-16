/**
 * Automated Verification for Split PDF RTL Language Toggle & i18n
 */
const fs = require('fs');
const path = require('path');

function verifySplitI18n() {
  console.log("=== SPLIT PDF RTL & I18N VERIFICATION ===");

  const splitHtml = fs.readFileSync(path.join(__dirname, '..', 'split.html'), 'utf8');
  const splitJs = fs.readFileSync(path.join(__dirname, '..', 'split.js'), 'utf8');

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`[PASS] ${message}`);
      passed++;
    } else {
      console.error(`[FAIL] ${message}`);
      failed++;
    }
  }

  // 1. Language Toggle Button UI
  assert(splitHtml.includes('id="btn-language-toggle"'), 'split.html contains #btn-language-toggle button');
  assert(splitHtml.includes('id="lang-toggle-text"'), 'split.html contains #lang-toggle-text element');
  assert(splitHtml.includes('data-lucide="globe"'), 'split.html contains globe icon for language toggle');

  // 2. RTL CSS Styles
  assert(splitHtml.includes('[dir="rtl"]'), 'split.html contains [dir="rtl"] CSS layout rules');
  assert(splitHtml.includes('Segoe UI Arabic'), 'split.html contains Arabic typography fallback font stack');

  // 3. data-i18n tags on UI elements
  assert(splitHtml.includes('data-i18n="badge_client_side"'), 'split.html has data-i18n on brand badge');
  assert(splitHtml.includes('data-i18n="hero_title"'), 'split.html has data-i18n on hero title');
  assert(splitHtml.includes('data-i18n="dropzone_title"'), 'split.html has data-i18n on dropzone title');
  assert(splitHtml.includes('data-i18n="btn_browse"'), 'split.html has data-i18n on browse button');
  assert(splitHtml.includes('data-i18n="btn_sample"'), 'split.html has data-i18n on sample button');
  assert(splitHtml.includes('data-i18n="label_pages_to_extract"'), 'split.html has data-i18n on pages input label');
  assert(splitHtml.includes('data-i18n="preset_all"'), 'split.html has data-i18n on preset chips');
  assert(splitHtml.includes('data-i18n="btn_split_download"'), 'split.html has data-i18n on split download button');

  // 4. split.js translation dictionaries
  assert(splitJs.includes('const translations = {'), 'split.js defines translations dictionary');
  assert(splitJs.includes('en: {') && splitJs.includes('ar: {'), 'split.js contains both English and Arabic language packs');
  assert(splitJs.includes('hero_title:') && splitJs.includes('dropzone_title:'), 'split.js contains matching keys for split tool UI');
  assert(splitJs.includes('btn_language-toggle') || splitJs.includes("getElementById('btn-language-toggle')"), 'split.js caches #btn-language-toggle');
  assert(splitJs.includes('document.documentElement.dir'), 'split.js manages document direction dir="rtl"/"ltr"');

  console.log(`\nResults: ${passed} passed, ${failed} failed.`);
  if (failed > 0) process.exit(1);
}

verifySplitI18n();
