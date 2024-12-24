import React, { useRef, useState } from 'react';
import { Camera as CameraIcon, X } from 'lucide-react';
import { Button } from './ui/Button';

interface CameraProps {
  onCapture: (image: string) => void;
  onError?: (error: string) => void;
}

export function Camera({ onCapture, onError }: CameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [error, setError] = useState<string>('');

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' }
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setShowCamera(true);
      setError('');
    } catch (err) {
      const errorMessage = 'Failed to access camera. Please ensure camera permissions are granted.';
      setError(errorMessage);
      onError?.(errorMessage);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setShowCamera(false);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const image = canvas.toDataURL('image/jpeg', 0.8);
        onCapture(image);
        stopCamera();
      }
    }
  };

  return (
    <div className="relative">
      {error && (
        <div className="text-red-500 text-sm mb-2">{error}</div>
      )}
      
      {!showCamera ? (
        <Button
          onClick={startCamera}
          className="flex items-center gap-2 bg-primary hover:bg-primary-dark"
        >
          <CameraIcon size={20} />
          Take Photo
        </Button>
      ) : (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="relative bg-white p-4 rounded-lg max-w-md w-full">
            <button
              onClick={stopCamera}
              className="absolute -top-2 -right-2 p-1 bg-secondary text-white rounded-full hover:bg-secondary-dark"
            >
              <X size={20} />
            </button>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="rounded-lg w-full"
            />
            <Button
              onClick={capturePhoto}
              className="mt-4 w-full bg-primary hover:bg-primary-dark"
            >
              Capture Photo
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}