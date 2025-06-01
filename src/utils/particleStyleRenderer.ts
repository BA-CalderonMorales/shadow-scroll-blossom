
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
    case 'digital':
      drawDigitalParticle(ctx, particle, alpha, isDarkMode);
      break;
    case 'flame':
      drawFlameParticle(ctx, particle, alpha, isDarkMode);
      break;
    case 'electric':
      drawElectricParticle(ctx, particle, alpha, isDarkMode);
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
  ctx.save();
  
  // Multiple layered glows for extreme effect
  for (let i = 0; i < 3; i++) {
    const radius = particle.size * (3 + i * 2);
    const opacity = alpha * (0.4 - i * 0.1);
    
    const gradient = ctx.createRadialGradient(
      particle.x, particle.y, 0,
      particle.x, particle.y, radius
    );
    
    gradient.addColorStop(0, `${particle.color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`);
    gradient.addColorStop(0.3, `${particle.color}${Math.floor(opacity * 128).toString(16).padStart(2, '0')}`);
    gradient.addColorStop(1, `${particle.color}00`);
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Bright core
  ctx.fillStyle = '#ffffff';
  ctx.globalAlpha = alpha * 0.8;
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, particle.size * 0.3, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.restore();
};

const drawCrystallineParticle = (ctx: CanvasRenderingContext2D, particle: Particle, alpha: number, isDarkMode: boolean) => {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = particle.color;
  ctx.fillStyle = `${particle.color}40`;
  ctx.lineWidth = 2;
  
  const sides = 8;
  const angle = (Math.PI * 2) / sides;
  
  ctx.translate(particle.x, particle.y);
  ctx.rotate(particle.life * 0.05);
  
  // Outer crystal shape
  ctx.beginPath();
  for (let i = 0; i < sides; i++) {
    const radius = i % 2 === 0 ? particle.size * 2 : particle.size * 1.2;
    const x = Math.cos(i * angle) * radius;
    const y = Math.sin(i * angle) * radius;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  
  // Inner facets
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1;
  for (let i = 0; i < sides; i += 2) {
    const x1 = Math.cos(i * angle) * particle.size * 0.5;
    const y1 = Math.sin(i * angle) * particle.size * 0.5;
    const x2 = Math.cos((i + 4) * angle) * particle.size * 0.5;
    const y2 = Math.sin((i + 4) * angle) * particle.size * 0.5;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
  
  ctx.restore();
};

const drawPlasmaParticle = (ctx: CanvasRenderingContext2D, particle: Particle, alpha: number, isDarkMode: boolean) => {
  ctx.save();
  
  const time = Date.now() * 0.01;
  const pulse1 = Math.sin(time + particle.x * 0.01) * 0.5 + 0.7;
  const pulse2 = Math.cos(time * 1.3 + particle.y * 0.01) * 0.3 + 0.8;
  
  // Turbulent plasma effect
  const gradient = ctx.createRadialGradient(
    particle.x + Math.sin(time) * 2, particle.y + Math.cos(time * 1.2) * 2, 0,
    particle.x, particle.y, particle.size * 4
  );
  
  gradient.addColorStop(0, `#ffffff${Math.floor(alpha * 255 * pulse1).toString(16).padStart(2, '0')}`);
  gradient.addColorStop(0.2, `${particle.color}${Math.floor(alpha * 220 * pulse2).toString(16).padStart(2, '0')}`);
  gradient.addColorStop(0.5, `${particle.color}${Math.floor(alpha * 150 * pulse1).toString(16).padStart(2, '0')}`);
  gradient.addColorStop(1, `${particle.color}00`);
  
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, particle.size * 4, 0, Math.PI * 2);
  ctx.fill();
  
  // Plasma tendrils
  if (Math.random() < 0.4) {
    ctx.strokeStyle = `${particle.color}${Math.floor(alpha * 180).toString(16).padStart(2, '0')}`;
    ctx.lineWidth = particle.size * 0.3;
    ctx.lineCap = 'round';
    
    for (let i = 0; i < 3; i++) {
      const angle = (Math.PI * 2 * i) / 3 + time;
      const length = particle.size * (2 + Math.sin(time + i) * 1.5);
      ctx.beginPath();
      ctx.moveTo(particle.x, particle.y);
      ctx.lineTo(
        particle.x + Math.cos(angle) * length,
        particle.y + Math.sin(angle) * length
      );
      ctx.stroke();
    }
  }
  
  ctx.restore();
};

const drawStardustParticle = (ctx: CanvasRenderingContext2D, particle: Particle, alpha: number, isDarkMode: boolean) => {
  ctx.save();
  
  const twinkle = Math.sin(Date.now() * 0.02 + particle.x) * 0.7 + 0.3;
  ctx.globalAlpha = alpha * twinkle;
  
  // Star burst pattern
  const spikes = 12;
  const outerRadius = particle.size * 2;
  const innerRadius = particle.size * 0.6;
  
  ctx.translate(particle.x, particle.y);
  ctx.rotate(particle.life * 0.08);
  
  // Outer glow
  const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, outerRadius * 2);
  gradient.addColorStop(0, `${particle.color}${Math.floor(alpha * 150).toString(16).padStart(2, '0')}`);
  gradient.addColorStop(0.5, `${particle.color}60`);
  gradient.addColorStop(1, `${particle.color}00`);
  
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(0, 0, outerRadius * 2, 0, Math.PI * 2);
  ctx.fill();
  
  // Star shape
  ctx.fillStyle = particle.color;
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
  
  // Bright center
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(0, 0, particle.size * 0.3, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.restore();
};

const drawEnergyParticle = (ctx: CanvasRenderingContext2D, particle: Particle, alpha: number, isDarkMode: boolean) => {
  ctx.save();
  
  const time = Date.now() * 0.02;
  const energy = Math.sin(time + particle.x * 0.01) * 0.5 + 0.6;
  
  // Pulsing energy core
  const coreGradient = ctx.createRadialGradient(
    particle.x, particle.y, 0,
    particle.x, particle.y, particle.size * 3
  );
  
  coreGradient.addColorStop(0, `#ffffff${Math.floor(alpha * 255 * energy).toString(16).padStart(2, '0')}`);
  coreGradient.addColorStop(0.2, `${particle.color}${Math.floor(alpha * 220).toString(16).padStart(2, '0')}`);
  coreGradient.addColorStop(0.6, `${particle.color}${Math.floor(alpha * 120).toString(16).padStart(2, '0')}`);
  coreGradient.addColorStop(1, `${particle.color}00`);
  
  ctx.fillStyle = coreGradient;
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
  ctx.fill();
  
  // Energy rings
  for (let i = 1; i <= 3; i++) {
    const ringAlpha = alpha * (0.6 - i * 0.15) * energy;
    const ringRadius = particle.size * (1 + i * 1.5);
    
    ctx.strokeStyle = `${particle.color}${Math.floor(ringAlpha * 255).toString(16).padStart(2, '0')}`;
    ctx.lineWidth = particle.size * 0.2;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, ringRadius, 0, Math.PI * 2);
    ctx.stroke();
  }
  
  ctx.restore();
};

const drawEtherealParticle = (ctx: CanvasRenderingContext2D, particle: Particle, alpha: number, isDarkMode: boolean) => {
  ctx.save();
  
  const time = Date.now() * 0.003;
  const flow = Math.sin(time + particle.x * 0.005) * 0.4 + 0.6;
  
  // Ghostly wisp effect
  ctx.globalAlpha = alpha * 0.7 * flow;
  ctx.shadowColor = particle.color;
  ctx.shadowBlur = particle.size * 4;
  
  // Multiple overlapping wisps
  for (let i = 0; i < 4; i++) {
    const offsetX = Math.sin(time + i) * particle.size * 2;
    const offsetY = Math.cos(time * 0.7 + i) * particle.size * 1.5;
    
    const gradient = ctx.createRadialGradient(
      particle.x + offsetX, particle.y + offsetY, 0,
      particle.x + offsetX, particle.y + offsetY, particle.size * 6
    );
    
    gradient.addColorStop(0, `${particle.color}${Math.floor(alpha * 80 * flow).toString(16).padStart(2, '0')}`);
    gradient.addColorStop(0.4, `${particle.color}${Math.floor(alpha * 40 * flow).toString(16).padStart(2, '0')}`);
    gradient.addColorStop(1, `${particle.color}00`);
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(particle.x + offsetX, particle.y + offsetY, particle.size * 6, 0, Math.PI * 2);
    ctx.fill();
  }
  
  ctx.shadowBlur = 0;
  ctx.restore();
};

const drawDigitalParticle = (ctx: CanvasRenderingContext2D, particle: Particle, alpha: number, isDarkMode: boolean) => {
  ctx.save();
  ctx.globalAlpha = alpha;
  
  // Pixelated square pattern
  const pixelSize = particle.size * 0.8;
  const gridSize = 5;
  
  ctx.translate(particle.x, particle.y);
  ctx.rotate(particle.life * 0.02);
  
  // Digital grid
  ctx.fillStyle = particle.color;
  for (let x = -gridSize; x <= gridSize; x++) {
    for (let y = -gridSize; y <= gridSize; y++) {
      if (Math.random() < 0.7) {
        const pixelX = x * pixelSize;
        const pixelY = y * pixelSize;
        const distance = Math.sqrt(pixelX * pixelX + pixelY * pixelY);
        
        if (distance < particle.size * 3) {
          ctx.globalAlpha = alpha * (1 - distance / (particle.size * 3));
          ctx.fillRect(pixelX - pixelSize/2, pixelY - pixelSize/2, pixelSize, pixelSize);
        }
      }
    }
  }
  
  // Binary numbers
  ctx.globalAlpha = alpha * 0.8;
  ctx.fillStyle = '#ffffff';
  ctx.font = `${particle.size}px monospace`;
  ctx.textAlign = 'center';
  const binary = Math.random() < 0.5 ? '1' : '0';
  ctx.fillText(binary, 0, particle.size * 0.3);
  
  ctx.restore();
};

const drawFlameParticle = (ctx: CanvasRenderingContext2D, particle: Particle, alpha: number, isDarkMode: boolean) => {
  ctx.save();
  
  const time = Date.now() * 0.02;
  const flicker = Math.sin(time + particle.x * 0.1) * 0.3 + 0.7;
  
  // Flame gradient from yellow to red
  const gradient = ctx.createRadialGradient(
    particle.x, particle.y + particle.size, 0,
    particle.x, particle.y - particle.size, particle.size * 4
  );
  
  gradient.addColorStop(0, `#ffff00${Math.floor(alpha * 255 * flicker).toString(16).padStart(2, '0')}`);
  gradient.addColorStop(0.3, `#ff8800${Math.floor(alpha * 200 * flicker).toString(16).padStart(2, '0')}`);
  gradient.addColorStop(0.6, `#ff0000${Math.floor(alpha * 150 * flicker).toString(16).padStart(2, '0')}`);
  gradient.addColorStop(1, `#aa0000${Math.floor(alpha * 50 * flicker).toString(16).padStart(2, '0')}`);
  
  // Flame shape
  ctx.fillStyle = gradient;
  ctx.beginPath();
  
  const flameHeight = particle.size * 4;
  const flameWidth = particle.size * 2;
  
  // Create flame-like shape with curves
  ctx.moveTo(particle.x - flameWidth/2, particle.y + particle.size);
  ctx.quadraticCurveTo(
    particle.x - flameWidth/3 + Math.sin(time) * 2, 
    particle.y, 
    particle.x + Math.sin(time * 2) * 3, 
    particle.y - flameHeight/2
  );
  ctx.quadraticCurveTo(
    particle.x + Math.sin(time * 1.5) * 2, 
    particle.y - flameHeight * 0.8, 
    particle.x, 
    particle.y - flameHeight
  );
  ctx.quadraticCurveTo(
    particle.x - Math.sin(time * 1.5) * 2, 
    particle.y - flameHeight * 0.8, 
    particle.x - Math.sin(time * 2) * 3, 
    particle.y - flameHeight/2
  );
  ctx.quadraticCurveTo(
    particle.x + flameWidth/3 - Math.sin(time) * 2, 
    particle.y, 
    particle.x + flameWidth/2, 
    particle.y + particle.size
  );
  
  ctx.closePath();
  ctx.fill();
  
  ctx.restore();
};

const drawElectricParticle = (ctx: CanvasRenderingContext2D, particle: Particle, alpha: number, isDarkMode: boolean) => {
  ctx.save();
  
  // Electric core
  ctx.globalAlpha = alpha;
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2);
  ctx.fill();
  
  // Electric arcs
  ctx.strokeStyle = `#00ffff${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  
  const arcCount = 6;
  for (let i = 0; i < arcCount; i++) {
    const angle = (Math.PI * 2 * i) / arcCount + Date.now() * 0.01;
    const length = particle.size * (3 + Math.random() * 2);
    
    ctx.beginPath();
    ctx.moveTo(particle.x, particle.y);
    
    // Jagged electric arc
    const segments = 8;
    for (let j = 1; j <= segments; j++) {
      const progress = j / segments;
      const baseX = particle.x + Math.cos(angle) * length * progress;
      const baseY = particle.y + Math.sin(angle) * length * progress;
      const jitterX = (Math.random() - 0.5) * particle.size * 2 * progress;
      const jitterY = (Math.random() - 0.5) * particle.size * 2 * progress;
      
      ctx.lineTo(baseX + jitterX, baseY + jitterY);
    }
    ctx.stroke();
  }
  
  // Electric glow
  const glowGradient = ctx.createRadialGradient(
    particle.x, particle.y, 0,
    particle.x, particle.y, particle.size * 6
  );
  glowGradient.addColorStop(0, `#00ffff${Math.floor(alpha * 100).toString(16).padStart(2, '0')}`);
  glowGradient.addColorStop(0.5, `#0088ff${Math.floor(alpha * 60).toString(16).padStart(2, '0')}`);
  glowGradient.addColorStop(1, `#0088ff00`);
  
  ctx.fillStyle = glowGradient;
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, particle.size * 6, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.restore();
};
