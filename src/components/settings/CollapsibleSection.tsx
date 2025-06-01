
import { ReactNode } from 'react';
import { ChevronDown, Circle, CheckCircle, LucideIcon } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Option {
  value: string;
  label: string;
  description: string;
}

interface CollapsibleSectionProps {
  title: string;
  icon: LucideIcon;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isActive: boolean;
  options: Option[];
  value: string;
  onValueChange: (value: string) => void;
  scrollHeight?: string;
}

export const CollapsibleSection = ({
  title,
  icon: Icon,
  isOpen,
  onOpenChange,
  isActive,
  options,
  value,
  onValueChange,
  scrollHeight = "h-32"
}: CollapsibleSectionProps) => {
  return (
    <Collapsible open={isOpen} onOpenChange={onOpenChange}>
      <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
        <div className="flex items-center space-x-2">
          <Icon className="w-3 h-3" />
          <span>{title}</span>
          {isActive ? (
            <CheckCircle className="w-3 h-3 text-green-600 dark:text-green-400" />
          ) : (
            <Circle className="w-3 h-3 text-gray-400 dark:text-gray-500" />
          )}
        </div>
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden">
        <div className="pt-2">
          <div className="relative">
            <div className="absolute top-0 left-0 right-2 h-3 bg-gradient-to-b from-white/90 to-transparent dark:from-gray-900/90 pointer-events-none z-10 rounded-t" />
            <div className="absolute bottom-0 left-0 right-2 h-3 bg-gradient-to-t from-white/90 to-transparent dark:from-gray-900/90 pointer-events-none z-10 rounded-b" />
            
            <ScrollArea className={`${scrollHeight} w-full border border-gray-300/50 dark:border-gray-600/50 rounded bg-gray-50/50 dark:bg-gray-800/50 shadow-inner`}>
              <RadioGroup value={value} onValueChange={onValueChange} className="space-y-3 p-2">
                {options.map((option) => (
                  <div key={option.value} className="flex items-start space-x-2">
                    <RadioGroupItem value={option.value} id={`${title.toLowerCase().replace(' ', '-')}-${option.value}`} className="w-3 h-3 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <label htmlFor={`${title.toLowerCase().replace(' ', '-')}-${option.value}`} className="text-xs text-gray-600 dark:text-gray-400 cursor-pointer block">
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
  );
};
