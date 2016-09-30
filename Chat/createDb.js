/**
 * Created by User on 30.09.2016.
 */
var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/chat';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    var collection = db.collection('test_insert');
    collection.remove({}, function (err, affected) {
        if (err) throw  err;
        console.log('Removed');

        collection.insert({a:2}, function (err, docs) {
                if (err) throw  err;
                console.log('Added');
        });
    });


    db.close();
});