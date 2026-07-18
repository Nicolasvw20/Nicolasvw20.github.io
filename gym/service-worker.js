const CACHE = 'form-performance-v3';
const ASSETS = ['./','index.html','app.js','app-part-1.txt','app-part-2.txt','app-part-3.txt','app-part-4.txt','app-part-5.txt','app-part-6.txt','manifest.webmanifest','icon.svg'];
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())));
self.addEventListener('activate', event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim())));
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(fetch(event.request).then(response => {
    const copy = response.clone(); caches.open(CACHE).then(cache => cache.put(event.request, copy)); return response;
  }).catch(() => caches.match(event.request).then(cached => cached || caches.match('index.html'))));
});
