import { inject, Lazy } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

@inject(Lazy.of(HttpClient))
export class ServerSshDetails {

    steps = ['上海一区', nsCtx.serverInfo, 'SSH密钥详情'];

    /**
     * 构造函数
     */
    constructor(getHttp) {
        this.http = getHttp();
    }

    details;

    /**
     * 在视图模型(ViewModel)展示前执行一些自定义代码逻辑
     * @param  {[object]} params                参数
     * @param  {[object]} routeConfig           路由配置
     * @param  {[object]} navigationInstruction 导航指令
     * @return {[promise]}                      你可以可选的返回一个延迟许诺(promise), 告诉路由等待执行bind和attach视图(view), 直到你完成你的处理工作.
     */
    activate(params, routeConfig, navigationInstruction) {
        this.http.fetch(nsApi.url('keystore.detail.get', {
            id: params.id
        })).then((resp) => {
            return resp.json();
        }).then((data) => {
            this.details = data;
            this.steps.push(this.details.name);
        });
    }
}
