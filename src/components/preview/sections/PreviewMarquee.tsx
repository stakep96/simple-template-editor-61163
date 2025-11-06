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
    <div className="relative w-full overflow-hidden" style={{ height: '150px' }}>
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
          height: '80px',
          top: '10%',
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

      {/* Second diagonal stripe - ascending / */}
      <div 
        className="absolute overflow-hidden flex items-center"
        style={{ 
          backgroundColor: config.secondLayer.backgroundColor,
          height: '80px',
          bottom: '10%',
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
