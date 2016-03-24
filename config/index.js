var nconf = require('nconf');
var path = require('path');

nconf.argv()
    .env()
    .file({ file: path.join(__dirname, 'config.json') });

nconf.set('faviconPath', path.join(__dirname, '../www/common/images/favicon.ico'));

module.exports = nconf;