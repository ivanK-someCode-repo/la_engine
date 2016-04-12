'use strict';

const config = require('./back/config');
const log = require('./back/libs/log')(module); //пишут, что хороший логгер - intel
const domain = require('domain');
const appDomain = domain.create();

//домен нужен для перехватывания ошибок в асинхронных вызовах
appDomain.on('error', function(err){
  log.error(`appDomain catch error: ${err}`);
});

appDomain.run(function() {

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

  app.use(function(err, req, res){
    huyak();
  });

  app.use(favicon(config.get('faviconPath')));
  app.use(methodOverride()); // поддержка put и delete
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static('./www'));

  app.use('/api', apiRouter); //порядок важен - так api-роуты будут обрабатываться раньше, чем все остальные
  app.use('/', appRouter);

  app.use(function(err, req, res, next){
    const reqDomain = domain.create();

    reqDomain.add(req);
    reqDomain.add(res);
    reqDomain.on('error', function(err){
      log.error(`reqDomain ${reqDomain} catch error ${err}`);
      next();
    });

    log.error(`appUse catch error ${err}`);

    appDomain.emit('error', err);

    reqDomain.run(next);
  });

  //возможно, этот мидлвэр нужно будет убрать и добавить вывод ошибки в домен
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    log.error(`Internal error ${res.statusCode}: ${err.message}`);

    if (config.get('env') === 'development') {
      res.render('error', {
        message: err.message,
        error: err
      });
    }else{
      //res.send({ error: err.message });
      debugger;
      res.render('error/index', {
        error: {
          number: err.status,
          description: err.message
        }
      })
    }
  });

  http.createServer(app).listen(app.get('port'), function(){
    log.info('Express server listening on port ' + config.get('port'));
  });
});

//app.use(logger('dev'));