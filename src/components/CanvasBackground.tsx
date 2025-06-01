
import React, { useEffect, useState } from 'react';
import { getBackgroundStyle, getBackgroundSize } from '@/utils/backgroundUtils';

interface CanvasBackgroundProps {
  backgroundType: string;
  isDarkMode: boolean;
}

const CanvasBackground: React.FC<CanvasBackgroundProps> = ({ backgroundType, isDarkMode }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentBackground, setCurrentBackground] = useState(backgroundType);

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

  const backgroundStyle = getBackgroundStyle(currentBackground, isDarkMode);
  const backgroundSize = getBackgroundSize(currentBackground);

  return (
    <div 
      className={`absolute inset-0 transition-opacity duration-300 ${
        isTransitioning ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ 
        background: backgroundStyle,
        backgroundSize: backgroundSize
      }}
    />
  );
};

export default CanvasBackground;
