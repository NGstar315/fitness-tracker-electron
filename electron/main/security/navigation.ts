import { shell, type WebContents } from 'electron';

export function hardenWebContents(contents: WebContents, isTrustedUrl: (url: string) => boolean): void {
  contents.on('will-navigate', (event, url) => { if (!isTrustedUrl(url)) event.preventDefault(); });
  contents.setWindowOpenHandler(({ url }) => {
    if (isSafeExternalUrl(url)) void shell.openExternal(url);
    return { action: 'deny' };
  });
}

function isSafeExternalUrl(value: string): boolean {
  try { const url = new URL(value); return url.protocol === 'https:'; } catch { return false; }
}
