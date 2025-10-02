import React from 'react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import { Instagram, Facebook, Linkedin, GraduationCap } from 'lucide-react';

const PreviewAbout = () => {
  const { config } = useSiteEditor();

  return (
    <section 
      className="px-6 py-12"
      style={{ backgroundColor: config.brand.secondary }}
    >
      <h2 
        className="text-xl font-bold text-center mb-6"
        style={{ color: config.brand.text }}
      >
        Sobre mim
      </h2>

      <div className="flex flex-col items-center">
        {config.about.photo && (
          <div 
            className="w-40 h-52 rounded-3xl mb-4 overflow-hidden border-4"
            style={{ borderColor: config.brand.primary }}
          >
            <img 
              src={config.about.photo} 
              alt={config.about.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex gap-3 mb-3">
          {config.about.socialLinks.instagram && (
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: config.brand.primary }}
            >
              <Instagram className="w-4 h-4" style={{ color: config.brand.secondary }} />
            </div>
          )}
          {config.about.socialLinks.facebook && (
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: config.brand.primary }}
            >
              <Facebook className="w-4 h-4" style={{ color: config.brand.secondary }} />
            </div>
          )}
          {config.about.socialLinks.linkedin && (
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
          style={{ color: config.brand.text }}
        >
          {config.about.name}
        </h3>
        <p 
          className="text-xs mb-4 text-center"
          style={{ color: config.brand.text, opacity: 0.8 }}
        >
          {config.about.title}
        </p>
        <p 
          className="text-sm text-center mb-6"
          style={{ color: config.brand.text }}
        >
          {config.about.description}
        </p>

        {config.about.education.length > 0 && (
          <div className="w-full space-y-3">
            {config.about.education.map((edu, index) => (
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
                  style={{ color: config.brand.secondary }}
                >
                  {edu}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PreviewAbout;
