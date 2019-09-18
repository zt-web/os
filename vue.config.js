const webpack = require('webpack');
const path = require('path')
const CompressionPlugin = require("compression-webpack-plugin");
let { version, openGzip } = require('./package.json');
version = version.replace(/\./g,'_');

module.exports = {
    publicPath:process.env.NODE_ENV === 'production' ? '/vue':'/',    //基本路径
    outputDir:'dist',   //文件输出路径
    assetsDir: 'static',    //静态资源文件
    lintOnSave:false,   //eslint-loader 是否在保存的时候检查
    //webpack配置
    chainWebpack: (config) => {
        config.resolve
            .symlinks(true)  // 修复HMR
        config.module
            .rule('image')
            .use('image-webpack-loader')
            .loader('image-webpack-loader')
    },
    configureWebpack: (config) =>{
        if (process.env.NODE_ENV === 'production') {
            //生产环境
            config.mode = 'production'
            // 将每个依赖包打包成单独的js文件
            let optimization = {
                runtimeChunk: 'single',
                splitChunks: {
                    chunks: 'all',
                    maxInitialRequests: Infinity,
                    minSize: 20000, // 依赖包超过20000bit将被单独打包
                    cacheGroups: {
                        vendor: {
                            test: /[\\/]node_modules[\\/]/,
                            name (module) {
                                // get the name. E.g. node_modules/packageName/not/this/part.js
                                // or node_modules/packageName
                                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                                // npm package names are URL-safe, but some servers don't like @ symbols
                                return `npm.${packageName.replace('@', '')}`
                            }
                        }
                    }
                }
            }
            Object.assign(config, {
                // 输出js文件加入版本号
                output:{
                    ...config.output,
                    filename: `static/js/[name].[chunkhash].${version}.js`,
                    chunkFilename: `static/js/[name].[chunkhash].${version}.js`
                },
                optimization
            })
            // 开启Gzip压缩
            if(openGzip){
                config.plugins = [
                    ...config.plugins,
                    new CompressionPlugin({
                        test:/\.js$|\.html$|.\css/, //匹配文件名
                        threshold: 10240,//对超过10k的数据压缩
                        deleteOriginalAssets: false //不删除源文件
                    })
                ]
            }
        }else{
            //开发环境
            config.mode = 'development'
        }
        Object.assign(config)
    },
    runtimeCompiler: false,  //默认false ，是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
    productionSourceMap: false ,    //如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
    css: {
        sourceMap: false, //开启 CSS source maps?
        // css预设器配置项
        loaderOptions: {
            less: {
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader",
            },
        },
        modules: false, //启用 CSS modules for all css / pre-processor files.
    },
    parallel: require('os').cpus().length > 1, //是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
    pwa: {} , //    向 PWA 插件传递选项
    // 这是一个不进行任何 schema 验证的对象，因此它可以用来传递任何第三方插件选项。例如：
    pluginOptions: {
        foo: {
            // 插件可以作为 `options.pluginOptions.foo` 访问这些选项。
        }
    },
    // 开发环境配置
    devServer: {
        port:'80', // 端口
        host: '0.0.0.0', // 允许外部ip访问
        https: false, // 启用https
    },
    overlay: {
        warnings: true,
        errors: true
    }, // 错误、警告在页面弹出
    // proxy: {
    //     '/api': {
    //         target: 'http://www.baidu.com/api',
    //         changeOrigin: true, // 允许websockets跨域
    //         // ws: true,
    //         pathRewrite: {
    //             '^/api': ''
    //         }
    //     }
    // } // 代理转发配置，用于调试环境

}
