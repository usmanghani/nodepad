var mongoose = require('mongoose')
  , db = mongoose.connect("mongodb://127.0.0.1:27017/nodepad")
  , document = require('../models.js').Document(db);


exports.list = function(req, res){
	document.find({}, function(err, docs){
			switch(req.params.format){
				case 'json':
					res.send(docs);
					break;
				default:
					res.render('list', { list: docs });
			}
		});
};