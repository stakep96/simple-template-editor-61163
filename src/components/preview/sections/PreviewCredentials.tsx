import React from 'react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import { PreviewIcon } from '@/components/preview/PreviewIcon';
import type { CredentialsConfig } from '@/contexts/SiteEditorContext';

interface PreviewCredentialsProps {
  config: CredentialsConfig;
}

const PreviewCredentials: React.FC<PreviewCredentialsProps> = ({ config }) => {
  const { config: siteConfig } = useSiteEditor();
  
  if (!config.cards || config.cards.length === 0) return null;

  return (
    <section 
      className="py-6 px-4"
      style={{ backgroundColor: siteConfig.brand.background }}
    >
      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-2 gap-3">
          {config.cards.map((card) => (
            <div 
              key={card.id}
              className="p-3 rounded-xl flex flex-col items-center justify-center gap-2 shadow-sm"
              style={{ backgroundColor: siteConfig.brand.primary }}
            >
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${siteConfig.brand.accent}26` }}
              >
                <PreviewIcon 
                  iconValue={card.icon}
                  className="w-5 h-5" 
                  style={{ color: siteConfig.brand.accent }} 
                />
              </div>
              <p 
                className="text-xs font-medium text-center"
                style={{ 
                  color: siteConfig.brand.secondary,
                  fontFamily: 'var(--brand-text-font)'
                }}
              >
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PreviewCredentials;
