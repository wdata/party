var itemIndex = 1;
var tab1LoadEnd = false;
var tab2LoadEnd = false;
var comment = 0;
// tab//切换
$(".activity-index nav a").click(function(){
    $(this).addClass("dian").siblings().removeClass("dian");
    itemIndex = parseInt($(this).attr("data-index"));
    if(itemIndex === 1){
        $(".new-activity").removeClass("hide").siblings("ul").addClass("hide");

        // 如果数据没有加载完
        if(!tab1LoadEnd){
            // 解锁
            dropload.unlock();
            dropload.noData(false);
        }else{
            // 锁定
            dropload.lock('down');
            dropload.noData();
        }

    }else if(itemIndex === 2){
        $(".old-activity").removeClass("hide").siblings("ul").addClass("hide");

        if(!tab2LoadEnd){
            // 解锁
            dropload.unlock();
            dropload.noData(false);
        }else{
            // 锁定
            dropload.lock('down');
            dropload.noData();
        }
    }
    // 重置
    dropload.resetload();
});
var pageStart = 0,pageEnd = 0;
var dropload = $('.content').dropload({
    scrollArea : window,
    loadDownFn : function(me){
        // 加载菜单一的数据
        if(itemIndex === 1){
            $.ajax({
                type: "get",
                url:server_url + '/api/activitys.json',
                dataType: 'json',
                data:{
                    status:itemIndex,
                    firmId:companyID,
                    size:5,
                    page:pageStart
                },
                success:function(data){
                    if(data.code === 0){

                        var li = '';
                        $.each(data.data.items, function(index,val) {
                            var user = val.user.jobs?val.user.jobs[0].name:not_defined;             //有职位时，显示第一个，没有时显示未定义
                            //活动是否取消;
                            var url = '';
                            if(val.status === 0){
                                url = 'cancel_introduction.html?id='+ val.id +'';
                            }else{
                                url = 'introduction.html?id='+ val.id +'';
                            }
                            li += '<li><a href="'+ url +'"><section><img src="'+ unite_img_url+val.user.photo +'" alt="头像"/>' +
                                '<div class="text"><span class="name">'+ val.user.name +" "+ user +'</span><span class="time">'+ val.createTime +'</span></div></section>' +
                                '<img src="'+ unite_img_url+val.icon +'" alt="展示图"/><div class="title">'+ val.title +'</div></a></li>'
                        });
                        $(".new-activity").append(li);


                        pageStart++;  //只有在data.code为0时说明有数据，没有时说明没有数据，所以不++
                        if(pageStart === data.data.pageCount){
                            me.lock();  //智能锁定，锁定上一次加载的方向
                            me.noData();      //无数据
                            tab1LoadEnd = true;
                        }
                    }else{
                        me.lock();  //智能锁定，锁定上一次加载的方向
                        me.noData();      //无数据
                        tab1LoadEnd = true;
                    }
                    me.resetload();    //数据加载玩重置
                },
                error:function(){
                    me.noData();      //无数据
                    me.resetload();    //数据加载玩重置
                }
            });
            // 加载菜单二的数据
        }else if(itemIndex === 2){
            $.ajax({
                type: "get",
                url:server_url + '/api/activitys.json',
                dataType: 'json',
                data:{
                    status:itemIndex,
                    firmId:companyID,
                    size:5,
                    page:pageEnd,
                    userId:user_id.data.id
                },
                success:function(data){
                    if(data.code === 0){

                        console.log(pageEnd,data.data.pageCount,itemIndex);
                        var li = '';
                        $.each(data.data.items, function(index,val) {
                            //是否点赞和收藏
                            var dianzan = val.isUpvote?"dianzan active":"dianzan";

                            var user = val.user.jobs?val.user.jobs[0].name:not_defined;             //有职位时，显示第一个，没有时显示未定义

                            //活动是否取消;
                            var url = '';
                            if(val.status === 0){
                                url = 'cancel_introduction.html?id='+ val.id +'';
                            }else{
                                url = 'old_introduction.html?id='+ val.id +'';
                            }
                            li += '<li data-age = "'+ val.id +'"><a href="'+ url +'"><section><img src="'+ unite_img_url+val.user.photo +'" alt="头像"/>' +
                                '<div class="text"><span class="name">'+ val.user.name+" "+ user +'</span><span class="time">'+ val.createTime +'</span></div></section>' +
                                '<img src="'+ unite_img_url+val.icon +'" alt="展示图"/><div class="title">'+ val.title +'</div></a>' +
                                '<footer>' +
                                '<a href="old_introduction.html?id='+ val.id +'" class="pinlun"><img src="../images/ledger_list/comment.png"/>评论(<span>'+ val.comments +'</span>)</a>' +
                                '<a class="'+ dianzan +'"><img class="no" src="../images/ledger_list/default_like.png"/><img class="yes" src="../images/ledger_list/like.png"/>点赞(<span>'+ val.upvotes +'</span>)</a></footer></li>'
                        });
                        $(".old-activity").append(li);

                        pageEnd++;  //只有在data.code为0时说明有数据，没有时说明没有数据，所以不++
                        if(pageEnd === data.data.pageCount){
                            me.lock();  //智能锁定，锁定上一次加载的方向
                            me.noData();      //无数据
                            tab2LoadEnd = true;
                        }
                    }else{
                        me.lock();  //智能锁定，锁定上一次加载的方向
                        me.noData();      //无数据
                        tab2LoadEnd = true;
                    }
                    me.resetload();    //数据加载玩重置
                },
                error:function(){
                    me.noData();      //无数据
                    me.resetload();    //数据加载玩重置
                }
            });
        }
    }
});


//----------------------------点赞,收藏------------------------------------------
$(document).on("touchstart",".dianzan",function(){   //点赞
    if(!$(this).is(".active")){
        //如果没有则是  点赞和收藏
        dianShou($(this),1,2);
    }else{
        //反之则是取消点赞和收藏
        quXiao($(this),1,2);
    }
    $(this).toggleClass("active");
    return false;
});
// $(document).on("click",".shoucang",function(){  //收藏
//     if(!$(this).is(".active")){
//         //如果没有则是  点赞和收藏
//         dianShou($(this),2,2);
//     }else{
//         //反之则是取消点赞和收藏
//         quXiao($(this),2,2);
//     }
//     $(this).toggleClass("active");
// });

function dianShou(self,type,resourceType){
    ajax_qcy(
        "post",
        '/api/behaviour/add.json', {
            "resourceId":self.parents("li").attr("data-age"),
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
            "resourceId":self.parents("li").attr("data-age"),
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









