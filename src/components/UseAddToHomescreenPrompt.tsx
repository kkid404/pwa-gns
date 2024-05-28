import { useEffect, useState } from "react";

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }

  interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{
      outcome: "accepted" | "dismissed";
      platform: string;
    }>;
    prompt(): Promise<void>;
  }
}

export function useAddToHomescreenPrompt(): [
  BeforeInstallPromptEvent | null,
  () => void
] {
  const [prompt, setState] = useState<BeforeInstallPromptEvent | null>(null);

  const promptToInstall = () => {
    if (prompt) {
      return prompt.prompt();
    }
    return Promise.reject(
      new Error(
        'Tried installing before browser sent "beforeinstallprompt" event'
      )
    );
  };

  useEffect(() => {
    const ready = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setState(e);
    };

    window.addEventListener("beforeinstallprompt", ready);

    return () => {
      window.removeEventListener("beforeinstallprompt", ready);
    };
  }, []);

  return [prompt, promptToInstall];
}
