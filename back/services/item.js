'use strict';
const itemsModel = require('../models/postgre/items');

class ItemServices {
    constructor() {

    }

    validate(params) {
        const keys = ['id'];
        return itemsModel.validateFields(params, keys);
    }

    getData(data) {
        return itemsModel.getData(data);
    }
    saveData(params, data)
    {
        if (params.id === undefined)
        {
            return itemsModel.putData(data);
        }
    }
}

module.exports = new ItemServices();
