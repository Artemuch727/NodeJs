/**
 * Created by User on 30.09.2016.
 */
var nconf = require('nconf');
var path = require('path');

nconf.argv()
    .env()
    .file({file: path.join(__dirname, 'config.json') });

module.exports = nconf;