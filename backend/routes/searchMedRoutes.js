const express = require('express');
const  searchMedicine = require('../controllers/searchMedController');
const router = express.Router();

router.post('/api/medicines/search', searchMedicine);

module.exports = router;
