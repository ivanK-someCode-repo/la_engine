var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.json({ message: 'ok!' });
});

router.post('/', function(req, res) {
    res.send('This is not implemented now');
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

//https://habrahabr.ru/post/193458/
//https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4