/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_API_SOCKET: string
  readonly VITE_DEFAULTAUTH: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
