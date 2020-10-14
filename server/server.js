const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const { mongoConnection } = require('./database/mongoDB');
require('dotenv').config();

mongoConnection();

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '2mb' }));
app.use(cors());

app.get('/api', (req, res) => {
  res.json({ data: 'Hi there!' });
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
