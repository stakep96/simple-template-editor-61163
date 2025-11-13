import React from 'react';
import { MapPin, Clock } from 'lucide-react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { LocationConfig } from '@/contexts/SiteEditorContext';

interface PreviewLocationProps {
  instanceId: string;
}

const PreviewLocation: React.FC<PreviewLocationProps> = ({ instanceId }) => {
  const { config } = useSiteEditor();
  const instance = config.moduleInstances[instanceId];
  const locationConfig = instance?.config as LocationConfig;

  if (!locationConfig) return null;

  return (
    <section className="pt-8 pb-8" style={{ backgroundColor: 'var(--brand-background)' }}>
      <div className="max-w-4xl mx-auto px-4">
        <h2 
          className="text-2xl font-bold mb-6 text-center"
          style={{ 
            color: 'var(--brand-title-color)',
            fontFamily: 'var(--brand-title-font)'
          }}
        >
          {locationConfig.title}
        </h2>

        <div className="grid md:grid-cols-1 gap-6 mb-8">
          {/* Address and Hours */}
          <div className="space-y-4">
            {/* Address */}
            <div className="flex items-start gap-3">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'var(--brand-primary)' }}
              >
                <MapPin 
                  className="w-5 h-5" 
                  style={{ color: 'var(--brand-accent)' }}
                />
              </div>
              <div>
                <h3 
                  className="font-semibold text-sm mb-1"
                  style={{ 
                    color: 'var(--brand-title-color)',
                    fontFamily: 'var(--brand-title-font)'
                  }}
                >
                  Endereço
                </h3>
                <p 
                  className="text-sm whitespace-pre-line"
                  style={{ 
                    color: 'var(--brand-text-color)',
                    fontFamily: 'var(--brand-text-font)'
                  }}
                >
                  {locationConfig.address}
                </p>
              </div>
            </div>

            {/* Business Hours */}
            {locationConfig.businessHours.length > 0 && (
              <div className="flex items-start gap-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'var(--brand-primary)' }}
                >
                  <Clock 
                    className="w-5 h-5" 
                    style={{ color: 'var(--brand-accent)' }}
                  />
                </div>
                <div>
                  <h3 
                    className="font-semibold text-sm mb-2"
                    style={{ 
                      color: 'var(--brand-title-color)',
                      fontFamily: 'var(--brand-title-font)'
                    }}
                  >
                    Horário de Atendimento
                  </h3>
                  <div className="space-y-1">
                    {locationConfig.businessHours.map((hour) => (
                      <div 
                        key={hour.id} 
                        className="text-sm"
                        style={{ 
                          color: 'var(--brand-text-color)',
                          fontFamily: 'var(--brand-text-font)'
                        }}
                      >
                        <span className="font-medium">{hour.day}:</span> {hour.hours}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Map - Full Width */}
      {locationConfig.mapEmbedUrl && (
        <div className="w-full h-64">
          <iframe
            src={locationConfig.mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localização no mapa"
          />
        </div>
      )}
    </section>
  );
};

export default PreviewLocation;
