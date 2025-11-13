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
      <div className="max-w-3xl mx-auto">
        <div 
          className="rounded-2xl p-8"
          style={{ 
            backgroundColor: config.brand.primary,
          }}
        >
          <h2 
            className="text-base font-semibold mb-4"
            style={{ 
              color: config.brand.secondary,
              fontFamily: 'var(--brand-title-font)'
            }}
          >
            {siteConfig.title}
          </h2>

          <div className="flex flex-wrap gap-2">
            {siteConfig.tags.map((tag, index) => (
              <div
                key={index}
                className="px-4 py-1.5 rounded-full text-xs font-medium transition-transform hover:scale-105"
                style={{
                  backgroundColor: config.brand.accent,
                  color: config.brand.primary,
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
