var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	arrayProp: Array,
	arrayTypedProp: [{
		type: Object
	}],
	mixedProp: {type: mongoose.Schema.Types.Mixed},
	objectId: {type: mongoose.Schema.Types.ObjectId},
	booleanProp: Boolean,
	dateProp: Date,
	numberProp: Number,
	objectProp: Object,
  stringProp: String
});

var model = mongoose.model('Types', schema);

module.exports = model;
