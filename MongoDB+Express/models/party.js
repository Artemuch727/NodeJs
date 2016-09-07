var crypto = require('crypto');
var async = require('async');

var mongoose = require('../libs/mongoose'),
	Schema = mongoose.Schema;

var schema = new Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	guests: {
		type: [String]
	},
	created: {
		type: Date,
		default: Date.now
	}
});

schema.statics.add = function(title, description, callback) {
		var Party = this;
		var party = new Party({title: title, description: description});
			party.save(function(err) {
				if (err) return next(err)
				callback(null, party);
			})
}


schema.statics.guestActions = function(title, username, actionType, callback) {
		var Party = this;
		if (actionType == 'ADD'){
			Party.find({"title": title,"guests": username}, function(err, user){
				if (user.length == 0 ){
					Party.findOneAndUpdate({title: title}, 
    						{ $push : {"guests" : username}} , function(err){
    							callback(err);
    						});
				} else {callback(err);}
			})					
		} else {
			Party.find({"title": title,"guests": username}, function(err, user){
				if (user.length > 0 ){
					Party.findOneAndUpdate({title: title}, 
    						{ $pull : {"guests" : username}} , function(err){
    							callback(err);
    						});	
				} else {callback(err);}
			})		

		
		}
		
}
 

exports.Party = mongoose.model('Party',schema);
