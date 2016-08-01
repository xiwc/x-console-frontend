import "isomorphic-fetch";
import { bootstrap } from 'aurelia-bootstrapper-webpack';
import "comp/global/config";
import "comp/global/helper";
import "comp/global/api";
import { I18N } from 'aurelia-i18n';
import Backend from 'i18next-xhr-backend';

bootstrap(async(aurelia) => {
    aurelia.use
        .standardConfiguration()
        .developmentLogging()
        .feature('comp/init')
        .plugin('aurelia-i18n', (i18n) => {
            // register backend plugin
            i18n.i18next.use(Backend);
            // 添加i18n对象为全局对象
            _.i18n = i18n;
            _.tr = _.bind(i18n.tr, i18n);

            var lng = Cookie.get(nsCons.I18N_LNG);
            lng = lng ? lng.replace(/["']/g, '') : 'zh';

            // // 同步当前语言到数据库
            // if (lng != nsCtx.user.language) {
            //     nsCtx.user.language = lng; // 同步ctx
            //     _.saveLng(lng); // TODO 是否要提醒用户同步失败或者成功?
            // }

            // 设置cookie
            Cookie.set(nsCons.I18N_LNG, lng);

            // adapt options to your needs (see http://i18next.com/docs/options/)
            // make sure to return the promise of the setup method, in order to guarantee proper loading
            return i18n.setup({
                backend: {
                    loadPath: './locale/{{lng}}/{{ns}}.json',
                },
                lng: lng,
                attributes: ['t', 'i18n'],
                fallbackLng: 'zh',
                debug: false
            });
        })
        .globalResources(['comp/debug/debug', 'comp/global/converter', 'comp/dimmer', 'comp/dimmer-url', 'comp/task', 'comp/if-locale', 'comp/attr', 'comp/chk', 'comp/cls-locale']);


    // 可以打开注释开启过渡动画
    // aurelia.use.plugin('aurelia-animator-css');
    // 如果开启了css过渡动画, 添加swap-order="after"到所有的router-view元素上.

    // 如果想使用HTMLImports来加载视图, 需要安装下面的插件.
    // aurelia.use.plugin('aurelia-html-import-template-loader')

    const rootElement = document.body;
    rootElement.setAttribute('aurelia-app', '');

    await aurelia.start();
    aurelia.setRoot('app/app', rootElement);

    // 如果你想你的站点可以离线访问(Service Worker), 
    // 安装并且开启@easy-webpack/config-offline依赖包(在webpack.config.js中), 并且取消注释下面的代码
    // const offline = await System.import('offline-plugin/runtime');
    // offline.install();
});
