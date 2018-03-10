/**
 * Created by Administrator on 2017/6/27.
 */

ajax_qcy(
    "get",
    '/api/news/'+ urlParams("id") +'.json', {
        userId:user_id.data.id
    },
    "",
    function(data) {
        var self = $(".text");
        self.empty();
        if(data.code === 0){

            if(data.data.isCollect){
                $(".collect").addClass("active");
            }
            $(".collect span").text(data.data.collects);  //收藏数
            $(".title").text(data.data.title);       //顶部显示标题
            $(".nav").text(data.data.title);   //标题
            $(".words time").html(data.data.createTime);   //时间
            var p = '';
            $.each(data.data.content.split("\r\n"), function(index,val) {   //内容,服务器中以\r\n区分换行
                p += '<p>'+ val +'</p>';
            });
            self.html(p);
            // self.append('<img src="'+ unite_img_url + data.data.image +'"/>');
        }
    }
);





//台账评论
var comment = 0;      //page数
var dropload = $('.com').dropload({
    scrollArea : window,
    autoLoad:true,
    loadDownFn : function(me){
        console.log($(window).width());
        $.ajax({
            type: "get",
            url:server_url + '/api/comments.json',
            dataType: 'json',
            data:{
                id:urlParams("id"),
                type:3,      //台账
                page:comment,
                size:5
            },
            success:function(data){
                if(data.code === 0){
                    var html='';
                    $(".Comtitle span").text(data.data.count);
                    $(".comment span").text(data.data.count);
                    $.each(data.data.items,function(index,item){
                        var user = item.user.jobs?item.user.jobs[0].name:not_defined;             //有职位时，显示第一个，没有时显示未定义
                        html+='<dl><dt><img src="'+unite_img_url+item.user.photo+'"></dt><dd class="container"><span>'+item.user.name+'&nbsp&nbsp&nbsp'+ user +'<span class="time">'+item.createTime+'</span></span><div class="overview">'+item.content+'</div></dd></dl>';
                    });
                    $(".comment_list .com .list").append(html);

                    comment++;  //只有在data.code为0时说明有数据，没有时说明没有数据，所以不++
                }else{
                    me.lock();  //智能锁定，锁定上一次加载的方向
                    me.noData();      //无数据
                }
                me.resetload();    //数据加载玩重置
            },
            error:function(){
                me.noData();      //无数据
                me.resetload();    //数据加载玩重置
            }
        });
    }
});


$(".foot .send").click(function(){
    var send_text = $(".foot input[type='text']").val();
    if(send_text){
        ajax_qcy("post",'/api/comment/add.json', {
                userId:user_id.data.id,
                resourceId:urlParams("id"),
                resourceType:3,
                content:send_text
            },
            "发布评论失败",
            function(data) {
                $(".foot input[type='text']").val('');
                if(data.code === 0){
                    $.dialog({
                        type : 'info',
                        infoText : '操作成功',
                        infoIcon : '../plugin/dialog/images/success.png',
                        autoClose : 1500
                    });
                    $("footer").hide();
                    comment = 1;
                    dropload.unlock();
                    dropload.noData(false);
                    $.ajax({
                        type: "get",
                        url:server_url + '/api/comments.json',
                        dataType: 'json',
                        data:{
                            id:urlParams("id"),
                            type:3,      //台账
                            page:0,
                            size:5
                        },
                        success:function(data){
                            if(data.code === 0){
                                var html='';
                                var self = $(".comment_list .com .list");
                                $(".comment span").text(data.data.count);
                                self.empty();
                                $(".Comtitle span").text(data.data.count);
                                $.each(data.data.items,function(index,item){
                                    var user = item.user.jobs?item.user.jobs[0].name:not_defined;             //有职位时，显示第一个，没有时显示未定义
                                    html+='<dl><dt><img src="'+unite_img_url+item.user.photo+'"></dt><dd class="container"><span>'+item.user.name+'&nbsp&nbsp&nbsp'+ user +'<span class="time">'+item.createTime+'</span></span><div class="overview">'+item.content+'</div></dd></dl>';
                                });
                                self.append(html);
                            }else{
                                dropload.lock();  //智能锁定，锁定上一次加载的方向
                                dropload.noData();      //无数据
                            }
                            dropload.resetload();    //数据加载玩重置
                        },
                        error:function(){
                            dropload.noData();      //无数据
                            dropload.resetload();    //数据加载玩重置
                        }
                    });
                }
            }
        )
    }else{
        $.dialog({
            type : 'info',
            infoText : "请输入评论",
            infoIcon : '../plugin/dialog/images/fail.png',
            autoClose : 1500
        });
    }
});





//----------------------------点赞,收藏------------------------------------------
$(document).on("touchstart ",".collect",function(){
    if(!$(this).is(".active")){
        //如果没有则是  点赞和收藏
        dianShou($(this),2,3);
    }else{
        //反之则是取消点赞和收藏
        quXiao($(this),2,3);
    }
    $(this).toggleClass("active");
});

function dianShou(self,type,resourceType){
    ajax_qcy(
        "post",
        '/api/behaviour/add.json', {
            "resourceId":urlParams("id"),
            "userId":user_id.data.id,
            'type':type,  //类型,1点赞，2收藏
            "resourceType":resourceType   //资源type 1:台账,2:活动,3:新闻(只能收藏),4:文章
        },
        "",
        function(data) {
            self.find("span").text(parseInt(self.find("span").text())+1);
        }
    )
}
function quXiao(self,type,resourceType){
    ajax_qcy(
        "post",
        '/api/behaviour/delete.json', {
            "resourceId":urlParams("id"),
            "userId":user_id.data.id,
            'type':type,  //类型,1点赞，2收藏
            "resourceType":resourceType   //资源type 1:台账,2:活动,3:新闻(只能收藏),4:文章
        },
        "",
        function(data) {
            self.find("span").text(parseInt(self.find("span").text())-1);
        }
    )
}
