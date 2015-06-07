module.exports = {
  modelToJSONSchema: modelToJSONSchema
};

function modelToJSONSchema(model, options) {
  var schema =  model.schema,
      reserved = ['_id', '__v'],
      required = schema.requiredPaths(),
      result = {
        $schema: 'http://json-schema.org/schema#',
        title: model.modelName,
        type: 'object',
        properties: {},
        required: required.filter(function (requiredProp) {
          return requiredProp.indexOf('.') === -1;
        })
      };
  
  options = options || {};
      

  schema.eachPath(function (path) {
    if (reserved.indexOf(path) === -1) {
      var property = {};

      var frags = path.split('.'),
          name = frags.pop();
          
      //console.log(name, frags);

      switch (schema.path(path).options.type.name) {
        case 'Array': // untyped array
        case 'Boolean':
        case 'Number':
        case 'Object':
        case 'String':
          property.type = schema.path(path).options.type.name.toLowerCase();
          break;
        case 'Date':
          property.type = 'string';
          property.format = 'date-time';
          break;
        default:
          // typed array
          if (Array.isArray(schema.path(path).options.type)) {
            property.type = 'array';
            property.items = {
              type: schema.path(path).casterConstructor.name.toLowerCase()
            };
          }
      }

      if (schema.path(path).options.enum) {
        property.enum = schema.path(path).options.enum;
      }
      
      if (schema.path(path).options.default) {
        property.default = schema.path(path).options.default;
      }

      //console.log(schema.path(path));
      var properties = result.properties;
      
      frags.forEach(function (frag) {
        properties[frag] = properties[frag] || {
          title: frag,
          type: 'object',
          properties: {}
        };

        properties = properties[frag].properties;
      });

      properties[name] = property;
    }
  });

  return result;
}
