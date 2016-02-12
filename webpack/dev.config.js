var fs          = require('fs'),
    path        = require('path'),
    webpack     = require('webpack'),
    assetsPath  = path.resolve(__dirname, '../static/dist'),
    host        = 'localhost',
    port        = parseInt(process.env.PORT) + 1 || 3001,

    //https://github.com/halt-hammerzeit/webpack-isomorphic-tools
    WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin'),
    WIT = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-config.js'));

module.exports = {
    devtool: 'inline-source-map',
    context: path.resolve(__dirname, '..'),
    entry: {
        'main': [
            'webpack-hot-middleware/client?path=http://' + host + ':' + port + '/__webpack_hmr',
            './app/client.js'
        ]
    },
    output: {
        path:           assetsPath,
        filename:       '[name]-[hash].js',
        chunkFilename:  '[name]-[chunkhash].js',
        publicPath:     'http://' + host + ':' + port + '/dist/'
    },
    module: {
        loaders: [
            { test: /\.js|.jsx$/, exclude: /node_modules/, loader: 'babel-loader' },
            { test: /\.js|.jsx$/, exclude: /node_modules/, loader: 'eslint-loader' },
            { test: WIT.regular_expression('images'), loader: 'url-loader?limit=10240'}
        ]
    },
    progress: true,
    resolve: {
        modulesDirectories: ['app', 'node_modules'],
        extensions:         ['', '.js', '.jsx']
    },
    plugins: [
        // hot reload
        new webpack.HotModuleReplacementPlugin(),
        new webpack.IgnorePlugin(/webpack-assets\.json$/),
        new webpack.DefinePlugin({
            __CLIENT__:         true,
            __SERVER__:         false,
            __DEVELOPMENT__:    true,
            __DEVTOOLS__:       true,
            __TEST__:           false
        }),
        WIT.development()
    ]
};
