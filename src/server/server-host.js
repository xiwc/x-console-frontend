import { inject, Lazy } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

@inject(Lazy.of(HttpClient))
export class ServerHost {

    steps = ['上海一区', '云服务器', '主机'];

    allChecked = false;

    page;

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
        $(this.uiChkAll).checkbox({
            onChecked: () => {
                _.each(this.hosts, (item) => { item.checked = true });
                this.allChecked = true;
            },
            onUnchecked: () => {
                _.each(this.hosts, (item) => { item.checked = false });
                this.allChecked = false;
            },
        });

        $('table.sortable').tablesort();
    }

    /**
     * 在视图模型(ViewModel)展示前执行一些自定义代码逻辑
     * @param  {[object]} params                参数
     * @param  {[object]} routeConfig           路由配置
     * @param  {[object]} navigationInstruction 导航指令
     * @return {[promise]}                      你可以可选的返回一个延迟许诺(promise), 告诉路由等待执行bind和attach视图(view), 直到你完成你的处理工作.
     */
    activate(params, routeConfig, navigationInstruction) {
        this.getHosts();
    }

    getHosts(pageNo = 1) {
        return this.http.fetch(nsApi.url('host.list.get', {
            pageNo: pageNo,
            pageSize: nsConfig.pageSize
        })).then((resp) => {
            return resp.json();
        }).then((data) => {
            this.hosts = data.list;
            this.page = data;
        });
    }

    isAllChecked() {

        return _.every(this.hosts, 'checked');
    }

    selectHandler(uiChk, item) {
        $(uiChk).checkbox({
            onChecked: () => {
                item.checked = true;
                this.allChecked = this.isAllChecked();
            },
            onUnchecked: () => {
                item.checked = false;
                this.allChecked = this.isAllChecked();
            }
        });
    }

    initActionsHandler(uiActions) {
        $(uiActions).dropdown({
            action: 'hide'
        });
    }

    createHandler() {
        this.uiHostCreateModal.show();
    }

    refreshHandler() {

        this.getHosts(this.page.currentPage).then(() => {
            this.allChecked = false;
            toastr.success('刷新成功!');
        });

    }

    onpageHandler(selectedPage) {
        this.getHosts(selectedPage);
    }

    getCheckedItems() {
        return _.filter(this.hosts, 'checked');
    }

    existsChecked() {
        let checkedHosts = this.getCheckedItems();
        if (checkedHosts.length == 0) {
            toastr.error('请先选择要操作的主机!');
            return false;
        }
        return true;
    }

    startInBatchHandler() {

        this.existsChecked() && this.confirm.show({
            content: '确定要启动选择的主机吗?',
            onapprove: () => {

                this.http.fetch(nsApi.url('host.start.post'), {
                    method: 'post',
                    body: json({
                        ids: _.map(this.getCheckedItems(), 'id')
                    })
                }).then((resp) => {
                    if (resp.ok) {
                        toastr.success('开机操作成功!');
                    }
                });
            }
        });
    }

    softRebootInBatchHandler() {
        this.existsChecked() && this.confirm.show({
            content: '确定要软重启选择的主机吗?',
            onapprove: () => {

                this.http.fetch(nsApi.url('host.softRestart.post'), {
                    method: 'post',
                    body: json({
                        ids: _.map(this.getCheckedItems(), 'id')
                    })
                }).then((resp) => {
                    if (resp.ok) {
                        toastr.success('软重启操作成功!');
                    }
                });
            }
        });
    }

    hardRebootInBatchHandler() {
        this.existsChecked() && this.confirm.show({
            content: '确定要硬重启选择的主机吗?',
            onapprove: () => {

                this.http.fetch(nsApi.url('host.hardRestart.post'), {
                    method: 'post',
                    body: json({
                        ids: _.map(this.getCheckedItems(), 'id')
                    })
                }).then((resp) => {
                    if (resp.ok) {
                        toastr.success('硬重启操作成功!');
                    }
                });
            }
        });
    }

    shutdownInBatchHandler() {
        this.existsChecked() && this.confirm.show({
            content: '确定要关机选择的主机吗?',
            onapprove: () => {

                this.http.fetch(nsApi.url('host.stop.post'), {
                    method: 'post',
                    body: json({
                        ids: _.map(this.getCheckedItems(), 'id')
                    })
                }).then((resp) => {
                    if (resp.ok) {
                        toastr.success('关机操作成功!');
                    }
                });
            }
        });
    }

    delInBatchHandler() {
        this.existsChecked() && this.confirm.show({
            content: '确定要删除选择的主机吗?',
            onapprove: () => {

                this.http.fetch(nsApi.url('host.delete.post'), {
                    method: 'post',
                    body: json({
                        ids: _.map(this.getCheckedItems(), 'id')
                    })
                }).then((resp) => {
                    if (resp.ok) {
                        this.refreshHandler();
                        toastr.success('删除操作成功!');
                    }
                });
            }
        });
    }

    updateNameHandler(item) {
        this.selectedHost = item;
        this.uiNameUpdateModal.show((result) => {
            this.http.fetch(nsApi.url('host.updateName.post'), {
                method: 'post',
                body: json({
                    "desc": result.desc,
                    "id": item.id,
                    "name": result.name
                })
            }).then((resp) => {
                if (resp.ok) {
                    toastr.success('修改名称成功!');
                }
            });
        });
    }

    mountDiskHandler(item) {
        this.selectedHost = item;
        this.uiDiskSelectModal.show((list) => {
            if (!list) {
                toastr.error('没有云硬盘要绑定');
                return false;
            }
            this.http.fetch(nsApi.url('host.disk.add.post'), {
                method: 'post',
                body: json({
                    diskIds: [list.id],
                    id: item.id
                })
            }).then((resp) => {
                if (resp.ok) {
                    toastr.success('绑定云硬盘成功');
                }
            });
        });
    }

    unmountDiskHandler(item) {
        this.selectedHost = item;
        this.uiDiskSelectModalUnmount.show((list) => {
            if (!list) {
                toastr.error('没有云硬盘要解绑');
                return false;
            }
            this.http.fetch(nsApi.url('host.disk.delete.post'), {
                method: 'post',
                body: json({
                    diskIds: [list.id],
                    id: item.id
                })
            }).then((resp) => {
                if (resp.ok) {
                    toastr.success('卸载云硬盘成功');
                }
            });
        });
    }

    mountSecurityHandler(item) {
        this.uiSecuritySelectModal.show(() => {
            toastr.info('TODO...');
        });
    }

    unmountSecurityHandler(item) {
        this.uiSecuritySelectModalUnmount.show(() => {
            toastr.info('TODO...');
        });
    }

    bindPublicIpHandler(item) {
        this.uiPublicIpSelectModal.show(() => {
            toastr.info('TODO...');
        });
    }

    unbindPublicIpHandler(item) {
        this.uiPublicIpSelectModalUnbind.show(() => {
            toastr.info('TODO...');
        });
    }

    inPrivateNetworkHandler(item) {
        this.selectedHost = item;
        this.uiNetworkPrivateSelectModal.show((list) => {
            if (!list) {
                toastr.error('没有网络可选择');
                return false;
            }
            this.http.fetch(nsApi.url('host.privateNetwork.add.post'), {
                method: 'post',
                body: json({
                    privateNetworkId: list.id,
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
        // this.selectedHost = item;
        this.confirm.show({
            content: `确定要离开<code>${item.networkType=='1'?'经典网络':item.networkName}</code>吗?`,
            onapprove: () => {
                this.http.fetch(nsApi.url('host.privateNetwork.delete.post'), {
                    method: 'post',
                    body: json({
                        id: item.id
                    })
                }).then((resp) => {
                    if (resp.ok) {
                        toastr.success('离开私有网络成功');
                    }
                });
            }
        });
    }

    createSnapshotHandler(item) {
        this.selectedHost = item;
        this.uiSnapshotCreateModal.show(() => {
            toastr.info('TODO...');
        });
    }

    resetHandler(item) {
        this.confirm.show({
            content: '重置主机系统会将您的操作系统盘重置为初始状态,确定要执行此操作吗?',
            onapprove: () => {
                toastr.success('TODO...');
            }
        });
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
                    if (resp.ok) {
                        this.refreshHandler();
                        toastr.success('删除操作成功!');
                    }
                });
            }
        });
    }

}
