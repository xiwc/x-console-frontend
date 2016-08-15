export class Home {

    msg = "主页";

    /**
     * 当视图被附加到DOM中时被调用
     */
    attached() {
        // TODO global helper utils methods.
        console.log($('body'));
        console.log(_([1, 2]).first(1));
        Cookie.set('name', 'test cookie');
        console.log(Cookie.get('name'));
        console.log(wurl('hostname'));

        toastr.info('toastr info...');
    }

    /**
     * 在视图模型(ViewModel)展示前执行一些自定义代码逻辑
     * @param  {[object]} params                参数
     * @param  {[object]} routeConfig           路由配置
     * @param  {[object]} navigationInstruction 导航指令
     * @return {[promise]}                      你可以可选的返回一个延迟许诺(promise), 告诉路由等待执行bind和attach视图(view), 直到你完成你的处理工作.
     */
    activate(params, routeConfig, navigationInstruction) {
        // TODO ajax api mock demo.
        // $.get(nsApi['host.hostList.get'], function(data) {
        //     if (data.success) {
        //         console.log(data.data);
        //     } else {
        //         console.log(data);
        //     }
        // });
        // // TODO ajax api mock demo.
        // $.get(nsApi['user.userInfo.get'], function(data) {
        //     if (data.success) {
        //         console.log(data.data);
        //     } else {
        //         console.log(data);
        //     }
        // });
    }
}
