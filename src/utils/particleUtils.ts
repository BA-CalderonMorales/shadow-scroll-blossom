
import { Particle } from '@/types/particle';

export const createParticle = (x: number, y: number, trackingType: string = 'subtle'): Particle => {
  const angle = Math.random() * Math.PI * 2;
  
  let speed, life, size, hue, opacity;
  
  if (trackingType === 'dynamic') {
    // Dynamic burst settings
    speed = Math.random() * 3 + 1;
    life = 180;
    size = Math.random() * 4 + 2;
    hue = Math.random() * 60 + 180; // Wider color range
    opacity = Math.random() * 0.6 + 0.2;
  } else {
    // Subtle trail settings (default)
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

export const updateParticle = (particle: Particle): Particle => {
  return {
    ...particle,
    x: particle.x + particle.vx,
    y: particle.y + particle.vy,
    life: particle.life - 1,
    vy: particle.vy + 0.01,
    vx: particle.vx * 0.99
  };
};

export const drawParticle = (ctx: CanvasRenderingContext2D, particle: Particle): void => {
  const lifeRatio = particle.life / particle.maxLife;
  const alpha = Math.max(0, lifeRatio * particle.opacity);
  
  if (alpha <= 0.01) return;

  ctx.save();
  
  // Adjust rendering based on the particle's own tracking type
  const glowMultiplier = particle.trackingType === 'dynamic' ? 4 : 3;
  const coreMultiplier = particle.trackingType === 'dynamic' ? 1.2 : 0.8;
  
  // Soft outer glow
  const gradient = ctx.createRadialGradient(
    particle.x, particle.y, 0,
    particle.x, particle.y, particle.size * glowMultiplier
  );
  gradient.addColorStop(0, `hsla(${particle.hue}, 60%, 80%, ${alpha * 0.4})`);
  gradient.addColorStop(0.4, `hsla(${particle.hue}, 70%, 60%, ${alpha * 0.2})`);
  gradient.addColorStop(1, `hsla(${particle.hue}, 80%, 40%, 0)`);
  
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, particle.size * glowMultiplier, 0, Math.PI * 2);
  ctx.fill();

  // Very subtle inner core
  ctx.fillStyle = `hsla(${particle.hue}, 70%, 85%, ${alpha * 0.6})`;
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, particle.size * coreMultiplier, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.restore();
};

export const isParticleAlive = (particle: Particle): boolean => {
  const lifeRatio = particle.life / particle.maxLife;
  const alpha = Math.max(0, lifeRatio * particle.opacity);
  return alpha > 0.01;
};
