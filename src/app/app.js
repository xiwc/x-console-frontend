import 'wlzc-semantic-ui/semantic';

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
            route: ['db-relational'],
            name: 'db-relational',
            moduleId: 'db/db-relational',
            nav: true,
            title: '关系型数据库',
            type: 'db'
        }, {
            route: ['db-mongo'],
            name: 'db-mongo',
            moduleId: 'db/db-mongo',
            nav: true,
            title: 'MongoDB',
            type: 'db'
        }, {
            route: ['db-cache'],
            name: 'db-cache',
            moduleId: 'db/db-cache',
            nav: true,
            title: '缓存',
            type: 'db'
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

        $('body').on('click', '.nx-left-sidebar-menu .nx-labeled-icon-item .nx-second-menu .menu .item', function(event) {
            $(this).closest('.nx-second-menu').addClass('hidden');
            _.delay(() => { $(this).closest('.nx-second-menu').removeClass('hidden'); }, 100);
        });
    }
}