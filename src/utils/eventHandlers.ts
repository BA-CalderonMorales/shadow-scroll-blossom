
import { Particle } from '@/types/particle';
import { createMultipleParticles } from '@/utils/particleFactory';
import React from 'react';

export const createMouseEventHandlers = (
  canvas: HTMLCanvasElement,
  particlesRef: React.MutableRefObject<Particle[]>,
  mouseRef: React.MutableRefObject<{ x: number; y: number; isPressed: boolean }>,
  trackingType: string,
  backgroundType: string = 'none'
) => {
  const getMousePos = (e: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handleMouseMove = (e: MouseEvent) => {
    const pos = getMousePos(e);
    mouseRef.current.x = pos.x;
    mouseRef.current.y = pos.y;

    if (trackingType !== 'none') {
      // Reduced particle count for better performance
      const newParticles = createMultipleParticles(pos.x, pos.y, getParticleCount(trackingType), trackingType, backgroundType);
      particlesRef.current.push(...newParticles);
      
      // Cap total particles for performance
      if (particlesRef.current.length > 500) {
        particlesRef.current = particlesRef.current.slice(-400);
      }
    }
  };

  const handleMouseDown = (e: MouseEvent) => {
    mouseRef.current.isPressed = true;
    const pos = getMousePos(e);
    
    if (trackingType !== 'none') {
      // Reduced burst count
      const burstCount = getParticleCount(trackingType) * 2;
      const newParticles = createMultipleParticles(pos.x, pos.y, burstCount, trackingType, backgroundType);
      particlesRef.current.push(...newParticles);
    }
  };

  const handleMouseUp = () => {
    mouseRef.current.isPressed = false;
  };

  return {
    handleMouseMove,
    handleMouseDown,
    handleMouseUp
  };
};

export const createTouchEventHandlers = (
  canvas: HTMLCanvasElement,
  particlesRef: React.MutableRefObject<Particle[]>,
  touchesRef: React.MutableRefObject<Map<number, { x: number; y: number }>>,
  setIsTouch: (isTouch: boolean) => void,
  trackingType: string,
  backgroundType: string = 'none'
) => {
  const getTouchPos = (touch: Touch) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    };
  };

  const handleTouchStart = (e: TouchEvent) => {
    e.preventDefault();
    setIsTouch(true);

    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i];
      const pos = getTouchPos(touch);
      touchesRef.current.set(touch.identifier, pos);

      if (trackingType !== 'none') {
        // Reduced particle count for touch
        const newParticles = createMultipleParticles(pos.x, pos.y, getParticleCount(trackingType), trackingType, backgroundType);
        particlesRef.current.push(...newParticles);
      }
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();

    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i];
      const pos = getTouchPos(touch);
      touchesRef.current.set(touch.identifier, pos);

      if (trackingType !== 'none') {
        const newParticles = createMultipleParticles(pos.x, pos.y, getParticleCount(trackingType), trackingType, backgroundType);
        particlesRef.current.push(...newParticles);
        
        // Cap particles for performance
        if (particlesRef.current.length > 400) {
          particlesRef.current = particlesRef.current.slice(-300);
        }
      }
    }
  };

  const handleTouchEnd = (e: TouchEvent) => {
    e.preventDefault();

    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i];
      touchesRef.current.delete(touch.identifier);
    }

    if (touchesRef.current.size === 0) {
      setIsTouch(false);
    }
  };

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  };
};

// Reduced particle counts for better performance
function getParticleCount(trackingType: string): number {
  switch (trackingType) {
    case 'none':
      return 0;
    case 'subtle':
      return 1;
    case 'comet':
      return 1;
    case 'fireworks':
      return 3;
    case 'lightning':
      return 2;
    case 'galaxy':
      return 2;
    case 'neon':
      return 1;
    case 'watercolor':
      return 2;
    case 'geometric':
      return 2;
    default:
      return 1;
  }
}
