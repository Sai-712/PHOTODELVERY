import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, User, Mail } from 'lucide-react';
import { storage } from '../../utils/storage';
import { imageStorage } from '../../utils/imageStorage';
import { QRCodeGenerator } from '../QRCodeGenerator';

export function UserDashboard() {
  const [userData, setUserData] = useState<any>(null);
  const [userPhotos, setUserPhotos] = useState<any[]>([]);

  useEffect(() => {
    // In a real app, get the current user's ID from auth
    const users = storage.getUsers();
    if (users.length > 0) {
      const user = users[0];
      setUserData(user);
      const photos = imageStorage.getImagesByUserId(user.id);
      setUserPhotos(photos);
    }
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <User size={40} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{userData.name}</h2>
              <p className="text-gray-600 flex items-center">
                <Mail size={16} className="mr-1" />
                {userData.email}
              </p>
            </div>
          </div>
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2">Your QR Code</h3>
            <QRCodeGenerator 
              value={`https://yourapp.com/photos/${userData.id}`}
              size={150}
            />
          </div>
        </div>

        {/* Photos Grid */}
        <div className="md:col-span-2">
          <h3 className="text-xl font-semibold mb-4">Your Photos</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {userPhotos.map(photo => (
              <div key={photo.id} className="relative group">
                <img
                  src={photo.imageUrl}
                  alt="Event photo"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity rounded-lg flex items-center justify-center">
                  <ImageIcon className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}