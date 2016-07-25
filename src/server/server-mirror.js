import { inject, Lazy } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

@inject(Lazy.of(HttpClient))
export class ServerMirror {

    steps = ['上海一区', '云服务器', '镜像'];

    /**
     * 构造函数
     */
    constructor(getHttp) {
        this.http = getHttp();
    }

    /**
     * 当视图被附加到DOM中时被调用
     */
    attached() {
        $('.nx-dd-action-hide', this.container).dropdown({
            action: 'hide'
        });

        $(this.chkAll).checkbox({
            onChecked: () => {
                _.each(this.mirrors, (m) => {
                    m.checked = true;
                });
            },
            onUnchecked: () => {
                _.each(this.mirrors, (m) => {
                    m.checked = false;
                });
            }
        });
    }

    // 选择的Mirror
    selectMirror = {

    }

    refreshHandler() {
        this.getMirrors().then(() => {
            $(this.chkAll).checkbox('set unchecked');
        });
    }

    createHandler() {
        this.serverHostCreate.show();
        toastr.info('创建操作...');
    }

    /**
     * 在视图模型(ViewModel)展示前执行一些自定义代码逻辑
     * @param  {[object]} params                参数
     * @param  {[object]} routeConfig           路由配置
     * @param  {[object]} navigationInstruction 导航指令
     * @return {[promise]}                      你可以可选的返回一个延迟许诺(promise), 告诉路由等待执行bind和attach视图(view), 直到你完成你的处理工作.
     */
    activate(params, routeConfig, navigationInstruction) {

        this.getMirrors();
    }

    getMirrors() {

        return this.http.fetch(nsApi['server.mirrors.get']).then((resp => {
            return resp.json();
        })).then((json) => {
            this.mirrors = json.data;
        });
    }

}
