import { inject, Lazy } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

@inject(Lazy.of(HttpClient))
export class NetworkPublic {

    steps = [
        { name: '上海一区', href: '#' },
        nsCtx.networkInfo,
        { name: '公网IP' }
    ];

    publicIps = null;
    allChecked = false;

    page = {
        currentPage: 1,
        pageSize: nsConfig.pageSize
    };

    constructor(getHttp) { // 通过构造函数注入
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
        this.getPublicIps();
    }

    /*
        获取公网IP
    */
    getPublicIps() {
        return this.http.fetch(nsApi.url('publicIp.list.get', { pageNo: this.page.currentPage, pageSize: this.page.pageSize }))
            .then((resp) => {
                return resp.json();
            }).then((data) => {
                this.publicIps = data.list;
                this.page.total = data.size;
                this.page.pageCount = data.pageCount;
            }).then(() => {
                this.allChecked = false;
            });
    }

    onpageHandler(selectedPage) {
        console.log(selectedPage);
        this.page.currentPage = selectedPage;
        this.getPublicIps();
    }

    /*
        刷新公网IP
    */
    refreshHandler() {
        this.getPublicIps().then(() => {
            toastr.info('刷新成功!');
        })
    }

    /**
     * 当视图被附加到DOM中时被调用
     */
    attached() {
        $(this.uiChkAll).checkbox({
            onChecked: () => {
                _.each(this.publicIps, (d) => { d.checked = true });
                this.allChecked = true;
            },
            onUnchecked: () => {
                _.each(this.publicIps, (d) => { d.checked = false });
                this.allChecked = false;
            },
        });

        $('table.sortable').tablesort();
    }

    initActionsHandler(uiActions) {
        $(uiActions).dropdown({
            action: 'hide'
        });
    }

    //创建
    createHandler() {
        this.createconfirm.show(() => { this.getPublicIps(); });
    }

    //批量删除
    delMoreHandler() {
        //获取被选中的记录
        var items = this.getCheckedItems();
        if (items.length == 0) {
            toastr.error('请先选择要删除的项目!');
            return;
        }
        this.deleteconfirm.show({
            title: "删除提示",
            onapprove: () => {
                let idlist = [];
                _.each(items, (i) => {
                    idlist.push(i.id);
                });
                this.http.fetch(nsApi.url('publicIp.delete.post'), {
                    method: 'post',
                    body: json({
                        ids: idlist
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

    //删除单条
    delHandler(o) {
        this.deleteconfirm.show({
            title: "删除提示",
            content: "确定要删除公网IP<code>" + o.name + "</code>吗？",
            onapprove: () => {
                this.http.fetch(nsApi.url('publicIp.delete.post'), {
                    method: 'post',
                    body: json({
                        ids: [o.id]
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

    selectHandler(uiChk, pn) {
        $(uiChk).checkbox({
            onChecked: () => {
                pn.checked = true;
                this.allChecked = this.isAllChecked();
            },
            onUnchecked: () => {
                pn.checked = false;
                this.allChecked = this.isAllChecked();
            }
        });
    }

    isAllChecked() {
        let flg = true;
        _.each(this.publicIps, (d) => {
            if (!d.checked) {
                flg = false;
                return false;
            }
        });

        return flg;
    }

    getCheckedItems() {
        return _.filter(this.publicIps, (d) => {
            return d.checked;
        });
    }


    //修改名称
    updateName(pn) {
        this.selectedPublicNetwork = pn;
        this.updateconfirm.show((result => {
            this.http.fetch(nsApi.url('publicIp.updateName.post'), {
                method: 'post',
                body: json({
                    id: pn.id,
                    name: result.name,
                    desc: result.desc
                })
            }).then((resp) => {
                if (resp.ok) {
                    pn.name = result.name;
                    pn.desc = result.desc;
                    toastr.success('修改成功!');
                }
            });
        }));
    }

    //绑定路由器
    bindRouter(o) {
        this.selectedPublicNetwork = o;
        this.bindrouterDialog.show((result => {
            this.http.fetch(nsApi.url('publicIp.router.add.post'), {
                method: 'post',
                body: json({
                    id: o.id,
                    routerId: result.id
                })
            }).then((resp) => {
                if (resp.ok) {
                    o.status = 2;
                    toastr.success('加载成功!');
                }
            });
        }));
    }

    //解绑路由器
    unBindRouter(o) {
        this.deleteconfirm.show({
            title: "卸载路由器",
            content: "确定要卸载公网IP<code>" + o.name + "</code>上绑定的路由器吗？",
            onapprove: () => {
                toastr.warning("开发中...");
            }
        });
    }

    //绑定主机
    bindHost(o) {
        toastr.warning("开发中...");
    }

    //移除主机
    unBindHost(o) {
        this.deleteconfirm.show({
            title: "卸载主机",
            content: "确定要卸载<code>" + o.name + "</code>绑定的主机吗？",
            onapprove: () => {
                this.http.fetch(nsApi.url('publicIp.unbindHost.post'), {
                    method: 'post',
                    body: json({
                        id: o.id
                    })
                }).then((resp) => {
                    if (resp.ok) {
                        o.status = 1;
                        toastr.success('卸载主机成功!');
                    }
                });
            }
        });
    }
}
