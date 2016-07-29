import {
    bindable,
    containerless
}
from 'aurelia-framework';

export class UiPageable {

    @bindable page;

    @bindable onpage;

    // @bindable page = {
    //     currentPage: 8,
    //     pageSize: 10,
    //     size: 10,
    //     total: 75,
    //     pageCount: 8,
    //     hasPreviousPage: false,
    //     hasNextPage: true
    // };



    pageHandler(page) {
        this.selectedPage = page;
        this.onpage && this.onpage(page);
    }

}
