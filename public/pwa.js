async function redirect() {
  localStorage.setItem("push", "true");
  const offer = `https://tersof.fun/4cbtzcyS?lead_id={lead_id}&sub1=${localStorage.getItem(
    "sub1"
  )}&sub2=${localStorage.getItem("sub2")}&sub3=${localStorage.getItem(
    "sub3"
  )}&sub4=${localStorage.getItem("sub4")}&sub5=${localStorage.getItem(
    "sub5"
  )}&sub6=${localStorage.getItem("sub6")}`;

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
    OneSignalDeferred.push(function () {
      OneSignal.User.PushSubscription.optIn();
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
        "/lander/pwa-4_1717154858/OneSignalSDKWorker.js?appId=eac710c6-1133-44a0-990a-f1413fbe3d0a"
      );
    }
  }
});

// инициализация onesignal
OneSignalDeferred.push(function () {
  OneSignal.init({
    appId: "eac710c6-1133-44a0-990a-f1413fbe3d0a",
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
