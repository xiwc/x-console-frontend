import { inject, Lazy } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

@inject(Lazy.of(HttpClient))
export class NetworkPrivateDetails {

    steps = ['上海一区', '云服务器', '私有网络详情'];

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
        });

        this.getHostList();   
    }

    //获取主机列表
    getHostList(){
        this.http.fetch(nsApi.url('privateNetwork.host.list.get', {
            id: this.id,
            pageNo: this.page.currentPage,
            pageSize:this.page.pageSize
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
}
