import React from 'react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { BenefitsConfig } from '@/contexts/SiteEditorContext';
import { BadgeCheck } from 'lucide-react';

interface PreviewBenefitsProps {
  config: BenefitsConfig;
}

const PreviewBenefits: React.FC<PreviewBenefitsProps> = ({ config }) => {
  const { config: siteConfig } = useSiteEditor();
  
  return (
    <section className="px-6 py-12" style={{ backgroundColor: siteConfig.brand.background }}>
      <div className="max-w-2xl mx-auto">
        <div 
          className="rounded-3xl p-8 shadow-lg border-4"
          style={{ 
            backgroundColor: `${siteConfig.brand.primary}15`,
            borderColor: siteConfig.brand.primary
          }}
        >
          <h2 
            className="text-xl font-bold text-center mb-6"
            style={{ 
              color: siteConfig.brand.titleColor,
              fontFamily: 'var(--brand-title-font)'
            }}
          >
            {config.title}
          </h2>
          
          <div className="space-y-3 mb-6">
            {config.benefits.map((benefit) => (
              <div key={benefit.id} className="flex items-start gap-2">
                <BadgeCheck 
                  className="w-5 h-5 flex-shrink-0 mt-0.5"
                  style={{ color: siteConfig.brand.primary }}
                />
                <p 
                  className="text-sm"
                  style={{ 
                    color: siteConfig.brand.textColor,
                    fontFamily: 'var(--brand-text-font)'
                  }}
                >
                  {benefit.text}
                </p>
              </div>
            ))}
          </div>
          
          <a
            href={config.ctaLink || '#'}
            className="block w-full py-3 px-6 rounded-full text-center text-base font-semibold transition-all hover:opacity-90"
            style={{ 
              backgroundColor: siteConfig.brand.primary,
              color: '#FFFFFF'
            }}
          >
          {config.ctaText}
          </a>
        </div>
      </div>
    </section>
  );
};

export default PreviewBenefits;
