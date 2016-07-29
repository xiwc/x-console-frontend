import { inject, Lazy } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

@inject(Lazy.of(HttpClient))
export class ServerSecurityDetails {

    steps = ['上海一区', '云服务器', '安全组详情'];

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
        // toastr.info(params.id);
        this.http.fetch(nsApi.url('security.detail.get', {
            id: params.id
        })).then((resp) => {
            this.details = resp;
        });
    }

    updateHandler(disk) {
        this.uiNameUpdateModal.show((result => {
            // console.log(result);
            this.http.fetch(nsApi.url('disk.updateName.post'), {
                method: 'post',
                body: json({
                    id: disk.id,
                    name: result.name,
                    desc: result.desc
                })
            }).then((resp) => {
                // this. = resp.data;
                disk.name = result.name;
                disk.desc = result.desc;
                toastr.success('修改名称操作成功!');
            });
        }));
    }

    newRuleHandler() {

    }

    addToHostHandler() {

    }

    delHandler(disk) {
        this.confirm.show({
            content: '确定要删除硬盘xxxxx吗?<br/>资源删除后会在回收站中保留2小时',
            onapprove: () => {
                this.http.fetch(nsApi.url('disk.delete.post', {
                    id: disk.id
                }), { method: 'post' }).then((resp) => {
                    // this. = resp.data;
                    // TODO 跳转到?
                    toastr.success('删除成功!');
                });
            }
        });
    }
}
