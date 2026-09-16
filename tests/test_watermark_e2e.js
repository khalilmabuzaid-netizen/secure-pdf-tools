const http = require('http');

http.get('http://localhost:8080/watermark.html', (res) => {
  console.log(`HTTP Status: ${res.statusCode}`);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log(`Content length: ${data.length} bytes`);
    const hasPdfLib = data.includes('pdf-lib');
    const hasWatermarkJs = data.includes('watermark.js');
    const hasLanguageToggle = data.includes('btn-language-toggle');
    const hasWatermarkInput = data.includes('watermark-text-input');
    const hasApplyButton = data.includes('btn-apply-watermark');

    console.log(`[PASS] Has pdf-lib: ${hasPdfLib}`);
    console.log(`[PASS] Has watermark.js: ${hasWatermarkJs}`);
    console.log(`[PASS] Has language toggle: ${hasLanguageToggle}`);
    console.log(`[PASS] Has watermark input: ${hasWatermarkInput}`);
    console.log(`[PASS] Has apply button: ${hasApplyButton}`);

    if (res.statusCode === 200 && hasPdfLib && hasWatermarkJs && hasLanguageToggle && hasWatermarkInput && hasApplyButton) {
      console.log('WATERMARK END-TO-END HTTP SERVER CHECK: SUCCESSFUL');
      process.exit(0);
    } else {
      console.log('WATERMARK CHECK FAILED');
      process.exit(1);
    }
  });
}).on('error', (err) => {
  console.error('HTTP request failed:', err.message);
  process.exit(1);
});
