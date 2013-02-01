
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'olin.js HW 2' });
};