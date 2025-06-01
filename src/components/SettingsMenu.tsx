
import { useState } from 'react';
import { Settings, Sun, Moon, MousePointer, ChevronDown, Circle, CheckCircle, Image, Sparkles } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useSettings } from '@/contexts/SettingsContext';

export const SettingsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isBackgroundOpen, setIsBackgroundOpen] = useState(false);
  const [isParticleStyleOpen, setIsParticleStyleOpen] = useState(false);
  const { 
    trackingType, 
    setTrackingType, 
    isDarkMode, 
    setIsDarkMode,
    backgroundType,
    setBackgroundType,
    particleStyle,
    setParticleStyle
  } = useSettings();

  const toggleDarkMode = (checked: boolean) => {
    setIsDarkMode(checked);
  };

  const handleTrackingChange = (value: string) => {
    setTrackingType(value);
  };

  const handleBackgroundChange = (value: string) => {
    setBackgroundType(value);
  };

  const handleParticleStyleChange = (value: string) => {
    setParticleStyle(value);
  };

  const trackingOptions = [
    { value: 'none', label: 'None', description: 'No tracking animations' },
    { value: 'subtle', label: 'Subtle Trail', description: 'Gentle floating particles' },
    { value: 'comet', label: 'Trailing Comet', description: 'Elongated glowing trails' },
    { value: 'fireworks', label: 'Fireworks', description: 'Explosive bursts of color' },
    { value: 'lightning', label: 'Lightning', description: 'Electric branching effects' },
    { value: 'galaxy', label: 'Galaxy Spiral', description: 'Swirling cosmic patterns' },
    { value: 'neon', label: 'Neon Glow', description: 'Bright electric lines' },
    { value: 'watercolor', label: 'Watercolor', description: 'Soft paint-like blending' },
    { value: 'geometric', label: 'Geometric', description: 'Sharp angular shapes' }
  ];

  const backgroundOptions = [
    { value: 'none', label: 'Default', description: 'Clean minimal background' },
    { value: 'cyberpunk', label: 'Cyberpunk', description: 'Neon grid with electric pulses' },
    { value: 'nebula', label: 'Cosmic Nebula', description: 'Swirling space clouds' },
    { value: 'matrix', label: 'Digital Matrix', description: 'Flowing code patterns' },
    { value: 'aurora', label: 'Aurora Borealis', description: 'Dancing northern lights' },
    { value: 'synthwave', label: 'Synthwave', description: 'Retro 80s neon vibes' },
    { value: 'ocean', label: 'Deep Ocean', description: 'Underwater light rays' }
  ];

  const particleStyleOptions = [
    { value: 'default', label: 'Classic Dots', description: 'Simple circular particles' },
    { value: 'glow', label: 'Radiant Orbs', description: 'Multi-layered glowing spheres' },
    { value: 'crystalline', label: 'Crystal Shards', description: 'Faceted geometric crystals' },
    { value: 'plasma', label: 'Plasma Energy', description: 'Turbulent energy with tendrils' },
    { value: 'stardust', label: 'Stellar Bursts', description: 'Twinkling star-shaped particles' },
    { value: 'energy', label: 'Power Cores', description: 'Pulsing rings with bright cores' },
    { value: 'ethereal', label: 'Ghost Wisps', description: 'Flowing translucent forms' },
    { value: 'digital', label: 'Pixel Matrix', description: 'Blocky digital grid patterns' },
    { value: 'flame', label: 'Fire Tongues', description: 'Flickering flame-like shapes' },
    { value: 'electric', label: 'Lightning Bolts', description: 'Jagged electric arcs' }
  ];

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
        <div className="absolute top-10 right-0 w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-sm shadow-lg">
          <div className="p-3 border-b border-gray-200/50 dark:border-gray-700/50">
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Settings</h3>
          </div>
          
          <div className="p-3 space-y-4">
            {/* Dark Mode Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {isDarkMode ? (
                  <Moon className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                ) : (
                  <Sun className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                )}
                <span className="text-xs text-gray-700 dark:text-gray-300">
                  {isDarkMode ? 'Dark' : 'Light'} Mode
                </span>
              </div>
              <Switch
                checked={isDarkMode}
                onCheckedChange={toggleDarkMode}
                className="scale-75"
              />
            </div>

            {/* Background Environment Collapsible Section */}
            <Collapsible open={isBackgroundOpen} onOpenChange={setIsBackgroundOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                <div className="flex items-center space-x-2">
                  <Image className="w-3 h-3" />
                  <span>Background Environment</span>
                  {isBackgroundActive ? (
                    <CheckCircle className="w-3 h-3 text-green-600 dark:text-green-400" />
                  ) : (
                    <Circle className="w-3 h-3 text-gray-400 dark:text-gray-500" />
                  )}
                </div>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isBackgroundOpen ? 'rotate-180' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent className="overflow-hidden">
                <div className="pt-2">
                  <div className="relative">
                    <div className="absolute top-0 left-0 right-2 h-3 bg-gradient-to-b from-white/90 to-transparent dark:from-gray-900/90 pointer-events-none z-10 rounded-t" />
                    <div className="absolute bottom-0 left-0 right-2 h-3 bg-gradient-to-t from-white/90 to-transparent dark:from-gray-900/90 pointer-events-none z-10 rounded-b" />
                    
                    <ScrollArea className="h-32 w-full border border-gray-300/50 dark:border-gray-600/50 rounded bg-gray-50/50 dark:bg-gray-800/50 shadow-inner">
                      <RadioGroup value={backgroundType} onValueChange={handleBackgroundChange} className="space-y-3 p-2">
                        {backgroundOptions.map((option) => (
                          <div key={option.value} className="flex items-start space-x-2">
                            <RadioGroupItem value={option.value} id={`bg-${option.value}`} className="w-3 h-3 mt-0.5" />
                            <div className="flex-1 min-w-0">
                              <label htmlFor={`bg-${option.value}`} className="text-xs text-gray-600 dark:text-gray-400 cursor-pointer block">
                                {option.label}
                              </label>
                              <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">
                                {option.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </RadioGroup>
                    </ScrollArea>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Particle Style Collapsible Section */}
            <Collapsible open={isParticleStyleOpen} onOpenChange={setIsParticleStyleOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-3 h-3" />
                  <span>Particle Style</span>
                  {isParticleStyleActive ? (
                    <CheckCircle className="w-3 h-3 text-green-600 dark:text-green-400" />
                  ) : (
                    <Circle className="w-3 h-3 text-gray-400 dark:text-gray-500" />
                  )}
                </div>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isParticleStyleOpen ? 'rotate-180' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent className="overflow-hidden">
                <div className="pt-2">
                  <div className="relative">
                    <div className="absolute top-0 left-0 right-2 h-3 bg-gradient-to-b from-white/90 to-transparent dark:from-gray-900/90 pointer-events-none z-10 rounded-t" />
                    <div className="absolute bottom-0 left-0 right-2 h-3 bg-gradient-to-t from-white/90 to-transparent dark:from-gray-900/90 pointer-events-none z-10 rounded-b" />
                    
                    <ScrollArea className="h-40 w-full border border-gray-300/50 dark:border-gray-600/50 rounded bg-gray-50/50 dark:bg-gray-800/50 shadow-inner">
                      <RadioGroup value={particleStyle} onValueChange={handleParticleStyleChange} className="space-y-3 p-2">
                        {particleStyleOptions.map((option) => (
                          <div key={option.value} className="flex items-start space-x-2">
                            <RadioGroupItem value={option.value} id={`ps-${option.value}`} className="w-3 h-3 mt-0.5" />
                            <div className="flex-1 min-w-0">
                              <label htmlFor={`ps-${option.value}`} className="text-xs text-gray-600 dark:text-gray-400 cursor-pointer block">
                                {option.label}
                              </label>
                              <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">
                                {option.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </RadioGroup>
                    </ScrollArea>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Tracking Animation Collapsible Section */}
            <Collapsible open={isTrackingOpen} onOpenChange={setIsTrackingOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                <div className="flex items-center space-x-2">
                  <MousePointer className="w-3 h-3" />
                  <span>Tracking Animation</span>
                  {isAnimationActive ? (
                    <CheckCircle className="w-3 h-3 text-green-600 dark:text-green-400" />
                  ) : (
                    <Circle className="w-3 h-3 text-gray-400 dark:text-gray-500" />
                  )}
                </div>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isTrackingOpen ? 'rotate-180' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent className="overflow-hidden">
                <div className="pt-2">
                  <div className="relative">
                    <div className="absolute top-0 left-0 right-2 h-3 bg-gradient-to-b from-white/90 to-transparent dark:from-gray-900/90 pointer-events-none z-10 rounded-t" />
                    <div className="absolute bottom-0 left-0 right-2 h-3 bg-gradient-to-t from-white/90 to-transparent dark:from-gray-900/90 pointer-events-none z-10 rounded-b" />
                    
                    <ScrollArea className="h-32 w-full border border-gray-300/50 dark:border-gray-600/50 rounded bg-gray-50/50 dark:bg-gray-800/50 shadow-inner">
                      <RadioGroup value={trackingType} onValueChange={handleTrackingChange} className="space-y-3 p-2">
                        {trackingOptions.map((option) => (
                          <div key={option.value} className="flex items-start space-x-2">
                            <RadioGroupItem value={option.value} id={option.value} className="w-3 h-3 mt-0.5" />
                            <div className="flex-1 min-w-0">
                              <label htmlFor={option.value} className="text-xs text-gray-600 dark:text-gray-400 cursor-pointer block">
                                {option.label}
                              </label>
                              <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">
                                {option.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </RadioGroup>
                    </ScrollArea>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      )}
    </div>
  );
};
