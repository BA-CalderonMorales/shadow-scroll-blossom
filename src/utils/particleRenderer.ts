
import { Particle } from '@/types/particle';

export const drawParticle = (ctx: CanvasRenderingContext2D, particle: Particle, isDarkMode: boolean = true, backgroundType: string = 'none'): void => {
  const alpha = particle.life / particle.maxLife;
  
  // Apply background-specific rendering effects
  switch (backgroundType) {
    case 'cyberpunk':
      drawCyberpunkParticle(ctx, particle, alpha);
      break;
    
    case 'matrix':
      drawMatrixParticle(ctx, particle, alpha);
      break;
    
    case 'nebula':
      drawNebulaParticle(ctx, particle, alpha);
      break;
    
    case 'aurora':
      drawAuroraParticle(ctx, particle, alpha);
      break;
    
    case 'synthwave':
      drawSynthwaveParticle(ctx, particle, alpha);
      break;
    
    case 'ocean':
      drawOceanParticle(ctx, particle, alpha);
      break;
    
    default:
      drawDefaultParticle(ctx, particle, alpha, isDarkMode);
      break;
  }
};

const drawCyberpunkParticle = (ctx: CanvasRenderingContext2D, particle: Particle, alpha: number): void => {
  // Glowing effect with electric feel
  ctx.save();
  ctx.globalAlpha = alpha;
  
  // Outer glow
  const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size * 3);
  gradient.addColorStop(0, particle.color);
  gradient.addColorStop(1, 'transparent');
  
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
  ctx.fill();
  
  // Core particle
  ctx.fillStyle = particle.color;
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.restore();
};

const drawMatrixParticle = (ctx: CanvasRenderingContext2D, particle: Particle, alpha: number): void => {
  // Digital/pixelated effect
  ctx.save();
  ctx.globalAlpha = alpha;
  
  const size = Math.floor(particle.size) + 1;
  ctx.fillStyle = particle.color;
  ctx.fillRect(Math.floor(particle.x), Math.floor(particle.y), size, size);
  
  // Add trailing effect
  ctx.globalAlpha = alpha * 0.3;
  ctx.fillRect(Math.floor(particle.x), Math.floor(particle.y) - size, size, size * 2);
  
  ctx.restore();
};

const drawNebulaParticle = (ctx: CanvasRenderingContext2D, particle: Particle, alpha: number): void => {
  // Soft, cloudy effect
  ctx.save();
  ctx.globalAlpha = alpha * 0.7;
  
  const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size * 4);
  gradient.addColorStop(0, particle.color);
  gradient.addColorStop(0.5, particle.color + '88');
  gradient.addColorStop(1, 'transparent');
  
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, particle.size * 4, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.restore();
};

const drawAuroraParticle = (ctx: CanvasRenderingContext2D, particle: Particle, alpha: number): void => {
  // Flowing, wavy effect
  ctx.save();
  ctx.globalAlpha = alpha;
  
  const waveOffset = Math.sin(Date.now() * 0.005 + particle.x * 0.01) * 2;
  
  const gradient = ctx.createLinearGradient(
    particle.x - particle.size, particle.y + waveOffset,
    particle.x + particle.size, particle.y + waveOffset
  );
  gradient.addColorStop(0, 'transparent');
  gradient.addColorStop(0.5, particle.color);
  gradient.addColorStop(1, 'transparent');
  
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(particle.x, particle.y + waveOffset, particle.size * 2, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.restore();
};

const drawSynthwaveParticle = (ctx: CanvasRenderingContext2D, particle: Particle, alpha: number): void => {
  // Sharp, neon effect
  ctx.save();
  ctx.globalAlpha = alpha;
  
  // Outer glow
  ctx.shadowColor = particle.color;
  ctx.shadowBlur = particle.size * 2;
  
  ctx.fillStyle = particle.color;
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
  ctx.fill();
  
  // Reset shadow
  ctx.shadowBlur = 0;
  
  ctx.restore();
};

const drawOceanParticle = (ctx: CanvasRenderingContext2D, particle: Particle, alpha: number): void => {
  // Bubble-like effect with wave distortion
  ctx.save();
  ctx.globalAlpha = alpha * 0.8;
  
  const waveX = Math.sin(Date.now() * 0.003 + particle.y * 0.01) * 1;
  const waveY = Math.cos(Date.now() * 0.002 + particle.x * 0.01) * 1;
  
  const gradient = ctx.createRadialGradient(
    particle.x + waveX, particle.y + waveY, 0,
    particle.x + waveX, particle.y + waveY, particle.size * 2
  );
  gradient.addColorStop(0, particle.color + 'CC');
  gradient.addColorStop(1, 'transparent');
  
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(particle.x + waveX, particle.y + waveY, particle.size * 2, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.restore();
};

const drawDefaultParticle = (ctx: CanvasRenderingContext2D, particle: Particle, alpha: number, isDarkMode: boolean): void => {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = particle.color;
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
};
