import { inject, Lazy } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

@inject(Lazy.of(HttpClient))
export class NetworkPrivateDetails {

    steps = [
        { name: '上海一区', href: '#' },
        nsCtx.networkInfo,
        { name: '私有网络', href: '/#/network/private' }
    ];

    details = null;
    hostlist = null;
    id = "";

    page = {
        currentPage: 1,
        pageSize: 5,
        size: 0,
        total: 0,
        pageCount: 0,
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
        this.http.fetch(nsApi.url('privateNetwork.detail.get', {
            id: params.id
        })).then((resp) => {
            return resp.json();
        }).then((data) => {
            this.details = data;
            this.steps.push({ name: this.details.name });
        });

        this.getHostList();
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
            content: '确定要删除私有网络<code>' + this.details.name + '</code>吗?',
            onapprove: () => {
                this.http.fetch(nsApi.url('privateNetwork.delete.post'), {
                    method: 'post',
                    body: json({
                        ids: [this.details.id]
                    })
                }).then((resp) => {
                    // this. = resp.data;
                    if (resp.ok) {
                        toastr.success('删除成功!');
                    }
                });
            }
        });
    }

    //修改名称
    updateName() {
        this.selectedPrivateNetwork = this.details;
        this.updateconfirm.show((result => {
            this.http.fetch(nsApi.url('privateNetwork.updateName.post'), {
                method: 'post',
                body: json({
                    id: this.details.id,
                    name: result.name,
                    desc: result.desc
                })
            }).then((resp) => {
                this.details.name = result.name;
                this.details.desc = result.desc;
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
}
