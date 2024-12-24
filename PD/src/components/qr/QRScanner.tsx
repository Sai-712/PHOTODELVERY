import React, { useState } from 'react';
import { Camera, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { QRCodeData } from '../../utils/qrCode/types';

interface QRScannerProps {
  onScan: (data: QRCodeData) => void;
  onError?: (error: string) => void;
}

export function QRScanner({ onScan, onError }: QRScannerProps) {
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string>('');

  const startScanning = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      setScanning(true);
      // In a real implementation, we'd use a QR code scanning library here
      // For now, we'll simulate a successful scan after 2 seconds
      setTimeout(() => {
        const mockData: QRCodeData = {
          type: 'event',
          eventId: 'mock-event-123',
          userId: '',
          timestamp: Date.now(),
          metadata: { eventName: 'Mock Event' }
        };
        onScan(mockData);
        stopScanning();
      }, 2000);
    } catch (err) {
      const errorMessage = 'Failed to access camera. Please ensure camera permissions are granted.';
      setError(errorMessage);
      onError?.(errorMessage);
    }
  };

  const stopScanning = () => {
    setScanning(false);
  };

  return (
    <div className="relative">
      {error && (
        <div className="text-red-500 text-sm mb-2">{error}</div>
      )}
      
      {!scanning ? (
        <Button
          onClick={startScanning}
          className="flex items-center gap-2"
        >
          <Camera size={20} />
          Scan QR Code
        </Button>
      ) : (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="relative bg-white p-4 rounded-lg max-w-md w-full">
            <button
              onClick={stopScanning}
              className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
            >
              <X size={20} />
            </button>
            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Scanning...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}