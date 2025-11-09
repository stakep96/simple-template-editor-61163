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
        let modifiedSvg = svg
          .replace(/fill="[^"]*"/g, 'fill="currentColor"')
          .replace(/stroke="[^"]*"/g, 'stroke="currentColor"');
        
        // Add color style to SVG element if provided
        if (style?.color) {
          modifiedSvg = modifiedSvg.replace(
            /<svg([^>]*)>/,
            `<svg$1 style="color: ${style.color};">`
          );
        }
        
        // Add class to SVG if provided
        if (className) {
          modifiedSvg = modifiedSvg.replace(
            /<svg([^>]*)>/,
            `<svg$1 class="${className}">`
          );
        }
        
        setSvgContent(modifiedSvg);
      })
      .catch(err => console.error('Error loading SVG:', err));
  }, [path, style?.color, className]);

  if (!svgContent) return null;

  return (
    <div dangerouslySetInnerHTML={{ __html: svgContent }} />
  );
};
