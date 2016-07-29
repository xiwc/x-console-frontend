import {
    bindable,
    containerless
}
from 'aurelia-framework';

@containerless
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
        if (page < 1 || page > this.page.pageCount) {
            return;
        }

        this.selectedPage = page;
        this.onpage && this.onpage(page);
    }

}
