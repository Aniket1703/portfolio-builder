import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const storage = multer.memoryStorage();

// Stricter file filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  // Check for double extensions
  const fileName = file.originalname;
  const parts = fileName.split('.');
  if (parts.length > 2) {
    return cb(new Error('Invalid file name. Multiple extensions not allowed.'));
  }

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp)'));
  }
};

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 1 // Only 1 file at a time
  },
  fileFilter: fileFilter
});

// Sanitize filename
export const sanitizeFilename = (filename) => {
  const ext = path.extname(filename);
  const randomName = crypto.randomBytes(16).toString('hex');
  return `${randomName}${ext}`;
};