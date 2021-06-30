const mongoose = require('mongoose');

const URI = process.env.CONNECTION_STRING;

const connectionDb = async () => {
  await mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log('db connected...!');
};

const db = mongoose.connection;

db.on('error', (err) => {
  console.log(err);
});

db.once('open', () => {
  console.log('Database connection established');
});

module.exports = connectionDb;
