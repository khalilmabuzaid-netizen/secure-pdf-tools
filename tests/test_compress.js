/**
 * Automated Verification Script for Compress PDF Tool
 */
const fs = require('fs');
const path = require('path');

function runVerification() {
  console.log("=== COMPRESS PDF TOOL VERIFICATION ===");

  const htmlPath = path.join(__dirname, '..', 'compress.html');
  const jsPath = path.join(__dirname, '..', 'compress.js');
  const indexPath = path.join(__dirname, '..', 'index.html');

  const htmlContent = fs.readFileSync(htmlPath, 'utf8');
  const jsContent = fs.readFileSync(jsPath, 'utf8');
  const indexContent = fs.readFileSync(indexPath, 'utf8');

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

  // 1. Check Libraries
  assert(htmlContent.includes('pdf.min.js'), 'HTML imports Mozilla PDF.js via CDN');
  assert(htmlContent.includes('jspdf.umd.min.js') || htmlContent.includes('jspdf'), 'HTML imports jsPDF via CDN');
  assert(htmlContent.includes('lucide'), 'HTML imports Lucide icons');

  // 2. Check UI Elements
  assert(htmlContent.includes('id="dropzone"'), 'HTML contains Drag & Drop zone (#dropzone)');
  assert(htmlContent.includes('id="pdf-file-input"'), 'HTML contains file input element');
  assert(htmlContent.includes('id="quality-select-dropdown"'), 'HTML contains quality select dropdown');
  assert(htmlContent.includes('id="quality-slider"'), 'HTML contains fine-tune quality slider');
  assert(htmlContent.includes('id="btn-execute-compress"'), 'HTML contains "Compress & Download" primary button');
  assert(htmlContent.includes('href="index.html"'), 'HTML contains "Back to Hub" link to index.html');
  assert(htmlContent.includes('id="progress-card"') && htmlContent.includes('id="progress-fill"'), 'HTML contains progress bar elements');
  assert(htmlContent.includes('id="memory-alert-box"'), 'HTML contains dedicated Memory Alert Warning UI Box');
  assert(htmlContent.includes('id="toast"'), 'HTML contains Toast notification container');

  // 3. Check Memory Protection Logic
  assert(jsContent.includes('25 * 1024 * 1024'), 'compress.js defines 25MB ceiling (25 * 1024 * 1024)');
  assert(
    jsContent.includes('For optimal browser performance and 100% privacy, please select a PDF under 25MB.'),
    'compress.js contains exact required memory protection message'
  );
  assert(jsContent.includes('file.size > MAX_FILE_SIZE_BYTES') || jsContent.includes('file.size > 25'), 'compress.js checks file.size on upload event');

  // 4. Check Client-Side PDF Compression & Synthesis
  assert(jsContent.includes('pdfjsLib.getDocument'), 'compress.js uses PDF.js to parse and render pages');
  assert(jsContent.includes('canvas.toDataURL(\'image/jpeg\'') || jsContent.includes('canvas.toDataURL("image/jpeg"'), 'compress.js exports compressed JPEG from canvas');
  assert(jsContent.includes('jsPDF') || jsContent.includes('jspdf'), 'compress.js constructs new PDF using jsPDF');
  assert(jsContent.includes('targetDoc.save') || jsContent.includes('doc.save'), 'compress.js saves and triggers direct download');

  // 5. Check Hub linking
  assert(indexContent.includes('href="compress.html"'), 'index.html hub links to compress.html');

  console.log(`\nResults: ${passed} passed, ${failed} failed.`);
  if (failed > 0) {
    process.exit(1);
  }
}

runVerification();
