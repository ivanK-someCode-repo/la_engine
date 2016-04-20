'use strict';

const express = require('express');
const router = express.Router();
const log = require('../libs/log')(module);

router.use(function(req, res, next) {
    log.info("site rout");

    res.render('site/index', {
        site: {
            variableX: 111
        }
    })
});

module.exports = router;