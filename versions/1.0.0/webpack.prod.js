const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const prod = require('./donottouch-dovico-app-webpack-config/webpack.prod.js');

const tmp = merge(common, prod);

module.exports = merge(tmp, {
});
