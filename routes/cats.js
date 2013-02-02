
/*
 * GET and POST cat-related info.
 */

var mongoose = require('mongoose');
var Cat = mongoose.model('Cat');
//http://stackoverflow.com/questions/10081611/mongoose-schema-creation

exports.cats = function(req, res){
  	Cat
  		.find()
  		.select('name age colors')
  		.sort({age: 'asc'})
  		.exec(function (err, cats) {
  			if (err) return handleError(err);
  			res.render('cats', { title: 'List of all cats', cats: cats, color:''});
  		});
};
//http://mongoosejs.com/docs/api.html#document_Document-isSelected

exports.new = function(req, res){
  	res.render('newcat', { title: 'Create a new cat' });
};

exports.add = function(req, res){
	var kitty = new Cat ({
		name: req.body.name,
		age: req.body.age})
	var cols = req.body.colors
	cols = cols.split(/[\s,]+/);
	for (var i=0; i<cols.length; i++){ 
		kitty.colors.push(cols[i]);
	}
		kitty.save(function (err) {
			if (err) return handleError(err);
			res.redirect('cats');
		});
}

exports.del = function(req, res) {
	Cat
		.findOneAndRemove()
		.sort({age: 'desc'})
		.exec(function (err) {
			if (err) return handleError(err);
			res.redirect('cats');
		});
}

exports.color = function(req, res) {
	var title = 'List of all ' + req.params.colors + ' cats';
	Cat
		.find({colors: req.params.colors})
		.select('name age colors')
		.sort({age: 'asc'})
		.exec(function (err, colCats) {
			if (err) return handleError(err);
			res.render('cats', { title: title,
			cats: colCats, color: req.params.colors});
		});
}
