"use strict";
require('regenerator-runtime/runtime');

const webpack = require('webpack');
const AureliaWebpackPlugin = require('aurelia-webpack-plugin')

/**
 * 想要了解怎么使用Easy Webpack, 可以看看这里的README: https://github.com/easy-webpack/core
 **/
const easyWebpack = require('@easy-webpack/core');
const generateConfig = easyWebpack.default;
const get = easyWebpack.get;
const path = require('path');
const ELECTRON = process.env.ELECTRON && process.env.ELECTRON.toLowerCase() || false;
const ENV = process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() || 'development';
let config;

// 基本配置
const title = 'X资源管理控制台';
const baseUrl = '/';
const rootDir = path.resolve();
const srcDir = path.resolve('src');
const outDir = path.resolve('dist');

let envs = [

    // 开发
    {
        active: true,
        console: 'http://218.245.64.3:45417',
        yangyang: 'http://192.168.7.254:8081/yangyang/',
        platform: 'http://192.168.7.254:8080/platform/'
    },
    // 测试
    {
        // active: true,
        // console: 'http://192.168.205.12:8083',
        // console: 'http://220.248.17.34:8063',
        // console: 'http://192.168.205.12:8081',
        console: 'http://220.248.17.34:8061',
        yangyang: 'https://step.newtouchwork.com',
        platform: 'https://www.newtouchwork.com'
    },
    // 生产
    {
        // active: true,
        yangyang: 'https://step.newtouch.com',
        platform: 'https://www.newtouch.com'
    },
    // 李康华
    {
        //active: true,
        console: 'http://192.168.40.14:8080',
        yangyang: 'https://step.newtouch.com',
        platform: 'https://www.newtouch.com'
    },
    // 邓雷
    {
        // active: true,
        console: 'http://192.168.40.13:8080',
        yangyang: 'https://step.newtouch.com',
        platform: 'https://www.newtouch.com'
    }
];

let env = envs[0];

for (var i in envs) {
    if (envs[i].active) {
        env = envs[i];
        break;
    }
}

const coreBundles = {
    bootstrap: [
        'aurelia-polyfills',
        'aurelia-pal',
        'aurelia-pal-browser',
        'regenerator-runtime',
        'bluebird'
    ],
    // 除了上面bootstrap中的包, 下面这些包都会被打包到'aurelia'文件中
    aurelia: [
        'aurelia-bootstrapper-webpack',
        'aurelia-binding',
        'aurelia-dependency-injection',
        'aurelia-event-aggregator',
        'aurelia-framework',
        'aurelia-history',
        'aurelia-history-browser',
        'aurelia-loader',
        'aurelia-loader-webpack',
        'aurelia-logging',
        'aurelia-logging-console',
        'aurelia-metadata',
        'aurelia-pal',
        'aurelia-pal-browser',
        'aurelia-path',
        'aurelia-i18n',
        'aurelia-polyfills',
        'aurelia-route-recognizer',
        'aurelia-router',
        'aurelia-task-queue',
        'aurelia-templating',
        'aurelia-templating-binding',
        'aurelia-templating-router',
        'aurelia-templating-resources'
    ]
}

// 基础配置
const baseConfig = {
    entry: {
        'app': ['./src/main'],
        'aurelia-bootstrap': ['./index'].concat(coreBundles.bootstrap),
        'aurelia': coreBundles.aurelia.filter(pkg => coreBundles.bootstrap.indexOf(pkg) === -1)
    },
    output: {
        path: outDir
            // publicPath: "/mock/"
    },
    externals: {
        // jquery: "jQuery"
    },
    resolve: {
        alias: {
            vender: path.resolve(__dirname, 'static/vender'),
            nm: path.resolve(__dirname, "node_modules")
        }
    },
    plugins: [new webpack.ProvidePlugin({ // http://webpack.github.io/docs/list-of-plugins.html#provideplugin
        _: "lodash",
        Cookie: 'js-cookie',
        wurl: 'wurl',
        toastr: 'toastr',
        NProgress: 'nprogress'
    })]
}

// 高级配置:
switch (ENV) {
    case 'production': // 生产环境
        config = generateConfig(
            baseConfig,

            require('@easy-webpack/config-env-production')
            ({ compress: true }),

            require('@easy-webpack/config-aurelia')
            ({ root: rootDir, src: srcDir, title: title, baseUrl: baseUrl }),

            require('@easy-webpack/config-babel')(),
            require('@easy-webpack/config-html')(),

            require('@easy-webpack/config-css')
            ({ filename: 'common.css', allChunks: !!ELECTRON, sourceMap: false }),

            require('@easy-webpack/config-fonts-and-images')(),
            require('@easy-webpack/config-global-bluebird')(),
            require('@easy-webpack/config-global-jquery')(),
            require('@easy-webpack/config-global-regenerator')(),
            require('@easy-webpack/config-generate-index-html')
            ({ minify: true }),

            require('@easy-webpack/config-uglify')
            ({ debug: false })
        );
        break;

    case 'test': // 测试环境
        config = generateConfig(
            baseConfig,

            require('@easy-webpack/config-env-development')
            ({ devtool: 'inline-source-map' }),

            require('@easy-webpack/config-aurelia')
            ({ root: rootDir, src: srcDir, title: title, baseUrl: baseUrl }),

            require('@easy-webpack/config-babel')(),
            require('@easy-webpack/config-html')(),

            require('@easy-webpack/config-css')
            ({ filename: 'common.css', allChunks: !!ELECTRON, sourceMap: false }),

            require('@easy-webpack/config-fonts-and-images')(),
            require('@easy-webpack/config-global-bluebird')(),
            require('@easy-webpack/config-global-jquery')(),
            require('@easy-webpack/config-global-regenerator')(),
            require('@easy-webpack/config-generate-index-html')()
        );
        break;

    default:
    case 'development': // 开发环境
        process.env.NODE_ENV = 'development';
        config = generateConfig(
            baseConfig,

            require('@easy-webpack/config-env-development')(),

            require('@easy-webpack/config-aurelia')
            ({ root: rootDir, src: srcDir, title: title, baseUrl: baseUrl }),

            require('@easy-webpack/config-babel')(),
            require('@easy-webpack/config-html')(),

            require('@easy-webpack/config-css')
            ({ filename: 'common.css', allChunks: !!ELECTRON, sourceMap: false }),

            require('@easy-webpack/config-fonts-and-images')(),
            require('@easy-webpack/config-global-bluebird')(),

            require('@easy-webpack/config-global-jquery')(),
            require('@easy-webpack/config-global-regenerator')(),
            require('@easy-webpack/config-generate-index-html')
            ({ minify: false })
        );
        break;
}

if (ELECTRON) {
    config = generateConfig(
        config, { entry: ['./index', './src/main'] },
        require('@easy-webpack/config-electron')(),
        ELECTRON == 'main' ?
        require('@easy-webpack/config-electron-main')() : require('@easy-webpack/config-electron-renderer')()
    );
}

if (ENV !== 'test' && !ELECTRON) {
    config = generateConfig(
        config,
        require('@easy-webpack/config-common-chunks-simple')
        ({ appChunkName: 'app', firstChunk: 'aurelia-bootstrap' })
    );
}

if (ENV === 'test') {
    config = generateConfig(
        config,
        require('@easy-webpack/config-test-coverage-istanbul')()
    );
}

if (ENV === 'test' || ENV === 'development') {
    // http://webpack.github.io/docs/webpack-dev-server.html#proxy 
    // https://github.com/nodejitsu/node-http-proxy#options
    config.devServer.proxy = {
        '/v2/authentication/login/token': {
            target: env.platform,
            changeOrigin: true,
            secure: false
        },
        '/v2/*': {
            target: env.yangyang,
            changeOrigin: true,
            secure: false
        },
        '/api/*': {
            target: env.console
                // rewrite: function(req) {
                //     req.url = req.url.replace(/^\/api/, '');
                // }
        }
    }
}

module.exports = config;
