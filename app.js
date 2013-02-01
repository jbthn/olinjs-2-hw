
/**
 * Module dependencies.
 */

var express = require('express')
  , mongoose = require('mongoose')
  , routes = require('./routes')
  , cats = require('./routes/cats')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/', routes.index);
app.get('/cats', cats.cats);
app.get('/cats/new', cats.add);
app.get('/cats/color/:col', cats.color);
app.get('/cats/delete/old', cats.del);

var catSchema = new mongoose.Schema({
  name: String,
  colors: [String],
  age: { type: Number, min: 0 }
});

mongoose.model('Cat', catSchema);

// from https://devcenter.heroku.com/articles/nodejs-mongoose
// Connect to db, localhost if no ENV vars set
var uristring = 
  process.env.MONGODB_URI || 
  process.env.MONGOLAB_URI || 
  'localhost';

// Ensure safe writes
var mongoOptions = { db: { safe: true }};

// Connect
mongoose.connect(uristring, mongoOptions, function (err, res) {
  if (err) { 
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log ('Succeeded connecting to: ' + uristring);
  }
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

// var test = new Cat ({
//   name: 'test',
//   age: 65,
//   colors: ['brown', 'black']
// });
// test.save(function (err) {if (err) console.log ('Error on save!')});
