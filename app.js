'use strict';

const config = require('./back/config');
const log = require('./back/libs/log')(module); //пишут, что хороший логгер - intel

const http = require('http');
const express = require('express');
const url = require('url');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongodb');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
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

//http://nodeguide.ru/doc/dailyjs-nodepad/node-tutorial-5/
//https://github.com/expressjs/session/blob/master/README.md
//http://ru.stackoverflow.com/questions/356045/%D0%A1%D0%BE%D1%85%D1%80%D0%B0%D0%BD%D0%B5%D0%BD%D0%B8%D0%B5-%D1%81%D0%B5%D1%81%D1%81%D0%B8%D0%B9-%D0%B2-express
/*
app.use(session({
    secret: config.get('session:secret'), // sdfhwh234fr34f34f3.SHA256
    key: config.get('session:key'),
    cookie: config.get('session:cookie'),
    store: new MongoStore({ dbname: 'engine',
        host: 'mongodb://localhost',
        port: '27017',
        user: 'root',
        password: ''})
}));
//какой-то баг с коннекшном к монго
*/
//db.sessions.find()

//порядок роутов важен - так api-роуты будут обрабатываться раньше, чем все остальные
require('./back/routes/api')(app);
require('./back/routes/app')(app);

const server = http.createServer(app).listen(app.get('port'), function(){
	debugger;
  log.info('Express server listening on port ' + config.get('port'));
});

//app.use(logger('dev'));
