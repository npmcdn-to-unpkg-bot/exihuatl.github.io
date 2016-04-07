module.exports = {
  entry: './src/main.jsx',
  output: {
    path: './dist/',
    filename: 'app.js',
    pathInfo: true,
    publicPath: '/dist/',
  },
  debug: true,
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'react-hmre'],
        },
      },
    ],
  },
};
