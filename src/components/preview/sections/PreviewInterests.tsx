import React from 'react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import { Badge } from '@/components/ui/badge';
import type { InterestsConfig } from '@/contexts/SiteEditorContext';

interface PreviewInterestsProps {
  instanceId: string;
}

const PreviewInterests: React.FC<PreviewInterestsProps> = ({ instanceId }) => {
  const { config } = useSiteEditor();
  const siteConfig = config.moduleInstances[instanceId]?.config as InterestsConfig;

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
            className="text-xl font-semibold mb-6"
            style={{ 
              color: config.brand.text,
              fontFamily: 'var(--brand-title-font)'
            }}
          >
            {siteConfig.title}
          </h2>

          <div className="flex flex-wrap gap-3">
            {siteConfig.tags.map((tag, index) => (
              <div
                key={index}
                className="px-6 py-2.5 rounded-full text-sm font-medium transition-transform hover:scale-105"
                style={{
                  backgroundColor: config.brand.primary,
                  color: config.brand.secondary,
                  fontFamily: 'var(--brand-text-font)'
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreviewInterests;
