import React from 'react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import { PreviewIcon } from '@/components/preview/PreviewIcon';
import type { ContentStyleConfig } from '@/contexts/SiteEditorContext';

interface PreviewContentStyleProps {
  instanceId: string;
}

const PreviewContentStyle: React.FC<PreviewContentStyleProps> = ({ instanceId }) => {
  const { config } = useSiteEditor();
  const siteConfig = config.moduleInstances[instanceId]?.config as ContentStyleConfig;

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

          <div className="space-y-2">
            {siteConfig.items.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <PreviewIcon 
                  iconValue={item.icon}
                  className="w-5 h-5 flex-shrink-0"
                  style={{ 
                    color: config.brand.accent
                  }}
                />
                <span 
                  className="text-sm"
                  style={{ 
                    color: config.brand.secondary,
                    fontFamily: 'var(--brand-text-font)'
                  }}
                >
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreviewContentStyle;
