const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cors = require('cors');

const app = express();
const port = 5000; // Ensure this is defined!

// Middleware
app.use(cors());
app.use(express.json());

// Cloudinary config
cloudinary.config({
  cloud_name: 'dirxbjlyw',
  api_key: '349411863967292',
  api_secret: 'kKgb_iif_T3_ZOlpcv52LhaFD2Y',
});

// Cloudinary storage setup
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'shared-library',
      resource_type: 'auto', // ✅ auto-detects images, PDFs, etc.
      allowed_formats: ['pdf', 'docx', 'txt', 'jpg', 'png', 'jpeg'],
      public_id: file.originalname.split('.')[0] + '-' + Date.now(),
    };
  },
});

const upload = multer({ storage });

// Upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: '❌ No file uploaded' });
  }

  // The file URL returned by Cloudinary will be the direct link to the file
  const fileUrl = req.file.path;

  return res.status(200).json({
    message: '✅ File uploaded successfully!',
    fileName: req.file.originalname,
    fileUrl: fileUrl,
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
