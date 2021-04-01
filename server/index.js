/**
 * @file 本地服务器配置
 * @author 徐贤喆
 * @date 2021/03/01
 */
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const config = require('../webpack/webpack.dev.config.js');
const compiler = webpack(config);
const app = express();

const HOST = process.env.HOST || "0.0.0.0"

console.log(HOST)

// 告知 express 使用 webpack-dev-middleware，
// 以及将 webpack.config.js 配置文件作为基础配置。
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
);

// 将文件 serve 到 port 3000。
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});