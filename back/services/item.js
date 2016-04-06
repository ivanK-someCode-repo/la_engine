'use strict';

//слой сервисов, index.js, скорее всего, в нем не нужно
//нужно продумать удобный механизм вызова сервисов для обеспечения взаимодействия рест апи и модели
//это: валидация данных из рест апи, любая безнес-логика, обращения к сторонним библиотекам

class ItemServices {
    constructor() {

    }

    checkId(id){
        return !isNaN(parseFloat(id)) && isFinite(id);
    }
}

module.exports = function(){
    return new ItemServices();
};
