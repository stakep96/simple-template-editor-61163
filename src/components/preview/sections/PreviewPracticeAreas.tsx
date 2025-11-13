import React from 'react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import { PreviewIcon } from '@/components/preview/PreviewIcon';
import type { PracticeAreasConfig } from '@/contexts/SiteEditorContext';

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
      className="px-6 py-8"
      style={{ backgroundColor: config.brand.background }}
    >
      <h2 
        className="text-xl font-bold text-center mb-6"
        style={{ 
          color: config.brand.titleColor,
          fontFamily: 'var(--brand-title-font)'
        }}
      >
        Áreas de Atuação
      </h2>

      <div className="grid grid-cols-2 gap-3">
        {practiceConfig.areas.map((area) => (
          <div
            key={area.id}
            className="p-4 rounded-2xl flex flex-col items-center justify-center text-center min-h-[100px]"
            style={{ backgroundColor: config.brand.primary }}
          >
            <div 
              className="p-2 rounded-lg mb-2"
              style={{ backgroundColor: `${config.brand.accent}26` }}
            >
              <PreviewIcon 
                iconValue={area.icon}
                className="w-6 h-6" 
                style={{ color: config.brand.accent }} 
              />
            </div>
            <span 
              className="text-xs font-semibold"
              style={{ 
                color: config.brand.secondary,
                fontFamily: 'var(--brand-text-font)'
              }}
            >
              {area.title}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PreviewPracticeAreas;
