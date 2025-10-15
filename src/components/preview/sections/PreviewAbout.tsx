import React from 'react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { AboutConfig } from '@/contexts/SiteEditorContext';
import { Instagram, Facebook, Linkedin, GraduationCap } from 'lucide-react';

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
      className="px-6 py-12"
      style={{ backgroundColor: config.brand.background }}
    >
      <div 
        className="max-w-lg mx-auto p-6 rounded-3xl"
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
          Sobre mim
        </h2>

        <div className="flex flex-col items-center">
          {aboutConfig.photo && (
            <div 
              className="w-48 h-64 rounded-3xl mb-4 overflow-hidden border-4"
              style={{ borderColor: config.brand.primary }}
            >
              <img 
                src={aboutConfig.photo} 
                alt={aboutConfig.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="flex gap-3 mb-3">
            {aboutConfig.socialLinks?.instagram && (
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: config.brand.primary }}
              >
                <Instagram className="w-4 h-4" style={{ color: config.brand.secondary }} />
              </div>
            )}
            {aboutConfig.socialLinks?.facebook && (
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: config.brand.primary }}
              >
                <Facebook className="w-4 h-4" style={{ color: config.brand.secondary }} />
              </div>
            )}
            {aboutConfig.socialLinks?.linkedin && (
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: config.brand.primary }}
              >
                <Linkedin className="w-4 h-4" style={{ color: config.brand.secondary }} />
              </div>
            )}
          </div>

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
              {aboutConfig.education.map((edu, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-2xl flex gap-3"
                  style={{ backgroundColor: config.brand.primary }}
                >
                  <div className="flex-shrink-0">
                    <GraduationCap 
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
                    {edu}
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
