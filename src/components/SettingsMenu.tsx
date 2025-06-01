
import { useState } from 'react';
import { Settings, MousePointer, Image, Sparkles } from 'lucide-react';
import { useSettings } from '@/contexts/SettingsContext';
import { SettingsPanel } from './settings/SettingsPanel';
import { DarkModeToggle } from './settings/DarkModeToggle';
import { CollapsibleSection } from './settings/CollapsibleSection';
import { trackingOptions, backgroundOptions, particleStyleOptions } from '@/data/settingsOptions';

export const SettingsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isBackgroundOpen, setIsBackgroundOpen] = useState(false);
  const [isParticleStyleOpen, setIsParticleStyleOpen] = useState(false);
  
  const { 
    trackingType, 
    setTrackingType, 
    backgroundType,
    setBackgroundType,
    particleStyle,
    setParticleStyle
  } = useSettings();

  const isAnimationActive = trackingType !== 'none';
  const isBackgroundActive = backgroundType !== 'none';
  const isParticleStyleActive = particleStyle !== 'default';

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Settings Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 bg-black/10 dark:bg-white/10 backdrop-blur-sm border border-white/20 rounded-sm hover:bg-black/20 dark:hover:bg-white/20 transition-all duration-200 flex items-center justify-center"
      >
        <Settings className="w-4 h-4 text-gray-700 dark:text-gray-300" />
      </button>

      {/* Settings Panel */}
      {isOpen && (
        <SettingsPanel>
          <DarkModeToggle />

          <CollapsibleSection
            title="Background Environment"
            icon={Image}
            isOpen={isBackgroundOpen}
            onOpenChange={setIsBackgroundOpen}
            isActive={isBackgroundActive}
            options={backgroundOptions}
            value={backgroundType}
            onValueChange={setBackgroundType}
          />

          <CollapsibleSection
            title="Particle Style"
            icon={Sparkles}
            isOpen={isParticleStyleOpen}
            onOpenChange={setIsParticleStyleOpen}
            isActive={isParticleStyleActive}
            options={particleStyleOptions}
            value={particleStyle}
            onValueChange={setParticleStyle}
            scrollHeight="h-40"
          />

          <CollapsibleSection
            title="Tracking Animation"
            icon={MousePointer}
            isOpen={isTrackingOpen}
            onOpenChange={setIsTrackingOpen}
            isActive={isAnimationActive}
            options={trackingOptions}
            value={trackingType}
            onValueChange={setTrackingType}
          />
        </SettingsPanel>
      )}
    </div>
  );
};
