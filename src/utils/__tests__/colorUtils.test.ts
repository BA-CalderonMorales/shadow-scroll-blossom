import { getComplementaryHex, blendHexColors } from '../colorUtils';

describe('color utilities', () => {
  test('creates complementary color', () => {
    const comp = getComplementaryHex('#00ff00');
    expect(comp.toLowerCase()).toBe('#ff00ff');
  });

  test('blends two colors', () => {
    const blended = blendHexColors('#ff0000', '#0000ff');
    expect(blended.toLowerCase()).toBe('#800080');
  });
});
