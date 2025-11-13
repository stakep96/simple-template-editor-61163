import React from 'react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { MetricsConfig } from '@/contexts/SiteEditorContext';
import * as LucideIcons from 'lucide-react';

interface PreviewMetricsProps {
  instanceId: string;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  instagram: LucideIcons.Instagram,
  facebook: LucideIcons.Facebook,
  twitter: LucideIcons.Twitter,
  linkedin: LucideIcons.Linkedin,
  youtube: LucideIcons.Youtube,
  tiktok: LucideIcons.Music,
  smartphone: LucideIcons.Smartphone,
  globe: LucideIcons.Globe,
  share2: LucideIcons.Share2,
};

const PreviewMetrics: React.FC<PreviewMetricsProps> = ({ instanceId }) => {
  const { config } = useSiteEditor();
  const siteConfig = config.moduleInstances[instanceId]?.config as MetricsConfig;

  if (!siteConfig || !siteConfig.enabled) return null;

  return (
    <section 
      className="py-8 px-4"
      style={{ backgroundColor: config.brand.background }}
    >
      <div className="max-w-4xl mx-auto">
        <h2 
          className="text-2xl font-bold text-center mb-8"
          style={{ 
            color: config.brand.titleColor,
            fontFamily: 'var(--brand-title-font)'
          }}
        >
          {siteConfig.title}
        </h2>

        <div className="space-y-4">
          {siteConfig.metrics.map((metric) => {
            const Icon = iconMap[metric.icon] || LucideIcons.BarChart;
            
            return (
              <div 
                key={metric.id}
                className="rounded-2xl p-5"
                style={{ 
                  backgroundColor: config.brand.primary,
                }}
              >
                {/* Header com ícone, nome e seguidores */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: config.brand.secondary }}
                    >
                      <Icon className="w-4 h-4" style={{ color: config.brand.primary }} />
                    </div>
                    <h3 
                      className="text-sm font-bold"
                      style={{ 
                        color: config.brand.secondary,
                        fontFamily: 'var(--brand-title-font)'
                      }}
                    >
                      {metric.platform}
                    </h3>
                  </div>
                  
                  <div 
                    className="text-2xl font-bold"
                    style={{ 
                      color: config.brand.accent,
                      fontFamily: 'var(--brand-title-font)'
                    }}
                  >
                    {metric.followers}
                  </div>
                </div>

                {/* Grid de métricas */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p 
                      className="text-xs mb-0.5"
                      style={{ 
                        color: config.brand.secondary,
                        opacity: 0.6,
                        fontFamily: 'var(--brand-text-font)'
                      }}
                    >
                      Engajamento
                    </p>
                    <p 
                      className="text-sm font-semibold"
                      style={{ 
                        color: config.brand.accent,
                        fontFamily: 'var(--brand-text-font)'
                      }}
                    >
                      {metric.engagement}
                    </p>
                  </div>
                  <div>
                    <p 
                      className="text-xs mb-0.5"
                      style={{ 
                        color: config.brand.secondary,
                        opacity: 0.6,
                        fontFamily: 'var(--brand-text-font)'
                      }}
                    >
                      Views Mensais
                    </p>
                    <p 
                      className="text-sm font-semibold"
                      style={{ 
                        color: config.brand.secondary,
                        fontFamily: 'var(--brand-text-font)'
                      }}
                    >
                      {metric.monthlyViews}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PreviewMetrics;
