export interface StoredImage {
  id: string;
  userId: string;
  imageUrl: string;
  type: 'selfie' | 'event';
  timestamp: number;
}

export const imageStorage = {
  saveImage: (userId: string, imageData: string, type: 'selfie' | 'event'): StoredImage => {
    const images = JSON.parse(localStorage.getItem('images') || '[]');
    const newImage: StoredImage = {
      id: Date.now().toString(),
      userId,
      imageUrl: imageData,
      type,
      timestamp: Date.now()
    };
    
    images.push(newImage);
    localStorage.setItem('images', JSON.stringify(images));
    return newImage;
  },

  getImagesByUserId: (userId: string): StoredImage[] => {
    const images = JSON.parse(localStorage.getItem('images') || '[]');
    return images.filter((img: StoredImage) => img.userId === userId);
  },

  getImagesByType: (type: 'selfie' | 'event'): StoredImage[] => {
    const images = JSON.parse(localStorage.getItem('images') || '[]');
    return images.filter((img: StoredImage) => img.type === type);
  }
};