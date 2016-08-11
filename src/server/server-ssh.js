import { inject, Lazy } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

@inject(Lazy.of(HttpClient))
export class ServerSSH {

    steps = ['上海一区', '云服务器', 'SSH密钥'];

    sshkeys;

    allChecked = false;

    page = {
        currentPage: 1
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
                _.each(this.sshkeys, (k) => { k.checked = true });
                this.allChecked = true;
            },
            onUnchecked: () => {
                _.each(this.sshkeys, (k) => { k.checked = false });
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
        this.getSshkeys();
    }

    getSshkeys(pageNo = 1) { // TODO mockserver?
        return this.http.fetch(nsApi.url('keystore.list.get', {
                pageNo: pageNo,
                pageSize: nsConfig.pageSize
            }))
            .then((resp) => {
                return resp.json();
            }).then((data) => {
                this.sshkeys = data.list;
                this.page = data;
            });
    }

    getCheckedItems() {
        return _.filter(this.sshkeys, 'checked');
    }

    isAllChecked() {

        return _.every(this.sshkeys, 'checked');
    }

    selectHandler(uiChk, sshkey) {
        $(uiChk).checkbox({
            onChecked: () => {
                sshkey.checked = true;
                this.allChecked = this.isAllChecked();
            },
            onUnchecked: () => {
                sshkey.checked = false;
                this.allChecked = this.isAllChecked();
            }
        });
    }

    initActionsHandler(uiActions) {
        $(uiActions).dropdown({
            action: 'hide'
        });
    }

    refreshHandler() {
        this.getSshkeys(this.page.currentPage).then(() => {
            toastr.info('刷新完成!');
            this.allChecked = false;
        });
    }

    createHandler() {
        this.uiSshkeyCreateModal.show((result) => {
            this.getSshkeys();
            if (result.way == 1) {
                this.uiSshkeyDownloadModal.show(result);
            }
        });
    }

    delHandler() {

        let items = this.getCheckedItems();
        if (items.length == 0) {
            toastr.error('请先选择需要删除的SSH密钥!');
            return;
        }

        let ids = _.map(items, 'id');

        this.confirm.show({
            content: '确定要删除选择的SSH密钥吗?',
            onapprove: (result) => {
                this.http.fetch(nsApi.url('keystore.delete.post'), {
                    method: 'post',
                    body: json({
                        ids: ids
                    })
                }).then((resp) => {
                    if (resp.ok) {
                        this.refreshHandler();
                        toastr.success('SSH密钥删除成功!');
                    }
                });
            }
        });
    }

    updateHandler(sshkey) {
        this.selectedSshkey = sshkey;
        this.uiNameUpdateModal.show((result) => {
            this.http.fetch(nsApi.url('keystore.updateName.post'), {
                method: 'post',
                body: json({
                    "desc": result.desc,
                    "id": sshkey.id,
                    "name": result.name
                })
            }).then((resp) => {
                if (resp.ok) {
                    sshkey.name = result.name;
                    sshkey.desc = result.desc;
                    toastr.success('修改SSH密钥名称成功!');
                }
            });
        });
    }

    onpageHandler(selectedPage) {
        this.getSshkeys(selectedPage);
    }
}
