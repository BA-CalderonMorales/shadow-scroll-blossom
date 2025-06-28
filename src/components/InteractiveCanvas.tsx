
import React, { useRef, useEffect, useState } from 'react';
import { Particle } from '@/types/particle';
import { setupCanvas } from '@/utils/canvasUtils';
import { createMouseEventHandlers, createTouchEventHandlers } from '@/utils/eventHandlers';
import { useCanvasAnimation } from '@/hooks/useCanvasAnimation';
import { useSettings } from '@/contexts/SettingsContext';
import { logDev } from '@/utils/logDev';
import CanvasBackground from './CanvasBackground';

const InteractiveCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const touchesRef = useRef<Map<number, { x: number; y: number }>>(new Map());
  const mouseRef = useRef({ x: 0, y: 0, isPressed: false });
  const [isTouch, setIsTouch] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { trackingType, isDarkMode, backgroundType, particleStyle } = useSettings();

  // Use the custom animation hook
  useCanvasAnimation(canvasRef, particlesRef);

  // Handle background and particle style transitions
  useEffect(() => {
    setIsTransitioning(true);
    
    // Clear particles during transition for smooth effect
    particlesRef.current = [];
    
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [backgroundType, particleStyle]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    logDev('Canvas initialized with tracking type:', trackingType, 'background:', backgroundType, 'particle style:', particleStyle);
    setupCanvas(canvas);

    // Set up resize handler
    const resizeCanvas = () => setupCanvas(canvas);
    window.addEventListener('resize', resizeCanvas);

    // Create event handlers with current settings
    const mouseHandlers = createMouseEventHandlers(canvas, particlesRef, mouseRef, trackingType, backgroundType);
    const touchHandlers = createTouchEventHandlers(canvas, particlesRef, touchesRef, setIsTouch, trackingType, backgroundType);

    // Add event listeners
    canvas.addEventListener('mousemove', mouseHandlers.handleMouseMove);
    canvas.addEventListener('mousedown', mouseHandlers.handleMouseDown);
    canvas.addEventListener('mouseup', mouseHandlers.handleMouseUp);
    canvas.addEventListener('mouseleave', mouseHandlers.handleMouseUp);
    
    canvas.addEventListener('touchstart', touchHandlers.handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', touchHandlers.handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', touchHandlers.handleTouchEnd, { passive: false });

    logDev('Event listeners added');

    return () => {
      logDev('Cleaning up InteractiveCanvas');
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
  }, [trackingType, backgroundType, particleStyle]); // Re-run when any setting changes

  const textColor = isDarkMode ? 'text-white/40' : 'text-gray-600/60';
  const debugTextColor = isDarkMode ? 'text-white/30' : 'text-gray-500/50';
  const signatureColor = isDarkMode ? 'text-white/20' : 'text-gray-400/40';

  return (
    <div className={`relative w-full min-h-screen overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
         style={{ minHeight: '100dvh' }}>
      {/* Animated background */}
      <CanvasBackground backgroundType={backgroundType} isDarkMode={isDarkMode} />
      
      {/* Canvas with transition effect */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 cursor-crosshair transition-opacity duration-300 ${
          isTransitioning ? 'opacity-70' : 'opacity-100'
        }`}
        style={{ background: 'transparent' }}
      />
      
      {/* Transition overlay for smooth effects */}
      {isTransitioning && (
        <div className={`absolute inset-0 transition-opacity duration-300 ${
          isDarkMode ? 'bg-gray-900/20' : 'bg-gray-50/20'
        }`} />
      )}
      
      {/* Subtle instructions */}
      <div className={`absolute top-6 left-6 ${textColor} text-xs font-light z-10 transition-opacity duration-300`}>
        <p className="flex items-center gap-2">
          <span className={`w-1 h-1 ${isDarkMode ? 'bg-blue-300/60' : 'bg-blue-500/60'} rounded-full animate-pulse`}></span>
          {isTouch ? 'Touch with multiple fingers' : 'Move and click to create'}
        </p>
        {backgroundType !== 'none' && (
          <p className="mt-1 text-xs opacity-60 capitalize">
            {backgroundType} mode active
          </p>
        )}
        {particleStyle !== 'default' && (
          <p className="mt-1 text-xs opacity-60 capitalize">
            {particleStyle} particles
          </p>
        )}
      </div>

      {/* Debug info moved to bottom left */}
      <div className={`absolute bottom-6 left-6 ${debugTextColor} text-xs z-10`}>
        <p>Active: {particlesRef.current?.length || 0}</p>
        {touchesRef.current.size > 0 && (
          <p>Touches: {touchesRef.current.size}</p>
        )}
      </div>

      {/* Subtle corner signature */}
      <div className={`absolute bottom-6 right-6 ${signatureColor} text-xs`}>
        Interactive Canvas
      </div>
    </div>
  );
};

export default InteractiveCanvas;
