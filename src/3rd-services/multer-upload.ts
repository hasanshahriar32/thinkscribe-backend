import multer from 'multer';
import path from 'path';

// Set up storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the folder where files will be uploaded
    cb(null, './src/storage/uploads');
  },
  filename: (req, file, cb) => {
    // Specify the filename for the uploaded file (optional)
    cb(null, Date.now() + path.extname(file.originalname)); // Adding timestamp to avoid overwriting
  },
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

export default upload;
