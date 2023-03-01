export interface IVersions {
  ping: () => Promise<void>,
  change: (callback: (message: any) => void) => void
}

declare global {
  interface Window {
    versions: IVersions
  }
}
