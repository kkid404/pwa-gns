// types.d.ts
interface ServiceWorkerGlobalScope {
    addEventListener(event: 'install' | 'activate' | 'message', callback: any): void;
    skipWaiting(): Promise<void>;
    clients: Clients;
  }
  
  interface Clients {
    claim(): Promise<void>;
  }