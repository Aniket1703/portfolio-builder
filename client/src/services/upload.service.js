import api from './api';

export const uploadService = {
  // Upload image
  uploadImage: async (file, folder = 'portfolio-builder') => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('folder', folder);

    const response = await api.post('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Delete image
  deleteImage: async (publicId) => {
    const response = await api.delete('/upload/image', { data: { publicId } });
    return response.data;
  },
};