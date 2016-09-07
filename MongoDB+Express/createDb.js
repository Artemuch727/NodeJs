
var mongoose = require('./libs/mongoose');
var async = require('async');

function open(callback) {
	mongoose.connection.on('open', callback);
};

function dropDatabase(callback) {
	var db = mongoose.connection.db;
	db.dropDatabase(callback);
};

function requireModels(callback){
	require('./models/user');
	require('./models/party');
	async.each(Object.keys(mongoose.models), function(modelName, callback) {
		mongoose.models[modelName].ensureIndexes(callback);
	}, callback);
};

function createUsers(callback) {
	
	var users = [
					{username: 'Вася', password: 'SuperVasya'},
					{username: 'Иван', password: 'SuperIvan'},
					{username: 'Петр', password: 'SuperPetr'}
				];

	async.each(users, function(userData, callback){
		var user = new mongoose.models.User(userData);
		user.save(callback);
	}, callback);

};

function createParty(callback) {
	
	var party = [
					{title: 'Кино', description: 'Идем смотреть кино в кинотеатр "CinemaPark" в ТЦ "Космос"'},
					{title: 'Боулинг', description: 'Идем играть в боулинг в ТЦ "Москва"'},
					{title: 'Караоке', description: 'Идем петь и танцевать в Караоке "4 Комнаты"'},
					{title: 'Прогулка', description: 'Идем гулять по вечернему Ставрополю'},
					{title: 'Рафтинг', description: 'Едем сплавляться на лодках по горным рекам Домбая'}
				];

	async.each(party, function(partyData, callback){
		var party = new mongoose.models.Party(partyData);
		party.save(callback);
	}, callback);

};

async.series([
		open,
		dropDatabase,
		requireModels,
		createUsers,
		createParty
	], function(err) {
		console.log(err);
		mongoose.disconnect();
	})


 