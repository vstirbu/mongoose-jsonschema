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

    expect(jsonSchema.properties.arrayTypedProp.type).to.be.equal('array');
    expect(jsonSchema.properties.arrayTypedProp.items).to.be.deep.equal({
      type: 'object'
    });

    expect(jsonSchema.properties.mixedProp.type).to.be.equal('object');

    expect(jsonSchema.properties.objectId.type).to.be.equal('string');

    expect(jsonSchema.properties.booleanProp.type).to.be.equal('boolean');

    expect(jsonSchema.properties.numberProp.type).to.be.equal('number');

    expect(jsonSchema.properties.objectProp.type).to.be.equal('object');

    expect(jsonSchema.properties.stringProp.type).to.be.equal('string');

    expect(jsonSchema.properties.dateProp.type).to.be.equal('string');
    expect(jsonSchema.properties.dateProp.format).to.be.equal('date-time');
  });

  it('should convert constraints', function (done) {
    var jsonSchema = lib.modelToJSONSchema(mongoose.model('Constraints'));

    expect(jsonSchema.properties.simpleProp).to.exist;

    expect(jsonSchema.properties.requiredProp).to.exist;
    expect(jsonSchema.required).to.be.deep.equal(['requiredProp']);

    expect(jsonSchema.properties.enumedProp).to.exist;
    expect(jsonSchema.properties.enumedProp.enum).to.be.deep.equal(['one', 'two']);

    expect(jsonSchema.properties.defaultProp).to.exist;
    expect(jsonSchema.properties.defaultProp.default).to.be.equal('default-value');

    done();
  });

  it('should convert nested schema', function () {
    var jsonSchema = lib.modelToJSONSchema(mongoose.model('Nested'));

    expect(jsonSchema.properties.root.properties).to.exist;
    expect(jsonSchema.properties.root.properties.nestedProp).to.exist;
    expect(jsonSchema.properties.root.required).to.be.deep.equal(['nestedProp']);
  });

  it('should convert nested schema object', function () {
    var jsonSchema = lib.modelToJSONSchema(mongoose.model('SchemaInSchema'));

    expect(jsonSchema.properties.name).to.exist;
    expect(jsonSchema.properties.address).to.exist;
    expect(jsonSchema.required).to.be.deep.equal(['address', 'name']);
    expect(jsonSchema.properties.address.properties.street_address).to.exist;
    expect(jsonSchema.properties.address.properties.postal_code).to.exist;
    expect(jsonSchema.properties.address.properties.locality).to.exist;
    expect(jsonSchema.properties.address.properties.country).to.exist;
    expect(jsonSchema.properties.address.required).to.be.deep.equal(['country', 'postal_code', 'locality', 'street_address']);
  });

  it('should convert virtual properties (such as functions..)', function () {
    var jsonSchema = lib.modelToJSONSchema(mongoose.model('VirtualFunction'));

    expect(jsonSchema.properties.stringProp).to.exist;
    expect(jsonSchema.properties.stringProp.type).to.be.equal('string');

    expect(jsonSchema.properties.numberProp).to.exist;
    expect(jsonSchema.properties.numberProp.type).to.be.equal('number');
  });

  describe('options', function(){
    describe('reserved', function(){
      it('should filter out fields provided as an array', function(){
        var jsonSchema = lib.modelToJSONSchema(mongoose.model('Types'), {
          reserved: ['stringProp']
        });
        expect(jsonSchema.properties.stringProp).to.be.undefined;
      });
      it('should filter out fields as defined in a flag map', function(){
        var jsonSchema = lib.modelToJSONSchema(mongoose.model('Types'), {
          reserved: {
            stringProp: true,
            _id: false
          }
        });
        expect(jsonSchema.properties.stringProp).to.be.undefined;
        expect(jsonSchema.properties._id).to.exist;
      });
    })
  });
});
