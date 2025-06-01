
import { Particle } from '@/types/particle';

export const createParticle = (x: number, y: number): Particle => {
  const angle = Math.random() * Math.PI * 2;
  const speed = Math.random() * 1.5 + 0.5; // Slower movement
  
  const particle = {
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    life: 120, // Longer life
    maxLife: 120,
    size: Math.random() * 2 + 1, // Smaller particles
    hue: Math.random() * 40 + 200, // Narrower blue range
    opacity: Math.random() * 0.3 + 0.1 // Lower opacity
  };
  
  console.log('Particle created at', { x, y });
  return particle;
};

export const updateParticle = (particle: Particle): Particle => {
  return {
    ...particle,
    x: particle.x + particle.vx,
    y: particle.y + particle.vy,
    life: particle.life - 1,
    vy: particle.vy + 0.01, // Less gravity
    vx: particle.vx * 0.99 // Less air resistance
  };
};

export const drawParticle = (ctx: CanvasRenderingContext2D, particle: Particle): void => {
  const lifeRatio = particle.life / particle.maxLife;
  const alpha = Math.max(0, lifeRatio * particle.opacity);
  
  if (alpha <= 0.01) return;

  ctx.save();
  
  // Soft outer glow
  const gradient = ctx.createRadialGradient(
    particle.x, particle.y, 0,
    particle.x, particle.y, particle.size * 3
  );
  gradient.addColorStop(0, `hsla(${particle.hue}, 60%, 80%, ${alpha * 0.4})`);
  gradient.addColorStop(0.4, `hsla(${particle.hue}, 70%, 60%, ${alpha * 0.2})`);
  gradient.addColorStop(1, `hsla(${particle.hue}, 80%, 40%, 0)`);
  
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
  ctx.fill();

  // Very subtle inner core
  ctx.fillStyle = `hsla(${particle.hue}, 70%, 85%, ${alpha * 0.6})`;
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, particle.size * 0.8, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.restore();
};

export const isParticleAlive = (particle: Particle): boolean => {
  const lifeRatio = particle.life / particle.maxLife;
  const alpha = Math.max(0, lifeRatio * particle.opacity);
  return alpha > 0.01;
};
