const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const resolvePath = relativePath => path.resolve(__dirname, relativePath);

module.exports = {
  name: 'server',
  mode: 'development',
  entry: [
    '@babel/polyfill',
    resolvePath('../server.js')
  ],
  target: 'node',
  externals: [nodeExternals()],
  output: {
    filename: 'dev-server.bundle.js',
    path: resolvePath('../dist'),
    chunkFilename: '[name].js',
  },
  resolve: {
    alias: {
      Components: resolvePath('../client/components'),
      Layouts: resolvePath('../client/layouts'),
      Pages: resolvePath('../client/pages'),
      Public: resolvePath('../public'),
      Assets: resolvePath('../public/assets'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
          },
        ],
      },
      {
        test: /\.style\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('css-loader'),
            options: {
              camelCase: true,
              modules: true,
              importLoaders: 1,
              exportOnlyLocals: true,
              localIdentName: '[name]_[local]_[hash:base64:6]',
            }
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /\.style\.css$/,
        use: [
          {
            loader: require.resolve('css-loader'),
            options: {
              modules: true,
              importLoaders: 2,
              exportOnlyLocals: true,
              localIdentName: '[local]',
            }
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[hash:8].[ext]',
              emitFile: false,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    })
  ],
}