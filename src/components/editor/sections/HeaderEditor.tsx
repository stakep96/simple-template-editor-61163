import React from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { ImageIcon } from 'lucide-react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';

const HeaderEditor = () => {
  const { config, updateHeader } = useSiteEditor();

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <ImageIcon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Header</h3>
            <p className="text-xs text-muted-foreground">Logo e navegação</p>
          </div>
        </div>
        <Switch
          checked={config.header.enabled}
          onCheckedChange={(enabled) => updateHeader({ enabled })}
        />
      </div>

      {config.header.enabled && (
        <div className="space-y-3">
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
        </div>
      )}
    </Card>
  );
};

export default HeaderEditor;
