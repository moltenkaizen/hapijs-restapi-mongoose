const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WolfSchema = new Schema({
  name: String
});

module.exports = mongoose.model('Wolf', WolfSchema);