const express = require('express');
const router = express.Router();
const { internshala, skills } = require('../controller/internshala');

router.post('/internshala',internshala);
router.post('/save-skills',skills);

module.exports = router;