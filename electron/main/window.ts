import { BrowserWindow } from 'electron';
import { join } from 'node:path';
import { hardenWebContents } from './security/navigation';

export const rendererUrl = process.env.ELECTRON_RENDERER_URL;
export const isTrustedRendererUrl = (url: string): boolean => rendererUrl ? url.startsWith(rendererUrl) : url.startsWith('file:');

export function createMainWindow(): BrowserWindow {
  const window = new BrowserWindow({
    width: 1280, height: 820, minWidth: 1024, minHeight: 680, show: false,
    webPreferences: { preload: join(__dirname, '../preload/index.js'), contextIsolation: true, nodeIntegration: false, sandbox: true }
  });
  hardenWebContents(window.webContents, isTrustedRendererUrl);
  window.once('ready-to-show', () => window.show());
  if (rendererUrl) void window.loadURL(rendererUrl); else void window.loadFile(join(__dirname, '../renderer/index.html'));
  return window;
}
