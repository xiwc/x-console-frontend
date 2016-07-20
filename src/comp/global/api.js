// 定义API初始化全局函数
window.nsApiFunc = (function() {

    // API全局共享定义(real:真实远程调用URL, mock:自定义调试数据URL.)
    var api = {
        // 'v1.team.teamBean': {
        //     real: '/v1/team/teamBean',
        //     mock: '/mock/yangyang/v1/team/teamBean.json',
        //     ismock: true,
        //     method: 'get'
        // }
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
            },
            mock: function(name, index) {

                for (var n in api) {

                    if (api.hasOwnProperty(n) && name == n) {
                        var prop = index ? 'mock_' + index : 'mock';
                        nsApi[n] = api[n][prop];
                    }

                }
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

// ajax全局配置选项设置
$.ajaxSetup({
    cache: false
});

$(document).ajaxSend(function(evt, request, settings) {

    // 当使用mock API时,修改请求类型为GET方式
    if (settings.url.indexOf('/mock/') === 0) {
        settings.type = "GET";
    }

});

// ajax请求成功, 拦截后台操作错误的提示消息
$(document).ajaxSuccess(function(event, xhr, settings) {

    if (xhr.responseJSON && xhr.responseJSON.code && xhr.responseJSON.code !== 'SUCCESS') {
        if ('UNLOGIN' === xhr.responseJSON.code) {
            var url = window.location.href;
            url = url.replace(/[&]?accessToken[=]?[^&]*/g, '');

            nsCtx.ajaxClose = true;
            nsCtx.ajaxOperCache = [];
            var clientNum = 0;
            if (clientNum == 0) {
                clientNum = 1;
                var _form = $("<form></form>", {
                    'id': 'oAuthForm',
                    'method': 'post',
                    'action': nsParam.loginUrl + '/oauth2/authorize'
                }).appendTo($("body"));
                var args = {
                        client_id: '481c89100ea34c22ba1701fed70dd204',
                        client_secret: 'step.newtouch.com',
                        redirect_uri: url,
                        response_type: 'code'
                    }
                    // 将隐藏域加入表单
                for (var i in args) {
                    _form.append($("<input>", {
                        'type': 'hidden',
                        'name': i,
                        'value': args[i]
                    }));
                }
                $('#oAuthForm').submit();
                // 触发提交事件
                setTimeout(function() {
                    clientNum = 0;
                }, 10000);
                //表单删除 
                _form.remove();
            }
        } else if (!xhr.responseJSON.address && xhr.responseJSON.code !== 100000) { //code==100000时是机器人接口
            // ajax调用者设置不对当前请求全局错误提示.
            if (_.noGlobalError(xhr)) {
                return;
            }

            toastr.error(_.tr('error.' + xhr.responseJSON.code), null, {
                "closeButton": true,
                "progressBar": true,
                "positionClass": "toast-top-center",
                "preventDuplicates": true
            });
        }
    }
});

// ajax请求失败, 提示网络请求错误消息
$(document).ajaxError(function(event, xhr, settings, exception) {

    // ajax调用者设置不对当前请求全局错误提示.
    if (_.noGlobalError(xhr)) {
        return;
    }

    var code = xhr && xhr.responseJSON && xhr.responseJSON.code;
    code = code ? code : 'SYSTEM_ERROR';

    // 全局错误拦截提示
    toastr.error(_.tr('error.' + code), null, {
        "closeButton": true,
        "progressBar": true,
        "positionClass": "toast-top-center",
        "preventDuplicates": true
    });
});

// 扩展jquery ajax支持put delete方法.
jQuery.each(["put", "delete"], function(i, method) {

    jQuery[method] = function(url, data, callback, type) {
        // shift arguments if data argument was omitted
        if (jQuery.isFunction(data)) {
            type = type || callback || 'json';
            callback = data;
            data = undefined;
        }

        return jQuery.ajax({
            url: url,
            type: method,
            dataType: type,
            data: data,
            success: callback
        });
    };
});
