var webpack = require('webpack'),
    path = require('path'),
    WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin'),
    WIT = new WebpackIsomorphicToolsPlugin(require('../webpack/webpack-isomorphic-config.js'));

module.exports = function (config) {
    config.set({
        browsers: [ 'PhantomJS' ],
        files: [
            '../node_modules/babel-polyfill/dist/polyfill.js',
            'tests.bundle.js'
        ],
        frameworks: [ 'chai', 'mocha', 'phantomjs-shim' ],
        plugins: [
            'karma-phantomjs-shim',
            'karma-phantomjs-launcher',
            'karma-chai',
            'karma-mocha',
            'karma-mocha-reporter',
            'karma-sourcemap-loader',
            'karma-webpack',
            WIT.development()
        ],
        // run the bundle through the webpack and sourcemap plugins
        preprocessors: {
            'tests.bundle.js': [ 'webpack', 'sourcemap' ]
        },
        reporters: [ 'mocha' ],
        singleRun: true,
        // webpack config object
        webpack: {
            devtool: 'inline-source-map',
            resolve: {
                modulesDirectories: ['app', 'node_modules']
            },
            module: {
                loaders: [
                    { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
                    { test: WIT.regular_expression('images'), loader: 'url-loader?limit=10240'}
                ]
            }
        },
        webpackMiddleware: {
            noInfo: true
        }
    });
};
