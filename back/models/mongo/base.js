'use strict';

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert'); // unit tests
const async = require('async');
const config = require('../../config');

// Connection URL
const connString = config.get('postgreConnectionString');

let mongoBasePromise = new Promise(function(resolve, reject) {
    MongoClient.connect(connString, function(err, db) {
        if (assert.equal(null, err)){
            console.log("Connected correctly to server");
            resolve(db);
        }
        else{
            reject(err);
        }
    });
});

module.exports = mongoBasePromise;

/*
async.waterfall([
    function(callback) {
        MongoClient.connect(connString, callback(err, db));
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