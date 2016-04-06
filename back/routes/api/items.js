const express = require('express');
const router = express.Router();
const log = require('../../libs/log')(module);

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
    res.send('This is not implemented now');
});

router.put('/:id', function (req, res){
    res.send('This is not implemented now');
});

router.delete('/:id', function (req, res){
    res.send('This is not implemented now');
});

module.exports = router;