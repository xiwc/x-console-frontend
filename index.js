/**
 * 这里是Webpack app的入口程序.
 * 需要在这里添加任何垫片库和全局的运行时资源.
 */

// 这里加载font-awesome是为了尽可能早的显示fa-spinner(加载进度图标)
import './static/css/common.css';
// import 'vender/semantic-ui/semantic.css';
import 'wlzc-semantic-ui/semantic.css';
import 'wlzc-animate.css';

// 如果不需要Promise垫片可以注释掉(同时需要从config/webpack.config.js中移除)
import * as Bluebird from 'bluebird';
Bluebird.config({
    // 开启 程序运行栈信息打印输出
    // longStackTraces: true,
    // 开启 可取消
    // cancellation: true,
    // 开启 监视
    // monitoring: true,
    // 开启 警告
    warnings: false
});

import 'aurelia-polyfills';
import { initialize } from 'aurelia-pal-browser';

// PAL需要在Aurelia其它文件加载之前首先被初始化, 原因是: Webpack是立即解析全部的导入资源, 
// 而有些资源会使用'aurelia-pal'中的{DOM}, 所以需要它是提前已经初始化过的.
initialize();
