import React from 'react';
import { X, Download, Share2 } from 'lucide-react';
import { StoredImage } from '../../utils/imageStorage';
import { Button } from '../ui/Button';

interface PhotoViewerProps {
  photo: StoredImage;
  onClose: () => void;
  onDownload?: (photo: StoredImage) => void;
  onShare?: (photo: StoredImage) => void;
}

export function PhotoViewer({ photo, onClose, onDownload, onShare }: PhotoViewerProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
      <div className="relative max-w-4xl w-full bg-white rounded-xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/75"
        >
          <X size={20} />
        </button>
        
        <img
          src={photo.imageUrl}
          alt="Full size"
          className="w-full h-auto"
        />
        
        <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/75 to-transparent">
          <div className="flex justify-end gap-2">
            {onDownload && (
              <Button
                onClick={() => onDownload(photo)}
                className="flex items-center gap-2"
              >
                <Download size={20} />
                Download
              </Button>
            )}
            {onShare && (
              <Button
                onClick={() => onShare(photo)}
                className="flex items-center gap-2"
              >
                <Share2 size={20} />
                Share
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}