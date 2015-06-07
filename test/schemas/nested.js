var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  root: {
		nestedProp: {
			type: String,
			required: true
		}
	}
});

var model = mongoose.model('Nested', schema);

module.exports = model;
