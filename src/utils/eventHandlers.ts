
import { Particle } from '@/types/particle';
import { createParticle } from './particleUtils';

export const createMouseEventHandlers = (
  canvas: HTMLCanvasElement,
  particlesRef: React.MutableRefObject<Particle[]>,
  mouseRef: React.MutableRefObject<{ x: number; y: number; isPressed: boolean }>
) => {
  const handleMouseMove = (e: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;

    if (mouseRef.current.isPressed) {
      // Create fewer, more subtle particles
      for (let i = 0; i < 2; i++) {
        particlesRef.current.push(createParticle(
          mouseRef.current.x + (Math.random() - 0.5) * 20,
          mouseRef.current.y + (Math.random() - 0.5) * 20
        ));
      }
    }
  };

  const handleMouseDown = (e: MouseEvent) => {
    mouseRef.current.isPressed = true;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;
    
    console.log('Mouse down', { x: mouseRef.current.x, y: mouseRef.current.y });
    
    // Create subtle initial burst
    for (let i = 0; i < 3; i++) {
      particlesRef.current.push(createParticle(mouseRef.current.x, mouseRef.current.y));
    }
  };

  const handleMouseUp = () => {
    console.log('Mouse up');
    mouseRef.current.isPressed = false;
  };

  return { handleMouseMove, handleMouseDown, handleMouseUp };
};

export const createTouchEventHandlers = (
  canvas: HTMLCanvasElement,
  particlesRef: React.MutableRefObject<Particle[]>,
  touchesRef: React.MutableRefObject<Map<number, { x: number; y: number }>>,
  setIsTouch: (isTouch: boolean) => void
) => {
  const handleTouchStart = (e: TouchEvent) => {
    e.preventDefault();
    setIsTouch(true);
    
    for (let i = 0; i < e.touches.length; i++) {
      const touch = e.touches[i];
      const rect = canvas.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      
      touchesRef.current.set(touch.identifier, { x, y });
      
      console.log('Touch start', { id: touch.identifier, x, y, totalTouches: touchesRef.current.size });
      
      // Create subtle initial burst for each touch
      for (let j = 0; j < 3; j++) {
        particlesRef.current.push(createParticle(x, y));
      }
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    
    for (let i = 0; i < e.touches.length; i++) {
      const touch = e.touches[i];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      
      touchesRef.current.set(touch.identifier, { x, y });

      console.log('Touch move', { id: touch.identifier, x, y });

      // Create subtle particles for each active touch
      for (let j = 0; j < 2; j++) {
        particlesRef.current.push(createParticle(
          x + (Math.random() - 0.5) * 15,
          y + (Math.random() - 0.5) * 15
        ));
      }
    }
  };

  const handleTouchEnd = (e: TouchEvent) => {
    e.preventDefault();
    
    // Remove ended touches
    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i];
      touchesRef.current.delete(touch.identifier);
      console.log('Touch end', { id: touch.identifier, remainingTouches: touchesRef.current.size });
    }
  };

  return { handleTouchStart, handleTouchMove, handleTouchEnd };
};
