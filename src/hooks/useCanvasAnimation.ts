
import { useRef, useEffect } from 'react';
import { Particle } from '@/types/particle';
import { updateParticle, drawParticle, isParticleAlive } from '@/utils/particleUtils';
import { clearCanvas } from '@/utils/canvasUtils';
import { useSettings } from '@/contexts/SettingsContext';
import { logDev } from '@/utils/logDev';

export const useCanvasAnimation = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  particlesRef: React.MutableRefObject<Particle[]>
) => {
  const animationRef = useRef<number>();
  const { isDarkMode, backgroundType, particleStyle } = useSettings();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      clearCanvas(ctx, canvas, isDarkMode);

      // Update and draw particles
      const activeParticles: Particle[] = [];
      
      for (const particle of particlesRef.current) {
        const updatedParticle = updateParticle(particle);
        
        if (isParticleAlive(updatedParticle)) {
          drawParticle(ctx, updatedParticle, isDarkMode, backgroundType, particleStyle);
          activeParticles.push(updatedParticle);
        }
      }
      
      particlesRef.current = activeParticles;
      animationRef.current = requestAnimationFrame(animate);
    };

    logDev('Starting animation with background:', backgroundType, 'particle style:', particleStyle);
    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [canvasRef, particlesRef, isDarkMode, backgroundType, particleStyle]);

  return animationRef;
};
