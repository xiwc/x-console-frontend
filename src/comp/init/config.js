import { HttpClient } from 'aurelia-fetch-client';

export class Config {

    initHttp() {
        let http = this.aurelia.container.root.get(HttpClient);
        http.configure(config => {
            config
            // .withBaseUrl(nsParam.baseUrl)
                .withDefaults({
                    credentials: 'same-origin',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                .withInterceptor({
                    request(req) {
                        if (req.url.indexOf('/mock/') > -1) {
                            let url = req.url.replace(nsParam.baseUrl, '');
                            req = new Request(url, {
                                method: 'GET'
                            });
                        }

                        // toastr.info(`Requesting ${req.method} ${req.url}`);
                        NProgress && NProgress.start();

                        return req;
                    },
                    requestError(req) {
                        console.log(req);
                    },
                    response(resp) {
                        NProgress && NProgress.done();
                        if (!resp.ok) {
                            resp.json().then((data) => {
                                toastr.error('PATH: ' + data.path + '<br/>STATUS: ' + data.status + '<br/>EXCEPTION:<br/>' + data.exception + '<br/>MESSAGE:<br/>' + data.message, data.error);
                            });

                            if (resp.status == 401) {
                                window.location.href = "/login/login.html"; // TODO 临时跳转路径
                                return;
                            }

                            // throw new Error('调用异常!');
                        }

                        return resp;
                    },
                    responseError(resp) {
                        toastr.error(resp.message, '网络请求错误!');
                        console.log(resp);
                    }
                });
        });

        return this;
    }

    initToken() {
        // 解析URL中的ACCESS_TOKEN, 存放到cookie中
        // 该端代码逻辑放在靠前位置, 因为如果修改url地址, 会重新刷新加载该框架.
        var token = wurl('?' + nsCons.ACCESS_TOKEN_NAME);

        if (token) {

            // if (!_(['prod', 'test']).includes(nsParam.env)) {
            Cookie.set(nsCons.ACCESS_TOKEN, token);
            // }

            if ('pushState' in history) {
                history.replaceState(null, '', _.removeUrlQuery(nsCons.ACCESS_TOKEN_NAME));
            } else {
                window.location.href = _.removeUrlQuery(nsCons.ACCESS_TOKEN_NAME);
            }
        }

        nsCtx.accessToken = Cookie.get(nsCons.ACCESS_TOKEN);

        return this;
    }

    initToastr() {

        // toastr弹出消息提示插件全局配置设置
        toastr.options.positionClass = 'toast-bottom-center';
        toastr.options.preventDuplicates = true;
    }

    initAjax() {

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
                }
            }
        });

        // ajax请求失败, 提示网络请求错误消息
        $(document).ajaxError(function(event, xhr, settings, exception) {

            // ajax调用者设置不对当前请求全局错误提示.
            if (_.noGlobalError(xhr)) {
                return;
            }

            // var code = xhr && xhr.responseJSON && xhr.responseJSON.code;
            // code = code ? code : 'SYSTEM_ERROR';

            // TODO i18n tr not impl.
            // 全局错误拦截提示
            // toastr.error(_.tr('error.' + code), null, {
            //     "closeButton": true,
            //     "progressBar": true,
            //     "positionClass": "toast-top-center",
            //     "preventDuplicates": true
            // });
            toastr.error('网络连接错误！', null, {
                "closeButton": true,
                "progressBar": true,
                "positionClass": "toast-top-center",
                "preventDuplicates": true
            });
        });

        // 全局ajax调用进度表示
        $(document).on('ajaxStart', function() {
            NProgress && NProgress.start();
        });
        $(document).on('ajaxStop', function() {
            NProgress && NProgress.done();
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
    }

    context(aurelia) {
        this.aurelia = aurelia;
        return this;
    }
}

export default new Config();
