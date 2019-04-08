const path = require('path')
const webpack = require('webpack')
const writeFileWebpackPlugin = require('write-file-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

const resolvePath = relativePath => path.resolve(__dirname, relativePath);

module.exports = {
  name: 'client',
  mode: 'development',
  target: 'web',
  devtool: 'cheap-module-source-map',
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
      Components: resolvePath('../client/components'),
      Layouts: resolvePath('../client/layouts'),
      Pages: resolvePath('../client/pages'),
      Public: resolvePath('../public'),
      Assets: resolvePath('../public/assets'),
    },
  },
  entry: {
    app: [
      '@babel/polyfill',
      'webpack/hot/only-dev-server',
      'react-hot-loader/patch',
      resolvePath('../client/index.js'),
    ],
    vendor: [
      'react',
      'react-dom'
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: resolvePath('../dist/client'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
        options: {
          cacheDirectory: true,
          plugins: ['react-hot-loader/babel'],
        },
      },
      {
        test: /\.style\.css$/,
        exclude: /node_modules/,
        use: [
          'css-hot-loader',
          miniCssExtractPlugin.loader,
          {
            loader: require.resolve('css-loader'),
            options: {
              camelCase: true,
              modules: true,
              importLoaders: 1,
              sourceMap: true,
              localIdentName: '[name]_[local]_[hash:base64:6]',
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
            loader: require.resolve('css-loader'),
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
              name: 'assets/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new writeFileWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new miniCssExtractPlugin({
      filename: '[name].css',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    })
  ],
}