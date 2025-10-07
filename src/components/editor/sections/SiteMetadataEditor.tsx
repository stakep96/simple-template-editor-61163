import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useSiteEditor } from '@/contexts/SiteEditorContext';

const SiteMetadataEditor = () => {
  const { config, updateMetadata } = useSiteEditor();

  return (
    <div className="space-y-4 pt-4">
      <div className="space-y-2">
        <Label htmlFor="siteName" className="text-sm font-medium">
          Nome do Site
        </Label>
        <Input
          id="siteName"
          value={config.metadata.siteName}
          onChange={(e) => updateMetadata({ siteName: e.target.value })}
          placeholder="Novo Site"
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="domain" className="text-sm font-medium">
          URL do seu site
        </Label>
        <div className="flex items-center gap-2">
          <div className="px-3 py-2 bg-muted rounded-md text-sm text-muted-foreground border border-input">
            bout-web/
          </div>
          <Input
            id="domain"
            value={config.metadata.domain}
            onChange={(e) => updateMetadata({ domain: e.target.value })}
            placeholder="meusite"
            className="flex-1"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title" className="text-sm font-medium">
          Título/Nome
        </Label>
        <Input
          id="title"
          value={config.metadata.title}
          onChange={(e) => updateMetadata({ title: e.target.value })}
          placeholder="Seu nome ou nome da empresa"
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium">
          Bio/Descrição
        </Label>
        <Textarea
          id="description"
          value={config.metadata.description}
          onChange={(e) => updateMetadata({ description: e.target.value })}
          placeholder="Fale um pouco sobre você ou sua empresa"
          className="w-full min-h-[100px] resize-none"
        />
      </div>
    </div>
  );
};

export default SiteMetadataEditor;
