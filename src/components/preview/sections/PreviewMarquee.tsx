import React from 'react';

export interface MarqueeConfig {
  enabled: boolean;
  items: string;
  separator: string;
  backgroundColor: string;
  speed: number;
  secondLayer: {
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

  return (
    <div className="relative w-full overflow-hidden" style={{ height: '100px' }}>
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
      
      {/* Main marquee layer - full height */}
      <div 
        className="absolute inset-0 py-4 overflow-hidden"
        style={{ 
          backgroundColor: config.backgroundColor,
          zIndex: 5,
        }}
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

      {/* Decorative stripe top - overlays main layer */}
      <div 
        className="absolute left-0 right-0 overflow-hidden"
        style={{ 
          backgroundColor: config.secondLayer.backgroundColor,
          height: '15px',
          top: '0',
          transform: 'rotate(-3deg)',
          transformOrigin: 'left top',
          width: '105%',
          left: '-2.5%',
          zIndex: 10,
        }}
      />

      {/* Decorative stripe bottom - overlays main layer */}
      <div 
        className="absolute left-0 right-0 overflow-hidden"
        style={{ 
          backgroundColor: config.secondLayer.backgroundColor,
          height: '15px',
          bottom: '0',
          transform: 'rotate(-3deg)',
          transformOrigin: 'left bottom',
          width: '105%',
          left: '-2.5%',
          zIndex: 10,
        }}
      />
    </div>
  );
};

export default PreviewMarquee;
