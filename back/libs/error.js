'use strict';

const path = require('path');
const util = require('util');
const http = require('http');

class ExtendableError extends Error{
    constructor(status, message, isApi){
        super(status, message);

        this.name = this.constructor.name;
        this.status = status;
        this.message = message || http.STATUS_CODES[status] || "Error";
        this.api = isApi || false;

        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = (new Error(message)).stack;
        }
    }
}

class HttpError extends ExtendableError {
    constructor(s, m, i) {
        super(s, m, i);
    }
}

module.exports.HttpError = HttpError;

/*
 let myerror = new MyError("ll");
 console.log(myerror.message);
 console.log(myerror instanceof Error);
 console.log(myerror.name);
 console.log(myerror.stack);
*/