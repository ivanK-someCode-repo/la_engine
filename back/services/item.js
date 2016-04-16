'use strict';
const itemsModel = require('../models/postgre/items');

class ItemServices {
    constructor() {

    }

    checkId(id){
        return !isNaN(parseFloat(id)) && isFinite(id);
    }
    getData(data)
    {
    	//первый уровень проверки
	    return itemsModel.getData(data);
    }
}

module.exports = new ItemServices();
