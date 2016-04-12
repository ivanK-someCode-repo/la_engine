'use strict';

//todo: на входе в модуль объект соединения с базой (пример - модуль лога, там на входе объект модуля)
// и callback-функция, в которую передаются, по канонам node, error и data

//здесь, в этом файле, основные (пока что) методы - select, insert, update, delete для таблицы item
//в каждый метод передается или id или {} объект с параметрами
//нужно распарсить объект и сгенерить на его основе строку запроса для вышеуказанных методов (лучше строку es2015)

//! lazy loading - если pg-модуль позволяет, ищем внешние ключи в базе на item и подгружаем по ним записи
//на выходе имеем вызов callback c  error (общую обработку ошибок на проект потом напишем) и ответом от базы
//который, соответственно, надо распарсить в объект
var dbItem = require('./index');
var MODEL_TABLE = 'items';

var modelItem = {
    get: function(id){

        return `select * from
            ${MODEL_TABLE}
            where id =
            ${id}`;
    },

    delete: function(id){
        return `delete from ${MODEL_TABLE} where id = ${id}`;
    }
};

module.exports = dbItem(modelItem);

