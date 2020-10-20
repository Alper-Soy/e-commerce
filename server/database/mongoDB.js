const mongoose = require('mongoose');
require('dotenv').config();

exports.mongoConnection = () => {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

  mongoose.connection.on('error', (err) => {
    console.log(`DB connection error: ${err.message}`);
  });

  mongoose.connection.once('open', () => {
    console.log('DB connected');
  });
};
