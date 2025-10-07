import React from 'react';
import { ImageIcon, Mountain, User, Briefcase, Trophy, Mail } from 'lucide-react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';

interface ModuleSelectorProps {
  onSelect: (moduleId: string) => void;
}

const ModuleSelector: React.FC<ModuleSelectorProps> = ({ onSelect }) => {
  const { config } = useSiteEditor();

  const modules = [
    {
      id: 'header',
      icon: ImageIcon,
      title: 'Header',
      description: 'Logo e navegação',
      isAdded: config.header.enabled && config.moduleOrder.includes('header'),
    },
    {
      id: 'hero',
      icon: Mountain,
      title: 'Hero',
      description: 'Banner principal',
      isAdded: config.hero.enabled && config.moduleOrder.includes('hero'),
    },
    {
      id: 'about',
      icon: User,
      title: 'Sobre',
      description: 'Informações',
      isAdded: config.about.enabled && config.moduleOrder.includes('about'),
    },
    {
      id: 'practice',
      icon: Briefcase,
      title: 'Áreas de Atuação',
      description: 'Especialidades',
      isAdded: config.practiceAreas.enabled && config.moduleOrder.includes('practice'),
    },
    {
      id: 'cases',
      icon: Trophy,
      title: 'Cases de Sucesso',
      description: 'Histórico',
      isAdded: config.successCases.enabled && config.moduleOrder.includes('cases'),
    },
    {
      id: 'contact',
      icon: Mail,
      title: 'Formulário',
      description: 'Contato',
      isAdded: config.contactForm.enabled && config.moduleOrder.includes('contact'),
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
              disabled={module.isAdded}
              className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border hover:border-primary hover:bg-accent/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-border disabled:hover:bg-transparent group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
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
