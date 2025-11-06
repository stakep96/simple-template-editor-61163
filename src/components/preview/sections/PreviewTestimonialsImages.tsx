import React, { useEffect, useState } from 'react';
import type { TestimonialsImagesConfig } from '@/contexts/SiteEditorContext';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

interface PreviewTestimonialsImagesProps {
  config: TestimonialsImagesConfig;
}

const PreviewTestimonialsImages: React.FC<PreviewTestimonialsImagesProps> = ({ config }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  if (!config.images.length) return null;

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-3xl">
        {config.title && (
          <h2 
            className="text-3xl font-bold text-center mb-12"
            style={{ 
              color: 'var(--brand-title-color)',
              fontFamily: 'var(--brand-title-font)'
            }}
          >
            {config.title}
          </h2>
        )}

        <div className="relative">
          <Carousel
            setApi={setApi}
            className="w-full"
            plugins={[plugin.current]}
            opts={{
              align: 'center',
              loop: true,
            }}
          >
            <CarouselContent>
              {config.images.map((img) => (
                <CarouselItem key={img.id} className="flex justify-center">
                  <div className="relative w-full mx-auto">
                    {/* Outer border container - gray border effect */}
                    <div 
                      className="relative rounded-2xl p-[3px]"
                      style={{
                        background: 'linear-gradient(135deg, #e5e5e5 0%, #d0d0d0 100%)',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)',
                      }}
                    >
                      {/* Inner white container */}
                      <div 
                        className="relative bg-white rounded-2xl overflow-hidden"
                      >
                        {/* Image */}
                        <img
                          src={img.image || 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=700&fit=crop'}
                          alt={`Depoimento ${img.id}`}
                          className="w-full h-auto object-contain"
                          style={{
                            maxHeight: '700px',
                          }}
                        />
                      </div>
                    </div>

                    {/* Speech bubble tail/pointer - top left corner with border */}
                    <div className="absolute -top-2 left-4">
                      {/* Outer gray border for the tail */}
                      <div 
                        style={{
                          position: 'absolute',
                          width: 0,
                          height: 0,
                          borderBottom: '11px solid #d0d0d0',
                          borderLeft: '11px solid transparent',
                          borderRight: '0px solid transparent',
                          top: '-1px',
                          left: '-1px',
                        }}
                      />
                      {/* Inner white tail */}
                      <div 
                        style={{
                          position: 'relative',
                          width: 0,
                          height: 0,
                          borderBottom: '10px solid white',
                          borderLeft: '10px solid transparent',
                          borderRight: '0px solid transparent',
                        }}
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Dots indicator */}
          {config.images.length > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {config.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  style={{
                    backgroundColor: 'var(--brand-primary)',
                    opacity: index === current ? 1 : 0.3,
                  }}
                  className={`rounded-full transition-all ${
                    index === current
                      ? 'w-8 h-2'
                      : 'w-2 h-2'
                  }`}
                  aria-label={`Ir para depoimento ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PreviewTestimonialsImages;
