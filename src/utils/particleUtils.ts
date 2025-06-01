
import { Particle } from '@/types/particle';

export const createParticle = (x: number, y: number, trackingType: string = 'subtle'): Particle => {
  const angle = Math.random() * Math.PI * 2;
  
  let speed, life, size, hue, opacity;
  
  if (trackingType === 'comet') {
    // Trailing comet settings
    speed = Math.random() * 0.8 + 0.2;
    life = 240; // Longer life for trailing effect
    size = Math.random() * 1.5 + 0.5;
    hue = Math.random() * 30 + 290; // Purple/magenta range
    opacity = Math.random() * 0.8 + 0.4;
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
  if (particle.trackingType === 'comet') {
    // Comet particles move more smoothly and maintain direction longer
    return {
      ...particle,
      x: particle.x + particle.vx,
      y: particle.y + particle.vy,
      life: particle.life - 1,
      vy: particle.vy + 0.005, // Less gravity
      vx: particle.vx * 0.995 // Less friction
    };
  } else {
    // Default behavior for subtle particles
    return {
      ...particle,
      x: particle.x + particle.vx,
      y: particle.y + particle.vy,
      life: particle.life - 1,
      vy: particle.vy + 0.01,
      vx: particle.vx * 0.99
    };
  }
};

export const drawParticle = (ctx: CanvasRenderingContext2D, particle: Particle): void => {
  const lifeRatio = particle.life / particle.maxLife;
  const alpha = Math.max(0, lifeRatio * particle.opacity);
  
  if (alpha <= 0.01) return;

  ctx.save();
  
  if (particle.trackingType === 'comet') {
    // Comet trail effect - elongated glow in direction of movement
    const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
    const trailLength = Math.max(3, speed * 8);
    
    // Create gradient in direction of movement
    const gradient = ctx.createLinearGradient(
      particle.x - particle.vx * trailLength,
      particle.y - particle.vy * trailLength,
      particle.x,
      particle.y
    );
    gradient.addColorStop(0, `hsla(${particle.hue}, 80%, 60%, 0)`);
    gradient.addColorStop(0.3, `hsla(${particle.hue}, 90%, 70%, ${alpha * 0.3})`);
    gradient.addColorStop(1, `hsla(${particle.hue}, 100%, 80%, ${alpha * 0.8})`);
    
    // Draw elongated trail
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(
      particle.x, 
      particle.y, 
      particle.size * 2, 
      particle.size * 0.5, 
      Math.atan2(particle.vy, particle.vx), 
      0, 
      Math.PI * 2
    );
    ctx.fill();
    
    // Bright core
    ctx.fillStyle = `hsla(${particle.hue}, 100%, 90%, ${alpha})`;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size * 0.6, 0, Math.PI * 2);
    ctx.fill();
  } else {
    // Default subtle particle rendering
    const glowMultiplier = 3;
    const coreMultiplier = 0.8;
    
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
  }
  
  ctx.restore();
};

export const isParticleAlive = (particle: Particle): boolean => {
  const lifeRatio = particle.life / particle.maxLife;
  const alpha = Math.max(0, lifeRatio * particle.opacity);
  return alpha > 0.01;
};
