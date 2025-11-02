import React from 'react';
import { icons } from 'lucide-react';
import type { CredentialsConfig } from '@/contexts/SiteEditorContext';

interface PreviewCredentialsProps {
  config: CredentialsConfig;
}

const PreviewCredentials: React.FC<PreviewCredentialsProps> = ({ config }) => {
  if (!config.cards || config.cards.length === 0) return null;

  const getIcon = (iconName: string) => {
    const Icon = icons[iconName as keyof typeof icons];
    return Icon || icons.Award;
  };

  return (
    <section className="py-6 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-2 gap-4">
          {config.cards.map((card) => {
            const Icon = getIcon(card.icon);
            return (
              <div
                key={card.id}
                className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-border/40 bg-background/50 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ 
                    backgroundColor: 'var(--brand-primary)',
                    opacity: 0.9
                  }}
                >
                  <Icon 
                    className="w-6 h-6" 
                    style={{ color: 'white' }}
                  />
                </div>
                <p className="text-sm font-medium text-center"
                  style={{ 
                    color: 'var(--brand-title-color)',
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
