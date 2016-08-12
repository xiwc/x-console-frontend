import { inject, Lazy } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

@inject(Lazy.of(HttpClient))
export class ServerDashboard {

    steps = ['上海一区', nsCtx.serverInfo, '总览'];

    constructor(getHttp) {
        this.http = getHttp();
    }

    /**
     * 当视图被附加到DOM中时被调用
     */
    attached() {
        $('.nx-pp', this.container).popup();
        $('.ui.progress', this.container).progress({
            showActivity: false
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

        let p1 = this.http.fetch(nsApi.url('resource.config.get', {}))
            .then((resp) => {
                if (resp.ok) {
                    return resp.json().then((data) => {
                        this.config = data;
                    });
                }

                return resp;
            });

        let p2 = this.http.fetch(nsApi.url('resource.detail.get', {}))
            .then((resp) => {
                if (resp.ok) {
                    return resp.json().then((data) => {
                        this.detail = data;
                    });
                }

                return resp;
            });

        return Promise.all([p1, p2]).then(() => {
            this.percent = {
                "host": this.calcPercent('host'),
                "privateNetwork": this.calcPercent('privateNetwork'),
                "cpu": this.calcPercent('cpu'),
                "router": this.calcPercent('router'),
                "memory": this.calcPercent('memory'),
                "performanceDisk": this.calcPercent('performanceDisk'),
                "performanceDiskCapacity": this.calcPercent('performanceDiskCapacity'),
                "capacityDisk": this.calcPercent('capacityDisk'),
                "capacityDiskCapacity": this.calcPercent('capacityDiskCapacity'),
                "securityGroup": this.calcPercent('securityGroup'),
                "snapshot": this.calcPercent('snapshot'),
                "publicIp": this.calcPercent('publicIp'),
                "bandwidth": this.calcPercent('bandwidth'),
                "firewall": this.calcPercent('firewall'),
                "sshKeyStore": this.calcPercent('sshKeyStore')
            };
        });
    }

    calcPercent(prop) {
        if (_.has(this.detail, prop) && _.has(this.config, prop)) {
            let res = parseInt(this.detail[prop] * 100 / this.config[prop]);
            return _.isNaN(res) ? 0 : res;
        }

        return 0;
    }

}
