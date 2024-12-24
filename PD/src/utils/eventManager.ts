export interface Event {
  id: string;
  name: string;
  date: string;
  adminId: string;
  attendees: number;
  totalPhotos: number;
  status: 'upcoming' | 'active' | 'completed';
}

export const eventManager = {
  createEvent: (eventData: Omit<Event, 'id'>) => {
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    const newEvent = {
      ...eventData,
      id: Date.now().toString(),
    };
    events.push(newEvent);
    localStorage.setItem('events', JSON.stringify(events));
    return newEvent;
  },

  getEvents: (): Event[] => {
    return JSON.parse(localStorage.getItem('events') || '[]');
  },

  getEventById: (id: string): Event | null => {
    const events = eventManager.getEvents();
    return events.find(event => event.id === id) || null;
  },

  updateEvent: (id: string, updates: Partial<Event>): Event | null => {
    const events = eventManager.getEvents();
    const index = events.findIndex(event => event.id === id);
    if (index === -1) return null;

    const updatedEvent = { ...events[index], ...updates };
    events[index] = updatedEvent;
    localStorage.setItem('events', JSON.stringify(events));
    return updatedEvent;
  }
};