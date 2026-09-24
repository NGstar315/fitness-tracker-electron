import type { DatabaseContext } from '../db/client';
import { randomUUID } from 'node:crypto';

export function seedInitialData({ database }: DatabaseContext, timezone: string): void {
  const existing = database.prepare('SELECT id FROM user_profile LIMIT 1').get();
  if (existing) return;
  const now = new Date().toISOString();
  database.transaction(() => {
    database.prepare(`INSERT INTO user_profile (id, height_cm, current_weight_kg, primary_goal, protein_target_g, sleep_target_hours, timezone, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`)
      .run(randomUUID(), 171, 61.5, 'lean_muscle_gain', 115, 8, timezone, now, now);
    database.prepare(`INSERT INTO equipment (id, name, type, min_weight_kg, max_weight_kg, step_kg, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`)
      .run(randomUUID(), 'Dumbbell pair', 'adjustable_dumbbell', 2.5, 6, 0.5, now, now);
  })();
}
