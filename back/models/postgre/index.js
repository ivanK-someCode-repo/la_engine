'use strict';

//todo: ������ ���� ������� �� ���� �����
//����� ���� ���� ���� rest api � �������� ���� ����� �������� ������ (�.�. ��� ����� ����� � ��� ���� dao)

var pg = require('pg');

var connectionString = 'postgres://postgres:ParPar52@localhost:5432/engin';//process.env.DATABASE_URL || 'postgres://localhost:5432/todo';

var client = new pg.Client(connectionString);

client.connect();

var query = client.query("SELECT name FROM tab1;");

query.on('end', function() {
    client.end();
});