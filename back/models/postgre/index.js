'use strict';

//todo: импорт всех модулей из этой папки
//через этот файл слои rest api и сервисов бэка будут вызывать модели (т.е. это точка входа в слой dao)

const pg = require('pg');
const connectionString = require('./config_bd');
//process.env.DATABASE_URL || 'postgres://localhost:5432/todo';
const client = new pg.Client(connectionString);

client.connect();

/*
var query = client.query("SELECT name FROM tab1;");
query.on('end', function() {
    client.end();
});
*/

class base {
    constructor(model) {

        debugger;

        for(let key in model){
            if (!model.hasOwnProperty(key)){
                continue;
            }

            this[key] = function(parameters){

                return new Promise( function(resolve, reject){

                    const query = client.query(model[key](parameters), function(err, result){
                        if (err){
                            reject(err);
                        }

                        resolve(result);
                    });

                    query.on('end', function() {
                        client.end();
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

//в слое рест апи или сервисов: baseOperation("item").get(11)