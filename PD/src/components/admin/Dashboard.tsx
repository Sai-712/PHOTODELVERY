import React from 'react';
import { Upload, QrCode, Users, HardDrive } from 'lucide-react';
import { EventList } from './EventList';
import { PhotoUpload } from './PhotoUpload';
import { QRCodeGenerator } from '../QRCodeGenerator';

export function AdminDashboard() {
  const stats = {
    users: 156,
    photos: 1234,
    storage: '45.3 GB'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            icon={<Users size={24} />}
            title="Registered Users"
            value={stats.users}
          />
          <StatsCard
            icon={<Upload size={24} />}
            title="Photos Processed"
            value={stats.photos}
          />
          <StatsCard
            icon={<HardDrive size={24} />}
            title="Storage Used"
            value={stats.storage}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <PhotoUpload />
          <div className="space-y-8">
            <EventList />
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold mb-4">Event QR Code</h2>
              <QRCodeGenerator value="https://example.com/register" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatsCard({ icon, title, value }: {
  icon: React.ReactNode;
  title: string;
  value: string | number;
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-lg text-primary">
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
      </div>
    </div>
  );
}