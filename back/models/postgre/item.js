'use strict';

//todo: �� ����� � ������ ������ ���������� � ����� (������ - ������ ����, ��� �� ����� ������ ������)
// � callback-�������, � ������� ����������, �� ������� node, error � data

//�����, � ���� �����, �������� (���� ���) ������ - select, insert, update, delete ��� ������� item
//� ������ ����� ���������� ��� id ��� {} ������ � �����������
//����� ���������� ������ � ��������� �� ��� ������ ������ ������� ��� ������������� ������� (����� ������ es2015)

//! lazy loading - ���� pg-������ ���������, ���� ������� ����� � ���� �� item � ���������� �� ��� ������
//�� ������ ����� ����� callback c  error (����� ��������� ������ �� ������ ����� �������) � ������� �� ����
//�������, ��������������, ���� ���������� � ������
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

