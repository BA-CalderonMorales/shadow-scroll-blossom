
import { ReactNode } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SettingsPanelProps {
  children: ReactNode;
}

export const SettingsPanel = ({ children }: SettingsPanelProps) => {
  return (
    <div className="absolute top-10 right-0 w-80 max-h-96 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-sm shadow-lg flex flex-col">
      <div className="p-3 border-b border-gray-200/50 dark:border-gray-700/50 flex-shrink-0">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Settings</h3>
      </div>
      
      <ScrollArea className="flex-1 overflow-hidden">
        <div className="p-3 space-y-4">
          {children}
        </div>
      </ScrollArea>
    </div>
  );
};
