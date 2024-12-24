import React, { useState, useEffect } from 'react';
import { imageStorage, StoredImage } from '../../utils/imageStorage';
import { Button } from '../ui/Button';

interface Cluster {
  id: string;
  faces: StoredImage[];
}

export function FaceCluster() {
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [processing, setProcessing] = useState(false);

  const processImages = async () => {
    setProcessing(true);
    try {
      const eventImages = imageStorage.getImagesByType('event');
      // Simulate clustering process
      const mockClusters = groupImagesByTimestamp(eventImages);
      setClusters(mockClusters);
    } catch (error) {
      console.error('Clustering error:', error);
    }
    setProcessing(false);
  };

  // Temporary grouping by timestamp (replace with actual face clustering)
  const groupImagesByTimestamp = (images: StoredImage[]): Cluster[] => {
    const groups: { [key: string]: StoredImage[] } = {};
    images.forEach(img => {
      const date = new Date(img.timestamp).toDateString();
      if (!groups[date]) groups[date] = [];
      groups[date].push(img);
    });
    
    return Object.entries(groups).map(([date, faces]) => ({
      id: date,
      faces
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Face Clusters</h2>
        <Button
          onClick={processImages}
          disabled={processing}
          className="bg-primary hover:bg-primary-dark"
        >
          Process Images
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clusters.map(cluster => (
          <div key={cluster.id} className="bg-white rounded-xl shadow-md p-4">
            <h3 className="font-semibold mb-2">Group {cluster.id}</h3>
            <div className="grid grid-cols-3 gap-2">
              {cluster.faces.slice(0, 6).map(face => (
                <img
                  key={face.id}
                  src={face.imageUrl}
                  alt="Face"
                  className="w-full h-24 object-cover rounded-lg"
                />
              ))}
            </div>
            {cluster.faces.length > 6 && (
              <p className="text-sm text-gray-500 mt-2">
                +{cluster.faces.length - 6} more photos
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}