declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
  }
}

export {} // ensures the file is treated as a module, required for .d.ts
