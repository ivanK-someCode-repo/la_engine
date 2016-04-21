'use strict';

const config = require('../../config');

//todo: ?????? ???? ??????? ?? ???? ?????
//????? ???? ???? ???? rest api ? ???????? ???? ????? ???????? ?????? (?.?. ??? ????? ????? ? ???? dao)

const pg = require('pg');
const connectionString = config.get('postgreConnectionString');
//process.env.DATABASE_URL || 'postgres://localhost:5432/todo';
const client = new pg.Client(connectionString);

client.connect(function(err){
    if (err){
        console.log("new pg connection throw error:" + err);
    }

    console.log("new pg connection");
});

client.on('error', function(error) {
    console.log("pg connection error: " + error);


});

/*
var query = client.query("SELECT name FROM tab1;");
query.on('end', function() {
    client.end();
});
*/

class base {
    constructor(model) {

        for(let key in model){
            if (!model.hasOwnProperty(key)){
                continue;
            }

            this[key] = function(parameters){

                return new Promise( function(resolve, reject){

                    client.query(model[key](parameters), function(err, result){
                        if (err){
                            reject(err);
                        }

                        resolve(result);
                    });

                }) ;
            }
        }
    }
}

const dbaseOperation = function(model){

    debugger;

    const sqlSource = model; //

    debugger;

    return new base(sqlSource);
};

module.exports = dbaseOperation;

//? ???? ???? ??? ??? ????????: baseOperation("item").get(11)