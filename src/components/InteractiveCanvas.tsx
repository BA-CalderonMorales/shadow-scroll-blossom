
import React, { useRef, useEffect, useState } from 'react';
import { Particle } from '@/types/particle';
import { setupCanvas } from '@/utils/canvasUtils';
import { createMouseEventHandlers, createTouchEventHandlers } from '@/utils/eventHandlers';
import { useCanvasAnimation } from '@/hooks/useCanvasAnimation';

const InteractiveCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const touchesRef = useRef<Map<number, { x: number; y: number }>>(new Map());
  const mouseRef = useRef({ x: 0, y: 0, isPressed: false });
  const [isTouch, setIsTouch] = useState(false);

  // Use the custom animation hook
  useCanvasAnimation(canvasRef, particlesRef);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    console.log('Canvas initialized');
    setupCanvas(canvas);

    // Set up resize handler
    const resizeCanvas = () => setupCanvas(canvas);
    window.addEventListener('resize', resizeCanvas);

    // Create event handlers
    const mouseHandlers = createMouseEventHandlers(canvas, particlesRef, mouseRef);
    const touchHandlers = createTouchEventHandlers(canvas, particlesRef, touchesRef, setIsTouch);

    // Add event listeners
    canvas.addEventListener('mousemove', mouseHandlers.handleMouseMove);
    canvas.addEventListener('mousedown', mouseHandlers.handleMouseDown);
    canvas.addEventListener('mouseup', mouseHandlers.handleMouseUp);
    canvas.addEventListener('mouseleave', mouseHandlers.handleMouseUp);
    
    canvas.addEventListener('touchstart', touchHandlers.handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', touchHandlers.handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', touchHandlers.handleTouchEnd, { passive: false });

    console.log('Event listeners added');

    return () => {
      console.log('Cleaning up InteractiveCanvas');
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', mouseHandlers.handleMouseMove);
      canvas.removeEventListener('mousedown', mouseHandlers.handleMouseDown);
      canvas.removeEventListener('mouseup', mouseHandlers.handleMouseUp);
      canvas.removeEventListener('mouseleave', mouseHandlers.handleMouseUp);
      canvas.removeEventListener('touchstart', touchHandlers.handleTouchStart);
      canvas.removeEventListener('touchmove', touchHandlers.handleTouchMove);
      canvas.removeEventListener('touchend', touchHandlers.handleTouchEnd);
      
      touchesRef.current.clear();
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 cursor-crosshair"
        style={{ background: 'radial-gradient(circle at center, #0c1220 0%, #080c14 100%)' }}
      />
      
      {/* Subtle instructions */}
      <div className="absolute top-6 left-6 text-white/40 text-xs font-light z-10">
        <p className="flex items-center gap-2">
          <span className="w-1 h-1 bg-blue-300/60 rounded-full animate-pulse"></span>
          {isTouch ? 'Touch with multiple fingers' : 'Move and click to create'}
        </p>
      </div>

      {/* Debug info moved to bottom left */}
      <div className="absolute bottom-6 left-6 text-white/30 text-xs z-10">
        <p>Active: {particlesRef.current?.length || 0}</p>
        {touchesRef.current.size > 0 && (
          <p>Touches: {touchesRef.current.size}</p>
        )}
      </div>

      {/* Subtle corner signature */}
      <div className="absolute bottom-6 right-6 text-white/20 text-xs">
        Interactive Canvas
      </div>
    </div>
  );
};

export default InteractiveCanvas;
