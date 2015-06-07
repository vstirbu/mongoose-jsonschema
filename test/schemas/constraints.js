var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  simpleProp: {
    type: String
  },
  requiredProp: {
    type: String,
    required: true
  },
  enumedProp: {
    type: String,
    enum: ['one', 'two']
  },
  defaultProp: {
    type: String,
    default: 'default-value'
  }
});

var model = mongoose.model('Constraints', schema);

module.exports = model;
