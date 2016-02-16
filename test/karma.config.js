var webpack = require('webpack'),
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
            'karma-coverage',
            'karma-coveralls',
            'karma-chai',
            'karma-mocha',
            'karma-mocha-reporter',
            'karma-sourcemap-loader',
            'karma-webpack',
            WIT.development()
        ],
        preprocessors: {
            'tests.bundle.js': [ 'webpack', 'coverage' ]
        },
        reporters: [ 'mocha', 'coverage', 'coveralls' ],
        singleRun: true,
        // webpack config object
        coverageReporter: {
            type: 'lcov',
            dir: 'coverage/'
        },
        webpack: {
            resolve: {
                modulesDirectories: ['app', 'node_modules']
            },
            module: {
                loaders: [
                    { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
                    { test: WIT.regular_expression('images'), loader: 'url-loader?limit=10240'}
                ]
            },
            plugins: [
                // hot reload
                new webpack.IgnorePlugin(/webpack-assets\.json$/),
                new webpack.DefinePlugin({
                    __CLIENT__:         true,
                    __SERVER__:         false,
                    __DEVELOPMENT__:    true,
                    __DEVTOOLS__:       false,
                    __TEST__:           true
                }),
                WIT.development()
            ]

        },
        webpackMiddleware: {
            noInfo: true
        }
    });
};
