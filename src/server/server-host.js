import { inject, Lazy } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

@inject(Lazy.of(HttpClient))
export class ServerHost {

    steps = ['上海一区', '云服务器', '主机'];

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
    }

    /**
     * 在视图模型(ViewModel)展示前执行一些自定义代码逻辑
     * @param  {[object]} params                参数
     * @param  {[object]} routeConfig           路由配置
     * @param  {[object]} navigationInstruction 导航指令
     * @return {[promise]}                      你可以可选的返回一个延迟许诺(promise), 告诉路由等待执行bind和attach视图(view), 直到你完成你的处理工作.
     */
    activate(params, routeConfig, navigationInstruction) {
        this.http.fetch(nsApi['host.hostList.get']).then((resp => {
            return resp.text();
        })).then((body) => {
            console.log(body);
        });
    }

    delHandler() {
        this.confirm.show();
    }

    createHandler() {
        this.serverHostCreate.show();
    }

    refreshHandler() {

        this.http.fetch(nsApi['host.hostList.get']).then((resp => {
            return resp.json();
        })).then((json) => {
            toastr.info(JSON.stringify(json));
        });

        this.http.fetch(nsApi['host.create.post'], {
            method: 'post',
            body: json({ name: 'value' })
        }).then((resp => {
            return resp.json();
        })).then((json) => {
            toastr.info(JSON.stringify(json));
        });
    }

}
