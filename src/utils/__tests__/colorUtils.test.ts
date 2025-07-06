import {
  getComplementaryHex,
  blendHexColors,
  lightenHex,
  darkenHex,
} from '../colorUtils';

describe('color utilities', () => {
  test('creates complementary color', () => {
    const comp = getComplementaryHex('#00ff00');
    expect(comp.toLowerCase()).toBe('#ff00ff');
  });

  test('blends two colors', () => {
    const blended = blendHexColors('#ff0000', '#0000ff');
    expect(blended.toLowerCase()).toBe('#800080');
  });

  test('lightens a color', () => {
    const lighter = lightenHex('#333333', 20);
    expect(lighter.toLowerCase()).toBe('#666666');
  });

  test('darkens a color', () => {
    const darker = darkenHex('#ffffff', 20);
    expect(darker.toLowerCase()).toBe('#cccccc');
  });
});
