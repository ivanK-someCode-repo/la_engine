'use strict';
const itemsModel = require('../models/postgre/items');

class ItemServices {
    constructor() {

    }
    validate(params) {
        const keys = ['id'];
        return itemsModel.validateFields(params, keys);
    }

    getData(params) {
        const keys = ['id'];
        return itemsModel.getData(params, keys);
    }
    saveData(params, data)
    {
        if (params.id === undefined)
        {
            return itemsModel.putData(data);
        }
        else
        {
            return itemsModel.postData(params, data);
        }
    }
    deleteData(params)
    {
        const keys = ['id'];
        return itemsModel.deleteData(params, keys);
    }
}

module.exports = new ItemServices();
