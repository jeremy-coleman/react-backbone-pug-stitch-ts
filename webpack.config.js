const webpack = require('webpack')

module.exports = {
  mode: 'none',
  devtool: 'eval',
  entry: {
    home: [
      './src/apps/home/client.tsx'
    ],
    backbone: [
      './src/apps/backbone/client.tsx'
    ],
    styled_components: [
      './src/apps/styled-components/client.tsx'
    ]
  },
  output: {
    filename: '[name].js',
    publicPath: '/static'
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
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  node: {
    fs: 'empty'
  }
}
