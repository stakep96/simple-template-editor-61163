import React from 'react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { TitleDescriptionConfig } from '@/contexts/SiteEditorContext';

interface PreviewTitleDescriptionProps {
  instanceId: string;
}

const PreviewTitleDescription: React.FC<PreviewTitleDescriptionProps> = ({ instanceId }) => {
  const { config: siteConfig } = useSiteEditor();
  const config = siteConfig.moduleInstances[instanceId]?.config as TitleDescriptionConfig;

  if (!config) return null;

  return (
    <section className="py-6 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 
          className="text-2xl font-bold mb-1"
          style={{ 
            fontFamily: 'var(--brand-title-font)',
            color: 'var(--brand-title-color)',
          }}
        >
          {config.title}
        </h2>
        {config.description && (
          <p 
            className="text-base" 
            style={{ 
              fontFamily: 'var(--brand-text-font)',
              color: 'var(--brand-text-color)',
            }}
          >
            {config.description}
          </p>
        )}
      </div>
    </section>
  );
};

export default PreviewTitleDescription;
