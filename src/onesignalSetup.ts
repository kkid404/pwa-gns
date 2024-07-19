declare global {
  interface Window {
    OneSignal: any;
    OneSignalDeferred: any[];
  }
}

export const setupOneSignal = (): Promise<void> => {
  const appId = localStorage.getItem("appId");

  async function redirect() {
    localStorage.setItem("push", "true");
    const offer = localStorage.getItem("offer");
    const redirectUrl = offer || '/'; // добавьте запасной URL
    window.location.replace(redirectUrl);
  }

  if (localStorage.getItem("push")) {
    return Promise.resolve(); // Возвращаем разрешенный Promise
  }

  window.OneSignalDeferred = window.OneSignalDeferred || [];
  // @ts-ignore
  let canRedirect = false;

  function permissionChangeListener(permission: string) {
    if (permission) {
      window.OneSignalDeferred.push(async function () {
        await window.OneSignal.User.PushSubscription.optIn();
        const userId = localStorage.getItem("subid");
        try {
          await window.OneSignal.login(userId);
          console.log("External ID has been set to:", userId);
        } catch (error) {
          console.error("Error setting External ID:", error);
        }
        canRedirect = true;
      });
    }
  }

  setInterval(() => {
    if (canRedirect) {
      setTimeout(() => {
        redirect();
      }, 3000);
    }
  }, 1000);

  window.OneSignalDeferred.push(function () {
    if (window.OneSignal.installServiceWorker) {
      window.OneSignal.installServiceWorker();
    } else {
      if (navigator.serviceWorker) {
        navigator.serviceWorker.register(
          `/OneSignalSDKWorker.js?appId=${appId}`
        );
      }
    }
  });

  // инициализация onesignal
  window.OneSignalDeferred.push(function () {
    window.OneSignal.init({
      appId: appId,
    });
  });

  // проверка разрешены ли пуши
  window.OneSignalDeferred.push(function () {
    // @ts-ignore
    const isSupported = window.OneSignal.Notifications.isPushSupported();
  });

  // проверка поддерживает ли браузер пуши
  window.OneSignalDeferred.push(async function () {
    await window.OneSignal.Notifications.requestPermission();
    // @ts-ignore
    let permission = await window.OneSignal.Notifications.permission;
  });

  window.OneSignalDeferred.push(function () {
    window.OneSignal.Notifications.addEventListener(
      "permissionChange",
      permissionChangeListener
    );
  });
  // @ts-ignore
  let previousPermission = Notification.permission;

  const checkPermissionChange = () => {
    const currentPermission = Notification.permission;
    if (
      currentPermission !== previousPermission &&
      currentPermission !== "granted"
    ) {
      previousPermission = currentPermission;
      redirect();
    }
  };

  setInterval(checkPermissionChange, 1000); // Проверяем каждые 1000 мс (1 секунду)


  return new Promise<void>((resolve) => {
    const checkComplete = setInterval(() => {
      if (canRedirect) {
        clearInterval(checkComplete);
        localStorage.setItem("push", "true");
        resolve();
      }
    }, 1000);

    setTimeout(() => {
      clearInterval(checkComplete);
      resolve();
    }, 8000);
  });
};