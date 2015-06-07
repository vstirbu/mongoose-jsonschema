/// <reference path="../typings/chai/chai.d.ts"/>
/// <reference path="../typings/mocha/mocha.d.ts"/>
/// <reference path="../typings/mongoose/mongoose.d.ts"/>

var chai = require('chai'),
    mongoose = require('mongoose'),
    
    lib = require('../'),
    
    expect = chai.expect;

describe('modelToJSONSchema', function () {
  it('should convert supported types', function () {
    var jsonSchema = lib.modelToJSONSchema(mongoose.model('Types'));
    
    expect(jsonSchema.properties.arrayProp.type).to.be.equal('array');
    expect(jsonSchema.properties.array2Prop.type).to.be.equal('array');
    
    expect(jsonSchema.properties.booleanProp.type).to.be.equal('boolean');
    
    expect(jsonSchema.properties.numberProp.type).to.be.equal('number');
    
    expect(jsonSchema.properties.objectProp.type).to.be.equal('object');
    
    expect(jsonSchema.properties.stringProp.type).to.be.equal('string');
    
    expect(jsonSchema.properties.dateProp.type).to.be.equal('string');
    expect(jsonSchema.properties.dateProp.format).to.be.equal('date-time');
  });
  
  it('should convert constraints', function (done) {
    var jsonSchema = lib.modelToJSONSchema(mongoose.model('Constraints'));
    
    expect(jsonSchema.properties.prop.type).to.be.equal('string');
    
    expect(jsonSchema.properties.required.type).to.be.equal('string');
    expect(jsonSchema.required).to.be.deep.equal(['required']);
    
    expect(jsonSchema.properties.enumed.type).to.be.equal('string');
    expect(jsonSchema.properties.enumed.enum).to.be.deep.equal(['one', 'two']);
    
    done();
  });
});
