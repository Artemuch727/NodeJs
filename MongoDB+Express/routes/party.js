var Party = require('../models/party').Party;
var mongoose = require('../libs/mongoose');

exports.get = function(req, res) {
	req.party = res.locals.party = null;
	Party.findOne({title: req.params.title}, function(err, party) {
		if(err) return next(err);
		res.render('party', {party: party});
	});
    
    
};

exports.post = function(req, res, next) {
	var actionType = '';
	if (req.body.accepted) 
			{actionType = 'ADD'}
	else {actionType = 'DELETE'}
	Party.guestActions(req.body.party_title, req.user.username,actionType, function(err) {
		if(err) return next(err);
		res.send({});
	});

};

