var Party = require('../models/party').Party;

module.exports = function(req, res, next) {
	req.party = res.locals.party = null;

	Party.findOne({title: req.params.title}, function(err, party) {
		if(err) return next(err);

		req.party = res.locals.party = party;
		next();
	});
}