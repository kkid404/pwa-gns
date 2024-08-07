import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
    <App />
)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('sw.js')
      .then((registration) => {
        console.log('Service Worker registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('Service Worker registration failed: ', registrationError);
      });
  });
}
