
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , mongoose = require('mongoose')

var db = mongoose.connect("mongodb://localhost:27017/nodepad")
  , document = require('./models.js').Document(db)

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('test', function(){
  app.use(express.logger());
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
  db = mongoose.connect('mongodb://localhost/nodepad');
});

app.configure('development', function(){
  app.use(express.logger());
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.logger());
  app.use(express.errorHandler());
  db = mongoose.connect('mongodb://mongohqurlgoeshere/nodepad');
});

// Routes

// define route functions here. These functions are referenced
// from route definitions below.

var welcome = require('./routes/welcome.js').welcome
  , list = require('./routes/list.js').list
  , create = require('./routes/create.js').create
  , read = require('./routes/read.js').read
  , update = require('./routes/update.js').update
  , del = require('./routes/del.js').del

// List
app.get('/documents.:format?', list);

// Create
app.post('/documents.:format?', create);

// Read
app.get('/documents/:id.:format?', read);

// Update
app.put('/documents/:id.:format?', update);

// Delete
app.del('/documents/:id.:format?', del);

app.get('/welcome/:name?', welcome);

app.get('/', routes.index);

if(!module.parent){
	app.listen(3000);
	console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
}

