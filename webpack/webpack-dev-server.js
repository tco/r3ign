var Express                 = require('express'),
    webpack                 = require('webpack'),
    webpackDevMiddleware    = require('webpack-dev-middleware'),
    webpackHotMiddleware    = require('webpack-hot-middleware'),

    webpackConfig   = require('./dev.config.js'),
    compiler        = webpack(webpackConfig),

    host            = process.env.HOST || 'localhost',
    port            = parseInt(process.env.PORT) + 1 || 3001,
    serverOptions   = {
        contentBase:    'http://' + host + ':' + port,
        quiet:          true,
        noInfo:         true,
        hot:            true,
        inline:         true,
        lazy:           false,
        publicPath:     webpackConfig.output.publicPath,
        headers:        { 'Access-Control-Allow-Origin': '*' },
        stats:          { colors: true }
    },

    app = new Express();

app.use(webpackDevMiddleware(compiler, serverOptions));
app.use(webpackHotMiddleware(compiler));

app.listen(port, function onAppListening(err) {
  if (err) {
    console.error(err);
  } else {
    console.info('Webpack development server listening on port %s', port);
  }
});
