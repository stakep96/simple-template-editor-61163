import React, { useRef } from 'react';
import { Input } from '@/components/ui/input';

interface ColorPickerProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ id, value, onChange }) => {
  const colorInputRef = useRef<HTMLInputElement>(null);

  const handleColorClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    colorInputRef.current?.click();
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    onChange(newColor);
  };

  return (
    <div className="flex gap-2 items-center">
      <div
        onClick={handleColorClick}
        className="h-10 w-10 rounded-full cursor-pointer border-2 border-border hover:border-primary transition-colors flex-shrink-0 relative"
        style={{ backgroundColor: value }}
        role="button"
        tabIndex={0}
        aria-label={`Selecionar cor ${id}`}
      >
        <input
          ref={colorInputRef}
          type="color"
          value={value}
          onChange={handleColorChange}
          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 font-mono text-sm uppercase"
        placeholder="#000000"
      />
    </div>
  );
};

export default ColorPicker;
