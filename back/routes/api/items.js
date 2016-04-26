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
    res.send('post ok');
});

router.get('/:id', function(req, res, next) {

    //if (req.params.id == 0) next('route');
    const isNorm = itemService.validate(req.params);
    if (isNorm.error) {
        res.send(isNorm.text);
    }
    //https://learn.javascript.ru/promise
    debugger;
    log.info('api get by id router has been called');

    itemService.getData({id: req.params.id}).then(function onFulfilled(dbResult) {
        log.info('get answer from base');
        res.send("" + dbResult);
    }, function onRejected(err) {
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

router.put('/', function (req, res, next) {
    const isNorm = itemService.validate(req.body);
    if (isNorm.error) {
        res.send(isNorm.text);
    }
    itemService.saveData(req.params, req.body).then(function (result) {
        res.send(result);
    }, function (error) {

        res.send(req.body);
    });
});

router.delete('/:id', function (req, res, next){
    res.send('This is not implemented now');
});

module.exports = router;
