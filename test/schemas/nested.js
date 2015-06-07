var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  root: {
		nestedProp: String
	}
});

var model = mongoose.model('Nested', schema);

module.exports = model;
