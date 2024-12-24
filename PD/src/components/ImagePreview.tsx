import React from 'react';
import { X } from 'lucide-react';

interface ImagePreviewProps {
  image: string;
  onRemove: () => void;
}

export function ImagePreview({ image, onRemove }: ImagePreviewProps) {
  return (
    <div className="relative">
      <img
        src={image}
        alt="Preview"
        className="w-32 h-32 object-cover rounded-lg"
      />
      <button
        type="button"
        className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
        onClick={onRemove}
      >
        <X size={16} />
      </button>
    </div>
  );
}