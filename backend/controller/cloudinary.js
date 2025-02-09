const cloudinary = require('cloudinary').v2;

// Set up Cloudinary credentials
cloudinary.config({
  cloud_name: 'dsyqaeytl',
  api_key: '852844293376675',
  api_secret: 'KdeR2sZmPcLai-FabyvmCSB5VNg',
});

module.exports = cloudinary;
