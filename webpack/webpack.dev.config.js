/**
 * @file 调试环境webpack
 * @author 徐贤喆
 * @date 2021/03/01
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

// 用于开发环境调试, 必须要通过开发环境调试才允许正常发布组件
module.exports = require("./webpack.base.config")({
    entry: { 
      index: {
        import: path.resolve(__dirname, '../example/index.js'), // 入口文件
      },
    },
    mode: "development",
    output: {
        filename: '[name].js',
        chunkFilename: '[name].[id].js',
        publicPath: '/',
        path: path.resolve(__dirname, '../build'),
    },
    devtool: 'eval-source-map',
    devServer: {
      contentBase: path.resolve(__dirname, '../build'),
    },
    plugins: [
      // new CleanWebpackPlugin(), // 绝对不能开启, 否则编译好的组件目录将被清空
      new HtmlWebpackPlugin({
        inject: true,
        template: path.resolve(__dirname, '../example/index.html'),
      }),
      new WebpackManifestPlugin(), // 输出编译后的模块映射
      // https://stackoverflow.com/questions/64557638/how-to-polyfill-node-core-modules-in-webpack-5
      new NodePolyfillPlugin(), // webpack5不在运行时中添加node.js的核心模块, 借用插件按需加载核心模块 
    ],
    optimization: {
      minimize: true,
      minimizer: [
          new TerserPlugin({ // 定义bundle压缩
              parallel: true, // 开启多进程并发运行, 提高压缩速度
          }),
      ],
      nodeEnv: 'develop', // 设置process.env.NODE_ENV
      sideEffects: true, // 告诉webpack需要读取package.json
      concatenateModules: true, // 需要安全的合并模块
      /* 
        配置多模块入口点的时候必须要配置runtimeChunk为single。否则如果多模块使用同一模块变量时会发生离奇错误
        https://bundlers.tooling.report/code-splitting/multi-entry/ 
      */
      // runtimeChunk: 'single',  这里暂时不需要为每个模块定义运行时的映射, 单独的文件会增加网络请求负担
      splitChunks: { // 基本分割规则
          chunks: 'all', // 默认对所有模块进行代码分割
          maxInitialRequests: 10,
          minSize: 0,
          cacheGroups: {
              vendor: {
                  test: /[\\/]node_modules[\\/]/,
                  chunks: "initial" // 这里必须同步, 避免首屏加载node_modules包依赖过大
              },
          },
      },
  },
})