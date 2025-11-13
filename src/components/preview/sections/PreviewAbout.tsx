import React from 'react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { AboutConfig } from '@/contexts/SiteEditorContext';
import { Instagram, Facebook, Linkedin, Twitter, Youtube, MessageCircle, Music } from 'lucide-react';
import { PreviewIcon } from '@/components/preview/PreviewIcon';

interface PreviewAboutProps {
  instanceId: string;
}

const PreviewAbout: React.FC<PreviewAboutProps> = ({ instanceId }) => {
  const { config } = useSiteEditor();
  const instance = config.moduleInstances[instanceId];
  const aboutConfig = instance?.config as AboutConfig;

  if (!aboutConfig) return null;

  return (
    <section 
      className="px-2.5 py-8"
      style={{ backgroundColor: config.brand.background }}
    >
      <div 
        className="mx-auto p-4 rounded-3xl"
        style={{ 
          backgroundColor: `${config.brand.primary}26`
        }}
      >
        <h2 
          className="text-xl font-bold text-center mb-6"
          style={{ 
            color: config.brand.titleColor,
            fontFamily: 'var(--brand-title-font)'
          }}
        >
          {aboutConfig.sectionTitle}
        </h2>

        <div className="flex flex-col items-center">
          {aboutConfig.photo && (
            <div 
              className="w-full h-80 rounded-3xl mb-4 overflow-hidden border-4"
              style={{ borderColor: config.brand.primary }}
            >
              <img 
                src={aboutConfig.photo} 
                alt={aboutConfig.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {aboutConfig.socialLinks && aboutConfig.socialLinks.length > 0 && (
            <div className="flex gap-3 mb-3">
              {aboutConfig.socialLinks.map((link) => {
                const icons = {
                  instagram: Instagram,
                  facebook: Facebook,
                  linkedin: Linkedin,
                  twitter: Twitter,
                  youtube: Youtube,
                  tiktok: Music,
                  whatsapp: MessageCircle,
                };
                const Icon = icons[link.platform];
                
                return link.url ? (
                  <a 
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: config.brand.primary }}
                  >
                    <Icon className="w-4 h-4" style={{ color: config.brand.accent }} />
                  </a>
                ) : null;
              })}
            </div>
          )}

          <h3
            className="text-lg font-bold mb-1"
            style={{ 
              color: config.brand.titleColor,
              fontFamily: 'var(--brand-title-font)'
            }}
          >
            {aboutConfig.name}
          </h3>
          <p 
            className="text-xs mb-4 text-center"
            style={{ 
              color: config.brand.textColor,
              fontFamily: 'var(--brand-text-font)'
            }}
          >
            {aboutConfig.title}
          </p>
          <p 
            className="text-sm text-center mb-6"
            style={{ 
              color: config.brand.textColor,
              fontFamily: 'var(--brand-text-font)'
            }}
          >
            {aboutConfig.description}
          </p>

          {aboutConfig.education && aboutConfig.education.length > 0 && (
            <div className="w-full space-y-3">
              {aboutConfig.education.map((item) => (
                <div 
                  key={item.id}
                  className="p-4 rounded-2xl flex gap-3"
                  style={{ backgroundColor: config.brand.primary }}
                >
                  <div 
                    className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${config.brand.accent}26` }}
                  >
                    <PreviewIcon 
                      iconValue={item.icon}
                      className="w-5 h-5" 
                      style={{ color: config.brand.accent }} 
                    />
                  </div>
                  <p 
                    className="text-xs leading-relaxed"
                    style={{ 
                      color: config.brand.secondary,
                      fontFamily: 'var(--brand-text-font)'
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PreviewAbout;
