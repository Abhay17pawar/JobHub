const express = require('express');
const {  extractTextFromPDF, savePDFdata } = require('../controller/File');
 const { upload, uploadFile } = require('../controller/File'); // Import the controller
const User = require('../models/userModel');
 const router = express.Router();
 
 router.post('/upload', upload, uploadFile); 
 router.get('/process-pdf', extractTextFromPDF);
 //router.put('/save-extracted-data', savePDFdata);

 router.put('/save-extracted-data', async (req, res) => {
    const { email, skills } = req.body;  // This will get the skills array from the request body
  
    try {
      // First, try to find the user by email
      let updatedUser = await User.findOne({ email });
  
      if (updatedUser) {
        // If user is found, update the skills
        updatedUser.skills = skills;
        await updatedUser.save();  // Save the updated user document
        return res.status(200).send({ message: 'User skills updated successfully' });
      } else {
        // If user not found, create a new user
        updatedUser = new User({
          email,  
          skills,  
        });
        await updatedUser.save();  
        return res.status(201).send({ message: 'New user created with skills' });
      }
    } catch (error) {
      console.error('Error updating or creating user data:', error);
      return res.status(500).send({ message: 'Failed to update or create user data' });
    }
  });

module.exports = router;
