declare module MongooseJsonSchema {
    /**
     * @alias module:mongoose-jsonschema
     * @param   {object}  model     Mongoose model to be converted
     * @param   {object}  options   Options for customising model conversion
     * @param   {string[]|object} options.reserved - Model properties found in the array are not included in the schema or map of properties to be converted
     * @param   {boolean} options.reserved.property - Include/do not include model `property` into schema
     * @returns {Object}  JSONSchema
     */
    function modelToJSONSchema(model, options): Object;
}
export = MongooseJsonSchema;