'use strict';

const express = require('express');
const router = express.Router();
const url = require('url');
const log = require('../libs/log')(module);
var config = require('../config');

// catch 404 and 401 then forward to error handler
router.use(function(req, res, next) {
    const urlObj = url.parse(req.url, true);

    debugger;

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
 */

module.exports = router;