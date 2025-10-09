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

  return (
    <section 
      className="px-6 py-12"
      style={{ backgroundColor: config.brand.secondary }}
    >
      <h2 
        className="text-2xl font-bold text-center mb-8"
        style={{ color: config.brand.text }}
      >
        Cases de Sucesso
      </h2>

      <div className="max-w-2xl mx-auto space-y-6">
        {casesConfig.cases.map((caseItem) => {
          const IconComponent = iconMap[caseItem.icon as keyof typeof iconMap] || Trophy;
          
          return (
            <div
              key={caseItem.id}
              className="relative rounded-2xl overflow-hidden"
            >
              {/* Imagem de fundo */}
              {caseItem.image && (
                <div className="w-full h-64">
                  <img 
                    src={caseItem.image} 
                    alt={caseItem.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              {/* Card sobreposto */}
              <div 
                className="absolute bottom-4 left-4 right-4 rounded-2xl p-5 shadow-lg"
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
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PreviewSuccessCases;
