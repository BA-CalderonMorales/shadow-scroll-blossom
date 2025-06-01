
import { Particle } from '@/types/particle';

export const createParticle = (x: number, y: number, trackingType: string = 'subtle'): Particle => {
  const angle = Math.random() * Math.PI * 2;
  
  let speed, life, size, hue, opacity;
  
  switch (trackingType) {
    case 'comet':
      speed = Math.random() * 0.8 + 0.2;
      life = 240;
      size = Math.random() * 1.5 + 0.5;
      hue = Math.random() * 30 + 290; // Purple/magenta range
      opacity = Math.random() * 0.8 + 0.4;
      break;
      
    case 'fireworks':
      speed = Math.random() * 3 + 1;
      life = 180;
      size = Math.random() * 3 + 1;
      hue = Math.random() * 360; // Full color spectrum
      opacity = Math.random() * 0.9 + 0.3;
      break;
      
    case 'lightning':
      speed = Math.random() * 4 + 2;
      life = 60;
      size = Math.random() * 1 + 0.5;
      hue = Math.random() * 60 + 180; // Blue/cyan range
      opacity = Math.random() * 1 + 0.6;
      break;
      
    case 'galaxy':
      speed = Math.random() * 1 + 0.3;
      life = 300;
      size = Math.random() * 2 + 0.8;
      hue = Math.random() * 80 + 260; // Purple/pink range
      opacity = Math.random() * 0.7 + 0.2;
      break;
      
    case 'neon':
      speed = Math.random() * 2 + 0.5;
      life = 150;
      size = Math.random() * 1.5 + 1;
      hue = [0, 60, 120, 180, 240, 300][Math.floor(Math.random() * 6)]; // Distinct neon colors
      opacity = Math.random() * 0.8 + 0.5;
      break;
      
    case 'watercolor':
      speed = Math.random() * 0.5 + 0.1;
      life = 400;
      size = Math.random() * 4 + 2;
      hue = Math.random() * 360;
      opacity = Math.random() * 0.3 + 0.1;
      break;
      
    case 'geometric':
      speed = Math.random() * 2 + 1;
      life = 120;
      size = Math.random() * 2 + 1;
      hue = [0, 30, 60, 180, 240, 300][Math.floor(Math.random() * 6)]; // Sharp color palette
      opacity = Math.random() * 0.8 + 0.4;
      break;
      
    default: // 'subtle'
      speed = Math.random() * 1.5 + 0.5;
      life = 120;
      size = Math.random() * 2 + 1;
      hue = Math.random() * 40 + 200; // Narrower blue range
      opacity = Math.random() * 0.3 + 0.1;
  }
  
  const particle = {
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    life,
    maxLife: life,
    size,
    hue,
    opacity,
    trackingType // Store the tracking type with the particle
  };
  
  console.log('Particle created at', { x, y, trackingType });
  return particle;
};

export const createParticlesForType = (x: number, y: number, trackingType: string): Particle[] => {
  // For most effects, create 1-3 particles per interaction
  const particleCount = trackingType === 'fireworks' ? Math.floor(Math.random() * 3) + 2 : 
                       trackingType === 'lightning' ? Math.floor(Math.random() * 2) + 1 :
                       trackingType === 'none' ? 0 : 1;
  
  const particles: Particle[] = [];
  
  for (let i = 0; i < particleCount; i++) {
    // Add slight random offset for multiple particles
    const offsetX = particleCount > 1 ? (Math.random() - 0.5) * 10 : 0;
    const offsetY = particleCount > 1 ? (Math.random() - 0.5) * 10 : 0;
    
    particles.push(createParticle(x + offsetX, y + offsetY, trackingType));
  }
  
  return particles;
};
