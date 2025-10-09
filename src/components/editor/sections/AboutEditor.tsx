import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { AboutConfig } from '@/contexts/SiteEditorContext';

interface AboutEditorProps {
  instanceId: string;
}

const AboutEditor: React.FC<AboutEditorProps> = ({ instanceId }) => {
  const { config, updateModuleInstance } = useSiteEditor();
  const instance = config.moduleInstances[instanceId];
  const aboutConfig = instance?.config as AboutConfig;

  if (!aboutConfig) return null;

  const addEducation = () => {
    const newEducation = [...(aboutConfig.education || []), ''];
    updateModuleInstance(instanceId, { education: newEducation });
  };

  const updateEducation = (index: number, value: string) => {
    const newEducation = [...(aboutConfig.education || [])];
    newEducation[index] = value;
    updateModuleInstance(instanceId, { education: newEducation });
  };

  const removeEducation = (index: number) => {
    const newEducation = (aboutConfig.education || []).filter((_, i) => i !== index);
    updateModuleInstance(instanceId, { education: newEducation });
  };

  return (
    <div className="space-y-3">
      <div>
        <Label htmlFor={`aboutPhoto-${instanceId}`} className="text-sm">Foto (URL)</Label>
        <Input
          id={`aboutPhoto-${instanceId}`}
          type="text"
          value={aboutConfig.photo}
          onChange={(e) => updateModuleInstance(instanceId, { photo: e.target.value })}
          placeholder="URL da foto"
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
        <Label className="text-sm">Links Sociais</Label>
        <div className="space-y-2 mt-1">
          <Input
            placeholder="Instagram"
            value={aboutConfig.socialLinks?.instagram || ''}
            onChange={(e) => updateModuleInstance(instanceId, { 
              socialLinks: { ...aboutConfig.socialLinks, instagram: e.target.value }
            })}
          />
          <Input
            placeholder="Facebook"
            value={aboutConfig.socialLinks?.facebook || ''}
            onChange={(e) => updateModuleInstance(instanceId, { 
              socialLinks: { ...aboutConfig.socialLinks, facebook: e.target.value }
            })}
          />
          <Input
            placeholder="LinkedIn"
            value={aboutConfig.socialLinks?.linkedin || ''}
            onChange={(e) => updateModuleInstance(instanceId, { 
              socialLinks: { ...aboutConfig.socialLinks, linkedin: e.target.value }
            })}
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <Label className="text-sm">Formação</Label>
          <Button type="button" variant="outline" size="sm" onClick={addEducation}>
            <Plus className="w-4 h-4 mr-1" />
            Adicionar
          </Button>
        </div>
        <div className="space-y-2">
          {(aboutConfig.education || []).map((edu, index) => (
            <div key={index} className="flex gap-2">
              <Textarea
                value={edu}
                onChange={(e) => updateEducation(index, e.target.value)}
                rows={2}
                className="flex-1"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeEducation(index)}
                className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutEditor;
