'use strict';

const config = require('./back/config');
const log = require('./back/libs/log')(module); //�����, ��� ������� ������ - intel

const http = require('http');
const express = require('express');
const url = require('url');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const apiRouter = require('./back/controllers');
const appRouter = require('./back/routes');
const app = express();

app.set('port', config.get('port'));
app.set('views', config.get('jsxEngine:layoutsDest'));
app.set('view engine', config.get('jsxEngine:enginName'));
app.set('view options', { basedir: config.get('jsxEngine:layoutsDest')});
//app.locals.basedir = config.get('jsxEngine:layoutsDest');

app.use(favicon(config.get('faviconPath')));
app.use(methodOverride()); // ��������� put � delete
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('./www'));

app.use('/api', apiRouter); //������� ����� - ��� api-����� ����� �������������� ������, ��� ��� ���������
app.use('/', appRouter);

//��� ����� ������ �������� ���������� https://github.com/btford/zone.js/
//��� /api ����� ��������� ��������� ��������, ������� �� �������� �������� error
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  log.error(`Internal error ${res.statusCode}: ${err.message}`);
  //next.error();

  if (res.headersSent) {
    //������������� � ����������� ��������� ��������� ������ � Express, ���� ��������� ��� ���� ���������� �������
    return next(err);
  }

  if (req.url.indexOf('api') > -1){
    res.send({ error: err.message });
  }

  if (config.get('env') === 'development') {
    res.render('error/index', {
      error: {
        number: err.status,
        description: err.message
      }
    })
  }else{
    res.render('error/index', {
      error: {
        number: err.status,
        description: err.message
      }
    })
  }

  if (server){
    server.close();
  }

  setTimeout(function(){
    process.exit(1)
  }, 100).unref();

});

const server = http.createServer(app).listen(app.get('port'), function(){
  log.info('Express server listening on port ' + config.get('port'));
});

//app.use(logger('dev'));