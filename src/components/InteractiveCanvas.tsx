
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
}

const InteractiveCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
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

    // Particle creation
    const createParticle = (x: number, y: number): Particle => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3 + 2;
      
      const particle = {
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 60,
        maxLife: 60,
        size: Math.random() * 4 + 2,
        hue: Math.random() * 60 + 200 // Blue to purple range
      };
      
      console.log('Particle created at', { x, y, particles: particlesRef.current.length + 1 });
      return particle;
    };

    // Animation loop
    const animate = () => {
      // Clear canvas with trail effect
      ctx.fillStyle = 'rgba(10, 10, 15, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      const activeParticles = [];
      
      for (const particle of particlesRef.current) {
        // Update particle
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= 1;
        particle.vy += 0.03; // Slight gravity
        particle.vx *= 0.98; // Air resistance

        // Calculate alpha based on life
        const alpha = Math.max(0, particle.life / particle.maxLife);
        
        if (alpha > 0) {
          // Draw particle with glow effect
          ctx.save();
          
          // Outer glow
          const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size * 2
          );
          gradient.addColorStop(0, `hsla(${particle.hue}, 100%, 70%, ${alpha * 0.6})`);
          gradient.addColorStop(0.5, `hsla(${particle.hue}, 100%, 50%, ${alpha * 0.3})`);
          gradient.addColorStop(1, `hsla(${particle.hue}, 100%, 30%, 0)`);
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
          ctx.fill();

          // Inner core
          ctx.fillStyle = `hsla(${particle.hue}, 100%, 90%, ${alpha})`;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
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

      console.log('Mouse move', { x: mouseRef.current.x, y: mouseRef.current.y, isPressed: mouseRef.current.isPressed });

      if (mouseRef.current.isPressed) {
        // Create particles on mouse drag
        for (let i = 0; i < 5; i++) {
          particlesRef.current.push(createParticle(
            mouseRef.current.x + (Math.random() - 0.5) * 30,
            mouseRef.current.y + (Math.random() - 0.5) * 30
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
      
      // Create initial burst
      for (let i = 0; i < 10; i++) {
        particlesRef.current.push(createParticle(mouseRef.current.x, mouseRef.current.y));
      }
    };

    const handleMouseUp = () => {
      console.log('Mouse up');
      mouseRef.current.isPressed = false;
    };

    // Touch events
    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      setIsTouch(true);
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      mouseRef.current.x = touch.clientX - rect.left;
      mouseRef.current.y = touch.clientY - rect.top;
      mouseRef.current.isPressed = true;
      
      console.log('Touch start', { x: mouseRef.current.x, y: mouseRef.current.y });
      
      // Create initial burst
      for (let i = 0; i < 10; i++) {
        particlesRef.current.push(createParticle(mouseRef.current.x, mouseRef.current.y));
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      mouseRef.current.x = touch.clientX - rect.left;
      mouseRef.current.y = touch.clientY - rect.top;

      console.log('Touch move', { x: mouseRef.current.x, y: mouseRef.current.y });

      // Create particles on touch drag
      for (let i = 0; i < 6; i++) {
        particlesRef.current.push(createParticle(
          mouseRef.current.x + (Math.random() - 0.5) * 30,
          mouseRef.current.y + (Math.random() - 0.5) * 30
        ));
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault();
      console.log('Touch end');
      mouseRef.current.isPressed = false;
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
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 cursor-crosshair"
        style={{ background: 'radial-gradient(circle at center, #1a1a2e 0%, #0a0a0f 100%)' }}
      />
      
      {/* Instructions */}
      <div className="absolute top-6 left-6 text-white/70 text-sm font-medium z-10">
        <p className="flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
          {isTouch ? 'Touch and drag to create particles' : 'Click and drag to create magic'}
        </p>
      </div>

      {/* Debug info */}
      <div className="absolute top-6 right-6 text-white/50 text-xs z-10">
        <p>Particles: {particlesRef.current?.length || 0}</p>
      </div>

      {/* Corner decoration */}
      <div className="absolute bottom-6 right-6 text-white/30 text-xs">
        Interactive Canvas
      </div>
    </div>
  );
};

export default InteractiveCanvas;
