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
}

module.exports = new ItemServices();
