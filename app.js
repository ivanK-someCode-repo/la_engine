"use strct";

const http = require('http');
const express = require('express');
const url = require('url');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const log = require('./back/libs/log')(module);
const config = require('./back/config');
const apiRouter = require('./back/routes/api');
const appRouter = require('./back/routes');

const app = express();

app.set('port', config.get('port'));
app.set('views', config.get('jsxEngine:layoutsDest'));
app.set('view engine', config.get('jsxEngine:enginName'));
app.set('view options', { basedir: config.get('jsxEngine:layoutsDest')});
//app.locals.basedir = config.get('jsxEngine:layoutsDest');

app.use(favicon(config.get('faviconPath')));

app.use(methodOverride()); // поддержка put и delete
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static('./www'));

http.createServer(app).listen(app.get('port'), function(){
  log.info('Express server listening on port ' + config.get('port'));
});

app.use('/api', apiRouter); //порядок важен - так api-роуты будут обрабатываться раньше, чем все остальные
app.use('/', appRouter);

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  log.error('Internal error(%d): %s',res.statusCode,err.message);

  if (config.get('env') === 'development') {
    res.render('error', {
      message: err.message,
      error: err
    });
  }else{
    //res.send({ error: err.message });

    res.render('error/index', {
      error: {
        number: err.status,
        description: err.message
      }
    })
  }
});

//app.use(logger('dev'));

module.exports = app;