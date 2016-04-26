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

function throwError(err) {
	return new Promise(function (resolve, reject) {
		reject(err);
	});
}

class dbItem {
	constructor() {

	}

	getData(params, keys) //sqlGet
	{
		const valid = this.validate(params, keys);
		if (valid.error) {
			return throwError(valid);
		}
		const where = this.genWhere(params);
		const sql = this.sql.sqlGet + where;
		return this.throwSql(sql);
	}

	putData(data) //sqlCreate
	{
		const valid = this.validate(data);
		if (valid.error) {
			return throwError(valid);
		}
		return this.throwSql(this.genInsert(data));
	}

	postData() //sqlEdit
	{

	}

	deleteData() //sqlDelete
	{

	}

	genWhere(params) {
		let where = '', conditions = [];
		// где-то здесь валидация
		for (let key in params) {
			conditions.push(`${key} = ${params[key]}`)
		}
		// and - временное решение, потом будет выбор and / or
		return conditions.length ? ` where ${conditions.join(' and ')}` : '';
	}
	genInsert(data) {
		let fields = [], values = [];
		for (let key in data) {
			fields.push(key);
			values.push(this.fields[key].val(data[key]));
		}
		return `insert into ${this.tableName} (${fields.join(', ')})
					VALUES (${values.join(', ')})`;
	}
	throwSql(sql) {
		return new Promise(function (resolve, reject) {
			client.query(sql, function (err, result) {
				if (err) {
					reject(err);
				}
				resolve(result);
			});
		})
	}

	validate(params, keys) {
		if (keys === undefined) {
			for (let key in this.fields) {
				let temp = this.fields[key].check(params[key], key);
				if (temp.error) {
					return temp;
				}
			}
		}
		else {
			for (let i = 0, len = keys.length; i < len; i++) {
				let key = keys[i];
				let temp = this.fields[key].checkRequired(params[key], key);
				if (temp.error) {
					return temp;
				}
			}
		}
		return {
			error: false
		};
	}
}


module.exports = dbItem;
