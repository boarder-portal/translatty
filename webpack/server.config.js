const path = require('path');

const commonConfig = require('./common.config');

module.exports = {
  ...commonConfig,
  module: {
    rules: [
      ...commonConfig.module.rules,
      {
        test: /\.(scss|css)$/,
        use: ['file-loader'],
      }
    ]
  },
  entry: path.resolve(__dirname, '../app/server/server.ts'),
  target: 'node',
  output: {
    filename: '[name].js',
    chunkFilename: '[name].[contenthash].js',
    path: path.resolve(__dirname, '../build/server'),
  },
}
