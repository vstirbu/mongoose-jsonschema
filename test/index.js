/// <reference path="../typings/chai/chai.d.ts"/>
/// <reference path="../typings/mocha/mocha.d.ts"/>
/// <reference path="../typings/mongoose/mongoose.d.ts"/>

var chai = require('chai'),
    mongoose = require('mongoose'),
    
    lib = require('../'),
    
    expect = chai.expect;

describe('modelToJSONSchema', function () {
  it('should convert Simple model to json schema', function (done) {
    var jsonSchema = lib.modelToJSONSchema(mongoose.model('Simple'));
    
    //expect(jsonSchema.properties.prop).to.exist;
    expect(jsonSchema.properties.prop.type).to.be.equal('string');
    expect(jsonSchema.properties.required.type).to.be.equal('string');
    
    expect(jsonSchema.required).to.be.deep.equal(['required']);
    done();
  });
});
