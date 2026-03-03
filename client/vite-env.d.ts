interface ImportMetaEnv {
  readonly VITE_AUTH_DOMAIN: string;
  readonly VITE_AUTH_CLIENT_ID: string;
  // Add other VITE_ variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
