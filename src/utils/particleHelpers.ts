
import { Particle } from '@/types/particle';

export const isParticleAlive = (particle: Particle): boolean => {
  const lifeRatio = particle.life / particle.maxLife;
  const alpha = Math.max(0, lifeRatio * particle.opacity);
  return alpha > 0.01;
};
