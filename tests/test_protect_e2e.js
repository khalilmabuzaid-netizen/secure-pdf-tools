const http = require('http');

http.get('http://localhost:8080/protect.html', (res) => {
  console.log(`HTTP Status: ${res.statusCode}`);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log(`Content length: ${data.length} bytes`);
    const hasPdfLib = data.includes('pdf-lib');
    const hasPdfEncrypt = data.includes('pdf-encrypt.umd.js');
    const hasProtectJs = data.includes('protect.js');
    const hasLanguageToggle = data.includes('btn-language-toggle');
    const hasPasswordInput = data.includes('password-input');
    const hasConfirmInput = data.includes('confirm-password-input');
    const hasToggleEye1 = data.includes('btn-toggle-pwd-1');
    const hasToggleEye2 = data.includes('btn-toggle-pwd-2');
    const hasStrengthMeter = data.includes('pwd-strength-label');
    const hasMatchStatus = data.includes('pwd-match-status');
    const hasAlgorithmSelect = data.includes('encryption-algorithm');
    const hasEncryptButton = data.includes('btn-encrypt-pdf');

    console.log(`[PASS] Has PDF-Lib CDN: ${hasPdfLib}`);
    console.log(`[PASS] Has PDF-Encrypt CDN: ${hasPdfEncrypt}`);
    console.log(`[PASS] Has protect.js: ${hasProtectJs}`);
    console.log(`[PASS] Has language toggle: ${hasLanguageToggle}`);
    console.log(`[PASS] Has password input: ${hasPasswordInput}`);
    console.log(`[PASS] Has confirm password input: ${hasConfirmInput}`);
    console.log(`[PASS] Has eye toggle 1: ${hasToggleEye1}`);
    console.log(`[PASS] Has eye toggle 2: ${hasToggleEye2}`);
    console.log(`[PASS] Has strength meter: ${hasStrengthMeter}`);
    console.log(`[PASS] Has match status: ${hasMatchStatus}`);
    console.log(`[PASS] Has algorithm select: ${hasAlgorithmSelect}`);
    console.log(`[PASS] Has encrypt button: ${hasEncryptButton}`);

    const allConditions = (
      res.statusCode === 200 &&
      hasPdfLib &&
      hasPdfEncrypt &&
      hasProtectJs &&
      hasLanguageToggle &&
      hasPasswordInput &&
      hasConfirmInput &&
      hasToggleEye1 &&
      hasToggleEye2 &&
      hasStrengthMeter &&
      hasMatchStatus &&
      hasAlgorithmSelect &&
      hasEncryptButton
    );

    if (allConditions) {
      console.log('PROTECT PDF HTTP SERVER E2E CHECK: SUCCESSFUL');
      process.exit(0);
    } else {
      console.log('PROTECT PDF HTTP CHECK FAILED');
      process.exit(1);
    }
  });
}).on('error', (err) => {
  console.error('HTTP request failed:', err.message);
  process.exit(1);
});
