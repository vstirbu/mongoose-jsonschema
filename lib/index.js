module.exports = {
  modelToJSONSchema: modelToJSONSchema
};

function modelToJSONSchema(model) {
  var schema =  model.schema,
      reserved = ['_id', '__v', '_type'],
      result = {
        $schema: 'http://json-schema.org/schema#',
        title: model.modelName,
        type: 'object',
        properties: {},
        required: schema.requiredPaths()
      };

  schema.eachPath(function (path) {
    if (reserved.indexOf(path) === -1) {
      var property = {};

      var frags = path.split('.'),
          name = frags.pop();

      //console.log(name, frags);

      switch (schema.path(path).options.type.name) {
        case 'Array':
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
          if (Array.isArray(schema.path(path).options.type)) {
            property.type = 'array';
          }
      }

      if (schema.path(path).options.enum) {
        property.enum = schema.path(path).options.enum;
      }

      // console.log(schema.path(path));
      var properties = result.properties;
      frags.forEach(function (frag) {
        properties[frag] = properties[frag] || {
          title: frag,
          properties: {}
        };

        properties = properties[frag].properties;
      });

      properties[name] = property;
    }
  });

  return result;
}
