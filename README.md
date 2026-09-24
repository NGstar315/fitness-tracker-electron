# Fitness Tracker / Home Gym Companion

A local-first Windows desktop companion for training, nutrition, recovery, body measurements, and AI-ready Markdown reports. It is not a medical device or injury diagnostic tool.

## Current implementation: Phase 1

This repository now provides the secure Electron skeleton required to begin the product:

- Electron + React + strict TypeScript + electron-vite.
- A sandboxed renderer (`contextIsolation: true`, `nodeIntegration: false`) with a deliberately tiny typed preload bridge.
- SQLite stored under Electron `userData/data/fitness.sqlite`, configured with WAL, foreign keys, and a busy timeout.
- An ordered SQL migration and idempotent initial data seed (171 cm, 61.5 kg, 115 g protein target, 8 h sleep target, adjustable dumbbell pair).
- A basic local-first dashboard proving the renderer can call a validated main-process IPC health endpoint.

The core schema now includes training, nutrition, body/recovery, reports, and AI-provider metadata. Pure deterministic nutrition, training-volume, moving-average, and report serialization modules are included; the next implementation increment connects these through typed repositories and dedicated workflow UI. No nutrition values are seeded because actual brands and labels must be user-confirmed.

## Prerequisites

- Node.js 22 LTS or later (Node 24 is supported for development when Electron-compatible native dependencies are available).
- npm 10+ or pnpm 9+.
- Windows 11 x64 is the supported packaging target. Development works on other desktop platforms supported by Electron.

## Development

```bash
npm install
npm run dev
```

`npm run typecheck` checks strict TypeScript types and `npm test` runs unit tests. The app stores development data in Electron's platform-specific user-data directory, never the install directory.

## Build and Windows packages

```bash
npm run build
npm run package:win
```

The packaging command builds NSIS x64 and portable x64 outputs through `electron-builder`. For production Windows builds, run on Windows and ensure native dependency rebuilding is validated against the selected Electron version.

## Privacy and AI

AI is intentionally not part of Phase 1. Future API keys will be encrypted by Electron `safeStorage` in the main process and will never be stored in renderer storage or plaintext database exports. Network calls will occur only after an explicit user action.

## Dependencies and licenses

- Electron (MIT): desktop runtime and secure main/preload boundary.
- React (MIT): renderer UI.
- electron-vite (MIT): Electron/Vite development and build tooling.
- better-sqlite3 (MIT): local synchronous SQLite driver; database work remains in the main process.
- Zod (MIT): runtime validation at external boundaries as IPC surface grows.
- electron-builder (MIT): Windows NSIS and portable packaging.

## Documentation

See [ARCHITECTURE.md](ARCHITECTURE.md), [DATABASE.md](DATABASE.md), [AI_PROVIDER.md](AI_PROVIDER.md), and [TESTING.md](TESTING.md).
