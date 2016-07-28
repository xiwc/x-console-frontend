import {
    bindable,
    containerless
}
from 'aurelia-framework';

@containerless
export class UiNav {

    @bindable router = null;

    @bindable steps = [];

    /**
     * 当视图被附加到DOM中时被调用
     */
    attached() {

    }
}