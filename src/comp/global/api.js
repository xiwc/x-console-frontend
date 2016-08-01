// 定义API初始化全局函数
window.nsApiFunc = (function() {

    // API全局共享定义(real:真实远程调用URL, mock:自定义调试数据URL.)
    var api = {
        'host.hosts.get': { // TODO demo ajax method config.
            real: 'hosts.json',
            mock: 'mock/v2/host/hosts.get.json',
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
        'server.mirrors.get': { // TODO demo ajax method config.
            real: 'mirrors.json',
            mock: 'mock/v2/server/mirror/mirrors.get.json',
            ismock: false,
            method: 'get'
        },
        'image.list.get': {
            real: 'api/image/list',
            mock: 'mock/image/list.get.json',
            ismock: false,
            method: 'get',
            desc: '镜像列表获取'
        },
        'image.detail.get': {
            real: 'api/image/detail/{id}',
            mock: 'mock/image/detail.get.json',
            ismock: false,
            method: 'get',
            desc: '镜像详情获取'
        },
        'disk.list.get': {
            real: 'api/disk/list',
            mock: 'mock/disk/list.get.json',
            ismock: false,
            method: 'get',
            desc: '获取用户硬盘列表'
        },
        'disk.detail.get': {
            real: 'api/disk/detail/{id}',
            mock: 'mock/disk/detail.get.json',
            ismock: false,
            method: 'get',
            desc: '获取硬盘详情'
        },
        'disk.delete.post': {
            real: 'api/disk/delete/{id}',
            mock: 'mock/disk/delete.post.json',
            ismock: false,
            method: 'post',
            desc: '根据id删除硬盘'
        },
        'disk.updateName.post': {
            real: 'api/disk/updateName',
            mock: 'mock/disk/updateName.post.json',
            ismock: false,
            method: 'post',
            desc: '根据id修改硬盘名称跟描述'
        },
        'disk.create.post': {
            real: 'api/disk/create',
            mock: 'mock/disk/create.post.json',
            ismock: false,
            method: 'post',
            desc: '创建云硬盘'
        },
        'privateNetwork.list.get': {
            real: 'api/privateNetwork/list',
            mock: '',
            ismock: false,
            method: 'get',
            desc: '获取私有网络列表'
        },
        'privateNetwork.create.post': {
            real: 'api/privateNetwork/create',
            mock: '',
            ismock: false,
            method: 'post',
            desc: '添加私有网络'
        },
        'privateNetwork.delete.post': {
            real: 'api/privateNetwork/delete',
            mock: '',
            ismock: false,
            method: 'post',
            desc: '创建私有网络'
        },
        'privateNetwork.updateName.post': {
            real: 'api/privateNetwork/updateName',
            mock: '',
            ismock: false,
            method: 'post',
            desc: '修改私有网络名称'
        },
        'router.list.get': {
            real: 'api/router/list',
            mock: '',
            ismock: false,
            method: 'get',
            desc: '获取路由器列表'
        },
        'router.create.post': {
            real: 'api/router/create',
            mock: '',
            ismock: false,
            method: 'post',
            desc: '创建路由器'
        },
        'router.delete.post': {
            real: 'api/router/delete',
            mock: '',
            ismock: false,
            method: 'get',
            desc: '删除路由器'
        },
        'router.updateName.post': {
            real: 'api/router/updateName',
            mock: '',
            ismock: false,
            method: 'post',
            desc: '路由器修改名称'
        },
        'router.updatePublicIp.post': {
            real: 'api/router/updatePublicIp',
            mock: '',
            ismock: false,
            method: 'post',
            desc: '路由器修改公网IP'
        },
        'keystore.list.get': {
            real: 'api/keystore/list',
            mock: 'mock/keystore/list.get.json',
            ismock: false,
            method: 'get',
            desc: '获取密钥列表'
        },
        'keystore.list.get': {
            real: 'api/keystore/list',
            mock: 'mock/keystore/list.get.json',
            ismock: false,
            method: 'get',
            desc: '获取密钥列表'
        },
        'keystore.detail.get': {
            real: 'api/keystore/detail/{id}',
            mock: 'mock/keystore/detail.get.json',
            ismock: false,
            method: 'get',
            desc: '根据主键id获取密钥详情'
        },
        'keystore.listName.get': {
            real: 'api/keystore/listName',
            mock: 'mock/keystore/listName.get.json',
            ismock: false,
            method: 'get',
            desc: '获取私钥下拉列表'
        },
        'keystore.create.post': {
            real: 'api/keystore/create',
            mock: 'mock/keystore/create.post.json',
            ismock: false,
            method: 'post',
            desc: '创建密钥'
        },
        'keystore.delete.post': {
            real: 'api/keystore/delete',
            mock: 'mock/keystore/delete.post.json',
            ismock: false,
            method: 'post',
            desc: '批量删除密钥'
        },
        'keystore.updateName.post': {
            real: 'api/keystore/updateName',
            mock: 'mock/keystore/updateName.post.json',
            ismock: false,
            method: 'post',
            desc: '修改密钥名称'
        },
        'publicIp.list.get': {
            real: 'api/publicIp/list',
            mock: '',
            ismock: false,
            method: 'get',
            desc: '获取公网IP'
        },
        'publicIp.create.post': {
            real: 'api/publicIp/create',
            mock: '',
            ismock: false,
            method: 'post',
            desc: '申请公网IP'
        },
        'publicIp.delete.post': {
            real: 'api/publicIp/delete',
            mock: '',
            ismock: false,
            method: 'post',
            desc: '删除公网IP'
        },
        'publicIp.updateName.post': {
            real: 'api/publicIp/updateName',
            mock: '',
            ismock: false,
            method: 'post',
            desc: '修改公网IP'
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
            },
            // 拼装url和查询参数, eg: aa/{id} | {id:'id01', n1:'v1', n2:'v2'} => aa/id01?n1=v1&n2=v2
            url: function(name, params) {

                var _url = this[name];

                if (!params) {
                    params = {
                        // areaId: '1', // TODO replace by regionId
                        token: nsCtx.token,
                        regionId: nsCtx.regionId
                    }
                } else {

                    for (var name in params) {
                        if (params.hasOwnProperty(name)) {
                            var r = new RegExp('{' + name + '}', 'g');
                            if (r.test(_url)) {
                                _url = _url.replace(r, params[name]);
                                delete params[name];
                            }
                        }
                    }

                    // params.areaId = '1'; // TODO replace by regionId
                    params.token = nsCtx.token;
                    params.regionId = nsCtx.regionId;
                }

                var querys = [];
                $.each(params, function(name, val) {
                    querys.push(name + '=' + val);
                });

                return _url + '?' + querys.join('&');
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
