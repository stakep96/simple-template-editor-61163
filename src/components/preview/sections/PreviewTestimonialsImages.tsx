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
    <section className="py-16 px-4" style={{ backgroundColor: 'hsl(var(--background))' }}>
      <div className="container mx-auto max-w-6xl">
        {config.title && (
          <h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            style={{ 
              fontFamily: 'var(--font-title)',
              color: 'hsl(var(--title-color))'
            }}
          >
            {config.title}
          </h2>
        )}

        <div className="relative max-w-2xl mx-auto">
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
                  <div className="relative w-full max-w-sm mx-auto">
                    {/* Bubble speech effect container */}
                    <div 
                      className="relative bg-white rounded-3xl shadow-2xl overflow-hidden"
                      style={{
                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
                      }}
                    >
                      {/* Inner border effect */}
                      <div className="absolute inset-0 rounded-3xl border-8 border-white/50 pointer-events-none z-10" />
                      
                      {/* Image */}
                      <img
                        src={img.image || 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=700&fit=crop'}
                        alt={`Depoimento ${img.id}`}
                        className="w-full h-auto object-contain"
                        style={{
                          maxHeight: '600px',
                        }}
                      />
                      
                      {/* Subtle gradient overlay for better contrast */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
                    </div>

                    {/* Speech bubble pointer (optional decorative element) */}
                    <div 
                      className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-white transform rotate-45 shadow-lg"
                      style={{
                        clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                      }}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {config.images.length > 1 && (
              <>
                <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
                <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
              </>
            )}
          </Carousel>

          {/* Dots indicator */}
          {config.images.length > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {config.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === current 
                      ? 'w-8 bg-primary' 
                      : 'w-2 bg-primary/30 hover:bg-primary/50'
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
