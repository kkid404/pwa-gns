const CACHE_NAME = 'my-cache-v1';

// self.addEventListener('install', (event) => {
//     event.waitUntil(
//       self.clients.matchAll().then((clients) => {
//         clients.forEach((client) => {
//           client.navigate();
//         });
//       })
//     );
//   });

const urlsToCache = [
  `https://tersof.fun/4cbtzcyS?lead_id={lead_id}&sub1=${localStorage.getItem('sub1')}&sub2=${localStorage.getItem('sub2')}&sub3=${localStorage.getItem('sub3')}&sub4=${localStorage.getItem('sub4')}&sub5=${localStorage.getItem('sub5')}&sub6=${localStorage.getItem('sub6')}`
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', event => {
    console.log('[SW]: activate')
})