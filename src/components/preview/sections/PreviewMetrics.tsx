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
      className="py-16 px-4"
      style={{ backgroundColor: config.brand.background }}
    >
      <div className="max-w-4xl mx-auto">
        <h2 
          className="text-3xl font-bold text-center mb-12"
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
                className="rounded-2xl p-6"
                style={{ 
                  backgroundColor: config.brand.primary,
                }}
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: config.brand.secondary }}
                  >
                    <Icon className="w-6 h-6" style={{ color: config.brand.primary }} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-4">
                      <h3 
                        className="text-lg font-bold"
                        style={{ 
                          color: config.brand.secondary,
                          fontFamily: 'var(--brand-title-font)'
                        }}
                      >
                        {metric.platform}
                      </h3>
                      <div 
                        className="text-3xl font-bold"
                        style={{ 
                          color: config.brand.accent,
                          fontFamily: 'var(--brand-title-font)'
                        }}
                      >
                        {metric.followers}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p 
                          className="text-xs mb-1"
                          style={{ 
                            color: config.brand.secondary,
                            opacity: 0.7,
                            fontFamily: 'var(--brand-text-font)'
                          }}
                        >
                          Engajamento
                        </p>
                        <p 
                          className="text-base font-semibold"
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
                          className="text-xs mb-1"
                          style={{ 
                            color: config.brand.secondary,
                            opacity: 0.7,
                            fontFamily: 'var(--brand-text-font)'
                          }}
                        >
                          Views Mensais
                        </p>
                        <p 
                          className="text-base font-semibold"
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
