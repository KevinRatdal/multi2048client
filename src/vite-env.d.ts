/// <reference types="vite/client" />


interface ImportMetaEnv {
    readonly VITE_WS_ADD: string
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}