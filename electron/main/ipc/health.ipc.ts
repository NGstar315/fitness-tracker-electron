import { ipcMain } from 'electron';
import type { AppHealth } from '@shared/api';
import { CURRENT_SCHEMA_VERSION, type DatabaseContext } from '../db/client';

const HEALTH_CHANNEL = 'app:health';

export function registerHealthIpc(database: DatabaseContext, appVersion: string, isTrustedSender: (url: string) => boolean): void {
  ipcMain.handle(HEALTH_CHANNEL, (event): AppHealth => {
    if (!isTrustedSender(event.senderFrame.url)) throw new Error('Untrusted IPC sender');
    return { appVersion, databasePath: database.path, schemaVersion: CURRENT_SCHEMA_VERSION };
  });
}
