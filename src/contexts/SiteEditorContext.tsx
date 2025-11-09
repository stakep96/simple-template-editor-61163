import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface SiteMetadata {
  siteName: string;
  domain: string;
  title: string;
  description: string;
  customDomain: boolean;
  customDomainName: string;
  customDomainSaved: boolean;
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
  transparentBackground?: boolean;
}

export interface HeroConfig {
  enabled: boolean;
  backgroundImage: string;
  gradientOpacity: number;
  title: string;
  description: string;
  imageFade: boolean;
}

export interface SocialLink {
  id: string;
  platform: 'instagram' | 'facebook' | 'linkedin' | 'twitter' | 'youtube' | 'tiktok' | 'whatsapp';
  url: string;
}

export interface AboutConfig {
  enabled: boolean;
  photo: string;
  name: string;
  title: string;
  description: string;
  socialLinks: SocialLink[];
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

export interface TestimonialImage {
  id: string;
  image: string;
}

export interface TestimonialsImagesConfig {
  enabled: boolean;
  title: string;
  images: TestimonialImage[];
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

export interface BenefitItem {
  id: string;
  text: string;
}

export interface BenefitsConfig {
  enabled: boolean;
  title: string;
  benefits: BenefitItem[];
  ctaText: string;
  ctaLink: string;
}

export interface FooterConfig {
  enabled: boolean;
  copyrightText: string;
}

export interface CredentialCard {
  id: string;
  icon: string;
  text: string;
}

export interface CredentialsConfig {
  enabled: boolean;
  cards: CredentialCard[];
}

export interface ServiceCard {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface ServicesConfig {
  enabled: boolean;
  cards: ServiceCard[];
}

export interface DemographicStat {
  id: string;
  value: string;
  label: string;
}

export interface DemographicsConfig {
  enabled: boolean;
  title: string;
  stats: DemographicStat[];
}

export interface InterestsConfig {
  enabled: boolean;
  title: string;
  tags: string[];
}

export interface ContentStyleItem {
  id: string;
  text: string;
  icon: string;
}

export interface ContentStyleConfig {
  enabled: boolean;
  title: string;
  items: ContentStyleItem[];
}

export interface MetricItem {
  id: string;
  icon: string;
  platform: string;
  followers: string;
  engagement: string;
  monthlyViews: string;
}

export interface MetricsConfig {
  enabled: boolean;
  title: string;
  metrics: MetricItem[];
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

export interface BrandLogo {
  id: string;
  url: string;
  alt: string;
}

export interface BrandsConfig {
  enabled: boolean;
  title: string;
  description: string;
  logos: BrandLogo[];
}

export interface PortfolioProject {
  id: string;
  image: string;
  title: string;
  description: string;
  tags: string[];
}

export interface PortfolioConfig {
  enabled: boolean;
  title: string;
  projects: PortfolioProject[];
}

export interface MarqueeConfig {
  enabled: boolean;
  items: string;
  separator: string;
  backgroundColor: string;
  textColor: string;
  speed: number;
  secondLayer: {
    backgroundColor: string;
  };
}

export interface ImageTextConfig {
  enabled: boolean;
  image: string;
  title: string;
  description: string;
}

export type ModuleType = 'header' | 'hero' | 'about' | 'practice' | 'cases' | 'contact' | 'button' | 'testimonials' | 'testimonials-images' | 'gallery' | 'faq' | 'pricing' | 'location' | 'before-after' | 'benefits' | 'credentials' | 'services' | 'demographics' | 'interests' | 'content-style' | 'metrics' | 'brands' | 'portfolio' | 'marquee' | 'image-text' | 'footer';

export interface ModuleInstance {
  id: string; // unique instance id like 'hero-1', 'hero-2'
  type: ModuleType;
  enabled: boolean;
  config: HeaderConfig | HeroConfig | AboutConfig | PracticeAreasConfig | SuccessCasesConfig | ContactFormConfig | ButtonConfig | TestimonialsConfig | TestimonialsImagesConfig | GalleryConfig | FAQConfig | PricingPlansConfig | LocationConfig | BeforeAfterConfig | BenefitsConfig | CredentialsConfig | ServicesConfig | DemographicsConfig | InterestsConfig | ContentStyleConfig | MetricsConfig | BrandsConfig | PortfolioConfig | MarqueeConfig | ImageTextConfig | FooterConfig;
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
    siteName: 'Escritório Jurídico',
    domain: '',
    title: 'Advocacia Especializada em Direito Criminal e Empresarial',
    description: 'Mais de 15 anos de experiência defendendo seus direitos com excelência e dedicação',
    customDomain: false,
    customDomainName: '',
    customDomainSaved: false,
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
      enabled: true,
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
        backgroundImage: '/images/hero-juridico-default.jpg',
        gradientOpacity: 0.7,
        title: 'Mais que um advogado, um parceiro para sua segurança jurídica',
        description: 'Especialista em Direito Criminal e Empresarial com 15 anos de experiência',
        imageFade: true,
      } as HeroConfig,
    },
    'about-1': {
      id: 'about-1',
      type: 'about',
      enabled: true,
      config: {
        enabled: true,
        photo: '/images/profile-juridico-default.jpg',
        name: 'Dr. João Silva',
        title: 'Advogado Criminalista e Empresarial',
        description: 'Com mais de 15 anos de experiência, ofereço uma abordagem estratégica e personalizada para cada cliente. Minha missão é garantir seus direitos com ética, dedicação e resultados comprovados.',
        socialLinks: [
          {
            id: 'social-1',
            platform: 'instagram',
            url: 'https://instagram.com',
          },
          {
            id: 'social-2',
            platform: 'linkedin',
            url: 'https://linkedin.com',
          },
          {
            id: 'social-3',
            platform: 'facebook',
            url: 'https://facebook.com',
          },
        ],
        education: [
          'Graduado em Direito pela USP (2005)',
          'Mestre em Direito Penal pela PUC-SP (2010)',
          'Especialização em Direito Empresarial pela FGV (2012)',
          'Membro da OAB-SP desde 2006',
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
          { id: '1', title: 'Direito Criminal', icon: 'juridico-gavel' },
          { id: '2', title: 'Direito Empresarial', icon: 'juridico-briefcase' },
          { id: '3', title: 'Direito Imobiliário', icon: 'juridico-contract' },
          { id: '4', title: 'Direito da Família', icon: 'juridico-handshake' },
          { id: '5', title: 'Defesa do Consumidor', icon: 'juridico-balance' },
          { id: '6', title: 'Direito Trabalhista', icon: 'juridico-law' },
        ],
      } as PracticeAreasConfig,
    },
    'cases-1': {
      id: 'cases-1',
      type: 'cases',
      enabled: true,
      config: {
        enabled: true,
        backgroundImage: '/images/cases-juridico-default.jpg',
        cases: [
          {
            id: '1',
            title: 'Absolvição em Processo Criminal',
            description: 'Cliente acusado injustamente de crime contra o patrimônio',
            result: 'Absolvição por insuficiência de provas após 2 anos de atuação estratégica',
            icon: 'juridico-gavel',
          },
          {
            id: '2',
            title: 'Recuperação de Empresa',
            description: 'Empresa em situação crítica de endividamento',
            result: 'Reestruturação completa e retomada das operações em 18 meses',
            icon: 'juridico-briefcase',
          },
          {
            id: '3',
            title: 'Divórcio Consensual',
            description: 'Processo de divórcio com partilha de bens complexa',
            result: 'Acordo amigável alcançado em 6 meses com satisfação de ambas as partes',
            icon: 'juridico-handshake',
          },
        ],
      } as SuccessCasesConfig,
    },
    'testimonials-1': {
      id: 'testimonials-1',
      type: 'testimonials',
      enabled: true,
      config: {
        enabled: true,
        title: 'O que dizem meus clientes',
        testimonials: [
          {
            id: '1',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
            name: 'Maria Silva',
            role: 'Empresária',
            testimonial: 'Profissional excepcional! Me ajudou em um momento muito difícil e conseguiu reverter uma situação que parecia impossível. Recomendo de olhos fechados.',
          },
          {
            id: '2',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
            name: 'Carlos Oliveira',
            role: 'Empresário',
            testimonial: 'Excelente advogado! Muito atencioso, competente e sempre disponível para tirar dúvidas. Minha empresa foi salva graças ao trabalho dele.',
          },
          {
            id: '3',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
            name: 'Ana Paula Costa',
            role: 'Professora',
            testimonial: 'Profissionalismo e empatia definem o trabalho do Dr. João. Me senti acolhida desde o primeiro atendimento e o resultado foi além das minhas expectativas.',
          },
        ],
      } as TestimonialsConfig,
    },
    'gallery-1': {
      id: 'gallery-1',
      type: 'gallery',
      enabled: true,
      config: {
        enabled: true,
        images: [
          { id: '1', url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop', alt: 'Escritório - Sala de reuniões' },
          { id: '2', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop', alt: 'Escritório - Recepção' },
          { id: '3', url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop', alt: 'Escritório - Biblioteca jurídica' },
          { id: '4', url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=600&fit=crop', alt: 'Equipe de trabalho' },
        ],
      } as GalleryConfig,
    },
    'faq-1': {
      id: 'faq-1',
      type: 'faq',
      enabled: true,
      config: {
        enabled: true,
        title: 'Perguntas Frequentes',
        items: [
          {
            id: '1',
            question: 'Quanto tempo dura um processo judicial?',
            answer: 'O tempo de duração varia de acordo com a complexidade do caso e a instância judicial. Processos mais simples podem levar de 6 meses a 2 anos, enquanto casos mais complexos podem durar mais tempo.',
          },
          {
            id: '2',
            question: 'Como funciona o pagamento dos honorários?',
            answer: 'Os honorários são estabelecidos de acordo com a complexidade do caso. Oferecemos diferentes modalidades de pagamento: valor fixo, percentual sobre o resultado ou combinação de ambos.',
          },
          {
            id: '3',
            question: 'Posso acompanhar meu processo online?',
            answer: 'Sim! Você terá acesso a todas as movimentações processuais através de contato direto comigo e também poderá acompanhar pelos sistemas dos tribunais com as orientações que fornecerei.',
          },
          {
            id: '4',
            question: 'Qual a diferença entre advogado e defensor público?',
            answer: 'O advogado é contratado particularmente pelo cliente, enquanto o defensor público atende gratuitamente pessoas que não podem pagar. Um advogado particular pode oferecer atendimento mais personalizado e dedicado.',
          },
        ],
      } as FAQConfig,
    },
    'location-1': {
      id: 'location-1',
      type: 'location',
      enabled: true,
      config: {
        enabled: true,
        title: 'Onde nos encontrar',
        address: 'Av. Paulista, 1000 - Conjunto 1501\nBela Vista - São Paulo/SP\nCEP: 01310-100',
        businessHours: [
          {
            id: '1',
            day: 'Segunda a Quinta',
            hours: '9h às 18h',
          },
          {
            id: '2',
            day: 'Sexta-feira',
            hours: '9h às 17h',
          },
          {
            id: '3',
            day: 'Sábado',
            hours: 'Sob agendamento',
          },
        ],
        mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d467688.89495119266!2d-46.5952992!3d-23.6824124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce448183a461d1%3A0x9ba94b08ff335bae!2zU8OjbyBQYXVsbywgU1A!5e0!3m2!1spt-BR!2sbr!4v1762662159750!5m2!1spt-BR!2sbr',
      } as LocationConfig,
    },
    'footer-1': {
      id: 'footer-1',
      type: 'footer',
      enabled: true,
      config: {
        enabled: true,
        copyrightText: '© Dr. João Silva - OAB/SP 123.456\nTodos os direitos reservados - 2025',
      } as FooterConfig,
    },
  },
  moduleOrder: ['header-1', 'hero-1', 'about-1', 'practice-1', 'cases-1', 'testimonials-1', 'gallery-1', 'faq-1', 'location-1', 'footer-1'],
  currentTemplateId: '1',
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
    testimonials: 1,
    'testimonials-images': 0,
    gallery: 1,
    faq: 1,
    pricing: 0,
    location: 1,
    'before-after': 0,
    benefits: 0,
    credentials: 0,
    services: 0,
    demographics: 0,
    interests: 0,
    'content-style': 0,
    metrics: 0,
    brands: 0,
    portfolio: 0,
    marquee: 0,
    'image-text': 0,
    footer: 1,
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
            socialLinks: [],
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
        case 'testimonials-images':
          defaultModuleConfig = {
            enabled: true,
            title: 'Depoimentos',
            images: [
              {
                id: '1',
                image: '',
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
            title: 'Resultados',
            items: [
              {
                id: '1',
                beforeImage: '',
                afterImage: '',
                description: 'Nova transformação',
              },
            ],
          };
          break;
        case 'benefits':
          defaultModuleConfig = {
            enabled: true,
            title: 'Acompanhamento Mensal',
            benefits: [
              {
                id: '1',
                text: '4 consultas mensais',
              },
              {
                id: '2',
                text: 'Suporte por WhatsApp',
              },
              {
                id: '3',
                text: 'Plano alimentar personalizado',
              },
            ],
            ctaText: 'Agendar reunião',
            ctaLink: '',
          };
          break;
        case 'credentials':
          defaultModuleConfig = {
            enabled: true,
            cards: [
              {
                id: '1',
                icon: 'award',
                text: 'CRN Certificada',
              },
              {
                id: '2',
                icon: 'users',
                text: '+100 Pacientes',
              },
            ],
          };
          break;
        case 'services':
          defaultModuleConfig = {
            enabled: true,
            cards: [
              {
                id: 'service-1',
                icon: 'award',
                title: 'Novo Serviço',
                subtitle: 'Subtítulo do serviço',
                description: 'Descrição detalhada do serviço oferecido.',
              },
            ],
          };
          break;
        case 'demographics':
          defaultModuleConfig = {
            enabled: true,
            title: 'Demografia',
            stats: [
              {
                id: '1',
                value: '18-35',
                label: 'Idade média',
              },
              {
                id: '2',
                value: '78%',
                label: 'Feminino',
              },
            ],
          };
          break;
        case 'interests':
          defaultModuleConfig = {
            enabled: true,
            title: 'Interesses do Público',
            tags: ['Moda', 'Lifestyle', 'Beleza', 'Viagens', 'Fitness'],
          };
          break;
        case 'content-style':
          defaultModuleConfig = {
            enabled: true,
            title: 'Estilo de conteúdo',
            items: [
              {
                id: '1',
                text: 'IRL',
                icon: 'circle',
              },
              {
                id: '2',
                text: 'Humor',
                icon: 'circle',
              },
              {
                id: '3',
                text: 'Esportes',
                icon: 'circle',
              },
            ],
          };
          break;
        case 'metrics':
          defaultModuleConfig = {
            enabled: true,
            title: 'Métricas & Resultados',
            metrics: [
              {
                id: '1',
                icon: 'instagram',
                platform: 'Instagram',
                followers: '120K',
                engagement: '4.8%',
                monthlyViews: '1.5M',
              },
            ],
          };
          break;
        case 'brands':
          defaultModuleConfig = {
            enabled: true,
            title: 'Marcas Parceiras',
            description: 'Já colaborei com marcas renomadas, gerando milhões de impressões e resultados excepcionais',
            logos: [
              {
                id: `logo-${Date.now()}-1`,
                url: '',
                alt: '',
              },
              {
                id: `logo-${Date.now()}-2`,
                url: '',
                alt: '',
              },
            ],
          };
          break;
        case 'portfolio':
          defaultModuleConfig = {
            enabled: true,
            title: 'Portfolio',
            projects: [
              {
                id: `project-${Date.now()}-1`,
                image: '',
                title: '',
                description: '',
                tags: [],
              },
            ],
          };
          break;
        case 'marquee':
          defaultModuleConfig = {
            enabled: true,
            items: 'App Design, Website Design, Dashboard, Wireframe',
            separator: '✱',
            backgroundColor: prev.brand.accent,
            textColor: '#FFFFFF',
            speed: 15,
            secondLayer: {
              backgroundColor: prev.brand.primary,
            },
          };
          break;
        case 'image-text':
          defaultModuleConfig = {
            enabled: true,
            image: '',
            title: 'Trusted Eye Care with Compassion & Precision',
            description: 'We are dedicated to providing world-class eye care to patients of all ages. Our mission is to enhance and protect your vision through advanced treatments, compassionate service, and a commitment to excellence in eye health.',
          } as ImageTextConfig;
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
      '6': ['header', 'hero', 'marquee', 'about', 'services', 'portfolio', 'testimonials', 'contact', 'footer'], // Agência Digital
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
        'testimonials-images': 0,
        gallery: 0,
        faq: 0,
        pricing: 0,
        location: 0,
        portfolio: 0,
        'before-after': 0,
        benefits: 0,
        credentials: 0,
        services: 0,
        demographics: 0,
        interests: 0,
        'content-style': 0,
        metrics: 0,
        brands: 0,
        marquee: 0,
        'image-text': 0,
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
            if (templateId === '6') {
              defaultModuleConfig = {
                enabled: true,
                logoType: 'text',
                companyName: 'Agência Gama',
                alignment: 'center',
              };
            } else {
              defaultModuleConfig = { enabled: true, logo: '', alignment: 'center' };
            }
            break;
          case 'hero':
            if (templateId === '6') {
              defaultModuleConfig = {
                enabled: true,
                backgroundImage: '/images/hero-agency-default.jpg',
                gradientOpacity: 0.6,
                title: 'Transformamos ideias em experiências digitais incríveis',
                description: 'Sua parceira estratégica em design, desenvolvimento e marketing digital',
                imageFade: true,
              };
            } else {
              defaultModuleConfig = {
                enabled: true,
                backgroundImage: '/images/hero-juridico-default.jpg',
                gradientOpacity: 0.7,
                title: 'Mais que um advogado, um parceiro para sua segurança jurídica',
                description: 'Especialista em Direito Criminal e Empresarial com 15 anos de experiência',
                imageFade: true,
              };
            }
            break;
          case 'about':
            if (templateId === '6') {
              defaultModuleConfig = {
                enabled: true,
                photo: '/images/profile-agency-default.jpg',
                name: 'Agência Criativa Digital',
                title: 'Especialistas em Soluções Digitais',
                description: 'Somos uma equipe apaixonada por criar experiências digitais que transformam negócios. Com mais de 8 anos no mercado, já entregamos mais de 200 projetos para clientes de diversos segmentos, sempre focando em design impactante, tecnologia de ponta e resultados mensuráveis.',
                socialLinks: [
                  {
                    id: 'social-1',
                    platform: 'instagram',
                    url: 'https://instagram.com',
                  },
                  {
                    id: 'social-2',
                    platform: 'linkedin',
                    url: 'https://linkedin.com',
                  },
                  {
                    id: 'social-3',
                    platform: 'facebook',
                    url: 'https://facebook.com',
                  },
                ],
                education: [
                  '200+ projetos entregues com sucesso',
                  'Equipe multidisciplinar de 15 especialistas',
                  'Clientes em 5 países diferentes',
                  'Prêmios de excelência em design digital',
                ],
              };
            } else {
              defaultModuleConfig = {
                enabled: true,
                photo: '/images/profile-juridico-default.jpg',
                name: 'Dr. João Silva',
                title: 'Advogado Criminalista e Empresarial',
                description: 'Com mais de 15 anos de experiência, ofereço uma abordagem estratégica e personalizada para cada cliente. Minha missão é garantir seus direitos com ética, dedicação e resultados comprovados.',
                socialLinks: [
                  {
                    id: 'social-1',
                    platform: 'instagram',
                    url: 'https://instagram.com',
                  },
                  {
                    id: 'social-2',
                    platform: 'linkedin',
                    url: 'https://linkedin.com',
                  },
                  {
                    id: 'social-3',
                    platform: 'facebook',
                    url: 'https://facebook.com',
                  },
                ],
                education: [
                  'Graduado em Direito pela USP (2005)',
                  'Mestre em Direito Penal pela PUC-SP (2010)',
                  'Especialização em Direito Empresarial pela FGV (2012)',
                  'Membro da OAB-SP desde 2006',
                ],
              };
            }
            break;
          case 'practice':
            defaultModuleConfig = {
              enabled: true,
              areas: [
                { id: '1', title: 'Direito Criminal', icon: 'juridico-gavel' },
                { id: '2', title: 'Direito Empresarial', icon: 'juridico-briefcase' },
                { id: '3', title: 'Direito Imobiliário', icon: 'juridico-contract' },
                { id: '4', title: 'Direito da Família', icon: 'juridico-handshake' },
                { id: '5', title: 'Defesa do Consumidor', icon: 'juridico-balance' },
                { id: '6', title: 'Direito Trabalhista', icon: 'juridico-law' },
              ],
            };
            break;
          case 'cases':
            defaultModuleConfig = {
              enabled: true,
              backgroundImage: '/images/cases-juridico-default.jpg',
              cases: [
                {
                  id: '1',
                  title: 'Absolvição em Processo Criminal',
                  description: 'Cliente acusado injustamente de crime contra o patrimônio',
                  result: 'Absolvição por insuficiência de provas após 2 anos de atuação estratégica',
                  icon: 'juridico-gavel',
                },
                {
                  id: '2',
                  title: 'Recuperação de Empresa',
                  description: 'Empresa em situação crítica de endividamento',
                  result: 'Reestruturação completa e retomada das operações em 18 meses',
                  icon: 'juridico-briefcase',
                },
                {
                  id: '3',
                  title: 'Divórcio Consensual',
                  description: 'Processo de divórcio com partilha de bens complexa',
                  result: 'Acordo amigável alcançado em 6 meses com satisfação de ambas as partes',
                  icon: 'juridico-handshake',
                },
              ],
            };
            break;
          case 'contact':
            if (templateId === '6') {
              defaultModuleConfig = {
                enabled: true,
                title: 'Vamos conversar sobre seu projeto?',
                subtitle: 'Preencha o formulário e entraremos em contato em até 24h',
                fields: ['name', 'email', 'phone', 'message'],
              };
            } else {
              defaultModuleConfig = {
                enabled: true,
                title: 'Entre em Contato',
                subtitle: 'Preencha o formulário',
                fields: ['name', 'email', 'phone', 'message'],
              };
            }
            break;
          case 'button':
            defaultModuleConfig = {
              enabled: true,
              ctaText: 'Clique Aqui',
              link: '',
            };
            break;
          case 'testimonials':
            if (templateId === '6') {
              defaultModuleConfig = {
                enabled: true,
                title: 'O que nossos clientes dizem',
                testimonials: [
                  {
                    id: '1',
                    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
                    name: 'Juliana Ferreira',
                    role: 'CEO - TechStart',
                    testimonial: 'A agência transformou completamente nossa presença digital. O novo site aumentou nossas conversões em 150% nos primeiros 3 meses. Equipe extremamente profissional e criativa!',
                  },
                  {
                    id: '2',
                    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
                    name: 'Roberto Santos',
                    role: 'Diretor de Marketing - InnovaCorp',
                    testimonial: 'Parceria excepcional! Entregaram muito mais do que esperávamos. O app que desenvolveram é lindo, funcional e nossos usuários adoraram. Recomendo fortemente!',
                  },
                  {
                    id: '3',
                    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
                    name: 'Camila Rodrigues',
                    role: 'Fundadora - EcoShop',
                    testimonial: 'Desde o briefing até a entrega final, tudo foi impecável. O e-commerce ficou lindo e nossas vendas online triplicaram. Melhor investimento que fizemos!',
                  },
                ],
              };
            } else {
              defaultModuleConfig = {
                enabled: true,
                title: 'O que dizem meus clientes',
                testimonials: [
                  {
                    id: '1',
                    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
                    name: 'Maria Silva',
                    role: 'Empresária',
                    testimonial: 'Profissional excepcional! Me ajudou em um momento muito difícil e conseguiu reverter uma situação que parecia impossível. Recomendo de olhos fechados.',
                  },
                  {
                    id: '2',
                    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
                    name: 'Carlos Oliveira',
                    role: 'Empresário',
                    testimonial: 'Excelente advogado! Muito atencioso, competente e sempre disponível para tirar dúvidas. Minha empresa foi salva graças ao trabalho dele.',
                  },
                  {
                    id: '3',
                    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
                    name: 'Ana Paula Costa',
                    role: 'Professora',
                    testimonial: 'Profissionalismo e empatia definem o trabalho do Dr. João. Me senti acolhida desde o primeiro atendimento e o resultado foi além das minhas expectativas.',
                  },
                ],
              };
            }
            break;
          case 'gallery':
            defaultModuleConfig = {
              enabled: true,
              images: [
                { id: '1', url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop', alt: 'Escritório - Sala de reuniões' },
                { id: '2', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop', alt: 'Escritório - Recepção' },
                { id: '3', url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop', alt: 'Escritório - Biblioteca jurídica' },
                { id: '4', url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=600&fit=crop', alt: 'Equipe de trabalho' },
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
                  question: 'Quanto tempo dura um processo judicial?',
                  answer: 'O tempo de duração varia de acordo com a complexidade do caso e a instância judicial. Processos mais simples podem levar de 6 meses a 2 anos, enquanto casos mais complexos podem durar mais tempo.',
                },
                {
                  id: '2',
                  question: 'Como funciona o pagamento dos honorários?',
                  answer: 'Os honorários são estabelecidos de acordo com a complexidade do caso. Oferecemos diferentes modalidades de pagamento: valor fixo, percentual sobre o resultado ou combinação de ambos.',
                },
                {
                  id: '3',
                  question: 'Posso acompanhar meu processo online?',
                  answer: 'Sim! Você terá acesso a todas as movimentações processuais através de contato direto comigo e também poderá acompanhar pelos sistemas dos tribunais com as orientações que fornecerei.',
                },
                {
                  id: '4',
                  question: 'Qual a diferença entre advogado e defensor público?',
                  answer: 'O advogado é contratado particularmente pelo cliente, enquanto o defensor público atende gratuitamente pessoas que não podem pagar. Um advogado particular pode oferecer atendimento mais personalizado e dedicado.',
                },
              ],
            };
            break;
          case 'location':
            defaultModuleConfig = {
              enabled: true,
              title: 'Onde nos encontrar',
              address: 'Av. Paulista, 1000 - Conjunto 1501\nBela Vista - São Paulo/SP\nCEP: 01310-100',
              businessHours: [
                {
                  id: '1',
                  day: 'Segunda a Quinta',
                  hours: '9h às 18h',
                },
                {
                  id: '2',
                  day: 'Sexta-feira',
                  hours: '9h às 17h',
                },
                {
                  id: '3',
                  day: 'Sábado',
                  hours: 'Sob agendamento',
                },
              ],
              mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d467688.89495119266!2d-46.5952992!3d-23.6824124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce448183a461d1%3A0x9ba94b08ff335bae!2zU8OjbyBQYXVsbywgU1A!5e0!3m2!1spt-BR!2sbr!4v1762662159750!5m2!1spt-BR!2sbr',
            };
            break;
          case 'before-after':
            defaultModuleConfig = {
              enabled: true,
              title: 'Resultados',
              items: [
                {
                  id: '1',
                  beforeImage: '',
                  afterImage: '',
                  description: 'Nova transformação',
                },
              ],
            };
            break;
          case 'services':
            if (templateId === '6') {
              defaultModuleConfig = {
                enabled: true,
                cards: [
                  {
                    id: 'service-1',
                    icon: 'code',
                    title: 'Desenvolvimento Web',
                    subtitle: 'Sites e aplicações modernas',
                    description: 'Criamos sites responsivos, aplicações web e e-commerce utilizando as tecnologias mais modernas do mercado.',
                  },
                  {
                    id: 'service-2',
                    icon: 'palette',
                    title: 'Design UI/UX',
                    subtitle: 'Experiências que encantam',
                    description: 'Design centrado no usuário, interfaces intuitivas e identidades visuais que destacam sua marca.',
                  },
                  {
                    id: 'service-3',
                    icon: 'megaphone',
                    title: 'Marketing Digital',
                    subtitle: 'Estratégias que convertem',
                    description: 'SEO, gestão de redes sociais, campanhas de mídia paga e estratégias de conteúdo para crescimento real.',
                  },
                  {
                    id: 'service-4',
                    icon: 'smartphone',
                    title: 'Apps Mobile',
                    subtitle: 'Aplicativos nativos e híbridos',
                    description: 'Desenvolvimento de aplicativos iOS e Android com performance excepcional e UX impecável.',
                  },
                ],
              };
            } else {
              defaultModuleConfig = {
                enabled: true,
                cards: [
                  {
                    id: 'service-1',
                    icon: 'award',
                    title: 'Novo Serviço',
                    subtitle: 'Subtítulo do serviço',
                    description: 'Descrição detalhada do serviço oferecido.',
                  },
                ],
              };
            }
            break;
          case 'brands':
            defaultModuleConfig = {
              enabled: true,
              title: 'Marcas Parceiras',
              description: 'Já colaborei com marcas renomadas, gerando milhões de impressões e resultados excepcionais',
              logos: [],
            };
            break;
          case 'marquee':
            if (templateId === '6') {
              defaultModuleConfig = {
                enabled: true,
                items: 'Design UI/UX, Desenvolvimento Web, Apps Mobile, E-commerce, Branding, Marketing Digital, SEO, Consultoria Tech',
                separator: '*',
                backgroundColor: '#9333EA',
                textColor: '#FFFFFF',
                speed: 15,
                secondLayer: {
                  backgroundColor: '#EC4899',
                },
              };
            } else {
              defaultModuleConfig = {
                enabled: true,
                items: 'App Design, Website Design, Dashboard, Wireframe',
                separator: '✱',
                backgroundColor: prev.brand.accent,
                textColor: '#FFFFFF',
                speed: 15,
                secondLayer: {
                  backgroundColor: prev.brand.primary,
                },
              };
            }
            break;
          case 'footer':
            if (templateId === '6') {
              defaultModuleConfig = {
                enabled: true,
                copyrightText: '© Agência Criativa Digital 2025\nTodos os direitos reservados',
              };
            } else {
              defaultModuleConfig = {
                enabled: true,
                copyrightText: '© Dr. João Silva - OAB/SP 123.456\nTodos os direitos reservados - 2025',
              };
            }
            break;
          case 'portfolio':
            if (templateId === '6') {
              defaultModuleConfig = {
                enabled: true,
                title: 'Nossos Projetos',
                projects: [
                  {
                    id: `project-1`,
                    image: '/images/portfolio-agency-default.jpg',
                    title: 'E-commerce Moda Sustentável',
                    description: 'Plataforma completa de e-commerce com design moderno e sistema de gestão integrado',
                    tags: ['E-commerce', 'UI/UX', 'React'],
                  },
                  {
                    id: `project-2`,
                    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
                    title: 'App Delivery Food',
                    description: 'Aplicativo mobile de delivery com integração de pagamentos e rastreamento em tempo real',
                    tags: ['Mobile', 'React Native', 'Firebase'],
                  },
                  {
                    id: `project-3`,
                    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
                    title: 'Dashboard Analytics',
                    description: 'Sistema de análise de dados com visualizações interativas e relatórios customizados',
                    tags: ['Dashboard', 'Data Viz', 'TypeScript'],
                  },
                ],
              };
            } else {
              defaultModuleConfig = {
                enabled: true,
                title: 'Portfolio',
                projects: [],
              };
            }
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

      // Configurações de brand específicas por template
      let brandConfig = prev.brand;
      if (templateId === '1') {
        // Jurídico - cores elegantes e profissionais
        brandConfig = {
          primary: '#8B1538', // Vinho elegante
          secondary: '#F5E6D3', // Bege claro
          accent: '#D4AF37', // Dourado
          text: '#2D2D2D', // Cinza escuro
          background: '#FFFFFF', // Branco
          titleColor: '#2D2D2D', // Cinza escuro
          textColor: '#4A4A4A', // Cinza médio
          fontCombination: 'inter', // Fonte profissional
        };
      } else if (templateId === '6') {
        // Agência Digital - cores vibrantes e modernas
        brandConfig = {
          primary: '#EC4899', // Rosa vibrante
          secondary: '#FFFFFF', // Branco
          accent: '#FFFFFF', // Branco (ícones)
          text: '#FFFFFF', // Branco
          background: '#141414', // Preto/escuro
          titleColor: '#FFFFFF', // Branco
          textColor: '#FFFFFF', // Branco
          fontCombination: 'poppins-lato', // Poppins + Lato
        };
      }

      return {
        ...prev,
        brand: brandConfig,
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
