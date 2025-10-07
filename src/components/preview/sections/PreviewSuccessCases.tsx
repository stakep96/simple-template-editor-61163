import React from 'react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { SuccessCasesConfig } from '@/contexts/SiteEditorContext';

interface PreviewSuccessCasesProps {
  instanceId: string;
}

const PreviewSuccessCases: React.FC<PreviewSuccessCasesProps> = ({ instanceId }) => {
  const { config } = useSiteEditor();
  const instance = config.moduleInstances[instanceId];
  const casesConfig = instance?.config as SuccessCasesConfig;

  if (!casesConfig) return null;

  return (
    <section 
      className="px-6 py-12"
      style={{ backgroundColor: config.brand.secondary }}
    >
      <h2 
        className="text-xl font-bold text-center mb-6"
        style={{ color: config.brand.text }}
      >
        Cases de Sucesso
      </h2>

      <div className="space-y-4">
        {casesConfig.cases.map((caseItem) => (
          <div
            key={caseItem.id}
            className="rounded-2xl overflow-hidden"
            style={{ backgroundColor: config.brand.primary }}
          >
            {caseItem.image && (
              <div className="w-full h-40">
                <img 
                  src={caseItem.image} 
                  alt={caseItem.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <h3 
                className="font-bold text-sm mb-2"
                style={{ color: config.brand.accent }}
              >
                {caseItem.title}
              </h3>
              <p 
                className="text-xs"
                style={{ color: config.brand.secondary }}
              >
                {caseItem.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PreviewSuccessCases;
