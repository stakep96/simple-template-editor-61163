import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Palette, ImageIcon, Mountain, User, Briefcase, Trophy, GripVertical, Layout, Mail, Globe, TrendingUp, MousePointerClick, MessageSquare, Images } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import TemplatesEditor from './sections/TemplatesEditor';
import SiteMetadataEditor from './sections/SiteMetadataEditor';
import BrandEditor from './sections/BrandEditor';
import MarketingEditor from './sections/MarketingEditor';
import HeaderEditor from './sections/HeaderEditor';
import HeroEditor from './sections/HeroEditor';
import AboutEditor from './sections/AboutEditor';
import PracticeAreasEditor from './sections/PracticeAreasEditor';
import SuccessCasesEditor from './sections/SuccessCasesEditor';
import ContactFormEditor from './sections/ContactFormEditor';
import ButtonEditor from './sections/ButtonEditor';
import TestimonialsEditor from './sections/TestimonialsEditor';
import GalleryEditor from './sections/GalleryEditor';
import AddModuleButton from './AddModuleButton';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { ModuleType } from '@/contexts/SiteEditorContext';

const EditorPanel = () => {
  const { config, updateModuleInstance, reorderModules } = useSiteEditor();
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const moduleMetadata = {
    header: { icon: ImageIcon, title: 'Header', description: 'Logo e navegação', component: HeaderEditor },
    hero: { icon: Mountain, title: 'Hero', description: 'Banner principal', component: HeroEditor },
    about: { icon: User, title: 'Sobre', description: 'Informações sobre você', component: AboutEditor },
    practice: { icon: Briefcase, title: 'Áreas de Atuação', description: 'Especialidades', component: PracticeAreasEditor },
    cases: { icon: Trophy, title: 'Cases de Sucesso', description: 'Histórico de vitórias', component: SuccessCasesEditor },
    contact: { icon: Mail, title: 'Formulário de Contato', description: 'Fale conosco', component: ContactFormEditor },
    button: { icon: MousePointerClick, title: 'Botão', description: 'Call to Action', component: ButtonEditor },
    testimonials: { icon: MessageSquare, title: 'Depoimentos', description: 'Avaliações de clientes', component: TestimonialsEditor },
    gallery: { icon: Images, title: 'Galeria', description: 'Mosaico de fotos', component: GalleryEditor },
  };

  const sortedModules = config.moduleOrder
    .map(instanceId => {
      const instance = config.moduleInstances[instanceId];
      if (!instance) return null;
      const metadata = moduleMetadata[instance.type];
      return {
        instanceId,
        ...instance,
        ...metadata,
      };
    })
    .filter(Boolean);

  const handleDragStart = (e: React.DragEvent, instanceId: string) => {
    setDraggedItem(instanceId);
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
          
          <Accordion type="multiple" defaultValue={['metadata', 'brand', 'marketing', 'edit-site']} className="space-y-4">
            <AccordionItem value="metadata" className="border rounded-lg bg-background">
              <AccordionTrigger className="px-4 hover:no-underline">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Globe className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-foreground">Configurações de Domínio e Site</h3>
                    <p className="text-xs text-muted-foreground">Informações gerais do site</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4">
                <SiteMetadataEditor />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="brand" className="border rounded-lg bg-background">
              <AccordionTrigger className="px-4 hover:no-underline">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Palette className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-foreground">Brand</h3>
                    <p className="text-xs text-muted-foreground">Cores e fontes do site</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4">
                <BrandEditor />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="edit-site" className="border rounded-lg bg-background">
              <AccordionTrigger className="px-4 hover:no-underline">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Layout className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-foreground">Editar Site</h3>
                    <p className="text-xs text-muted-foreground">Módulos e seções</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pt-4">
                <Accordion type="multiple" defaultValue={config.moduleOrder.slice(0, 3)} className="space-y-4">
                  {sortedModules.map((module: any, index: number) => {
                    const Icon = module.icon;
                    const Component = module.component;
                    const isDisabled = !module.enabled;

                    return (
                      <React.Fragment key={module.instanceId}>
                        {index === 0 && <AddModuleButton position={0} />}
                        <AccordionItem
                          value={module.instanceId}
                          className={`border rounded-lg transition-all ${
                            isDisabled
                              ? 'bg-muted/30 opacity-60'
                              : 'bg-background'
                          }`}
                          draggable
                          onDragStart={(e) => handleDragStart(e, module.instanceId)}
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDrop(e, module.instanceId)}
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
                              onCheckedChange={(enabled) => updateModuleInstance(module.instanceId, { enabled })}
                              onClick={(e) => e.stopPropagation()}
                              className="mr-2"
                              disabled={false}
                            />
                          </AccordionTrigger>
                          <AccordionContent className="px-4">
                            <Component instanceId={module.instanceId} />
                          </AccordionContent>
                        </AccordionItem>
                        <AddModuleButton position={index + 1} />
                      </React.Fragment>
                    );
                  })}
                </Accordion>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="marketing" className="border rounded-lg bg-background">
              <AccordionTrigger className="px-4 hover:no-underline">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-foreground">Configurações de Marketing e Integrações</h3>
                    <p className="text-xs text-muted-foreground">WhatsApp, Analytics e Pixels</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4">
                <MarketingEditor />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </ScrollArea>
    </div>
  );
};

export default EditorPanel;
