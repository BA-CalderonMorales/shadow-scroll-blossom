import { Particle } from '@/types/particle';
import { createParticlesForType } from '@/utils/particleUtils';
import React from 'react';

export const createMouseEventHandlers = (
  canvas: HTMLCanvasElement,
  particlesRef: React.MutableRefObject<Particle[]>,
  mouseRef: React.MutableRefObject<{ x: number; y: number; isPressed: boolean }>,
  trackingType: string
) => {
  const handleMouseMove = (e: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;

    // Don't create particles if tracking is disabled
    if (trackingType === 'none') return;

    if (mouseRef.current.isPressed) {
      const particles = createParticlesForType(
        mouseRef.current.x,
        mouseRef.current.y,
        trackingType
      );
      particlesRef.current.push(...particles);
    }
  };

  const handleMouseDown = (e: MouseEvent) => {
    mouseRef.current.isPressed = true;
    
    // Don't create particles if tracking is disabled
    if (trackingType === 'none') return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const particles = createParticlesForType(x, y, trackingType);
    particlesRef.current.push(...particles);
  };

  const handleMouseUp = () => {
    mouseRef.current.isPressed = false;
  };

  return { handleMouseMove, handleMouseDown, handleMouseUp };
};

export const createTouchEventHandlers = (
  canvas: HTMLCanvasElement,
  particlesRef: React.MutableRefObject<Particle[]>,
  touchesRef: React.MutableRefObject<Map<number, { x: number; y: number }>>,
  setIsTouch: (isTouch: boolean) => void,
  trackingType: string
) => {
  const handleTouchStart = (e: TouchEvent) => {
    e.preventDefault();
    setIsTouch(true);
    
    // Don't create particles if tracking is disabled
    if (trackingType === 'none') return;

    const rect = canvas.getBoundingClientRect();
    
    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      
      touchesRef.current.set(touch.identifier, { x, y });
      
      const particles = createParticlesForType(x, y, trackingType);
      particlesRef.current.push(...particles);
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    
    // Don't create particles if tracking is disabled
    if (trackingType === 'none') return;

    const rect = canvas.getBoundingClientRect();
    
    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      
      touchesRef.current.set(touch.identifier, { x, y });
      
      const particles = createParticlesForType(x, y, trackingType);
      particlesRef.current.push(...particles);
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

  return { handleTouchStart, handleTouchMove, handleTouchEnd };
};
