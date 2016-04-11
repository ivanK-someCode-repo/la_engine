'use strict';

const config = require('../../config');

//todo: ������ ���� ������� �� ���� �����
//����� ���� ���� ���� rest api � �������� ���� ����� �������� ������ (�.�. ��� ����� ����� � ���� dao)

const pg = require('pg');
const connectionString = config.get('postgreConnectionString');
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

//� ���� ���� ��� ��� ��������: baseOperation("item").get(11)