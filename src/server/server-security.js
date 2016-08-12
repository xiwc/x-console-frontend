import {
    bindable,
    containerless
}
from 'aurelia-framework';
import { inject, Lazy } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

@inject(Lazy.of(HttpClient))
@containerless
export class ServerSecurity {

    steps = ['上海一区', nsCtx.serverInfo, '安全组'];

    securities;

    allChecked = false;

    titleName = "创建安全组";

    page = {
        currentPage: 1,
        pageSize: 10,
        size: 10,
        total: 75,
        pageCount: 8,
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
        $(this.uiChkAll).checkbox({
            onChecked: () => {
                _.each(this.securities, (d) => { d.checked = true });
                this.allChecked = true;
            },
            onUnchecked: () => {
                _.each(this.securities, (d) => { d.checked = false });
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
        this.getSoftGroupList();
    }


    initActionsHandler(uiActions) {
        $(uiActions).dropdown({
            action: 'hide'
        });
    }

    getSecurities() {
        this.securities = [
            { id: 'sg_oskjdhbe', name: '安全组01', createPeriod: '3天前' },
            { id: 'sg_oskjdhbe', name: '安全组01', createPeriod: '3天前' },
        ];
    }

    refreshHandler() {
        this.getSoftGroupList();
    }

    createHandler() {
        this.createconfirm.show((result) => {
            this.http.fetch(nsApi.url('securityGroup.create.post'), {
                method: 'post',
                body: json({
                    "name": result.name
                })
            }).then((resp) => {
                if (resp.ok) {
                    toastr.success('创建安全组成功!');
                }
            });
        });
    }

    newRuleHandler() {
        this.uiSecurityNewRuleModal.show(() => {
            toastr.info('新建规则...');
        });
    }

    updateHandler(security) {
        this.selectedSecurity = security;
        this.uiNameUpdateModal.show((result) => {
            toastr.info('修改名称...');
        });
    }

    addToHostHandler() {

    }

    delHandler() {
        this.confirm.show({
            content: '确定要删除安全组xxxxx吗?<br/>资源删除后会在回收站中保留2小时',
            onapprove: () => {
                // this.http.fetch(nsApi.url('disk.delete.post', {
                //     id: disk.id
                // }), { method: 'post' }).then((resp) => {
                //     // this. = resp.data;
                //     this.disks = _.filter(this.disks, (d) => {
                //         return (d.id != disk.id);
                //     });
                //     toastr.success('删除成功!');
                // });
            }
        });
    }

    selectHandler(uiChk, security) {
        $(uiChk).checkbox({
            onChecked: () => {
                security.checked = true;
                this.allChecked = this.isAllChecked();
            },
            onUnchecked: () => {
                security.checked = false;
                this.allChecked = this.isAllChecked();
            }
        });
    }

    isAllChecked() {

        return _.every(this.securities, 'checked');
    }

    getCheckedItems() {
        return _.filter(this.securities, 'checked');
    }

    onpageHandler(selectedPage) {
        console.log(selectedPage);
        this.page = {
            currentPage: selectedPage,
            pageSize: 10,
            size: 10,
            total: 75,
            pageCount: 8,
            hasPreviousPage: false,
            hasNextPage: true
        };
    }

    getSoftGroupList() {
        this.http.fetch(nsApi.url('securityGroup.list.get', {
            "pageNo": this.page.currentPage,
            "pageSize": nsConfig.pageSize
        })).then((resp) => {
            return resp.json();
        }).then((data) => {
            this.securities = data.list;
            this.page = data;
        });
    }
}
