//全局工具方法实例对象定义
(function() {

    // // 自增长ID的起始索引
    // var beginId = 1;

    // var ua = navigator.userAgent.toLowerCase();

    // 初始化全局帮助工具对象
    window.nsHelper = (function() {

        return {

        };
    })();

    // 为nsHelper方法定义别名 _
    window._ = $.extend(window._, window.nsHelper);

})();
