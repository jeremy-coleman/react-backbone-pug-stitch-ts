const webpack = require('webpack')
//const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
var path = require('path')

module.exports = {
  target: 'web',
  mode: 'development',
  devtool: 'eval',
  entry: {
    home: ['webpack-hot-middleware/client', './src/apps/home/client.tsx'],
    backbone: ['webpack-hot-middleware/client', './src/apps/backbone/client.tsx'],
    styled_components: ['webpack-hot-middleware/client', './src/apps/styled-components/client.tsx']
  },

  output: {
    filename: '[name].js',
    publicPath: '/static',
    //path: path.resolve(__dirname, 'public/static')
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        exclude: /node_modules/,
        use: [
          {loader: 'ts-loader'}
          ],
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('development')}),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  node: {
    fs: 'empty'
  }
}

