// react-pwa-installer-prompt.d.ts
declare module 'react-pwa-installer-prompt' {
    import { ComponentType, ReactNode } from 'react';
  
    interface PWAInstallerPromptProps {
      render: (props: { onClick: () => void }) => ReactNode;
      callback: (data: any) => void;
    }
  
    const PWAInstallerPrompt: ComponentType<PWAInstallerPromptProps>;
    export default PWAInstallerPrompt;
  }
  