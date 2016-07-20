import {
    inject
}
from 'aurelia-dependency-injection';
import {
    customAttribute
}
from 'aurelia-templating';

@customAttribute('dimmer-url')
@inject(Element)
export class DimmerUrl {

    url = '';

    constructor(element) {

        this.element = element;

        this.$dimmer = $(this.element).dimmer({
            variation: 'inverted',
            closable: false,
            opacity: 0.7
        });

        this.$dimmer.dimmer('get dimmer').append('<div class="content"><div class="center"><h5 class="ui icon header"><div class="ui active loader"></div></h5></div></div>');

        this.sendHandler = (evt, request, settings) => {

            if (url('path', settings.url) == this.url) {
                this.$dimmer.dimmer('show');
            }
        };

        this.stopHandler = () => {

            this.$dimmer.dimmer('hide');
        };

        $(document).on('ajaxSend', this.sendHandler);
        $(document).on('ajaxStop', this.stopHandler);
    }

    valueChanged(newValue) {
        this.url = newValue;
    }

    bind(bindingContext) {
        this.valueChanged(this.value);
    }

    unbind() {
        $(document).off('ajaxSend', this.sendHandler);
        $(document).off('ajaxStop', this.stopHandler);
    }
}
