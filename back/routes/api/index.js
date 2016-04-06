var express = require('express');
var router = express.Router();

var categoriesRouter = require('./categories');

router.use(function(req, res, next) {
  // do logging
  console.log('Something is happening.');

  next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:port/api)
router.get('/', function(req, res) {
  console.log('Something is happening.');
  res.json({ message: 'ok!' });
});

router.use('/categories', categoriesRouter);

module.exports = router;
