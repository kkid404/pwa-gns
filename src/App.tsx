import "./style/main.scss";
import React, { useEffect, useState } from 'react';
import InstallPage from './components/InstallPage';
import PWAPage from './components/PWAPage';

const App: React.FC = () => {
  const [isPWA, setIsPWA] = useState(false);

  useEffect(() => {
    // Определение, является ли приложение PWA
    const isPWA = window.matchMedia('(display-mode: standalone)').matches;
    setIsPWA(isPWA);
  }, []);

  return (
    <>
      {isPWA ? (
        <PWAPage />
      ) : (
        <InstallPage />
      )}
    </>
  );
};

export default App;