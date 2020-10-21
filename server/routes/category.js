const express = require('express');

const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

// controllers
const {
  create,
  read,
  update,
  remove,
  list,
} = require('../controllers/category');

// routes
router.get('/categories', list);
router.get('/category/:slug', authCheck, adminCheck, read);
router.post('/category', authCheck, adminCheck, create);
router.put('/category/:slug', authCheck, adminCheck, update);
router.delete('/category/:slug', authCheck, adminCheck, remove);

module.exports = router;
