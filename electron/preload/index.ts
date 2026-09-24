import { contextBridge, ipcRenderer } from 'electron';
import type { AppApi } from '@shared/api';

const api: AppApi = { health: { get: () => ipcRenderer.invoke('app:health') } };
contextBridge.exposeInMainWorld('fitnessTracker', api);
