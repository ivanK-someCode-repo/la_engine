'use strict';

const express = require('express');
const router = express.Router();
const log = require('../../libs/log')(module);

const fs = require('fs');
let obj = JSON.parse(fs.readFileSync('manifest.json', 'utf8'));

console.log(obj);

router.use(function(req, res, next) {
    log.info("site rout");

    console.log(obj);

    res.render('site/index', {
        manifest: obj
    })
});

module.exports = router;