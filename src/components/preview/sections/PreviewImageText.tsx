import React from 'react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { ImageTextConfig } from '@/contexts/SiteEditorContext';

interface PreviewImageTextProps {
  instanceId: string;
}

const PreviewImageText: React.FC<PreviewImageTextProps> = ({ instanceId }) => {
  const { config } = useSiteEditor();
  const instance = config.moduleInstances[instanceId];
  const imageTextConfig = instance?.config as ImageTextConfig;

  if (!imageTextConfig) return null;

  return (
    <section 
      className="px-2.5 py-8"
      style={{ backgroundColor: config.brand.background }}
    >
      <div className="mx-auto max-w-md">
        {imageTextConfig.image && (
          <div className="w-full rounded-3xl overflow-hidden mb-6">
            <img 
              src={imageTextConfig.image} 
              alt={imageTextConfig.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        <h2 
          className="text-2xl font-bold mb-4"
          style={{ 
            color: config.brand.titleColor,
            fontFamily: 'var(--brand-title-font)'
          }}
        >
          {imageTextConfig.title}
        </h2>

        <p 
          className="text-sm leading-relaxed"
          style={{ 
            color: config.brand.textColor,
            fontFamily: 'var(--brand-text-font)'
          }}
        >
          {imageTextConfig.description}
        </p>
      </div>
    </section>
  );
};

export default PreviewImageText;
