import React from 'react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import { Circle, Check, CheckCircle, CheckSquare, Dot, Star, Heart, Award, Trophy, Shield, Target, Zap, Lightbulb, Flame, Sparkles, Crown, Diamond, Gift, Home, Building, MapPin, Phone, Mail, User, Users, Briefcase, Calendar, Clock, AlertCircle, Info, HelpCircle, TrendingUp, BarChart, PieChart, Activity } from 'lucide-react';
import type { ContentStyleConfig } from '@/contexts/SiteEditorContext';

interface PreviewContentStyleProps {
  instanceId: string;
}

const iconMap: Record<string, any> = {
  circle: Circle,
  check: Check,
  'check-circle': CheckCircle,
  'check-square': CheckSquare,
  dot: Dot,
  star: Star,
  heart: Heart,
  award: Award,
  trophy: Trophy,
  shield: Shield,
  target: Target,
  zap: Zap,
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
  users: Users,
  briefcase: Briefcase,
  calendar: Calendar,
  clock: Clock,
  'alert-circle': AlertCircle,
  info: Info,
  'help-circle': HelpCircle,
  'trending-up': TrendingUp,
  'bar-chart': BarChart,
  'pie-chart': PieChart,
  activity: Activity,
};

const PreviewContentStyle: React.FC<PreviewContentStyleProps> = ({ instanceId }) => {
  const { config } = useSiteEditor();
  const siteConfig = config.moduleInstances[instanceId]?.config as ContentStyleConfig;

  if (!siteConfig || !siteConfig.enabled) return null;

  return (
    <section 
      className="py-12 px-4"
      style={{ backgroundColor: config.brand.background }}
    >
      <div className="max-w-3xl mx-auto">
        <div 
          className="rounded-2xl p-8"
          style={{ 
            backgroundColor: config.brand.secondary,
          }}
        >
          <h2 
            className="text-base font-semibold mb-4"
            style={{ 
              color: config.brand.text,
              fontFamily: 'var(--brand-title-font)'
            }}
          >
            {siteConfig.title}
          </h2>

          <div className="space-y-2">
            {siteConfig.items.map((item) => {
              const IconComponent = iconMap[item.icon as keyof typeof iconMap] || Circle;
              
              return (
                <div key={item.id} className="flex items-center gap-3">
                  <IconComponent 
                    className="w-5 h-5 flex-shrink-0"
                    style={{ 
                      color: config.brand.primary
                    }}
                  />
                  <span 
                    className="text-sm"
                    style={{ 
                      color: config.brand.text,
                      fontFamily: 'var(--brand-text-font)'
                    }}
                  >
                    {item.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreviewContentStyle;
