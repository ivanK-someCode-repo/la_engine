const MongoClient = require('mongodb').MongoClient;
const Db = require('mongodb').Db;
const Server = require('mongodb').Server;
const assert = require('assert'); // unit tests����� ������
const async = require('async');

// Connection URL
var url = 'mongodb://localhost:27017';
// Use connect method to connect to the Server


var db = new Db('test1', new Server('localhost', 27017));

console.log(db);
db.open(function(err, db) {
    var collection = db.collection("simple_document_insert_collection_no_safe");
// Insert a single document
    collection.insert({hello: 'world_no_safe'});

    db.dropDatabase(function(err, result) {

        console.log(err);

        db.dropDatabase(function(err, result) {

            db = new Db('test1', new Server('localhost', 27017));

            var collection1 = db.collection("simple_document_insert_collection_no_safe");

            collection1.insert({hello: 'world_no_safe'});


            console.log(collection1);
        })
    })


})


console.log(db);

/*
async.waterfall([
    function(callback) {
        MongoClient.connect(url, callback(err, db));
    },
    function(db, callback) {

        console.log(db);

        db.dropDatabase(callback(err, db));
    },
    function(db, callback) {

        console.log(db);

       db.createDatabase(callback(err, db));
    },
    function(arg1, arg2, callback) {

        MongoClient.connecton.dropDatabase(function(err){

        });

        callback(null, 'three');
    },
    function(arg1, callback) {
        // arg1 now equals 'three'
        db.close();

        callback(null, 'done');
    }
], function (err, result) {
    if (err) throw err;

    assert.equal(null, err);

    db.close();

    console.log("all done;");
});
    */