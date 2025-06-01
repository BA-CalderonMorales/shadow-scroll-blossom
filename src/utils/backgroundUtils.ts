
export const getBackgroundStyle = (backgroundType: string, isDarkMode: boolean): string => {
  switch (backgroundType) {
    case 'cyberpunk':
      return isDarkMode 
        ? `
          radial-gradient(circle at 20% 50%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 0, 255, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 80%, rgba(255, 255, 0, 0.05) 0%, transparent 50%),
          linear-gradient(45deg, #0a0a0a 0%, #1a0a1a 50%, #0a1a1a 100%)
        `
        : `
          radial-gradient(circle at 20% 50%, rgba(0, 200, 255, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(200, 0, 255, 0.15) 0%, transparent 50%),
          linear-gradient(45deg, #f0f4f8 0%, #e6f2ff 50%, #f0f8ff 100%)
        `;

    case 'nebula':
      return isDarkMode
        ? `
          radial-gradient(ellipse at 30% 40%, rgba(138, 43, 226, 0.2) 0%, transparent 70%),
          radial-gradient(ellipse at 70% 60%, rgba(75, 0, 130, 0.15) 0%, transparent 70%),
          radial-gradient(ellipse at 50% 20%, rgba(0, 191, 255, 0.1) 0%, transparent 70%),
          linear-gradient(135deg, #0c0c1e 0%, #1a1a2e 50%, #16213e 100%)
        `
        : `
          radial-gradient(ellipse at 30% 40%, rgba(138, 43, 226, 0.08) 0%, transparent 70%),
          radial-gradient(ellipse at 70% 60%, rgba(75, 0, 130, 0.06) 0%, transparent 70%),
          linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)
        `;

    case 'matrix':
      return isDarkMode
        ? `
          linear-gradient(0deg, rgba(0, 255, 0, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 255, 0, 0.03) 1px, transparent 1px),
          radial-gradient(circle at 50% 50%, rgba(0, 255, 0, 0.05) 0%, transparent 70%),
          linear-gradient(180deg, #000000 0%, #001100 100%)
        `
        : `
          linear-gradient(0deg, rgba(0, 150, 0, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 150, 0, 0.05) 1px, transparent 1px),
          linear-gradient(180deg, #f8fafc 0%, #f0f9f0 100%)
        `;

    case 'aurora':
      return isDarkMode
        ? `
          radial-gradient(ellipse at 20% 10%, rgba(0, 255, 127, 0.15) 0%, transparent 60%),
          radial-gradient(ellipse at 80% 30%, rgba(64, 224, 208, 0.1) 0%, transparent 60%),
          radial-gradient(ellipse at 40% 70%, rgba(138, 43, 226, 0.1) 0%, transparent 60%),
          linear-gradient(180deg, #0a0a1a 0%, #001122 100%)
        `
        : `
          radial-gradient(ellipse at 20% 10%, rgba(0, 255, 127, 0.08) 0%, transparent 60%),
          radial-gradient(ellipse at 80% 30%, rgba(64, 224, 208, 0.06) 0%, transparent 60%),
          linear-gradient(180deg, #f0f9ff 0%, #e0f2fe 100%)
        `;

    case 'synthwave':
      return isDarkMode
        ? `
          radial-gradient(ellipse at 50% 0%, rgba(255, 20, 147, 0.2) 0%, transparent 70%),
          radial-gradient(ellipse at 0% 100%, rgba(0, 255, 255, 0.15) 0%, transparent 70%),
          radial-gradient(ellipse at 100% 100%, rgba(255, 69, 0, 0.1) 0%, transparent 70%),
          linear-gradient(180deg, #1a0033 0%, #330066 50%, #000033 100%)
        `
        : `
          radial-gradient(ellipse at 50% 0%, rgba(255, 20, 147, 0.1) 0%, transparent 70%),
          radial-gradient(ellipse at 0% 100%, rgba(0, 255, 255, 0.08) 0%, transparent 70%),
          linear-gradient(180deg, #fdf4ff 0%, #f3e8ff 100%)
        `;

    case 'ocean':
      return isDarkMode
        ? `
          radial-gradient(ellipse at 30% 20%, rgba(0, 191, 255, 0.15) 0%, transparent 70%),
          radial-gradient(ellipse at 70% 80%, rgba(30, 144, 255, 0.1) 0%, transparent 70%),
          radial-gradient(ellipse at 50% 50%, rgba(0, 100, 200, 0.05) 0%, transparent 70%),
          linear-gradient(180deg, #001122 0%, #002244 50%, #001133 100%)
        `
        : `
          radial-gradient(ellipse at 30% 20%, rgba(0, 191, 255, 0.1) 0%, transparent 70%),
          radial-gradient(ellipse at 70% 80%, rgba(30, 144, 255, 0.08) 0%, transparent 70%),
          linear-gradient(180deg, #f0f9ff 0%, #e0f2fe 100%)
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
      return '20px 20px, 20px 20px, 100% 100%, 100% 100%';
    default:
      return '100% 100%';
  }
};
