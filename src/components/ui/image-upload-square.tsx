import React, { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';

interface ImageUploadSquareProps {
  value?: string;
  onChange: (value: string) => void;
  className?: string;
  hint?: string;
}

export const ImageUploadSquare: React.FC<ImageUploadSquareProps> = ({
  value,
  onChange,
  className,
  hint,
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
      <div className={cn('relative group w-32', className)}>
        <img
          src={value}
          alt="Favicon Preview"
          className="w-32 h-32 object-cover rounded-lg border border-border"
          onError={(e) => {
            e.currentTarget.src = '/placeholder.svg';
          }}
        />
        <Button
          type="button"
          variant="destructive"
          size="icon"
          className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6"
          onClick={handleRemove}
        >
          <X className="w-3 h-3" />
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
        'relative rounded-lg border-2 border-dashed transition-colors w-32',
        isDragging ? 'border-primary bg-primary/5' : 'border-border bg-background',
        className
      )}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      <div className="flex flex-col items-center justify-center py-6 px-2">
        <div className="w-10 h-10 mb-2 rounded-full bg-primary/10 flex items-center justify-center">
          <Upload className="w-5 h-5 text-primary" />
        </div>
        
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="text-xs text-primary hover:underline font-medium"
        >
          Enviar
        </button>
        
        {hint && (
          <p className="text-[10px] text-muted-foreground text-center mt-1 leading-tight">
            {hint}
          </p>
        )}
      </div>
    </div>
  );
};
