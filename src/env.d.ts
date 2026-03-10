/// <reference types="vite/client" />

declare module "*.JPG" {
  const src: string;
  export default src;
}
/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />
/// <reference types="react" />

interface ImportMetaEnv {
	readonly VITE_GOOGLE_API_KEY?: string;
	readonly VITE_AI_PROXY_URL?: string;
	readonly VITE_GOOGLE_MODEL?: string;
	readonly VITE_GOOGLE_API_VERSION?: string;
	readonly VITE_DISABLE_APP_CHECK?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

// Custom element for Magical Meghalaya Tourism button — see src/react-augment.d.ts
