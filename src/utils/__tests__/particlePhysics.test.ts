import { updateParticle } from '../particlePhysics';
import { Particle } from '@/types/particle';

// Mock window dimensions for galaxy test
Object.defineProperty(window, 'innerWidth', {
  writable: true,
  configurable: true,
  value: 1024,
});

Object.defineProperty(window, 'innerHeight', {
  writable: true,
  configurable: true,
  value: 768,
});

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

describe('Particle Physics', () => {
  describe('updateParticle', () => {
    describe('subtle tracking', () => {
      it('should update position based on velocity', () => {
        const particle = createTestParticle({ x: 50, y: 60, vx: 2, vy: 3 });
        const updated = updateParticle(particle);

        expect(updated.x).toBe(52); // 50 + 2
        expect(updated.y).toBe(63); // 60 + 3
      });

      it('should decrease life by 0.02', () => {
        const particle = createTestParticle({ life: 1.0 });
        const updated = updateParticle(particle);

        expect(updated.life).toBe(0.98);
      });

      it('should apply gravity to vertical velocity', () => {
        const particle = createTestParticle({ vy: 1 });
        const updated = updateParticle(particle);

        expect(updated.vy).toBe(1.01); // 1 + 0.01 gravity
      });

      it('should apply friction to horizontal velocity', () => {
        const particle = createTestParticle({ vx: 2 });
        const updated = updateParticle(particle);

        expect(updated.vx).toBe(1.98); // 2 * 0.99
      });
    });

    describe('comet tracking', () => {
      it('should have slower life decay than subtle', () => {
        const particle = createTestParticle({ trackingType: 'comet', life: 1.0 });
        const updated = updateParticle(particle);

        expect(updated.life).toBe(0.985); // 1.0 - 0.015
      });

      it('should have less gravity than subtle', () => {
        const particle = createTestParticle({ trackingType: 'comet', vy: 1 });
        const updated = updateParticle(particle);

        expect(updated.vy).toBe(1.005); // 1 + 0.005
      });

      it('should have less friction than subtle', () => {
        const particle = createTestParticle({ trackingType: 'comet', vx: 2 });
        const updated = updateParticle(particle);

        expect(updated.vx).toBe(1.99); // 2 * 0.995
      });
    });

    describe('fireworks tracking', () => {
      it('should have faster life decay', () => {
        const particle = createTestParticle({ trackingType: 'fireworks', life: 1.0 });
        const updated = updateParticle(particle);

        expect(updated.life).toBe(0.975); // 1.0 - 0.025
      });

      it('should have stronger gravity', () => {
        const particle = createTestParticle({ trackingType: 'fireworks', vy: 1 });
        const updated = updateParticle(particle);

        expect(updated.vy).toBe(1.02); // 1 + 0.02
      });

      it('should have more friction', () => {
        const particle = createTestParticle({ trackingType: 'fireworks', vx: 2 });
        const updated = updateParticle(particle);

        expect(updated.vx).toBe(1.96); // 2 * 0.98
      });
    });

    describe('lightning tracking', () => {
      it('should add random jitter to position', () => {
        // Mock Math.random to return predictable values
        const originalRandom = Math.random;
        Math.random = jest.fn()
          .mockReturnValueOnce(0.7) // First jitter for x
          .mockReturnValueOnce(0.3); // Second jitter for y

        const particle = createTestParticle({ trackingType: 'lightning', x: 100, y: 100, vx: 1, vy: 1 });
        const updated = updateParticle(particle);

        // Expected: x = 100 + 1 + (0.7 - 0.5) * 2 = 101.4
        // Expected: y = 100 + 1 + (0.3 - 0.5) * 2 = 100.6
        expect(updated.x).toBe(101.4);
        expect(updated.y).toBe(100.6);

        Math.random = originalRandom;
      });

      it('should have fastest life decay', () => {
        const particle = createTestParticle({ trackingType: 'lightning', life: 1.0 });
        const updated = updateParticle(particle);

        expect(updated.life).toBe(0.97); // 1.0 - 0.03
      });

      it('should apply velocity decay to both components', () => {
        const particle = createTestParticle({ trackingType: 'lightning', vx: 2, vy: 2 });
        const updated = updateParticle(particle);

        expect(updated.vx).toBe(1.9); // 2 * 0.95
        expect(updated.vy).toBe(1.9); // 2 * 0.95
      });
    });

    describe('galaxy tracking', () => {
      it('should apply spiral motion around screen center', () => {
        // Center is at (512, 384) based on mocked window dimensions
        const particle = createTestParticle({ 
          trackingType: 'galaxy', 
          x: 600, 
          y: 300, 
          vx: 1, 
          vy: 1 
        });
        
        const updated = updateParticle(particle);

        // dx = 600 - 512 = 88, dy = 300 - 384 = -84
        // x = 600 + 1 - (-84) * 0.001 = 601.084
        // y = 300 + 1 + 88 * 0.001 = 301.088
        expect(updated.x).toBeCloseTo(601.084, 3);
        expect(updated.y).toBeCloseTo(301.088, 3);
      });

      it('should have slowest life decay', () => {
        const particle = createTestParticle({ trackingType: 'galaxy', life: 1.0 });
        const updated = updateParticle(particle);

        expect(updated.life).toBe(0.99); // 1.0 - 0.01
      });

      it('should apply minimal velocity decay', () => {
        const particle = createTestParticle({ trackingType: 'galaxy', vx: 2, vy: 2 });
        const updated = updateParticle(particle);

        expect(updated.vx).toBe(1.998); // 2 * 0.999
        expect(updated.vy).toBe(1.998); // 2 * 0.999
      });
    });

    describe('neon tracking', () => {
      it('should have moderate gravity', () => {
        const particle = createTestParticle({ trackingType: 'neon', vy: 1 });
        const updated = updateParticle(particle);

        expect(updated.vy).toBe(1.008); // 1 + 0.008
      });

      it('should have moderate friction', () => {
        const particle = createTestParticle({ trackingType: 'neon', vx: 2 });
        const updated = updateParticle(particle);

        expect(updated.vx).toBe(1.984); // 2 * 0.992
      });
    });

    describe('watercolor tracking', () => {
      it('should add gentle drift to position', () => {
        const originalRandom = Math.random;
        Math.random = jest.fn()
          .mockReturnValueOnce(0.8) // First drift for x
          .mockReturnValueOnce(0.2); // Second drift for y

        const particle = createTestParticle({ trackingType: 'watercolor', x: 100, y: 100, vx: 1, vy: 1 });
        const updated = updateParticle(particle);

        // Expected: x = 100 + 1 + (0.8 - 0.5) * 0.5 = 101.15
        // Expected: y = 100 + 1 + (0.2 - 0.5) * 0.5 = 100.85
        expect(updated.x).toBe(101.15);
        expect(updated.y).toBe(100.85);

        Math.random = originalRandom;
      });

      it('should have very slow life decay', () => {
        const particle = createTestParticle({ trackingType: 'watercolor', life: 1.0 });
        const updated = updateParticle(particle);

        expect(updated.life).toBe(0.99); // 1.0 - 0.01
      });

      it('should have minimal gravity and friction', () => {
        const particle = createTestParticle({ trackingType: 'watercolor', vx: 2, vy: 1 });
        const updated = updateParticle(particle);

        expect(updated.vy).toBe(1.002); // 1 + 0.002
        expect(updated.vx).toBe(1.996); // 2 * 0.998
      });
    });

    describe('geometric tracking', () => {
      it('should have moderate gravity and friction', () => {
        const particle = createTestParticle({ trackingType: 'geometric', vx: 2, vy: 1 });
        const updated = updateParticle(particle);

        expect(updated.vy).toBe(1.015); // 1 + 0.015
        expect(updated.vx).toBe(1.97); // 2 * 0.985
      });
    });

    describe('none tracking', () => {
      it('should immediately kill particles', () => {
        const particle = createTestParticle({ trackingType: 'none', life: 1.0 });
        const updated = updateParticle(particle);

        expect(updated.life).toBe(0);
      });

      it('should not update position or velocity', () => {
        const particle = createTestParticle({ 
          trackingType: 'none', 
          x: 100, 
          y: 100, 
          vx: 2, 
          vy: 2 
        });
        const updated = updateParticle(particle);

        // Position and velocity should remain unchanged
        expect(updated.x).toBe(100);
        expect(updated.y).toBe(100);
        expect(updated.vx).toBe(2);
        expect(updated.vy).toBe(2);
      });
    });

    describe('default/unknown tracking', () => {
      it('should behave like subtle tracking for unknown types', () => {
        const particle = createTestParticle({ trackingType: 'unknown-type', life: 1.0, vx: 2, vy: 1 });
        const updated = updateParticle(particle);

        expect(updated.life).toBe(0.98); // Same as subtle
        expect(updated.vy).toBe(1.01); // Same gravity as subtle
        expect(updated.vx).toBe(1.98); // Same friction as subtle
      });
    });

    describe('particle state preservation', () => {
      it('should preserve properties not affected by physics', () => {
        const particle = createTestParticle({
          size: 3,
          hue: 240,
          opacity: 0.8,
          color: '#ff0000',
          trail: [{ x: 1, y: 2 }],
          energy: 0.7,
          maxLife: 2.0,
        });

        const updated = updateParticle(particle);

        expect(updated.size).toBe(3);
        expect(updated.hue).toBe(240);
        expect(updated.opacity).toBe(0.8);
        expect(updated.color).toBe('#ff0000');
        expect(updated.trail).toEqual([{ x: 1, y: 2 }]);
        expect(updated.energy).toBe(0.7);
        expect(updated.maxLife).toBe(2.0);
      });
    });
  });
});