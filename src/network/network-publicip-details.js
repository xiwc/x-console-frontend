import { inject, Lazy } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

@inject(Lazy.of(HttpClient))
export class NetworkPublicDetails {

    steps = [
        { name: '上海一区', href: '#' },
        nsCtx.networkInfo,
        { name: '公网IP', href: '/#/network/public' }
    ];

    /**
     * 构造函数
     */
    constructor(getHttp) {
        this.http = getHttp();
    }

    details = null;

    /**
     * 在视图模型(ViewModel)展示前执行一些自定义代码逻辑
     * @param  {[object]} params                参数
     * @param  {[object]} routeConfig           路由配置
     * @param  {[object]} navigationInstruction 导航指令
     * @return {[promise]}                      你可以可选的返回一个延迟许诺(promise), 告诉路由等待执行bind和attach视图(view), 直到你完成你的处理工作.
     */
    activate(params, routeConfig, navigationInstruction) {
        this.http.fetch(nsApi.url('publicIp.detail.get', {
            id: params.id
        })).then((resp) => {
            return resp.json();
        }).then((data) => {
            this.details = data;
            this.steps.push({ name: this.details.name });
        });
    }

    /**
     * 当视图被附加到DOM中时被调用
     */
    attached() {
        $(this.uiActions).dropdown({
            action: 'hide'
        });
    }

    //删除单条
    delHandler() {
        this.deleteconfirm.show({
            title: "删除提示",
            content: "确定要删除公网IP<code>" + this.details.name + "</code>吗？",
            onapprove: () => {
                this.http.fetch(nsApi.url('publicIp.delete.post'), {
                    method: 'post',
                    body: json({
                        ids: [this.details.id]
                    })
                }).then((resp) => {
                    if (resp.ok) {
                        this.getPublicIps();
                        toastr.success('删除成功!');
                    }
                });
            }
        });
    }

    //修改名称
    updateName() {
        this.selectedPublicNetwork = this.details;
        this.updateconfirm.show((result => {
            this.http.fetch(nsApi.url('publicIp.updateName.post'), {
                method: 'post',
                body: json({
                    id: this.details.id,
                    name: result.name,
                    desc: result.desc
                })
            }).then((resp) => {
                if (resp.ok) {
                    this.details.name = result.name;
                    this.details.desc = result.desc;
                    toastr.success('修改成功!');
                }
            });
        }));
    }

    //绑定路由器
    bindRouter() {
        this.selectedPublicNetwork = this.details;
        this.bindrouterDialog.show((result => {
            toastr.warning("开发中...");
        }));
    }

    //解绑路由器
    unBindRouter() {
        this.deleteconfirm.show({
            title: "卸载路由器",
            content: "确定要制裁公网IP" + this.details.name + "上绑定的路由器吗？",
            onapprove: () => {
                toastr.warning("开发中...");
            }
        });
    }

    //移除主机
    unBindHost() {
        this.deleteconfirm.show({
            title: "卸载主机",
            content: "确定要卸载<code>" + this.details.name + "</code>绑定的主机吗？",
            onapprove: () => {
                this.http.fetch(nsApi.url('publicIp.host.delete.post'), {
                    method: 'post',
                    body: json({
                        id: this.details.id
                    })
                }).then((resp) => {
                    if (resp.ok) {
                        this.details.status = 1;
                        toastr.success('卸载主机成功!');
                    }
                });
            }
        });
    }
}
