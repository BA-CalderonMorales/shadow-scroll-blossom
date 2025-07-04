import { drawParticle } from '../particleRenderer';
import { Particle } from '@/types/particle';

// Mock the particle style renderer
jest.mock('../particleStyleRenderer', () => ({
  drawStyledParticle: jest.fn(),
}));

import { drawStyledParticle } from '../particleStyleRenderer';

describe('Particle Renderer', () => {
  let mockContext: CanvasRenderingContext2D;
  let mockParticle: Particle;

  beforeEach(() => {
    // Create a comprehensive mock for CanvasRenderingContext2D
    const mockGradient = {
      addColorStop: jest.fn(),
    };

    mockContext = {
      save: jest.fn(),
      restore: jest.fn(),
      globalAlpha: 1,
      beginPath: jest.fn(),
      arc: jest.fn(),
      fill: jest.fn(),
      stroke: jest.fn(),
      fillStyle: '',
      strokeStyle: '',
      createRadialGradient: jest.fn().mockReturnValue(mockGradient),
      createLinearGradient: jest.fn().mockReturnValue(mockGradient),
      globalCompositeOperation: 'source-over',
      lineWidth: 1,
      shadowColor: '',
      shadowBlur: 0,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      fillText: jest.fn(),
      font: '',
      textAlign: 'start',
      textBaseline: 'alphabetic',
      setLineDash: jest.fn(),
      lineTo: jest.fn(),
      moveTo: jest.fn(),
      closePath: jest.fn(),
      quadraticCurveTo: jest.fn(),
      ellipse: jest.fn(),
      rect: jest.fn(),
      clip: jest.fn(),
    } as unknown as CanvasRenderingContext2D;

    mockParticle = {
      x: 100,
      y: 200,
      vx: 1,
      vy: 1,
      life: 0.8,
      maxLife: 1.0,
      size: 3,
      hue: 180,
      opacity: 1.0,
      trackingType: 'subtle',
      color: '#ffffff',
      trail: [],
      energy: 0.5,
    };

    jest.clearAllMocks();
  });

  describe('drawParticle', () => {
    it('should call drawStyledParticle with correct parameters', () => {
      drawParticle(mockContext, mockParticle, true, 'none', 'default');

      expect(drawStyledParticle).toHaveBeenCalledWith(
        mockContext,
        mockParticle,
        true,
        'none',
        'default'
      );
    });

    it('should use default parameters when not provided', () => {
      drawParticle(mockContext, mockParticle);

      expect(drawStyledParticle).toHaveBeenCalledWith(
        mockContext,
        mockParticle,
        true,
        'none',
        'default'
      );
    });

    it('should handle different background types', () => {
      const backgroundTypes = ['none', 'cyberpunk', 'matrix', 'nebula', 'aurora', 'synthwave'];
      
      backgroundTypes.forEach(bgType => {
        jest.clearAllMocks();
        drawParticle(mockContext, mockParticle, true, bgType, 'default');

        expect(drawStyledParticle).toHaveBeenCalledWith(
          mockContext,
          mockParticle,
          true,
          bgType,
          'default'
        );
      });
    });

    it('should handle different particle styles', () => {
      const particleStyles = ['default', 'elegant', 'geometric', 'organic'];
      
      particleStyles.forEach(style => {
        jest.clearAllMocks();
        drawParticle(mockContext, mockParticle, true, 'none', style);

        expect(drawStyledParticle).toHaveBeenCalledWith(
          mockContext,
          mockParticle,
          true,
          'none',
          style
        );
      });
    });

    it('should handle light and dark modes', () => {
      // Test dark mode
      drawParticle(mockContext, mockParticle, true, 'none', 'default');
      expect(drawStyledParticle).toHaveBeenLastCalledWith(
        mockContext,
        mockParticle,
        true,
        'none',
        'default'
      );

      jest.clearAllMocks();

      // Test light mode
      drawParticle(mockContext, mockParticle, false, 'none', 'default');
      expect(drawStyledParticle).toHaveBeenLastCalledWith(
        mockContext,
        mockParticle,
        false,
        'none',
        'default'
      );
    });

    it('should handle particles with different life values', () => {
      const particles = [
        { ...mockParticle, life: 1.0, maxLife: 1.0 }, // Full life
        { ...mockParticle, life: 0.5, maxLife: 1.0 }, // Half life
        { ...mockParticle, life: 0.1, maxLife: 1.0 }, // Low life
        { ...mockParticle, life: 0.0, maxLife: 1.0 }, // Dead particle
      ];

      particles.forEach(particle => {
        jest.clearAllMocks();
        drawParticle(mockContext, particle, true, 'cyberpunk', 'default');

        expect(drawStyledParticle).toHaveBeenCalledWith(
          mockContext,
          particle,
          true,
          'cyberpunk',
          'default'
        );
      });
    });

    it('should not throw errors with minimal particle data', () => {
      const minimalParticle = {
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        life: 0,
        maxLife: 1,
        size: 1,
        hue: 0,
        opacity: 1,
        trackingType: 'none',
        color: '#000000',
        trail: [],
        energy: 0,
      };

      expect(() => {
        drawParticle(mockContext, minimalParticle);
      }).not.toThrow();

      expect(drawStyledParticle).toHaveBeenCalled();
    });
  });
});