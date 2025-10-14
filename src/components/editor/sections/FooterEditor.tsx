import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { FooterConfig } from '@/contexts/SiteEditorContext';

interface FooterEditorProps {
  instanceId: string;
}

const FooterEditor: React.FC<FooterEditorProps> = ({ instanceId }) => {
  const { config, updateModuleInstance } = useSiteEditor();
  const instance = config.moduleInstances[instanceId];
  const footerConfig = instance?.config as FooterConfig;

  if (!footerConfig) return null;

  return (
    <div className="space-y-3">
      <div>
        <Label htmlFor={`footer-copyright-${instanceId}`} className="text-sm">Texto do Copyright</Label>
        <Textarea
          id={`footer-copyright-${instanceId}`}
          value={footerConfig.copyrightText}
          onChange={(e) => updateModuleInstance(instanceId, { copyrightText: e.target.value })}
          onMouseDown={(e) => e.stopPropagation()}
          onDragStart={(e) => e.preventDefault()}
          draggable={false}
          placeholder="© SEU NOME - 000000 - OAB/XX&#10;Todos os direitos reservados - 2025"
          className="mt-1 min-h-[80px]"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Este texto aparecerá na cor primária do seu brand
        </p>
      </div>
    </div>
  );
};

export default FooterEditor;
