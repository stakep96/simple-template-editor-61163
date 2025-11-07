import React, { useState } from 'react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { SuccessCasesConfig, SuccessCase } from '@/contexts/SiteEditorContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ImageUpload } from '@/components/ui/image-upload';
import { IconSelector } from '@/components/editor/IconSelector';
import { Trash2, Plus, GripVertical } from 'lucide-react';

interface SuccessCasesEditorProps {
  instanceId: string;
}

const SuccessCasesEditor: React.FC<SuccessCasesEditorProps> = ({
  instanceId
}) => {
  const {
    config,
    updateModuleInstance
  } = useSiteEditor();
  const instance = config.moduleInstances[instanceId];
  const casesConfig = instance?.config as SuccessCasesConfig;
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
      const isOpen = openPopoverId === caseItem.id;
      return <div key={caseItem.id} className="border rounded-lg p-4 space-y-3 bg-background">
...
            <div className="space-y-3">
              <div className="grid grid-cols-[auto_1fr] gap-3">
                <div className="flex flex-col gap-2">
                  <Label className="text-sm">Ícone</Label>
                  <IconSelector
                    value={caseItem.icon}
                    onChange={(value) => updateCase(caseItem.id, 'icon', value)}
                    open={isOpen}
                    onOpenChange={(open) => setOpenPopoverId(open ? caseItem.id : null)}
                  />
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