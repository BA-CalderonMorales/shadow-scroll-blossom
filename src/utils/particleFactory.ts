
import { Particle } from '@/types/particle';

export const createParticle = (x: number, y: number, trackingType: string, backgroundType: string = 'none'): Particle => {
  const color = getBackgroundAwareColor(backgroundType);
  const baseParticle = {
    x,
    y,
    vx: (Math.random() - 0.5) * 2,
    vy: (Math.random() - 0.5) * 2,
    life: 1.0,
    maxLife: 1.0,
    size: Math.random() * 3 + 1,
    hue: Math.random() * 360,
    opacity: 1.0,
    trackingType,
    color,
    trail: [],
    energy: Math.random() * 0.5 + 0.5,
  };

  // Apply background-specific particle behaviors
  return applyBackgroundBehavior(baseParticle, backgroundType, trackingType);
};

export const createParticlesForType = (x: number, y: number, trackingType: string, backgroundType: string = 'none'): Particle[] => {
  return [createParticle(x, y, trackingType, backgroundType)];
};

const getBackgroundAwareColor = (backgroundType: string): string => {
  switch (backgroundType) {
    case 'cyberpunk':
      const cyberpunkColors = ['#00ffff', '#ff00ff', '#ffff00', '#00ff88', '#ff0088', '#88ff00'];
      return cyberpunkColors[Math.floor(Math.random() * cyberpunkColors.length)];
    
    case 'nebula':
      const nebulaColors = ['#8a2be2', '#4b0082', '#00bfff', '#9370db', '#ff1493', '#00ced1'];
      return nebulaColors[Math.floor(Math.random() * nebulaColors.length)];
    
    case 'matrix':
      const matrixColors = ['#00ff00', '#00cc00', '#008800', '#00ff88', '#88ff00', '#44ff44'];
      return matrixColors[Math.floor(Math.random() * matrixColors.length)];
    
    case 'aurora':
      const auroraColors = ['#00ff7f', '#40e0d0', '#8a2be2', '#00ffff', '#ff1493', '#98fb98'];
      return auroraColors[Math.floor(Math.random() * auroraColors.length)];
    
    case 'synthwave':
      const synthwaveColors = ['#ff1493', '#00ffff', '#ff4500', '#ff69b4', '#ff0080', '#00ff80'];
      return synthwaveColors[Math.floor(Math.random() * synthwaveColors.length)];
    
    case 'ocean':
      const oceanColors = ['#00bfff', '#1e90ff', '#0066cc', '#4169e1', '#48d1cc', '#87ceeb'];
      return oceanColors[Math.floor(Math.random() * oceanColors.length)];
    
    default:
      // Convert HSL to hex format to avoid color parsing issues
      const hue = Math.random() * 360;
      return hslToHex(hue, 70, 60);
  }
};

// Helper function to convert HSL to hex
const hslToHex = (h: number, s: number, l: number): string => {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

const applyBackgroundBehavior = (particle: Particle, backgroundType: string, trackingType: string): Particle => {
  switch (backgroundType) {
    case 'cyberpunk':
      return {
        ...particle,
        vx: particle.vx * 1.5, // Reduced from 2.0
        vy: particle.vy * 1.5,
        maxLife: 2.0, // Reduced from 2.5
        life: 2.0,
        size: particle.size * 1.2, // Reduced from 1.5
        energy: particle.energy * 1.2,
      };
    
    case 'matrix':
      return {
        ...particle,
        vy: Math.abs(particle.vy) * 2.5 + 1, // Reduced from 3
        vx: particle.vx * 0.2,
        maxLife: 3.0, // Reduced from 4.0
        life: 3.0,
        size: Math.random() * 1.5 + 1, // Reduced size
      };
    
    case 'nebula':
      return {
        ...particle,
        vx: particle.vx * 0.5,
        vy: particle.vy * 0.5,
        maxLife: 3.5, // Reduced from 5.0
        life: 3.5,
        size: particle.size * 1.5, // Reduced from 2.0
      };
    
    case 'aurora':
      return {
        ...particle,
        vx: particle.vx + Math.sin(Date.now() * 0.001) * 0.8, // Reduced from 1.0
        vy: particle.vy * 0.4,
        maxLife: 3.0, // Reduced from 4.0
        life: 3.0,
        size: particle.size * 1.4, // Reduced from 1.8
      };
    
    case 'synthwave':
      return {
        ...particle,
        vx: particle.vx * 2.0, // Reduced from 2.5
        vy: particle.vy * 0.3,
        maxLife: 2.5, // Reduced from 3.0
        life: 2.5,
        size: particle.size * 1.1, // Reduced from 1.2
        energy: particle.energy * 1.5, // Reduced from 2.0
      };
    
    case 'ocean':
      return {
        ...particle,
        vx: particle.vx + Math.sin(Date.now() * 0.002) * 0.6, // Reduced from 0.8
        vy: particle.vy + Math.cos(Date.now() * 0.002) * 0.6,
        maxLife: 3.0, // Reduced from 3.5
        life: 3.0,
        size: particle.size * 1.3, // Reduced from 1.6
      };
    
    default:
      return particle;
  }
};

export const createMultipleParticles = (x: number, y: number, count: number, trackingType: string, backgroundType: string = 'none'): Particle[] => {
  const particles: Particle[] = [];
  
  // Reduced spread for better performance
  const spreadMultiplier = backgroundType !== 'none' ? 1.5 : 1.0; // Reduced from 2.0
  
  for (let i = 0; i < count; i++) {
    const offsetX = x + (Math.random() - 0.5) * 20 * spreadMultiplier; // Reduced from 30
    const offsetY = y + (Math.random() - 0.5) * 20 * spreadMultiplier;
    particles.push(createParticle(offsetX, offsetY, trackingType, backgroundType));
  }
  
  return particles;
};
