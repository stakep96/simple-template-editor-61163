import React from 'react';
import { Check } from 'lucide-react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { PricingPlansConfig } from '@/contexts/SiteEditorContext';

interface PreviewPricingPlansProps {
  instanceId: string;
}

const PreviewPricingPlans: React.FC<PreviewPricingPlansProps> = ({ instanceId }) => {
  const { config } = useSiteEditor();
  const instance = config.moduleInstances[instanceId];
  const plansConfig = instance?.config as PricingPlansConfig;

  if (!plansConfig || !plansConfig.plans.length) return null;

  return (
    <section className="px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="grid gap-6" style={{
          gridTemplateColumns: `repeat(${Math.min(plansConfig.plans.length, 3)}, 1fr)`
        }}>
          {plansConfig.plans.map((plan) => (
            <div
              key={plan.id}
              className="border-2 rounded-2xl p-6 flex flex-col"
              style={{
                borderColor: config.brand.primary,
                backgroundColor: '#FFFFFF',
              }}
            >
              <div className="text-center mb-6">
                <h3 className="font-bold text-lg mb-3" style={{ color: config.brand.titleColor }}>
                  {plan.name}
                </h3>
                <div className="flex flex-col items-center gap-1 mb-2">
                  {plan.originalPrice && (
                    <div 
                      className="text-lg line-through opacity-60"
                      style={{ color: config.brand.textColor }}
                    >
                      R$ {plan.originalPrice}
                    </div>
                  )}
                  <div className="text-3xl font-bold" style={{ color: config.brand.primary }}>
                    R$ {plan.price}
                  </div>
                </div>
                <div className="text-sm opacity-75" style={{ color: config.brand.textColor }}>
                  {plan.period === 'mensal' && '/mês'}
                  {plan.period === 'trimestral' && '/trimestre'}
                  {plan.period === 'semestral' && '/semestre'}
                  {plan.period === 'anual' && '/ano'}
                  {plan.period === 'vitalicio' && 'pagamento único'}
                </div>
              </div>

              <div className="flex-1 space-y-3 mb-6">
                {plan.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: config.brand.primary }} />
                    <span className="text-sm" style={{ color: config.brand.textColor }}>
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href={plan.ctaLink || '#'}
                target={plan.ctaLink?.startsWith('http') ? '_blank' : '_self'}
                rel={plan.ctaLink?.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="w-full py-3 rounded-lg font-semibold text-center transition-all hover:scale-105"
                style={{
                  backgroundColor: config.brand.primary,
                  color: '#FFFFFF',
                }}
              >
                {plan.ctaText}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PreviewPricingPlans;
