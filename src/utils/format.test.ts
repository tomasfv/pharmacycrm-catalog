import { describe, it, expect } from '@jest/globals';
import { formatPrice } from './format';

describe('formatPrice', () => {
  it('formats numbers with es-AR thousand separator and no decimals', () => {
    expect(formatPrice(1500)).toBe('$1.500');
    expect(formatPrice(0)).toBe('$0');
  });

  it('accepts price as string (API DECIMAL)', () => {
    expect(formatPrice('5000')).toBe('$5.000');
    expect(formatPrice('1234.56')).toBe('$1.235');
  });

  it('rounds decimals', () => {
    expect(formatPrice(999.5)).toBe('$1.000');
    expect(formatPrice(999.4)).toBe('$999');
  });
});
