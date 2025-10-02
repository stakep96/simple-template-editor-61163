import React from 'react';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Trophy } from 'lucide-react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';

const SuccessCasesEditor = () => {
  const { config, updateSuccessCases } = useSiteEditor();

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Trophy className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Cases de Sucesso</h3>
            <p className="text-xs text-muted-foreground">Histórico de vitórias</p>
          </div>
        </div>
        <Switch
          checked={config.successCases.enabled}
          onCheckedChange={(enabled) => updateSuccessCases({ enabled })}
        />
      </div>

      {config.successCases.enabled && (
        <div className="text-sm text-muted-foreground">
          {config.successCases.cases.length} cases configurados
        </div>
      )}
    </Card>
  );
};

export default SuccessCasesEditor;
