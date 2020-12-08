var mongoose = require('mongoose');

var addressSchema = new mongoose.Schema(
    {
        street_address: {
            type: String,
            required: true
        },
        locality: {
            type: String,
            required: true
        },
        postal_code: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
    }
)

var schema = new mongoose.Schema(
    {
      name: {
            type: String,
            required: true
      },
      address: {
          type: addressSchema,
          required: true
      }
    }
);

var model = mongoose.model('SchemaInSchema', schema);

module.exports = model;
