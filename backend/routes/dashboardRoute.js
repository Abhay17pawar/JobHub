// routes/dashboardRoute.js
const express = require('express');
const router = express.Router();

const { dashboardData } = require('../controller/dashboard');

router.post('/dashboard', dashboardData);

module.exports = router;
