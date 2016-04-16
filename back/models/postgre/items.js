import dbItem from './dbItem';
var sql = 
{
	sqlGet: 'select * from items'
};

class Items extends dbItem{
	constructor(strings)
	{
		super(strings);
	}
}

export new Items(sql);