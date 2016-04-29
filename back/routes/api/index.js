'use strict';

const router = require('express').Router();
const log = require('../../libs/log')(module);
const HttpError = require('../../libs/error').HttpError;

const categoriesRouter = require('./categories');
const itemsRouter = require('./items');
const errorsRouter = require('./errors');

router.use(function(req, res, next) {
  // do logging
  log.info('api root router has been called');

  next(); // make sure we go to the next routes and don't stop here
});

router.use('/categories', categoriesRouter);
router.use('/items', itemsRouter);
router.use('/',errorsRouter);

module.exports = function(app){
  app.use('/api', router);

  app.use(function(err, req, res, next) {

    if (!err.api){
      next(err);
    }

    log.error(`Api error ${res.statusCode}: ${err.message}`);
    //next.error();

    if (res.req.headers['x-request-with'] == 'XMLHttpRequest'){
      res.json({ error: err.message });
    }
    else{
      next(err);
    }

    if (server){
      server.close();
    }

    setTimeout(function(){
      process.exit(1)
    }, 100).unref();

  });
};

//https://habrahabr.ru/post/193458/
//https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4