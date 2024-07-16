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



// проверка разрешены ли пуши
OneSignalDeferred.push(function () {
  const isSupported = OneSignal.Notifications.isPushSupported();
});

// проверка поддерживает ли браузер пуши
OneSignalDeferred.push(async function () {
  OneSignal.Notifications.requestPermission();
  let permission = await OneSignal.Notifications.permission;
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
    currentPermission != "granted"
  ) {
    previousPermission = currentPermission;

    redirect();
  }
};

setInterval(checkPermissionChange, 1000); // Проверяем каждые 1000 мс (1 секунду)