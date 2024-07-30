import "./style/main.scss";
import React, { useEffect, useState } from 'react';
import InstallPage from './components/InstallPage';
import PWAPage from './components/PWAPage';

const App: React.FC = () => {
  const [isPWA, setIsPWA] = useState<boolean | null>(null);

  useEffect(() => {
    // Определение, является ли приложение PWA
    const checkPWA = () => {
      const isPWA = window.matchMedia('(display-mode: standalone)').matches;
      setIsPWA(isPWA);
    };

    // Добавляем небольшую задержку для демонстрации загрузочного экрана
    setTimeout(checkPWA, 100);
  }, []);

  if (isPWA === null) {
    return (
      <div className="loader-wrapper">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <>
      {isPWA ? <PWAPage /> : <InstallPage />}
    </> 
};

export default App;