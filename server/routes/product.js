const express = require('express');
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

// controller
const { create, listAll } = require('../controllers/product');

// routes
router.get('/products/:count', listAll);
router.post('/product', authCheck, adminCheck, create);

module.exports = router;
