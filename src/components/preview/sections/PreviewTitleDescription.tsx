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
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 
          className="text-4xl font-bold mb-4" 
          style={{ 
            fontFamily: 'var(--brand-title-font)',
            color: 'var(--brand-title-color)',
          }}
        >
          {config.title}
        </h2>
        {config.description && (
          <p 
            className="text-lg" 
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
