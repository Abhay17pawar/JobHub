const express = require('express');
const router = express.Router();
const { internshala } = require('../controller/internshala');

router.post('/internshala',internshala);

module.exports = router;