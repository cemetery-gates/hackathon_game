const merge = require('webpack-merge');
const common = require('./webpack.common');

const dev = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    open: true,
    port: 4300,
    host: '0.0.0.0',
    sockPath: '/view/sockjs-node'
  }
};

module.exports = merge(common, dev);
