import { Particle } from '@/types/particle';
import { drawStyledParticle } from './particleStyleRenderer';

export const drawParticle = (ctx: CanvasRenderingContext2D, particle: Particle, isDarkMode: boolean = true, backgroundType: string = 'none', particleStyle: string = 'default') => {
  // Use the new styled particle renderer
  drawStyledParticle(ctx, particle, isDarkMode, backgroundType, particleStyle);
  
  // Background-specific enhancements
  if (backgroundType !== 'none') {
    drawBackgroundSpecificEffects(ctx, particle, backgroundType, isDarkMode);
  }
};

const drawBackgroundSpecificEffects = (ctx: CanvasRenderingContext2D, particle: Particle, backgroundType: string, isDarkMode: boolean): void => {
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
  ctx.save();
  ctx.globalAlpha = alpha;
  
  // Electric glow effect with multiple layers
  const gradient1 = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size * 6);
  gradient1.addColorStop(0, particle.color + 'FF');
  gradient1.addColorStop(0.3, particle.color + '88');
  gradient1.addColorStop(1, 'transparent');
  
  ctx.fillStyle = gradient1;
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, particle.size * 6, 0, Math.PI * 2);
  ctx.fill();
  
  // Inner bright core
  const gradient2 = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size * 2);
  gradient2.addColorStop(0, '#ffffff');
  gradient2.addColorStop(0.5, particle.color);
  gradient2.addColorStop(1, 'transparent');
  
  ctx.fillStyle = gradient2;
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
  ctx.fill();
  
  // Electric sparks
  if (Math.random() < 0.3) {
    ctx.strokeStyle = particle.color + 'AA';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = 0; i < 3; i++) {
      const angle = Math.random() * Math.PI * 2;
      const length = particle.size * (2 + Math.random() * 3);
      ctx.moveTo(particle.x, particle.y);
      ctx.lineTo(
        particle.x + Math.cos(angle) * length,
        particle.y + Math.sin(angle) * length
      );
    }
    ctx.stroke();
  }
  
  ctx.restore();
};

const drawMatrixParticle = (ctx: CanvasRenderingContext2D, particle: Particle, alpha: number): void => {
  ctx.save();
  ctx.globalAlpha = alpha;
  
  // Digital rain effect with trailing
  const chars = '01';
  const char = chars[Math.floor(Math.random() * chars.length)];
  
  ctx.font = `${particle.size * 3}px monospace`;
  ctx.fillStyle = particle.color;
  ctx.fillText(char, particle.x - particle.size, particle.y);
  
  // Digital trail effect
  for (let i = 1; i <= 8; i++) {
    ctx.globalAlpha = alpha * (1 - i * 0.12);
    const trailChar = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(
      trailChar,
      particle.x - particle.size + (Math.random() - 0.5) * 2,
      particle.y - i * particle.size * 2
    );
  }
  
  ctx.restore();
};

const drawNebulaParticle = (ctx: CanvasRenderingContext2D, particle: Particle, alpha: number): void => {
  ctx.save();
  ctx.globalAlpha = alpha * 0.8;
  
  // Cosmic dust effect with swirling
  const time = Date.now() * 0.001;
  const swirl = Math.sin(time + particle.x * 0.01) * 0.5;
  
  const gradient = ctx.createRadialGradient(
    particle.x + swirl, particle.y, 0,
    particle.x + swirl, particle.y, particle.size * 8
  );
  gradient.addColorStop(0, particle.color + 'AA');
  gradient.addColorStop(0.4, particle.color + '44');
  gradient.addColorStop(1, 'transparent');
  
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(particle.x + swirl, particle.y, particle.size * 8, 0, Math.PI * 2);
  ctx.fill();
  
  // Star-like sparkles
  if (Math.random() < 0.1) {
    ctx.fillStyle = '#ffffff';
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size * 0.3, 0, Math.PI * 2);
    ctx.fill();
  }
  
  ctx.restore();
};

const drawAuroraParticle = (ctx: CanvasRenderingContext2D, particle: Particle, alpha: number): void => {
  ctx.save();
  ctx.globalAlpha = alpha;
  
  // Flowing aurora effect
  const time = Date.now() * 0.003;
  const wave1 = Math.sin(time + particle.x * 0.02) * 3;
  const wave2 = Math.cos(time * 0.7 + particle.y * 0.015) * 2;
  
  const gradient = ctx.createLinearGradient(
    particle.x - particle.size * 4, particle.y + wave1,
    particle.x + particle.size * 4, particle.y + wave2
  );
  gradient.addColorStop(0, 'transparent');
  gradient.addColorStop(0.2, particle.color + '66');
  gradient.addColorStop(0.5, particle.color + 'CC');
  gradient.addColorStop(0.8, particle.color + '66');
  gradient.addColorStop(1, 'transparent');
  
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.ellipse(
    particle.x, particle.y + (wave1 + wave2) * 0.5,
    particle.size * 4, particle.size * 1.5,
    Math.sin(time) * 0.3, 0, Math.PI * 2
  );
  ctx.fill();
  
  ctx.restore();
};

const drawSynthwaveParticle = (ctx: CanvasRenderingContext2D, particle: Particle, alpha: number): void => {
  ctx.save();
  ctx.globalAlpha = alpha;
  
  // Neon glow with sharp edges
  ctx.shadowColor = particle.color;
  ctx.shadowBlur = particle.size * 4;
  
  // Outer glow
  const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size * 3);
  gradient.addColorStop(0, particle.color + 'FF');
  gradient.addColorStop(0.5, particle.color + '88');
  gradient.addColorStop(1, 'transparent');
  
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
  ctx.fill();
  
  // Sharp neon core
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2);
  ctx.fill();
  
  // Neon trails
  if (particle.vx !== 0 || particle.vy !== 0) {
    ctx.strokeStyle = particle.color + '66';
    ctx.lineWidth = particle.size * 0.5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(particle.x, particle.y);
    ctx.lineTo(particle.x - particle.vx * 10, particle.y - particle.vy * 10);
    ctx.stroke();
  }
  
  ctx.shadowBlur = 0;
  ctx.restore();
};

const drawOceanParticle = (ctx: CanvasRenderingContext2D, particle: Particle, alpha: number): void => {
  ctx.save();
  ctx.globalAlpha = alpha * 0.9;
  
  // Bubble-like effect with wave distortion
  const time = Date.now() * 0.002;
  const waveX = Math.sin(time + particle.y * 0.01) * 2;
  const waveY = Math.cos(time * 0.8 + particle.x * 0.01) * 1.5;
  
  // Bubble with refraction
  const gradient = ctx.createRadialGradient(
    particle.x + waveX - particle.size * 0.3,
    particle.y + waveY - particle.size * 0.3,
    0,
    particle.x + waveX,
    particle.y + waveY,
    particle.size * 3
  );
  gradient.addColorStop(0, '#ffffff44');
  gradient.addColorStop(0.3, particle.color + 'AA');
  gradient.addColorStop(0.7, particle.color + '44');
  gradient.addColorStop(1, 'transparent');
  
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(particle.x + waveX, particle.y + waveY, particle.size * 3, 0, Math.PI * 2);
  ctx.fill();
  
  // Highlight on bubble
  ctx.fillStyle = '#ffffff66';
  ctx.beginPath();
  ctx.arc(
    particle.x + waveX - particle.size * 0.5,
    particle.y + waveY - particle.size * 0.5,
    particle.size * 0.7, 0, Math.PI * 2
  );
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
