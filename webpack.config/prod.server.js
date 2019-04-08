const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const resolvePath = relativePath => path.resolve(__dirname, relativePath);

module.exports = {
  name: 'server',
  mode: 'production',
  target: "node",
  node: {
    __dirname: false,
    __filename: false,
  },
  devtool: 'source-map',
  entry: {
    server: [
      '@babel/polyfill',
      resolvePath('../server.js'),
    ],
  },
  output: {
    path: resolvePath('../build'),
    filename: '[name].bundle.js',
  },
  externals: [
    nodeExternals({whitelist: /\.css$/}),
  ],
  resolve: {
    alias: {
      Components: resolvePath('../client/components'),
      Layouts: resolvePath('../client/layouts'),
      Pages: resolvePath('../client/pages'),
      Public: resolvePath('../public'),
      Assets: resolvePath('../public/assets'),
    },
    extensions: ['.mjs', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.style\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'css-loader',
            options: {
              camelCase: true,
              modules: true,
              importLoaders: 1,
              exportOnlyLocals: true,
              localIdentName: '[hash:base64]',
            }
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /\.style\.css$/,
        use: [
          {
            loader: 'css-loader',
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
              name: 'assets/[hash].[ext]',
              emitFile: false,
            },
          },
        ],
      },
    ],
  },
}