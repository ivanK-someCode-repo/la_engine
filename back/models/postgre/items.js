'use strict';
const dbItem = require('./dbItem');

class Items extends dbItem{
	constructor()
	{
		super();
		this.sql = 
		{
			sqlGet: 'select * from items'
		};
	}
}
module.exports =  new Items();