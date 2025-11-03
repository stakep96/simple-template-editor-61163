import React from 'react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { DemographicsConfig } from '@/contexts/SiteEditorContext';

interface PreviewDemographicsProps {
  instanceId: string;
}

const PreviewDemographics: React.FC<PreviewDemographicsProps> = ({ instanceId }) => {
  const { config } = useSiteEditor();
  const siteConfig = config.moduleInstances[instanceId]?.config as DemographicsConfig;

  if (!siteConfig || !siteConfig.enabled) return null;

  return (
    <section 
      className="py-12 px-4"
      style={{ backgroundColor: config.brand.background }}
    >
      <div className="container max-w-4xl mx-auto">
        <div 
          className="rounded-2xl p-8"
          style={{ 
            backgroundColor: config.brand.secondary,
          }}
        >
          <h2 
            className="text-base font-semibold mb-4"
            style={{ 
              color: config.brand.text,
              fontFamily: 'var(--brand-title-font)'
            }}
          >
            {siteConfig.title}
          </h2>

          <div className="grid grid-cols-2 gap-6">
            {siteConfig.stats.map((stat) => (
              <div key={stat.id} className="text-center">
                <div 
                  className="text-2xl font-bold mb-1"
                  style={{ 
                    color: config.brand.primary,
                    fontFamily: 'var(--brand-title-font)'
                  }}
                >
                  {stat.value}
                </div>
                <div 
                  className="text-xs"
                  style={{ 
                    color: config.brand.text,
                    fontFamily: 'var(--brand-text-font)'
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreviewDemographics;
