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
    <section className="py-8 px-6">
      <div className="max-w-2xl mx-auto">
        {portfolioConfig.title && (
          <h2 
            className="text-2xl font-bold text-center mb-8"
            style={{ 
              fontFamily: 'var(--brand-title-font)', 
              color: 'var(--brand-title-color)' 
            }}
          >
            {portfolioConfig.title}
          </h2>
        )}
        
        <Accordion type="single" collapsible className="space-y-6">
          {portfolioConfig.projects.map((project) => (
            <AccordionItem 
              key={project.id} 
              value={project.id}
              className="border rounded-2xl overflow-hidden shadow-lg"
              style={{ backgroundColor: 'var(--brand-primary)' }}
            >
              <div className="w-full">
                {project.image && (
                  <div className="w-full h-64 flex items-center justify-center overflow-hidden" style={{ backgroundColor: `${config.brand.accent}26` }}>
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                )}
                {!project.image && (
                  <div className="w-full h-64 flex items-center justify-center" style={{ backgroundColor: `${config.brand.accent}26` }}>
                    <p className="text-sm" style={{ color: config.brand.textColor }}>Portfolio Image</p>
                  </div>
                )}
                <AccordionTrigger className="hover:no-underline px-5 py-4 w-full">
                  <h3 
                    className="text-base font-bold text-left flex-1"
                    style={{ 
                      fontFamily: 'var(--brand-title-font)', 
                      color: 'var(--brand-secondary)' 
                    }}
                  >
                    {project.title || 'Título do Projeto'}
                  </h3>
                </AccordionTrigger>
              </div>
              
              <AccordionContent className="px-5 pb-5">
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map((tag, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary"
                        className="text-xs"
                        style={{ 
                          backgroundColor: 'var(--brand-accent)',
                          color: 'var(--brand-primary)'
                        }}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
                
                {project.description && (
                  <p 
                    className="text-sm leading-relaxed break-words w-full"
                    style={{ 
                      fontFamily: 'var(--brand-text-font)', 
                      color: 'var(--brand-secondary)',
                      wordWrap: 'break-word',
                      overflowWrap: 'anywhere',
                      wordBreak: 'break-word',
                      maxWidth: '100%'
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
