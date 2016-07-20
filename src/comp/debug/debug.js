/**
Debug调试API mock调用时,自定义设置共通组件, 使用方式: 通过在浏览器URL中加入debug参数.
eg: http://team1.step.newtouchwork.com/page/item/indexPane.html?debug
具体使用指导: http://192.168.205.224:8090/pages/viewpage.action?pageId=622695
**/
export class Debug {

    val = true;

    apiArr = [];

    filterApiArr = [];

    _searchText = '';

    content = [];

    constructor() {

        for (var name in nsAPI) {
            this.apiArr.push({
                name: name,
                value: nsAPI[name],
                hasPayload: nsAPI[name].hasOwnProperty('payload'),
                payload: '<pre style="margin:0;"><code>' + JSON.stringify(nsAPI[name].payload, null, 4) + '</code></pre>',
                isHidden: false
            });

            this.content.push({
                title: name
            });
        }

        this.filterApiArr = this.apiArr;
    }

    attached() {

        $('.popup', this.mdDebug).popup();
        $('.popup', this.rowApi).popup({
            hoverable: true
        });

        var _this = this;

        $(this.mdDebug).modal({
            closable: false,
            onApprove: function($elem) {

                var $chkArr = $elem.closest('.modal').find('.grid .chk-api');

                $chkArr.each(function(index, el) {
                    var isChked = $(el).checkbox('is checked');
                    $.each(_this.filterApiArr, function(index, api) {
                        if (api.name === $(el).find('input').val()) {
                            api.value.ismock = isChked;
                            return false;
                        }
                    });

                });

                nsApiFunc();

                // save to localStorage
                localStorage.setItem('debug-settings', JSON.stringify(_this.filterApiArr));

            }
        });

        $(this.uiSearch).search({
            source: _this.content,
            onSelect: function(result, response) {
                _this.searchText = result.title;
            }
        });

        $(this.chkAll).checkbox({
            onChecked: function() {

                $(this).closest('.grid').find('.row:visible').find('.chk-api').checkbox('set checked');
            },
            onUnchecked: function() {

                $(this).closest('.grid').find('.row:visible').find('.chk-api').checkbox('set unchecked');
            }
        });

        $('.grid .chk-api', this.mdDebug).each(function(index, el) {
            $.each(_this.filterApiArr, function(index, api) {
                if (api.name === $(el).find('input').val()) {
                    if (api.value.ismock) {
                        $(el).checkbox('set checked');
                    } else {
                        $(el).checkbox('set unchecked');
                    }
                    return false;
                }
            });
        });

    }

    clearHandler() {
        this.searchText = "";
    }

    get searchText() {
        return this._searchText;
    }
    set searchText(newValue) {

        var _this = this;
        this._searchText = newValue;

        if (newValue === '') {
            $.each(this.filterApiArr, function(index, val) {
                val.isHidden = false;
            });
        } else {

            $.each(this.filterApiArr, function(index, val) {
                if (val.name.indexOf(_this.searchText) !== -1) {
                    val.isHidden = false;
                } else {
                    val.isHidden = true;
                }
            });
        }
    }

    debugHandler(evt) {
        $(this.mdDebug).modal('show');
    }

}
