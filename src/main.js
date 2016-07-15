import { bootstrap } from 'aurelia-bootstrapper-webpack';

bootstrap(async(aurelia) => {
    aurelia.use
        .standardConfiguration()
        .developmentLogging();

    // 可以打开注释开启过渡动画
    // aurelia.use.plugin('aurelia-animator-css');
    // 如果开启了css过渡动画, 添加swap-order="after"到所有的router-view元素上.

    // 如果想使用HTMLImports来加载视图, 需要安装下面的插件.
    // aurelia.use.plugin('aurelia-html-import-template-loader')

    const rootElement = document.body;
    rootElement.setAttribute('aurelia-app', '');

    await aurelia.start();
    aurelia.setRoot('app', rootElement);

    // 如果你想你的站点可以离线访问(Service Worker), 
    // 安装并且开启@easy-webpack/config-offline依赖包(在webpack.config.js中), 并且取消注释下面的代码
    // const offline = await System.import('offline-plugin/runtime');
    // offline.install();
});
