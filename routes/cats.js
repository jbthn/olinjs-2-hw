
/*
 * GET cats listing.
 */

var mongoose = require('mongoose');
var Cat = mongoose.model('Cat');

exports.cats = function(req, res){
  	//res.send("list of cats");
  	res.render('cats', { title: 'Cats' });
};

exports.add = function(req, res){
  	res.render('newCat');
};

exports.del = function(req, res){
  	res.send("deleting oldest");
};

exports.color = function(req, res) {
  //req.params.col;
  res.send("colors of cat");
}
