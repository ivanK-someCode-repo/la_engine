"use strct";

var http = require('http');
var express = require('express');
var url = require('url');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ReactEngine = require('express-react-views');

var log = require('./back/libs/log')(module);
var config = require('./back/config');

var app = express();

app.set('port', config.get('port'));
app.set('views', __dirname + '/layouts');
app.set('view engine', 'jsx');
app.engine('jsx', ReactEngine.createEngine(config.get("jsx_engine:options")));
//app.engine('jsx', require('express-react-views').createEngine());

app.use(favicon(config.get('faviconPath')));
app.use(express.methodOverride()); // ��������� put � delete
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//���� ������� ��� ������ ����� ������������ www � bower_components
app.use(express.static('./bower_components'));
app.use(express.static('./www'));

http.createServer(app).listen(app.get('port'), function(){
  log.info('Express server listening on port ' + config.get('port'));
});

app.use(function(req, res, next) {
  log.info("client connection");
  var urlObj = url.parse(req.url, true);

  if (urlObj.pathname == '/'){
    res.render( 'index.jsx', {title: 'taram' , frontRootComponentPath: 'site/sources/index.jsx', page:'site' });
    //res.send("Done");
  }
  else{
    next();
  }
});

app.use(function(err, req, res, next){
  log.info(err.stack);
  next(err);
});

// catch 404 and 401 then forward to error handler
app.use(function(req, res, next) {
  var urlObj = url.parse(req.url, true);

  if (urlObj.pathname == '/none'){
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  }
  else if(urlObj.pathname == '/denied'){
    var err = new Error('Forbidden');
    err.status = 401;
    next(err);
  }
  else{
    next();
  }
});
/*
app.use(function(req, res, next){
  res.status(404);
  log.debug('Not found URL: %s',req.url);
  res.send({ error: 'Not found' });
  return;
});

app.use(function(err, req, res, next){
  res.status(err.status || 500);
  log.error('Internal error(%d): %s',res.statusCode,err.message);
  res.send({ error: err.message });
  return;
});
*/
app.use(function(err, req, res, next) {
    res.status(err.status || 500);

  if (config.get('env') === 'development') {
    res.render('error', {
      message: err.message,
      error: err
    });
  }else{
    res.render('error', {
      message: err.message,
      error: {}
    });
  }
});


//app.use(logger('dev'));
//app.use(express.static(path.join(__dirname, 'public')));

//var routes = require('./routes/index');
//app.use('/', routes);
//app.use('/users', users);

module.exports = app;