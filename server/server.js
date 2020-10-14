const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const { readdirSync } = require('fs');
require('dotenv').config();

const { mongoConnection } = require('./database/mongoDB');

mongoConnection();

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '2mb' }));
app.use(cors());

readdirSync('./routes').map((route) =>
  app.use('/api', require(`./routes/${route}`))
);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
