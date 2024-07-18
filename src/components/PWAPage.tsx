import { useEffect } from 'react';
import { setupOneSignal } from '../onesignalSetup';

function PWAPage() {
  useEffect(() => {
    setupOneSignal();
  }, []);

  return (
    <div className="loader-wrapper">
      <span className="loader"></span>
    </div>
  );
};

export default PWAPage;
