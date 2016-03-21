"use strct";

var http = require('http');
var express = require('express');
var log = require('./libs/log')(module);
var config = require('./config');

var url = require('url');
var favicon = require('serve-favicon');

var ReactEngine = require('express-react-engine');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

app.set('port', config.get('port'));
app.set('layouts', __dirname + '/layouts');
app.engine('jsx', ReactEngine());

log.level = 'debug';

http.createServer(app).listen(app.get('port'), function(){
  log.info('Express server listening on port ' + config.get('port'));
  //console.log('Express server listening on port ' + app.get('port'));
});

app.use(favicon(config.get('faviconPath')));

app.use(function(req, res, next) {
  log.info("client connection");
  var urlObj = url.parse(req.url, true);

  if (urlObj.pathname == '/'){
    res.render( app.get('layouts') + '/index.jsx', {title: 'taram' , foo: 'bar' });
    //res.send("Done");
  }
  else{
    next();
  }
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

app.use(function(err, req, res, next){
  log.info(err.stack);
  next(err);
});

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


//var routes = require('./routes/index');

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

//app.use(logger('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);
//app.use('/users', users);

module.exports = app;