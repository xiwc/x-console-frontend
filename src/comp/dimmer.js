import {
    inject
}
from 'aurelia-dependency-injection';
import {
    customAttribute
}
from 'aurelia-templating';

@customAttribute('dimmer')
@inject(Element)
export class Dimmer {

    enable = true;

    constructor(element) {

        this.element = element;

        this.$dimmer = $(this.element).dimmer({
            variation: 'inverted',
            closable: false,
            opacity: 0.7
        });

        this.$dimmer.dimmer('get dimmer').append('<div class="content"><div class="center"><h5 class="ui icon header"><div class="ui active loader"></div></h5></div></div>');

        this.startHandler = () => {
            this.enable && this.$dimmer.dimmer('show');
        };

        this.stopHandler = () => {
            this.enable && this.$dimmer.dimmer('hide');
        };

        $(document).on('ajaxStart', this.startHandler);
        $(document).on('ajaxStop', this.stopHandler);
    }

    valueChanged(newValue) {
        this.enable = (newValue != 'false');
    }

    bind(bindingContext) {
        this.valueChanged(this.value);
    }

    unbind() {
        $(document).off('ajaxStart', this.startHandler);
        $(document).off('ajaxStop', this.stopHandler);
    }
}
