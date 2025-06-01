
import InteractiveCanvas from "@/components/InteractiveCanvas";
import { SettingsMenu } from "@/components/SettingsMenu";

const Index = () => {
  return (
    <div className="relative">
      <InteractiveCanvas />
      <SettingsMenu />
    </div>
  );
};

export default Index;
