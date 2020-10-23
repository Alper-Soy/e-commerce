const express = require('express');
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

// controller
const { create, read } = require('../controllers/product');

// routes
router.get('/products', read);
router.post('/product', authCheck, adminCheck, create);

module.exports = router;
