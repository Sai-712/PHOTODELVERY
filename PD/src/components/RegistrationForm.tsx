import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle2, Mail, Camera as CameraIcon } from 'lucide-react';
import { Camera } from './Camera';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { ImagePreview } from './ImagePreview';
import { storage } from '../utils/storage';
import { imageStorage } from '../utils/imageStorage';
import { QRCodeGenerator } from './QRCodeGenerator';

interface FormData {
  name: string;
  email: string;
  faceImage: string;
}

export function RegistrationForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    faceImage: '',
  });
  const [showQR, setShowQR] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save user data
    const user = storage.saveUser({ ...formData, role: 'user' });
    
    // Save the selfie image
    if (formData.faceImage) {
      imageStorage.saveImage(user.id, formData.faceImage, 'selfie');
    }
    
    setShowQR(true);
    
    // Navigate after 5 seconds
    setTimeout(() => {
      navigate('/thank-you');
    }, 5000);
  };

  const handleCapture = (image: string) => {
    setFormData({ ...formData, faceImage: image });
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      {!showQR ? (
        <>
          <h2 className="text-2xl font-bold text-center mb-6">Event Registration</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Full Name"
              icon={<UserCircle2 size={20} />}
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />

            <Input
              label="Email Address"
              icon={<Mail size={20} />}
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <CameraIcon size={20} />
                Selfie
              </label>
              <div className="flex flex-col items-center gap-4">
                {formData.faceImage ? (
                  <ImagePreview
                    image={formData.faceImage}
                    onRemove={() => setFormData({ ...formData, faceImage: '' })}
                  />
                ) : (
                  <Camera 
                    onCapture={handleCapture}
                    onError={(error) => console.error(error)}
                  />
                )}
              </div>
            </div>

            <Button type="submit" className="w-full py-3">
              Register
            </Button>
          </form>
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6">Registration Complete!</h2>
          <p className="text-gray-600 mb-6">Scan this QR code to access your photos later</p>
          <QRCodeGenerator 
            value={`https://yourapp.com/photos/${formData.email}`} 
            size={200}
          />
          <p className="text-sm text-gray-500 mt-4">Redirecting to thank you page...</p>
        </div>
      )}
    </div>
  );
}