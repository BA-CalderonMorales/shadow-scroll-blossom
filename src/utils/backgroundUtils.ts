
export const getBackgroundStyle = (backgroundType: string, isDarkMode: boolean): string => {
  switch (backgroundType) {
    case 'cyberpunk':
      return isDarkMode 
        ? `
          radial-gradient(circle at 20% 50%, rgba(0, 255, 255, 0.4) 0%, transparent 40%),
          radial-gradient(circle at 80% 20%, rgba(255, 0, 255, 0.35) 0%, transparent 45%),
          radial-gradient(circle at 40% 80%, rgba(255, 255, 0, 0.25) 0%, transparent 50%),
          linear-gradient(0deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 0, 255, 0.1) 1px, transparent 1px),
          linear-gradient(45deg, #0a0a0a 0%, #1a0a1a 25%, #0a1a1a 50%, #1a1a0a 75%, #0a0a1a 100%)
        `
        : `
          radial-gradient(circle at 20% 50%, rgba(0, 200, 255, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(200, 0, 255, 0.25) 0%, transparent 50%),
          linear-gradient(45deg, #f0f4f8 0%, #e6f2ff 50%, #f0f8ff 100%)
        `;

    case 'nebula':
      return isDarkMode
        ? `
          radial-gradient(ellipse at 30% 40%, rgba(138, 43, 226, 0.6) 0%, rgba(75, 0, 130, 0.3) 40%, transparent 80%),
          radial-gradient(ellipse at 70% 60%, rgba(75, 0, 130, 0.5) 0%, rgba(25, 25, 112, 0.2) 50%, transparent 90%),
          radial-gradient(ellipse at 50% 20%, rgba(0, 191, 255, 0.4) 0%, rgba(65, 105, 225, 0.2) 60%, transparent 85%),
          radial-gradient(ellipse at 20% 80%, rgba(220, 20, 60, 0.3) 0%, transparent 70%),
          linear-gradient(135deg, #0c0c1e 0%, #1a1a2e 25%, #16213e 50%, #0e1a3e 75%, #1a0e2e 100%)
        `
        : `
          radial-gradient(ellipse at 30% 40%, rgba(138, 43, 226, 0.15) 0%, transparent 70%),
          radial-gradient(ellipse at 70% 60%, rgba(75, 0, 130, 0.12) 0%, transparent 70%),
          linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)
        `;

    case 'matrix':
      return isDarkMode
        ? `
          linear-gradient(0deg, rgba(0, 255, 0, 0.2) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 255, 0, 0.2) 1px, transparent 1px),
          radial-gradient(circle at 50% 50%, rgba(0, 255, 0, 0.3) 0%, rgba(0, 150, 0, 0.1) 50%, transparent 80%),
          radial-gradient(circle at 25% 25%, rgba(0, 200, 0, 0.2) 0%, transparent 60%),
          radial-gradient(circle at 75% 75%, rgba(0, 180, 0, 0.15) 0%, transparent 70%),
          linear-gradient(180deg, #000000 0%, #001100 50%, #000800 100%)
        `
        : `
          linear-gradient(0deg, rgba(0, 150, 0, 0.08) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 150, 0, 0.08) 1px, transparent 1px),
          linear-gradient(180deg, #f8fafc 0%, #f0f9f0 100%)
        `;

    case 'aurora':
      return isDarkMode
        ? `
          radial-gradient(ellipse at 20% 10%, rgba(0, 255, 127, 0.5) 0%, rgba(64, 224, 208, 0.3) 40%, transparent 80%),
          radial-gradient(ellipse at 80% 30%, rgba(64, 224, 208, 0.4) 0%, rgba(0, 255, 127, 0.2) 50%, transparent 85%),
          radial-gradient(ellipse at 40% 70%, rgba(138, 43, 226, 0.3) 0%, rgba(255, 20, 147, 0.2) 60%, transparent 90%),
          radial-gradient(ellipse at 60% 90%, rgba(255, 20, 147, 0.25) 0%, transparent 70%),
          linear-gradient(180deg, #0a0a1a 0%, #001122 25%, #002244 50%, #001133 75%, #0a1a2a 100%)
        `
        : `
          radial-gradient(ellipse at 20% 10%, rgba(0, 255, 127, 0.12) 0%, transparent 60%),
          radial-gradient(ellipse at 80% 30%, rgba(64, 224, 208, 0.1) 0%, transparent 60%),
          linear-gradient(180deg, #f0f9ff 0%, #e0f2fe 100%)
        `;

    case 'synthwave':
      return isDarkMode
        ? `
          radial-gradient(ellipse at 50% 0%, rgba(255, 20, 147, 0.6) 0%, rgba(255, 0, 128, 0.3) 30%, transparent 70%),
          radial-gradient(ellipse at 0% 100%, rgba(0, 255, 255, 0.5) 0%, rgba(0, 200, 255, 0.2) 40%, transparent 80%),
          radial-gradient(ellipse at 100% 100%, rgba(255, 69, 0, 0.4) 0%, rgba(255, 140, 0, 0.2) 50%, transparent 85%),
          linear-gradient(0deg, rgba(255, 20, 147, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px),
          linear-gradient(180deg, #1a0033 0%, #330066 25%, #660033 50%, #330099 75%, #000033 100%)
        `
        : `
          radial-gradient(ellipse at 50% 0%, rgba(255, 20, 147, 0.15) 0%, transparent 70%),
          radial-gradient(ellipse at 0% 100%, rgba(0, 255, 255, 0.12) 0%, transparent 70%),
          linear-gradient(180deg, #fdf4ff 0%, #f3e8ff 100%)
        `;

    case 'ocean':
      return isDarkMode
        ? `
          radial-gradient(circle at 50% 50%, rgba(0, 90, 150, 0.4) 0%, transparent 70%),
          linear-gradient(180deg, #001022 0%, #004466 100%)
        `
        : `
          radial-gradient(circle at 50% 50%, rgba(0, 120, 200, 0.3) 0%, transparent 70%),
          linear-gradient(180deg, #e0f7ff 0%, #a0d8f0 100%)
        `;

    case 'desert':
      return isDarkMode
        ? `
          radial-gradient(circle at 50% 50%, rgba(120, 94, 47, 0.4) 0%, transparent 70%),
          linear-gradient(180deg, #402910 0%, #6b4e21 100%)
        `
        : `
          radial-gradient(circle at 50% 50%, rgba(240, 209, 165, 0.3) 0%, transparent 70%),
          linear-gradient(180deg, #fef6e4 0%, #eecfa1 100%)
        `;

    case 'forest':
      return isDarkMode
        ? `
          radial-gradient(circle at 50% 50%, rgba(34, 139, 34, 0.4) 0%, transparent 70%),
          linear-gradient(180deg, #0b3311 0%, #154f24 100%)
        `
        : `
          radial-gradient(circle at 50% 50%, rgba(60, 179, 113, 0.3) 0%, transparent 70%),
          linear-gradient(180deg, #e6ffe6 0%, #b3ffb3 100%)
        `;

    case 'fluid':
      return isDarkMode
        ? `
          radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(107, 114, 128, 0.6) 0%, rgba(17, 24, 39, 0.8) 70%),
          linear-gradient(180deg, #1f2937 0%, #111827 100%)
        `
        : `
          radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(209, 213, 219, 0.6) 0%, rgba(243, 244, 246, 0.8) 70%),
          linear-gradient(180deg, #f3f4f6 0%, #e5e7eb 100%)
        `;

    case 'none':
    default:
      return isDarkMode 
        ? 'radial-gradient(circle at center, #0c1220 0%, #080c14 100%)'
        : 'radial-gradient(circle at center, #f8fafc 0%, #e2e8f0 100%)';
  }
};

export const getBackgroundSize = (backgroundType: string): string => {
  switch (backgroundType) {
    case 'matrix':
      return '30px 30px, 30px 30px, 100% 100%, 100% 100%, 100% 100%, 100% 100%';
    case 'cyberpunk':
      return '100% 100%, 100% 100%, 100% 100%, 25px 25px, 25px 25px, 100% 100%';
    case 'synthwave':
      return '100% 100%, 100% 100%, 100% 100%, 20px 20px, 20px 20px, 100% 100%';
    case 'ocean':
      return '100% 100%, 100% 100%';
    case 'desert':
      return '100% 100%, 100% 100%';
    case 'forest':
      return '100% 100%, 100% 100%';
    default:
      return '100% 100%';
  }
};
