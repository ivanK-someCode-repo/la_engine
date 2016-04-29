'use strict';

const router = require('express').Router();
const log = require('../../libs/log')(module);
const HttpError = require('../../libs/error').HttpError;

router.use(function(req, res, next) {
    log.info("page not found");

    next(new HttpError(404, 'page not found'));
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