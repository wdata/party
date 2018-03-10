/**
 * Created by Administrator on 2017/6/7.
 */
//*****************************************************h活动*********************************************************
var comment = 0;      //page数
var dropload = $('.com').dropload({
    scrollArea : window,
    autoLoad:true,
    loadDownFn : function(me){
        console.log($(window).width());
        $.ajax({
            type: "get",
            url:server_url + '/api/activitys/'+ user_id.data.id +'.json',
            dataType: 'json',
            data:{
                firmId:companyID,
                page:comment,
                size:5
            },
            success:function(data){
                var self = $(".wo-activity .new-activity");
                if(data.code === 0){
                    var html = '';
                    //活动状态，0活动已取消，101活动未开始，102活动进行中，103活动已结束
                    //人对活动状态，1为已报名(待审核)，20未审核不通过,30报名后取消报名(30表示我要报名)
                    $.each(data.data.items,function(index,val){
                        var cancel = '';var activity = '';
                        switch(val.status){
                            case 0:activity = '<p>活动已取消</p>';
                                break;
                            case 101:activity = '<p>活动未开始</p>';
                                break;
                            case 102:activity = '<p>活动进行中</p>';
                                break;
                            case 103:activity = '<p>活动已结束</p>';
                                break;
                        }
                        switch(val.userActivityStatus){
                            case 1: activity = '<p class="status-words">待审核</p>';cancel = '<button class="cancel">取消</button>';
                                break;
                            case 20: activity = '<p>未通过</p>';
                                break;
                            case 30: activity = '<p class="status-words">未报名</p>';
                                break;
                        }
                        html += '<li data-id="'+ val.id +'"><a href="../activity/introduction.html?id='+ val.id +'"><section><img src="'+ unite_img_url + val.user.photo +'" alt="头像"/><div class="text"><span class="name">'+ val.user.name +'</span><span class="time">'+ val.createTime +'</span></div>'+
                            '<div class="status">'+ activity +'</div></section><img src="'+ unite_img_url + val.icon +'" alt="展示图"/><div class="title">'+ val.title +'</div></a>'+ cancel +'';
                    });
                    self.append(html);

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
$(document).on("click",'.cancel',function(){
    var self = $(this);
    ajax_qcy(
        "post",
        '/api/userActivity/update.json',
        {
            id:self.parents("li").attr("data-id"),
            userId:user_id.data.id,
            status:1
        },
        "",
        function(data){
            if(data.code === 0){
                $.dialog({
                    type : 'info',
                    infoText : '操作成功',
                    infoIcon : '../plugin/dialog/images/success.png',
                    autoClose : 1500
                });
                comment = 1;
                $(".wo-activity .new-activity").empty();
                dropload.unlock();
                dropload.noData(false);
                $.ajax({
                    type: "get",
                    url:server_url + '/api/activitys/'+ user_id.data.id +'.json',
                    dataType: 'json',
                    data:{
                        firmId:companyID,
                        page:comment,
                        size:5
                    },
                    success:function(data){
                        if(data.code === 0){
                            var self = $(".wo-activity .new-activity");
                            var html = '';
                            //活动状态，0活动已取消，101活动未开始，102活动进行中，103活动已结束
                            //人对活动状态，1为已报名(待审核)，20未审核不通过,30报名后取消报名(30表示我要报名)
                            $.each(data.data.items,function(index,val){
                                var cancel = '';var activity = '';
                                switch(val.status){
                                    case 0:activity = '<p>活动已取消</p>';
                                        break;
                                    case 101:activity = '<p>活动未开始</p>';
                                        break;
                                    case 102:activity = '<p>活动进行中</p>';
                                        break;
                                    case 103:activity = '<p>活动已结束</p>';
                                        break;
                                }
                                switch(val.userActivityStatus){
                                    case 1: activity = '<p class="status-words">待审核</p>';cancel = '<button class="cancel">取消</button>';
                                        break;
                                    case 20: activity = '<p>未通过</p>';
                                        break;
                                    case 30: activity = '<p class="status-words">未报名</p>';
                                        break;
                                }
                                html += '<li data-id="'+ val.id +'"><a href="../activity/introduction.html?id='+ val.id +'"><section><img src="'+ unite_img_url + val.user.photo +'" alt="头像"/><div class="text"><span class="name">'+ val.user.name +'</span><span class="time">'+ val.createTime +'</span></div>'+
                                    '<div class="status">'+ activity +'</div></section><img src="'+ unite_img_url + val.icon +'" alt="展示图"/><div class="title">'+ val.title +'</div></a>'+ cancel +'';
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
    );
});