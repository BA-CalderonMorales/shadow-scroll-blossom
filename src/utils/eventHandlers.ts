
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
      const newParticles = createMultipleParticles(pos.x, pos.y, getParticleCount(trackingType), trackingType, backgroundType);
      particlesRef.current.push(...newParticles);
    }
  };

  const handleMouseDown = (e: MouseEvent) => {
    mouseRef.current.isPressed = true;
    const pos = getMousePos(e);
    
    if (trackingType !== 'none') {
      const burstCount = getParticleCount(trackingType) * 3;
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
        const newParticles = createMultipleParticles(pos.x, pos.y, getParticleCount(trackingType) * 2, trackingType, backgroundType);
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

function getParticleCount(trackingType: string): number {
  switch (trackingType) {
    case 'none':
      return 0;
    case 'subtle':
      return 2;
    case 'comet':
      return 3;
    case 'fireworks':
      return 8;
    case 'lightning':
      return 5;
    case 'galaxy':
      return 4;
    case 'neon':
      return 3;
    case 'watercolor':
      return 6;
    case 'geometric':
      return 4;
    default:
      return 2;
  }
}
