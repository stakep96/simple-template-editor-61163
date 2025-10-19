import React from 'react';
import { ImageIcon, Mountain, User, Briefcase, Trophy, Mail, MousePointerClick, MessageSquare, Images, HelpCircle, MapPin, Copyright } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { ModuleType } from '@/contexts/SiteEditorContext';

interface ModuleSelectorProps {
  onSelect: (moduleType: ModuleType) => void;
}

interface Module {
  id: ModuleType;
  icon: any;
  title: string;
  description: string;
}

interface ModuleCategory {
  title: string;
  modules: Module[];
}

const ModuleSelector: React.FC<ModuleSelectorProps> = ({ onSelect }) => {
  const categories: ModuleCategory[] = [
    {
      title: 'Navegação',
      modules: [
        {
          id: 'header' as ModuleType,
          icon: ImageIcon,
          title: 'Header',
          description: 'Logo e navegação',
        },
      ],
    },
    {
      title: 'Hero',
      modules: [
        {
          id: 'hero' as ModuleType,
          icon: Mountain,
          title: 'Hero',
          description: 'Banner principal',
        },
      ],
    },
    {
      title: 'Conteúdo',
      modules: [
        {
          id: 'about' as ModuleType,
          icon: User,
          title: 'Sobre',
          description: 'Informações',
        },
        {
          id: 'practice' as ModuleType,
          icon: Briefcase,
          title: 'Áreas de Atuação',
          description: 'Especialidades',
        },
        {
          id: 'cases' as ModuleType,
          icon: Trophy,
          title: 'Cases de Sucesso',
          description: 'Histórico',
        },
      ],
    },
    {
      title: 'Depoimentos',
      modules: [
        {
          id: 'testimonials' as ModuleType,
          icon: MessageSquare,
          title: 'Depoimentos',
          description: 'Avaliações',
        },
      ],
    },
    {
      title: 'Mídia',
      modules: [
        {
          id: 'gallery' as ModuleType,
          icon: Images,
          title: 'Galeria',
          description: 'Fotos',
        },
      ],
    },
    {
      title: 'Interação',
      modules: [
        {
          id: 'contact' as ModuleType,
          icon: Mail,
          title: 'Formulário',
          description: 'Contato',
        },
        {
          id: 'button' as ModuleType,
          icon: MousePointerClick,
          title: 'Botão',
          description: 'CTA',
        },
        {
          id: 'faq' as ModuleType,
          icon: HelpCircle,
          title: 'Perguntas Frequentes',
          description: 'Perguntas',
        },
      ],
    },
    {
      title: 'Localização',
      modules: [
        {
          id: 'location' as ModuleType,
          icon: MapPin,
          title: 'Localização',
          description: 'Endereço e mapa',
        },
      ],
    },
    {
      title: 'Rodapé',
      modules: [
        {
          id: 'footer' as ModuleType,
          icon: Copyright,
          title: 'Copyright',
          description: 'Rodapé',
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col max-h-[450px]">
      <h3 className="font-semibold text-sm mb-3">Adicionar Componente</h3>
      <ScrollArea className="h-[400px] pr-2">
        <div className="space-y-4 pb-2">
          {categories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <div className="mb-2 px-3 py-1.5 bg-primary rounded-md w-fit">
                <h4 className="text-xs font-semibold text-primary-foreground">
                  {category.title}
                </h4>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {category.modules.map((module) => {
                  const Icon = module.icon;
                  return (
                    <button
                      key={module.id}
                      onClick={() => onSelect(module.id)}
                      className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border hover:scale-105 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center transition-colors">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-center">
                        <p className="text-xs font-medium text-foreground">{module.title}</p>
                        <p className="text-[10px] text-muted-foreground">{module.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ModuleSelector;
