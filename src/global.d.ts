export {}

declare global {
  interface Window {
    cocoSsd: {
      load: () => Promise<any>
    }
  }
}