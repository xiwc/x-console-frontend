import {
    bindable,
    containerless
}
from 'aurelia-framework';

@containerless
export class UiSecuritySelectModal {

    @bindable type = 'mount'; // mount or unmount

    securities = [
        { id: '01', name: '安全组01' },
        { id: '02', name: '安全组02' },
        { id: '03', name: '安全组03' },
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

        return _.find(this.securities, (item) => {
            return item.selected;
        });
    }

    clearChecked() {
        _.each(this.securities, (item) => {
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
