const express = require('express');

const router = express.Router();

router.get('/user', (req, res) => {
  res.json({ data: 'Hi user!' });
});

module.exports = router;
