import { inject, Lazy } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

@inject(Lazy.of(HttpClient))
export class NetworkRouterDetails {

    steps = ['上海一区', '云服务器', '路由器详情'];

    details = null;
    hostlist = null;
    id = "";

    page = {
        currentPage: 1,
        pageSize: 10,
        size: 10,
        total: 10,
        pageCount: 10,
        hasPreviousPage: false,
        hasNextPage: true
    };

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

        $('table.sortable').tablesort();

        let _this = this;
        $(this.menuItem).find('.menu .item').tab();
        $(this.routerDetailsRef).find('.ui.dropdown').dropdown({
            onChange: function() {
                //console.log($(this).index());
                _this.page.pageSize = $(this).val();
            }
        });

        toastr.warning("页面尚在完善中......");
    }


    /**
     * 在视图模型(ViewModel)展示前执行一些自定义代码逻辑
     * @param  {[object]} params                参数
     * @param  {[object]} routeConfig           路由配置
     * @param  {[object]} navigationInstruction 导航指令
     * @return {[promise]}                      你可以可选的返回一个延迟许诺(promise), 告诉路由等待执行bind和attach视图(view), 直到你完成你的处理工作.
     */
    activate(params, routeConfig, navigationInstruction) {
        this.id = params.id;
        //获取私有网络详情
        this.http.fetch(nsApi.url('router.detail.get', {
            id: params.id
        })).then((resp) => {
            return resp.json();
        }).then((data) => {
            this.details = data.properties;
        });

        //this.getHostList();   
    }

    //获取主机列表
    getHostList() {
        this.http.fetch(nsApi.url('privateNetwork.host.list.get', {
            id: this.id,
            pageNo: this.page.currentPage,
            pageSize: this.page.pageSize
        })).then((resp) => {
            return resp.json();
        }).then((data) => {
            this.hostlist = data.list;
            this.page = data;
        });
    }

    onpageHandler(selectedPage) {
        console.log(selectedPage);
        this.page.currentPage = selectedPage;
        this.getHostList();
    }

    //删除单条
    delHandler() {
        this.deleteconfirm.show({
            title: "删除提示",
            content: '确定要删除路由器<code>' + this.details.name + '</code>吗?',
            onapprove: () => {
                this.http.fetch(nsApi.url('router.delete.post'), {
                    method: 'post',
                    body: json({
                        ids: [this.details.id]
                    })
                }).then((resp) => {
                    if (resp.ok) {
                        toastr.success('删除成功!');
                    }
                });
            }
        });
    }

    //修改名称
    updateName() {
        this.selectedRouter = this.details;
        this.updateconfirm.show((result => {
            this.http.fetch(nsApi.url('router.updateName.post'), {
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
                    toastr.success('修改名称操作成功!');
                }
            });
        }));
    }

    //修改公网IP;
    updatePublicIp() {
        this.updatePublicIpDialog.show((result => {
            //console.log(result);
            this.http.fetch(nsApi.url('router.updatePublicIp.post'), {
                method: 'post',
                body: json({
                    id: this.details.id,
                    publicIpId: result.publicipid
                })
            }).then((resp) => {
                if (resp.ok) {
                    this.details.ip = result.ipname;
                    toastr.success('修改公网IP操作成功!');
                }
            });
        }));
    }

    //单个启动
    startRouter() {
        this.deleteconfirm.show({
            title: "启动路由器",
            content: "确定要启动路由器<code>" + this.details.name + "</code>吗？",
            onapprove: () => {
                this.http.fetch(nsApi.url('router.start.post'), {
                    method: 'post',
                    body: json({
                        ids: [this.details.id]
                    })
                }).then((resp) => {
                    if (resp.ok) {
                        this.details.status = 1;
                        toastr.success('启动成功!');
                    }
                });
            }
        });
    }

    //单个关闭
    stopRouter() {
        this.deleteconfirm.show({
            title: "关闭路由器",
            content: "确定要关闭路由器<code>" + this.details.name + "</code>吗？",
            onapprove: () => {
                this.http.fetch(nsApi.url('router.stop.post'), {
                    method: 'post',
                    body: json({
                        ids: [this.details.id]
                    })
                }).then((resp) => {
                    if (resp.ok) {
                        this.details.status = 2;
                        toastr.success('关闭成功!');
                    }
                });
            }
        });
    }

    //扩容操作
    updateRouterType() {
        this.updatetypeDialog.show({
            sth: { routerName: this.details.name, type: this.details.type },
            onapprove: (result) => {
                //console.log(result);
                this.http.fetch(nsApi.url('router.updateType.post'), {
                    method: 'post',
                    body: json({
                        id: this.details.id,
                        type: result.type
                    })
                }).then((resp) => {
                    if (resp.ok) {
                        this.details.type = result.type;
                        toastr.success('修改成功!');
                    }
                });
            }
        });
    }

    //添加私有网络
    addPrivatework() {
        this.addPrivateworkDialog.show({
            sth: { name: this.details.name },
            onapprove: (result) => {
                console.log(result);
                toastr.warning("开发中......");
                // this.http.fetch(nsApi.url('router.updateType.post'), {
                //     method: 'post',
                //     body: json({
                //         id: this.details.id,
                //         type: result.type
                //     })
                // }).then((resp) => {
                //     if (resp.ok) {
                //         this.details.type = result.type;
                //         toastr.success('添加成功!');
                //     }
                // });
            }
        });
    }

    //删除私有网络
    removePrivatework() {
        toastr.warning("开发中......");
    }

    //配置DHCP
    updateDhcp() {
        this.dhcpDialog.show({
            onapprove: (result) => {

            }
        });
    }

    stopPortRulur() {
        this.deleteconfirm.show({
            title: "禁用规则",
            content: "确定要禁用此转发规则吗？",
            onapprove: () => {

            }
        });
    }
}
