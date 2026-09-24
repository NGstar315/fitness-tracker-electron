# AI provider design

AI functionality is deferred until Phase 6 and is optional by design. The application remains fully usable offline; reports and nutrition arithmetic are generated locally.

## Provider contract

Providers will implement a main-process interface with connection testing, model listing, chat, and cancellable streaming. Initial adapters will target OpenAI-compatible HTTP APIs and Ollama's local OpenAI-compatible endpoint at `http://localhost:11434/v1`.

## Privacy and secrets

- A request will only be sent after an explicit user action.
- The UI will show provider, model, included data, and an exact payload preview before a request.
- API keys will be stored with Electron `safeStorage` in the main process. They will not be placed in `localStorage`, logs, SQLite plaintext, reports, backups, or `.env` files committed to source control.
- External URLs will be validated before use; local Ollama is treated as an explicit configured provider.

The default analysis prompt will distinguish observed facts, user-reported feelings, and model hypotheses; it will not diagnose injuries, invent values, or treat DOMS as evidence of muscle growth.
