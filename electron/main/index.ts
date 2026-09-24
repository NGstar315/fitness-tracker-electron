import { app } from 'electron';
import { openDatabase } from './db/client';
import { registerHealthIpc } from './ipc/health.ipc';
import { seedInitialData } from './services/bootstrap.service';
import { createMainWindow, isTrustedRendererUrl } from './window';

app.whenReady().then(() => {
  const database = openDatabase(app.getPath('userData'));
  seedInitialData(database, Intl.DateTimeFormat().resolvedOptions().timeZone);
  registerHealthIpc(database, app.getVersion(), isTrustedRendererUrl);
  createMainWindow();
  app.on('activate', () => { if (app.getAllWindows().length === 0) createMainWindow(); });
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
