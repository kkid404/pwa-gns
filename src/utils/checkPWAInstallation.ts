export function checkPWAInstallation(url: string) {
    const isPWAInstalled = localStorage.getItem('isPWAInstalled') === 'true';

    if ((window.navigator as any).standalone || isPWAInstalled) {
      window.location.replace(url);
    }
  }