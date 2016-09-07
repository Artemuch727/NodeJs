var Party = require('../models/party').Party;

exports.get = function(req, res, next) {
	 Party.find({}, function(err, parties) {
	 	if (err) return next(err);
	 	res.render('frontpage');
	 });
 
};