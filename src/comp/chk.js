import { customAttribute, bindable } from 'aurelia-framework';
import { inject } from 'aurelia-dependency-injection';

@customAttribute('chk')
@inject(Element)
export class Chk {

    constructor(element) {

        this.element = element;
    }

    valueChanged(value) {

        this.value = value;

        if (value) {
            $(this.element).checkbox('set checked');
        } else {
            $(this.element).checkbox('set unchecked');
        }
    }

    bind(bindingContext) {
        this.valueChanged(this.value);
    }

    unbind() {}
}
