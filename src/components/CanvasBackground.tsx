
import React, { useEffect, useState } from 'react';
import { getBackgroundStyle, getBackgroundSize } from '@/utils/backgroundUtils';

interface CanvasBackgroundProps {
  backgroundType: string;
  isDarkMode: boolean;
}

const CanvasBackground: React.FC<CanvasBackgroundProps> = ({ backgroundType, isDarkMode }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentBackground, setCurrentBackground] = useState(backgroundType);
  const [pointerPos, setPointerPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    if (currentBackground !== backgroundType) {
      setIsTransitioning(true);
      
      // Smooth transition timing
      const timer = setTimeout(() => {
        setCurrentBackground(backgroundType);
        setIsTransitioning(false);
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [backgroundType, currentBackground]);

  useEffect(() => {
    if (currentBackground !== 'fluid') return;
    const updatePos = (e: PointerEvent) => {
      setPointerPos({ x: e.clientX, y: e.clientY });
      document.documentElement.style.setProperty('--x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--y', `${e.clientY}px`);
    };
    window.addEventListener('pointermove', updatePos);
    return () => window.removeEventListener('pointermove', updatePos);
  }, [currentBackground]);

  const backgroundStyle = getBackgroundStyle(currentBackground, isDarkMode);
  const backgroundSize = getBackgroundSize(currentBackground);

  const dynamicStyle = currentBackground === 'fluid'
    ? {
        background: getBackgroundStyle('fluid', isDarkMode),
        backgroundSize
      }
    : {
        background: backgroundStyle,
        backgroundSize
      };

  return (
    <div 
      className={`absolute inset-0 transition-opacity duration-300 ${
        isTransitioning ? 'opacity-0' : 'opacity-100'
      }`}
      style={dynamicStyle}
    />
  );
};

export default CanvasBackground;
