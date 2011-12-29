var mongoose = require('mongoose')
var DocumentSchema = new mongoose.Schema({
	  title: { type: String, index: true }
	, data: String
	, tags: String
	, date: Date
});

var DocModel = mongoose.model('Document', DocumentSchema)

exports.Document = function(db){
	return db.model('Document');
}