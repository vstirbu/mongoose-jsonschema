# Mongoose schema to JSON schema and back

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
