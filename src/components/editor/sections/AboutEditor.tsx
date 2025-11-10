import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ImageUpload } from '@/components/ui/image-upload';
import { Plus, Trash2 } from 'lucide-react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import { IconSelector } from '@/components/editor/IconSelector';
import type { AboutConfig, SocialLink, EducationItem } from '@/contexts/SiteEditorContext';

interface AboutEditorProps {
  instanceId: string;
}

const AboutEditor: React.FC<AboutEditorProps> = ({ instanceId }) => {
  const { config, updateModuleInstance } = useSiteEditor();
  const instance = config.moduleInstances[instanceId];
  const aboutConfig = instance?.config as AboutConfig;

  if (!aboutConfig) return null;

  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);

  const addEducation = () => {
    const newEducation: EducationItem[] = [
      ...(aboutConfig.education || []), 
      { id: Date.now().toString(), icon: 'award', text: '' }
    ];
    updateModuleInstance(instanceId, { education: newEducation });
  };

  const updateEducation = (id: string, field: keyof EducationItem, value: string) => {
    const newEducation = (aboutConfig.education || []).map(item =>
      item.id === id ? { ...item, [field]: value } : item
    );
    updateModuleInstance(instanceId, { education: newEducation });
  };

  const removeEducation = (id: string) => {
    const newEducation = (aboutConfig.education || []).filter(item => item.id !== id);
    updateModuleInstance(instanceId, { education: newEducation });
  };

  const addSocialLink = () => {
    const newSocialLinks: SocialLink[] = [
      ...(aboutConfig.socialLinks || []),
      { id: Date.now().toString(), platform: 'instagram', url: '' }
    ];
    updateModuleInstance(instanceId, { socialLinks: newSocialLinks });
  };

  const updateSocialLink = (id: string, field: keyof SocialLink, value: string) => {
    const newSocialLinks = (aboutConfig.socialLinks || []).map(link =>
      link.id === id ? { ...link, [field]: value } : link
    );
    updateModuleInstance(instanceId, { socialLinks: newSocialLinks });
  };

  const removeSocialLink = (id: string) => {
    const newSocialLinks = (aboutConfig.socialLinks || []).filter(link => link.id !== id);
    updateModuleInstance(instanceId, { socialLinks: newSocialLinks });
  };

  return (
    <div className="space-y-3">
      <div>
        <Label htmlFor={`sectionTitle-${instanceId}`} className="text-sm">Título da Seção</Label>
        <Input
          id={`sectionTitle-${instanceId}`}
          type="text"
          value={aboutConfig.sectionTitle}
          onChange={(e) => updateModuleInstance(instanceId, { sectionTitle: e.target.value })}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor={`aboutPhoto-${instanceId}`} className="text-sm">Foto</Label>
        <ImageUpload
          value={aboutConfig.photo}
          onChange={(value) => updateModuleInstance(instanceId, { photo: value })}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor={`aboutName-${instanceId}`} className="text-sm">Nome</Label>
        <Input
          id={`aboutName-${instanceId}`}
          type="text"
          value={aboutConfig.name}
          onChange={(e) => updateModuleInstance(instanceId, { name: e.target.value })}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor={`aboutTitle-${instanceId}`} className="text-sm">Título</Label>
        <Input
          id={`aboutTitle-${instanceId}`}
          type="text"
          value={aboutConfig.title}
          onChange={(e) => updateModuleInstance(instanceId, { title: e.target.value })}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor={`aboutDescription-${instanceId}`} className="text-sm">Descrição</Label>
        <Textarea
          id={`aboutDescription-${instanceId}`}
          value={aboutConfig.description}
          onChange={(e) => updateModuleInstance(instanceId, { description: e.target.value })}
          className="mt-1"
          rows={3}
        />
      </div>

      <div>
        <Label className="text-sm mb-2 block">Links Sociais</Label>
        <div className="space-y-2">
          {(aboutConfig.socialLinks || []).map((link) => (
            <div key={link.id} className="flex gap-2">
              <Select
                value={link.platform}
                onValueChange={(value) => updateSocialLink(link.id, 'platform', value)}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Rede" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="twitter">Twitter</SelectItem>
                  <SelectItem value="youtube">YouTube</SelectItem>
                  <SelectItem value="tiktok">TikTok</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                </SelectContent>
              </Select>
              <Input
                value={link.url}
                onChange={(e) => updateSocialLink(link.id, 'url', e.target.value)}
                placeholder="URL do perfil"
                className="flex-1"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeSocialLink(link.id)}
                className="h-10 w-10 text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={addSocialLink}
            className="w-full border-dashed hover:border-solid"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Rede
          </Button>
        </div>
      </div>

      <div>
        <Label className="text-sm mb-2 block">Informações</Label>
        <div className="space-y-2">
          {(aboutConfig.education || []).map((item) => (
            <div key={item.id} className="flex gap-2 items-start">
              <IconSelector
                value={item.icon}
                onChange={(icon) => updateEducation(item.id, 'icon', icon)}
                open={openPopoverId === item.id}
                onOpenChange={(open) => setOpenPopoverId(open ? item.id : null)}
              />
              <Textarea
                value={item.text}
                onChange={(e) => updateEducation(item.id, 'text', e.target.value)}
                rows={2}
                className="flex-1"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeEducation(item.id)}
                className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={addEducation}
            className="w-full border-dashed hover:border-solid"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Informação
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutEditor;
