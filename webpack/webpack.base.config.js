/**
 * @file webpack基础配置
 * @author 徐贤喆
 * @date 2021/03/01
 */
const path = require("path")
const webpack = require("webpack")

module.exports = (options) => ({
    mode: options.mode,
    entry: options.entry,
    output: {
        path: path.resolve(process.cwd(), 'build'),
        publicPath: '/',
        ...options.output
    },
    devtool: options.devtool,
    devServer: options.devServer,
    optimization: options.optimization,
    module:{
        rules: [
            {
                test: /\.(js|ts)$/,
                enforce: 'pre',
                exclude: /node_modules/,
                use: {
                    loader: 'eslint-loader',
                },
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /(node_modules)/,
                use: [{
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }, 'ts-loader'],
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                      presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.less$/i,
                use: ['style-loader', 'css-loader', 'less-loader'],
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ]
    },
    externals: options.externals, // 仅组件完成发布需要, 建议所有依赖全部由宿主环境提供
    plugins: options.plugins.concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),
    ]),
    resolve: {
        mainFields: ['main'], // import时优先从package.json中的main字段去搜索文件
        extensions: ['.tsx', '.ts', '.js', '.jsx'], // 解析文件优先从.tsx, .ts后缀的文件进行解析
    },
    performance: options.performance || {}
})