var MongoClient = require('mongodb').MongoClient
    , assert = require('assert') // для юнит-тестирования модуль
    , format = require('util').format
    , sync = require('sync');

// Connection URL
var url = 'mongodb://localhost:27017/engin';
// Use connect method to connect to the Server

MongoClient.connect(url, function(err, db) {
    if (err) throw err;

    assert.equal(null, err);

    console.log("Connected correctly to server");

    db.listCollections({name: 'admins'})
        .next(function(err, collinfo) {
            if (collinfo) {
                // The collection exists
            }
            else{
                db.createCollection('admins', {strict:true}, function(err, collection){
                    if (err) throw err;

                    assert.equal(null, err);

                    console.log(collection + "created succesfull");

                    collection.insertMany([
                        {
                            name : 'admin',
                            passHash: '3r4f3r34',
                            roleIds: [
                                '45645t45tr4g456456456',
                                '3453452222'
                            ]
                        },
                        {
                            name : 'readAdmin',
                            passHash: '0tr67867',
                            roleIds: [
                                '3453452222'
                            ]}
                    ], function(err, result) {
                        assert.equal(err, null);
                        assert.equal(2, result.result.n);
                        assert.equal(2, result.ops.length);

                        console.log("Inserted " + result.result.n + " documents into the document collection");
                    });
                });

                db.createCollection('roles', {strict:true}, function(err, collection){
                    if (err) throw err;

                    assert.equal(null, err);

                    console.log(collection + "created succesfull");

                    collection.insertMany([
                        {
                            rights : ['0100']
                        },
                        {
                            rights : ['1110']
                        }
                    ], function(err, result) {
                        assert.equal(err, null);
                        assert.equal(2, result.result.n);
                        assert.equal(2, result.ops.length);

                        console.log("Inserted " + result.result.n + " documents into the document collection");
                    });
                });
            }
        });


    db.close();
});