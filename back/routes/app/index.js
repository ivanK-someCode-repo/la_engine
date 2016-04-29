'use strict';

const router = require('express').Router();
const log = require('../../libs/log')(module);

const siteRouter = require('./site');
const errorsRouter = require('./errors');

router.use('/', siteRouter);
router.use('/', errorsRouter);

module.exports = module.exports = function(app){
    app.use('/', router);

    app.use(function(err, req, res, next) {
        res.status(err.status || 500);

        log.error(`Internal error ${res.statusCode}: ${err.message}`);
        //next.error();

        if (res.headersSent) {
            //делегирование в стандартные механизмы обработки ошибок в Express, если заголовки уже были отправлены клиенту
            return next(err);
        }

        if (config.get('env') === 'development') {
            let errorHandler = express.errorHandler();
            errorHandler(err, req, res, next);
        }else{
            res.render('error/index', {
                error: {
                    number: err.status,
                    description: err.message
                }
            })
        }

        if (server){
            server.close();
        }

        setTimeout(function(){
            process.exit(1)
        }, 100).unref();

    });
};