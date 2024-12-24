export interface QRCodeData {
  userId: string;
  eventId: string;
  timestamp: number;
  type: 'event' | 'user' | 'photo';
  metadata?: {
    eventName?: string;
    userName?: string;
    photoId?: string;
  };
}

export type QRCodeSize = 'sm' | 'md' | 'lg';
export type QRCodeFormat = 'png' | 'svg';