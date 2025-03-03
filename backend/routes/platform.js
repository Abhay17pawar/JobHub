const express = require('express');
const router = express.Router();
const { internshala, skills } = require('../controller/internshala');
const { linkedin } = require('../controller/linkedin');
const { glassdoor } = require('../controller/glassdoor');

router.post('/internshala',internshala);
router.post('/linkedin',linkedin);
router.post('/glassdoor',glassdoor);
router.post('/save-skills',skills);

module.exports = router;