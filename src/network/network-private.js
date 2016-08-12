import { inject, Lazy } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

@inject(Lazy.of(HttpClient))
export class NetworkPrivate {
    steps = [
        { name: '上海一区', href: '#' },
        nsCtx.networkInfo,
        { name: '私有网络' }
    ];
    allChecked = false;
    privateNetworks = null;

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
        this.getPrivateNetwork();
    }

    /*
        获取私有网络列表
    */
    getPrivateNetwork() {
        return this.http.fetch(nsApi.url('privateNetwork.list.get', { pageNo: this.page.currentPage, pageSize: this.page.pageSize }))
            .then((resp) => {
                return resp.json();
            }).then((data) => {
                this.privateNetworks = data.list;
                this.page = data;
            }).then(() => {
                this.allChecked = false;
            });
    }

    /**
     * 当视图被附加到DOM中时被调用
     */
    attached() {
        $(this.uiChkAll).checkbox({
            onChecked: () => {
                _.each(this.privateNetworks, (d) => { d.checked = true });
                this.allChecked = true;
            },
            onUnchecked: () => {
                _.each(this.privateNetworks, (d) => { d.checked = false });
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

    refreshHandler() {
        this.getPrivateNetwork().then(() => {
            toastr.info('刷新成功!');
        });
    }

    //创建
    createHandler() {
        this.createconfirm.show((result => {
            //console.log(result.name);
            this.http.fetch(nsApi.url('privateNetwork.create.post'), {
                method: 'post',
                body: json({
                    name: result.name
                })
            }).then((resp) => {
                // this. = resp.data;
                if (resp.ok) {
                    this.getPrivateNetwork();
                    toastr.success('创建成功!');
                }
            });
        }));
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
                this.http.fetch(nsApi.url('privateNetwork.delete.post'), {
                    method: 'post',
                    body: json({
                        ids: idlist
                    })
                }).then((resp) => {
                    if (resp.ok) {
                        this.getPrivateNetwork();
                        toastr.success('删除成功!');
                    }
                });
            }
        });
    }

    //删除单条
    delHandler(pn) {
        this.deleteconfirm.show({
            title: "删除提示",
            content: '确定要删除私有网络<code>' + pn.name + '</code>吗?',
            onapprove: () => {
                this.http.fetch(nsApi.url('privateNetwork.delete.post'), {
                    method: 'post',
                    body: json({
                        ids: [pn.id]
                    })
                }).then((resp) => {
                    // this. = resp.data;
                    if (resp.ok) {
                        this.getPrivateNetwork();
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
        _.each(this.privateNetworks, (d) => {
            if (!d.checked) {
                flg = false;
                return false;
            }
        });

        return flg;
    }

    getCheckedItems() {
        return _.filter(this.privateNetworks, (d) => {
            return d.checked;
        });
    }

    //修改名称
    updateName(pn) {
        this.selectedPrivateNetwork = pn;
        this.updateconfirm.show((result => {
            this.http.fetch(nsApi.url('privateNetwork.updateName.post'), {
                method: 'post',
                body: json({
                    id: pn.id,
                    name: result.name,
                    desc: result.desc
                })
            }).then((resp) => {
                pn.name = result.name;
                pn.desc = result.desc;
                toastr.success('修改名称操作成功!');
            });
        }));
    }

    //连接路由器
    linkRouter() {
        this.linRouterDialog.show();
    }

    //删除路由器
    delRouter(pn) {
        this.deleteRouterconfirm.show({
            title: '离开路由器',
            content: '确定要离开路由器<code>' + pn.name + '</code>吗?',
            onapprove: () => {
                toastr.warning("开发中。。。");
            }
        });
    }

    onpageHandler(selectedPage) {
        console.log(selectedPage);
        this.page.currentPage = selectedPage;
        this.getPrivateNetwork();
    }
}
