export class InfoPane {

    // 构造函数
    constructor() {}

    // 配置路由
    configureRouter(config, router) {

        config.map([{
            route: ['error'],
            name: 'error',
            moduleId: 'info/error/error-pane',
            nav: false,
            title: '错误提醒'
        }, {
            route: ['success'],
            name: 'success',
            moduleId: 'info/success/success-pane',
            nav: false,
            title: '成功提醒'
        }, {
            route: '',
            redirect: 'error'
        }]);

        this.router = router;
    }

    attached() {

        this.isMobile = _.isMobile();
    }

}
