import {
    bindable,
    containerless
}
from 'aurelia-framework';

@containerless
export class UiBtnGrp {

    @bindable router = null;

    @bindable items = [{
        label: '1核',
        value: '1',
        selected: true
    }, {
        label: '2核',
        value: '2',
        selected: false
    }];

    /**
     * 当视图被附加到DOM中时被调用
     */
    attached() {

    }

    clearSelected() {
        _.each(this.items, (item) => {
            item.selected = false;
        });
    }

    selectHandler(item) {
        this.clearSelected();
        item.selected = true;
    }

    getSelectedItem() {
        return _.first(_.filter(this.items, (item) => {
            return item.selected;
        }));
    }
}
