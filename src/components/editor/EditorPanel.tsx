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
          
          <Accordion type="multiple" defaultValue={['brand', 'header', 'hero', 'about']} className="space-y-4">
            <AccordionItem value="brand">
              <AccordionTrigger>Marca</AccordionTrigger>
              <AccordionContent>
                <BrandEditor />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="header">
              <AccordionTrigger>Header</AccordionTrigger>
              <AccordionContent>
                <HeaderEditor />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="hero">
              <AccordionTrigger>Hero</AccordionTrigger>
              <AccordionContent>
                <HeroEditor />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="about">
              <AccordionTrigger>Sobre</AccordionTrigger>
              <AccordionContent>
                <AboutEditor />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="practice">
              <AccordionTrigger>Áreas de Atuação</AccordionTrigger>
              <AccordionContent>
                <PracticeAreasEditor />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="cases">
              <AccordionTrigger>Cases de Sucesso</AccordionTrigger>
              <AccordionContent>
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
