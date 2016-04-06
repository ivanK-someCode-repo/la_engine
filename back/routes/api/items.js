'use strict';

const express = require('express');
const router = express.Router();
const log = require('../../libs/log')(module);

const itemModel = require('../../models/postgre')('item');
const itemService = require('../../services/item');

router.use(function(req, res, next) {
    log.info('api items root router has been called');

    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'get ok' });
});

router.post('/', function(req, res) {
    res.send('post ok');
});

router.get('/:id', function(req, res) {
    if (err)
        res.send(err);

    if (itemService.checkId(req.params.id))
        res.send("invalid id");

    itemModel.get(req.params.id).then(function onFulfilled(dbResult){
        res.send("" + dbResult);
    }, function onRejected(err){
        res.send("" + err);
    });
    
});

router.put('/:id', function (req, res){
    res.send('This is not implemented now');
});

router.delete('/:id', function (req, res){
    res.send('This is not implemented now');
});

module.exports = router;