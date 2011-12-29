var mongoose = require('mongoose')
  , db = mongoose.connect("mongodb://127.0.0.1:27017/nodepad")
  , document = require('../models.js').Document(db);


exports.create = function(req, res){
	var doc = new document(req.body['document']);
	doc.save(function(err){
		switch (req.params.format) {
			case 'json':
				res.send(doc);
				break;
			default:
				res.redirect('/documents.json');
		}
	});
};

