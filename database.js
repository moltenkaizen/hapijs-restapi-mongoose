const Mongoose = require('mongoose');
Mongoose.Promise = global.Promise;

Mongoose.connect('mongodb://localhost/hapijs-mongoose-restapi', {
  useMongoClient: true,
});

const db = Mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
  console.log('Connection to db successful!');
});

exports.db = db;