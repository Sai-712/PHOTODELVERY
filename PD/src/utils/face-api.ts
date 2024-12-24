import { StoredImage } from './imageStorage';

export interface FaceDetectionResult {
  faceId: string;
  confidence: number;
  rectangle: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
}

export const faceApi = {
  detectFaces: async (imageData: string): Promise<FaceDetectionResult[]> => {
    // TODO: Integrate with Azure Face API
    // For now, return mock data
    return [{
      faceId: Date.now().toString(),
      confidence: 0.98,
      rectangle: { top: 0, left: 0, width: 100, height: 100 }
    }];
  },

  findSimilarFaces: async (faceId: string, faceList: string[]): Promise<string[]> => {
    // TODO: Implement face matching logic
    return [faceId];
  }
};