/* eslint-disable import/no-extraneous-dependencies */
const { resolve } = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const config = {
  context: resolve(__dirname, 'server'),
  entry: './index.ts',
  output: {
    filename: 'index.js',
    path: resolve(__dirname, 'build'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  target: 'node',
  stats: 'errors-only',
  plugins: [new NodemonPlugin(), new Dotenv()],
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
