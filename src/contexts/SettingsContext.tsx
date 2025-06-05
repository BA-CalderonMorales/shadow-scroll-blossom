
import React, { createContext, useContext, useState, useEffect } from 'react';

interface SettingsContextType {
  trackingType: string;
  setTrackingType: (type: string) => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
  backgroundType: string;
  setBackgroundType: (type: string) => void;
  particleStyle: string;
  setParticleStyle: (style: string) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [trackingType, setTrackingTypeState] = useState(() => {
    return localStorage.getItem('trackingType') || 'subtle';
  });
  
  const [isDarkMode, setIsDarkModeState] = useState(() => {
    const stored = localStorage.getItem('darkMode');
    if (stored !== null) {
      return stored === 'true';
    }
    return (
      document.documentElement.classList.contains('dark') ||
      window.matchMedia('(prefers-color-scheme: dark)').matches
    );
  });

  const [backgroundType, setBackgroundTypeState] = useState(() => {
    return localStorage.getItem('backgroundType') || 'none';
  });

  const [particleStyle, setParticleStyleState] = useState(() => {
    return localStorage.getItem('particleStyle') || 'default';
  });

  const setTrackingType = (type: string) => {
    setTrackingTypeState(type);
    localStorage.setItem('trackingType', type);
    console.log('Tracking type changed to:', type);
  };

  const setIsDarkMode = (dark: boolean) => {
    setIsDarkModeState(dark);
    if (dark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  };

  const setBackgroundType = (type: string) => {
    setBackgroundTypeState(type);
    localStorage.setItem('backgroundType', type);
    console.log('Background type changed to:', type);
  };

  const setParticleStyle = (style: string) => {
    setParticleStyleState(style);
    localStorage.setItem('particleStyle', style);
    console.log('Particle style changed to:', style);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <SettingsContext.Provider value={{ 
      trackingType, 
      setTrackingType, 
      isDarkMode, 
      setIsDarkMode,
      backgroundType,
      setBackgroundType,
      particleStyle,
      setParticleStyle
    }}>
      {children}
    </SettingsContext.Provider>
  );
};
