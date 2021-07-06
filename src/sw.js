// const CACHE_STATIC = 'static-1';
// const CACHE_DYNAMIC ='dynamic cache';

// window.self.addEventListener('install', function(evt){
//     console.log('[Service Worker] Installing Service Worker', evt);
//     evt.waitUntil(
//         caches.open(CACHE_STATIC)
//         .then(function(cache){
//             console.log('[Service Worker] Precaching App');
//             cache.addAll([
//                 '/'
//             ]);
//         })
//     );
// })

// window.self.addEventListener('activate', function(evt){
//     console.log('[Service Worker] Activating Service Worker', evt);
//     evt.waitUntil(
//         caches.keys()
//         .then(function(keyList) {
//             return Promise.all(keyList.map(function(key) {
//                 if((key !== CACHE_STATIC) && (key !== CACHE_DYNAMIC)) {
//                     console.log('[Service Worker] Deleting old cache ', key);
//                     return caches.delete(key);
//                 }
//             }));
//         })
//     );
//     return window.self.clients.claim();
// });

// window.self.addEventListener('fetch', function (event) {
//   // var url = 'https://httpbin.org/get';

//   if (event.request.url.indexOf(url) > -1) {
//     event.respondWith(
//       caches.open(CACHE_DYNAMIC)
//         .then(function (cache) {
//           return fetch(event.request)
//             .then(function (res) {
//               cache.put(event.request, res.clone());
//               return res;
//             });
//         })
//     );
//   } else {
//     event.respondWith(
//       caches.match(event.request)
//         .then(function (response) {
//           if (response) {
//             return response;
//           } else {
//             return fetch(event.request)
//               .then(function (res) {
//                 return caches.open(CACHE_DYNAMIC)
//                   .then(function (cache) {
//                     cache.put(event.request.url, res.clone());
//                     return res;
//                   })
//               })
//               .catch(function (err) {
//                 return caches.open(CACHE_STATIC)
//                   .then(function (cache) {
//                     return cache.match('/offline.html');
//                   });
//               });
//           }
//         })
//     );
//   }
// });
