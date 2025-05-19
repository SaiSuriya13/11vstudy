const express = require('express')
const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const cloudinary = require('../config/cloudinary')

const router = express.Router()

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'vstudy_uploads',
    allowed_formats: ['jpg', 'png', 'pdf', 'mp4', 'mp3'],
  },
})

const upload = multer({ storage })

router.post('/', upload.single('file'), (req, res) => {
  try {
    res.json({ url: req.file.path })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Upload failed' })
  }
})

module.exports = router
