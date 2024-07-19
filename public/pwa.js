const appId = localStorage.getItem("appId");

async function redirect() {
  localStorage.setItem("push", "true");
  const offer = localStorage.getItem("offer");
  let redurect_url = offer;
  window.location.replace(redurect_url);
}

if (localStorage.getItem("push")) {
  redirect();
}

window.OneSignalDeferred = window.OneSignalDeferred || [];

let canRedirect = false;

function permissionChangeListener(permission) {
  if (permission) {
    OneSignalDeferred.push(async function () {
      await OneSignal.User.PushSubscription.optIn();
      const userId = localStorage.getItem("subid");
      try {
        await OneSignal.login(userId);
        console.log("External ID has been set to:", userId);
      } catch (error) {
        console.error("Error setting External ID:", error);
      }
      canRedirect = true;
    });
  } else {
    // Если разрешение не получено, вызываем redirect()
    redirect();
  }
}

setInterval(() => {
  if (canRedirect) {
    setTimeout(() => {
      redirect();
    }, 3000);
  }
}, 1000);

OneSignalDeferred.push(function () {
  if (OneSignal.installServiceWorker) {
    OneSignal.installServiceWorker();
  } else {
    if (navigator.serviceWorker) {
      navigator.serviceWorker.register(
        `/OneSignalSDKWorker.js?appId=${appId}`
      );
    }
  }
});

// инициализация onesignal
OneSignalDeferred.push(function () {
  OneSignal.init({
    appId: appId,
  });
});

// проверка разрешены ли пуши и поддерживаются ли они
OneSignalDeferred.push(async function () {
  const isSupported = OneSignal.Notifications.isPushSupported();
  if (!isSupported) {
    // Если push-уведомления не поддерживаются, вызываем redirect()
    redirect();
    return;
  }
  
  OneSignal.Notifications.requestPermission();
  let permission = await OneSignal.Notifications.permission;
  if (permission !== 'granted') {
    // Если разрешение не получено, вызываем redirect()
    redirect();
  }
});

OneSignalDeferred.push(function () {
  OneSignal.Notifications.addEventListener(
    "permissionChange",
    permissionChangeListener
  );
});

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

setInterval(checkPermissionChange, 1000);