import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ImageUploadSquare } from '@/components/ui/image-upload-square';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import CustomDomainEditor from './CustomDomainEditor';

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

      <div className="space-y-2">
        <Label className="text-sm font-medium">Favicon</Label>
        <p className="text-xs text-muted-foreground">
          Imagem quadrada até 420x420px (PNG ou JPEG)
        </p>
        <ImageUploadSquare
          value={config.metadata.favicon}
          onChange={(value) => updateMetadata({ favicon: value })}
          hint="PNG ou JPEG"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="domain" className="text-sm font-medium">
          Escolha seu domínio 4bout.work
        </Label>
        <div className="relative border border-input rounded-md bg-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
          <div className="flex items-center px-3 py-2.5">
            <Input
              id="domain"
              value={config.metadata.domain}
              onChange={(e) => updateMetadata({ domain: e.target.value })}
              placeholder="meusite"
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0 bg-transparent w-auto min-w-[100px]"
              style={{ width: `${Math.max(100, (config.metadata.domain.length || 7) * 8.5)}px` }}
            />
            <span className="text-primary font-bold whitespace-nowrap select-none ml-0">
              .4bout.work
            </span>
          </div>
        </div>
      </div>

      <CustomDomainEditor />
    </div>
  );
};

export default SiteMetadataEditor;