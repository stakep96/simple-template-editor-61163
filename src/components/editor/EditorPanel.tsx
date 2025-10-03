import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Palette, ImageIcon, Mountain, User, Briefcase, Trophy, GripVertical } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import TemplatesEditor from './sections/TemplatesEditor';
import BrandEditor from './sections/BrandEditor';
import HeaderEditor from './sections/HeaderEditor';
import HeroEditor from './sections/HeroEditor';
import AboutEditor from './sections/AboutEditor';
import PracticeAreasEditor from './sections/PracticeAreasEditor';
import SuccessCasesEditor from './sections/SuccessCasesEditor';
import { useSiteEditor } from '@/contexts/SiteEditorContext';

const EditorPanel = () => {
  const { config, updateHeader, updateHero, updateAbout, updatePracticeAreas, updateSuccessCases, reorderModules } = useSiteEditor();
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const modules = [
    {
      id: 'header',
      icon: ImageIcon,
      title: 'Header',
      description: 'Logo e navegação',
      enabled: config.header.enabled,
      component: HeaderEditor,
      onToggle: (enabled: boolean) => updateHeader({ enabled }),
    },
    {
      id: 'hero',
      icon: Mountain,
      title: 'Hero',
      description: 'Banner principal',
      enabled: config.hero.enabled,
      component: HeroEditor,
      onToggle: (enabled: boolean) => updateHero({ enabled }),
    },
    {
      id: 'about',
      icon: User,
      title: 'Sobre',
      description: 'Informações sobre você',
      enabled: config.about.enabled,
      component: AboutEditor,
      onToggle: (enabled: boolean) => updateAbout({ enabled }),
    },
    {
      id: 'practice',
      icon: Briefcase,
      title: 'Áreas de Atuação',
      description: 'Especialidades',
      enabled: config.practiceAreas.enabled,
      component: PracticeAreasEditor,
      onToggle: (enabled: boolean) => updatePracticeAreas({ enabled }),
    },
    {
      id: 'cases',
      icon: Trophy,
      title: 'Cases de Sucesso',
      description: 'Histórico de vitórias',
      enabled: config.successCases.enabled,
      component: SuccessCasesEditor,
      onToggle: (enabled: boolean) => updateSuccessCases({ enabled }),
    },
  ];

  const sortedModules = [...modules].sort((a, b) => {
    if (a.enabled === b.enabled) {
      return config.moduleOrder.indexOf(a.id) - config.moduleOrder.indexOf(b.id);
    }
    return a.enabled ? -1 : 1;
  });

  const handleDragStart = (e: React.DragEvent, moduleId: string) => {
    setDraggedItem(moduleId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedItem || draggedItem === targetId) return;

    const newOrder = [...config.moduleOrder];
    const draggedIndex = newOrder.indexOf(draggedItem);
    const targetIndex = newOrder.indexOf(targetId);

    newOrder.splice(draggedIndex, 1);
    newOrder.splice(targetIndex, 0, draggedItem);

    reorderModules(newOrder);
    setDraggedItem(null);
  };

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
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Palette className="w-5 h-5 text-primary" />
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

            {sortedModules.map((module) => {
              const Icon = module.icon;
              const Component = module.component;
              const isDisabled = !module.enabled;

              return (
                <AccordionItem
                  key={module.id}
                  value={module.id}
                  className={`border rounded-lg transition-all ${
                    isDisabled
                      ? 'bg-muted/30 opacity-60'
                      : 'bg-background'
                  }`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, module.id)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, module.id)}
                >
                  <AccordionTrigger className="px-4 hover:no-underline cursor-move">
                    <div className="flex items-center gap-2 flex-1">
                      <GripVertical className={`w-5 h-5 flex-shrink-0 ${isDisabled ? 'text-muted-foreground' : 'text-muted-foreground/70'}`} />
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        isDisabled ? 'bg-muted' : 'bg-primary/10'
                      }`}>
                        <Icon className={`w-5 h-5 ${isDisabled ? 'text-muted-foreground' : 'text-primary'}`} />
                      </div>
                      <div className="text-left">
                        <h3 className={`font-semibold ${isDisabled ? 'text-muted-foreground' : 'text-foreground'}`}>
                          {module.title}
                        </h3>
                        <p className="text-xs text-muted-foreground">{module.description}</p>
                      </div>
                    </div>
                    <Switch
                      checked={module.enabled}
                      onCheckedChange={module.onToggle}
                      onClick={(e) => e.stopPropagation()}
                      className="mr-2"
                      disabled={false}
                    />
                  </AccordionTrigger>
                  <AccordionContent className="px-4">
                    <Component />
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </ScrollArea>
    </div>
  );
};

export default EditorPanel;
