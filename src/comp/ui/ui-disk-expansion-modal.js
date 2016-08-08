import {
    bindable,
    containerless
}
from 'aurelia-framework';

import 'ion-rangeslider';

@containerless
export class UiDiskExpansionModal {

    @bindable disk = null;

    addCapacity = 0;

    /**
     * 当视图被附加到DOM中时被调用
     */
    attached() {

        $(this.rangeSize).ionRangeSlider({
            from: 10,
            from_max: 5000,
            from_shadow: true,
            keyboard: true,
            keyboard_step: 10,
            onChange: () => {
                this.addCapacity = $(this.rangeSize).val() - this.capacity;
            }
        });

        this.slider = $(this.rangeSize).data("ionRangeSlider");

        $(this.md).modal({
            closable: false,
            onShow: () => {
                this.slider.update({
                    from: this.capacity,
                    from_min: this.capacity,
                });
                this.addCapacity = 0;
            },
            onApprove: () => {
                this.onapprove && this.onapprove({ capacity: $(this.rangeSize).val() - this.capacity });
            },
            onDeny: () => {

            },
            onHide: () => {
                this.slider.reset();
                // this.slider.destroy();
            }
        });

    }

    checkCapacity(uiCapacity) {
        let max = 5000 - this.capacity;
        let val = $(uiCapacity).val();
        if (isNaN(val)) {
            val = val.replace(/[^0-9]/g, '');
            val = (!val || val == 0) ? 10 : val;
            $(uiCapacity).val(val);
        } else {
            val = parseInt(val);
            if (val > max) {
                val = max;
                $(uiCapacity).val(val);
            } else if (val < 10) {
                val = 10;
                $(uiCapacity).val(val);
            } else {
                let v = val / 10;
                let v2 = parseInt(v);
                if (v != v2) {
                    val = v2 * 10;
                    $(uiCapacity).val(val);
                }
            }
        }

        this.slider.update({
            from: this.capacity + val
        });
    }

    focusoutHandler(evt, uiCapacity) {
        this.checkCapacity(uiCapacity);
    }


    keyupHandler(evt, uiCapacity) {
        if (evt.keyCode == 13) {
            this.checkCapacity(uiCapacity);
        }
    }

    show(opt) {
        this.capacity = opt.capacity;

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
