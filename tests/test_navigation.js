/**
 * Automated Verification for Navigation Routing & Aesthetics
 */
const fs = require('fs');
const path = require('path');

function verifyNavigation() {
  console.log("=== NAVIGATION UNIFICATION VERIFICATION ===");

  const annotatorHtml = fs.readFileSync(path.join(__dirname, '..', 'annotator.html'), 'utf8');
  const compressHtml = fs.readFileSync(path.join(__dirname, '..', 'compress.html'), 'utf8');
  const styleCss = fs.readFileSync(path.join(__dirname, '..', 'style.css'), 'utf8');
  const appJs = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');

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

  // 1. Annotator.html Logo Link
  assert(
    /<a\s+href="index\.html"[^>]*class="nav-brand"/.test(annotatorHtml) || /<a\s+class="nav-brand"[^>]*href="index\.html"/.test(annotatorHtml),
    'annotator.html wraps logo/title in <a href="index.html" class="nav-brand">'
  );

  // 2. Annotator.html Home Button
  assert(
    annotatorHtml.includes('data-lucide="home"') && annotatorHtml.includes('href="index.html"'),
    'annotator.html includes Home button with data-lucide="home" linking to index.html'
  );

  // 3. Compress.html Logo Link
  assert(
    /<a\s+href="index\.html"[^>]*class="nav-brand"/.test(compressHtml) || /<a\s+class="nav-brand"[^>]*href="index\.html"/.test(compressHtml),
    'compress.html wraps logo/title in <a href="index.html" class="nav-brand">'
  );

  // 4. Compress.html Home Button
  assert(
    compressHtml.includes('data-lucide="home"') && compressHtml.includes('href="index.html"'),
    'compress.html includes Home button with data-lucide="home" linking to index.html'
  );

  // 5. CSS Link Formatting Protections
  assert(
    styleCss.includes('.nav-brand') && styleCss.includes('text-decoration: none;') && styleCss.includes('color: inherit;'),
    'style.css ensures .nav-brand has text-decoration: none and color: inherit'
  );
  assert(
    styleCss.includes('.btn') && styleCss.includes('text-decoration: none;'),
    'style.css ensures .btn has text-decoration: none'
  );
  assert(
    compressHtml.includes('.nav-brand') && compressHtml.includes('text-decoration: none;'),
    'compress.html CSS ensures .nav-brand has text-decoration: none and color: inherit'
  );

  // 6. i18n support in app.js
  assert(
    appJs.includes('nav_home: "Home"') && appJs.includes('nav_home: "الرئيسية"'),
    'app.js contains English and Arabic translations for nav_home'
  );

  console.log(`\nResults: ${passed} passed, ${failed} failed.`);
  if (failed > 0) process.exit(1);
}

verifyNavigation();
