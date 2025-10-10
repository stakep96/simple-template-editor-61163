import React from 'react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { SuccessCasesConfig } from '@/contexts/SiteEditorContext';
import { Trophy, Handshake, Award, Target, TrendingUp, CheckCircle, Star, Heart, ThumbsUp } from 'lucide-react';

interface PreviewSuccessCasesProps {
  instanceId: string;
}

const iconMap = {
  'trophy': Trophy,
  'handshake': Handshake,
  'award': Award,
  'target': Target,
  'trending-up': TrendingUp,
  'check-circle': CheckCircle,
  'star': Star,
  'heart': Heart,
  'thumbs-up': ThumbsUp,
};

const PreviewSuccessCases: React.FC<PreviewSuccessCasesProps> = ({ instanceId }) => {
  const { config } = useSiteEditor();
  const instance = config.moduleInstances[instanceId];
  const casesConfig = instance?.config as SuccessCasesConfig;

  if (!casesConfig) return null;

  const [firstCase, ...restCases] = casesConfig.cases;

  return (
    <section 
      className="py-12 relative"
      style={{ backgroundColor: config.brand.secondary }}
    >
      <h2 
        className="text-2xl font-bold text-center mb-8 px-6"
        style={{ color: config.brand.titleColor }}
      >
        Cases de Sucesso
      </h2>

      {/* Container com imagem e primeiro card sobreposto */}
      {casesConfig.backgroundImage && firstCase && (
        <div className="mb-6 relative">
          <div className="w-full h-96 overflow-hidden relative rounded-t-2xl">
            <img 
              src={casesConfig.backgroundImage} 
              alt="Cases de Sucesso"
              className="w-full h-full object-cover"
            />
            {/* Gradiente fade na parte inferior */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
              style={{
                background: `linear-gradient(to bottom, transparent, ${config.brand.background})`
              }}
            />
          </div>
          
          {/* Primeiro card sobreposto */}
          <div className="absolute -bottom-20 left-0 right-0 px-6">
            <div className="max-w-2xl mx-auto">
              {(() => {
                const IconComponent = iconMap[firstCase.icon as keyof typeof iconMap] || Trophy;
                return (
                  <div
                    className="rounded-2xl p-5 shadow-lg"
                    style={{ backgroundColor: config.brand.primary }}
                  >
                    <div className="flex items-start gap-3">
                      <div 
                        className="p-2.5 rounded-lg flex-shrink-0"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-bold text-base mb-1">
                          {firstCase.title}
                        </h3>
                        <p className="text-white/90 text-sm mb-2">
                          {firstCase.description}
                        </p>
                        <p className="text-white/70 text-xs">
                          <span className="font-semibold">Resultado:</span> {firstCase.result}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Demais cards */}
      <div className="max-w-2xl mx-auto space-y-6 mt-24 px-6">
        {restCases.map((caseItem) => {
          const IconComponent = iconMap[caseItem.icon as keyof typeof iconMap] || Trophy;
          
          return (
            <div
              key={caseItem.id}
              className="rounded-2xl p-5 shadow-lg"
              style={{ backgroundColor: config.brand.primary }}
            >
              <div className="flex items-start gap-3">
                <div 
                  className="p-2.5 rounded-lg flex-shrink-0"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                >
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold text-base mb-1">
                    {caseItem.title}
                  </h3>
                  <p className="text-white/90 text-sm mb-2">
                    {caseItem.description}
                  </p>
                  <p className="text-white/70 text-xs">
                    <span className="font-semibold">Resultado:</span> {caseItem.result}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PreviewSuccessCases;
