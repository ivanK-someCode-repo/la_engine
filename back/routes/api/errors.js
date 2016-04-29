'use strict';

const router = require('express').Router();
const log = require('../../libs/log')(module);
const HttpError = require('../../libs/error').HttpError;

router.use(function(req, res, next) {
    log.info('api resourse not found');

    next(new HttpError(404, 'api resourse not found', true));
});

module.exports = router;