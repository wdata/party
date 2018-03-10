//------------初始化
$(".list-management ul").hide();
$(".list-management .drop").addClass("rotate");
//------------点击横岗收缩
$(document).on("click",".list-management .title",function(){
    $(this).siblings().toggle();
    $(this).find(".drop").toggleClass("rotate");
});


//-------------------------------------------组织列表-----------------------------------------
ajax_qcy(
    "get",
    '/api/activity/roll/list.json',
    {
        actId:urlParams("id")
    },
    "",
    function(data){
        if(data.code === 0){
            var div = '';
            $.each(data.data,function(index,val){
                var li = '';
                if(val.users){
                    $.each(val.users,function(x,y){
                        li += '<li data-id = "'+ y.id +'"><img class="logo" src = "'+ unite_img_url + y.photo +'"/><span>'+ y.name +'</span></li>';
                    });
                }
                div += '<div><div class="title"><img class="drop rotate" src="../images/activity/down.png"/>'+ val.name +'(<span>'+ val.userCount +'</span>)</div><ul>'+ li +'</ul></div>';
            });
            $(".list-management .heart").append(div);
        }else{
            var div = "<div style='text-align:center;line-height:1rem;font-size:16px;'>暂无数据</div>"
            $(".list-management .heart").append(div);
        }
    }
);




