import { inject, Lazy } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

@inject(Lazy.of(HttpClient))
export class NetworkPublicDetails {

    steps = ['上海一区', '云服务器', '公网IP详情'];

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
            content: "确定要删除<code>" + this.details.name + "</code>吗？",
            onapprove: () => {
                this.http.fetch(nsApi.url('publicIp.delete.post'), {
                    method: 'post',
                    body: json({
                        ids: [this.details.id]
                    })
                }).then((resp) => {
                    // this. = resp.data;
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
                // this. = resp.data;
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
            console.log(result);
        }));
    }

    //解绑路由器
    unBindRouter() {
        this.deleteconfirm.show({
            content: "确定要解除该公网IP上绑定的路由器吗？",
            onapprove: () => {

            }
        });
    }

    //移除主机
    unBindHost() {
        this.deleteconfirm.show({
            content: "确定要移除<code>" + this.details.name + "</code>绑定的主机吗？",
            onapprove: () => {
                this.http.fetch(nsApi.url('publicIp.unbindHost.post'), {
                    method: 'post',
                    body: json({
                        id: this.details.id
                    })
                }).then((resp) => {
                    // this. = resp.data;
                    if (resp.ok) {
                        // pn.name = result.name;
                        // pn.desc = result.desc;
                        toastr.success('移除主机成功!');
                    }
                });
            }
        });
    }
}
