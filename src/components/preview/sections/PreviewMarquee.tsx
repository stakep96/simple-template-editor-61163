import React from 'react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { MarqueeConfig } from '@/contexts/SiteEditorContext';

interface PreviewMarqueeProps {
  instanceId: string;
}

const PreviewMarquee: React.FC<PreviewMarqueeProps> = ({ instanceId }) => {
  const { config: siteConfig } = useSiteEditor();
  const instance = siteConfig.moduleInstances[instanceId];
  const config = instance?.config as MarqueeConfig;

  if (!config || !config.enabled) return null;

  const items = config.items.split(',').map(item => item.trim()).filter(Boolean);
  const displayItems = [...items, ...items, ...items];

  return (
    <div className="relative w-full overflow-hidden" style={{ height: '120px' }}>
      <style>
        {`
          @keyframes marquee {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-33.333%);
            }
          }
          .marquee-content {
            animation: marquee ${config.speed}s linear infinite;
          }
        `}
      </style>
      
      {/* First diagonal stripe - descending \ */}
      <div 
        className="absolute overflow-hidden flex items-center"
        style={{ 
          backgroundColor: config.backgroundColor,
          height: '45px',
          top: '25%',
          left: '-10%',
          width: '120%',
          transform: 'rotate(4deg)',
          transformOrigin: 'center',
          zIndex: 5,
        }}
      >
        <div className="marquee-content flex items-center whitespace-nowrap">
          {displayItems.map((item, index) => (
            <React.Fragment key={`stripe1-${index}`}>
              <span className="text-base md:text-lg font-bold px-3 md:px-5" style={{ color: config.textColor }}>
                {item}
              </span>
              {index < displayItems.length - 1 && (
                <span className="text-base md:text-lg px-2" style={{ color: config.textColor }}>
                  {config.separator}
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Second diagonal stripe - ascending / */}
      <div 
        className="absolute overflow-hidden flex items-center"
        style={{ 
          backgroundColor: config.secondLayer.backgroundColor,
          height: '45px',
          bottom: '25%',
          left: '-10%',
          width: '120%',
          transform: 'rotate(-4deg)',
          transformOrigin: 'center',
          zIndex: 6,
        }}
      >
        <div className="marquee-content flex items-center whitespace-nowrap">
          {displayItems.map((item, index) => (
            <React.Fragment key={`stripe2-${index}`}>
              <span className="text-base md:text-lg font-bold px-3 md:px-5" style={{ color: config.textColor }}>
                {item}
              </span>
              {index < displayItems.length - 1 && (
                <span className="text-base md:text-lg px-2" style={{ color: config.textColor }}>
                  {config.separator}
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreviewMarquee;
