const express = require('express');
const  getMedList = require('../controllers/getMedList');
const router = express.Router();

router.get('/api/medicines/getList', getMedList);
module.exports = router;