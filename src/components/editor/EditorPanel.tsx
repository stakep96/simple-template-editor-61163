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
            <AccordionItem value="brand" className="border rounded-lg bg-background">
              <AccordionTrigger className="px-4 hover:no-underline">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                    <div className="w-5 h-5 rounded bg-purple-500 flex items-center justify-center">
                      <span className="text-white text-xs">🎨</span>
                    </div>
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-foreground">Marca</h3>
                    <p className="text-xs text-muted-foreground">Paleta de cores do site</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4">
                <BrandEditor />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="header" className="border rounded-lg bg-background">
              <AccordionTrigger className="px-4 hover:no-underline">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <div className="w-5 h-5 rounded bg-blue-500 flex items-center justify-center">
                      <span className="text-white text-xs">📱</span>
                    </div>
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-foreground">Header</h3>
                    <p className="text-xs text-muted-foreground">Logo e navegação</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4">
                <HeaderEditor />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="hero" className="border rounded-lg bg-background">
              <AccordionTrigger className="px-4 hover:no-underline">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                    <div className="w-5 h-5 rounded bg-green-500 flex items-center justify-center">
                      <span className="text-white text-xs">🏔️</span>
                    </div>
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-foreground">Hero</h3>
                    <p className="text-xs text-muted-foreground">Banner principal</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4">
                <HeroEditor />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="about" className="border rounded-lg bg-background">
              <AccordionTrigger className="px-4 hover:no-underline">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                    <div className="w-5 h-5 rounded bg-orange-500 flex items-center justify-center">
                      <span className="text-white text-xs">👤</span>
                    </div>
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-foreground">Sobre</h3>
                    <p className="text-xs text-muted-foreground">Informações sobre você</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4">
                <AboutEditor />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="practice" className="border rounded-lg bg-background">
              <AccordionTrigger className="px-4 hover:no-underline">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                    <div className="w-5 h-5 rounded bg-cyan-500 flex items-center justify-center">
                      <span className="text-white text-xs">💼</span>
                    </div>
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-foreground">Áreas de Atuação</h3>
                    <p className="text-xs text-muted-foreground">Especialidades</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4">
                <PracticeAreasEditor />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="cases" className="border rounded-lg bg-background">
              <AccordionTrigger className="px-4 hover:no-underline">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
                    <div className="w-5 h-5 rounded bg-yellow-500 flex items-center justify-center">
                      <span className="text-white text-xs">🏆</span>
                    </div>
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-foreground">Cases de Sucesso</h3>
                    <p className="text-xs text-muted-foreground">Histórico de vitórias</p>
                  </div>
                </div>
              </AccordionTrigger>
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
