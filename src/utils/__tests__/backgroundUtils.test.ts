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
});
