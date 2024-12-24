import React from 'react';
import { Image as ImageIcon, Download } from 'lucide-react';
import { StoredImage } from '../../utils/imageStorage';

interface PhotoGridProps {
  photos: StoredImage[];
  onPhotoClick?: (photo: StoredImage) => void;
}

export function PhotoGrid({ photos, onPhotoClick }: PhotoGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {photos.map(photo => (
        <div 
          key={photo.id} 
          className="relative group cursor-pointer"
          onClick={() => onPhotoClick?.(photo)}
        >
          <img
            src={photo.imageUrl}
            alt="Event photo"
            className="w-full aspect-square object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity rounded-lg flex items-center justify-center gap-4">
            <ImageIcon className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            <Download className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      ))}
    </div>
  );
}