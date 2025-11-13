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
    <section className="py-8 px-4">
      <div className="max-w-3xl mx-auto">
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

        <div className="relative w-full">
        <Carousel
          setApi={setApi}
          className="w-full"
          plugins={[plugin.current]}
          opts={{
            align: 'start',
            loop: true,
          }}
        >
          <CarouselContent className="-ml-0">
            {config.images.map((img) => (
              <CarouselItem key={img.id} className="pl-0">
                <div className="relative w-full">
                  <div 
                    className="w-full h-[450px] rounded-3xl overflow-hidden border-4"
                    style={{ 
                      borderColor: 'var(--brand-primary)',
                      backgroundColor: 'var(--brand-primary)'
                    }}
                  >
                    <img
                      src={img.image || 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=700&fit=crop'}
                      alt={`Depoimento ${img.id}`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Speech bubble tail/pointer - top left corner */}
                  <div className="absolute -top-2 left-6">
                    <div 
                      style={{
                        width: 0,
                        height: 0,
                        borderBottom: '12px solid var(--brand-primary)',
                        borderLeft: '12px solid transparent',
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
