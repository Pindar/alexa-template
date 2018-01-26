const slsw = require('serverless-webpack');

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  stats: 'minimal',
  devtool: 'source-map',
};
