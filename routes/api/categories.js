var express = require('express');
var router = express.Router();

router.get('/api/articles', function(req, res) {
    res.send('This is not implemented now');
});

router.post('/api/articles', function(req, res) {
    res.send('This is not implemented now');
});

router.get('/api/articles/:id', function(req, res) {
    res.send('This is not implemented now');
});

router.put('/api/articles/:id', function (req, res){
    res.send('This is not implemented now');
});

router.delete('/api/articles/:id', function (req, res){
    res.send('This is not implemented now');
});

module.exports = router;

//https://habrahabr.ru/post/193458/
//https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4