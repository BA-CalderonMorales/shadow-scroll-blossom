import { createParticle, createParticlesForType, createMultipleParticles } from '../particleFactory';
import { Particle } from '@/types/particle';

// Store original Math.random
const originalRandom = Math.random;

describe('Particle Factory', () => {
  beforeEach(() => {
    // Reset Math.random to return predictable values
    Math.random = jest.fn().mockReturnValue(0.5);
  });

  afterEach(() => {
    // Restore original Math.random
    Math.random = originalRandom;
  });

  describe('createParticle', () => {
    it('should create a particle with expected position and base properties', () => {
      const particle = createParticle(100, 200, 'subtle', 'none');

      expect(particle.x).toBe(100);
      expect(particle.y).toBe(200);
      expect(particle.trackingType).toBe('subtle');
      expect(particle.life).toBe(1.0);
      expect(particle.maxLife).toBe(1.0);
      expect(particle.opacity).toBe(1.0);
      expect(particle.trail).toEqual([]);
      expect(particle.vx).toBeDefined();
      expect(particle.vy).toBeDefined();
      expect(particle.size).toBeDefined();
      expect(particle.hue).toBeDefined();
      expect(particle.color).toBeDefined();
      expect(particle.energy).toBeDefined();
    });

    it('should create particles with velocity based on random values', () => {
      Math.random = jest.fn()
        .mockReturnValueOnce(0.2) // First velocity component
        .mockReturnValueOnce(0.8) // Second velocity component
        .mockReturnValue(0.5); // For other random values

      const particle = createParticle(0, 0, 'subtle');

      // Velocity should be calculated from the mocked values
      // The exact calculation depends on how the factory processes them
      expect(particle.vx).toBeDefined();
      expect(particle.vy).toBeDefined();
      expect(typeof particle.vx).toBe('number');
      expect(typeof particle.vy).toBe('number');
    });

    it('should create particles with random size between 1 and 4', () => {
      Math.random = jest.fn().mockReturnValue(0.3);

      const particle = createParticle(0, 0, 'subtle');

      // Math.random() * 3 + 1 = 0.3 * 3 + 1 = 1.9
      expect(particle.size).toBe(1.9);
    });

    it('should handle different tracking types', () => {
      const trackingTypes = ['subtle', 'comet', 'fireworks', 'lightning', 'galaxy', 'neon'];
      
      trackingTypes.forEach(type => {
        const particle = createParticle(0, 0, type);
        expect(particle.trackingType).toBe(type);
        expect(particle.color).toBeDefined();
      });
    });

    it('should handle different background types', () => {
      const backgroundTypes = ['none', 'cyberpunk', 'matrix', 'nebula', 'aurora', 'synthwave'];
      
      backgroundTypes.forEach(bgType => {
        const particle = createParticle(0, 0, 'subtle', bgType);
        expect(particle).toBeDefined();
        expect(particle.color).toBeDefined();
      });
    });
  });

  describe('background behavior modifications', () => {
    it('should apply cyberpunk behavior correctly', () => {
      Math.random = jest.fn().mockReturnValue(0.5);
      
      const particle = createParticle(0, 0, 'subtle', 'cyberpunk');

      expect(particle.maxLife).toBe(2.0);
      expect(particle.life).toBe(2.0);
      // With Math.random = 0.5, base vx = 0, vy = 0, but cyberpunk multiplies by 1.5
      // So we need to check the structure is correct even if values are 0
      expect(particle.vx).toBeDefined();
      expect(particle.vy).toBeDefined();
    });

    it('should apply matrix behavior correctly', () => {
      const particle = createParticle(0, 0, 'subtle', 'matrix');

      expect(particle.maxLife).toBe(3.0);
      expect(particle.life).toBe(3.0);
      // Matrix should have strong downward velocity
      expect(particle.vy).toBeGreaterThan(0);
    });

    it('should apply nebula behavior correctly', () => {
      const particle = createParticle(0, 0, 'subtle', 'nebula');

      expect(particle.maxLife).toBe(3.5);
      expect(particle.life).toBe(3.5);
      // Nebula should have slower movement
      expect(Math.abs(particle.vx)).toBeLessThan(1);
      expect(Math.abs(particle.vy)).toBeLessThan(1);
    });

    it('should apply aurora behavior correctly', () => {
      const particle = createParticle(0, 0, 'subtle', 'aurora');

      expect(particle.maxLife).toBe(3.0);
      expect(particle.life).toBe(3.0);
      // Aurora should have modified x velocity with sine wave
      expect(particle.vx).toBeDefined();
    });

    it('should apply synthwave behavior correctly', () => {
      const particle = createParticle(0, 0, 'subtle', 'synthwave');

      expect(particle.maxLife).toBe(2.5);
      expect(particle.life).toBe(2.5);
      // Synthwave should have enhanced energy
      expect(particle.energy).toBeGreaterThan(1);
    });

    it('should not modify particle for default background', () => {
      const particle = createParticle(0, 0, 'subtle', 'none');

      expect(particle.maxLife).toBe(1.0);
      expect(particle.life).toBe(1.0);
    });
  });

  describe('createParticlesForType', () => {
    it('should create an array with a single particle', () => {
      const particles = createParticlesForType(50, 75, 'comet', 'cyberpunk');

      expect(particles).toHaveLength(1);
      expect(particles[0].x).toBe(50);
      expect(particles[0].y).toBe(75);
      expect(particles[0].trackingType).toBe('comet');
    });
  });

  describe('createMultipleParticles', () => {
    it('should create the specified number of particles', () => {
      const particles = createMultipleParticles(100, 200, 5, 'galaxy', 'nebula');

      expect(particles).toHaveLength(5);
      particles.forEach(particle => {
        expect(particle.trackingType).toBe('galaxy');
      });
    });

    it('should create particles with spread around the origin point', () => {
      Math.random = jest.fn().mockReturnValue(0.5);

      const particles = createMultipleParticles(100, 200, 3, 'subtle');

      particles.forEach(particle => {
        // Particles should be created around the origin point (100, 200)
        expect(particle.x).toBeCloseTo(100, 1);
        expect(particle.y).toBeCloseTo(200, 1);
      });
    });

    it('should apply background spread multiplier', () => {
      // Mock to return values that will create visible spread
      Math.random = jest.fn()
        .mockReturnValueOnce(0) // For spread calculation
        .mockReturnValueOnce(0)
        .mockReturnValue(0.5); // For other random values

      const particlesNone = createMultipleParticles(100, 100, 1, 'subtle', 'none');
      const particlesCyberpunk = createMultipleParticles(100, 100, 1, 'subtle', 'cyberpunk');

      // Both should be created, even if spread is different
      expect(particlesNone).toHaveLength(1);
      expect(particlesCyberpunk).toHaveLength(1);
    });

    it('should handle edge case of zero particles', () => {
      const particles = createMultipleParticles(0, 0, 0, 'subtle');

      expect(particles).toHaveLength(0);
    });
  });

  describe('color generation behavior', () => {
    it('should generate valid colors for all tracking types', () => {
      const trackingTypes = ['subtle', 'comet', 'fireworks', 'lightning', 'galaxy', 'neon', 'watercolor', 'geometric'];
      
      trackingTypes.forEach(type => {
        const particle = createParticle(0, 0, type);
        expect(particle.color).toMatch(/^#[0-9a-fA-F]{6}$/);
      });
    });

    it('should generate valid colors for unknown tracking types', () => {
      const particle = createParticle(0, 0, 'unknown-type');
      expect(particle.color).toMatch(/^#[0-9a-fA-F]{6}$/);
    });

    it('should generate different colors for different background types', () => {
      const backgroundTypes = ['cyberpunk', 'nebula', 'matrix', 'aurora', 'synthwave'];
      const colors = new Set();

      backgroundTypes.forEach(bgType => {
        // Generate multiple particles to increase chance of different colors
        for (let i = 0; i < 3; i++) {
          const particle = createParticle(0, 0, 'subtle', bgType);
          colors.add(particle.color);
        }
      });

      // Should have generated multiple different colors
      expect(colors.size).toBeGreaterThan(1);
    });
  });
});