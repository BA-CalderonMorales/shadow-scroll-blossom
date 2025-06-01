
import { useRef, useEffect } from 'react';
import { Particle } from '@/types/particle';
import { updateParticle, drawParticle, isParticleAlive } from '@/utils/particleUtils';
import { clearCanvas } from '@/utils/canvasUtils';

export const useCanvasAnimation = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  particlesRef: React.MutableRefObject<Particle[]>
) => {
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      clearCanvas(ctx, canvas);

      // Update and draw particles
      const activeParticles: Particle[] = [];
      
      for (const particle of particlesRef.current) {
        const updatedParticle = updateParticle(particle);
        
        if (isParticleAlive(updatedParticle)) {
          drawParticle(ctx, updatedParticle);
          activeParticles.push(updatedParticle);
        }
      }
      
      particlesRef.current = activeParticles;
      animationRef.current = requestAnimationFrame(animate);
    };

    console.log('Starting animation');
    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [canvasRef, particlesRef]);

  return animationRef;
};
