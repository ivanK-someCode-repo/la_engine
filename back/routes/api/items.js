'use strict';

const express = require('express');
const router = express.Router();
const log = require('../libs/log')(module);

const itemModel = require('../models/postgre/item');
const itemService = require('../services/item')();

router.use(function(req, res, next) {
    log.info('api items root router has been called');

    next();
});

/*
router.get('/', function(req, res) {
    res.json({ message: 'get ok' });
});
*/

router.post('/', function(err,req, res) {
    res.send('post ok');
});

router.get('/:id', function(req, res, next) {

    //if (req.params.id == 0) next('route');

    if (!itemService.checkId(req.params.id))
        res.send("invalid id");

    //https://learn.javascript.ru/promise

    log.info('api get by id router has been called');

    itemModel.get(req.params.id).then(function onFulfilled(dbResult){

        log.info('get answer from base');

        res.send("" + dbResult);
    }, function onRejected(err){

        next(err);

        //res.send("" + err);
    });

});

/*
router.get('/:id', function (req, res, next) {
    console.log(req.params.id);
    res.render('special');
});
*/

router.put('/:id', function (err,req, res){
    res.send('This is not implemented now');
});

router.delete('/:id', function (err,req, res){
    res.send('This is not implemented now');
});

module.exports = router;