'use strict';
const dbItem = require('./dbItem');
const FIELDS = require('./fields');
const __fields = {
	id: FIELDS.INT(),
	code: FIELDS.INT(),
	name: FIELDS.STRING(4000),
	price: FIELDS.INT()
};
class Items extends dbItem{
	constructor()
	{
		super();
		this.fields = __fields;
		this.tableName = 'items';
		this.fields.name.req();
	}
}
module.exports =  new Items();
