import { inject } from 'aurelia-dependency-injection';
import { customAttribute } from 'aurelia-templating';
import { I18N } from 'aurelia-i18n';

@customAttribute('cls-locale')
@inject(Element, I18N)
export class ClsLocale {

    // 添加的classes
    classes = "";

    constructor(element, i18n) {
        this.element = element;
        this.locale = i18n.getLocale();
    }

    valueChanged(value) {

        if (this.classes) {
            $(this.element).removeClass(this.classes);
        }

        // cls-locale="zh|en:test test2&jp:test3 test4"
        if (value) {

            _(value.split("&")).each((val, key, arr) => {

                var arr2 = val.split(':');

                if (_(arr2[0].split('|')).contains(this.locale)) {
                    this.classes = arr2[1];
                    $(this.element).addClass(arr2[1]);
                    return false;
                }
            });
        }
    }

    bind(bindingContext) {
        this.valueChanged(this.value);
    }

    unbind() {
        if (this.classes) {
            $(this.element).removeClass(this.classes);
        }
    }
}
