import { useEffect, useState } from "react";
// import { setupOneSignal } from "../onesignalSetup";

function PWAPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    //@ts-ignore
    if (window.initPushExpressSdk) {
      //@ts-ignore
      window.initPushExpressSdk();
    }
  }, []);

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
  const redirectToOffer = () => {
    setIsLoading(false);
    const offer = localStorage.getItem("offer");
    const redirectUrl = offer || "/";
    window.location.replace(redirectUrl);
  };

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
