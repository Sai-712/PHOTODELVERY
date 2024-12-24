export interface User {
  id: string;
  name: string;
  email: string;
  faceImage: string;
  role: 'user' | 'admin';
}

export interface Event {
  id: string;
  name: string;
  date: Date;
  adminId: string;
  qrCode: string;
  status: 'active' | 'completed';
  storage: {
    used: number;
    limit: number;
  };
}

export interface EventPhoto {
  id: string;
  eventId: string;
  url: string;
  faces: string[]; // Array of detected face IDs
  uploadedAt: Date;
}