import { QRCodeData, QRCodeSize, QRCodeFormat } from './types';

const SIZES = {
  sm: 128,
  md: 256,
  lg: 512
};

export const generateQRCode = {
  forEvent: (eventId: string, eventName: string): QRCodeData => ({
    type: 'event',
    eventId,
    userId: '',
    timestamp: Date.now(),
    metadata: { eventName }
  }),

  forUser: (userId: string, userName: string): QRCodeData => ({
    type: 'user',
    userId,
    eventId: '',
    timestamp: Date.now(),
    metadata: { userName }
  }),

  forPhoto: (photoId: string, userId: string): QRCodeData => ({
    type: 'photo',
    userId,
    eventId: '',
    timestamp: Date.now(),
    metadata: { photoId }
  }),

  getUrl: (data: QRCodeData, size: QRCodeSize = 'md', format: QRCodeFormat = 'svg'): string => {
    const baseUrl = 'https://yourapp.com/qr';
    const params = new URLSearchParams({
      data: JSON.stringify(data),
      size: SIZES[size].toString(),
      format
    });
    return `${baseUrl}?${params.toString()}`;
  }
};