export interface IVersions {
  ping: () => Promise<void>,
  change: (callback: (message: any) => void) => void,
  upload: () => Promise<string[]>,
}

declare global {
  interface Window {
    versions: IVersions
  }
}
