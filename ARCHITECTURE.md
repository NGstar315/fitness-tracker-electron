# Architecture

## Phase 1 boundary

The renderer is presentation-only React. It cannot import Electron, Node, filesystem, or SQLite modules. `electron/preload/index.ts` exposes a narrow, typed `window.fitnessTracker` API instead of exposing `ipcRenderer`.

The Electron main process owns database access and privileged operations. IPC handlers validate the sender frame against the local renderer URL before returning data. Browser windows use `contextIsolation: true`, `nodeIntegration: false`, and `sandbox: true`. Navigation is restricted to the packaged local page or development renderer; popups are denied, and only validated HTTPS URLs can be opened externally.

## Direction of dependencies

```text
React renderer → typed preload API → IPC handler → service → repository/database
```

This keeps business rules outside components and makes deterministic calculation modules independently testable. Future renderer routes will request page-specific aggregates rather than loading the entire history.

## Planned boundaries

- `electron/main/db`: SQLite connection, SQL migrations, repositories, transactions.
- `electron/main/services`: domain orchestration, reports, backups, and AI coordination.
- `electron/main/security`: navigation, secret storage, external URL policy.
- `src/lib`: pure deterministic calculations.
- `src/types`: shared, serializable API contracts only.

AI is an optional main-process provider layer; it will never be a source of truth or mutate training/nutrition facts autonomously.
