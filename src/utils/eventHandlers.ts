
import { Particle } from '@/types/particle';
import { createParticle } from './particleUtils';

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

    if (mouseRef.current.isPressed) {
      let particleCount = 2;
      let spread = 20;
      
      switch (trackingType) {
        case 'comet':
          particleCount = 1;
          break;
        case 'fireworks':
          particleCount = 3;
          spread = 30;
          break;
        case 'lightning':
          particleCount = 1;
          break;
        case 'galaxy':
          particleCount = 2;
          spread = 15;
          break;
        case 'neon':
          particleCount = 1;
          break;
        case 'watercolor':
          particleCount = 1;
          spread = 25;
          break;
        case 'geometric':
          particleCount = 2;
          spread = 10;
          break;
        default: // 'subtle'
          particleCount = 2;
          spread = 20;
      }
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(createParticle(
          mouseRef.current.x + (Math.random() - 0.5) * spread,
          mouseRef.current.y + (Math.random() - 0.5) * spread,
          trackingType
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
    
    let burstCount = 3;
    
    switch (trackingType) {
      case 'comet':
        burstCount = 2;
        break;
      case 'fireworks':
        burstCount = 8;
        break;
      case 'lightning':
        burstCount = 5;
        break;
      case 'galaxy':
        burstCount = 4;
        break;
      case 'neon':
        burstCount = 3;
        break;
      case 'watercolor':
        burstCount = 2;
        break;
      case 'geometric':
        burstCount = 6;
        break;
      default: // 'subtle'
        burstCount = 3;
    }
    
    for (let i = 0; i < burstCount; i++) {
      particlesRef.current.push(createParticle(mouseRef.current.x, mouseRef.current.y, trackingType));
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
  setIsTouch: (isTouch: boolean) => void,
  trackingType: string
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
      
      let burstCount = 3;
      
      switch (trackingType) {
        case 'comet':
          burstCount = 2;
          break;
        case 'fireworks':
          burstCount = 8;
          break;
        case 'lightning':
          burstCount = 5;
          break;
        case 'galaxy':
          burstCount = 4;
          break;
        case 'neon':
          burstCount = 3;
          break;
        case 'watercolor':
          burstCount = 2;
          break;
        case 'geometric':
          burstCount = 6;
          break;
        default: // 'subtle'
          burstCount = 3;
      }
      
      for (let j = 0; j < burstCount; j++) {
        particlesRef.current.push(createParticle(x, y, trackingType));
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

      let particleCount = 2;
      let spread = 15;
      
      switch (trackingType) {
        case 'comet':
          particleCount = 1;
          break;
        case 'fireworks':
          particleCount = 3;
          spread = 25;
          break;
        case 'lightning':
          particleCount = 1;
          break;
        case 'galaxy':
          particleCount = 2;
          spread = 12;
          break;
        case 'neon':
          particleCount = 1;
          break;
        case 'watercolor':
          particleCount = 1;
          spread = 20;
          break;
        case 'geometric':
          particleCount = 2;
          spread = 8;
          break;
        default: // 'subtle'
          particleCount = 2;
          spread = 15;
      }
      
      for (let j = 0; j < particleCount; j++) {
        particlesRef.current.push(createParticle(
          x + (Math.random() - 0.5) * spread,
          y + (Math.random() - 0.5) * spread,
          trackingType
        ));
      }
    }
  };

  const handleTouchEnd = (e: TouchEvent) => {
    e.preventDefault();
    
    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i];
      touchesRef.current.delete(touch.identifier);
      console.log('Touch end', { id: touch.identifier, remainingTouches: touchesRef.current.size });
    }
  };

  return { handleTouchStart, handleTouchMove, handleTouchEnd };
};
