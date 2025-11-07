import { 
  Circle, Check, CheckCircle, CheckSquare, Dot, Star, Heart, Award, Trophy, Shield, 
  Target, Zap, Lightbulb, Flame, Sparkles, Crown, Diamond, Gift, Home, Building, 
  MapPin, Phone, Mail, User, Users, Briefcase, Calendar, Clock, AlertCircle, Info, 
  HelpCircle, TrendingUp, BarChart, PieChart, Activity, type LucideIcon 
} from 'lucide-react';

export type IconType = 'lucide' | 'custom';

export interface IconOption {
  value: string;
  label: string;
  type: IconType;
  Icon?: LucideIcon;
  path?: string;
  tags: string[];
}

export interface IconCategory {
  id: string;
  label: string;
  description?: string;
}

// Categorias de ícones
export const iconCategories: IconCategory[] = [
  { id: 'all', label: 'Todos', description: 'Todos os ícones disponíveis' },
  { id: 'general', label: 'Geral', description: 'Ícones de interface gerais' },
  { id: 'juridico', label: 'Jurídico', description: 'Ícones para área jurídica' },
  { id: 'medicina', label: 'Medicina', description: 'Ícones para área médica' },
  { id: 'marketing', label: 'Marketing', description: 'Ícones de marketing e vendas' },
  { id: 'social', label: 'Redes Sociais', description: 'Ícones de mídias sociais' },
  { id: 'business', label: 'Negócios', description: 'Ícones corporativos' },
];

// Biblioteca completa de ícones
export const iconLibrary: IconOption[] = [
  // Ícones Gerais (Lucide)
  { value: 'circle', label: 'Círculo', type: 'lucide', Icon: Circle, tags: ['general'] },
  { value: 'check', label: 'Check', type: 'lucide', Icon: Check, tags: ['general'] },
  { value: 'check-circle', label: 'Check Círculo', type: 'lucide', Icon: CheckCircle, tags: ['general'] },
  { value: 'check-square', label: 'Check Quadrado', type: 'lucide', Icon: CheckSquare, tags: ['general'] },
  { value: 'dot', label: 'Ponto', type: 'lucide', Icon: Dot, tags: ['general'] },
  { value: 'star', label: 'Estrela', type: 'lucide', Icon: Star, tags: ['general'] },
  { value: 'heart', label: 'Coração', type: 'lucide', Icon: Heart, tags: ['general'] },
  { value: 'award', label: 'Prêmio', type: 'lucide', Icon: Award, tags: ['general'] },
  { value: 'trophy', label: 'Troféu', type: 'lucide', Icon: Trophy, tags: ['general'] },
  { value: 'shield', label: 'Escudo', type: 'lucide', Icon: Shield, tags: ['general'] },
  { value: 'target', label: 'Alvo', type: 'lucide', Icon: Target, tags: ['general'] },
  { value: 'zap', label: 'Raio', type: 'lucide', Icon: Zap, tags: ['general'] },
  { value: 'lightbulb', label: 'Lâmpada', type: 'lucide', Icon: Lightbulb, tags: ['general'] },
  { value: 'flame', label: 'Chama', type: 'lucide', Icon: Flame, tags: ['general'] },
  { value: 'sparkles', label: 'Brilho', type: 'lucide', Icon: Sparkles, tags: ['general'] },
  { value: 'crown', label: 'Coroa', type: 'lucide', Icon: Crown, tags: ['general'] },
  { value: 'diamond', label: 'Diamante', type: 'lucide', Icon: Diamond, tags: ['general'] },
  { value: 'gift', label: 'Presente', type: 'lucide', Icon: Gift, tags: ['general'] },
  { value: 'home', label: 'Casa', type: 'lucide', Icon: Home, tags: ['general'] },
  { value: 'building', label: 'Edifício', type: 'lucide', Icon: Building, tags: ['general', 'business'] },
  { value: 'map-pin', label: 'Localização', type: 'lucide', Icon: MapPin, tags: ['general'] },
  { value: 'phone', label: 'Telefone', type: 'lucide', Icon: Phone, tags: ['general'] },
  { value: 'mail', label: 'Email', type: 'lucide', Icon: Mail, tags: ['general'] },
  { value: 'user', label: 'Usuário', type: 'lucide', Icon: User, tags: ['general'] },
  { value: 'users', label: 'Usuários', type: 'lucide', Icon: Users, tags: ['general', 'business'] },
  { value: 'briefcase-lucide', label: 'Maleta', type: 'lucide', Icon: Briefcase, tags: ['general', 'business'] },
  { value: 'calendar', label: 'Calendário', type: 'lucide', Icon: Calendar, tags: ['general'] },
  { value: 'clock', label: 'Relógio', type: 'lucide', Icon: Clock, tags: ['general'] },
  { value: 'alert-circle', label: 'Alerta', type: 'lucide', Icon: AlertCircle, tags: ['general'] },
  { value: 'info', label: 'Informação', type: 'lucide', Icon: Info, tags: ['general'] },
  { value: 'help-circle', label: 'Ajuda', type: 'lucide', Icon: HelpCircle, tags: ['general'] },
  { value: 'trending-up', label: 'Crescimento', type: 'lucide', Icon: TrendingUp, tags: ['general', 'business', 'marketing'] },
  { value: 'bar-chart', label: 'Gráfico Barras', type: 'lucide', Icon: BarChart, tags: ['general', 'business', 'marketing'] },
  { value: 'pie-chart', label: 'Gráfico Pizza', type: 'lucide', Icon: PieChart, tags: ['general', 'business', 'marketing'] },
  { value: 'activity', label: 'Atividade', type: 'lucide', Icon: Activity, tags: ['general'] },
  
  // Ícones Jurídicos Customizados
  { value: 'balance', label: 'Balança', type: 'custom', path: '/icons/juridico/balance.svg', tags: ['juridico'] },
  { value: 'baton', label: 'Bastão', type: 'custom', path: '/icons/juridico/baton.svg', tags: ['juridico'] },
  { value: 'book', label: 'Livro Jurídico', type: 'custom', path: '/icons/juridico/book.svg', tags: ['juridico'] },
  { value: 'briefcase', label: 'Pasta Jurídica', type: 'custom', path: '/icons/juridico/briefcase.svg', tags: ['juridico', 'business'] },
  { value: 'case', label: 'Processo', type: 'custom', path: '/icons/juridico/case.svg', tags: ['juridico'] },
  { value: 'cctv', label: 'CCTV/Vigilância', type: 'custom', path: '/icons/juridico/cctv.svg', tags: ['juridico'] },
  { value: 'contract', label: 'Contrato', type: 'custom', path: '/icons/juridico/contract.svg', tags: ['juridico', 'business'] },
  { value: 'courthouse', label: 'Tribunal', type: 'custom', path: '/icons/juridico/courthouse.svg', tags: ['juridico'] },
  { value: 'evidence', label: 'Evidência', type: 'custom', path: '/icons/juridico/evidence.svg', tags: ['juridico'] },
  { value: 'feather_pen', label: 'Pena de Escrever', type: 'custom', path: '/icons/juridico/feather_pen.svg', tags: ['juridico'] },
  { value: 'pen', label: 'Caneta', type: 'custom', path: '/icons/juridico/pen.svg', tags: ['juridico'] },
  { value: 'folder', label: 'Pasta/Arquivo', type: 'custom', path: '/icons/juridico/folder.svg', tags: ['juridico'] },
  { value: 'gavel', label: 'Martelo do Juiz', type: 'custom', path: '/icons/juridico/gavel.svg', tags: ['juridico'] },
  { value: 'handcuffs', label: 'Algemas', type: 'custom', path: '/icons/juridico/handcuffs.svg', tags: ['juridico'] },
  { value: 'handshake', label: 'Aperto de Mão', type: 'custom', path: '/icons/juridico/handshake.svg', tags: ['juridico', 'business'] },
  { value: 'judge', label: 'Juiz', type: 'custom', path: '/icons/juridico/judge.svg', tags: ['juridico'] },
  { value: 'jury', label: 'Júri', type: 'custom', path: '/icons/juridico/jury.svg', tags: ['juridico'] },
  { value: 'law', label: 'Lei', type: 'custom', path: '/icons/juridico/law.svg', tags: ['juridico'] },
  { value: 'lawyer', label: 'Advogado', type: 'custom', path: '/icons/juridico/lawyer.svg', tags: ['juridico'] },
  { value: 'parchment', label: 'Pergaminho', type: 'custom', path: '/icons/juridico/parchment.svg', tags: ['juridico'] },
  { value: 'research', label: 'Pesquisa', type: 'custom', path: '/icons/juridico/research.svg', tags: ['juridico'] },
  { value: 'stamp', label: 'Carimbo', type: 'custom', path: '/icons/juridico/stamp.svg', tags: ['juridico'] },
  { value: 'typewriter', label: 'Máquina de Escrever', type: 'custom', path: '/icons/juridico/typewriter.svg', tags: ['juridico'] },
  { value: 'witness', label: 'Testemunha', type: 'custom', path: '/icons/juridico/witness.svg', tags: ['juridico'] },
  { value: 'pillars', label: 'Pilares/Colunas', type: 'custom', path: '/icons/juridico/pillars.svg', tags: ['juridico'] },
];

// Funções helper
export const getIconsByCategory = (categoryId: string): IconOption[] => {
  if (categoryId === 'all') return iconLibrary;
  return iconLibrary.filter(icon => icon.tags.includes(categoryId));
};

export const searchIcons = (searchTerm: string, categoryId?: string): IconOption[] => {
  let icons = categoryId ? getIconsByCategory(categoryId) : iconLibrary;
  
  if (!searchTerm) return icons;
  
  const term = searchTerm.toLowerCase();
  return icons.filter(icon => 
    icon.label.toLowerCase().includes(term) ||
    icon.value.toLowerCase().includes(term)
  );
};

export const getIconByValue = (value: string): IconOption | undefined => {
  return iconLibrary.find(icon => icon.value === value);
};
