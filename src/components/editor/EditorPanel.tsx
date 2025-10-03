import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import TemplatesEditor from './sections/TemplatesEditor';
import BrandEditor from './sections/BrandEditor';
import HeaderEditor from './sections/HeaderEditor';
import HeroEditor from './sections/HeroEditor';
import AboutEditor from './sections/AboutEditor';
import PracticeAreasEditor from './sections/PracticeAreasEditor';
import SuccessCasesEditor from './sections/SuccessCasesEditor';

const EditorPanel = () => {
  return (
    <div className="h-full bg-editor-bg">
      <div className="p-6 border-b border-border bg-background">
        <h1 className="text-2xl font-bold text-foreground">Criar Novo Site</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Configure seu mini site em poucos cliques
        </p>
      </div>
      
      <ScrollArea className="h-[calc(100vh-88px)]">
        <div className="p-6 space-y-4">
          <TemplatesEditor />
          
          <Accordion type="multiple" defaultValue={['brand', 'header', 'hero', 'about']} className="bg-background rounded-lg border border-border">
            <AccordionItem value="brand" className="border-b">
              <AccordionTrigger className="px-4">Marca</AccordionTrigger>
              <AccordionContent className="px-4">
                <BrandEditor />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="header" className="border-b">
              <AccordionTrigger className="px-4">Header</AccordionTrigger>
              <AccordionContent className="px-4">
                <HeaderEditor />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="hero" className="border-b">
              <AccordionTrigger className="px-4">Hero</AccordionTrigger>
              <AccordionContent className="px-4">
                <HeroEditor />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="about" className="border-b">
              <AccordionTrigger className="px-4">Sobre</AccordionTrigger>
              <AccordionContent className="px-4">
                <AboutEditor />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="practice" className="border-b">
              <AccordionTrigger className="px-4">Áreas de Atuação</AccordionTrigger>
              <AccordionContent className="px-4">
                <PracticeAreasEditor />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="cases">
              <AccordionTrigger className="px-4">Cases de Sucesso</AccordionTrigger>
              <AccordionContent className="px-4">
                <SuccessCasesEditor />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </ScrollArea>
    </div>
  );
};

export default EditorPanel;
