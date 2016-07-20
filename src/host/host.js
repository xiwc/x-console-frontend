export class Dashboard {

    msg = "总览页面";

    // 配置路由
    configureRouter(config, router) {

        config.map([{
            route: ['default'],
            name: 'default',
            moduleId: 'comp/default/default-pane',
            nav: false,
            label: '默认'
        }, {
            route: '',
            redirect: 'default'
        }]);

        this.router = router;

    }
}
