
import { useState } from 'react';
import { Settings, Sun, Moon } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

export const SettingsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = (checked: boolean) => {
    setIsDarkMode(checked);
    if (checked) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

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
        <div className="absolute top-10 right-0 w-72 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-sm shadow-lg">
          <div className="p-3 border-b border-gray-200/50 dark:border-gray-700/50">
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Settings</h3>
          </div>
          
          <div className="p-3 space-y-3">
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
          </div>
        </div>
      )}
    </div>
  );
};
