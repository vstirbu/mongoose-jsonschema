var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  prop: {
    type: String
  },
  required: {
    type: String,
    required: true
  }
});

var model = mongoose.model('Simple', schema);

module.exports = model;
