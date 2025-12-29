const cloudinary = require("cloudinary").v2;
const CloudinaryStorage = require("multer-storage-cloudinary");
const multer = require("multer");

// Configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure storage (v2 syntax)
const storage = new CloudinaryStorage({
  cloudinary,
  folder: "civicspot",
  allowedFormats: ["jpg", "jpeg", "png", "gif", "webp"],
  transformation: [{ width: 1000, height: 1000, crop: "limit" }],
});

// Multer instance
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

module.exports = { cloudinary, upload };
