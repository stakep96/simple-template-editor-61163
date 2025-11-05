import React from 'react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import type { PortfolioConfig } from '@/contexts/SiteEditorContext';

interface PreviewPortfolioProps {
  instanceId: string;
}

const PreviewPortfolio: React.FC<PreviewPortfolioProps> = ({ instanceId }) => {
  const { config } = useSiteEditor();
  const instance = config.moduleInstances[instanceId];
  
  if (!instance || instance.type !== 'portfolio') return null;
  
  const portfolioConfig = instance.config as PortfolioConfig;

  if (!portfolioConfig.projects || portfolioConfig.projects.length === 0) {
    return null;
  }

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        {portfolioConfig.title && (
          <h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            style={{ 
              fontFamily: 'var(--brand-title-font)', 
              color: 'var(--brand-title-color)' 
            }}
          >
            {portfolioConfig.title}
          </h2>
        )}
        
        <Accordion type="single" collapsible className="space-y-4">
          {portfolioConfig.projects.map((project) => (
            <AccordionItem 
              key={project.id} 
              value={project.id}
              className="border rounded-lg overflow-hidden bg-card"
            >
              <AccordionTrigger className="hover:no-underline p-0">
                <div className="w-full">
                  {project.image && (
                    <div className="w-full aspect-video bg-muted flex items-center justify-center overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  {!project.image && (
                    <div className="w-full aspect-video bg-muted flex items-center justify-center">
                      <p className="text-muted-foreground text-sm">Portfolio Image</p>
                    </div>
                  )}
                  <div className="px-6 py-4 text-left">
                    <h3 
                      className="text-lg font-semibold"
                      style={{ 
                        fontFamily: 'var(--brand-title-font)', 
                        color: 'var(--brand-title-color)' 
                      }}
                    >
                      {project.title || 'Título do Projeto'}
                    </h3>
                  </div>
                </div>
              </AccordionTrigger>
              
              <AccordionContent className="px-6 pb-6">
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary"
                        style={{ 
                          backgroundColor: 'var(--brand-primary)',
                          color: 'white'
                        }}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
                
                {project.description && (
                  <p 
                    className="text-sm leading-relaxed whitespace-pre-wrap"
                    style={{ 
                      fontFamily: 'var(--brand-text-font)', 
                      color: 'var(--brand-text-color)' 
                    }}
                  >
                    {project.description}
                  </p>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default PreviewPortfolio;
