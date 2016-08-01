import { inject, Lazy } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

@inject(Lazy.of(HttpClient))
export class NetworkPrivate {
    steps = ['上海一区', '专用VPC网络', '私有网络'];
    createTitle = "创建私有网络";
    updateNameTitle = "修改名称";
    deleteContent = "确定要删除这条记录吗？";
    deleteTite = "删除提示";
    deleteRouterContent = "确定要将私用网络从路由器中离开？";

    allChecked = false;
    privateNetworks = null;

    page = {
        currentPage: 1,
        pageSize: 10,
        size: 10,
        total: 75,
        pageCount: 8,
        hasPreviousPage: false,
        hasNextPage: true
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
        return this.http.fetch(nsApi.url('privateNetwork.list.get', { pageNo: 1, pageSize: 1 }))
            .then((resp) => {
                return resp.json();
            }).then((data) => {
                this.privateNetworks = data.list;
                this.page.total = data.total;
                this.page.pageCount = data.pageCount;
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
    }

    initActionsHandler(uiActions) {
        $(uiActions).dropdown({
            action: 'hide'
        });
    }

    refreshHandler() {
        this.getPrivateNetwork();
        toastr.info('刷新成功!');
    }

    //创建
    createHandler() {
        this.createconfirm.show((result => {
            console.log(result.name);
            this.http.fetch(nsApi.url('privateNetwork.create.post'), {
                body: json({
                    name: result.name
                })
            }).then((resp) => {
                // this. = resp.data;
                this.getPrivateNetwork();
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
            onapprove: () => {
                _.each(items, (pw) => {
                    this.http.fetch(nsApi.url('privateNetwork.delete.post', {
                        id: pw.id
                    }), { method: 'post' }).then((resp) => {
                        // this. = resp.data;
                        this.privateNetworks = _.filter(this.privateNetworks, (d) => {
                            return (d.id != pw.id);
                        });
                        toastr.success('删除成功!');
                    });
                });
            }
        });
    }

    //删除单条
    delHandler(pn) {
        this.deleteconfirm.show({
            onapprove: () => {
                this.http.fetch(nsApi.url('privateNetwork.delete.post', {
                    id: pn.id
                }), { method: 'post' }).then((resp) => {
                    // this. = resp.data;
                    this.privateNetworks = _.filter(this.privateNetworks, (d) => {
                        return (d.id != pn.id);
                    });
                    toastr.success('删除成功!');
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
        this.updateconfirm.show((result => {
            // console.log(result);
            this.http.fetch(nsApi.url('privateNetwork.updateName.post'), {
                method: 'post',
                body: json({
                    id: pn.id,
                    name: result.name,
                    desc: result.desc
                })
            }).then((resp) => {
                // this. = resp.data;
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
    delRouter() {
        this.deleteRouterconfirm.show();
    }

    onpageHandler(selectedPage) {
        console.log(selectedPage);
        this.page.currentPage = selectedPage;
        // this.page = {
        //     currentPage: selectedPage,
        //     pageSize: 10,
        //     size: 10,
        //     total: 75,
        //     pageCount: 8,
        //     hasPreviousPage: false,
        //     hasNextPage: true
        // };
    }
}
