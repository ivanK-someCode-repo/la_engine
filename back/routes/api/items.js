'use strict';

const express = require('express');
const router = express.Router();
const log = require('../../libs/log')(module);

const itemModel = require('../../models/postgre')('item');
const itemService = require('../../services/item');

router.use(function(err,req, res, next) {
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

router.get('/:id', function(err,req, res) {

    debugger;

    if (err)
        res.send(err);

    if (itemService.checkId(req.params.id))
        res.send("invalid id");

    //https://learn.javascript.ru/promise

    itemModel.get(req.params.id).then(function onFulfilled(dbResult){

        debugger;

        res.send("" + dbResult);
    }, function onRejected(err){

        debugger;

        res.send("" + err);
    });

});

router.put('/:id', function (err,req, res){
    res.send('This is not implemented now');
});

router.delete('/:id', function (err,req, res){
    res.send('This is not implemented now');
});

module.exports = router;