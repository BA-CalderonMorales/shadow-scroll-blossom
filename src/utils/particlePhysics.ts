
import { Particle } from '@/types/particle';

export const updateParticle = (particle: Particle): Particle => {
  switch (particle.trackingType) {
    case 'subtle':
      return {
        ...particle,
        x: particle.x + particle.vx,
        y: particle.y + particle.vy,
        life: particle.life - 0.02,
        vy: particle.vy + 0.01,
        vx: particle.vx * 0.99
      };
      
    case 'comet':
      return {
        ...particle,
        x: particle.x + particle.vx,
        y: particle.y + particle.vy,
        life: particle.life - 0.015,
        vy: particle.vy + 0.005,
        vx: particle.vx * 0.995
      };
      
    case 'fireworks':
      return {
        ...particle,
        x: particle.x + particle.vx,
        y: particle.y + particle.vy,
        life: particle.life - 0.025,
        vy: particle.vy + 0.02, // More gravity
        vx: particle.vx * 0.98
      };
      
    case 'lightning':
      return {
        ...particle,
        x: particle.x + particle.vx + (Math.random() - 0.5) * 2, // Random jitter
        y: particle.y + particle.vy + (Math.random() - 0.5) * 2,
        life: particle.life - 0.03, // Faster decay
        vy: particle.vy * 0.95,
        vx: particle.vx * 0.95
      };
      
    case 'galaxy':
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const dx = particle.x - centerX;
      const dy = particle.y - centerY;
      const spiralForce = 0.001;
      return {
        ...particle,
        x: particle.x + particle.vx - dy * spiralForce,
        y: particle.y + particle.vy + dx * spiralForce,
        life: particle.life - 0.01,
        vx: particle.vx * 0.999,
        vy: particle.vy * 0.999
      };
      
    case 'neon':
      return {
        ...particle,
        x: particle.x + particle.vx,
        y: particle.y + particle.vy,
        life: particle.life - 0.02,
        vy: particle.vy + 0.008,
        vx: particle.vx * 0.992
      };
      
    case 'watercolor':
      return {
        ...particle,
        x: particle.x + particle.vx + (Math.random() - 0.5) * 0.5, // Gentle drift
        y: particle.y + particle.vy + (Math.random() - 0.5) * 0.5,
        life: particle.life - 0.01, // Slower decay
        vy: particle.vy + 0.002,
        vx: particle.vx * 0.998
      };
      
    case 'geometric':
      return {
        ...particle,
        x: particle.x + particle.vx,
        y: particle.y + particle.vy,
        life: particle.life - 0.02,
        vy: particle.vy + 0.015,
        vx: particle.vx * 0.985
      };
      
    case 'none':
      return {
        ...particle,
        life: 0 // Immediately kill particles when tracking is none
      };
      
    default:
      return {
        ...particle,
        x: particle.x + particle.vx,
        y: particle.y + particle.vy,
        life: particle.life - 0.02,
        vy: particle.vy + 0.01,
        vx: particle.vx * 0.99
      };
  }
};
