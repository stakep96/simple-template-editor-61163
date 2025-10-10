import React from 'react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { ButtonConfig } from '@/contexts/SiteEditorContext';

interface PreviewButtonProps {
  instanceId: string;
}

const PreviewButton: React.FC<PreviewButtonProps> = ({ instanceId }) => {
  const { config } = useSiteEditor();
  const instance = config.moduleInstances[instanceId];
  const buttonConfig = instance?.config as ButtonConfig;

  if (!buttonConfig) return null;

  return (
    <section className="px-6 py-8 flex justify-center">
      <a
        href={buttonConfig.link || '#'}
        target={buttonConfig.link.startsWith('http') ? '_blank' : '_self'}
        rel={buttonConfig.link.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="inline-block px-8 py-3 rounded-lg font-semibold text-center transition-all hover:scale-105"
        style={{
          backgroundColor: config.brand.primary,
          color: '#FFFFFF',
        }}
      >
        {buttonConfig.ctaText}
      </a>
    </section>
  );
};

export default PreviewButton;
