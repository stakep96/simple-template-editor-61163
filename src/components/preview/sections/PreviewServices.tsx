import React from 'react';
import { Award, Users, Trophy, Star, CheckCircle, Shield, Target, Briefcase, Zap, Heart, TrendingUp, Medal, Circle, Check, CheckSquare, Dot, Lightbulb, Flame, Sparkles, Crown, Diamond, Gift, Home, Building, MapPin, Phone, Mail, User, Calendar, Clock, AlertCircle, Info, HelpCircle, BarChart, PieChart, Activity, FileText, Gavel, Scale, Car, Smartphone } from 'lucide-react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { ServicesConfig } from '@/contexts/SiteEditorContext';

const iconMap: Record<string, any> = {
  award: Award,
  users: Users,
  trophy: Trophy,
  star: Star,
  'check-circle': CheckCircle,
  check: Check,
  'check-square': CheckSquare,
  shield: Shield,
  target: Target,
  briefcase: Briefcase,
  zap: Zap,
  heart: Heart,
  'trending-up': TrendingUp,
  medal: Medal,
  circle: Circle,
  dot: Dot,
  lightbulb: Lightbulb,
  flame: Flame,
  sparkles: Sparkles,
  crown: Crown,
  diamond: Diamond,
  gift: Gift,
  home: Home,
  building: Building,
  'map-pin': MapPin,
  phone: Phone,
  mail: Mail,
  user: User,
  calendar: Calendar,
  clock: Clock,
  'alert-circle': AlertCircle,
  info: Info,
  'help-circle': HelpCircle,
  'bar-chart': BarChart,
  'pie-chart': PieChart,
  activity: Activity,
  'file-text': FileText,
  gavel: Gavel,
  scale: Scale,
  car: Car,
  smartphone: Smartphone,
};

interface PreviewServicesProps {
  config: ServicesConfig;
}

const PreviewServices: React.FC<PreviewServicesProps> = ({ config }) => {
  const { config: siteConfig } = useSiteEditor();
  
  if (!config.cards || config.cards.length === 0) return null;

  return (
    <section 
      className="py-12 px-4"
      style={{ backgroundColor: siteConfig.brand.background }}
    >
      <div className="max-w-3xl mx-auto space-y-4">
        {config.cards.map((card) => {
          const Icon = iconMap[card.icon] || Award;
          return (
            <div 
              key={card.id}
              className="p-6 rounded-2xl shadow-sm space-y-3"
              style={{ backgroundColor: siteConfig.brand.primary }}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${siteConfig.brand.accent}26` }}
                >
                  <Icon 
                    className="w-7 h-7" 
                    style={{ color: siteConfig.brand.accent }} 
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 
                    className="text-base font-bold mb-0.5 whitespace-nowrap overflow-hidden text-ellipsis"
                    style={{ 
                      color: siteConfig.brand.secondary,
                      fontFamily: 'var(--brand-title-font)'
                    }}
                  >
                    {card.title}
                  </h3>
                  <p 
                    className="text-xs font-medium whitespace-nowrap overflow-hidden text-ellipsis"
                    style={{ 
                      color: siteConfig.brand.secondary,
                      fontFamily: 'var(--brand-text-font)'
                    }}
                  >
                    {card.subtitle}
                  </p>
                </div>
              </div>
              <p 
                className="text-sm leading-relaxed"
                style={{ 
                  color: siteConfig.brand.secondary,
                  fontFamily: 'var(--brand-text-font)'
                }}
              >
                {card.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PreviewServices;
