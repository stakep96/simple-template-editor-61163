import React, { useState } from 'react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { SuccessCasesConfig, SuccessCase } from '@/contexts/SiteEditorContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ImageUpload } from '@/components/ui/image-upload';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Trash2, Plus, GripVertical, Trophy, Handshake, Award, Target, TrendingUp, CheckCircle, Star, Heart, ThumbsUp } from 'lucide-react';
interface SuccessCasesEditorProps {
  instanceId: string;
}
const iconOptions = [{
  value: 'trophy',
  label: 'Troféu',
  Icon: Trophy
}, {
  value: 'handshake',
  label: 'Aperto de Mão',
  Icon: Handshake
}, {
  value: 'award',
  label: 'Prêmio',
  Icon: Award
}, {
  value: 'target',
  label: 'Alvo',
  Icon: Target
}, {
  value: 'trending-up',
  label: 'Crescimento',
  Icon: TrendingUp
}, {
  value: 'check-circle',
  label: 'Check',
  Icon: CheckCircle
}, {
  value: 'star',
  label: 'Estrela',
  Icon: Star
}, {
  value: 'heart',
  label: 'Coração',
  Icon: Heart
}, {
  value: 'thumbs-up',
  label: 'Polegar',
  Icon: ThumbsUp
}];
const SuccessCasesEditor: React.FC<SuccessCasesEditorProps> = ({
  instanceId
}) => {
  const {
    config,
    updateModuleInstance
  } = useSiteEditor();
  const instance = config.moduleInstances[instanceId];
  const casesConfig = instance?.config as SuccessCasesConfig;
  const [searchTerm, setSearchTerm] = useState('');
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);
  if (!casesConfig) return null;
  const updateCase = (caseId: string, field: keyof SuccessCase, value: string) => {
    const updatedCases = casesConfig.cases.map(caseItem => caseItem.id === caseId ? {
      ...caseItem,
      [field]: value
    } : caseItem);
    updateModuleInstance(instanceId, {
      cases: updatedCases
    });
  };
  const removeCase = (caseId: string) => {
    const updatedCases = casesConfig.cases.filter(caseItem => caseItem.id !== caseId);
    updateModuleInstance(instanceId, {
      cases: updatedCases
    });
  };
  const addCase = () => {
    const newCase: SuccessCase = {
      id: Date.now().toString(),
      title: 'Novo Case - 2025',
      description: 'Descrição do caso',
      result: 'Resultado obtido',
      icon: 'trophy'
    };
    updateModuleInstance(instanceId, {
      cases: [...casesConfig.cases, newCase]
    });
  };
  const filteredIcons = iconOptions.filter(option => option.label.toLowerCase().includes(searchTerm.toLowerCase()));
  return <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="background-image">Imagem de Fundo</Label>
        <ImageUpload
          value={casesConfig.backgroundImage}
          onChange={(value) => updateModuleInstance(instanceId, { backgroundImage: value })}
        />
      </div>

      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">Cases de Sucesso</Label>
        
      </div>

      {casesConfig.cases.map((caseItem, index) => {
      const selectedIcon = iconOptions.find(opt => opt.value === caseItem.icon);
      const isOpen = openPopoverId === caseItem.id;
      return <div key={caseItem.id} className="border rounded-lg p-4 space-y-3 bg-background">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <GripVertical className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">
                  Case {index + 1}
                </span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => removeCase(caseItem.id)} className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-[auto_1fr] gap-3">
                <div className="flex flex-col gap-2">
                  <Label className="text-sm">Ícone</Label>
                  <Popover open={isOpen} onOpenChange={open => {
                setOpenPopoverId(open ? caseItem.id : null);
                if (!open) setSearchTerm('');
              }}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="h-10 w-10 p-0">
                        {selectedIcon && <selectedIcon.Icon className="w-5 h-5" />}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-4" align="start">
                      <div className="space-y-3">
                        <Input placeholder="Buscar ícones..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="h-10" />
                        <div className="grid grid-cols-6 gap-2 max-h-[240px] overflow-y-auto">
                          {filteredIcons.map(option => <Button key={option.value} variant="outline" className="h-12 w-12 p-0 hover:bg-accent" onClick={() => {
                        updateCase(caseItem.id, 'icon', option.value);
                        setOpenPopoverId(null);
                        setSearchTerm('');
                      }}>
                              <option.Icon className="w-5 h-5" />
                            </Button>)}
                        </div>
                        <p className="text-xs text-muted-foreground text-center">
                          Clique em um ícone para selecioná-lo
                        </p>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor={`title-${caseItem.id}`} className="text-sm">
                    Título
                  </Label>
                  <Input id={`title-${caseItem.id}`} value={caseItem.title} onChange={e => updateCase(caseItem.id, 'title', e.target.value)} placeholder="Ex: Defesa Criminal - 2025" />
                </div>
              </div>

              <div>
                <Label htmlFor={`description-${caseItem.id}`} className="text-sm">
                  Descrição
                </Label>
                <Textarea id={`description-${caseItem.id}`} value={caseItem.description} onChange={e => updateCase(caseItem.id, 'description', e.target.value)} placeholder="Ex: Cliente acusado injustamente" className="min-h-[60px]" />
              </div>

              <div>
                <Label htmlFor={`result-${caseItem.id}`} className="text-sm">
                  Resultado
                </Label>
                <Input id={`result-${caseItem.id}`} value={caseItem.result} onChange={e => updateCase(caseItem.id, 'result', e.target.value)} placeholder="Ex: Absolvição por falta de provas" />
              </div>
            </div>
          </div>;
    })}

      <Button variant="outline" onClick={addCase} className="w-full border-dashed hover:border-solid">
        <Plus className="w-4 w-4 mr-2" />
        Adicionar Novo Case de Sucesso
      </Button>
    </div>;
};
export default SuccessCasesEditor;