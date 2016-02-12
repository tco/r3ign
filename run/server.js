// Enable runtime transpilation to use ES6/7 in node

var fs                          = require('fs'),
    path                        = require('path'),
    piping                      = require('piping'),
    registerBabel               = require('babel-core/register'),
    WebpackIsomorphicTools      = require('webpack-isomorphic-tools'),

    rootDirectory               = path.resolve(__dirname, '..');

registerBabel();

global.__CLIENT__       = false;
global.__SERVER__       = true;
global.__DISABLE_SSR__  = false;
global.__TEST__         = false;
global.__DEVELOPMENT__  = process.env.NODE_ENV !== 'production';

if (__DEVELOPMENT__) {
    if (!piping({ hook: true, ignore: /(\/\.|~$|\.json$)/i})) {
        return;
    }
}

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack/webpack-isomorphic-config.js'))
    .development(__DEVELOPMENT__)
    .server(rootDirectory, function() {
        require('../app/server.js');
    });
