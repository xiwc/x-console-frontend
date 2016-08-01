import {
    bindable,
    containerless
}
from 'aurelia-framework';

@containerless
export class UiDiskSelectModal {

    disks = [
        { id: 'host01', name: 'disk01', type: '性能型' },
        { id: 'host02', name: 'disk02', type: '性能型' },
        { id: 'host03', name: 'disk03', type: '性能型' },
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

        return _.find(this.disks, (item) => {
            return item.selected;
        });
    }

    clearChecked() {
        _.each(this.disks, (item) => {
            item.selected = false;
        });
    }

    initChkHandler(uiSelect, item, first) {
        $(uiSelect).checkbox({
            onChecked: () => {
                this.clearChecked();
                item.selected = true;
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
