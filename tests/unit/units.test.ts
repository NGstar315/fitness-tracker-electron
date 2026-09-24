import { describe, expect, it } from 'vitest';
import { jinToKg, kgToJin } from '../../src/lib/units';
describe('weight units', () => { it('converts kg and jin without rounding database values', () => { expect(kgToJin(61.5)).toBe(123); expect(jinToKg(123)).toBe(61.5); }); });
