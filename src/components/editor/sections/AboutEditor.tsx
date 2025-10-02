import React from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { User, Plus, Trash2 } from 'lucide-react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';

const AboutEditor = () => {
  const { config, updateAbout } = useSiteEditor();

  const addEducation = () => {
    const newEducation = [...config.about.education, ''];
    updateAbout({ education: newEducation });
  };

  const updateEducation = (index: number, value: string) => {
    const newEducation = [...config.about.education];
    newEducation[index] = value;
    updateAbout({ education: newEducation });
  };

  const removeEducation = (index: number) => {
    const newEducation = config.about.education.filter((_, i) => i !== index);
    updateAbout({ education: newEducation });
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Sobre mim</h3>
            <p className="text-xs text-muted-foreground">Informações pessoais</p>
          </div>
        </div>
        <Switch
          checked={config.about.enabled}
          onCheckedChange={(enabled) => updateAbout({ enabled })}
        />
      </div>

      {config.about.enabled && (
        <div className="space-y-3">
          <div>
            <Label htmlFor="aboutPhoto" className="text-sm">Foto (URL)</Label>
            <Input
              id="aboutPhoto"
              type="text"
              value={config.about.photo}
              onChange={(e) => updateAbout({ photo: e.target.value })}
              placeholder="URL da foto"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="aboutName" className="text-sm">Nome</Label>
            <Input
              id="aboutName"
              type="text"
              value={config.about.name}
              onChange={(e) => updateAbout({ name: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="aboutTitle" className="text-sm">Título/Cargo</Label>
            <Input
              id="aboutTitle"
              type="text"
              value={config.about.title}
              onChange={(e) => updateAbout({ title: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="aboutDescription" className="text-sm">Descrição</Label>
            <Textarea
              id="aboutDescription"
              value={config.about.description}
              onChange={(e) => updateAbout({ description: e.target.value })}
              className="mt-1"
              rows={3}
            />
          </div>

          <div>
            <Label className="text-sm">Redes Sociais</Label>
            <div className="space-y-2 mt-2">
              <Input
                type="text"
                placeholder="Instagram"
                value={config.about.socialLinks.instagram || ''}
                onChange={(e) =>
                  updateAbout({
                    socialLinks: { ...config.about.socialLinks, instagram: e.target.value },
                  })
                }
              />
              <Input
                type="text"
                placeholder="Facebook"
                value={config.about.socialLinks.facebook || ''}
                onChange={(e) =>
                  updateAbout({
                    socialLinks: { ...config.about.socialLinks, facebook: e.target.value },
                  })
                }
              />
              <Input
                type="text"
                placeholder="LinkedIn"
                value={config.about.socialLinks.linkedin || ''}
                onChange={(e) =>
                  updateAbout({
                    socialLinks: { ...config.about.socialLinks, linkedin: e.target.value },
                  })
                }
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-sm">Formação</Label>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={addEducation}
                className="h-7"
              >
                <Plus className="w-3 h-3 mr-1" />
                Adicionar
              </Button>
            </div>
            <div className="space-y-2">
              {config.about.education.map((edu, index) => (
                <div key={index} className="flex gap-2">
                  <Textarea
                    value={edu}
                    onChange={(e) => updateEducation(index, e.target.value)}
                    placeholder="Descreva a formação..."
                    rows={2}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    onClick={() => removeEducation(index)}
                    className="h-auto"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default AboutEditor;
