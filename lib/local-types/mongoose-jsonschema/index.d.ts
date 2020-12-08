/// <reference path="../../index.js" />
import * as mongoose from "mongoose";

/**
 * @alias module:mongoose-jsonschema
 */
declare module MongooseJsonSchema {
    /**
     * @param   {mongoose.Model<any>}  model     Mongoose model to be converted
     * @param   {any}  options   Options for customising model conversion
     * @param   {string[]|object} options.reserved - Model properties found in the array are not included in the schema or map of properties to be converted
     * @param   {boolean} options.reserved.property - Include/do not include model `property` into schema
     * @returns {any}  JSONSchema
     */
    export function modelToJSONSchema(model: mongoose.Model<any>, options: any): any;
    /**
     * @param   {mongoose.Model<any>}  model     Mongoose model to be converted
     * @returns {any}  JSONSchema
     */
    export function modelToJSONSchema(model: mongoose.Model<any>): any;
}

export default MongooseJsonSchema;