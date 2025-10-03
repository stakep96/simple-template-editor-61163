import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface BrandColors {
  primary: string;
  secondary: string;
  accent: string;
  text: string;
}

export interface HeaderConfig {
  enabled: boolean;
  logo: string;
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
  year: string;
  image: string;
}

export interface SuccessCasesConfig {
  enabled: boolean;
  cases: SuccessCase[];
}

export interface SiteConfig {
  brand: BrandColors;
  header: HeaderConfig;
  hero: HeroConfig;
  about: AboutConfig;
  practiceAreas: PracticeAreasConfig;
  successCases: SuccessCasesConfig;
  moduleOrder: string[];
}

interface SiteEditorContextType {
  config: SiteConfig;
  updateBrand: (brand: Partial<BrandColors>) => void;
  updateHeader: (header: Partial<HeaderConfig>) => void;
  updateHero: (hero: Partial<HeroConfig>) => void;
  updateAbout: (about: Partial<AboutConfig>) => void;
  updatePracticeAreas: (areas: Partial<PracticeAreasConfig>) => void;
  updateSuccessCases: (cases: Partial<SuccessCasesConfig>) => void;
  reorderModules: (newOrder: string[]) => void;
}

const defaultConfig: SiteConfig = {
  brand: {
    primary: '#8B1538',
    secondary: '#F5E6D3',
    accent: '#D4AF37',
    text: '#2D2D2D',
  },
  header: {
    enabled: true,
    logo: '',
  },
  hero: {
    enabled: true,
    backgroundImage: '',
    gradientOpacity: 0.7,
    title: 'Mais que um advogado, um parceiro para sua segurança jurídica',
    description: 'Especialista em Direito Criminal e Empresarial com 15 anos de experiência',
  },
  about: {
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
  },
  practiceAreas: {
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
  successCases: {
    enabled: true,
    cases: [
      {
        id: '1',
        title: 'Defesa Criminal - 2025',
        description: 'Cliente absolvido na segunda instância',
        year: '2025',
        image: '',
      },
    ],
  },
  moduleOrder: ['header', 'hero', 'about', 'practice', 'cases'],
};

const SiteEditorContext = createContext<SiteEditorContextType | undefined>(undefined);

export const SiteEditorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);

  const updateBrand = (brand: Partial<BrandColors>) => {
    setConfig((prev) => ({
      ...prev,
      brand: { ...prev.brand, ...brand },
    }));
  };

  const updateHeader = (header: Partial<HeaderConfig>) => {
    setConfig((prev) => ({
      ...prev,
      header: { ...prev.header, ...header },
    }));
  };

  const updateHero = (hero: Partial<HeroConfig>) => {
    setConfig((prev) => ({
      ...prev,
      hero: { ...prev.hero, ...hero },
    }));
  };

  const updateAbout = (about: Partial<AboutConfig>) => {
    setConfig((prev) => ({
      ...prev,
      about: { ...prev.about, ...about },
    }));
  };

  const updatePracticeAreas = (areas: Partial<PracticeAreasConfig>) => {
    setConfig((prev) => ({
      ...prev,
      practiceAreas: { ...prev.practiceAreas, ...areas },
    }));
  };

  const updateSuccessCases = (cases: Partial<SuccessCasesConfig>) => {
    setConfig((prev) => ({
      ...prev,
      successCases: { ...prev.successCases, ...cases },
    }));
  };

  const reorderModules = (newOrder: string[]) => {
    setConfig((prev) => ({
      ...prev,
      moduleOrder: newOrder,
    }));
  };

  return (
    <SiteEditorContext.Provider
      value={{
        config,
        updateBrand,
        updateHeader,
        updateHero,
        updateAbout,
        updatePracticeAreas,
        updateSuccessCases,
        reorderModules,
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
