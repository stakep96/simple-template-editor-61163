import React from 'react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { GalleryConfig } from '@/contexts/SiteEditorContext';

interface PreviewGalleryProps {
  instanceId: string;
}

const PreviewGallery: React.FC<PreviewGalleryProps> = ({ instanceId }) => {
  const { config } = useSiteEditor();
  const instance = config.moduleInstances[instanceId];
  const galleryConfig = instance?.config as GalleryConfig;

  if (!galleryConfig || galleryConfig.images.length === 0) return null;

  // Create a mosaic pattern based on the number of images
  const getMosaicPattern = (imageCount: number) => {
    if (imageCount === 1) return ['col-span-2 row-span-2'];
    if (imageCount === 2) return ['col-span-1 row-span-2', 'col-span-1 row-span-2'];
    if (imageCount === 3) return ['col-span-1 row-span-2', 'col-span-1 row-span-1', 'col-span-1 row-span-1'];
    if (imageCount === 4) return ['col-span-1 row-span-1', 'col-span-1 row-span-1', 'col-span-1 row-span-1', 'col-span-1 row-span-1'];
    
    // For 5+ images, create a varied pattern
    const patterns = [
      'col-span-1 row-span-2',
      'col-span-1 row-span-1',
      'col-span-1 row-span-1',
      'col-span-1 row-span-2',
      'col-span-1 row-span-1',
      'col-span-1 row-span-1',
    ];
    
    return Array(imageCount).fill(null).map((_, i) => patterns[i % patterns.length]);
  };

  const patterns = getMosaicPattern(galleryConfig.images.length);

  return (
    <section 
      className="w-full"
      style={{ backgroundColor: config.brand.background }}
    >
      <h2 
        className="text-2xl font-bold text-center py-8 px-6"
        style={{ color: config.brand.titleColor }}
      >
        Galeria
      </h2>

      <div className="grid grid-cols-2 gap-1 auto-rows-[200px]">
        {galleryConfig.images.map((image, index) => (
          <div
            key={image.id}
            className={`relative overflow-hidden ${patterns[index]}`}
          >
            <img
              src={image.url || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop'}
              alt={image.alt || `Imagem ${index + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop';
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PreviewGallery;
