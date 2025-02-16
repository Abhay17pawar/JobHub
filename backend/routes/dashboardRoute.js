const express = require('express');
const router = express.Router();
const User = require("../models/userModel")
const { dashboardData } = require('../controller/dashboard');

router.post('/dashboard', dashboardData);
router.get('/store-email', async (req, res) => {
    const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(200).json({ message: "Email already stored" });
    }

    user = new User({ email });

    await user.save(); 
    res.status(200).json({ message: "Email stored successfully" });
  } catch (error) {
    console.error("Error storing email:", error);
    res.status(500).json({ error: "Server error, please try again" });
  }
});


module.exports = router;
