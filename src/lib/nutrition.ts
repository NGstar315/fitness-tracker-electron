export interface FoodNutrition { caloriesKcalPer100g: number; proteinGPer100g: number; carbsGPer100g: number; fatGPer100g: number; fiberGPer100g?: number | null; }
export interface NutrientSnapshot { caloriesKcal: number; proteinG: number; carbsG: number; fatG: number; fiberG?: number; }
export const roundNutrition = (value: number): number => Math.round((value + Number.EPSILON) * 100) / 100;
export function calculateNutritionSnapshot(food: FoodNutrition, amountG: number): NutrientSnapshot {
  if (!Number.isFinite(amountG) || amountG <= 0) throw new RangeError('Food amount must be greater than zero.');
  const scale = amountG / 100;
  const fiber = food.fiberGPer100g == null ? undefined : roundNutrition(food.fiberGPer100g * scale);
  return { caloriesKcal: roundNutrition(food.caloriesKcalPer100g * scale), proteinG: roundNutrition(food.proteinGPer100g * scale), carbsG: roundNutrition(food.carbsGPer100g * scale), fatG: roundNutrition(food.fatGPer100g * scale), ...(fiber === undefined ? {} : { fiberG: fiber }) };
}
export function aggregateNutrition(items: readonly NutrientSnapshot[]): NutrientSnapshot {
  return items.reduce<NutrientSnapshot>((total, item) => ({ caloriesKcal: roundNutrition(total.caloriesKcal + item.caloriesKcal), proteinG: roundNutrition(total.proteinG + item.proteinG), carbsG: roundNutrition(total.carbsG + item.carbsG), fatG: roundNutrition(total.fatG + item.fatG), ...(total.fiberG === undefined && item.fiberG === undefined ? {} : { fiberG: roundNutrition((total.fiberG ?? 0) + (item.fiberG ?? 0)) }) }), { caloriesKcal: 0, proteinG: 0, carbsG: 0, fatG: 0 });
}
