import React from 'react';
import { Calendar, Users, Image as ImageIcon } from 'lucide-react';
import { Button } from '../ui/Button';

interface EventCardProps {
  event: {
    id: string;
    name: string;
    date: string;
    totalPhotos: number;
    attendees: number;
  };
  onViewDetails: (id: string) => void;
}

export function EventCard({ event, onViewDetails }: EventCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{event.name}</h3>
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-gray-600">
          <Calendar size={18} className="mr-2 text-primary" />
          {new Date(event.date).toLocaleDateString()}
        </div>
        <div className="flex items-center text-gray-600">
          <Users size={18} className="mr-2 text-primary" />
          {event.attendees} Attendees
        </div>
        <div className="flex items-center text-gray-600">
          <ImageIcon size={18} className="mr-2 text-primary" />
          {event.totalPhotos} Photos
        </div>
      </div>
      <Button 
        onClick={() => onViewDetails(event.id)}
        className="w-full"
      >
        View Details
      </Button>
    </div>
  );
}