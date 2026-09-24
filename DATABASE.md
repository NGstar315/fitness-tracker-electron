# Database

## Location and safety

The application opens `data/fitness.sqlite` beneath Electron's `app.getPath('userData')`. It never writes the database into the application install directory or ASAR archive. On open it enables SQLite WAL mode, foreign keys, and a five-second busy timeout.

WAL databases should remain on a local disk, not on a network share.

## Migrations

`schema_migrations` records each applied, ordered migration. `001_initial.sql` creates bootstrap tables and `002_core_domain.sql` creates the full MVP domain tables and query indexes. The database client executes unapplied migrations in a transaction. Production changes must add a new migration; they must not delete a user's database.

## Seed data

On an empty database, the bootstrap service writes one editable profile and one editable equipment record in a transaction:

- 171 cm; 61.5 kg reference; `lean_muscle_gain`; 115 g protein/day; 8 h sleep/day.
- Adjustable dumbbell pair: 2.5–6 kg each, 0.5 kg step.

Calorie targets and food nutrition values are intentionally not fabricated in the seed data. The core migration includes snapshot values for each historical `meal_item`, so future food-library edits cannot alter saved intake.
