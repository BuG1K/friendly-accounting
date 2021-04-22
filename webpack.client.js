/* eslint-disable import/no-extraneous-dependencies */
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ProvidePlugin, HotModuleReplacementPlugin } = require('webpack');

const config = {
  context: resolve(__dirname, 'src'),
  entry: './index.tsx',
  output: {
    filename: 'main.js',
    path: resolve(__dirname, 'build'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: { '~': resolve(__dirname, 'src') },
  },
  devServer: {
    historyApiFallback: true,
    compress: true,
    hot: true,
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin(),
    new ProvidePlugin({ React: 'react' }),
  ],
  module: {
    rules: [
      {
        test: /\.ts$|tsx/,
        use: ['babel-loader', 'eslint-loader'],
      },
    ],
  },
};

module.exports = config;
