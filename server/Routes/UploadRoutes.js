const express = require('express');
const uploadRoutes = express.Router();
const multer = require('multer');
const { uploadImage } = require('../Controllers/UploadImageController');
const upload = multer({ dest: 'uploads/' });

uploadRoutes.post('/upload', upload.single('image'), uploadImage);

module.exports = uploadRoutes;




