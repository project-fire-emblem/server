const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: { type: String, required: true },
});

const Item = mongoose.model('item', schema);

module.exports = Item;
