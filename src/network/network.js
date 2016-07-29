export class Network {

    // 配置路由
    configureRouter(config, router) {

        config.map([{
            route: ['dashboard'],
            name: 'dashboard',
            moduleId: 'network/network-dashboard',
            nav: true,
            title: '总览'
        }, {
            route: ['private'],
            name: 'private',
            moduleId: 'network/network-private',
            nav: true,
            title: '私有网络'
        }, {
            route: ['private-details/:id'],
            name: 'private-details',
            moduleId: 'network/network-private-details',
            nav: false,
            title: '私有网络详情'
        }, {
            route: ['router'],
            name: 'router',
            moduleId: 'network/network-router',
            nav: true,
            title: '路由器'
        }, {
            route: ['public'],
            name: 'public',
            moduleId: 'network/network-public',
            nav: true,
            title: '公网IP'
        }, {
            route: ['firewall'],
            name: 'firewall',
            moduleId: 'network/network-firewall',
            nav: true,
            title: '防火墙'
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
