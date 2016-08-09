// 全局配置定义
window.nsConfig = (function() {

    return {
        // // cookie过期时间
        // cookieExpires: 365,
        // // cookie path
        // cookiePath: '/',
        // scrollParam: {
        //     theme: 'minimal-dark'
        // },
        // timepickerParam: {
        //     format: 'Y-m-d',
        //     timepicker: false,
        //     lang: 'zh',
        //     scrollInput: false,
        //     step: 5,
        //     weeks: false
        // }

        // 默认分页大小
        pageSize: 10
    }
})();

// 全局上下文环境定义
window.nsCtx = (function() {

    return {
        user: { //登录用户信息
            loginName: '', // 登录用户ID
            realName: '',
            icon: '',
            language: '',
            emails: [],
            mobiles: [],
            resourceEmails: []
        },

        // TODO 设置全局访问token
        accessToken: '1',
        regionId: '1',

        isDebug: false, // 是否为debug

        topMenuHeight: 47, // 顶部菜单栏高度
    }
})();

// 全局常量定义
window.nsCons = (function() {

    return {
        // access token 常量key
        ACCESS_TOKEN: "ACCESSTOKEN",
        ACCESS_TOKEN_NAME: "accessToken",
        I18N_LNG: 'language',

        EVENT_APP_ROUTER_NAVIGATE_TO: 'event_app_router_navigate_to',

        // EVENT_MY_TASK_CREATE_MAIN_TASK_MODAL_ON_SHOW: 'event_my_task_create_main_task_modal_on_show',
        // EVENT_MY_TASK_CREATE_SUB_TASK_MODAL_ON_SHOW: 'event_my_task_create_sub_task_modal_on_show',
    }
})();

// 全局参数定义
window.nsParam = (function() {

    var envs = {
        pre: { // 预发布
            when: ['stepdev.sh1.newtouch.com'],
            socketUrl: '//stest.newtouch.com',
            loginUrl: '//workdev.sh1.newtouch.com',
            logoutUrl: '//workdev.sh1.newtouch.com',
            baseUrl: 'http://resource.sh1.newtouch.com/json/',
            userTwodimensionalcodeUrl: 'stepdev.sh1.newtouch.com'
        },
        self: { // 本机环境
            when: ['127.0.0.1', 'localhost'],
            // socketUrl: '//192.168.7.254:10098',
            openfireUrl: '//192.168.7.7:7070/http-bind/',
            loginUrl: '//127.0.0.1',
            logoutUrl: '//127.0.0.1',
            // baseUrl: 'http://resource.sh1.newtouch.com/json/',
            baseUrl: 'http://218.245.64.3:45417/',
            userTwodimensionalcodeUrl: '127.0.0.1:81'
        },
        dev: { // 开发环境
            when: ['192.168.7.15'],
            // socketUrl: '//192.168.7.254:10098',
            openfireUrl: '//192.168.7.7:7070/http-bind/',
            loginUrl: '//192.168.7.15',
            logoutUrl: '//192.168.7.15',
            baseUrl: 'http://resource.sh1.newtouch.com/json/',
            userTwodimensionalcodeUrl: '192.168.7.15:81'
        },
        test: { // IDC测试环境
            when: ['step.newtouchwork.com'],
            // socketUrl: '//step.newtouchwork.com',
            openfireUrl: '//step.newtouchwork.com/http-bind/',
            loginUrl: '//www.newtouchwork.com',
            logoutUrl: '//www.newtouchwork.com',
            baseUrl: 'http://resource.sh1.newtouch.com/json/',
            userTwodimensionalcodeUrl: 'step.newtouchwork.com'
        },
        prod: { // 生产环境
            when: ['newtouch.com'],
            // socketUrl: '//step.newtouch.com',
            openfireUrl: '//step.newtouch.com/http-bind/',
            loginUrl: '//www.newtouch.com',
            logoutUrl: '//www.newtouch.com',
            baseUrl: 'http://resource.sh1.newtouch.com/json/',
            userTwodimensionalcodeUrl: 'step.newtouch.com'
        },
        stress: { // 压力测试环境
            when: ['218.245.64.3'],
            socketUrl: '//218.245.64.3:45092',
            loginUrl: '//218.245.64.3:45079',
            logoutUrl: '//218.245.64.3:45079',
            baseUrl: 'http://resource.sh1.newtouch.com/json/',
            userTwodimensionalcodeUrl: '218.245.64.3:45080'
        }
    };

    for (var env in envs) {
        for (var w in envs[env].when) {
            if (window.location.href.indexOf(envs[env].when[w]) !== -1) {
                envs[env].env = env;
                return (envs[env]);
            }
        }
    }

    envs['prod'].env = 'prod';
    return envs['prod'];
})();
