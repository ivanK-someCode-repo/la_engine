'use strict';

const config = require('../../config');

//todo: импорт всех модулей из этой папки
//через этот файл слои rest api и сервисов бэка будут вызывать модели (т.е. это точка входа в слой dao)

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

class dbItem{
	constructor(strings = {})
	{
		// Ждем объект из минимум 4 строк
		for (let key in strings)
		{
			this[key] = strings[key];
		}
	}
	getData(params) //sqlGet
	{
		const where = this.genWhere(params);
		const sql = this.sqlGet + where;
        return throwSql(sql);
	}	
	putData() //sqlCreate
	{

	}
	postData() //sqlEdit
	{

	}
	deleteData() //sqlDelete
	{

	}
	genWhere(params)
	{
		let where = '', conditions = [];
		// где-то здесь валидация 
		for (let key in params)
		{
			conditions.push(`${key} = ${params[key]}`)
		}
		// and - временное решение, потом будет выбор and / or
		return conditions.length ? ` where ${conditions.join(' and ')}` : '';
	}
	throwSql(sql)
	{
		return new Promise( function(resolve, reject){
            client.query(sql), function(err, result){
                if (err){
                    reject(err);
                }
                resolve(result);
            });
        }) 
	}
}

export default dbItem;