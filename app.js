"use strct";

var http = require('http');
var express = require('express');
var url = require('url');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var log = require('./back/libs/log')(module);
var config = require('./back/config');/*
var apiRouter = require('./back/routes/api');
var appRouter = require('./back/routes');*/

var app = express();

app.set('port', config.get('port'));
app.set('views', __dirname + '/layouts');

app.use(favicon(config.get('faviconPath')));

//middleware ��� �������� �������� ��������
//app.use(express.methodOverride()); // ��������� put � delete
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//���� ������� ��� ������ ����� ������������ www � bower_components
app.use(express.static('./bower_components'));
app.use(express.static('./www'));

http.createServer(app).listen(app.get('port'), function(){
  log.info('Express server listening on port ' + config.get('port'));
});
/*

app.use('/api', apiRouter); //������� ����� - ��� api-����� ����� �������������� ������, ��� ��� ���������
app.use('/', appRouter);

//app.use(logger('dev'));
//app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;