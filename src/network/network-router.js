export class NetworkRouter {

    steps = ['上海一区', '专用VPC网络', '路由器'];
    
    createTitle = "创建路由器";
    updateNameTitle = "修改名称";
    deleteContent = "确定要删除这条记录吗？";
    deleteTite = "删除提示";
    deleteRouterContent = "确定要删除路由器吗？";

    constructor() { // 通过构造函数注入
    	 
    }

    /**
     * 当视图被附加到DOM中时被调用
     */
    attached() {
        $('.nx-dd-action-hide', this.container).dropdown({
            action: 'hide'
        });
    }

    //创建
    createHandler() {
        this.createconfirm.show();
    }

    //批量删除
    delMoreHandler(){
    	//获取被选中的记录
    	let checkedIist = [];
    	$("#tbody1").find("input[type=checkbox]").each(function () {
    		if($(this).get(0).checked) {
    			checkedIist.push($(this).index());
    		}
    	});
    	if(checkedIist.length > 0)
    		this.deleteconfirm.show();
    }

    //删除单条
    delHandler(){
    	this.deleteconfirm.show();
    }

    //全部选中
    selectAll(){
    	//console.log($("#allCheckBox").get(0).checked); 
    	$("#tbody1").find("input[type=checkbox]").prop("checked",$("#allCheckBox").get(0).checked);
    }

    //修改名称
    updateName(){
    	this.updateconfirm.show();
    }

    //连接路由器
    linkRouter(){
    	this.linRouterDialog.show();
    }

    //删除路由器
    delRouter(){
    	this.deleteRouterconfirm.show();
    }
}
