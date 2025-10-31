import React, { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';

interface ImageUploadProps {
  value?: string;
  onChange: (value: string) => void;
  className?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  className,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFileUpload(file);
    }
  };

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      onChange(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleRemove = () => {
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (value) {
    return (
      <div className={cn('relative group', className)}>
        <img
          src={value}
          alt="Preview"
          className="w-full h-48 object-cover rounded-lg border border-border"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop';
          }}
        />
        <Button
          type="button"
          variant="destructive"
          size="icon"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={handleRemove}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        'relative rounded-lg border-2 border-dashed transition-colors',
        isDragging ? 'border-primary bg-primary/5' : 'border-border bg-background',
        className
      )}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="w-16 h-16 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
          <Upload className="w-8 h-8 text-primary" />
        </div>
        
        <p className="text-sm text-foreground mb-1">
          Solte sua imagem aqui, ou{' '}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="text-primary hover:underline font-medium"
          >
            buscar
          </button>
        </p>
        
        <p className="text-xs text-muted-foreground">
          Suporta: JPG, JPEG, PNG
        </p>
      </div>
    </div>
  );
};
