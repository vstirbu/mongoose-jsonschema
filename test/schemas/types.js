var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	arrayProp: Array,
	array2Prop: [{
		type: Object
	}],
	booleanProp: Boolean,
	dateProp: Date,
	numberProp: Number,
	objectProp: Object,
  stringProp: String
});

var model = mongoose.model('Types', schema);

module.exports = model;