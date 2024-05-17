/// <reference types="vite/client" />


interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string
    // более ENV переменные...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }