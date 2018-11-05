const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const dev = require('./donottouch-dovico-app-webpack-config/webpack.dev.js');

const tmp = merge(common, dev);

module.exports = merge(tmp, {
});
