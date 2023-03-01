export interface IVersions {
  ping: () => Promise<void>,
}

declare global {
  interface Window {
    versions: IVersions
  }
}
