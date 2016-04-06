const express = require('express');
const router = express.Router();
const url = require('url');
const log = require('../libs/log')(module);
var config = require('../config');

router.use(function(err, req, res, next){
    log.info(err.stack);
    next(err);
});

// catch 404 and 401 then forward to error handler
router.use(function(req, res, next) {
    const urlObj = url.parse(req.url, true);
    debugger;
    //костыль
    if (urlObj.pathname.indexOf('/api') > -1){
        next();
        return;
    }

    if (urlObj.pathname == '/none'){
        let err = new Error('Not Found');
        err.status = 404;
        next(err);
    }
    else if(urlObj.pathname == '/denied'){
        let err = new Error('Forbidden');
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

router.use(function(err, req, res, next) {
    const urlObj = url.parse(req.url, true);
    debugger;
    //костыль
    if (urlObj.pathname.indexOf('/api') > -1){
        next();
        return;
    }


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

module.exports = router;