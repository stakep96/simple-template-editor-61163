import React from 'react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { BrandsConfig } from '@/contexts/SiteEditorContext';

interface PreviewBrandsProps {
  instanceId: string;
}

const PreviewBrands: React.FC<PreviewBrandsProps> = ({ instanceId }) => {
  const { config } = useSiteEditor();
  const instance = config.moduleInstances[instanceId];
  const brandsConfig = instance?.config as BrandsConfig;

  console.log('=== PreviewBrands Debug ===');
  console.log('instanceId:', instanceId);
  console.log('instance:', instance);
  console.log('brandsConfig:', brandsConfig);
  console.log('brandsConfig?.enabled:', brandsConfig?.enabled);
  console.log('brandsConfig?.logos:', brandsConfig?.logos);
  
  if (!brandsConfig || !brandsConfig.enabled) {
    console.log('❌ Retornando null: brandsConfig não existe ou não está habilitado');
    return null;
  }

  const validLogos = brandsConfig.logos.filter(logo => logo.url);
  console.log('✅ validLogos:', validLogos);
  console.log('validLogos.length:', validLogos.length);
  console.log('✅ Renderizando seção com', validLogos.length, 'logos');

  return (
    <section 
      className="py-16 px-4"
      style={{ backgroundColor: config.brand.background }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 
            className="text-2xl font-bold mb-4"
            style={{ 
              color: config.brand.titleColor,
              fontFamily: 'var(--brand-title-font)'
            }}
          >
            {brandsConfig.title}
          </h2>
          <p 
            className="text-base max-w-2xl mx-auto"
            style={{ 
              color: config.brand.textColor,
              fontFamily: 'var(--brand-text-font)'
            }}
          >
            {brandsConfig.description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto">
          {validLogos.length === 0 ? (
            // Placeholders quando não houver logos
            Array.from({ length: 4 }).map((_, index) => (
              <div 
                key={`placeholder-${index}`}
                className="flex items-center justify-center w-full aspect-square p-6 rounded-lg shadow-sm border border-dashed"
                style={{
                  backgroundColor: `${config.brand.primary}26`,
                  borderColor: config.brand.primary
                }}
              >
                <span className="text-sm" style={{ color: config.brand.textColor }}>Logo {index + 1}</span>
              </div>
            ))
          ) : (
            validLogos.map((logo, index) => {
              console.log(`Renderizando logo ${index}:`, logo);
              const boxStyle = brandsConfig.boxStyle || 'filled';
              const isOutlined = boxStyle === 'outlined';
              
              return (
                <div 
                  key={logo.id} 
                  className="flex items-center justify-center w-full aspect-square p-6 rounded-lg shadow-sm"
                  style={{
                    backgroundColor: isOutlined ? 'transparent' : '#ffffff',
                    border: isOutlined ? '2px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                >
                  <img 
                    src={logo.url} 
                    alt={logo.alt || `Logo ${index + 1}`} 
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      console.error(`Erro ao carregar logo ${index}:`, logo.url);
                      e.currentTarget.style.display = 'none';
                    }}
                    onLoad={() => console.log(`✅ Logo ${index} carregada com sucesso`)}
                  />
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default PreviewBrands;
