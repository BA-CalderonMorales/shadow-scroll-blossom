
import { Particle } from '@/types/particle';

export const drawStyledParticle = (
  ctx: CanvasRenderingContext2D, 
  particle: Particle, 
  isDarkMode: boolean, 
  backgroundType: string,
  particleStyle: string
) => {
  const alpha = particle.opacity * (particle.life / particle.maxLife);
  
  switch (particleStyle) {
    case 'glow':
      drawGlowParticle(ctx, particle, alpha, isDarkMode);
      break;
    case 'crystalline':
      drawCrystallineParticle(ctx, particle, alpha, isDarkMode);
      break;
    case 'plasma':
      drawPlasmaParticle(ctx, particle, alpha, isDarkMode);
      break;
    case 'stardust':
      drawStardustParticle(ctx, particle, alpha, isDarkMode);
      break;
    case 'energy':
      drawEnergyParticle(ctx, particle, alpha, isDarkMode);
      break;
    case 'ethereal':
      drawEtherealParticle(ctx, particle, alpha, isDarkMode);
      break;
    default:
      drawDefaultParticle(ctx, particle, alpha);
      break;
  }
};

const drawDefaultParticle = (ctx: CanvasRenderingContext2D, particle: Particle, alpha: number) => {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = particle.color;
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
};

const drawGlowParticle = (ctx: CanvasRenderingContext2D, particle: Particle, alpha: number, isDarkMode: boolean) => {
  const gradient = ctx.createRadialGradient(
    particle.x, particle.y, 0,
    particle.x, particle.y, particle.size * 3
  );
  
  gradient.addColorStop(0, `${particle.color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`);
  gradient.addColorStop(0.4, `${particle.color}${Math.floor(alpha * 128).toString(16).padStart(2, '0')}`);
  gradient.addColorStop(1, `${particle.color}00`);
  
  ctx.save();
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
};

const drawCrystallineParticle = (ctx: CanvasRenderingContext2D, particle: Particle, alpha: number, isDarkMode: boolean) => {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = particle.color;
  ctx.strokeStyle = particle.color;
  ctx.lineWidth = 1;
  
  const sides = 6;
  const angle = (Math.PI * 2) / sides;
  
  ctx.translate(particle.x, particle.y);
  ctx.rotate(particle.life * 0.1);
  
  ctx.beginPath();
  for (let i = 0; i < sides; i++) {
    const x = Math.cos(i * angle) * particle.size;
    const y = Math.sin(i * angle) * particle.size;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
};

const drawPlasmaParticle = (ctx: CanvasRenderingContext2D, particle: Particle, alpha: number, isDarkMode: boolean) => {
  const gradient = ctx.createRadialGradient(
    particle.x, particle.y, 0,
    particle.x, particle.y, particle.size * 2
  );
  
  const pulse = Math.sin(Date.now() * 0.01 + particle.x) * 0.3 + 0.7;
  
  gradient.addColorStop(0, `${particle.color}${Math.floor(alpha * 255 * pulse).toString(16).padStart(2, '0')}`);
  gradient.addColorStop(0.6, `${particle.color}${Math.floor(alpha * 180 * pulse).toString(16).padStart(2, '0')}`);
  gradient.addColorStop(1, `${particle.color}00`);
  
  ctx.save();
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
};

const drawStardustParticle = (ctx: CanvasRenderingContext2D, particle: Particle, alpha: number, isDarkMode: boolean) => {
  ctx.save();
  ctx.globalAlpha = alpha * (Math.sin(Date.now() * 0.01 + particle.x) * 0.5 + 0.5);
  ctx.fillStyle = particle.color;
  
  // Draw star shape
  const spikes = 4;
  const outerRadius = particle.size;
  const innerRadius = particle.size * 0.4;
  
  ctx.translate(particle.x, particle.y);
  ctx.rotate(particle.life * 0.05);
  
  ctx.beginPath();
  for (let i = 0; i < spikes * 2; i++) {
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const angle = (i * Math.PI) / spikes;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
};

const drawEnergyParticle = (ctx: CanvasRenderingContext2D, particle: Particle, alpha: number, isDarkMode: boolean) => {
  const gradient = ctx.createRadialGradient(
    particle.x, particle.y, 0,
    particle.x, particle.y, particle.size * 2.5
  );
  
  const energy = Math.sin(Date.now() * 0.02 + particle.x) * 0.4 + 0.6;
  
  gradient.addColorStop(0, `#ffffff${Math.floor(alpha * 255 * energy).toString(16).padStart(2, '0')}`);
  gradient.addColorStop(0.3, `${particle.color}${Math.floor(alpha * 200).toString(16).padStart(2, '0')}`);
  gradient.addColorStop(0.7, `${particle.color}${Math.floor(alpha * 100).toString(16).padStart(2, '0')}`);
  gradient.addColorStop(1, `${particle.color}00`);
  
  ctx.save();
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, particle.size * 2.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
};

const drawEtherealParticle = (ctx: CanvasRenderingContext2D, particle: Particle, alpha: number, isDarkMode: boolean) => {
  const gradient = ctx.createRadialGradient(
    particle.x, particle.y, 0,
    particle.x, particle.y, particle.size * 4
  );
  
  const ethereal = Math.sin(Date.now() * 0.005 + particle.x) * 0.3 + 0.4;
  
  gradient.addColorStop(0, `${particle.color}${Math.floor(alpha * 100 * ethereal).toString(16).padStart(2, '0')}`);
  gradient.addColorStop(0.5, `${particle.color}${Math.floor(alpha * 60 * ethereal).toString(16).padStart(2, '0')}`);
  gradient.addColorStop(1, `${particle.color}00`);
  
  ctx.save();
  ctx.fillStyle = gradient;
  ctx.shadowColor = particle.color;
  ctx.shadowBlur = particle.size * 2;
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
};
