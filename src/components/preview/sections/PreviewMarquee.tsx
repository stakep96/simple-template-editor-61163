import React from 'react';

export interface MarqueeConfig {
  enabled: boolean;
  items: string;
  separator: string;
  backgroundColor: string;
  speed: number;
  secondLayer?: {
    enabled: boolean;
    items: string;
    backgroundColor: string;
  };
}

interface PreviewMarqueeProps {
  config: MarqueeConfig;
}

const PreviewMarquee: React.FC<PreviewMarqueeProps> = ({ config }) => {
  if (!config.enabled) return null;

  const items = config.items.split(',').map(item => item.trim()).filter(Boolean);
  const displayItems = [...items, ...items, ...items];

  const secondLayerItems = config.secondLayer?.enabled && config.secondLayer.items
    ? config.secondLayer.items.split(',').map(item => item.trim()).filter(Boolean)
    : [];
  const secondDisplayItems = [...secondLayerItems, ...secondLayerItems, ...secondLayerItems];

  return (
    <div className="relative w-full overflow-hidden">
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
          .marquee-content-reverse {
            animation: marquee ${config.speed * 1.2}s linear infinite reverse;
          }
        `}
      </style>
      
      {/* Second layer (background) */}
      {config.secondLayer?.enabled && secondLayerItems.length > 0 && (
        <div 
          className="absolute inset-0 py-2 overflow-hidden"
          style={{ backgroundColor: config.secondLayer.backgroundColor }}
        >
          <div className="marquee-content-reverse flex items-center whitespace-nowrap">
            {secondDisplayItems.map((item, index) => (
              <React.Fragment key={index}>
                <span className="text-sm md:text-base font-semibold px-3 md:px-4 opacity-90" style={{ color: 'var(--brand-text)' }}>
                  {item}
                </span>
                {index < secondDisplayItems.length - 1 && (
                  <span className="text-sm md:text-base px-2 opacity-90">
                    {config.separator}
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
      
      {/* First layer (foreground) */}
      <div 
        className="relative py-2 overflow-hidden"
        style={{ backgroundColor: config.backgroundColor }}
      >
        <div className="marquee-content flex items-center whitespace-nowrap">
          {displayItems.map((item, index) => (
            <React.Fragment key={index}>
              <span className="text-base md:text-lg font-bold px-3 md:px-5" style={{ color: 'var(--brand-text)' }}>
                {item}
              </span>
              {index < displayItems.length - 1 && (
                <span className="text-base md:text-lg px-2">
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
