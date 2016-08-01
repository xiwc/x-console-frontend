import { inject, Lazy } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

@inject(Lazy.of(HttpClient))
export class NetworkRouter {

    steps = ['上海一区', '专用VPC网络', '路由器'];

    createTitle = "创建路由器";
    updateNameTitle = "修改名称";
    deleteContent = "确定要删除这条记录吗？";
    deleteTite = "删除提示";
    deleteRouterContent = "确定要删除路由器吗？";

    routers = null;
    allChecked = false;

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
        this.getRouters();
    }

    /*
        获取路由器列表
    */
    getRouters() {
        return this.http.fetch(nsApi.url('router.list.get', { pageNo: 1, pageSize: 1 }))
            .then((resp) => {
                return resp.json();
            }).then((data) => {
                this.routers = data.list;
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
                _.each(this.routers, (d) => { d.checked = true });
                this.allChecked = true;
            },
            onUnchecked: () => {
                _.each(this.routers, (d) => { d.checked = false });
                this.allChecked = false;
            },
        });
    }

    initActionsHandler(uiActions) {
        $(uiActions).dropdown({
            action: 'hide'
        });
    }

    //创建
    createHandler() {
        this.createconfirm.show();
        //}));
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
                    this.http.fetch(nsApi.url('router.delete.post', {
                        id: pw.id
                    }), { method: 'post' }).then((resp) => {
                        // this. = resp.data;
                        this.routers = _.filter(this.routers, (d) => {
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
                this.http.fetch(nsApi.url('router.delete.post', {
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
        _.each(this.routers, (d) => {
            if (!d.checked) {
                flg = false;
                return false;
            }
        });

        return flg;
    }

    getCheckedItems() {
        return _.filter(this.routers, (d) => {
            return d.checked;
        });
    }

    refreshHandler() {
        this.getRouters();
        toastr.info('刷新成功!');
    }
    

    //修改名称
    updateName(pn) {
        this.updateconfirm.show((result => {
            // console.log(result);
            this.http.fetch(nsApi.url('router.updateName.post'), {
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

    //修改公网IP.show();
   updatePublicIp(rt){
        this.updatePublicIpDialog.show((result => {
            this.http.fetch(nsApi.url('router.updatePublicIp.post'), {
                method: 'post',
                body: json({
                    id: rt.id,
                    publciipid: result.publicipid
                })
            }).then((resp) => {
                // this. = resp.data;
                // pn.name = result.name;
                // pn.desc = result.desc;
                toastr.success('修改公网IP操作成功!');
            });
            //rt.
        }));
   }
}
