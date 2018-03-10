$(document).ready(function(){
    //台账详情
    $.ajax({
        type: "get",
        url:server_url + '/api/ledger/detail.json',
        dataType: 'json',
        data:{
            id:urlParams("id"),
            userId:user_id.data.id
        },
        success:function(data){
            if(data.code === 0){
                var tagList='';
                var comm = $(".head-details");
                comm.empty();
                $(".comment_list .title span").text(data.data.comments);
                if(data.data.tagVOs){
                    $.each(data.data.tagVOs,function(index,item){
                        tagList+='<span>'+item.name+'</span>';
                    });
                }
                var jobs = data.data.user.jobs?data.data.user.jobs[0].name:not_defined;
                var head_html='<dl><dt><img src="'+unite_img_url+data.data.icon+'"></dt><dd class="content"><h2>'+data.data.title+'</h2><div class="content">'+data.data.content+'</div><div class="overview">'+tagList+'<i><a href="../templates/'+ data.data.templateVO.path +'/show.html?id='+ data.data.id +'"></a></i></div><div class="foot"><div class="foot_title"><img src="../images/ledger_list/ledger2.png" alt="">&nbsp;&nbsp;<span class="name">'+ data.data.user.name +'</span>&nbsp;&nbsp;<span class="position">'+ jobs +'</span><i class="time">'+ data.data.createTime +'</i></div></div></dd></dl>';
                comm.append(head_html);
            }
        },
        error:function(){

        }
    });


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
                    type:1,      //台账
                    page:comment,
                    size:5
                },
                success:function(data){
                    if(data.code === 0){
                        var html='';
                        $(".title span").text(data.data.count);
                        $.each(data.data.items,function(index,item){
                            var user = item.user.jobs?item.user.jobs[0].name:not_defined;             //有职位时，显示第一个，没有时显示未定义
                            html+='<dl><dt><img src="'+unite_img_url+item.user.photo+'"></dt><dd class="container"><span>'+item.user.name+'&nbsp&nbsp&nbsp'+ user +'<span class="time">'+ item.createTime +'</span></span><div class="overview">'+item.content+'</div></dd></dl>';
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
                    resourceType:1,
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
                                type:1,      //台账
                                page:0,
                                size:5
                            },
                            success:function(data){
                                if(data.code === 0){
                                    var html='';
                                    var self = $(".comment_list .com .list");
                                    self.empty();
                                    $(".title span").text(data.data.count);
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
});