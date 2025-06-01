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

export const updateParticle = (particle: Particle): Particle => {
  switch (particle.trackingType) {
    case 'comet':
      return {
        ...particle,
        x: particle.x + particle.vx,
        y: particle.y + particle.vy,
        life: particle.life - 1,
        vy: particle.vy + 0.005,
        vx: particle.vx * 0.995
      };
      
    case 'fireworks':
      return {
        ...particle,
        x: particle.x + particle.vx,
        y: particle.y + particle.vy,
        life: particle.life - 1,
        vy: particle.vy + 0.02, // More gravity
        vx: particle.vx * 0.98
      };
      
    case 'lightning':
      return {
        ...particle,
        x: particle.x + particle.vx + (Math.random() - 0.5) * 2, // Random jitter
        y: particle.y + particle.vy + (Math.random() - 0.5) * 2,
        life: particle.life - 2, // Faster decay
        vy: particle.vy * 0.95,
        vx: particle.vx * 0.95
      };
      
    case 'galaxy':
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const dx = particle.x - centerX;
      const dy = particle.y - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const spiralForce = 0.001;
      return {
        ...particle,
        x: particle.x + particle.vx - dy * spiralForce,
        y: particle.y + particle.vy + dx * spiralForce,
        life: particle.life - 1,
        vx: particle.vx * 0.999,
        vy: particle.vy * 0.999
      };
      
    case 'neon':
      return {
        ...particle,
        x: particle.x + particle.vx,
        y: particle.y + particle.vy,
        life: particle.life - 1,
        vy: particle.vy + 0.008,
        vx: particle.vx * 0.992
      };
      
    case 'watercolor':
      return {
        ...particle,
        x: particle.x + particle.vx + (Math.random() - 0.5) * 0.5, // Gentle drift
        y: particle.y + particle.vy + (Math.random() - 0.5) * 0.5,
        life: particle.life - 0.5, // Slower decay
        vy: particle.vy + 0.002,
        vx: particle.vx * 0.998
      };
      
    case 'geometric':
      return {
        ...particle,
        x: particle.x + particle.vx,
        y: particle.y + particle.vy,
        life: particle.life - 1,
        vy: particle.vy + 0.015,
        vx: particle.vx * 0.985
      };
      
    default: // 'subtle'
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

export const drawParticle = (ctx: CanvasRenderingContext2D, particle: Particle, isDarkMode: boolean = true): void => {
  const lifeRatio = particle.life / particle.maxLife;
  const alpha = Math.max(0, lifeRatio * particle.opacity);
  
  if (alpha <= 0.01) return;

  ctx.save();
  
  // Adjust hue and lightness based on dark mode
  const adjustedHue = particle.hue;
  const lightness = isDarkMode ? 70 : 45; // Lighter in dark mode, darker in light mode
  const saturation = isDarkMode ? 80 : 60; // More saturated in dark mode
  
  switch (particle.trackingType) {
    case 'comet':
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
      gradient.addColorStop(0, `hsla(${adjustedHue}, ${saturation}%, ${lightness - 10}%, 0)`);
      gradient.addColorStop(0.3, `hsla(${adjustedHue}, ${saturation + 10}%, ${lightness}%, ${alpha * 0.3})`);
      gradient.addColorStop(1, `hsla(${adjustedHue}, ${saturation + 20}%, ${lightness + 10}%, ${alpha * 0.8})`);
      
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
      ctx.fillStyle = `hsla(${adjustedHue}, ${saturation + 20}%, ${lightness + 20}%, ${alpha})`;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * 0.6, 0, Math.PI * 2);
      ctx.fill();
      break;
      
    case 'fireworks':
      // Bright explosive particles
      ctx.fillStyle = `hsla(${adjustedHue}, ${saturation + 20}%, ${lightness}%, ${alpha})`;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      
      // Outer glow
      const fireworkGradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.size * 3
      );
      fireworkGradient.addColorStop(0, `hsla(${adjustedHue}, ${saturation + 20}%, ${lightness + 10}%, ${alpha * 0.6})`);
      fireworkGradient.addColorStop(1, `hsla(${adjustedHue}, ${saturation}%, ${lightness - 10}%, 0)`);
      ctx.fillStyle = fireworkGradient;
      ctx.fill();
      break;
      
    case 'lightning':
      // Sharp electric lines
      ctx.strokeStyle = `hsla(${adjustedHue}, ${saturation + 20}%, ${lightness + 10}%, ${alpha})`;
      ctx.lineWidth = particle.size;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(particle.x - particle.vx * 3, particle.y - particle.vy * 3);
      ctx.lineTo(particle.x, particle.y);
      ctx.stroke();
      
      // Bright core
      ctx.fillStyle = `hsla(${adjustedHue}, ${saturation + 20}%, ${lightness + 25}%, ${alpha})`;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2);
      ctx.fill();
      break;
      
    case 'galaxy':
      // Swirling cosmic effect
      const galaxyGradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.size * 4
      );
      galaxyGradient.addColorStop(0, `hsla(${adjustedHue}, ${saturation}%, ${lightness}%, ${alpha})`);
      galaxyGradient.addColorStop(0.5, `hsla(${adjustedHue + 20}, ${saturation - 10}%, ${lightness - 10}%, ${alpha * 0.5})`);
      galaxyGradient.addColorStop(1, `hsla(${adjustedHue + 40}, ${saturation - 20}%, ${lightness - 20}%, 0)`);
      
      ctx.fillStyle = galaxyGradient;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
      ctx.fill();
      break;
      
    case 'neon':
      // Bright neon lines
      ctx.shadowColor = `hsl(${adjustedHue}, ${saturation + 20}%, ${lightness})`;
      ctx.shadowBlur = 10;
      ctx.strokeStyle = `hsla(${adjustedHue}, ${saturation + 20}%, ${lightness + 10}%, ${alpha})`;
      ctx.lineWidth = particle.size;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(particle.x - particle.vx * 5, particle.y - particle.vy * 5);
      ctx.lineTo(particle.x, particle.y);
      ctx.stroke();
      ctx.shadowBlur = 0;
      break;
      
    case 'watercolor':
      // Soft, blended paint effect
      const waterGradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.size * 2
      );
      const waterLightness = isDarkMode ? lightness - 10 : lightness + 20;
      waterGradient.addColorStop(0, `hsla(${adjustedHue}, ${saturation - 20}%, ${waterLightness}%, ${alpha * 0.3})`);
      waterGradient.addColorStop(0.7, `hsla(${adjustedHue + 30}, ${saturation - 30}%, ${waterLightness - 10}%, ${alpha * 0.2})`);
      waterGradient.addColorStop(1, `hsla(${adjustedHue + 60}, ${saturation - 40}%, ${waterLightness - 20}%, 0)`);
      
      ctx.fillStyle = waterGradient;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
      ctx.fill();
      break;
      
    case 'geometric':
      // Sharp geometric shapes
      ctx.fillStyle = `hsla(${adjustedHue}, ${saturation + 10}%, ${lightness - 10}%, ${alpha})`;
      ctx.beginPath();
      
      // Draw a rotating square
      const angle = (particle.maxLife - particle.life) * 0.1;
      const halfSize = particle.size;
      ctx.translate(particle.x, particle.y);
      ctx.rotate(angle);
      ctx.rect(-halfSize, -halfSize, halfSize * 2, halfSize * 2);
      ctx.fill();
      ctx.resetTransform();
      break;
      
    default: // 'subtle'
      // Default subtle particle rendering
      const glowMultiplier = 3;
      const coreMultiplier = 0.8;
      
      // Soft outer glow
      const subtleGradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.size * glowMultiplier
      );
      const subtleLightness = isDarkMode ? lightness + 10 : lightness - 15;
      subtleGradient.addColorStop(0, `hsla(${adjustedHue}, ${saturation - 20}%, ${subtleLightness}%, ${alpha * 0.4})`);
      subtleGradient.addColorStop(0.4, `hsla(${adjustedHue}, ${saturation - 10}%, ${subtleLightness - 20}%, ${alpha * 0.2})`);
      subtleGradient.addColorStop(1, `hsla(${adjustedHue}, ${saturation}%, ${subtleLightness - 40}%, 0)`);
      
      ctx.fillStyle = subtleGradient;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * glowMultiplier, 0, Math.PI * 2);
      ctx.fill();

      // Very subtle inner core
      ctx.fillStyle = `hsla(${adjustedHue}, ${saturation - 10}%, ${subtleLightness + 15}%, ${alpha * 0.6})`;
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
