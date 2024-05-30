function redirect() {
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



window.OneSignalDeferred = window.OneSignalDeferred || [];

OneSignalDeferred.push(async function(OneSignal) {
  await OneSignal.init({
    appId: "9f9b4890-d6c0-470d-a8cf-644fc62ed276",
  });

  let token = OneSignal.User.PushSubscription.token;
  let isSubcibing = OneSignal.User.PushSubscription.optedIn;
  console.log(isSubcibing)

  if (isSubcibing) {
    redirect()
  } else {
    OneSignal.Slidedown.promptPush();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const observer = new MutationObserver((mutationsList, observer) => {
    for (let mutation of mutationsList) {
      if (mutation.type === 'childList') {
        const cancelBtn = document.querySelector("#onesignal-slidedown-cancel-button");
        const allowBtn = document.querySelector("#onesignal-slidedown-allow-button");

        if (cancelBtn && allowBtn) {
          cancelBtn.addEventListener("click", () => {
            redirect();
          });
          allowBtn.addEventListener("click", () => {
            redirect();
          });
          // Останавливаем наблюдение после нахождения кнопок
          observer.disconnect();
        }
      }
    }
  });

  // Начинаем наблюдение за документом
  observer.observe(document.body, { childList: true, subtree: true });
});
