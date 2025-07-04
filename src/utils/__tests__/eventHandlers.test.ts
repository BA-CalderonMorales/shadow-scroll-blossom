import { createMouseEventHandlers, createTouchEventHandlers } from '../eventHandlers';
import { Particle } from '@/types/particle';
import React from 'react';

// Mock the particle factory
jest.mock('../particleFactory', () => ({
  createMultipleParticles: jest.fn(),
}));

import { createMultipleParticles } from '../particleFactory';

describe('Event Handlers', () => {
  let mockCanvas: HTMLCanvasElement;
  let mockParticlesRef: React.MutableRefObject<Particle[]>;
  let mockMouseRef: React.MutableRefObject<{ x: number; y: number; isPressed: boolean }>;
  let mockTouchesRef: React.MutableRefObject<Map<number, { x: number; y: number }>>;
  let mockSetIsTouch: jest.Mock;

  const createMockParticle = (id: number, x: number = 0, y: number = 0): Particle => ({
    x,
    y,
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
  });

  beforeEach(() => {
    // Create mock canvas
    mockCanvas = {
      getBoundingClientRect: jest.fn().mockReturnValue({
        left: 50,
        top: 100,
        width: 800,
        height: 600,
      }),
    } as unknown as HTMLCanvasElement;

    // Create mock refs
    mockParticlesRef = { current: [] };
    mockMouseRef = { current: { x: 0, y: 0, isPressed: false } };
    mockTouchesRef = { current: new Map() };
    mockSetIsTouch = jest.fn();

    // Clear mock calls
    jest.clearAllMocks();
    (createMultipleParticles as jest.Mock).mockReturnValue([
      createMockParticle(1, 100, 200),
      createMockParticle(2, 101, 201),
    ]);
  });

  describe('createMouseEventHandlers', () => {
    describe('handleMouseMove', () => {
      it('should update mouse position correctly', () => {
        const handlers = createMouseEventHandlers(
          mockCanvas,
          mockParticlesRef,
          mockMouseRef,
          'subtle'
        );

        const mockEvent = {
          clientX: 150,
          clientY: 250,
        } as MouseEvent;

        handlers.handleMouseMove(mockEvent);

        // clientX - left = 150 - 50 = 100, clientY - top = 250 - 100 = 150
        expect(mockMouseRef.current.x).toBe(100);
        expect(mockMouseRef.current.y).toBe(150);
      });

      it('should create particles when tracking is not none', () => {
        const handlers = createMouseEventHandlers(
          mockCanvas,
          mockParticlesRef,
          mockMouseRef,
          'subtle',
          'cyberpunk'
        );

        const mockEvent = {
          clientX: 150,
          clientY: 250,
        } as MouseEvent;

        handlers.handleMouseMove(mockEvent);

        expect(createMultipleParticles).toHaveBeenCalledWith(100, 150, 1, 'subtle', 'cyberpunk');
        expect(mockParticlesRef.current).toHaveLength(2);
      });

      it('should not create particles when tracking is none', () => {
        const handlers = createMouseEventHandlers(
          mockCanvas,
          mockParticlesRef,
          mockMouseRef,
          'none'
        );

        const mockEvent = {
          clientX: 150,
          clientY: 250,
        } as MouseEvent;

        handlers.handleMouseMove(mockEvent);

        expect(createMultipleParticles).not.toHaveBeenCalled();
        expect(mockParticlesRef.current).toHaveLength(0);
      });

      it('should cap particles at 500 by slicing to 400', () => {
        const handlers = createMouseEventHandlers(
          mockCanvas,
          mockParticlesRef,
          mockMouseRef,
          'subtle'
        );

        // Fill particles array to over 500
        mockParticlesRef.current = new Array(499).fill(createMockParticle(0));

        const mockEvent = {
          clientX: 150,
          clientY: 250,
        } as MouseEvent;

        handlers.handleMouseMove(mockEvent);

        // Should slice to 400 when it exceeds 500
        expect(mockParticlesRef.current).toHaveLength(400);
      });

      it('should create different particle counts for different tracking types', () => {
        const trackingTypes = [
          { type: 'subtle', count: 1 },
          { type: 'fireworks', count: 3 },
          { type: 'lightning', count: 2 },
          { type: 'galaxy', count: 2 },
        ];

        trackingTypes.forEach(({ type, count }) => {
          jest.clearAllMocks();
          const handlers = createMouseEventHandlers(
            mockCanvas,
            mockParticlesRef,
            mockMouseRef,
            type
          );

          const mockEvent = {
            clientX: 150,
            clientY: 250,
          } as MouseEvent;

          handlers.handleMouseMove(mockEvent);

          expect(createMultipleParticles).toHaveBeenCalledWith(100, 150, count, type, 'none');
        });
      });
    });

    describe('handleMouseDown', () => {
      it('should set mouse pressed state to true', () => {
        const handlers = createMouseEventHandlers(
          mockCanvas,
          mockParticlesRef,
          mockMouseRef,
          'subtle'
        );

        const mockEvent = {
          clientX: 150,
          clientY: 250,
        } as MouseEvent;

        handlers.handleMouseDown(mockEvent);

        expect(mockMouseRef.current.isPressed).toBe(true);
      });

      it('should create burst particles with double count', () => {
        const handlers = createMouseEventHandlers(
          mockCanvas,
          mockParticlesRef,
          mockMouseRef,
          'fireworks' // has particle count of 3
        );

        const mockEvent = {
          clientX: 150,
          clientY: 250,
        } as MouseEvent;

        handlers.handleMouseDown(mockEvent);

        // Burst count should be 3 * 2 = 6
        expect(createMultipleParticles).toHaveBeenCalledWith(100, 150, 6, 'fireworks', 'none');
      });

      it('should not create particles when tracking is none', () => {
        const handlers = createMouseEventHandlers(
          mockCanvas,
          mockParticlesRef,
          mockMouseRef,
          'none'
        );

        const mockEvent = {
          clientX: 150,
          clientY: 250,
        } as MouseEvent;

        handlers.handleMouseDown(mockEvent);

        expect(createMultipleParticles).not.toHaveBeenCalled();
      });
    });

    describe('handleMouseUp', () => {
      it('should set mouse pressed state to false', () => {
        const handlers = createMouseEventHandlers(
          mockCanvas,
          mockParticlesRef,
          mockMouseRef,
          'subtle'
        );

        mockMouseRef.current.isPressed = true;

        handlers.handleMouseUp();

        expect(mockMouseRef.current.isPressed).toBe(false);
      });
    });
  });

  describe('createTouchEventHandlers', () => {
    describe('handleTouchStart', () => {
      it('should prevent default and set touch state', () => {
        const handlers = createTouchEventHandlers(
          mockCanvas,
          mockParticlesRef,
          mockTouchesRef,
          mockSetIsTouch,
          'subtle'
        );

        const mockEvent = {
          preventDefault: jest.fn(),
          changedTouches: [
            {
              identifier: 1,
              clientX: 150,
              clientY: 250,
            },
          ],
        } as unknown as TouchEvent;

        handlers.handleTouchStart(mockEvent);

        expect(mockEvent.preventDefault).toHaveBeenCalled();
        expect(mockSetIsTouch).toHaveBeenCalledWith(true);
      });

      it('should track touch positions', () => {
        const handlers = createTouchEventHandlers(
          mockCanvas,
          mockParticlesRef,
          mockTouchesRef,
          mockSetIsTouch,
          'subtle'
        );

        const mockEvent = {
          preventDefault: jest.fn(),
          changedTouches: [
            {
              identifier: 1,
              clientX: 150,
              clientY: 250,
            },
            {
              identifier: 2,
              clientX: 200,
              clientY: 300,
            },
          ],
        } as unknown as TouchEvent;

        handlers.handleTouchStart(mockEvent);

        expect(mockTouchesRef.current.get(1)).toEqual({ x: 100, y: 150 });
        expect(mockTouchesRef.current.get(2)).toEqual({ x: 150, y: 200 });
      });

      it('should create particles for each touch when tracking is not none', () => {
        const handlers = createTouchEventHandlers(
          mockCanvas,
          mockParticlesRef,
          mockTouchesRef,
          mockSetIsTouch,
          'subtle'
        );

        const mockEvent = {
          preventDefault: jest.fn(),
          changedTouches: [
            {
              identifier: 1,
              clientX: 150,
              clientY: 250,
            },
            {
              identifier: 2,
              clientX: 200,
              clientY: 300,
            },
          ],
        } as unknown as TouchEvent;

        handlers.handleTouchStart(mockEvent);

        expect(createMultipleParticles).toHaveBeenCalledTimes(2);
        expect(createMultipleParticles).toHaveBeenCalledWith(100, 150, 1, 'subtle', 'none');
        expect(createMultipleParticles).toHaveBeenCalledWith(150, 200, 1, 'subtle', 'none');
      });
    });

    describe('handleTouchMove', () => {
      it('should prevent default and update touch positions', () => {
        const handlers = createTouchEventHandlers(
          mockCanvas,
          mockParticlesRef,
          mockTouchesRef,
          mockSetIsTouch,
          'subtle'
        );

        const mockEvent = {
          preventDefault: jest.fn(),
          changedTouches: [
            {
              identifier: 1,
              clientX: 160,
              clientY: 260,
            },
          ],
        } as unknown as TouchEvent;

        handlers.handleTouchMove(mockEvent);

        expect(mockEvent.preventDefault).toHaveBeenCalled();
        expect(mockTouchesRef.current.get(1)).toEqual({ x: 110, y: 160 });
      });

      it('should cap particles at 400 by slicing to 300', () => {
        const handlers = createTouchEventHandlers(
          mockCanvas,
          mockParticlesRef,
          mockTouchesRef,
          mockSetIsTouch,
          'subtle'
        );

        // Fill particles array to over 400
        mockParticlesRef.current = new Array(399).fill(createMockParticle(0));

        const mockEvent = {
          preventDefault: jest.fn(),
          changedTouches: [
            {
              identifier: 1,
              clientX: 160,
              clientY: 260,
            },
          ],
        } as unknown as TouchEvent;

        handlers.handleTouchMove(mockEvent);

        // Should slice to 300 when it exceeds 400
        expect(mockParticlesRef.current).toHaveLength(300);
      });
    });

    describe('handleTouchEnd', () => {
      it('should prevent default and remove touch from tracking', () => {
        const handlers = createTouchEventHandlers(
          mockCanvas,
          mockParticlesRef,
          mockTouchesRef,
          mockSetIsTouch,
          'subtle'
        );

        // Add some touches first
        mockTouchesRef.current.set(1, { x: 100, y: 150 });
        mockTouchesRef.current.set(2, { x: 200, y: 250 });

        const mockEvent = {
          preventDefault: jest.fn(),
          changedTouches: [
            {
              identifier: 1,
            },
          ],
        } as unknown as TouchEvent;

        handlers.handleTouchEnd(mockEvent);

        expect(mockEvent.preventDefault).toHaveBeenCalled();
        expect(mockTouchesRef.current.has(1)).toBe(false);
        expect(mockTouchesRef.current.has(2)).toBe(true);
      });

      it('should set touch state to false when all touches are removed', () => {
        const handlers = createTouchEventHandlers(
          mockCanvas,
          mockParticlesRef,
          mockTouchesRef,
          mockSetIsTouch,
          'subtle'
        );

        // Add one touch
        mockTouchesRef.current.set(1, { x: 100, y: 150 });

        const mockEvent = {
          preventDefault: jest.fn(),
          changedTouches: [
            {
              identifier: 1,
            },
          ],
        } as unknown as TouchEvent;

        handlers.handleTouchEnd(mockEvent);

        expect(mockSetIsTouch).toHaveBeenCalledWith(false);
      });

      it('should not set touch state to false when touches remain', () => {
        const handlers = createTouchEventHandlers(
          mockCanvas,
          mockParticlesRef,
          mockTouchesRef,
          mockSetIsTouch,
          'subtle'
        );

        // Add multiple touches
        mockTouchesRef.current.set(1, { x: 100, y: 150 });
        mockTouchesRef.current.set(2, { x: 200, y: 250 });

        const mockEvent = {
          preventDefault: jest.fn(),
          changedTouches: [
            {
              identifier: 1,
            },
          ],
        } as unknown as TouchEvent;

        handlers.handleTouchEnd(mockEvent);

        expect(mockSetIsTouch).not.toHaveBeenCalledWith(false);
      });
    });
  });

  describe('coordinate calculation', () => {
    it('should correctly calculate mouse position relative to canvas', () => {
      const handlers = createMouseEventHandlers(
        mockCanvas,
        mockParticlesRef,
        mockMouseRef,
        'subtle'
      );

      const mockEvent = {
        clientX: 100, // 100 - 50 (left) = 50
        clientY: 150, // 150 - 100 (top) = 50
      } as MouseEvent;

      handlers.handleMouseMove(mockEvent);

      expect(mockMouseRef.current.x).toBe(50);
      expect(mockMouseRef.current.y).toBe(50);
    });

    it('should correctly calculate touch position relative to canvas', () => {
      const handlers = createTouchEventHandlers(
        mockCanvas,
        mockParticlesRef,
        mockTouchesRef,
        mockSetIsTouch,
        'subtle'
      );

      const mockEvent = {
        preventDefault: jest.fn(),
        changedTouches: [
          {
            identifier: 1,
            clientX: 100, // 100 - 50 (left) = 50
            clientY: 150, // 150 - 100 (top) = 50
          },
        ],
      } as unknown as TouchEvent;

      handlers.handleTouchStart(mockEvent);

      expect(mockTouchesRef.current.get(1)).toEqual({ x: 50, y: 50 });
    });
  });
});