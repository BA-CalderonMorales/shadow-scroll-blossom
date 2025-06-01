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
      const cyberpunkColors = ['#00ffff', '#ff00ff', '#ffff00', '#00ff88'];
      return cyberpunkColors[Math.floor(Math.random() * cyberpunkColors.length)];
    
    case 'nebula':
      const nebulaColors = ['#8a2be2', '#4b0082', '#00bfff', '#9370db'];
      return nebulaColors[Math.floor(Math.random() * nebulaColors.length)];
    
    case 'matrix':
      const matrixColors = ['#00ff00', '#00cc00', '#008800', '#00ff88'];
      return matrixColors[Math.floor(Math.random() * matrixColors.length)];
    
    case 'aurora':
      const auroraColors = ['#00ff7f', '#40e0d0', '#8a2be2', '#00ffff'];
      return auroraColors[Math.floor(Math.random() * auroraColors.length)];
    
    case 'synthwave':
      const synthwaveColors = ['#ff1493', '#00ffff', '#ff4500', '#ff69b4'];
      return synthwaveColors[Math.floor(Math.random() * synthwaveColors.length)];
    
    case 'ocean':
      const oceanColors = ['#00bfff', '#1e90ff', '#0066cc', '#4169e1'];
      return oceanColors[Math.floor(Math.random() * oceanColors.length)];
    
    default:
      return `hsl(${Math.random() * 360}, 70%, 60%)`;
  }
};

const applyBackgroundBehavior = (particle: Particle, backgroundType: string, trackingType: string): Particle => {
  switch (backgroundType) {
    case 'cyberpunk':
      return {
        ...particle,
        vx: particle.vx * 1.5,
        vy: particle.vy * 1.5,
        maxLife: 2.0,
        life: 2.0,
        size: particle.size * 1.2,
        energy: particle.energy * 1.3,
      };
    
    case 'matrix':
      return {
        ...particle,
        vy: Math.abs(particle.vy) + 2, // Falling effect like matrix code
        vx: particle.vx * 0.3,
        maxLife: 3.0,
        life: 3.0,
        size: Math.random() * 2 + 0.5,
      };
    
    case 'nebula':
      return {
        ...particle,
        vx: particle.vx * 0.8,
        vy: particle.vy * 0.8,
        maxLife: 4.0,
        life: 4.0,
        size: particle.size * 1.5,
      };
    
    case 'aurora':
      return {
        ...particle,
        vx: particle.vx + Math.sin(Date.now() * 0.001) * 0.5,
        vy: particle.vy * 0.7,
        maxLife: 3.5,
        life: 3.5,
        size: particle.size * 1.3,
      };
    
    case 'synthwave':
      return {
        ...particle,
        vx: particle.vx * 1.8,
        vy: particle.vy * 0.5,
        maxLife: 2.5,
        life: 2.5,
        size: particle.size * 0.8,
        energy: particle.energy * 1.5,
      };
    
    case 'ocean':
      return {
        ...particle,
        vx: particle.vx + Math.sin(Date.now() * 0.002) * 0.3,
        vy: particle.vy + Math.cos(Date.now() * 0.002) * 0.3,
        maxLife: 3.0,
        life: 3.0,
        size: particle.size * 1.1,
      };
    
    default:
      return particle;
  }
};

export const createMultipleParticles = (x: number, y: number, count: number, trackingType: string, backgroundType: string = 'none'): Particle[] => {
  const particles: Particle[] = [];
  
  for (let i = 0; i < count; i++) {
    const offsetX = x + (Math.random() - 0.5) * 20;
    const offsetY = y + (Math.random() - 0.5) * 20;
    particles.push(createParticle(offsetX, offsetY, trackingType, backgroundType));
  }
  
  return particles;
};
