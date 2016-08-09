// import 'vender/semantic-ui/semantic';
import 'wlzc-semantic-ui';
import 'jquery-tablesort';
import { inject, Lazy } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class App {

    /**
     * 构造函数
     */
    constructor(eventAggregator) {
        this.eventAggregator = eventAggregator;
        this.subscribe = this.eventAggregator.subscribe(nsCons.EVENT_APP_ROUTER_NAVIGATE_TO, (payload) => {
            this.router.navigate(payload.to);
        });
    }

    /**
     * 当数据绑定引擎从视图解除绑定时被调用
     */
    unbind() {
        this.subscribe.dispose();
    }

    // 配置路由
    configureRouter(config, router) {

        // config.title = 'X资源管理控制台';

        config.map([{
            route: ['server'],
            name: 'server',
            moduleId: 'server/server',
            nav: true,
            title: '云服务器',
            icon: 'server',
            type: 'common'
        }, {
            route: ['network'],
            name: 'network',
            moduleId: 'network/network',
            nav: true,
            title: '专用VPC网络',
            icon: 'connectdevelop',
            type: 'common'
        }, {
            route: ['rds'],
            name: 'rds',
            moduleId: 'comp/default/default-pane',
            nav: true,
            title: 'RDS',
            type: 'common'
        }, {
            route: ['redis'],
            name: 'redis',
            moduleId: 'comp/default/default-pane',
            nav: true,
            title: 'Redis',
            type: 'common'
        }, {
            route: ['mongodb'],
            name: 'mongodb',
            moduleId: 'comp/default/default-pane',
            nav: true,
            title: 'MongoDB',
            type: 'common'
        }, {
            route: '',
            redirect: 'server'
        }]);

        this.router = router;

    }

    /**
     * 当视图被附加到DOM中时被调用
     */
    attached() {

        // toastr.info(_.tr('key', { someone: 'john' }));

        // $('.ui.accordion').accordion();
        // $('.ui.dropdown').dropdown();
        // $('.ui.dropdown.nx-dd-action-hide').dropdown({
        //     action: 'hide'
        // });
        // $('.ui.dropdown.nx-dd-action-hide-on-hover').dropdown({
        //     action: 'hide',
        //     on: 'hover'
        // });
        // $('.ui.modal').modal();

        // var historyTimer = null;
        // $('.nx-menu-item-history').hover(function() {
        //     $('.nx-history').show();
        // }, function(evt) {
        //     historyTimer = setTimeout(function() {
        //         $('.nx-history').hide();
        //     }, 200);
        // });

        // $('.nx-history').hover(function() {
        //     historyTimer && clearTimeout(historyTimer);
        // }, function(evt) {
        //     $('.nx-history').hide();
        // });

        $('body').on('click', '.nx-left-sidebar-menu .nx-labeled-icon-item .nx-second-menu .menu .item', function(event) {
            $(this).closest('.nx-second-menu').addClass('hidden');
            _.delay(() => { $(this).closest('.nx-second-menu').removeClass('hidden'); }, 100);
        });
    }
}
