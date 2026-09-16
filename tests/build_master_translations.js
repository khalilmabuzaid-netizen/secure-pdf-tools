const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '..');

const files = [
  'app.js', 'ocr.js', 'sign.js', 'merge.js', 'split.js', 'compress.js',
  'protect.js', 'watermark.js', 'img2pdf.js', 'index.html', 'privacy.html',
  'terms.html', 'contact.html'
];

const master = { en: {}, ar: {} };

files.forEach(file => {
  const filePath = path.join(baseDir, file);
  const content = fs.readFileSync(filePath, 'utf8');

  // Extract translations object
  const transMatch = content.match(/const translations\s*=\s*(\{[\s\S]*?\n\s*\};)/);
  if (transMatch) {
    try {
      const fn = new Function('return ' + transMatch[1]);
      const obj = fn();
      if (obj.en) Object.assign(master.en, obj.en);
      if (obj.ar) Object.assign(master.ar, obj.ar);
      console.log('Merged translations from', file);
    } catch (e) {
      console.error('Error parsing translations in ' + file + ':', e.message);
    }
  }
});

console.log('Total Master EN keys:', Object.keys(master.en).length);
console.log('Total Master AR keys:', Object.keys(master.ar).length);

// Write translations.json
fs.writeFileSync(path.join(baseDir, 'translations.json'), JSON.stringify(master, null, 2), 'utf8');

// Write translations.js and i18n.js
const header = `/**
 * Secure PDF Tools - Master Bilingual Translation Dictionary (i18n)
 * English (en) & Arabic (ar - RTL)
 * Master dictionary containing all site keys across all tools.
 */

const translations = ${JSON.stringify(master, null, 2)};

if (typeof window !== 'undefined') {
  window.translations = translations;
  window.I18N_TRANSLATIONS = translations;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = translations;
}
`;

fs.writeFileSync(path.join(baseDir, 'translations.js'), header, 'utf8');
fs.writeFileSync(path.join(baseDir, 'i18n.js'), header, 'utf8');
console.log('Successfully updated translations.json, translations.js, and i18n.js');
