import React from 'react';
import { Switch } from '@/components/ui/switch';
import { useSiteEditor } from '@/contexts/SiteEditorContext';

const SuccessCasesEditor = () => {
  const { config, updateSuccessCases } = useSiteEditor();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Ativar seção</span>
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
    </div>
  );
};

export default SuccessCasesEditor;
