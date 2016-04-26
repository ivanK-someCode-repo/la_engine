'use strict';

const express = require('express');
const router = express.Router();
const log = require('../../libs/log')(module);


const itemService = require('../../services/item');

router.use(function(req, res, next) {
    log.info('api items root router has been called');

    next();
});

/*
router.get('/', function(req, res) {
    res.json({ message: 'get ok' });
});
*/

router.post('/:id', function(err,req, res) {
    itemService.saveData(req.params, req.body).then(function (result) {
        res.send(result);
    }, function (error) {
        res.send(req.body);
    });
});

router.get('/:id', function(req, res, next) {
    //https://learn.javascript.ru/promise
    debugger;
    log.info('api get by id router has been called');

    itemService.getData(req.params).then(function onFulfilled(dbResult) {
        log.info('get answer from base');
        res.send("" + dbResult);
    }, function onRejected(err) {
        // next(err);
        res.send("" + err.text);
    });

});
/*
router.get('/:id', function (req, res, next) {
    console.log(req.params.id);
    res.render('special');
});
*/

router.put('/', function (req, res, next) {
    itemService.saveData(req.params, req.body).then(function (result) {
        res.send(result);
    }, function (error) {
        res.send(req.body);
    });
});

router.delete('/:id', function (req, res, next){
    itemService.deleteData(req.params).then(function (result) {
        res.send(result);
    }, function (error) {
        res.send(req.body);
    });
});

module.exports = router;
