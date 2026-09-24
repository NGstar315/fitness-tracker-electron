export interface AppHealth {
  appVersion: string;
  databasePath: string;
  schemaVersion: number;
}

export interface AppApi {
  health: { get(): Promise<AppHealth> };
}

declare global {
  interface Window { fitnessTracker: AppApi; }
}
