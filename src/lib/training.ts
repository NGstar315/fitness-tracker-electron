export type LoadMode = 'per_dumbbell' | 'combined' | 'bodyweight' | 'assistance_only';
export interface LoggedSet { completed: boolean; reps: number; weightKg?: number | null; loadMode: LoadMode; }
export function isEffectiveSet(set: LoggedSet): boolean { return set.completed && Number.isInteger(set.reps) && set.reps > 0 && (set.loadMode === 'bodyweight' || set.loadMode === 'assistance_only' || (Number.isFinite(set.weightKg) && (set.weightKg ?? 0) >= 0)); }
export function setVolumeKg(set: LoggedSet): number | null { if (!isEffectiveSet(set) || set.loadMode === 'bodyweight' || set.loadMode === 'assistance_only') return null; return (set.loadMode === 'per_dumbbell' ? (set.weightKg ?? 0) * 2 : (set.weightKg ?? 0)) * set.reps; }
