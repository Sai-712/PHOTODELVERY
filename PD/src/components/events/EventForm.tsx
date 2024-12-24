import React, { useState } from 'react';
import { Calendar, Users, MapPin } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { eventManager, Event } from '../../utils/eventManager';

interface EventFormProps {
  onSubmit: (event: Event) => void;
  adminId: string;
}

export function EventForm({ onSubmit, adminId }: EventFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    location: '',
    maxAttendees: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEvent = eventManager.createEvent({
      name: formData.name,
      date: formData.date,
      adminId,
      attendees: 0,
      totalPhotos: 0,
      status: 'upcoming'
    });
    onSubmit(newEvent);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Event Name"
        icon={<Calendar size={20} />}
        type="text"
        required
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />

      <Input
        label="Event Date"
        icon={<Calendar size={20} />}
        type="date"
        required
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
      />

      <Input
        label="Location"
        icon={<MapPin size={20} />}
        type="text"
        required
        value={formData.location}
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
      />

      <Input
        label="Maximum Attendees"
        icon={<Users size={20} />}
        type="number"
        required
        value={formData.maxAttendees}
        onChange={(e) => setFormData({ ...formData, maxAttendees: e.target.value })}
      />

      <Button type="submit" className="w-full">
        Create Event
      </Button>
    </form>
  );
}