const express = require('express');
const {  extractTextFromPDF, savePDFdata } = require('../controller/File');
 const { upload, uploadFile } = require('../controller/File'); // Import the controller
 const router = express.Router();
 
 router.post('/upload', upload, uploadFile); 
 router.get('/process-pdf', extractTextFromPDF);
 router.put('/save-extracted-data', savePDFdata);

module.exports = router;
