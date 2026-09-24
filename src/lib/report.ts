import type { NutrientSnapshot } from './nutrition';

export interface ReportSnapshot { reportType: 'daily' | 'weekly' | 'monthly' | 'custom' | 'longitudinal'; startDate: string; endDate: string; timezone: string; profile: { heightCm: number; currentWeightKg?: number | null; goal: string; proteinTargetG: number; calorieTargetKcal?: number | null }; nutrition: NutrientSnapshot; training: { planned: number; completed: number; partial: number; skipped: number }; observations: readonly string[]; userNotes: readonly string[]; }
const fixed = (value: number): string => Number.isInteger(value) ? String(value) : value.toFixed(2);
export function serializeMarkdownReport(snapshot: ReportSnapshot): string {
  const scheduled = snapshot.training.planned;
  const completedEquivalent = snapshot.training.completed + snapshot.training.partial;
  const rate = scheduled === 0 ? 'N/A' : `${fixed((completedEquivalent / scheduled) * 100)}%`;
  return `# Fitness ${capitalize(snapshot.reportType)} Report\n\n## Report Metadata\n- report_type: ${snapshot.reportType}\n- generated_at: ${new Date().toISOString()}\n- period_start: ${snapshot.startDate}\n- period_end: ${snapshot.endDate}\n- timezone: ${snapshot.timezone}\n\n## User Profile\n- height_cm: ${snapshot.profile.heightCm}\n- current_weight_kg: ${snapshot.profile.currentWeightKg ?? 'not recorded'}\n- goal: ${snapshot.profile.goal}\n\n## Training Summary\n- planned_sessions: ${scheduled}\n- completed_sessions: ${snapshot.training.completed}\n- partial_sessions: ${snapshot.training.partial}\n- skipped_sessions: ${snapshot.training.skipped}\n- completion_rate: ${rate}\n\n## Nutrition Summary\n- calories_kcal: ${fixed(snapshot.nutrition.caloriesKcal)}${snapshot.profile.calorieTargetKcal == null ? '' : ` / ${fixed(snapshot.profile.calorieTargetKcal)} target`}\n- protein_g: ${fixed(snapshot.nutrition.proteinG)} / ${fixed(snapshot.profile.proteinTargetG)} target\n- carbs_g: ${fixed(snapshot.nutrition.carbsG)}\n- fat_g: ${fixed(snapshot.nutrition.fatG)}\n\n## Observed Facts\n${list(snapshot.observations)}\n\n## User-Reported Feelings\n${list(snapshot.userNotes)}\n\n## Raw Data\nThis report is an immutable local snapshot. Nutrition totals are derived from meal-item snapshots, not current food-library definitions.\n`;
}
export function reportSnapshotHash(snapshot: Omit<ReportSnapshot, 'reportType'>): string {
  let hash = 2166136261;
  for (const char of JSON.stringify(snapshot)) { hash ^= char.charCodeAt(0); hash = Math.imul(hash, 16777619); }
  return `fnv1a-${(hash >>> 0).toString(16).padStart(8, '0')}`;
}
function list(entries: readonly string[]): string { return entries.length === 0 ? '- None recorded.' : entries.map((entry) => `- ${entry}`).join('\n'); }
function capitalize(value: string): string { return value.slice(0, 1).toUpperCase() + value.slice(1); }
