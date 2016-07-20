import {
    inject
}
from 'aurelia-dependency-injection';
import {
    customAttribute
}
from 'aurelia-templating';


@customAttribute('task')
@inject(Element)
export class Task {

    task = null;
    bindingCtx = null;

    constructor(element) {
        this.element = element;
    }

    valueChanged(newValue) {
        this.task = newValue;
        if (_(this.task).isFunction()) {
            _(this.task).bind(this.bindingCtx, this.element)();
        }
    }

    bind(bindingContext) {
        this.bindingCtx = bindingContext;
        this.valueChanged(this.value);
    }

    unbind() {
        this.element = null;
        this.task = null;
        this.bindingCtx = null;
    }

}
