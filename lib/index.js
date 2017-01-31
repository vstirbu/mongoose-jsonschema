/**
 * A module for converting Mongoose schema to JSON schema.
 * @module mongoose-jsonschema
 */

module.exports = {
  modelToJSONSchema: modelToJSONSchema
};

/**
 * @alias module:mongoose-jsonschema
 * @param   {object}  model     Mongoose model to be converted
 * @param   {object}  options   Options for customising model conversion
 * @param   {string[]|object} options.reserved - Model properties found in the array are not included in the schema or map of properties to be converted
 * @param   {boolean} options.reserved.property - Include/do not include model `property` into schema
 * @returns {Object}  JSONSchema
 */
function modelToJSONSchema(model, options) {
  'use strict';

  var schema =  model.schema,
      reserved = {
        '_id': true,
        '__v': true
      },
      result = {
        $schema: 'http://json-schema.org/schema#',
        title: model.modelName,
        type: 'object',
        properties: {},
        required: schema.requiredPaths().filter(function (requiredProp) {
          return requiredProp.indexOf('.') === -1;
        })
      };

  options = options || {};

  if (options.reserved) {
    if (Array.isArray(options.reserved)) {
      options.reserved.forEach(function(r) {
        reserved[r] = true;
      });
    } else {
      reserved = Object.assign(reserved, options.reserved);
    }
  }

  if (result.required.length === 0) {
    delete result.required;
  }

  schema.eachPath(function (path) {
    if (!reserved[path]) {
      var property = {};

      var frags = path.split('.'),
          name = frags.pop();

      var pathOptions = schema.path(path).options;

      switch (pathOptions.type.name) {
        case 'Array': // untyped array
        case 'Boolean':
        case 'Number':
        case 'Object':
        case 'String':
          property.type = pathOptions.type.name.toLowerCase();
          break;
        case 'Date':
          property.type = 'string';
          property.format = 'date-time';
          break;
        case 'ObjectId':
          property.type = 'string';
          break;
        default:
          // mixed type
          if(pathOptions.type.schemaName) {
            property.type = 'object';
          }

          // typed array
          if (Array.isArray(pathOptions.type)) {
            property.type = 'array';
            property.items = {
              type: schema.path(path).casterConstructor.name.toLowerCase()
            };
          }
      }

      if (pathOptions.enum) {
        property.enum = pathOptions.enum;
      }

      if (pathOptions.default) {
        property.default = pathOptions.default;
      }

      //console.log(schema.path(path));
      var properties = result.properties;

      frags.forEach(function (frag, index) {
        properties[frag] = properties[frag] || {
          title: frag,
          type: 'object',
          properties: {}
        };

        if (index === (frags.length - 1) && schema.requiredPaths().indexOf(frags.join('.') + '.' + name) !== -1) {
          properties[frag].required = properties[frag].required || [];
          properties[frag].required.push(name);
        }

        properties = properties[frag].properties;
      });

      properties[name] = property;
    }
  });

  return result;
}
