const express = require('express');
const  feedbackFunc = require('../controllers/feedbackController');
const router = express.Router();

router.post('/api/feedback', feedbackFunc);
module.exports = router;