'use strict';

var pg = require('pg');

var connectionString = 'postgres://postgres:ParPar52@localhost:5432/engin';//process.env.DATABASE_URL || 'postgres://localhost:5432/todo';

var client = new pg.Client(connectionString);

client.connect();

//http://mherman.org/blog/2015/02/12/postgresql-and-nodejs/#.VuwLPvl96Uk
//https://github.com/brianc/node-postgres

var query = client.query("SELECT name FROM tab1;");

query.on('end', function() {
    client.end();
});
