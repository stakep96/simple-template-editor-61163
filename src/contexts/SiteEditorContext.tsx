import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface SiteMetadata {
  siteName: string;
  domain: string;
  title: string;
  description: string;
}

export interface BrandColors {
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  background: string;
  titleColor: string;
  textColor: string;
}

export interface HeaderConfig {
  enabled: boolean;
  logo: string;
  alignment: 'left' | 'center' | 'right';
}

export interface HeroConfig {
  enabled: boolean;
  backgroundImage: string;
  gradientOpacity: number;
  title: string;
  description: string;
}

export interface AboutConfig {
  enabled: boolean;
  photo: string;
  name: string;
  title: string;
  description: string;
  socialLinks: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
  };
  education: string[];
}

export interface PracticeArea {
  id: string;
  title: string;
  icon: string;
}

export interface PracticeAreasConfig {
  enabled: boolean;
  areas: PracticeArea[];
}

export interface SuccessCase {
  id: string;
  title: string;
  description: string;
  result: string;
  icon: string;
}

export interface SuccessCasesConfig {
  enabled: boolean;
  backgroundImage: string;
  cases: SuccessCase[];
}

export interface ContactFormConfig {
  enabled: boolean;
  title: string;
  subtitle: string;
  fields: string[];
}

export interface ButtonConfig {
  enabled: boolean;
  ctaText: string;
  link: string;
}

export interface MarketingConfig {
  whatsapp: {
    enabled: boolean;
    number: string;
  };
  googleTagManager: string;
  googleAnalytics: string;
  facebookPixel: string;
}

export type ModuleType = 'header' | 'hero' | 'about' | 'practice' | 'cases' | 'contact' | 'button';

export interface ModuleInstance {
  id: string; // unique instance id like 'hero-1', 'hero-2'
  type: ModuleType;
  enabled: boolean;
  config: HeaderConfig | HeroConfig | AboutConfig | PracticeAreasConfig | SuccessCasesConfig | ContactFormConfig | ButtonConfig;
}

export interface SiteConfig {
  metadata: SiteMetadata;
  brand: BrandColors;
  marketing: MarketingConfig;
  moduleInstances: Record<string, ModuleInstance>;
  moduleOrder: string[]; // array of instance IDs
}

interface SiteEditorContextType {
  config: SiteConfig;
  updateMetadata: (metadata: Partial<SiteMetadata>) => void;
  updateBrand: (brand: Partial<BrandColors>) => void;
  updateMarketing: (marketing: Partial<MarketingConfig>) => void;
  updateModuleInstance: (instanceId: string, updates: Partial<ModuleInstance['config']> | { enabled: boolean }) => void;
  reorderModules: (newOrder: string[]) => void;
  addModuleAt: (moduleType: ModuleType, position: number) => void;
  removeModuleInstance: (instanceId: string) => void;
}

const defaultConfig: SiteConfig = {
  metadata: {
    siteName: 'Novo Site',
    domain: '',
    title: 'Seu nome ou nome da empresa',
    description: 'Fale um pouco sobre você ou sua empresa',
  },
  brand: {
    primary: '#8B1538',
    secondary: '#F5E6D3',
    accent: '#D4AF37',
    text: '#2D2D2D',
    background: '#FFFFFF',
    titleColor: '#2D2D2D',
    textColor: '#4A4A4A',
  },
  marketing: {
    whatsapp: {
      enabled: false,
      number: '',
    },
    googleTagManager: '',
    googleAnalytics: '',
    facebookPixel: '',
  },
  moduleInstances: {
    'header-1': {
      id: 'header-1',
      type: 'header',
      enabled: true,
      config: {
        enabled: true,
        logo: '',
        alignment: 'center',
      } as HeaderConfig,
    },
    'hero-1': {
      id: 'hero-1',
      type: 'hero',
      enabled: true,
      config: {
        enabled: true,
        backgroundImage: '',
        gradientOpacity: 0.7,
        title: 'Mais que um advogado, um parceiro para sua segurança jurídica',
        description: 'Especialista em Direito Criminal e Empresarial com 15 anos de experiência',
      } as HeroConfig,
    },
    'about-1': {
      id: 'about-1',
      type: 'about',
      enabled: true,
      config: {
        enabled: true,
        photo: '',
        name: 'Dr. João Silva',
        title: 'Advogado Criminalista e Empresarial',
        description: 'Abordagem estratégica e personalizada para cada cliente',
        socialLinks: {
          instagram: '',
          facebook: '',
          linkedin: '',
        },
        education: [
          'Mestre em Direito Tributário pela FGV-SP (2010) e especialista para pessoas físicas e jurídicas pela mesma instituição (2015)',
          'Mestre em Direito Tributário pela FGV-SP (2010) e especialista para pessoas físicas e jurídicas pela mesma instituição (2015)',
        ],
      } as AboutConfig,
    },
    'practice-1': {
      id: 'practice-1',
      type: 'practice',
      enabled: true,
      config: {
        enabled: true,
        areas: [
          { id: '1', title: 'Direito Imobiliário', icon: 'home' },
          { id: '2', title: 'Crimes Digitais', icon: 'smartphone' },
          { id: '3', title: 'Propriedade Intelectual', icon: 'lightbulb' },
          { id: '4', title: 'Direito da Família', icon: 'users' },
          { id: '5', title: 'Defesa Criminal', icon: 'shield' },
          { id: '6', title: 'Crimes de Trânsito', icon: 'car' },
        ],
      } as PracticeAreasConfig,
    },
    'cases-1': {
      id: 'cases-1',
      type: 'cases',
      enabled: true,
      config: {
        enabled: true,
        backgroundImage: '',
        cases: [
          {
            id: '1',
            title: 'Defesa Criminal - 2025',
            description: 'Cliente acusado injustamente',
            result: 'Absolvição por falta de provas',
            icon: 'shield',
          },
        ],
      } as SuccessCasesConfig,
    },
  },
  moduleOrder: ['header-1', 'hero-1', 'about-1', 'practice-1', 'cases-1'],
};

const SiteEditorContext = createContext<SiteEditorContextType | undefined>(undefined);

export const SiteEditorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);
  const [instanceCounter, setInstanceCounter] = useState<Record<ModuleType, number>>({
    header: 1,
    hero: 1,
    about: 1,
    practice: 1,
    cases: 1,
    contact: 0,
    button: 0,
  });

  const updateMetadata = (metadata: Partial<SiteMetadata>) => {
    setConfig((prev) => ({
      ...prev,
      metadata: { ...prev.metadata, ...metadata },
    }));
  };

  const updateBrand = (brand: Partial<BrandColors>) => {
    setConfig((prev) => ({
      ...prev,
      brand: { ...prev.brand, ...brand },
    }));
  };

  const updateMarketing = (marketing: Partial<MarketingConfig>) => {
    setConfig((prev) => ({
      ...prev,
      marketing: { ...prev.marketing, ...marketing },
    }));
  };

  const updateModuleInstance = (instanceId: string, updates: any) => {
    setConfig((prev) => {
      const instance = prev.moduleInstances[instanceId];
      if (!instance) return prev;

      // Handle enabled toggle separately
      if ('enabled' in updates && typeof updates.enabled === 'boolean') {
        return {
          ...prev,
          moduleInstances: {
            ...prev.moduleInstances,
            [instanceId]: {
              ...instance,
              enabled: updates.enabled,
            },
          },
        };
      }

      // Handle config updates
      return {
        ...prev,
        moduleInstances: {
          ...prev.moduleInstances,
          [instanceId]: {
            ...instance,
            config: { ...instance.config, ...updates },
          },
        },
      };
    });
  };

  const reorderModules = (newOrder: string[]) => {
    setConfig((prev) => ({
      ...prev,
      moduleOrder: newOrder,
    }));
  };

  const addModuleAt = (moduleType: ModuleType, position: number) => {
    setConfig((prev) => {
      const newCounter = instanceCounter[moduleType] + 1;
      const newInstanceId = `${moduleType}-${newCounter}`;
      
      // Create default config based on module type
      let defaultModuleConfig: any = { enabled: true };
      
      switch (moduleType) {
        case 'header':
          defaultModuleConfig = { enabled: true, logo: '', alignment: 'center' };
          break;
        case 'hero':
          defaultModuleConfig = {
            enabled: true,
            backgroundImage: '',
            gradientOpacity: 0.7,
            title: 'Novo Hero',
            description: 'Descrição do hero',
          };
          break;
        case 'about':
          defaultModuleConfig = {
            enabled: true,
            photo: '',
            name: 'Nome',
            title: 'Título',
            description: 'Descrição',
            socialLinks: {},
            education: [],
          };
          break;
        case 'practice':
          defaultModuleConfig = { enabled: true, areas: [] };
          break;
        case 'cases':
          defaultModuleConfig = { enabled: true, backgroundImage: '', cases: [] };
          break;
        case 'contact':
          defaultModuleConfig = {
            enabled: true,
            title: 'Entre em Contato',
            subtitle: 'Preencha o formulário',
            fields: ['name', 'email', 'phone', 'message'],
          };
          break;
        case 'button':
          defaultModuleConfig = {
            enabled: true,
            ctaText: 'Clique Aqui',
            link: '',
          };
          break;
      }

      const newInstance: ModuleInstance = {
        id: newInstanceId,
        type: moduleType,
        enabled: true,
        config: defaultModuleConfig,
      };

      const newOrder = [...prev.moduleOrder];
      newOrder.splice(position, 0, newInstanceId);

      setInstanceCounter((prev) => ({
        ...prev,
        [moduleType]: newCounter,
      }));

      return {
        ...prev,
        moduleInstances: {
          ...prev.moduleInstances,
          [newInstanceId]: newInstance,
        },
        moduleOrder: newOrder,
      };
    });
  };

  const removeModuleInstance = (instanceId: string) => {
    setConfig((prev) => {
      const newInstances = { ...prev.moduleInstances };
      delete newInstances[instanceId];

      return {
        ...prev,
        moduleInstances: newInstances,
        moduleOrder: prev.moduleOrder.filter((id) => id !== instanceId),
      };
    });
  };

  return (
    <SiteEditorContext.Provider
      value={{
        config,
        updateMetadata,
        updateBrand,
        updateMarketing,
        updateModuleInstance,
        reorderModules,
        addModuleAt,
        removeModuleInstance,
      }}
    >
      {children}
    </SiteEditorContext.Provider>
  );
};

export const useSiteEditor = () => {
  const context = useContext(SiteEditorContext);
  if (!context) {
    throw new Error('useSiteEditor must be used within SiteEditorProvider');
  }
  return context;
};
