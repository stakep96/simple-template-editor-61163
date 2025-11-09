import React, { useEffect, useState } from 'react';

interface CustomIconProps {
  path: string;
  className?: string;
  style?: React.CSSProperties;
}

export const CustomIcon: React.FC<CustomIconProps> = ({ path, className = '', style }) => {
  const [svgContent, setSvgContent] = useState<string>('');

  useEffect(() => {
    fetch(path)
      .then(res => res.text())
      .then(svg => {
        // Replace any hardcoded fills/strokes with currentColor
        const modifiedSvg = svg
          .replace(/fill="[^"]*"/g, 'fill="currentColor"')
          .replace(/stroke="[^"]*"/g, 'stroke="currentColor"');
        setSvgContent(modifiedSvg);
      })
      .catch(err => console.error('Error loading SVG:', err));
  }, [path]);

  return (
    <div 
      className={className}
      style={style}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};
