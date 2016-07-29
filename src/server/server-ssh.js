import { inject, Lazy } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

@inject(Lazy.of(HttpClient))
export class ServerSSH {

    steps = ['上海一区', '云服务器', 'SSH秘钥'];

    sshkeys;

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

    /**
     * 构造函数
     */
    constructor(getHttp) {
        this.http = getHttp();
        // this.initPage();
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

    getSshkeys() { // TODO mockserver?
        return this.http.fetch(nsApi.url('keystore.list.get', { pageNo: 1, pageSize: 1000 })).then((resp) => {
            this.sshkeys = resp.data;
        });
        // this.sshkeys = [{
        //     id: 'ssh-kajksdjns',
        //     name: '密钥001',
        //     method: 'ssh-rsa',
        //     createDate: '2天前'
        // }, {
        //     id: 'ssh-kajksdjns',
        //     name: '密钥001',
        //     method: 'ssh-rsa',
        //     createDate: '2天前'
        // }];
    }

    getCheckedItems() {
        return _.filter(this.sshkeys, (k) => {
            return k.checked;
        });
    }

    isAllChecked() {
        let flg = true;
        _.each(this.sshkeys, (k) => {
            if (!k.checked) {
                flg = false;
                return false;
            }
        });

        return flg;
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
        // toastr.info('刷新操作...');
        this.getSshkeys().then(() => {
            toastr.info('刷新完成!');
        });
    }

    createHandler() {
        // toastr.info('创建操作...');
        this.uiSshkeyCreateModal.show(() => { this.getSshkeys(); });
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
                    // this. = resp.data;
                    _.remove(this.sshkeys, (k) => {
                        return _.includes(ids, k.id);
                    });
                    toastr.success('SSH密钥删除成功!');
                });
            }
        });
    }

    updateHandler(sshkey) {
        // toastr.info('修改名称操作...');
        this.uiNameUpdateModal.show((result) => {
            this.http.fetch(nsApi.url('keystore.updateName.post'), {
                method: 'post',
                body: json({
                    "desc": result.desc,
                    "id": sshkey.id,
                    "name": result.name
                })
            }).then((resp) => {
                // this. = resp.data;
                sshkey.name = result.name;
                sshkey.desc = result.desc;
                toastr.success('修改SSH密钥名称成功!');
            });
        });
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
}
