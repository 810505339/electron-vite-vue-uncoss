export interface IApi {
  downloadFile: (url: string, done: () => void) => Promise<void>,
  setwallpaper: (url: string,done: () => void) => Promise<void>
}

declare global {
  interface Window {
    api: IApi
  }
}


