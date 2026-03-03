import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { useImageUpload } from '../../hooks/useImageUpload';
import { motion } from 'framer-motion';

const ImageUpload = ({ value, onChange, label, folder = 'portfolio-builder' }) => {
  const { uploadImage, uploading, progress } = useImageUpload();
  const [preview, setPreview] = useState(value || null);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload to cloudinary
    try {
      const url = await uploadImage(file, folder);
      if (url) {
        onChange(url);
        setPreview(url);
      }
    } catch (error) {
      setPreview(value || null);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      {label && <label className="label">{label}</label>}

      <div className="relative">
        {preview ? (
          <div className="relative group">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors bg-gray-50"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <ImageIcon className="w-12 h-12 text-gray-400 mb-3" />
              <p className="mb-2 text-sm text-gray-600">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
            </div>
          </label>
        )}

        <input
          ref={fileInputRef}
          id="image-upload"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={uploading}
        />

        {uploading && (
          <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center rounded-lg">
            <div className="text-center">
              <motion.div
                className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-2"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
              <p className="text-sm font-medium text-gray-700">{progress}%</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;