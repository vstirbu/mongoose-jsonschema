module.exports = {
  modelToJSONSchema: modelToJSONSchema
};

function modelToJSONSchema(model, options) {
  'use strict';
  
  var schema =  model.schema,
      reserved = ['_id', '__v'],
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
    reserved = reserved.concat(options.reserved);
  }
  
  if (result.required.length === 0) {
    delete result.required;
  }
  
  schema.eachPath(function (path) {
    if (reserved.indexOf(path) === -1) {
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
        default:
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
