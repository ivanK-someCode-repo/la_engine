'use strict';
const dbItem = require('./dbItem');
const FIELDS = require('./fields');
const __fields = {
	id: FIELDS.INT(),
	code: FIELDS.INT(),
	name: FIELDS.STRING(4000).required(),
	price: FIELDS.INT()
};
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