export class DbRelational {

    msg = '关系型数据库';

    // 配置路由
    configureRouter(config, router) {

        config.map([{
            route: ['dashboard'],
            name: 'dashboard',
            moduleId: 'network/network-dashboard',
            nav: true,
            title: '总览',
            type: 'common'
        }, {
            route: ['private'],
            name: 'private',
            moduleId: 'network/network-private',
            nav: true,
            title: '私有网络',
            type: 'common'
        }, {
            route: ['router'],
            name: 'router',
            moduleId: 'network/network-router',
            nav: true,
            title: '路由器',
            type: 'common'
        }, {
            route: ['public'],
            name: 'public',
            moduleId: 'network/network-public',
            nav: true,
            title: '公网IP',
            type: 'common'
        }, {
            route: ['alert'],
            name: 'alert',
            moduleId: 'comp/default/default-pane',
            nav: true,
            title: '监控告警',
            type: 'test'
        },  {
            route: ['timer'],
            name: 'timer',
            moduleId: 'comp/default/default-pane',
            nav: true,
            title: '定时器',
            type: 'test'
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
        $(this.accMenu).accordion();
    }
}
