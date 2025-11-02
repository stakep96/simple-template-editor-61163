import React from 'react';
import { Award, Users, Trophy, Star, CheckCircle, Shield, Target, Briefcase, Zap, Heart, TrendingUp, Medal } from 'lucide-react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { CredentialsConfig } from '@/contexts/SiteEditorContext';

const iconMap: Record<string, any> = {
  award: Award,
  users: Users,
  trophy: Trophy,
  star: Star,
  'check-circle': CheckCircle,
  shield: Shield,
  target: Target,
  briefcase: Briefcase,
  zap: Zap,
  heart: Heart,
  'trending-up': TrendingUp,
  medal: Medal,
};

interface PreviewCredentialsProps {
  config: CredentialsConfig;
}

const PreviewCredentials: React.FC<PreviewCredentialsProps> = ({ config }) => {
  const { config: siteConfig } = useSiteEditor();
  
  if (!config.cards || config.cards.length === 0) return null;

  return (
    <section 
      className="py-6 px-4"
      style={{ backgroundColor: siteConfig.brand.background }}
    >
      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-2 gap-3">
          {config.cards.map((card) => {
            const Icon = iconMap[card.icon] || Award;
            return (
              <div 
                key={card.id}
                className="p-4 rounded-2xl flex flex-col items-center justify-center gap-2"
                style={{ backgroundColor: siteConfig.brand.primary }}
              >
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${siteConfig.brand.accent}26` }}
                >
                  <Icon 
                    className="w-5 h-5" 
                    style={{ color: siteConfig.brand.accent }} 
                  />
                </div>
                <p 
                  className="text-xs leading-relaxed text-center"
                  style={{ 
                    color: siteConfig.brand.secondary,
                    fontFamily: 'var(--brand-text-font)'
                  }}
                >
                  {card.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PreviewCredentials;
