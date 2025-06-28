import { getBackgroundStyle } from '../backgroundUtils';

describe('getBackgroundStyle', () => {
  test('returns cyberpunk dark style', () => {
    const result = getBackgroundStyle('cyberpunk', true);
    expect(result).toContain('rgba(0, 255, 255, 0.4)');
    expect(result).toContain('linear-gradient(45deg');
  });

  test('returns cyberpunk light style', () => {
    const result = getBackgroundStyle('cyberpunk', false);
    expect(result).toContain('rgba(0, 200, 255, 0.3)');
    expect(result).toContain('linear-gradient(45deg');
  });

  test('returns none dark style', () => {
    const result = getBackgroundStyle('none', true);
    expect(result).toBe('radial-gradient(circle at center, #0c1220 0%, #080c14 100%)');
  });

  test('returns none light style', () => {
    const result = getBackgroundStyle('none', false);
    expect(result).toBe('radial-gradient(circle at center, #f8fafc 0%, #e2e8f0 100%)');
  });

  test('returns fluid style uses css vars', () => {
    const result = getBackgroundStyle('fluid', true);
    expect(result).toContain('var(--x');
    expect(result).toContain('var(--y');
  });

  test('returns ocean dark style', () => {
    const result = getBackgroundStyle('ocean', true);
    expect(result).toContain('linear-gradient');
    expect(result).toContain('#001022');
  });

  test('returns ocean light style', () => {
    const result = getBackgroundStyle('ocean', false);
    expect(result).toContain('linear-gradient');
    expect(result).toContain('#e0f7ff');
  });

  test('returns desert dark style', () => {
    const result = getBackgroundStyle('desert', true);
    expect(result).toContain('#402910');
  });

  test('returns desert light style', () => {
    const result = getBackgroundStyle('desert', false);
    expect(result).toContain('#fef6e4');
  });

  test('returns forest dark style', () => {
    const result = getBackgroundStyle('forest', true);
    expect(result).toContain('#0b3311');
  });

  test('returns forest light style', () => {
    const result = getBackgroundStyle('forest', false);
    expect(result).toContain('#e6ffe6');
  });

  test('returns sunset dark style', () => {
    const result = getBackgroundStyle('sunset', true);
    expect(result).toContain('#552218');
  });

  test('returns sunset light style', () => {
    const result = getBackgroundStyle('sunset', false);
    expect(result).toContain('#ffdfc0');
  });
});
