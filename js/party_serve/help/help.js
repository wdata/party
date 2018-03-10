//--------------------------------------------文章列表--------------------------------------------------------

var itemIndex = 0;
var tab1LoadEnd = false;
var tab2LoadEnd = false;
var helpComment = 0;      //page数
var truthComment = 0;      //page数

if(parseInt(urlParams("hide"))){
    $(".tap a").removeClass("active");
    switch (parseInt(urlParams("hide"))){
        case 0:$(".tap_truth").addClass("active");
            $(".truth").removeClass("hide").siblings(".help").addClass("hide");
            itemIndex = 0;
            break;
        case 1:$(".tap_help").addClass("active");
            $(".help").removeClass("hide").siblings(".truth").addClass("hide");
            itemIndex = 1;
            break;
    }
}


var dropload = $('.heart').dropload({
    scrollArea : window,
    autoLoad:true,
    loadDownFn : function(me){
        if(itemIndex === 1){
            $.ajax({
                type: "get",
                url:server_url + '/api/article/assist.json',
                dataType: 'json',
                data:{
                    'userId':user_id.data.id,
                    firmId:companyID,
                    page:helpComment,
                    size:5
                },
                success:function(data){
                    if(data.code === 0){

                        var li = " ";
                        $.each(data.data.items,function(index,val){
                            li += '<li><img class = "price" src="'+ unite_img_url+val.icon +'"/><div class="words"><a href="help_all.html?id='+ val.id +'"><header>'+ val.title +'</header><div class="time">'+ val.createTime +'</div><footer><div class="logo"><img src="'+ unite_img_url+val.user.photo +'" alt="logo" /><span>'+ val.user.name +'</span></div><div class="comment"><img src="../../images/party_serve/comment.png"/>评论(<span>'+ val.comments +'</span>)</div></footer></a></div></li>';
                        });
                        $(".help ul").append(li);

                        helpComment++;  //只有在data.code为0时说明有数据，没有时说明没有数据，所以不++

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
		}else{
            $.ajax({
                type: "get",
                url:server_url + '/api/article/mind.json',
                dataType: 'json',
                data:{
                    'userId':user_id.data.id,
                    firmId:companyID,
                    page:truthComment,
                    size:5
                },
                success:function(data){
                    if(data.code === 0){

                        var li = " ";
                        var clicked;
                        $.each(data.data.items,function(index,val){
                            //是否点赞
                            var like = val.isUpvote?"like active":"like";
                            var user = val.user.jobs?val.user.jobs[0].name:not_defined;             //有职位时，显示第一个，没有时显示未定义
                            li += '<li data-age="'+ val.id +'"><div class="logo"><img src="'+ unite_img_url+val.user.photo +'" alt="logo" /></div><div class="words">'+
                                '<a href="../truth/truth_all.html?id='+ val.id +'"><header><span class="position">'+ user +'</span><span class="name">'+ val.user.name +'</span></header><p>'+ val.title +'</p>'+
                                '<footer><div class="time">'+ (val.createTime).split(" ")[0] +'</div><div class="'+ like +'"><img class="ledger" src="../../images/ledger_list/default_like.png"/><img class="clicked" src="../../images/ledger_list/like.png"/>点赞(<span>'+ val.upvotes +'</span>)</div><div class="comment"><img src="../../images/party_serve/comment.png"/>评论(<span>'+ val.comments +'</span>)</div></footer></a></div></li>'
                        });
                        $(".truth ul").append(li);

                        truthComment++;  //只有在data.code为0时说明有数据，没有时说明没有数据，所以不++

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
    }
});



//切换效果
$(".tap a").click(function(){
	$(this).toggleClass("active").siblings("a").removeClass("active");
    itemIndex = parseInt($(this).attr("data-index"));
    if(itemIndex === 0){
        $(".truth").removeClass("hide").siblings(".help").addClass("hide");

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

    }else if(itemIndex === 1){
        $(".help").removeClass("hide").siblings(".truth").addClass("hide");

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


//-----------------------------------点赞-------------------------------
$(document).on("click",".truth .like",function(){
    if(!$(this).is(".active")){
        //如果没有则是  点赞和收藏
        dianShou($(this),1,4);
    }else{
        //反之则是取消点赞和收藏
        quXiao($(this),1,4);
    }
    $(this).toggleClass("active");
    return false;
});

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