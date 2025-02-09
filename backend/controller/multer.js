const multer = require('multer');

const storage = multer.diskStorage({
    destination: './uploads/', 
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Unique filename
    },
  });
  
  // Set up multer instance
  const upload = multer({
    storage: storage,
    limits: { fileSize: 60 * 1024 * 1024 }, // Max file size 10MB
  });

module.exports = upload;