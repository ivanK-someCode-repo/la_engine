
const dbItem = require('./dbItem');
function Items() {
	this.sql = 
	{
		sqlGet: 'select * from items'
	};
}
Items.prototype = Object.create(dbItem.prototype);
Items.prototype.constructor = Items;
module.exports =  new Items();