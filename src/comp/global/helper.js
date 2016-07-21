//全局工具方法实例对象定义
(function() {

    // // 自增长ID的起始索引
    // var beginId = 1;

    // var ua = navigator.userAgent.toLowerCase();

    // 初始化全局帮助工具对象
    window.nsHelper = (function() {

        return {
            /**
             * 移除url中的指定查询参数
             * name: 查询参数名称
             * href: 操作的url(可选, 不设置时为当前浏览器页面地址)
             * return: 移除指定查询参数的url地址
             */
            removeUrlQuery: (name, href) => {

                var s = href ? href : window.location.href;

                var rs = new RegExp('(&|\\?)?' + name + '=?[^&#]*(.)?', 'g').exec(s);
                // eg: ["?accessToken=YUNqUkxiZ3owWXdYdDFaVUp2VmNEM0JTZTNERlowWUhPTUVVbDU1RUROOWROMmcwUlVJeXRGQ2M4ZVBqdmpkSA%3D%3D&", "?", "&"]

                if (rs) {
                    // case3: ?name2=value2&name=value => ?name2=value2
                    // case4: ?name2=value2&name=value&name3=value3 => ?name2=value2&name3=value3
                    if (rs[1] == '&') {
                        return s.replace(new RegExp('&' + name + '=?[^&#]+', 'g'), '');
                    } else if (rs[1] == '?') {
                        if (rs[2] != '&') { // case1: ?name=value => 
                            return s.replace(new RegExp('\\?' + name + '=?[^&#]*', 'g'), '');
                        } else { // case2: ?name=value&name2=value2 => ?name2=value2
                            return s.replace(new RegExp('' + name + '=?[^&#]*&', 'g'), '');
                        }
                    }
                }

                return s;
            },

            /**
             * 设置xhr请求不显示全局错误标识为true
             * xhr: XMLHttpRequest 对象
             * val: true | false
             */
            noGlobalError: (xhr, val) => {

                if (val && _.isBoolean(val)) {
                    xhr.nt_no_global_error = val;
                } else {
                    return (xhr && xhr.hasOwnProperty('nt_no_global_error')) ? xhr.nt_no_global_error : false;
                }
            },
            toggleSidebar: (toHide) => {

                var isFolded = $('.nx-body').hasClass('nx-left-sidebar-menu-labeled-icon');
                if (_.isUndefined(toHide)) {
                    $('.nx-body .nx-left-sidebar-menu').toggleClass('labeled icon');
                    $('.nx-body').toggleClass('nx-left-sidebar-menu-labeled-icon');
                } else {
                    if (!toHide && isFolded) {
                        $('.nx-body .nx-left-sidebar-menu').removeClass('labeled icon');
                        $('.nx-body').removeClass('nx-left-sidebar-menu-labeled-icon');
                    } else {
                        $('.nx-body').addClass('nx-left-sidebar-menu-labeled-icon');
                        $('.nx-body .nx-left-sidebar-menu').addClass('labeled icon');
                    }
                }
            }
        };
    })();

    // 为nsHelper方法定义别名 _
    window._ = $.extend(_, window.nsHelper);

})();
