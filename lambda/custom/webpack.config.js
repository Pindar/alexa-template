const slsw = require('serverless-webpack');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');


module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  stats: 'minimal',
  devtool: 'source-map',
  plugins: [
    new HardSourceWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
      }
    ]
  }
};
