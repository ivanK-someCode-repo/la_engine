var nconf = require('nconf');
var path = require('path');

nconf.argv()
    .env()
    .file({ file: path.join(__dirname, 'config.json') });

nconf.set('faviconPath', path.join(__dirname, '../www/images/favicon.ico'));

nconf.set('frontRootPath', path.join(__dirname, '../www/main.jsx'));

module.exports = nconf;