// import 'jquery';
// import '../../static/vender/semantic-ui/semantic';
// import 'vender/semantic-ui/semantic';
import 'wlzc-semantic-ui/semantic';
import 'toastr/build/toastr.css';

export class App {

    /**
     * 构造函数
     */
    constructor() {
        // toastr弹出消息提示插件全局配置设置
        toastr.options.positionClass = 'toast-bottom-center';
        toastr.options.preventDuplicates = true;
    }

    // 配置路由
    configureRouter(config, router) {

        // config.title = 'X资源管理控制台';
        config.map([{
            route: ['home'],
            name: 'home',
            moduleId: 'home',
            nav: false,
            label: '主页'
        }, {
            route: ['dashboard'],
            name: 'dashboard',
            moduleId: 'dashboard',
            nav: false,
            label: '总览'
        }, {
            route: '',
            redirect: 'home'
        }]);

        this.router = router;

    }

    /**
     * 当视图被附加到DOM中时被调用
     */
    attached() {
        $('.ui.accordion').accordion();
        $('.ui.dropdown').dropdown();
        $('.ui.dropdown.nx-dd-action-hide').dropdown({
            action: 'hide'
        });
        $('.ui.dropdown.nx-dd-action-hide-on-hover').dropdown({
            action: 'hide',
            on: 'hover'
        });
        $('.ui.modal').modal();

        $('.nx-menu-toggle').click(function(event) {
            var $lsm = $('.nx-body .nx-left-sidebar-menu');
            $lsm.toggleClass('labeled icon');
            $('.nx-body').toggleClass('nx-left-sidebar-menu-labeled-icon');
        });

        $('.nx-top-fixed-menu .nx-menu-item-pp')
            .popup({
                inline: true,
                offset: 1,
                distanceAway: -9,
                hoverable: true,
                position: 'bottom right',
                delay: {
                    show: 300,
                    hide: 300
                }
            });

        var historyTimer = null;
        $('.nx-menu-item-history').hover(function() {
            $('.nx-history').show();
        }, function(evt) {
            historyTimer = setTimeout(function() {
                $('.nx-history').hide();
            }, 200);
        });

        $('.nx-history').hover(function() {
            historyTimer && clearTimeout(historyTimer);
        }, function(evt) {
            $('.nx-history').hide();
        });
    }
}
