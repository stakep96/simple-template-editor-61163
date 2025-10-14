import React from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import type { TestimonialsConfig } from '@/contexts/SiteEditorContext';

interface PreviewTestimonialsProps {
  config: TestimonialsConfig;
}

const PreviewTestimonials: React.FC<PreviewTestimonialsProps> = ({ config }) => {
  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
          {config.title}
        </h2>

        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {config.testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id}>
                <div className="px-4">
                  <Card className="p-8 bg-secondary/20 border-secondary/30 rounded-[30px] shadow-sm">
                    <div className="flex items-start gap-4 mb-6">
                      <Avatar className="w-14 h-14 flex-shrink-0">
                        <AvatarImage src={testimonial.image} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground text-base">{testimonial.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{testimonial.role}</p>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      "{testimonial.testimonial}"
                    </p>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-2 mt-6">
            {config.testimonials.map((_, index) => (
              <div key={index} className="w-2 h-2 rounded-full bg-muted-foreground/30" />
            ))}
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default PreviewTestimonials;
