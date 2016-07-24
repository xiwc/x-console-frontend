// 定义API初始化全局函数
window.nsApiFunc = (function() {

    // API全局共享定义(real:真实远程调用URL, mock:自定义调试数据URL.)
    var api = {
        'host.hostList.get': { // TODO demo ajax method config.
            real: 'hosts.json',
            mock: 'mock/v2/host/hostList.get.json',
            ismock: true,
            method: 'get',
            payload: {},
            desc: '获取主机列表'
        },
        'host.create.post': { // TODO demo ajax method config.
            real: 'hostCreate.json',
            mock: 'mock/v2/host/hostCreate.post.json',
            ismock: true,
            method: 'post',
            payload: {},
            desc: '创建主机'
        },
        'user.userInfo.get': { // TODO demo ajax method config.
            real: '/v2/user/userInfo',
            mock: 'mock/v2/user/userInfo.get.json',
            ismock: false,
            method: 'get'
        },
    };

    // api debug配置初始化
    var apiDebugFunc = function() {

        // 判断URL中是否包含debug参数
        var debugVal = wurl('?debug');

        if (debugVal != null) {

            if (debugVal == 'all') { // 全部使用mock api
                for (var name in api) {
                    api[name].ismock = true;
                }
            } else {
                // 加载localStorage中上次保存的api debug设置
                // localStorage debug settings init
                var apiArr = localStorage.getItem('debug-settings');
                if (apiArr) {
                    $.each(JSON.parse(apiArr), function(index, api) {
                        for (var name in api) {

                            if (api.name === name) {
                                api[name].ismock = api.value.ismock;
                                continue;
                            }
                        }
                    });
                }
            }
        } else { // 如果不包含debug参数, 全部使用真的api
            for (var name in api) {
                api[name].ismock = false;
            }
        }
    };

    // API 初始化函数定义
    var apiFunc = function() {
        // api debug配置初始化
        apiDebugFunc();

        var ret = {
            // 编译api url中的可替换变量, eg: /v1/modifyTaskDetail/{taskId}
            compile: function(name) {
                var val = this[name];

                var args = Array.prototype.slice.call(arguments, 1);

                if (args.length > 0) {
                    var opts = args[0];
                    if ($.isPlainObject(opts)) {

                        for (var k in opts) {
                            val = val.replace(new RegExp('{' + k + '}', 'g'), opts[k]);
                        }
                    } else if ($.type(opts) === "array") {

                        $.each(opts, function(index, item) {
                            val = val.replace(/\{[a-zA-Z0-9\-_]+\}/, item);
                        });

                    } else {
                        $.each(args, function(index, item) {
                            val = val.replace(/\{[a-zA-Z0-9\-_]+\}/, item);
                        });
                    }
                }

                return val;
            }
        };

        for (var name in api) {

            if (api.hasOwnProperty(name)) {
                var prop = api[name].ismock ? 'mock' : 'real';
                ret[name] = api[name][prop];
            }

        }

        window.nsApi = ret;
    };
    // API函数初始化执行
    apiFunc();
    window.nsAPI = api;

    return apiFunc;
})();
