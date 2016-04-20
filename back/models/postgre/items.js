'use strict';
const dbItem = require('./dbItem');
const FIELDS = require('./fields');
const __fields = {
	id: new FIELDS.INT(),
	code: new FIELDS.INT(),
	name: new FIELDS.STRING(4000).required(),
	price: new FIELDS.INT()
}
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