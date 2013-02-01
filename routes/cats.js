
/*
 * GET and POST cat-related info.
 */

var mongoose = require('mongoose');
var Cat = mongoose.model('Cat');
//http://stackoverflow.com/questions/10081611/mongoose-schema-creation

exports.cats = function(req, res){
  	Cat
  		.find()
  		.sort({age: 'asc'})
  		.exec(function (err, cat) {
  			if (err) return handleError(err);
  			res.render('cats', { title: 'Cats', db: cat});
  		});
};
//http://mongoosejs.com/docs/api.html#document_Document-isSelected

exports.new = function(req, res){
  	res.render('newcat', { title: 'Create a new cat' });
};

exports.add = function(req, res){
	new Cat ({
		name: req.body.name,
		colors: req.body.cols,
		age: req.body.age})
		.save(function (err) {
			if (err) return handleError(err);
			res.redirect('cats');
		});
}

exports.del = function(req, res){
	Cat
		.findOneAndRemove()
		.sort({age: 'desc'})
		.exec(function (err) {
			if (err) return handleError(err);
			res.redirect('cats');
		});
}

exports.color = function(req, res) {
	Cat
		.find({colors: req.params.col})
		.exec(function (err, colCats) {
			if (err) return handleError(err);
			res.render('color', { title: 'Cats', cats: colCats });
		});
}
