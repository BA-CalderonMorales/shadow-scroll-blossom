
import { Sun, Moon } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useSettings } from '@/contexts/SettingsContext';

export const DarkModeToggle = () => {
  const { isDarkMode, setIsDarkMode } = useSettings();

  const toggleDarkMode = (checked: boolean) => {
    setIsDarkMode(checked);
  };

  return (
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
  );
};
