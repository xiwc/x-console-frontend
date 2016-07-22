import {
    bindable,
    containerless
}
from 'aurelia-framework';

@containerless
export class ServerHostCreate {

    /**
     * 当视图被附加到DOM中时被调用
     */
    attached() {}

    show() {
        $(this.modal).modal('show');
    }

}
