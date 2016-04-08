'use strict';

const express = require('express');
const router = express.Router();
const url = require('url');
const log = require('../libs/log')(module);

router.use(function(req, res, next) {
    log.info("client connection");
    const urlObj = url.parse(req.url, true);

    if (urlObj.pathname == '/'){
        res.render( 'index.jsx', {title: 'taram' , frontRootComponentPath: 'site/sources/index.jsx', page:'site' });
        //res.send("Done");
    }
    else{
        next();
    }
});

module.exports = router;