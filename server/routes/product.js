const express = require('express');
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

// controller
const {
  create,
  listAll,
  remove,
  read,
  update,
} = require('../controllers/product');

// routes
router.get('/products/:count', listAll);
router.get('/product/:slug', read);
router.post('/product', authCheck, adminCheck, create);
router.delete('/product/:slug', authCheck, adminCheck, remove);
router.put("/product/:slug",authCheck,adminCheck,update)

module.exports = router;
