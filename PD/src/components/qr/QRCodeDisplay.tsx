import React from 'react';
import QRCode from 'qrcode.react';
import { Download, Share2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { QRCodeData, QRCodeSize } from '../../utils/qrCode/types';
import { generateQRCode } from '../../utils/qrCode/generator';

interface QRCodeDisplayProps {
  data: QRCodeData;
  size?: QRCodeSize;
  showActions?: boolean;
  className?: string;
}

export function QRCodeDisplay({ 
  data, 
  size = 'md', 
  showActions = true,
  className = ''
}: QRCodeDisplayProps) {
  const qrUrl = generateQRCode.getUrl(data, size);
  const SIZES = { sm: 128, md: 256, lg: 512 };

  const handleDownload = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `qr-${data.type}-${Date.now()}.png`;
      link.href = url;
      link.click();
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'QR Code',
        text: `Scan this QR code for ${data.type}`,
        url: qrUrl
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <div className="bg-white p-4 rounded-xl shadow-md">
        <QRCode
          value={qrUrl}
          size={SIZES[size]}
          level="H"
          includeMargin
          className="rounded-lg"
        />
      </div>

      {showActions && (
        <div className="flex gap-2">
          <Button
            onClick={handleDownload}
            className="flex items-center gap-2"
            variant="secondary"
          >
            <Download size={20} />
            Download
          </Button>
          {navigator.share && (
            <Button
              onClick={handleShare}
              className="flex items-center gap-2"
            >
              <Share2 size={20} />
              Share
            </Button>
          )}
        </div>
      )}

      <p className="text-sm text-gray-600 text-center">
        {data.type === 'event' && 'Scan to join the event'}
        {data.type === 'user' && 'Your personal QR code'}
        {data.type === 'photo' && 'Scan to view photo'}
      </p>
    </div>
  );
}