'use strict';

const router = require('express').Router();
const log = require('../../libs/log')(module);
debugger;
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