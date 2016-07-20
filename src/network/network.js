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
            route: '',
            redirect: 'dashboard'
        }]);

        this.router = router;

    }
}
