var Party = require('../models/party').Party;

module.exports = function(req, res, next) {
	req.parties = res.locals.parties = null;

	Party.find({}, function(err, parties) {
		if(err) return next(err);

		req.parties = res.locals.parties = parties;
		next();
	});
}