export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('./sw.js', {
        scope: '/app/'
      });
      return registration;
    } catch (error) {
      console.error('Ошибка при регистрации Service Worker:', error);
    }
  }
};