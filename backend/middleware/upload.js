const { upload } = require('../config/cloudinary');

// Single image upload
exports.uploadSingle = upload.single('image');

// Multiple images upload (max 5)
exports.uploadMultiple = upload.array('images', 5);

// Handle multer errors
exports.handleUploadError = (err, req, res, next) => {
  if (err) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File size too large. Maximum size is 5MB'
      });
    }
    
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        success: false,
        message: 'Too many files. Maximum 5 images allowed'
      });
    }
    
    return res.status(400).json({
      success: false,
      message: 'Error uploading file',
      error: err.message
    });
  }
  next();
};