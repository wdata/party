/**
 * Created by Administrator on 2017/6/1.
 */

//-----------------------------------------点击隐藏------------------------------------------
$(".mask-layer .cancel footer").click(function(){
    $(".mask-layer").addClass("hide");
});

//-------------------------------------------活动详情-----------------------------------------
ajax_qcy(
    "get",
    '/api/activity/new/'+ urlParams("id") +'.json',
    {
        userId:user_id.data.id
    },
    "",
    function(data){
        //详情
        $(".heart>img").attr("src",unite_img_url + data.data.icon);
        $(".header>span").text(data.data.title);
        $(".heart>.content").html(data.data.content);
        //活动取消原因
        $(".words").empty().html(data.data.remark);
    }
);