//-------------------------------------------活动详情-----------------------------------------
//活动详情
$.ajax({
    type: "get",
    url:server_url + '/api/activity/history/'+ urlParams("id") +'.json',
    dataType: 'json',
    data:{
        id:urlParams("id")
    },
    success:function(data){
        if(data.code === 0){
            $(".heart>img").attr("src",unite_img_url + data.data.icon);
            $(".header>span").text(data.data.title);
            $(".content").html(data.data.content);
        }
    },
    error:function(){

    }
});

//活动评论
var comment = 0;      //page数
var dropload = $('.com').dropload({
    scrollArea : window,
    autoLoad:true,
    loadDownFn : function(me){
        $.ajax({
            type: "get",
            url:server_url + '/api/comments.json',
            dataType: 'json',
            data:{
                id:urlParams("id"),
                type:2,      //活动
                page:comment,
                size:5
            },
            success:function(data){
                if(data.code === 0){
                    var commen ='';
                    var self = $(".day_list");
                    $(".introduction .comment header span").text(data.data.count);
                    $.each(data.data.items,function(index,val){
                        commen += '<li><a href="../party_member/memberZone.html?id='+ val.user.id +'"><div class="logo"><img src="'+unite_img_url+val.user.photo+'" alt="logo"/></div><article><header><span class="name">'+ val.user.name +'</span><span class="position">'+ val.user.jobs[0].name +'</span><time><span>'+ val.createTime +'</span></time></header><p>'+ val.content +'</p></article></a></li>';
                    });
                    self.append(commen);

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

dropload.unlock();
dropload.noData(false);

//------------------------------------------评论---------------------------------------------
$(".enter .enter_bt").click(function(){
    var send_text = $(".enter_heart input[type='text']").val();
    if(send_text){
        ajax_qcy("post",'/api/comment/add.json', {
                userId:user_id.data.id,
                resourceId:urlParams("id"),
                resourceType:2,
                content:send_text
            },
            "发布评论失败",
            function(data) {
                if(data.code === 0){
                    $(".enter_heart input[type='text']").val("");
                    $.dialog({
                        type : 'info',
                        infoText : '操作成功',
                        infoIcon : '../plugin/dialog/images/success.png',
                        autoClose : 1500
                    });
                    $(".enter").hide();

                    comment = 1;
                    dropload.resetload();

                    $.ajax({
                        type: "get",
                        url:server_url + '/api/comments.json',
                        dataType: 'json',
                        data:{
                            id:urlParams("id"),
                            type:2,      //台账
                            page:0,
                            size:5
                        },
                        success:function(data){
                            if(data.code === 0){
                                var commen ='';
                                var self = $(".day_list");
                                self.empty();
                                $(".introduction .comment header span").text(data.data.count);
                                $.each(data.data.items,function(index,val){
                                    commen += '<li><a href="../party_member/memberZone.html?id='+ val.user.id +'"><div class="logo"><img src="'+unite_img_url+val.user.photo+'" alt="logo"/></div><article><header><span class="name">'+ val.user.name +'</span><span class="position">'+ val.user.jobs[0].name +'</span><time><span>'+ val.createTime +'</span></time></header><p>'+ val.content +'</p></article></a></li>';
                                });
                                self.append(commen);
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
