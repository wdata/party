//--------------------list-management.html-----------------------
var sum = [];  //用户ID数组
//------------点击横岗收缩
$(document).on("click",".list-management .title",function(){
	$(this).siblings().toggle();
	$(this).find(".drop").toggleClass("rotate");
	return false;
});

//------------点击单个人，不满，横岗hide，全满，横岗show
$(document).on("click",".list-management ul li",function(){
	$(this).find(".confirm").toggleClass("hide");
	var bur = true;
	$.each($(this).parent().find(".confirm"),function(index,val){
		if($(val).is(".hide")){
			bur = false;
		}
	});
	if(bur){
		$(this).parent().siblings().find(".confirm").removeClass("hide");
	}else{
		$(this).parent().siblings().find(".confirm").addClass("hide");
	}
	//判定，如果点击为取消，则删除sum中的ID，如果是取消后再确定，则添加进入sum中;
    var self = $(this);    //将this赋值给self
	if($(this).find(".confirm").is(".hide")){
	    $.each(sum,function(index,val){
	        if(parseInt(self.attr("data-id")) === val){
	            sum.splice(index,1);
            }
        });
    }else{
        sum.push(parseInt(self.attr("data-id")));
    }
});
//提交报名
$(".button").click(function(){
    $(this).text("已提交").removeClass("button").unbind();
    $.ajax({
        type: "post",
        url: server_url + '/api/activity/roll/submit.json',
        data: {
                id:urlParams("id"),
                userIds:sum
        },
        dataType: 'json',
        traditional:true,
        success:function(data){
            if(data.code === 0){
                console.log("提交成功！");
            }
        },
        error: function (res) {
            console.log(res.status);
        }
    });
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
                        li += '<li data-id = "'+ y.id +'"><img class="logo" src = "'+ unite_img_url + y.photo +'"/><span>'+ y.name +'</span><div class="conf"><i><img class="confirm" src="../images/activity/check.png" /></i></div></li>';
                        sum.push(y.id);
                    });
                }
                div += '<div><div class="title"><img class="drop rotate" src="../images/activity/down.png"/>'+ val.name +'(<span>'+ val.userCount +'</span>)<div class="conf"><i><img class="confirm" src="../images/activity/check.png" /></i></div></div><ul>'+ li +'</ul></div>';
            });
            $(".list-management .heart").append(div);

            //------------初始化    将内容收缩
            $(".list-management ul").hide();
            $(".list-management .drop").addClass("rotate");

            //------------点击父元素全改            如果绑定在document中，会出现事件冒泡，所以写在数据请求后面
            $(".list-management .title .conf").click(function(){
                //判定，如果是全部取消则，删除下属的所有ID，如果是取消后再全部添加，则添加进入sum中；
                var self = $(this);
                if($(this).find(".confirm").is(".hide")){
                    $(this).parent().siblings().find(".confirm").removeClass("hide");
                    $(this).find(".confirm").removeClass("hide");

                    $.each(self.parents(".title").siblings("ul").find("li"),function(x,y){
                        sum.push(parseInt($(y).attr("data-id")));
                        sum = Array.from( new Set(sum) );           //删除重复阵列函数
                    })

                }else{
                    $(this).parent().siblings().find(".confirm").addClass("hide");
                    $(this).find(".confirm").addClass("hide");

                    $.each(self.parents(".title").siblings("ul").find("li"),function(x,y){
                        $.each(sum,function(index,val){
                            if(parseInt($(y).attr("data-id")) === val){
                                sum.splice(index,1);
                            }
                        })
                    })
                }
                return false;
            });
        }else{
            var div = "<div style='text-align:center;line-height:1rem;font-size:16px;'>暂无数据</div>"
            $(".list-management .heart").append(div);
        }
    }
);
