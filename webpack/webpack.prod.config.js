/**
 * @file 发包环境webpack
 * @author 徐贤喆
 * @date 2021/03/01
 */
const path = require('path');
const allExternals = require('webpack-node-externals');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = require('./webpack.base.config')({
    entry: { 
      index: {
        import: path.resolve(__dirname, '../component/index.js'), // 打包组件入口文件
      },
    },
    mode: "production",
    output: {
        filename: 'index.js',
        chunkFilename: '[name].[id].js',
        publicPath: '/',
        path: path.resolve(__dirname, '../build'),
        // library: "self-component-test",
        /**
         * https://zhuanlan.zhihu.com/p/108216236
         */
        libraryTarget: 'umd', 
        umdNamedDefine: true,
        globalObject: 'this',
        /**
         * https://twindy.org/webpackda-bao-umdde-exportwen-ti/
         */
        // libraryExport: 'default', // 兼容 ES6 的模块系统、CommonJS 和 AMD 模块规范
    },
    optimization: {
      minimize: true,
      minimizer: [
          new TerserPlugin({ // 定义bundle压缩
              parallel: true, // 开启多进程并发运行, 提高压缩速度
          }),
      ],
      nodeEnv: 'develop', // 设置process.env.NODE_ENV
      sideEffects: true, // 告诉webpack需要读取package.json
    },
    plugins: [],
    externals: [
      // 定义不打包的外部依赖, 这里所有的东西都由宿主环境提供, 为了不让包增加额外的副作用
      allExternals()
    ]
})