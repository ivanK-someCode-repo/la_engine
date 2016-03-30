'use strict';

var pg = require('pg');

var connectionString = 'postgres://localhost:5432/engin';//process.env.DATABASE_URL || 'postgres://localhost:5432/todo';

var client = new pg.Client(connectionString);

client.connect();

//http://mherman.org/blog/2015/02/12/postgresql-and-nodejs/#.VuwLPvl96Uk
//https://github.com/brianc/node-postgres

var query1 = client.query();

var query = client.query('CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');

query.on('end', function() {
    client.end();
});