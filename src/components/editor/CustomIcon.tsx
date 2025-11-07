import React from 'react';

interface CustomIconProps {
  path: string;
  className?: string;
  style?: React.CSSProperties;
}

export const CustomIcon: React.FC<CustomIconProps> = ({ path, className = '', style }) => {
  return (
    <img 
      src={path} 
      alt="icon" 
      className={className}
      style={style}
    />
  );
};
