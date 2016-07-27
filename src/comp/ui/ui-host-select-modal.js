import {
    bindable,
    containerless
}
from 'aurelia-framework';

@containerless
export class UiHostSelectModal {

    hosts = [
        { id: 'host01', name: 'host01', type: '性能型' },
        { id: 'host02', name: 'host02', type: '性能型' },
        { id: 'host03', name: 'host03', type: '性能型' },
    ];

    /**
     * 当视图被附加到DOM中时被调用
     */
    attached() {
        $(this.md).modal({
            closable: false,
            onApprove: () => {
                this.onapprove && this.onapprove(this.getSelected());
            },
            onDeny: () => {
                this.ondeny && this.ondeny();
            }
        });
    }

    getSelected() {

        let selected = null;
        _.each(this.hosts, (host) => {
            if (host.selected) {
                selected = host;
            }
        });

        return selected;
    }

    clearChecked() {
        _.each(this.hosts, (host) => {
            host.selected = false;
        });
    }

    initChkHandler(uiSelect, host, first) {
        $(uiSelect).checkbox({
            onChecked: () => {
                this.clearChecked();
                host.selected = true;
            }
        });

        if (first) {
            $(uiSelect).checkbox('check');
        }
    }

    /**
     * 显示确认窗口
     * @param onapprove: 确认回调函数
     * @param ondeny: 取消回调函数
     */
    show(onapprove, ondeny) {

        if (onapprove) {
            this.onapprove = onapprove;
        }

        if (ondeny) {
            this.ondeny = ondeny;
        }

        $(this.md).modal('show');
    }

    hide() {
        $(this.md).modal('hide');
    }
}
