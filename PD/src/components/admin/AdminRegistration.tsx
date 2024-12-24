import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle2, Mail, Phone, Camera as CameraIcon, X } from 'lucide-react';
import { Camera } from '../Camera';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface AdminFormData {
  name: string;
  email: string;
  phone: string;
  faceImage: string;
}

export function AdminRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<AdminFormData>({
    name: '',
    email: '',
    phone: '',
    faceImage: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Store admin data locally
    const admins = JSON.parse(localStorage.getItem('admins') || '[]');
    admins.push({ ...formData, role: 'admin', id: Date.now().toString() });
    localStorage.setItem('admins', JSON.stringify(admins));
    // Navigate to thank you page
    navigate('/admin/thank-you');
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Admin Registration</h2>
      
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

        <Input
          label="Phone Number"
          icon={<Phone size={20} />}
          type="tel"
          required
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <CameraIcon size={20} />
            Profile Photo
          </label>
          <div className="flex flex-col items-center gap-4">
            {formData.faceImage ? (
              <div className="relative">
                <img
                  src={formData.faceImage}
                  alt="Profile photo"
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  onClick={() => setFormData({ ...formData, faceImage: '' })}
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <Camera onCapture={(image) => setFormData({ ...formData, faceImage: image })} />
            )}
          </div>
        </div>

        <Button type="submit" className="w-full py-3">
          Register as Admin
        </Button>
      </form>
    </div>
  );
}