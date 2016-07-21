import { inject, Lazy } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

@inject(Lazy.of(HttpClient))
export class ServerDashboard {

    msg = '总览';

    constructor(getHttp) {
        this.http = getHttp();
    }

    /**
     * 在视图模型(ViewModel)展示前执行一些自定义代码逻辑
     * @param  {[object]} params                参数
     * @param  {[object]} routeConfig           路由配置
     * @param  {[object]} navigationInstruction 导航指令
     * @return {[promise]}                      你可以可选的返回一个延迟许诺(promise), 告诉路由等待执行bind和attach视图(view), 直到你完成你的处理工作.
     */
    activate(params, routeConfig, navigationInstruction) {

        console.log(json({ name: 'json...' }));

        this.http.fetch(nsApi['host.hostList.get']).then((resp => {
            return resp.text();
        })).then((body) => {
            console.log(body);
        });

        // TODO ajax api mock demo.
        // $.get(nsApi['host.hostList.get'], function(data) {
        //     if (data.success) {
        //         console.log(data.data);
        //     } else {
        //         console.log(data);
        //     }
        // });
    }

}