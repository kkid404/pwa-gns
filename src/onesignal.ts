import OneSignal from 'react-onesignal';

export function initOneSignal() {

  OneSignal.init({
    appId: "9f9b4890-d6c0-470d-a8cf-644fc62ed276",
    safari_web_id: "web.onesignal.auto.57daeefd-2777-4d55-aef6-93b3ff4b973a",
    notifyButton: {
      enable: false,
    },
    serviceWorkerParam: {
      scope: '/'
    },
    serviceWorkerPath: './OneSignalSDKWorker.js',
    serviceWorkerUpdaterPath: './OneSignalSDKUpdaterWorker.js',
  });
}
