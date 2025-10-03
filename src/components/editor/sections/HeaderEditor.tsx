import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useSiteEditor } from '@/contexts/SiteEditorContext';

const HeaderEditor = () => {
  const { config, updateHeader } = useSiteEditor();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Ativar seção</span>
        <Switch
          checked={config.header.enabled}
          onCheckedChange={(enabled) => updateHeader({ enabled })}
        />
      </div>

      {config.header.enabled && (
        <div>
          <Label htmlFor="logo" className="text-sm">Logo (URL ou texto)</Label>
          <Input
            id="logo"
            type="text"
            value={config.header.logo}
            onChange={(e) => updateHeader({ logo: e.target.value })}
            placeholder="Digite o nome ou URL da logo"
            className="mt-1"
          />
        </div>
      )}
    </div>
  );
};

export default HeaderEditor;
