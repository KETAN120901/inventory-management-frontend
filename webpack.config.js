const path = require('path');
const config = {
    // Entry point of your application
    entry: './src/index.js',
    // Output configuration
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/',
    },
    // Other configuration options...
  };
  module.exports = config;
  