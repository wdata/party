/**
 * Created by Administrator on 2017/7/10.
 */
$(".title").html(urlParams("head"));

//------党组空间四个机制和支部堡垒空间四个机制跳转，  用户四个机制typeId跳转；

var keyword = '';


//当有用户ID和机制typeId时，请求用户点击机制下的所有台账
var comment = 0;      //page数
var dropload = $('.content').dropload({
    scrollArea : window,
    autoLoad:true,
    loadDownFn : function(me){
        $.ajax({
            type: "get",
            url:server_url + '/api/ledgers/byType.json',
            dataType: 'json',
            data:{
                "type":urlParams("typeId"),
                "userId":urlParams("userId"),
                "firmId":companyID,
                "size":5,
                "page":comment,
                "keyword":keyword
            },
            success:function(data){
                if(data.code === 0){

                    var div = '';
                    $.each(data.data.items, function(index,val) {
                        var span ="";
                        if(val.tagVOs){
                            $.each(val.tagVOs, function(ind,valu) {
                                span += '<span>'+ valu.name +'</span>';
                            });
                        }
                        //是否点赞和收藏
                        var collect = val.isCollect?"collect active":"collect";
                        var like = val.isUpvote?"like active":"like";
                        var user = val.user.jobs?val.user.jobs[0].name:not_defined;             //有职位时，显示第一个，没有时显示未定义
                        div += '<div data-age="'+ val.id +'" class="taizhang"><dl><dt><img src="'+ unite_img_url+val.icon +'"></dt><dd class="content"><h2>'+ val.title +'</h2><div class="content">'+ val.content +'</div><div class="overview">'+ span +'<i><a href="../templates/'+ val.templateVO.path +'/show.html?id='+ val.id +'""></a></i></div><div class="foot"><div class="foot_title"><img src="'+ unite_img_url+val.user.photo +'" alt="">&nbsp;<span class="name">'+ val.user.name +'</span>&nbsp;&nbsp;<span class="position">'+ user +'</span><i class="time">'+ val.createTime +'</i></div></div></dd></dl><div class="footer"><div class="'+ collect +'"><i></i>收藏(<span>'+ val.collects +'</span>)</div><div class="comment"><a href="comment.html?id='+ val.id +'"><i></i>评论(<span>'+ val.comments +'</span>)</a></div><div class="'+ like +'"><i></i>点赞(<span>'+ val.upvotes +'</span>)</div></div></div>'
                    });
                    $(".content .list").append(div);

                    comment++;  //只有在data.code为0时说明有数据，没有时说明没有数据，所以不++

                }else{
                    me.lock();  //智能锁定，锁定上一次加载的方向
                    me.noData();      //无数据
                    //判断是否是毫无数据
                    if(comment === 0){
                        $(".nothing").removeClass("hide");
                        $(".dropload-down").addClass("hide");
                    }else{
                        $(".dropload-down").removeClass("hide");
                        $(".nothing").addClass("hide");
                    }
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
$(".search-click").on("touchstart",function(){
    dropload.unlock();
    dropload.noData(false);
    keyword = $(".search-kerword").val();
    $.ajax({
        type: "get",
        url:server_url + '/api/ledgers/byStandard.json',
        dataType: 'json',
        data:{
            "type":urlParams("typeId"),
            "userId":urlParams("userId"),
            "firmId":companyID,
            "size":5,
            "page":0,
            "keyword":keyword
        },
        success:function(data){
            var self = $(".content .list");
            self.empty();
            if(data.code === 0){

                var div = '';
                $.each(data.data.items, function(index,val) {
                    var span ="";
                    if(val.tagVOs){
                        $.each(val.tagVOs, function(ind,valu) {
                            span += '<span>'+ valu.name +'</span>';
                        });
                    }
                    //是否点赞和收藏
                    var collect = val.isCollect?"collect active":"collect";
                    var like = val.isUpvote?"like active":"like";

                    var user = val.user.jobs?val.user.jobs[0].name:not_defined;             //有职位时，显示第一个，没有时显示未定义
                    div += '<div data-age="'+ val.id +'" class="taizhang"><dl><dt><img src="'+ unite_img_url+val.icon +'"></dt><dd class="content"><h2>'+ val.title +'</h2><div class="content">'+ val.content +'</div><div class="overview">'+ span +'<i><a href="../templates/'+ val.templateVO.path +'/show.html?id='+ val.id +'"></a></i></div><div class="foot"><div class="foot_title"><img src="'+ unite_img_url+val.user.photo +'" alt="">&nbsp;<span class="name">'+ val.user.name +'</span>&nbsp;&nbsp;<span class="position">'+ user +'</span><i class="time">'+ val.createTime +'</i></div></div></dd></dl><div class="footer"><div class="'+ collect +'"><i></i>收藏(<span>'+ val.collects +'</span>)</div><div class="comment"><a href="comment.html?id='+ val.id +'"><i></i>评论(<span>'+ val.comments +'</span>)</a></div><div class="'+ like +'"><i></i>点赞(<span>'+ val.upvotes +'</span>)</div></div></div>'
                });
                self.append(div);

            }else{
                dropload.lock();  //智能锁定，锁定上一次加载的方向
                dropload.noData();      //无数据
                //判断是否是毫无数据
                if(comment === 0){
                    $(".nothing").removeClass("hide");
                    $(".dropload-down").addClass("hide");
                }else{
                    $(".dropload-down").removeClass("hide");
                    $(".nothing").addClass("hide");
                }
            }
            dropload.resetload();    //数据加载玩重置
        },
        error:function(){
            dropload.noData();      //无数据
            dropload.resetload();    //数据加载玩重置
        }
    });
});

//----------------------------点赞,收藏------------------------------------------
$(document).on("touchstart",".like",function(){
    if(!$(this).is(".active")){
        //如果没有则是  点赞和收藏
        dianShou($(this),1,1);
    }else{
        //反之则是取消点赞和收藏
        quXiao($(this),1,1);
    }
    $(this).toggleClass("active");
});
$(document).on("touchstart",".collect",function(){
    if(!$(this).is(".active")){
        //如果没有则是  点赞和收藏
        dianShou($(this),2,1);
    }else{
        //反之则是取消点赞和收藏
        quXiao($(this),2,1);
    }
    $(this).toggleClass("active");
});

function dianShou(self,type,resourceType){
    ajax_qcy(
        "post",
        '/api/behaviour/add.json', {
            "resourceId":self.parents(".taizhang").attr("data-age"),
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
            "resourceId":self.parents(".taizhang").attr("data-age"),
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

