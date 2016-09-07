var User = require('../models/user').User;
var Party = require('../models/party').Party;
var mongoose = require('../libs/mongoose');

exports.get = function(req, res) {
  res.render('room')
};

exports.post = function(req, res, next) {
	var party_title = req.body.party_title;
	var party_description = req.body.party_description;
	var author = req.body.party_author;

		Party.add(party_title, party_description, author, function(err, party) {
		if(err) return next(err);	
		res.send({});
	});
};

