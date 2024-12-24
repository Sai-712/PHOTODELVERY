import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Users, QrCode } from 'lucide-react';
import { Button } from './ui/Button';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light/10 to-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Smart Photo <span className="text-primary">Delivery</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Automatically receive your event photos using AI-powered facial recognition
          </p>
          
          <div className="mt-10 flex justify-center gap-4">
            <Button onClick={() => navigate('/register')} className="flex items-center gap-2 bg-primary hover:bg-primary-dark">
              <Users size={20} />
              Register as User
            </Button>
            <Button onClick={() => navigate('/admin/register')} className="flex items-center gap-2 bg-secondary hover:bg-secondary-dark">
              <Camera size={20} />
              Register as Admin
            </Button>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
          <FeatureCard
            icon={<QrCode size={24} />}
            title="Easy Registration"
            description="Scan QR code at events to register and receive your photos automatically"
          />
          <FeatureCard
            icon={<Camera size={24} />}
            title="AI-Powered"
            description="Advanced facial recognition ensures you get all your photos"
          />
          <FeatureCard
            icon={<Users size={24} />}
            title="Instant Delivery"
            description="Photos are automatically sent to your email once processed"
          />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}