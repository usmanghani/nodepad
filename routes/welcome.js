exports.welcome = function(req, res){
	res.render('welcome', {title: 'Welcome', name: req.params.name})
}