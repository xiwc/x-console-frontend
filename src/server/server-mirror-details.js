export class ServerMirrorDetails {

    steps = ['上海一区', '云服务器', '镜像详情'];

    details = {
        "capacity": "string",
        "createPeriod": "string",
        "createTime": "2016-07-26T06:33:29.991Z",
        "desc": "string",
        "id": "string",
        "name": "string",
        "platform": "string",
        "scope": "string",
        "status": "string"
    };

    /**
     * 在视图模型(ViewModel)展示前执行一些自定义代码逻辑
     * @param  {[object]} params                参数
     * @param  {[object]} routeConfig           路由配置
     * @param  {[object]} navigationInstruction 导航指令
     * @return {[promise]}                      你可以可选的返回一个延迟许诺(promise), 告诉路由等待执行bind和attach视图(view), 直到你完成你的处理工作.
     */
    activate(params, routeConfig, navigationInstruction) {
        // toastr.info(params.id);
    }
}
