'use strict';

const nconf = require('nconf');
const path = require('path');

nconf.argv()
    .env()
    .file({ file: path.join(__dirname, 'config.json') });

nconf.set('faviconPath', path.join(__dirname, '../www/common/images/favicon.ico'));

module.exports = nconf;