'use strict';

var winston = require('winston');
var config = require('../config');

function makeLogger(module){

    var path = module.filename.split('/').slice(-2).join('/');
    //module.filename.match(/request.js$/)
    if (path){
        var transports = [
            new winston.transports.Console({
                timestamp:true,//function(){return new Date().toString}
                colorize:true,
                level:'info',
                label: path
            })

            //,new winston.transports.File({
            //    filename:'debug.log',
            //    level: config.get('env') == 'development' ? 'debug' : 'error'
            //})
        ];

        return new winston.Logger({
            transports: transports
        });
    }
    else{
        return new winston.Logger({
            transports: []
        });
    }
}

module.exports = makeLogger;