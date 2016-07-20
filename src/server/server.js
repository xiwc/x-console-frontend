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

}
