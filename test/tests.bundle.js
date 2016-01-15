global.__CLIENT__ = true;
global.__SERVER__ = false;
global.__DEVELOPMENT__ = true;
global.__DEVTOOLS__ = false;

var context = require.context('../app', true, /.+\.spec\.js|\.spec\.jsx?$/);
context.keys().forEach(context);
module.exports = context;
