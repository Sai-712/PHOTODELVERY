import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Button } from './ui/Button';

interface ThankYouProps {
  userType: 'admin' | 'user';
}

export function ThankYou({ userType }: ThankYouProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
      <div className="max-w-md w-full mx-4 p-8 bg-white rounded-xl shadow-lg text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Registration Successful!</h1>
        
        {userType === 'admin' ? (
          <>
            <p className="text-gray-600 mb-6">
              Your admin account has been created. You can now start managing events and uploading photos.
            </p>
            <Button 
              onClick={() => navigate('/admin/dashboard')}
              className="w-full"
            >
              Go to Dashboard
            </Button>
          </>
        ) : (
          <>
            <p className="text-gray-600 mb-6">
              Thank you for registering! You will receive your event photos via email once they are processed.
            </p>
            <Button 
              onClick={() => navigate('/')}
              className="w-full"
            >
              Return Home
            </Button>
          </>
        )}
      </div>
    </div>
  );
}