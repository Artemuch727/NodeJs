var crypto = require('crypto');
var async = require('async');

var mongoose = require('../libs/mongoose'),
	Schema = mongoose.Schema;

var schema = new Schema({
	title: {
		type: String,
		required: true
	},
	author: {
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

schema.statics.add = function(title, description, author, callback) {
		var Party = this;
		var party = new Party({title: title, description: description, author: author});
			party.save(function(err) {
				if (err) return next(err)
				callback(null, party);
			})
}

schema.statics.remove = function(title,username,  callback) {
			var Party = this;
			console.log(title)		 ;
			//Party.findOneAndRemove({ title: title });
			// Party.findOneAndRemove({ title: title, author: username }, function(err, party) {
			// 	if (err) return next(err)
			// 	callback(null, party);
			// })
			Party.findByIdAndRemove(title, function(err, party) {
				if (err) return next(err)
				callback(null, party);
			})
}


schema.statics.guestActions = function(id, username, actionType, callback) {
		var Party = this;
		if (actionType == 'ADD'){
			Party.find({"_id": id,"guests": username}, function(err, user){
				if (user.length == 0 ){
					Party.findByIdAndUpdate(id, 
    						{ $push : {"guests" : username}} , function(err){
    							callback(err);
    						});
				} else {callback(err);}
			})					
		} else {
			Party.find({"id": id,"guests": username}, function(err, user){
				if (user.length > 0 ){
					Party.findByIdAndUpdate(id, 
    						{ $pull : {"guests" : username}} , function(err){
    							callback(err);
    						});	
				} else {callback(err);}
			})		

		
		}
		
}
 

exports.Party = mongoose.model('Party',schema);
