export class Home {

    msg = "主页";

    /**
     * 当视图被附加到DOM中时被调用
     */
    attached() {
        console.log($('body'));
        console.log(_([1, 2]).first(1));
        Cookie.set('name', 'test cookie');
        console.log(Cookie.get('name'));
        console.log(wurl('hostname'));

        toastr.info('toastr info...');
    }
}
