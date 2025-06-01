
import React, { useRef, useEffect, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
  opacity: number;
}

const InteractiveCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const touchesRef = useRef<Map<number, { x: number; y: number }>>(new Map());
  const mouseRef = useRef({ x: 0, y: 0, isPressed: false });
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    console.log('Canvas initialized', { width: canvas.width, height: canvas.height });

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      console.log('Canvas resized', { width: canvas.width, height: canvas.height });
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle creation - more subtle
    const createParticle = (x: number, y: number): Particle => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 1.5 + 0.5; // Slower movement
      
      const particle = {
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 120, // Longer life
        maxLife: 120,
        size: Math.random() * 2 + 1, // Smaller particles
        hue: Math.random() * 40 + 200, // Narrower blue range
        opacity: Math.random() * 0.3 + 0.1 // Lower opacity
      };
      
      console.log('Particle created at', { x, y, particles: particlesRef.current.length + 1 });
      return particle;
    };

    // Animation loop
    const animate = () => {
      // More subtle trail effect
      ctx.fillStyle = 'rgba(8, 12, 20, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      const activeParticles = [];
      
      for (const particle of particlesRef.current) {
        // Update particle
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= 1;
        particle.vy += 0.01; // Less gravity
        particle.vx *= 0.99; // Less air resistance

        // Calculate alpha based on life
        const lifeRatio = particle.life / particle.maxLife;
        const alpha = Math.max(0, lifeRatio * particle.opacity);
        
        if (alpha > 0.01) {
          // Draw subtle particle with soft glow
          ctx.save();
          
          // Soft outer glow
          const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size * 3
          );
          gradient.addColorStop(0, `hsla(${particle.hue}, 60%, 80%, ${alpha * 0.4})`);
          gradient.addColorStop(0.4, `hsla(${particle.hue}, 70%, 60%, ${alpha * 0.2})`);
          gradient.addColorStop(1, `hsla(${particle.hue}, 80%, 40%, 0)`);
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
          ctx.fill();

          // Very subtle inner core
          ctx.fillStyle = `hsla(${particle.hue}, 70%, 85%, ${alpha * 0.6})`;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 0.8, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.restore();

          activeParticles.push(particle);
        }
      }
      
      particlesRef.current = activeParticles;
      animationRef.current = requestAnimationFrame(animate);
    };

    // Mouse events
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

    // Multi-touch events
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
        
        const prevTouch = touchesRef.current.get(touch.identifier);
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

    // Add event listeners
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseUp);
    
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd, { passive: false });

    console.log('Event listeners added, starting animation');

    // Start animation
    animate();

    return () => {
      console.log('Cleaning up InteractiveCanvas');
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseUp);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
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

      {/* Minimal debug info */}
      <div className="absolute top-6 right-6 text-white/30 text-xs z-10">
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
