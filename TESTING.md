# Testing

## Current checks

```bash
npm run typecheck
npm test
npm run build
```

The initial unit test protects the kg↔斤 conversion rule. Later phases will add unit tests for nutrition snapshots, daily aggregation, moving averages, volume, progression, report serialization, and timezone boundaries.

## Planned integration coverage

- migration from each historical schema version;
- atomic workout and meal writes;
- generated report snapshots;
- backup/restore excluding secrets;
- mocked OpenAI-compatible and Ollama providers.

## Planned end-to-end coverage

An Electron-compatible E2E suite will create food and meals, verify deterministic nutrition totals, log and complete a workout, add body weight, generate/export a weekly report, restart the application, and verify persistence.

## Native module verification

`better-sqlite3` is native. Before release, run `npm run build` and `npm run package:win` on Windows 11 x64, launch the packaged app on a clean VM, and verify a database can be opened and migrated. This is required for every Electron runtime upgrade.
