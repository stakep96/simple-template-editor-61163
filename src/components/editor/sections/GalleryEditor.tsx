import React from 'react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { GalleryConfig, GalleryImage } from '@/contexts/SiteEditorContext';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

interface GalleryEditorProps {
  instanceId: string;
}

const GalleryEditor: React.FC<GalleryEditorProps> = ({ instanceId }) => {
  const { config, updateModuleInstance } = useSiteEditor();
  const instance = config.moduleInstances[instanceId];
  const galleryConfig = instance?.config as GalleryConfig;

  if (!galleryConfig) return null;

  const updateImage = (imageId: string, field: keyof GalleryImage, value: string) => {
    const updatedImages = galleryConfig.images.map((img) =>
      img.id === imageId ? { ...img, [field]: value } : img
    );
    updateModuleInstance(instanceId, { images: updatedImages });
  };

  const removeImage = (imageId: string) => {
    const updatedImages = galleryConfig.images.filter((img) => img.id !== imageId);
    updateModuleInstance(instanceId, { images: updatedImages });
  };

  const addImage = () => {
    const newImage: GalleryImage = {
      id: `img-${Date.now()}`,
      url: '',
      alt: '',
    };
    updateModuleInstance(instanceId, { images: [...galleryConfig.images, newImage] });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Galeria de Fotos</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Adicione fotos para criar um mosaico visual
        </p>
      </div>

      <div className="space-y-4">
        {galleryConfig.images.map((image, index) => (
          <div key={image.id} className="p-4 border border-border rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold">Imagem {index + 1}</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeImage(image.id)}
                className="h-8 w-8 p-0"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`url-${image.id}`} className="text-xs">
                URL da Imagem
              </Label>
              <Input
                id={`url-${image.id}`}
                type="text"
                value={image.url}
                onChange={(e) => updateImage(image.id, 'url', e.target.value)}
                placeholder="https://exemplo.com/imagem.jpg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`alt-${image.id}`} className="text-xs">
                Texto Alternativo (opcional)
              </Label>
              <Input
                id={`alt-${image.id}`}
                type="text"
                value={image.alt || ''}
                onChange={(e) => updateImage(image.id, 'alt', e.target.value)}
                placeholder="Descrição da imagem"
              />
            </div>

            {image.url && (
              <div className="mt-2">
                <img
                  src={image.url}
                  alt={image.alt || 'Preview'}
                  className="w-full h-32 object-cover rounded"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop';
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <Button onClick={addImage} variant="outline" className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        Adicionar Imagem
      </Button>
    </div>
  );
};

export default GalleryEditor;
