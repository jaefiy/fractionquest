import { describe, it, expect } from 'vitest';
import {
  gcd,
  lcm,
  getMultiples,
  isCommonMultiple,
  checkEquivalent,
  simplifyFraction,
  addFractions,
  diagnoseFractionAdditionConversion,
  diagnoseFractionAdditionSum,
} from '../fractionUtils';

describe('fractionUtils', () => {
  it('calculates greatest common divisor (gcd) correctly', () => {
    expect(gcd(12, 18)).toBe(6);
    expect(gcd(5, 15)).toBe(5);
    expect(gcd(7, 13)).toBe(1);
  });

  it('calculates lowest common multiple (lcm) correctly', () => {
    expect(lcm(3, 5)).toBe(15);
    expect(lcm(2, 4)).toBe(4);
    expect(lcm(4, 6)).toBe(12);
  });

  it('generates correct multiples list', () => {
    expect(getMultiples(3, 4)).toEqual([3, 6, 9, 12]);
  });

  it('identifies common multiples correctly', () => {
    expect(isCommonMultiple(15, 3, 5)).toBe(true);
    expect(isCommonMultiple(30, 3, 5)).toBe(true);
    expect(isCommonMultiple(10, 3, 5)).toBe(false);
  });

  it('checks fraction equivalence accurately', () => {
    expect(checkEquivalent(1, 3, 5, 15)).toBe(true);
    expect(checkEquivalent(1, 5, 3, 15)).toBe(true);
    expect(checkEquivalent(1, 3, 2, 6)).toBe(true);
    expect(checkEquivalent(1, 3, 2, 5)).toBe(false);
  });

  it('simplifies fractions and adds fractions accurately', () => {
    expect(simplifyFraction(4, 8)).toEqual({ num: 1, den: 2 });
    expect(simplifyFraction(8, 15)).toEqual({ num: 8, den: 15 });

    // 1/3 + 1/5 = 8/15
    const sumResult = addFractions(1, 3, 1, 5);
    expect(sumResult.num).toBe(8);
    expect(sumResult.den).toBe(15);
    expect(sumResult.simplifiedNum).toBe(8);
    expect(sumResult.simplifiedDen).toBe(15);
  });

  it('diagnoses correct conversion using LCD', () => {
    // 1/3 and 1/5 -> 5/15 and 3/15 (LCM = 15)
    const result = diagnoseFractionAdditionConversion(1, 3, 1, 5, 5, 15, 3, 15);
    expect(result.isCorrect).toBe(true);
    expect(result.code).toBe('CORRECT_LCD');
  });

  it('diagnoses correct conversion using non-lowest valid common denominator', () => {
    // 1/3 and 1/5 -> 10/30 and 6/30 (Common Denominator = 30)
    const result = diagnoseFractionAdditionConversion(1, 3, 1, 5, 10, 30, 6, 30);
    expect(result.isCorrect).toBe(true);
    expect(result.code).toBe('CORRECT_COMMON_DENOMINATOR');
  });

  it('diagnoses error when numerators remain unchanged after changing denominators', () => {
    // 1/3 and 1/5 -> 1/15 and 1/15
    const result = diagnoseFractionAdditionConversion(1, 3, 1, 5, 1, 15, 1, 15);
    expect(result.isCorrect).toBe(false);
    expect(result.code).toBe('UNCHANGED_NUMERATOR');
  });

  it('diagnoses error when denominators are unequal', () => {
    const result = diagnoseFractionAdditionConversion(1, 3, 1, 5, 5, 15, 3, 10);
    expect(result.isCorrect).toBe(false);
    expect(result.code).toBe('NON_COMMON_DENOMINATOR');
  });

  it('diagnoses pupil adding numerators and denominators separately (1/3 + 1/5 = 2/8)', () => {
    const result = diagnoseFractionAdditionSum(1, 3, 1, 5, 2, 8);
    expect(result.isCorrect).toBe(false);
    expect(result.code).toBe('ADDED_NUMERATORS_AND_DENOMINATORS_SEPARATELY');
    expect(result.feedback.ms).toContain('menambah pengangka dan penyebut secara berasingan');
  });

  it('diagnoses correct fraction addition sum', () => {
    const result = diagnoseFractionAdditionSum(1, 3, 1, 5, 8, 15);
    expect(result.isCorrect).toBe(true);
    expect(result.code).toBe('CORRECT_SIMPLIFIED');
  });

  it('diagnoses arithmetic error on valid common denominator', () => {
    // 1/3 + 1/5 with CD 15, user enters 7/15 instead of 8/15
    const result = diagnoseFractionAdditionSum(1, 3, 1, 5, 7, 15);
    expect(result.isCorrect).toBe(false);
    expect(result.code).toBe('ARITHMETIC_ERROR');
  });
});
