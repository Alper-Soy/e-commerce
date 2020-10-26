const express = require('express');
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

// controller
const { create, listAll, remove, read } = require('../controllers/product');

// routes
router.get('/products/:count', listAll);
router.get('/product/:slug', read);
router.post('/product', authCheck, adminCheck, create);
router.delete('/product/:slug', authCheck, adminCheck, remove);

module.exports = router;
