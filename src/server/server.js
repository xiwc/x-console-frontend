export class Server {

    // 配置路由
    configureRouter(config, router) {

        config.map([{
            route: ['dashboard'],
            name: 'dashboard',
            moduleId: 'server/server-dashboard',
            nav: true,
            title: '总览',
            disabled: true
        }, {
            route: ['host'],
            name: 'host',
            moduleId: 'server/server-host',
            nav: true,
            title: '主机'
        }, {
            route: ['host-details/:id'],
            name: 'host-details',
            moduleId: 'server/server-host-details',
            nav: false,
            title: '主机详情'
        }, {
            route: ['mirror'],
            name: 'mirror',
            moduleId: 'server/server-mirror',
            nav: true,
            title: '镜像'
        }, {
            route: ['mirror-details/:id'],
            name: 'mirror-details',
            moduleId: 'server/server-mirror-details',
            nav: false,
            title: '镜像详情'
        }, {
            route: ['disk'],
            name: 'disk',
            moduleId: 'server/server-disk',
            nav: true,
            title: '硬盘'
        }, {
            route: ['disk-details/:id'],
            name: 'disk-details',
            moduleId: 'server/server-disk-details',
            nav: false,
            title: '硬盘详情'
        }, {
            route: ['snapshot'],
            name: 'snapshot',
            moduleId: 'server/server-snapshot',
            nav: true,
            title: '快照',
            disabled: true
        }, {
            route: ['ssh'],
            name: 'ssh',
            moduleId: 'server/server-ssh',
            nav: true,
            title: 'SSH密钥'
        }, {
            route: ['ssh-details/:id'],
            name: 'ssh-details',
            moduleId: 'server/server-ssh-details',
            nav: false,
            title: 'SSH秘钥详情'
        }, {
            route: ['security'],
            name: 'security',
            moduleId: 'server/server-security',
            nav: true,
            title: '安全组',
            disabled: true
        }, {
            route: ['security-details/:id'],
            name: 'security-details',
            moduleId: 'server/server-security-details',
            nav: false,
            title: '安全组详情'
        }, {
            route: ['port'],
            name: 'port',
            moduleId: 'comp/default/default-pane',
            nav: true,
            title: '端口映射',
            disabled: true
        }, {
            route: ['web'],
            name: 'web',
            moduleId: 'comp/default/default-pane',
            nav: true,
            title: 'WEB域名映射',
            disabled: true
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
