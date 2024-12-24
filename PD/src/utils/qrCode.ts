export interface QRCodeData {
  userId: string;
  eventId: string;
  timestamp: number;
}

export const qrCodeUtils = {
  generateEventQR: (eventId: string): string => {
    return `https://yourapp.com/event/${eventId}`;
  },

  generateUserQR: (userId: string): string => {
    return `https://yourapp.com/photos/${userId}`;
  },

  parseQRCode: (qrData: string): QRCodeData | null => {
    try {
      const url = new URL(qrData);
      const params = new URLSearchParams(url.search);
      return {
        userId: params.get('userId') || '',
        eventId: params.get('eventId') || '',
        timestamp: Date.now()
      };
    } catch {
      return null;
    }
  }
};