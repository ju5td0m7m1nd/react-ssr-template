var webpack = require("webpack");

module.exports = {
  entry: {
    app: './client/client.js',
  },
  output: {
    path: './public/scripts/',
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin({
    }),
  ],
  devtool: '#source-map',
  module: {
    loaders: [
      {
        test: /.js?$/ | /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ]
  },
  resolve: {
    extensions: [
      "",
      ".js",
      ".jsx",
    ],
  },
};
