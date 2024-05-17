self.addEventListener('install', (event) => {
    event.waitUntil(
      self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
          // client.navigate('/');
        });
      })
    );
  });

self.addEventListener('activate', event => {
    console.log('[SW]: activate')
})