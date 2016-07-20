/**
程序初次加载启动,进行一些初始化操作:
1. 获取url中的access token写入cookie.
2. 获取用户的基本信息.
3. 设置toastr弹出消息提示插件全局配置设置
4. ui form 验证提示信息国际化
5. 加载localStorage中的debug设置
6. 解析URL中的ACCESS_TOKEN, 存放到cookie中
**/
export function configure(aurelia, params) {

    // // toastr弹出消息提示插件全局配置设置
    // toastr.options.positionClass = 'toast-bottom-center';
    // toastr.options.preventDuplicates = true;

    // // ui form长度表单验证规则重写,中文长度按2计算,英文按1计算.
    // // http://jira00.x.newtouch.com/browse/STEP-1200
    // $.fn.form.settings.rules.length = (value, requiredLength) => {
    //     return (value !== undefined) ? (_.getByteLen(value) >= requiredLength) : false;
    // };
    // $.fn.form.settings.rules.minLength = (value, requiredLength) => {
    //     return (value !== undefined) ? (_.getByteLen(value) >= requiredLength) : false;
    // };
    // $.fn.form.settings.rules.exactLength = (value, requiredLength) => {
    //     return (value !== undefined) ? (_.getByteLen(value) == requiredLength) : false;
    // };
    // $.fn.form.settings.rules.maxLength = (value, maxLength) => {
    //     return (value !== undefined) ? (_.getByteLen(value) <= maxLength) : false;
    // };

    // // 异步加载初始化数据, 返回Promise对象延迟页面渲染
    // return new Promise((resolve, reject) => {
    //     $.when(
    //         $.get(nsApi['user.userInfo.get']) // 获取用户信息
    //     ).done((resp, resp2, resp3) => {

    //         // 设置ctx环境变量
    //         _.initCtxUser(resp[0].entity);

    //         resolve();

    //     });
    // });
}
