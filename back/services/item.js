'use strict';

//���� ��������, index.js, ������ �����, � ��� �� �����
//����� ��������� ������� �������� ������ �������� ��� ����������� �������������� ���� ��� � ������
//���: ��������� ������ �� ���� ���, ����� ������-������, ��������� � ��������� �����������

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
