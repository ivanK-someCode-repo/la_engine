'use strict';

//todo: импорт всех модулей из этой папки
//через этот файл слои rest api и сервисов бэка будут вызывать модели (т.е. это точка входа в наш слой dao)

var pg = require('pg');
var item = require('item');

var connectionString = 'postgres://postgres:ParPar52@localhost:5432/engin';//process.env.DATABASE_URL || 'postgres://localhost:5432/todo';

var client = new pg.Client(connectionString);

client.connect();

var query = client.query("SELECT name FROM tab1;");

query.on('end', function() {
    client.end();
});

var baseOperation = function(model){
    if (model == "item")
        return item; //надо навесить обертку над item для обращения к базе по строке
};

module.exports = baseOperation;

//в слое рест апи или сервисов: baseOperation("item").get(11)