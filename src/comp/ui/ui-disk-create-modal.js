import {
    bindable,
    containerless
}
from 'aurelia-framework';

import 'ion-rangeslider';

@containerless
export class UiDiskCreateModal {

    type = '1';

    name = '';

    count = '1';

    /**
     * 当视图被附加到DOM中时被调用
     */
    attached() {

        $(this.uiPerformance).checkbox({
            onChecked: () => {
                this.type = '1';
            }
        });
        $(this.uiCapacity).checkbox({
            onChecked: () => {
                this.type = '2';
            }
        });

        $(this.rangeSize).ionRangeSlider({
            onChange: () => {
                // console.log($(this.rangeBw).val());
            }
        });

        this.slider = $(this.rangeSize).data("ionRangeSlider");

        $(this.md).modal({
            closable: false,
            // allowMultiple: true,
            onShow: () => {
                this.name = '';
                this.count = '1';
                this.type = '1';
                $(this.uiPerformance).checkbox('set checked');
                this.slider.reset();
            },
            onApprove: () => {
                if (!$(this.form).form('is valid')) {
                    toastr.error('表单验证不合法,请修改表单不合法输入!');
                    return false;
                }
            },
            onDeny: () => {}
        });

        $(this.form).form({
            on: 'blur',
            inline: true,
            fields: {
                name: {
                    identifier: 'name',
                    rules: [{
                        type: 'empty',
                        prompt: '硬盘名称不能为空!'
                    }]
                },
                count: {
                    identifier: 'count',
                    rules: [{
                        type: 'empty',
                        prompt: '数量不能为空!'
                    }, {
                        type: 'integer[1..10]',
                        prompt: '一次创建硬盘数量必须是介于1到5的整数!'
                    }]
                }
            }
        });
    }

    show() {
        $(this.md).modal('show');
    }

    hide() {
        $(this.md).modal('hide');
    }
}
