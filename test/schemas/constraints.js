var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  prop: {
    type: String
  },
  required: {
    type: String,
    required: true
  },
  enumed: {
    type: String,
    enum: ['one', 'two']
  }
});

var model = mongoose.model('Constraints', schema);

module.exports = model;
