const CACHE_NAME = 'pdf-netizen-v2';

const PRECACHE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './favicon.svg',
  './style.css',
  './merge.css',
  './theme.css',
  './theme.js',
  './app.js',
  './pwa.js',
  './i18n.js',
  './translations.js',
  './translations.json',
  './icons/icon-48.png',
  './icons/icon-96.png',
  './icons/icon-144.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './merge.html',
  './merge.js',
  './split.html',
  './split.js',
  './compress.html',
  './compress.js',
  './pdf2word.html',
  './pdf2word.js',
  './word2pdf.html',
  './word2pdf.js',
  './excel-to-pdf.html',
  './excel-to-pdf.js',
  './pptx-to-pdf.html',
  './pptx-to-pdf.js',
  './pdf-to-jpg.html',
  './pdf-to-jpg.js',
  './extract-images.html',
  './extract-images.js',
  './compare-pdf.html',
  './compare-pdf.js',
  './img2pdf.html',
  './img2pdf.js',
  './crop-pdf.html',
  './crop-pdf.js',
  './rotate-pdf.html',
  './rotate-pdf.js',
  './organize-pdf.html',
  './organize-pdf.js',
  './page-numbers.html',
  './page-numbers.js',
  './unlock-pdf.html',
  './unlock-pdf.js',
  './protect.html',
  './protect.js',
  './flatten-pdf.html',
  './flatten-pdf.js',
  './sign.html',
  './sign.js',
  './watermark.html',
  './watermark.js',
  './ocr.html',
  './ocr.js',
  './image-bg-remover.html',
  './image-bg-remover.js',
  './image-compressor.html',
  './image-compressor.js',
  './image-converter.html',
  './image-converter.js',
  './image-cropper.html',
  './image-cropper.js',
  './annotator.html',
  './privacy.html',
  './terms.html',
  './contact.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      // Safe addition so individual non-fatal errors don't reject installation
      for (const asset of PRECACHE_ASSETS) {
        try {
          await cache.add(asset);
        } catch (err) {
          console.warn('PWA Pre-cache skipped for:', asset, err);
        }
      }
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);

  // Skip cross-origin analytics, advertisements, and tracking requests
  if (url.origin !== self.location.origin) {
    if (url.hostname.includes('fonts.googleapis.com') ||
        url.hostname.includes('fonts.gstatic.com') ||
        url.hostname.includes('unpkg.com') ||
        url.hostname.includes('cdnjs.cloudflare.com')) {
      event.respondWith(
        caches.match(event.request).then((cached) => {
          if (cached) return cached;
          return fetch(event.request).then((response) => {
            if (response && response.status === 200) {
              const clone = response.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
            }
            return response;
          }).catch(() => cached);
        })
      );
    }
    return;
  }

  // Stale-While-Revalidate with offline fallback for same-origin resources
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch((err) => {
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html') || caches.match('/');
        }
        throw err;
      });

      return cachedResponse || fetchPromise;
    })
  );
});