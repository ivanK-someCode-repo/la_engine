'use strict';

const mongoBase = require('./base');

mongoBase(function(db){
    console.log(db);
    db.close();
},
function(err){
    console.log(err);
});