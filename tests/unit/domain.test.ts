import { describe, expect, it } from 'vitest';
import { movingAverage } from '../../src/lib/body';
import { aggregateNutrition, calculateNutritionSnapshot } from '../../src/lib/nutrition';
import { isEffectiveSet, setVolumeKg } from '../../src/lib/training';

describe('deterministic nutrition', () => {
  it('snapshots nutrition for a specific amount', () => expect(calculateNutritionSnapshot({ caloriesKcalPer100g: 50, proteinGPer100g: 3.2, carbsGPer100g: 5, fatGPer100g: 1.5 }, 300)).toMatchObject({ caloriesKcal: 150, proteinG: 9.6, carbsG: 15, fatG: 4.5 }));
  it('aggregates snapshots rather than food definitions', () => expect(aggregateNutrition([{ caloriesKcal: 150, proteinG: 9.6, carbsG: 15, fatG: 4.5 }, { caloriesKcal: 100, proteinG: 8, carbsG: 0, fatG: 7 }])).toMatchObject({ caloriesKcal: 250, proteinG: 17.6, carbsG: 15, fatG: 11.5 }));
});
describe('training volume', () => { it('does not invent bodyweight volume', () => { expect(setVolumeKg({ completed: true, reps: 12, loadMode: 'bodyweight' })).toBeNull(); expect(setVolumeKg({ completed: true, reps: 12, weightKg: 6, loadMode: 'per_dumbbell' })).toBe(144); expect(isEffectiveSet({ completed: false, reps: 12, weightKg: 6, loadMode: 'combined' })).toBe(false); }); });
describe('weight trend', () => { it('only produces a full moving average window', () => { const trend = movingAverage([{ date: '2026-01-01', weightKg: 60 }, { date: '2026-01-02', weightKg: 61 }, { date: '2026-01-03', weightKg: 62 }], 2); expect(trend.map((item) => item.averageKg)).toEqual([null, 60.5, 61.5]); }); });
import { serializeMarkdownReport } from '../../src/lib/report';
describe('report serialization', () => { it('separates facts from user notes', () => { const markdown = serializeMarkdownReport({ reportType: 'weekly', startDate: '2026-09-21', endDate: '2026-09-27', timezone: 'UTC', profile: { heightCm: 171, currentWeightKg: 61.5, goal: 'lean_muscle_gain', proteinTargetG: 115 }, nutrition: { caloriesKcal: 1980, proteinG: 87, carbsG: 200, fatG: 60 }, training: { planned: 4, completed: 3, partial: 1, skipped: 0 }, observations: ['Observed set progression.'], userNotes: ['User felt tired.'] }); expect(markdown).toContain('## Observed Facts\n- Observed set progression.'); expect(markdown).toContain('## User-Reported Feelings\n- User felt tired.'); }); });
