const path = require('path')
const webpack = require('webpack');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const resolvePath = relativePath => path.resolve(__dirname, relativePath);

module.exports = {
  name: 'client',
  mode: 'production',
  target: 'web',
  devtool: 'cheap-module-source-map',
  entry: {
    app: [
      '@babel/polyfill',
      resolvePath('../client/index.js'),
    ],
    vendor: [
      'react',
      'react-dom',
      'lodash',
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, '..','build','client'),
    publicPath: '/',
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
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.style\.css$/,
        exclude: /node_modules/,
        use: [
          miniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              camelCase: true,
              modules: true,
              importLoaders: 1,
              sourceMap: true,
              localIdentName: '[hash:base64]',
            }
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /\.style\.css$/,
        use: [
          'css-hot-loader',
          miniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 3,
              sourceMap: true,
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
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ManifestPlugin(),
    new miniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'PORT': 7777,
      }
    })
  ],
}