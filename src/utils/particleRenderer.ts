
import { Particle } from '@/types/particle';

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
