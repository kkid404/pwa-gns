import "./style/main.scss";
import React, { useEffect, useState } from "react";
// import InstallPage from "./components/InstallPage";
// import PWAPage from "./components/PWAPage";
import IosPage from "./components/IosPage";
import UAParser from "ua-parser-js";

const App: React.FC = () => {
  const [isPWA, setIsPWA] = useState<boolean | null>(null);
  const parser = new UAParser(window.navigator.userAgent);
  const parserResults = parser.getResult();

  useEffect(() => {
    // Определение, является ли приложение PWA
    const checkPWA = () => {
      const isPWA = window.matchMedia("(display-mode: standalone)").matches;
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
  parserResults.os.name == "iOS";
  return (
    <>
      {/* {isPWA ? <PWAPage /> : <InstallPage />} */}
      <IosPage></IosPage>
    </>
  );
};

export default App;
