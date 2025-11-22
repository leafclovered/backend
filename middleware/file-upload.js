const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

const uploadsDir = path.join(__dirname, '..', 'uploads', 'images');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    
    const ext = path.extname(file.originalname);
    const filename = `${uuidv4()}${ext}`;
    cb(null, filename);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
  
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PNG, JPEG, and JPG images are allowed.'), false);
  }
};

const fileSizeLimit = 5 * 1024 * 1024;

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: fileSizeLimit
  }
});

module.exports = upload;

