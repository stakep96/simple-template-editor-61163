import React from 'react';
import { SiteEditorProvider } from '@/contexts/SiteEditorContext';
import { getFontCombination } from '@/lib/fontCombinations';
import PreviewHeader from '@/components/preview/sections/PreviewHeader';
import PreviewHero from '@/components/preview/sections/PreviewHero';
import PreviewAbout from '@/components/preview/sections/PreviewAbout';
import PreviewPracticeAreas from '@/components/preview/sections/PreviewPracticeAreas';
import PreviewSuccessCases from '@/components/preview/sections/PreviewSuccessCases';
import PreviewContactForm from '@/components/preview/sections/PreviewContactForm';
import PreviewButton from '@/components/preview/sections/PreviewButton';
import PreviewTestimonials from '@/components/preview/sections/PreviewTestimonials';
import PreviewGallery from '@/components/preview/sections/PreviewGallery';
import PreviewFAQ from '@/components/preview/sections/PreviewFAQ';
import PreviewPricingPlans from '@/components/preview/sections/PreviewPricingPlans';
import PreviewLocation from '@/components/preview/sections/PreviewLocation';
import PreviewBeforeAfter from '@/components/preview/sections/PreviewBeforeAfter';
import PreviewBenefits from '@/components/preview/sections/PreviewBenefits';
import PreviewCredentials from '@/components/preview/sections/PreviewCredentials';
import PreviewServices from '@/components/preview/sections/PreviewServices';
import PreviewFooter from '@/components/preview/sections/PreviewFooter';
import WhatsAppButton from '@/components/preview/WhatsAppButton';
import type { SiteConfig } from '@/contexts/SiteEditorContext';

// Configuração completa com todos os módulos ativos para teste
const fullTestConfig: SiteConfig = {
  metadata: {
    siteName: 'Site de Teste Completo',
    domain: 'teste.com',
    title: 'Teste - Todos os Módulos',
    description: 'Preview de teste com todos os componentes ativos',
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
      number: '5511999999999',
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
        logo: 'Advocacia Silva',
        alignment: 'center',
      },
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
      },
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
          instagram: 'https://instagram.com',
          facebook: 'https://facebook.com',
          linkedin: 'https://linkedin.com',
        },
        education: [
          'Mestre em Direito Tributário pela FGV-SP (2010)',
          'Especialista em Direito Empresarial pela USP (2015)',
        ],
      },
    },
    'credentials-1': {
      id: 'credentials-1',
      type: 'credentials',
      enabled: true,
      config: {
        enabled: true,
        cards: [
          { id: '1', icon: 'award', text: '15 anos de experiência' },
          { id: '2', icon: 'users', text: '+500 clientes atendidos' },
          { id: '3', icon: 'trophy', text: '95% de casos ganhos' },
          { id: '4', icon: 'shield', text: 'Atendimento 24/7' },
        ],
      },
    },
    'services-1': {
      id: 'services-1',
      type: 'services',
      enabled: true,
      config: {
        enabled: true,
        cards: [
          {
            id: '1',
            icon: 'briefcase',
            title: 'Consultoria Jurídica',
            subtitle: 'Empresarial',
            description: 'Assessoria completa para empresas de todos os portes',
          },
          {
            id: '2',
            icon: 'scale',
            title: 'Defesa Criminal',
            subtitle: 'Advocacia Criminal',
            description: 'Defesa técnica especializada em todas as esferas',
          },
        ],
      },
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
      },
    },
    'benefits-1': {
      id: 'benefits-1',
      type: 'benefits',
      enabled: true,
      config: {
        enabled: true,
        title: 'Por que escolher nosso escritório?',
        benefits: [
          { id: '1', text: 'Atendimento personalizado e humanizado' },
          { id: '2', text: 'Equipe especializada e experiente' },
          { id: '3', text: 'Soluções jurídicas eficientes' },
          { id: '4', text: 'Transparência em todo o processo' },
        ],
        ctaText: 'Entre em Contato',
        ctaLink: '#contact',
      },
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
          {
            id: '2',
            title: 'Direito Empresarial - 2024',
            description: 'Recuperação judicial de empresa',
            result: 'Empresa reestruturada com sucesso',
            icon: 'briefcase',
          },
        ],
      },
    },
    'testimonials-1': {
      id: 'testimonials-1',
      type: 'testimonials',
      enabled: true,
      config: {
        enabled: true,
        title: 'O que nossos clientes dizem',
        testimonials: [
          {
            id: '1',
            image: '',
            name: 'Maria Santos',
            role: 'Empresária',
            testimonial: 'Excelente profissional, resolveu meu caso com agilidade e competência.',
          },
          {
            id: '2',
            image: '',
            name: 'Carlos Oliveira',
            role: 'Empreendedor',
            testimonial: 'Recomendo fortemente! Atendimento excepcional e resultados comprovados.',
          },
        ],
      },
    },
    'gallery-1': {
      id: 'gallery-1',
      type: 'gallery',
      enabled: true,
      config: {
        enabled: true,
        images: [
          { id: '1', url: '/images/before-example.png', alt: 'Escritório 1' },
          { id: '2', url: '/images/after-example.png', alt: 'Escritório 2' },
          { id: '3', url: '/images/before-example.png', alt: 'Escritório 3' },
        ],
      },
    },
    'before-after-1': {
      id: 'before-after-1',
      type: 'before-after',
      enabled: true,
      config: {
        enabled: true,
        title: 'Transformações Jurídicas',
        items: [
          {
            id: '1',
            beforeImage: '/images/before-example.png',
            afterImage: '/images/after-example.png',
            description: 'Caso resolvido com sucesso',
          },
        ],
      },
    },
    'pricing-1': {
      id: 'pricing-1',
      type: 'pricing',
      enabled: true,
      config: {
        enabled: true,
        plans: [
          {
            id: '1',
            name: 'Consultoria Básica',
            price: 'R$ 500',
            period: 'mensal',
            benefits: [
              'Atendimento por e-mail',
              '2 consultas por mês',
              'Análise de documentos',
            ],
            ctaText: 'Contratar',
            ctaLink: '#contact',
          },
          {
            id: '2',
            name: 'Consultoria Premium',
            originalPrice: 'R$ 1.500',
            price: 'R$ 1.200',
            period: 'mensal',
            benefits: [
              'Atendimento prioritário',
              'Consultas ilimitadas',
              'Análise de documentos',
              'Acompanhamento processual',
            ],
            ctaText: 'Contratar',
            ctaLink: '#contact',
          },
        ],
      },
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
            question: 'Como funciona a primeira consulta?',
            answer: 'A primeira consulta é gratuita e serve para entendermos seu caso e apresentarmos as melhores soluções.',
          },
          {
            id: '2',
            question: 'Qual o prazo médio para resolução?',
            answer: 'Depende da complexidade do caso, mas trabalhamos com agilidade para resolver no menor tempo possível.',
          },
          {
            id: '3',
            question: 'Quais formas de pagamento são aceitas?',
            answer: 'Aceitamos todas as formas de pagamento: dinheiro, cartão, PIX e parcelamento.',
          },
        ],
      },
    },
    'location-1': {
      id: 'location-1',
      type: 'location',
      enabled: true,
      config: {
        enabled: true,
        title: 'Onde estamos',
        address: 'Av. Paulista, 1000 - São Paulo, SP',
        businessHours: [
          { id: '1', day: 'Segunda a Sexta', hours: '9h às 18h' },
          { id: '2', day: 'Sábado', hours: '9h às 12h' },
        ],
        mapEmbedUrl: '',
      },
    },
    'contact-1': {
      id: 'contact-1',
      type: 'contact',
      enabled: true,
      config: {
        enabled: true,
        title: 'Entre em Contato',
        subtitle: 'Preencha o formulário abaixo e retornaremos em breve',
        fields: ['name', 'email', 'phone', 'message'],
      },
    },
    'button-1': {
      id: 'button-1',
      type: 'button',
      enabled: true,
      config: {
        enabled: true,
        ctaText: 'Agende sua Consulta Gratuita',
        link: 'https://wa.me/5511999999999',
      },
    },
    'footer-1': {
      id: 'footer-1',
      type: 'footer',
      enabled: true,
      config: {
        enabled: true,
        copyrightText: '© 2025 Advocacia Silva. Todos os direitos reservados.\nOAB/SP 123.456',
      },
    },
  },
  moduleOrder: [
    'header-1',
    'hero-1',
    'about-1',
    'credentials-1',
    'services-1',
    'practice-1',
    'benefits-1',
    'cases-1',
    'testimonials-1',
    'gallery-1',
    'before-after-1',
    'pricing-1',
    'faq-1',
    'location-1',
    'contact-1',
    'button-1',
    'footer-1',
  ],
};

const PreviewTeste = () => {
  const selectedFonts = getFontCombination(fullTestConfig.brand.fontCombination);

  const renderModule = (instanceId: string) => {
    const instance = fullTestConfig.moduleInstances[instanceId];
    if (!instance || !instance.enabled) return null;

    const key = instanceId;

    switch (instance.type) {
      case 'header':
        return <PreviewHeader key={key} instanceId={instanceId} />;
      case 'hero':
        return <PreviewHero key={key} instanceId={instanceId} />;
      case 'about':
        return <PreviewAbout key={key} instanceId={instanceId} />;
      case 'practice':
        return <PreviewPracticeAreas key={key} instanceId={instanceId} />;
      case 'cases':
        return <PreviewSuccessCases key={key} instanceId={instanceId} />;
      case 'contact':
        return <PreviewContactForm key={key} instanceId={instanceId} />;
      case 'button':
        return <PreviewButton key={key} instanceId={instanceId} />;
      case 'testimonials':
        if (instance.type === 'testimonials') {
          return <PreviewTestimonials key={key} config={instance.config as any} />;
        }
        return null;
      case 'gallery':
        return <PreviewGallery key={key} instanceId={instanceId} />;
      case 'faq':
        return <PreviewFAQ key={key} instanceId={instanceId} />;
      case 'pricing':
        return <PreviewPricingPlans key={key} instanceId={instanceId} />;
      case 'location':
        return <PreviewLocation key={key} instanceId={instanceId} />;
      case 'before-after':
        if (instance.type === 'before-after') {
          return <PreviewBeforeAfter key={key} config={instance.config as any} />;
        }
        return null;
      case 'benefits':
        if (instance.type === 'benefits') {
          return <PreviewBenefits key={key} config={instance.config as any} />;
        }
        return null;
      case 'credentials':
        if (instance.type === 'credentials') {
          return <PreviewCredentials key={key} config={instance.config as any} />;
        }
        return null;
      case 'services':
        if (instance.type === 'services') {
          return <PreviewServices key={key} config={instance.config as any} />;
        }
        return null;
      case 'footer':
        return <PreviewFooter key={key} instanceId={instanceId} />;
      default:
        return null;
    }
  };

  return (
    <SiteEditorProvider>
      <div 
        className="w-full h-full overflow-y-auto overflow-x-hidden relative"
        style={{ 
          '--brand-primary': fullTestConfig.brand.primary,
          '--brand-secondary': fullTestConfig.brand.secondary,
          '--brand-accent': fullTestConfig.brand.accent,
          '--brand-text': fullTestConfig.brand.text,
          '--brand-background': fullTestConfig.brand.background,
          '--brand-title-color': fullTestConfig.brand.titleColor,
          '--brand-text-color': fullTestConfig.brand.textColor,
          '--brand-title-font': selectedFonts.titleFamily,
          '--brand-text-font': selectedFonts.textFamily,
          backgroundColor: fullTestConfig.brand.background,
        } as React.CSSProperties}
      >
        <div className="relative min-h-full">
          {fullTestConfig.moduleOrder.map(renderModule)}
          <WhatsAppButton />
        </div>
      </div>
    </SiteEditorProvider>
  );
};

export default PreviewTeste;
