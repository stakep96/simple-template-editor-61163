import React from 'react';

export interface MarqueeConfig {
  enabled: boolean;
  items: string;
  separator: string;
  backgroundColor: string;
  speed: number;
}

interface PreviewMarqueeProps {
  config: MarqueeConfig;
}

const PreviewMarquee: React.FC<PreviewMarqueeProps> = ({ config }) => {
  if (!config.enabled) return null;

  const items = config.items.split(',').map(item => item.trim()).filter(Boolean);
  
  // Duplicate items to create seamless loop
  const displayItems = [...items, ...items, ...items];

  return (
    <div 
      className="relative overflow-hidden py-6"
      style={{ backgroundColor: config.backgroundColor }}
    >
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
      
      <div className="marquee-content flex items-center whitespace-nowrap">
        {displayItems.map((item, index) => (
          <React.Fragment key={index}>
            <span className="text-2xl md:text-3xl font-bold px-8" style={{ color: 'var(--brand-text)' }}>
              {item}
            </span>
            {index < displayItems.length - 1 && (
              <span className="text-2xl md:text-3xl px-4">
                {config.separator}
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default PreviewMarquee;
