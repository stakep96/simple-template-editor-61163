import React from 'react';
import { icons } from 'lucide-react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { CredentialsConfig } from '@/contexts/SiteEditorContext';

interface PreviewCredentialsProps {
  config: CredentialsConfig;
}

const PreviewCredentials: React.FC<PreviewCredentialsProps> = ({ config }) => {
  const { config: siteConfig } = useSiteEditor();
  
  if (!config.cards || config.cards.length === 0) return null;

  const getIcon = (iconName: string) => {
    const Icon = icons[iconName as keyof typeof icons];
    return Icon || icons.Award;
  };

  return (
    <section 
      className="py-6 px-4"
      style={{ backgroundColor: siteConfig.brand.background }}
    >
      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-2 gap-4">
          {config.cards.map((card) => {
            const Icon = getIcon(card.icon);
            return (
              <div
                key={card.id}
                className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border shadow-sm hover:shadow-md transition-shadow"
                style={{ 
                  backgroundColor: `${siteConfig.brand.background}`,
                  borderColor: `${siteConfig.brand.primary}40`
                }}
              >
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ 
                    backgroundColor: siteConfig.brand.primary
                  }}
                >
                  <Icon 
                    className="w-6 h-6" 
                    style={{ color: '#FFFFFF' }}
                  />
                </div>
                <p 
                  className="text-sm font-medium text-center"
                  style={{ 
                    color: siteConfig.brand.titleColor,
                    fontFamily: 'var(--brand-text-font)'
                  }}
                >
                  {card.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PreviewCredentials;
