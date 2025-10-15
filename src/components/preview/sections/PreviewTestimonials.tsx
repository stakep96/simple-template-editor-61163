import React, { useEffect, useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import type { TestimonialsConfig } from '@/contexts/SiteEditorContext';
import Autoplay from 'embla-carousel-autoplay';

interface PreviewTestimonialsProps {
  config: TestimonialsConfig;
}

const PreviewTestimonials: React.FC<PreviewTestimonialsProps> = ({ config }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="py-16 px-4 overflow-hidden">
      <div className="max-w-2xl mx-auto">
        <h2 
          className="text-3xl font-bold text-center mb-12" 
          style={{ 
            color: 'var(--brand-title-color)',
            fontFamily: 'var(--brand-title-font)' 
          }}
        >
          {config.title}
        </h2>

        <Carousel
          setApi={setApi}
          opts={{
            align: "center",
            loop: true,
          }}
          plugins={[plugin.current]}
          className="w-full max-w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent className="-ml-4">
            {config.testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="pl-4">
                <Card 
                  className="p-8 rounded-2xl shadow-sm border border-transparent"
                  style={{
                    backgroundColor: `color-mix(in srgb, var(--brand-primary) 15%, transparent)`,
                  }}
                >
                    <div className="flex items-start gap-4 mb-6">
                      <Avatar className="w-14 h-14 flex-shrink-0">
                        <AvatarImage src={testimonial.image} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 
                          className="font-semibold text-base break-words" 
                          style={{ 
                            color: 'var(--brand-title-color)',
                            fontFamily: 'var(--brand-title-font)' 
                          }}
                        >
                          {testimonial.name}
                        </h3>
                        <p 
                          className="text-sm mb-2 break-words" 
                          style={{ 
                            color: 'var(--brand-text-color)',
                            fontFamily: 'var(--brand-text-font)' 
                          }}
                        >
                          {testimonial.role}
                        </p>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4"
                              style={{ 
                                fill: 'var(--brand-accent)',
                                color: 'var(--brand-accent)'
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p 
                      className="leading-relaxed text-sm break-all whitespace-pre-wrap" 
                      style={{ 
                        color: 'var(--brand-text-color)',
                        fontFamily: 'var(--brand-text-font)' 
                      }}
                    >
                      &quot;{testimonial.testimonial}&quot;
                    </p>
                  </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-2 mt-6">
            {config.testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                style={{
                  backgroundColor: index === current 
                    ? 'var(--brand-primary)' 
                    : 'var(--brand-primary)',
                  opacity: index === current ? 1 : 0.3,
                }}
                className={`rounded-full transition-all ${
                  index === current
                    ? 'w-6 h-2'
                    : 'w-2 h-2'
                }`}
                aria-label={`Ir para depoimento ${index + 1}`}
              />
            ))}
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default PreviewTestimonials;
