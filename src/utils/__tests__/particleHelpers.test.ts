import { isParticleAlive } from '../particleHelpers';
import { Particle } from '@/types/particle';

const createTestParticle = (overrides?: Partial<Particle>): Particle => ({
  x: 100,
  y: 100,
  vx: 1,
  vy: 1,
  life: 1.0,
  maxLife: 1.0,
  size: 2,
  hue: 180,
  opacity: 1.0,
  trackingType: 'subtle',
  color: '#ffffff',
  trail: [],
  energy: 0.5,
  ...overrides,
});

describe('Particle Helpers', () => {
  describe('isParticleAlive', () => {
    it('should return true for a particle with full life and opacity', () => {
      const particle = createTestParticle({ life: 1.0, maxLife: 1.0, opacity: 1.0 });
      
      expect(isParticleAlive(particle)).toBe(true);
    });

    it('should return true for a particle with half life and full opacity', () => {
      const particle = createTestParticle({ life: 0.5, maxLife: 1.0, opacity: 1.0 });
      
      expect(isParticleAlive(particle)).toBe(true);
    });

    it('should return true for a particle with low but viable life', () => {
      const particle = createTestParticle({ life: 0.02, maxLife: 1.0, opacity: 1.0 });
      
      // lifeRatio = 0.02, alpha = 0.02 * 1.0 = 0.02 > 0.01
      expect(isParticleAlive(particle)).toBe(true);
    });

    it('should return false for a particle with life exactly at threshold', () => {
      const particle = createTestParticle({ life: 0.01, maxLife: 1.0, opacity: 1.0 });
      
      // lifeRatio = 0.01, alpha = 0.01 * 1.0 = 0.01, which is not > 0.01
      expect(isParticleAlive(particle)).toBe(false);
    });

    it('should return false for a particle with life below threshold', () => {
      const particle = createTestParticle({ life: 0.005, maxLife: 1.0, opacity: 1.0 });
      
      // lifeRatio = 0.005, alpha = 0.005 * 1.0 = 0.005 < 0.01
      expect(isParticleAlive(particle)).toBe(false);
    });

    it('should return false for a particle with zero life', () => {
      const particle = createTestParticle({ life: 0, maxLife: 1.0, opacity: 1.0 });
      
      expect(isParticleAlive(particle)).toBe(false);
    });

    it('should return false for a particle with negative life', () => {
      const particle = createTestParticle({ life: -0.1, maxLife: 1.0, opacity: 1.0 });
      
      // Math.max(0, negative * opacity) = 0
      expect(isParticleAlive(particle)).toBe(false);
    });

    it('should handle particles with different maxLife values', () => {
      const particle1 = createTestParticle({ life: 0.5, maxLife: 2.0, opacity: 1.0 });
      const particle2 = createTestParticle({ life: 0.5, maxLife: 0.5, opacity: 1.0 });
      
      // particle1: lifeRatio = 0.5/2.0 = 0.25, alpha = 0.25 > 0.01
      expect(isParticleAlive(particle1)).toBe(true);
      
      // particle2: lifeRatio = 0.5/0.5 = 1.0, alpha = 1.0 > 0.01
      expect(isParticleAlive(particle2)).toBe(true);
    });

    it('should handle particles with different opacity values', () => {
      const particle1 = createTestParticle({ life: 0.1, maxLife: 1.0, opacity: 0.5 });
      const particle2 = createTestParticle({ life: 0.1, maxLife: 1.0, opacity: 0.05 });
      
      // particle1: alpha = 0.1 * 0.5 = 0.05 > 0.01
      expect(isParticleAlive(particle1)).toBe(true);
      
      // particle2: alpha = 0.1 * 0.05 = 0.005 < 0.01
      expect(isParticleAlive(particle2)).toBe(false);
    });

    it('should handle particles with zero opacity', () => {
      const particle = createTestParticle({ life: 1.0, maxLife: 1.0, opacity: 0 });
      
      // alpha = 1.0 * 0 = 0 < 0.01
      expect(isParticleAlive(particle)).toBe(false);
    });

    it('should handle edge case where life equals maxLife', () => {
      const particle = createTestParticle({ life: 2.0, maxLife: 2.0, opacity: 1.0 });
      
      // lifeRatio = 2.0/2.0 = 1.0, alpha = 1.0 > 0.01
      expect(isParticleAlive(particle)).toBe(true);
    });

    it('should handle edge case where life exceeds maxLife', () => {
      const particle = createTestParticle({ life: 1.5, maxLife: 1.0, opacity: 1.0 });
      
      // lifeRatio = 1.5/1.0 = 1.5, alpha = 1.5 > 0.01
      expect(isParticleAlive(particle)).toBe(true);
    });

    it('should handle very small maxLife values', () => {
      const particle = createTestParticle({ life: 0.001, maxLife: 0.001, opacity: 1.0 });
      
      // lifeRatio = 0.001/0.001 = 1.0, alpha = 1.0 > 0.01
      expect(isParticleAlive(particle)).toBe(true);
    });

    it('should be consistent with threshold boundary conditions', () => {
      // Test particles right at the boundary
      const particleJustAlive = createTestParticle({ life: 0.011, maxLife: 1.0, opacity: 1.0 });
      const particleJustDead = createTestParticle({ life: 0.009, maxLife: 1.0, opacity: 1.0 });
      
      expect(isParticleAlive(particleJustAlive)).toBe(true);
      expect(isParticleAlive(particleJustDead)).toBe(false);
    });

    it('should handle complex scenarios with fractional values', () => {
      const particle = createTestParticle({ life: 0.03, maxLife: 2.5, opacity: 0.7 });
      
      // lifeRatio = 0.03/2.5 = 0.012, alpha = 0.012 * 0.7 = 0.0084 < 0.01
      expect(isParticleAlive(particle)).toBe(false);
    });
  });
});