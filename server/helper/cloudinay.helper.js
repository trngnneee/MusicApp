const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({ 
  cloud_name: 'dnqinxiwo', 
  api_key: '589421284786958', 
  api_secret: process.env.CLOUDINARY_SECRET_API
});

module.exports.storage = new CloudinaryStorage({
  cloudinary: cloudinary
});