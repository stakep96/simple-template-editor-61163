import React from 'react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { PracticeAreasConfig } from '@/contexts/SiteEditorContext';
import { Home, Smartphone, Lightbulb, Users, Shield, Car } from 'lucide-react';

const iconMap: Record<string, any> = {
  home: Home,
  smartphone: Smartphone,
  lightbulb: Lightbulb,
  users: Users,
  shield: Shield,
  car: Car,
};

interface PreviewPracticeAreasProps {
  instanceId: string;
}

const PreviewPracticeAreas: React.FC<PreviewPracticeAreasProps> = ({ instanceId }) => {
  const { config } = useSiteEditor();
  const instance = config.moduleInstances[instanceId];
  const practiceConfig = instance?.config as PracticeAreasConfig;

  if (!practiceConfig) return null;

  return (
    <section 
      className="px-6 py-12"
      style={{ backgroundColor: config.brand.secondary }}
    >
      <h2 
        className="text-xl font-bold text-center mb-6"
        style={{ color: config.brand.text }}
      >
        Áreas de Atuação
      </h2>

      <div className="grid grid-cols-2 gap-3">
        {practiceConfig.areas.map((area) => {
          const Icon = iconMap[area.icon] || Shield;
          return (
            <div
              key={area.id}
              className="p-4 rounded-2xl flex flex-col items-center justify-center text-center min-h-[100px]"
              style={{ backgroundColor: config.brand.primary }}
            >
              <Icon 
                className="w-6 h-6 mb-2" 
                style={{ color: config.brand.accent }} 
              />
              <span 
                className="text-xs font-semibold"
                style={{ color: config.brand.secondary }}
              >
                {area.title}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PreviewPracticeAreas;
