import React from 'react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import { Circle, Check } from 'lucide-react';
import type { ContentStyleConfig } from '@/contexts/SiteEditorContext';

interface PreviewContentStyleProps {
  instanceId: string;
}

const iconMap = {
  circle: Circle,
  check: Check,
};

const PreviewContentStyle: React.FC<PreviewContentStyleProps> = ({ instanceId }) => {
  const { config } = useSiteEditor();
  const siteConfig = config.moduleInstances[instanceId]?.config as ContentStyleConfig;

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

          <div className="space-y-3">
            {siteConfig.items.map((item) => {
              const IconComponent = iconMap[item.icon as keyof typeof iconMap] || Circle;
              
              return (
                <div key={item.id} className="flex items-center gap-3">
                  <IconComponent 
                    className="w-3 h-3 flex-shrink-0"
                    style={{ 
                      color: config.brand.primary,
                      fill: config.brand.primary
                    }}
                  />
                  <span 
                    className="text-base"
                    style={{ 
                      color: config.brand.text,
                      fontFamily: 'var(--brand-text-font)'
                    }}
                  >
                    {item.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreviewContentStyle;
