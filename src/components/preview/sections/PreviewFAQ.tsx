import React from 'react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import { FAQConfig } from '@/contexts/SiteEditorContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface PreviewFAQProps {
  instanceId: string;
}

const PreviewFAQ: React.FC<PreviewFAQProps> = ({ instanceId }) => {
  const { config } = useSiteEditor();
  const moduleInstance = config.moduleInstances[instanceId];
  const faqConfig = moduleInstance?.config as FAQConfig;

  if (!faqConfig || faqConfig.items.length === 0) return null;

  return (
    <section
      className="w-full py-8 px-4"
      style={{
        backgroundColor: `var(--brand-background)`,
      }}
    >
      <div className="max-w-3xl mx-auto">
        <h2
          className="text-3xl font-bold text-center mb-12"
          style={{ 
            color: `var(--brand-title-color)`,
            fontFamily: 'var(--brand-title-font)'
          }}
        >
          {faqConfig.title}
        </h2>

        <Accordion type="single" collapsible className="w-full">
          {faqConfig.items.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="border-b px-6"
            >
              <AccordionTrigger
                className="text-left hover:no-underline"
                style={{ 
                  color: `var(--brand-title-color)`,
                  fontFamily: 'var(--brand-title-font)'
                }}
              >
                {item.question}
              </AccordionTrigger>
              <AccordionContent
                className="text-sm leading-relaxed"
                style={{ 
                  color: `var(--brand-text-color)`,
                  fontFamily: 'var(--brand-text-font)'
                }}
              >
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default PreviewFAQ;
