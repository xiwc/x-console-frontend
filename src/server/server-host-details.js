import { inject, Lazy } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';
import { bindable } from 'aurelia-framework';

@inject(Lazy.of(HttpClient))
export class ServerHostDetails {

    @bindable router;

    steps = ['上海一区', '云服务器', '主机详情'];

    details;

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
        $(this.uiActions).dropdown({
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
        this.http.fetch(nsApi.url('host.detail.get', {
            id: params.id
        })).then((resp) => {
            return resp.json();
        }).then((data) => {
            this.details = data;
        });
    }

    updateHandler(item) {
        this.uiNameUpdateModal.show((result => {
            this.http.fetch(nsApi.url('host.updateName.post'), {
                method: 'post',
                body: json({
                    id: item.id,
                    name: result.name,
                    desc: result.desc
                })
            }).then((resp) => {
                if (resp.ok) {
                    item.name = result.name;
                    item.desc = result.desc;
                    toastr.success('修改名称操作成功!');
                }
            });
        }));
    }

    delHandler(item) {
        this.confirm.show({
            content: `确定要删除主机<code>${item.name}</code>吗?`,
            onapprove: () => {
                this.http.fetch(nsApi.url('host.delete.post'), {
                    method: 'post',
                    body: json({
                        ids: [item.id]
                    })
                }).then((resp) => {
                    // TODO 跳转到?
                    if (resp.ok) {
                        toastr.success('删除成功!');
                    }
                });
            }
        });
    }

    mountDiskHandler(item) {
        this.uiDiskSelectModal.show((list) => {
            this.http.fetch(nsApi.url('host.addDisks.post'), {
                method: 'post',
                body: json({
                    diskIds: [list.id],
                    id: item.id
                })
            }).then((resp) => {
                if (resp.ok) {
                    toastr.success('绑定云磁盘成功');
                }
            });
        });
    }

    unmountDiskHandler(item) {
        this.uiDiskSelectModalUnmount.show((list) => {
            this.http.fetch(nsApi.url('host.deleteDisks.post'), {
                method: 'post',
                body: json({
                    diskIds: [list.id],
                    id: item.id
                })
            }).then((resp) => {
                if (resp.ok) {
                    toastr.success('卸载云磁盘成功');
                }
            });
        });
    }

    inPrivateNetworkHandler(item) {
        this.uiNetworkPrivateSelectModal.show((list) => {
            this.http.fetch(nsApi.url('host.addPrivateNetwork.post'), {
                method: 'post',
                body: json({
                    diskIds: list.id,
                    id: item.id
                })
            }).then((resp) => {
                if (resp.ok) {
                    toastr.success('加入私有网络成功');
                }
            });
        });
    }

    outPrivateNetworkHandler(item) {
        this.uiNetworkPrivateSelectModalOut.show((list) => {
            this.http.fetch(nsApi.url('host.deletePrivateNetwork.post'), {
                method: 'post',
                body: json({
                    diskIds: list.id,
                    id: item.id
                })
            }).then((resp) => {
                if (resp.ok) {
                    toastr.success('离开私有网络成功');
                }
            });
        });
    }
}
