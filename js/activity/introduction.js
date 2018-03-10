//--------------------点击报名----------------------------
var sign = $(".sign");var list = $(".list");
//取消报名再报名
function baoMingQuXiao(){
    $.ajax({
        type:'post',
        url: server_url + '/api/userActivity/update.json',
        data: {
            userId:user_id.data.id,
            id:urlParams("id"),
            status:30
        },
        dataType:'json',
        success:function(data){
            if(data.code === 0){
                sign.text("已报名");
                sign.removeAttr("onclick");  //删除报名接口
            }else{

            }
        },
        error:function(data){

        }
    });
}
//从未报名在报名
function baoMing(){
    ajax_qcy(
        "POST",
        '/api/userActivity/add.json',
        {
            userId:user_id.data.id,
            id:urlParams("id"),
            status:30
        },
        "",
        function(){
            sign.text("已报名");
            sign.removeAttr("onclick");  //删除报名接口
        }
    );
}
//-------------------------------------------活动详情-----------------------------------------
ajax_qcy(
		"get",
		'/api/activity/new/'+ urlParams("id") +'.json',
	{
		userId:user_id.data.id
	},
		"",
	function(data){
		if(data.code === 0){
            //判断是否为创建活动本人
            if(data.data.user.id === parseInt(user_id.data.id)){
                if(data.data.status === 2){
                    $(".box .list").click(function(){
                        $.dialog({
                            type : 'info',
                            infoText : "名单已提交",
                            infoIcon : '../plugin/dialog/images/fail.png',
                            autoClose : 1500
                        });
                    })
                }else{
                    $(".box .list").attr("href","list_management.html?id="+ urlParams("id") +"");    //管理者 ------- 名单浏览添加活动ID
                }
            }else{
                $(".box .list").attr("href","list_browse.html?id="+ urlParams("id") +"");    //其他用户 ------ 名单浏览添加活动ID
            }
            //是否报名status  人对活动状态,1为已报名，30报名后取消报名,40未报名(30,40都表示我要报名) 活动状态,0为活动已取消，2为名单已提交
            if(data.data.status === 2){                        //已提交
                sign.text("名单已提交");
                sign.attr("onclick","baoming()");
            }else if(data.data.status === 0){
                sign.text("活动已取消");
            }else{
                switch (data.data.userActivityStatus){
                    case 1:
                        sign.text("已报名");
                        break;
                    case 30:
                        sign.text("未报名");
                        sign.attr("onclick","baoMingQuXiao()");
                        break;
                    case 40:
                        sign.text("我要报名");
                        sign.attr("onclick","baoMing()");
                        break;
                    default:
                        break;
                }
            }

            //详情
            $(".heart>img").attr("src",unite_img_url + data.data.icon);
            var user = data.data.user.jobs?data.data.user.jobs[0].name:not_defined;             //有职位时，显示第一个，没有时显示未定义
            $(".header>span").text(data.data.title);
            $(".content").html(data.data.content);
		}
	}

);
