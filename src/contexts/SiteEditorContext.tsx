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
  fontCombination: string;
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

export interface Testimonial {
  id: string;
  image: string;
  name: string;
  role: string;
  testimonial: string;
}

export interface TestimonialsConfig {
  enabled: boolean;
  title: string;
  testimonials: Testimonial[];
}

export interface GalleryImage {
  id: string;
  url: string;
  alt?: string;
}

export interface GalleryConfig {
  enabled: boolean;
  images: GalleryImage[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQConfig {
  enabled: boolean;
  title: string;
  items: FAQItem[];
}

export interface PricingPlan {
  id: string;
  name: string;
  originalPrice?: string;
  price: string;
  period: 'mensal' | 'trimestral' | 'semestral' | 'anual' | 'vitalicio';
  benefits: string[];
  ctaText: string;
  ctaLink: string;
}

export interface PricingPlansConfig {
  enabled: boolean;
  plans: PricingPlan[];
}

export interface BusinessHour {
  id: string;
  day: string;
  hours: string;
}

export interface LocationConfig {
  enabled: boolean;
  title: string;
  address: string;
  businessHours: BusinessHour[];
  mapEmbedUrl: string;
}

export interface BeforeAfterItem {
  id: string;
  beforeImage: string;
  afterImage: string;
  description: string;
}

export interface BeforeAfterConfig {
  enabled: boolean;
  title: string;
  items: BeforeAfterItem[];
}

export interface FooterConfig {
  enabled: boolean;
  copyrightText: string;
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

export type ModuleType = 'header' | 'hero' | 'about' | 'practice' | 'cases' | 'contact' | 'button' | 'testimonials' | 'gallery' | 'faq' | 'pricing' | 'location' | 'before-after' | 'footer';

export interface ModuleInstance {
  id: string; // unique instance id like 'hero-1', 'hero-2'
  type: ModuleType;
  enabled: boolean;
  config: HeaderConfig | HeroConfig | AboutConfig | PracticeAreasConfig | SuccessCasesConfig | ContactFormConfig | ButtonConfig | TestimonialsConfig | GalleryConfig | FAQConfig | PricingPlansConfig | LocationConfig | BeforeAfterConfig | FooterConfig;
}

export interface SiteConfig {
  metadata: SiteMetadata;
  brand: BrandColors;
  marketing: MarketingConfig;
  moduleInstances: Record<string, ModuleInstance>;
  moduleOrder: string[]; // array of instance IDs
  currentTemplateId?: string; // ID do template atualmente aplicado
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
  applyTemplate: (templateId: string) => void;
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
    fontCombination: 'inter',
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
    testimonials: 0,
    gallery: 0,
    faq: 0,
    pricing: 0,
    location: 0,
    'before-after': 0,
    footer: 0,
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
        case 'testimonials':
          defaultModuleConfig = {
            enabled: true,
            title: 'Depoimentos',
            testimonials: [
              {
                id: '1',
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
                name: 'Cliente',
                role: 'Cargo/Empresa',
                testimonial: 'Depoimento do cliente...',
              },
            ],
          };
          break;
        case 'gallery':
          defaultModuleConfig = {
            enabled: true,
            images: [],
          };
          break;
        case 'faq':
          defaultModuleConfig = {
            enabled: true,
            title: 'Perguntas Frequentes',
            items: [
              {
                id: '1',
                question: 'Quanto tempo vai durar meu processo?',
                answer: 'O tempo varia de acordo com a complexidade do caso e a instância judicial.',
              },
            ],
          };
          break;
        case 'pricing':
          defaultModuleConfig = {
            enabled: true,
            plans: [
              {
                id: '1',
                name: 'Plano Básico',
                price: '450',
                period: 'mensal',
                benefits: ['Consultas mensais', 'Suporte por WhatsApp', 'Ajustes no plano'],
                ctaText: 'Escolher Plano',
                ctaLink: '',
              },
            ],
          };
          break;
        case 'location':
          defaultModuleConfig = {
            enabled: true,
            title: 'Localização',
            address: 'Rua das Flores, 123 - Centro\nSão Paulo - SP, 01234-567',
            businessHours: [
              {
                id: '1',
                day: 'Segunda a Sexta',
                hours: '8h às 18h',
              },
            ],
            mapEmbedUrl: '',
          };
          break;
        case 'before-after':
          defaultModuleConfig = {
            enabled: true,
            title: 'Transformações',
            items: [
              {
                id: '1',
                beforeImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&h=700&fit=crop',
                afterImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=700&fit=crop',
                description: 'Maria - 3 meses',
              },
            ],
          };
          break;
        case 'footer':
          defaultModuleConfig = {
            enabled: true,
            copyrightText: '© SEU NOME - 000000 - OAB/XX\nTodos os direitos reservados - 2025',
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

  const applyTemplate = (templateId: string) => {
    // Define módulos para cada template
    const templateModules: Record<string, ModuleType[]> = {
      '1': ['header', 'hero', 'about', 'practice', 'cases', 'testimonials', 'gallery', 'faq', 'location', 'footer'], // Jurídico
      '3': ['header', 'hero', 'about', 'testimonials', 'gallery', 'location', 'footer'], // Consultório Médico
      '4': ['header', 'hero', 'about', 'testimonials', 'gallery', 'location', 'footer'], // Clínica Dentária
      '5': ['header', 'hero', 'about', 'gallery', 'testimonials', 'contact', 'footer'], // E-commerce
      '6': ['header', 'hero', 'about', 'cases', 'testimonials', 'contact', 'footer'], // Agência Digital
      '7': ['header', 'hero', 'about', 'gallery', 'testimonials', 'location', 'footer'], // Loja de Roupas
      '8': ['header', 'hero', 'about', 'gallery', 'location', 'footer'], // Restaurante
    };

    const modules = templateModules[templateId];
    if (!modules) return;

    setConfig((prev) => {
      const newInstances: Record<string, ModuleInstance> = {};
      const newOrder: string[] = [];
      const newCounter: Record<ModuleType, number> = {
        header: 0,
        hero: 0,
        about: 0,
        practice: 0,
        cases: 0,
        contact: 0,
        button: 0,
        testimonials: 0,
        gallery: 0,
        faq: 0,
        pricing: 0,
        location: 0,
        'before-after': 0,
        footer: 0,
      };

      // Criar instâncias para cada módulo do template
      modules.forEach((moduleType) => {
        const counter = newCounter[moduleType] + 1;
        newCounter[moduleType] = counter;
        const instanceId = `${moduleType}-${counter}`;

        // Configuração padrão baseada no tipo
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
              title: 'Mais que um advogado, um parceiro para sua segurança jurídica',
              description: 'Especialista com anos de experiência',
            };
            break;
          case 'about':
            defaultModuleConfig = {
              enabled: true,
              photo: '',
              name: 'Seu Nome',
              title: 'Seu Título Profissional',
              description: 'Abordagem estratégica e personalizada para cada cliente',
              socialLinks: {},
              education: [
                'Sua formação e especializações',
              ],
            };
            break;
          case 'practice':
            defaultModuleConfig = {
              enabled: true,
              areas: [
                { id: '1', title: 'Área de Atuação 1', icon: 'briefcase' },
                { id: '2', title: 'Área de Atuação 2', icon: 'scale' },
                { id: '3', title: 'Área de Atuação 3', icon: 'gavel' },
              ],
            };
            break;
          case 'cases':
            defaultModuleConfig = {
              enabled: true,
              backgroundImage: '',
              cases: [
                {
                  id: '1',
                  title: 'Caso de Sucesso 1',
                  description: 'Descrição do caso',
                  result: 'Resultado obtido',
                  icon: 'trophy',
                },
              ],
            };
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
          case 'testimonials':
            defaultModuleConfig = {
              enabled: true,
              title: 'Depoimentos',
              testimonials: [
                {
                  id: '1',
                  image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
                  name: 'Nome do Cliente',
                  role: 'Cargo/Empresa',
                  testimonial: 'Depoimento do cliente sobre o serviço prestado...',
                },
              ],
            };
            break;
          case 'gallery':
            defaultModuleConfig = {
              enabled: true,
              images: [
                { id: '1', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop', alt: 'Imagem 1' },
              ],
            };
            break;
          case 'faq':
            defaultModuleConfig = {
              enabled: true,
              title: 'Perguntas Frequentes',
              items: [
                {
                  id: '1',
                  question: 'Quanto tempo vai durar meu processo?',
                  answer: 'O tempo varia de acordo com a complexidade do caso e a instância judicial.',
                },
              ],
            };
            break;
          case 'location':
            defaultModuleConfig = {
              enabled: true,
              title: 'Localização',
              address: 'Seu endereço completo\nCidade - Estado, CEP',
              businessHours: [
                {
                  id: '1',
                  day: 'Segunda a Sexta',
                  hours: '8h às 18h',
                },
              ],
              mapEmbedUrl: '',
            };
            break;
          case 'before-after':
            defaultModuleConfig = {
              enabled: true,
              title: 'Transformações',
              items: [
                {
                  id: '1',
                  beforeImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&h=700&fit=crop',
                  afterImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=700&fit=crop',
                  description: 'Maria - 3 meses',
                },
              ],
            };
            break;
          case 'footer':
            defaultModuleConfig = {
              enabled: true,
              copyrightText: '© SEU NOME - 000000 - OAB/XX\nTodos os direitos reservados - 2025',
            };
            break;
        }

        newInstances[instanceId] = {
          id: instanceId,
          type: moduleType,
          enabled: true,
          config: defaultModuleConfig,
        };

        newOrder.push(instanceId);
      });

      setInstanceCounter(newCounter);

      return {
        ...prev,
        moduleInstances: newInstances,
        moduleOrder: newOrder,
        currentTemplateId: templateId,
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
        applyTemplate,
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
