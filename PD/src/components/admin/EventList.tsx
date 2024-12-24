import React from 'react';
import { Calendar, Users, HardDrive } from 'lucide-react';

interface Event {
  id: string;
  name: string;
  date: string;
  attendees: number;
  storage: number;
}

export function EventList() {
  const events: Event[] = [
    {
      id: '1',
      name: 'Wedding Ceremony',
      date: '2024-03-20',
      attendees: 120,
      storage: 2.5
    },
    // Add more mock events as needed
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Recent Events</h2>
      {events.map(event => (
        <div key={event.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h3 className="font-semibold text-lg mb-2">{event.name}</h3>
          <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-primary" />
              {new Date(event.date).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2">
              <Users size={16} className="text-primary" />
              {event.attendees} attendees
            </div>
            <div className="flex items-center gap-2">
              <HardDrive size={16} className="text-primary" />
              {event.storage} GB
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}