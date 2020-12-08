import * as chai from "chai";
import {ArrayNestedOfObjectsModel} from './schemas/arrayNestedOfObject';
const expect = chai.expect;
const lib = require('../');

describe('modelToJSONSchema', function () {
    
    it('should convert objects nested in arrays', function() {
        var jsonSchema = lib.modelToJSONSchema(ArrayNestedOfObjectsModel);
        
        expect(jsonSchema.properties.arrayTypedProp).to.exist;
        expect(jsonSchema.properties.arrayTypedProp.type).to.be.equal('array');
        
        expect(jsonSchema.properties.arrayTypedProp.items.properties.stringProp).to.exist;
        expect(jsonSchema.properties.arrayTypedProp.items.properties.stringProp.type).to.be.equal('string');
    });
});
