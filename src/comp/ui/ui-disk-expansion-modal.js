import {
    bindable,
    containerless
}
from 'aurelia-framework';

import 'ion-rangeslider';

@containerless
export class UiDiskExpansionModal {

    @bindable disk = null;

    /**
     * 当视图被附加到DOM中时被调用
     */
    attached() {
        $(this.md).modal({
            closable: false,
            onShow: () => {

            },
            onApprove: () => {
                //console.log($(this.rangeSize).val());
                this.onapprove && this.onapprove({ capacity: $(this.rangeSize).val() });
            },
            onDeny: () => {
                
            },
            onHide: () => {
                this.slider.reset();
                this.slider.destroy();
            }
        });

    }

    show(opt) {
        $(this.rangeSize).ionRangeSlider({
            max: opt.sth.maxCapacity,
            to: 10,
            value: 10
        });

        this.slider = $(this.rangeSize).data("ionRangeSlider");

        if (opt.onapprove) {
            this.onapprove = opt.onapprove;
        }

        if (opt.ondeny) {
            this.ondeny = opt.ondeny;
        }
        $(this.md).modal('show');
    }

    hide() {
        $(this.md).modal('hide');
    }
}
