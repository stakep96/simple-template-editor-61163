import React from 'react';
import { Award } from 'lucide-react';
import { getIconByValue } from '@/lib/iconLibrary';
import { CustomIcon } from '@/components/editor/CustomIcon';

interface PreviewIconProps {
  iconValue: string;
  className?: string;
  style?: React.CSSProperties;
}

export const PreviewIcon: React.FC<PreviewIconProps> = ({ 
  iconValue, 
  className = 'w-5 h-5', 
  style 
}) => {
  const iconOption = getIconByValue(iconValue);
  
  if (!iconOption) {
    // Fallback para ícone padrão
    return <Award className={className} style={style} />;
  }
  
  if (iconOption.type === 'lucide' && iconOption.Icon) {
    const Icon = iconOption.Icon;
    return <Icon className={className} style={style} />;
  }
  
  if (iconOption.type === 'custom' && iconOption.path) {
    return <CustomIcon path={iconOption.path} className={className} style={style} />;
  }
  
  // Fallback
  return <Award className={className} style={style} />;
};
