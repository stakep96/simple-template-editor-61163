import React from 'react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { SuccessCasesConfig } from '@/contexts/SiteEditorContext';

interface SuccessCasesEditorProps {
  instanceId: string;
}

const SuccessCasesEditor: React.FC<SuccessCasesEditorProps> = ({ instanceId }) => {
  const { config } = useSiteEditor();
  const instance = config.moduleInstances[instanceId];
  const casesConfig = instance?.config as SuccessCasesConfig;

  if (!casesConfig) return null;

  return (
    <div className="space-y-3">
      <div className="text-sm text-muted-foreground">
        {casesConfig.cases?.length || 0} cases configurados
      </div>
    </div>
  );
};

export default SuccessCasesEditor;
