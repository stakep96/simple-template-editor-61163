import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import BrandEditor from './sections/BrandEditor';
import HeaderEditor from './sections/HeaderEditor';
import HeroEditor from './sections/HeroEditor';
import AboutEditor from './sections/AboutEditor';
import PracticeAreasEditor from './sections/PracticeAreasEditor';
import SuccessCasesEditor from './sections/SuccessCasesEditor';

const EditorPanel = () => {
  return (
    <div className="h-full bg-editor-bg border-r border-border">
      <div className="p-6 border-b border-border bg-background">
        <h1 className="text-2xl font-bold text-foreground">Criar Novo Site</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Configure seu mini site em poucos cliques
        </p>
      </div>
      
      <ScrollArea className="h-[calc(100vh-88px)]">
        <div className="p-6 space-y-4">
          <BrandEditor />
          <HeaderEditor />
          <HeroEditor />
          <AboutEditor />
          <PracticeAreasEditor />
          <SuccessCasesEditor />
        </div>
      </ScrollArea>
    </div>
  );
};

export default EditorPanel;
