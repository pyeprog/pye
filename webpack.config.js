const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'webpack-entry', 'main.js'),
  output: {
    path: path.join(__dirname, 'public', 'js'),
    filename: 'main.bundle.js'
  },
  module: {
    loaders: [
      {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff"},
      {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader"}
    ]
  }
};
