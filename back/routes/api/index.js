const express = require('express');
const router = express.Router();
const log = require('../../libs/log')(module);

const categoriesRouter = require('./categories');
const itemsRouter = require('./items');

router.use(function(req, res, next) {
  // do logging
  log.info('api root router has been called');

  next(); // make sure we go to the next routes and don't stop here
});

router.use('/categories', categoriesRouter);
router.use('/items', itemsRouter);

module.exports = router;

//https://habrahabr.ru/post/193458/
//https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4