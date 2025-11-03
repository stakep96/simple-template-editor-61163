import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, GripVertical, Circle, Check, CheckCircle, CheckSquare, Dot, Star, Heart, Award, Trophy, Shield, Target, Zap, Lightbulb, Flame, Sparkles, Crown, Diamond, Gift, Home, Building, MapPin, Phone, Mail, User, Users, Briefcase, Calendar, Clock, AlertCircle, Info, HelpCircle, TrendingUp, BarChart, PieChart, Activity } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { ContentStyleConfig, ContentStyleItem } from '@/contexts/SiteEditorContext';

interface ContentStyleEditorProps {
  instanceId: string;
}

const iconOptions = [
  { value: 'circle', label: 'Círculo', Icon: Circle },
  { value: 'check', label: 'Check', Icon: Check },
  { value: 'check-circle', label: 'Check Círculo', Icon: CheckCircle },
  { value: 'check-square', label: 'Check Quadrado', Icon: CheckSquare },
  { value: 'dot', label: 'Ponto', Icon: Dot },
  { value: 'star', label: 'Estrela', Icon: Star },
  { value: 'heart', label: 'Coração', Icon: Heart },
  { value: 'award', label: 'Medalha', Icon: Award },
  { value: 'trophy', label: 'Troféu', Icon: Trophy },
  { value: 'shield', label: 'Escudo', Icon: Shield },
  { value: 'target', label: 'Alvo', Icon: Target },
  { value: 'zap', label: 'Raio', Icon: Zap },
  { value: 'lightbulb', label: 'Lâmpada', Icon: Lightbulb },
  { value: 'flame', label: 'Chama', Icon: Flame },
  { value: 'sparkles', label: 'Brilhos', Icon: Sparkles },
  { value: 'crown', label: 'Coroa', Icon: Crown },
  { value: 'diamond', label: 'Diamante', Icon: Diamond },
  { value: 'gift', label: 'Presente', Icon: Gift },
  { value: 'home', label: 'Casa', Icon: Home },
  { value: 'building', label: 'Edifício', Icon: Building },
  { value: 'map-pin', label: 'Localização', Icon: MapPin },
  { value: 'phone', label: 'Telefone', Icon: Phone },
  { value: 'mail', label: 'Email', Icon: Mail },
  { value: 'user', label: 'Usuário', Icon: User },
  { value: 'users', label: 'Usuários', Icon: Users },
  { value: 'briefcase', label: 'Maleta', Icon: Briefcase },
  { value: 'calendar', label: 'Calendário', Icon: Calendar },
  { value: 'clock', label: 'Relógio', Icon: Clock },
  { value: 'alert-circle', label: 'Alerta', Icon: AlertCircle },
  { value: 'info', label: 'Info', Icon: Info },
  { value: 'help-circle', label: 'Ajuda', Icon: HelpCircle },
  { value: 'trending-up', label: 'Crescimento', Icon: TrendingUp },
  { value: 'bar-chart', label: 'Gráfico Barras', Icon: BarChart },
  { value: 'pie-chart', label: 'Gráfico Pizza', Icon: PieChart },
  { value: 'activity', label: 'Atividade', Icon: Activity },
];

const ContentStyleEditor: React.FC<ContentStyleEditorProps> = ({ instanceId }) => {
  const { config, updateModuleInstance } = useSiteEditor();
  const moduleConfig = config.moduleInstances[instanceId]?.config as ContentStyleConfig;
  const [searchTerm, setSearchTerm] = useState('');
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);

  const updateTitle = (title: string) => {
    updateModuleInstance(instanceId, { title });
  };

  const updateItem = (itemId: string, field: keyof ContentStyleItem, value: string) => {
    const updatedItems = moduleConfig.items.map((item) =>
      item.id === itemId ? { ...item, [field]: value } : item
    );
    updateModuleInstance(instanceId, { items: updatedItems });
  };

  const removeItem = (itemId: string) => {
    const updatedItems = moduleConfig.items.filter((item) => item.id !== itemId);
    updateModuleInstance(instanceId, { items: updatedItems });
  };

  const addItem = () => {
    const newId = Date.now().toString();
    const newItem: ContentStyleItem = {
      id: newId,
      text: 'Novo item',
      icon: 'circle',
    };
    updateModuleInstance(instanceId, { items: [...moduleConfig.items, newItem] });
  };

  const filteredIcons = iconOptions.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div>
        <Label>Título do Componente</Label>
        <Input
          value={moduleConfig.title}
          onChange={(e) => updateTitle(e.target.value)}
          placeholder="Ex: Estilo de conteúdo"
        />
      </div>

      <div className="space-y-3">
        {moduleConfig.items.map((item, index) => {
          const selectedIcon = iconOptions.find(opt => opt.value === item.icon);
          const isOpen = openPopoverId === item.id;

          return (
            <div
              key={item.id}
              className="border rounded-lg p-4 space-y-3 bg-background"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <GripVertical className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">
                    Área {index + 1}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(item.id)}
                  className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-[auto_1fr] gap-3">
                <div className="flex flex-col gap-2">
                  <Label className="text-sm">Ícone</Label>
                  <Popover open={isOpen} onOpenChange={(open) => {
                    setOpenPopoverId(open ? item.id : null);
                    if (!open) setSearchTerm('');
                  }}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="h-10 w-10 p-0"
                      >
                        {selectedIcon && <selectedIcon.Icon className="w-5 h-5" />}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-4" align="start">
                      <div className="space-y-3">
                        <Input
                          placeholder="Buscar ícones..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="h-10"
                        />
                        <div className="grid grid-cols-6 gap-2 max-h-[240px] overflow-y-auto">
                          {filteredIcons.map((option) => (
                            <Button
                              key={option.value}
                              variant="outline"
                              className="h-12 w-12 p-0 hover:bg-accent"
                              onClick={() => {
                                updateItem(item.id, 'icon', option.value);
                                setOpenPopoverId(null);
                                setSearchTerm('');
                              }}
                            >
                              <option.Icon className="w-5 h-5" />
                            </Button>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground text-center">
                          Clique em um ícone para selecioná-lo
                        </p>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor={`text-${item.id}`} className="text-sm">
                    Título
                  </Label>
                  <Input
                    id={`text-${item.id}`}
                    value={item.text}
                    onChange={(e) => updateItem(item.id, 'text', e.target.value)}
                    placeholder="Ex: IRL"
                  />
                </div>
              </div>
            </div>
          );
        })}

        <Button
          variant="outline"
          onClick={addItem}
          className="w-full border-dashed hover:border-solid"
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Novo Item
        </Button>
      </div>
    </div>
  );
};

export default ContentStyleEditor;
