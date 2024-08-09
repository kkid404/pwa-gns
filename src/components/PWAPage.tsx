import { useEffect, useState } from "react";
// import { setupOneSignal } from "../onesignalSetup";

function PWAPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    //  наша без редиректа
    //@ts-ignore
    if (window.initPushExpressSdk) {
      //@ts-ignore
      window.initPushExpressSdk();
    }


    // версия с нашим редиректом
    // Сначала проверяем статус подписки при загрузке страницы
    // checkSubscriptionStatus();

    // if ('Notification' in window && 'serviceWorker' in navigator) {
    //   //@ts-ignore
    //   window.initPushExpressSdk();
    //   let previousPermission = Notification.permission;

    //   const checkPermissionChange = () => {
    //     const currentPermission = Notification.permission;
    //     if (currentPermission !== previousPermission) {
    //       previousPermission = currentPermission;
    //       delayRedirect();
    //     }
    //   };

    //   // Сразу проверить разрешение после первой инициализации
    //   checkPermissionChange();

    //   setInterval(checkPermissionChange, 4000);
    // } else {
    //   redirectToOffer();
    // }

    
  }, []);

  // One Signal Push
  // useEffect(() => {
  //   // const setup = async () => {
  //   //   // await setupOneSignal();
  //   //   // // Если setupOneSignal завершилась без редиректа, выполним его здесь
  //   //   // redirectToOffer();
  //   // };

  //   // setup();

  //   // Таймаут на случай, если что-то пойдет не так
  //   const timeoutId = setTimeout(() => {
  //     redirectToOffer();
  //   }, 10000); // 10 секунд

  //   return () => clearTimeout(timeoutId);
  // }, []);


  //@ts-ignore
  function delayRedirect() {
    setTimeout(redirectToOffer, 3000); // Задержка 4 секунды перед редиректом
  }

  
  //@ts-ignore
  const redirectToOffer = () => {
    localStorage.setItem("push", "true");
    setIsLoading(false);
    const offer = localStorage.getItem("offer");
    const redirectUrl = offer || "/";
    window.location.replace(redirectUrl);
  };

  //@ts-ignore
  const checkSubscriptionStatus = () => {
    const pushStatus = localStorage.getItem("push");
    if (pushStatus === "true") {
      redirectToOffer();
    }
  }

  if (!isLoading) {
    return null; // Не отображаем ничего во время редиректа
  }

  return (
    <div className="loader-wrapper">
      <span className="loader"></span>
    </div>
  );
}

export default PWAPage;
