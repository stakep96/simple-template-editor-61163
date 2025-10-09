import React, { useState } from 'react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { PracticeAreasConfig, PracticeArea } from '@/contexts/SiteEditorContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Trash2, Plus, GripVertical, Home, Smartphone, Lightbulb, Users, Shield, Car, Instagram, Facebook, Linkedin, Youtube, Github, Music, MessageCircle, Twitch, Twitter, Mail, Phone, MapPin, Clock, Briefcase, Scale, Building, FileText, Gavel, Target } from 'lucide-react';

interface PracticeAreasEditorProps {
  instanceId: string;
}

const iconOptions = [
  { value: 'shield', label: 'Escudo', Icon: Shield },
  { value: 'scale', label: 'Balança', Icon: Scale },
  { value: 'gavel', label: 'Martelo', Icon: Gavel },
  { value: 'briefcase', label: 'Maleta', Icon: Briefcase },
  { value: 'building', label: 'Edifício', Icon: Building },
  { value: 'users', label: 'Pessoas', Icon: Users },
  { value: 'home', label: 'Casa', Icon: Home },
  { value: 'car', label: 'Carro', Icon: Car },
  { value: 'file-text', label: 'Documento', Icon: FileText },
  { value: 'target', label: 'Alvo', Icon: Target },
  { value: 'smartphone', label: 'Smartphone', Icon: Smartphone },
  { value: 'lightbulb', label: 'Lâmpada', Icon: Lightbulb },
  { value: 'mail', label: 'Email', Icon: Mail },
  { value: 'phone', label: 'Telefone', Icon: Phone },
  { value: 'map-pin', label: 'Localização', Icon: MapPin },
  { value: 'clock', label: 'Relógio', Icon: Clock },
  { value: 'instagram', label: 'Instagram', Icon: Instagram },
  { value: 'facebook', label: 'Facebook', Icon: Facebook },
  { value: 'linkedin', label: 'LinkedIn', Icon: Linkedin },
  { value: 'youtube', label: 'YouTube', Icon: Youtube },
  { value: 'github', label: 'GitHub', Icon: Github },
  { value: 'twitter', label: 'Twitter', Icon: Twitter },
  { value: 'music', label: 'Música', Icon: Music },
  { value: 'message-circle', label: 'Mensagem', Icon: MessageCircle },
  { value: 'twitch', label: 'Twitch', Icon: Twitch },
];

const PracticeAreasEditor: React.FC<PracticeAreasEditorProps> = ({ instanceId }) => {
  const { config, updateModuleInstance } = useSiteEditor();
  const instance = config.moduleInstances[instanceId];
  const practiceConfig = instance?.config as PracticeAreasConfig;
  const [searchTerm, setSearchTerm] = useState('');
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);

  if (!practiceConfig) return null;

  const updateArea = (areaId: string, field: keyof PracticeArea, value: string) => {
    const updatedAreas = practiceConfig.areas.map((area) =>
      area.id === areaId ? { ...area, [field]: value } : area
    );
    updateModuleInstance(instanceId, { areas: updatedAreas });
  };

  const removeArea = (areaId: string) => {
    const updatedAreas = practiceConfig.areas.filter((area) => area.id !== areaId);
    updateModuleInstance(instanceId, { areas: updatedAreas });
  };

  const addArea = () => {
    const newArea: PracticeArea = {
      id: Date.now().toString(),
      title: 'Nova Área',
      icon: 'shield',
    };
    updateModuleInstance(instanceId, { areas: [...practiceConfig.areas, newArea] });
  };

  const filteredIcons = iconOptions.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {practiceConfig.areas.map((area, index) => {
        const selectedIcon = iconOptions.find((opt) => opt.value === area.icon);
        const isOpen = openPopoverId === area.id;
        
        return (
          <div
            key={area.id}
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
                onClick={() => removeArea(area.id)}
                className="h-8 w-8 text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-[auto_1fr] gap-3">
              <div className="space-y-2">
                <Label className="text-sm">Ícone</Label>
                <Popover open={isOpen} onOpenChange={(open) => {
                  setOpenPopoverId(open ? area.id : null);
                  if (!open) setSearchTerm('');
                }}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-14 w-14 p-0"
                    >
                      {selectedIcon && <selectedIcon.Icon className="w-6 h-6" />}
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
                              updateArea(area.id, 'icon', option.value);
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

              <div className="space-y-2">
                <Label htmlFor={`title-${area.id}`} className="text-sm">
                  Título
                </Label>
                <Input
                  id={`title-${area.id}`}
                  value={area.title}
                  onChange={(e) => updateArea(area.id, 'title', e.target.value)}
                  placeholder="Nome da área"
                  className="h-14"
                />
              </div>
            </div>
          </div>
        );
      })}

      <Button
        variant="outline"
        onClick={addArea}
        className="w-full border-dashed"
      >
        <Plus className="w-4 h-4 mr-2" />
        Adicionar Nova Área (1/{practiceConfig.areas.length + 1})
      </Button>
    </div>
  );
};

export default PracticeAreasEditor;
