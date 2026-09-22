// PDF Netizen - PWA Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then((reg) => {
        console.log('PWA ServiceWorker active:', reg.scope);
      })
      .catch((err) => {
        console.error('ServiceWorker failed:', err);
      });
  });
}
