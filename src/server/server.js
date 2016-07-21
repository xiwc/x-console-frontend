export class Server {

    // 配置路由
    configureRouter(config, router) {

        config.map([{
            route: ['dashboard'],
            name: 'dashboard',
            moduleId: 'server/server-dashboard',
            nav: true,
            title: '总览'
        }, {
            route: ['host'],
            name: 'host',
            moduleId: 'server/server-host',
            nav: true,
            title: '主机'
        }, {
            route: ['mirror'],
            name: 'mirror',
            moduleId: 'server/server-mirror',
            nav: true,
            title: '镜像'
        }, {
            route: ['disk'],
            name: 'disk',
            moduleId: 'server/server-disk',
            nav: true,
            title: '硬盘'
        }, {
            route: ['snapshot'],
            name: 'snapshot',
            moduleId: 'server/server-snapshot',
            nav: true,
            title: '快照'
        }, {
            route: ['ssh'],
            name: 'ssh',
            moduleId: 'server/server-ssh',
            nav: true,
            title: 'SSH秘钥'
        }, {
            route: ['security'],
            name: 'security',
            moduleId: 'server/server-security',
            nav: true,
            title: '安全组'
        }, {
            route: '',
            redirect: 'dashboard'
        }]);

        this.router = router;

    }

    /**
     * 当视图被附加到DOM中时被调用
     */
    attached() {
        _.toggleSidebar(true);
    }

    /**
     * 在视图模型(ViewModel)展示前执行一些自定义代码逻辑
     * @param  {[object]} params                参数
     * @param  {[object]} routeConfig           路由配置
     * @param  {[object]} navigationInstruction 导航指令
     * @return {[promise]}                      你可以可选的返回一个延迟许诺(promise), 告诉路由等待执行bind和attach视图(view), 直到你完成你的处理工作.
     */
    activate(params, routeConfig, navigationInstruction) {
        // _.toggleSidebar(true);
    }
}
