var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  });

schema
    .virtual('stringProp')
    .get(function () {
        return 'string';
    });
schema
    .virtual('numberProp')
    .get(function() {
        return 0;
    });


var model = mongoose.model('VirtualFunction', schema);

module.exports = model;
