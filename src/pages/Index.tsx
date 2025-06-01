
import InteractiveCanvas from "@/components/InteractiveCanvas";
import { SettingsMenu } from "@/components/SettingsMenu";
import { SettingsProvider } from "@/contexts/SettingsContext";

const Index = () => {
  return (
    <SettingsProvider>
      <div className="relative">
        <InteractiveCanvas />
        <SettingsMenu />
      </div>
    </SettingsProvider>
  );
};

export default Index;
