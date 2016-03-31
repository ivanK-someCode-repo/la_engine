'use strict';

var pg = require('pg');

var connectionString = 'postgres://postgres:ParPar52@localhost:5432/engin';//process.env.DATABASE_URL || 'postgres://localhost:5432/todo';

var client = new pg.Client(connectionString);

client.connect();

var query = client.query("SELECT name FROM tab1;");

query.on('end', function() {
    client.end();
});


var pg = require('pg');
var async = require('async');
var log = require('./libs/log')(module);

var connectionString = 'postgres://postgres:ParPar52@localhost:5432/engin';//process.env.DATABASE_URL || 'postgres://localhost:5432/todo';

var client = new pg.Client(connectionString);

client.connect();

//http://mherman.org/blog/2015/02/12/postgresql-and-nodejs/#.VuwLPvl96Uk
//https://github.com/brianc/node-postgres


async.series([
        client.query("CREATE TABLE IF NOT EXISTS Items;"),
        client.query("ALTER TABLE Items ADD COLUMN Id SERIAL;"),
        client.query("ALTER TABLE Items ADD COLUMN Name varchar(4000);"),
        client.query("ALTER TABLE Items ADD COLUMN Cost number(28,6);")
    ],
    function(err, results){
        if (err)
            log.info(err.stack);

        log.info(results);
    });


var query = client.query("INSERT INTO tab1 VALUES('1', 'n');");

query.on('end', function() {
    client.end();
});