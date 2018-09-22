const webpack = require('webpack')
//const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
var path = require('path')

module.exports = {
  target: 'web',
  mode: 'production',
  devtool: 'eval',
  entry: {
    home: ['./src/apps/home/client.tsx'],
    backbone: ['./src/apps/backbone/client.tsx'],
    styled_components: ['./src/apps/styled-components/client.tsx']
  },

  output: {
    filename: '[name].js',
    publicPath: '/',
    path: path.resolve(__dirname, 'public/static')
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
    new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('production')})
   // new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  node: {
    fs: 'empty'
  }
}

