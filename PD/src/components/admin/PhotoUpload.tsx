import React, { useCallback, useState } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { imageStorage } from '../../utils/imageStorage';
import { storage } from '../../utils/storage';

export function PhotoUpload() {
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState('');

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFiles = async (files: File[]) => {
    setProcessing(true);
    setMessage('Processing photos...');

    try {
      const admin = storage.getAdmins()[0]; // Get current admin
      
      for (const file of files) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const imageData = reader.result as string;
          imageStorage.saveImage(admin.id, imageData, 'event');
        };
        reader.readAsDataURL(file);
      }

      setMessage(`Successfully processed ${files.length} photos`);
    } catch (error) {
      setMessage('Error processing photos. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Upload Photos</h2>
      
      {message && (
        <div className={`p-3 rounded-lg ${
          message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
        }`}>
          {message}
        </div>
      )}

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center hover:border-primary/50 transition-colors"
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => e.target.files && handleFiles(Array.from(e.target.files))}
          className="hidden"
          id="photo-upload"
        />
        <label htmlFor="photo-upload" className="cursor-pointer">
          <Upload size={48} className="mx-auto text-primary mb-4" />
          <p className="text-sm text-gray-600 mb-2">
            Drag and drop photos here or click to select
          </p>
          <p className="text-xs text-gray-500">
            Supported formats: JPG, PNG (max 10MB per file)
          </p>
        </label>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-6">
        <Button 
          variant="secondary" 
          className="flex items-center gap-2"
          disabled={processing}
        >
          <ImageIcon size={20} />
          Process Photos
        </Button>
        <Button 
          variant="primary" 
          className="flex items-center gap-2"
          disabled={processing}
        >
          <Upload size={20} />
          Upload All
        </Button>
      </div>
    </div>
  );
}