'use strict';
const ggg = require('./dbItem');

console.log(ggg);

function Items() {
	this.sql = 
	{
		sqlGet: 'select * from items'
	};
}

class ppp extends ggg {
	speak() {
		this.b = this.a + 5;
		return this.b;
	}
}

let Xd = new ppp(4);
console.log(Xd.a);
console.log(Xd.speak());

//Items.prototype = Object.create(dbItem.prototype);
//Items.prototype.constructor = Items;
//module.exports =  new Items();