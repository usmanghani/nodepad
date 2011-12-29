var mongoose = require('mongoose')

var db = mongoose.createConnection('mongodb://localhost/nodepad');

var DocumentSchema = new mongoose.Schema({
	  id: mongoose.Schema.ObjectId
	, title: { type: String, index: true }
	, data: String
	, tags: String
	, date: Date
});

var DocModel = db.model('Document', DocumentSchema)

DocModel.find({}, function(err, docs){
	if (err){
		console.log(err);
	}
	else {
		console.log(docs);
	}
});
