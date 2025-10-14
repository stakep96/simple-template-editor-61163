import React from 'react';
import { ImageIcon, Mountain, User, Briefcase, Trophy, Mail, MousePointerClick, MessageSquare, Images } from 'lucide-react';
import type { ModuleType } from '@/contexts/SiteEditorContext';

interface ModuleSelectorProps {
  onSelect: (moduleType: ModuleType) => void;
}

const ModuleSelector: React.FC<ModuleSelectorProps> = ({ onSelect }) => {
  const modules = [
    {
      id: 'header' as ModuleType,
      icon: ImageIcon,
      title: 'Header',
      description: 'Logo e navegação',
    },
    {
      id: 'hero' as ModuleType,
      icon: Mountain,
      title: 'Hero',
      description: 'Banner principal',
    },
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
      id: 'testimonials' as ModuleType,
      icon: MessageSquare,
      title: 'Depoimentos',
      description: 'Avaliações',
    },
    {
      id: 'gallery' as ModuleType,
      icon: Images,
      title: 'Galeria',
      description: 'Fotos',
    },
  ];

  return (
    <div>
      <h3 className="font-semibold text-sm mb-3">Adicionar Componente</h3>
      <div className="grid grid-cols-3 gap-2">
        {modules.map((module) => {
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
  );
};

export default ModuleSelector;
