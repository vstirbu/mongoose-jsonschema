# Mongoose schema to JSON schema and back

[![npm version](https://badge.fury.io/js/mongoose-jsonschema.svg)](https://badge.fury.io/js/mongoose-jsonschema)
[![Build Status](https://travis-ci.org/vstirbu/mongoose-jsonschema.svg?branch=master)](https://travis-ci.org/vstirbu/mongoose-jsonschema)
[![Coverage Status](https://coveralls.io/repos/github/vstirbu/mongoose-jsonschema/badge.svg?branch=master)](https://coveralls.io/github/vstirbu/mongoose-jsonschema?branch=master)

## Motivation

This library represents a practical approach to convert the schemas used in a Mongoose model so that they can conveyed to hypermedia clients that interact with the web service.

## Installation

```
npm install mongoose-jsonschema
```

## Usage

### Adding hypermedia controls in the Mongoose model

A Mongoose model should be augmented so that the schema options contains a JSON tranformation function:

```javascript
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	...
}, {
	toJSON: {
		transform: function (doc, ret, options) {
			ret._links = {
				describedBy: {
					href: '/meta/schemas/example'
				}
			};
		}
	}
});

var model = mongoose.model('Example', schema);
```

Now, every time the model is converted to JSON, the representation will convey to the client the link that describes the schema of the document. The representation uses the [HAL](http://stateless.co/hal_specification.html) convention but other san be used as well.

### Exposing the schemas

```javascript
var express =  require('express'),
		mongoose = require('mongoose'),
		jsonSchema = require('mongoose-jsonschema').modelToJSONSchema;

var app = express();

app.get('/meta/schemas/:schema', function (req, res) {
	res.set({
		'Content-Type': 'application/schema+json'
	}).send(jsonSchema(mongoose.model(req.params.schema)).end();
});
```

## API

### modelToJSONSchema(model, options) ⇒ <code>Object</code> ⏏
**Kind**: Exported function  
**Returns**: <code>Object</code> - JSONSchema  

| Param | Type | Description |
| --- | --- | --- |
| model | <code>object</code> | Mongoose model to be converted |
| options | <code>object</code> | Options for customising model conversion |
| options.reserved | <code>Array.&lt;string&gt;</code> &#124; <code>object</code> | Model properties found in the array are not included in the schema or map of properties to be converted |
| options.reserved.property | <code>boolean</code> | Include/do not include model `property` into schema |
