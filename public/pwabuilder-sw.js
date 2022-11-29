// // This is the service worker with the combined offline experience (Offline page + Offline copy of pages)
// self.__WB_DISABLE_DEV_LOGS = true
// const CACHE = "pwabuilder-offline-page";

// importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

// // TODO: replace the following with the correct offline fallback page i.e.: const offlineFallbackPage = "offline.html";
// const offlineFallbackPage = "ToDo-replace-this-name.html";
// const ASSETS = [

//   "/",
//   "/index.html",
//   "/src/index.js",
//   "/src/index.css",
//   "/src/App.js",
//   "/src/App.css",
//   "/src/Context.js",
//   "/src/components/Analysis/index.js",
//   "/src/components/Analysis/PieChart.js",
//   "/src/components/Header/index.js",
//   "/src/components/Header/index.css",
//   "/src/components/Input/index.js",
//   "/src/components/Input/index.css",
//   "/src/components/Transactions/index.js",
//   "/src/components/Transactions/index.css",
//   "/src/components/Transactions/Transaction.css",
//   "/src/components/User/index.css",
//   "/src/components/User/index.js",
//   "/src/components/User/createAcount.js",
//   "/src/components/Home.js",
// ];
// self.addEventListener("message", (event) => {
//   if (event.data && event.data.type === "SKIP_WAITING") {
//     self.skipWaiting();
//   }
// });

// self.addEventListener('install', async (event) => {
//   event.waitUntil(
//     caches.open(CACHE)
//       .then((cache) => cache.addAll(ASSETS))
//   );
// });

// if (workbox.navigationPreload.isSupported()) {
//   workbox.navigationPreload.enable();
// }

// workbox.routing.registerRoute(
//   new RegExp('/*'),
//   new workbox.strategies.StaleWhileRevalidate({
//     cacheName: CACHE
//   })
// );

// self.addEventListener('fetch', (event) => {
//   if (event.request.mode === 'navigate') {
//     event.respondWith((async () => {
//       try {
//         const preloadResp = await event.preloadResponse;

//         if (preloadResp) {
//           return preloadResp;
//         }

//         const networkResp = await fetch(event.request);
//         return networkResp;
//       } catch (error) {

//         const cache = await caches.open(CACHE);
//         const cachedResp = await cache.match(offlineFallbackPage);
//         return cachedResp;
//       }
//     })());
//   }
// });
self.addEventListener('fetch', function(event) {
  event.respondWith(
      caches.match(event.request).then(function(response) {
          return response || fetch(event.request);
      })
  );
});
