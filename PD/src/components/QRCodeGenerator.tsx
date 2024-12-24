import React from 'react';
import QRCode from 'qrcode.react';

interface QRCodeGeneratorProps {
  value: string;
  size?: number;
}

export function QRCodeGenerator({ value, size = 256 }: QRCodeGeneratorProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <QRCode
        value={value}
        size={size}
        level="H"
        includeMargin
        className="rounded-lg"
      />
      <p className="text-sm text-gray-600">
        Scan this QR code to register for the event
      </p>
    </div>
  );
}