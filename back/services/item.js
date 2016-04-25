'use strict';
const itemsModel = require('../models/postgre/items');

class ItemServices {
    constructor() {

    }
    validate(params)
    {
      return itemsModel.validate(params);
    }
    getData(data)
    {
	    return itemsModel.getData(data);
    }
}

module.exports = new ItemServices();
