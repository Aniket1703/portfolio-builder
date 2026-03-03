import { useState } from 'react';
import { uploadService } from '../services/upload.service';
import toast from 'react-hot-toast';

export const useImageUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadImage = async (file, folder = 'portfolio-builder') => {
    if (!file) return null;

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return null;
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please upload a valid image file (JPEG, PNG, GIF, WEBP)');
      return null;
    }

    setUploading(true);
    setProgress(0);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 90));
      }, 200);

      const response = await uploadService.uploadImage(file, folder);

      clearInterval(progressInterval);
      setProgress(100);

      setTimeout(() => {
        setProgress(0);
        setUploading(false);
      }, 500);

      return response.data.url;
    } catch (error) {
      setUploading(false);
      setProgress(0);
      toast.error('Failed to upload image');
      throw error;
    }
  };

  return { uploadImage, uploading, progress };
};