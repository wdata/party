/**
 * Created by Administrator on 2017/6/8.
 */
//*****************************************************指导意见*********************************************************
var comment = 0;      //page数
$('.heart').dropload({
    scrollArea : window,
    autoLoad:true,
    loadDownFn : function(me){
        $.ajax({
            type: "get",
            url:server_url + '/api/article/my/guidances.json',
            dataType: 'json',
            data:{
                userId:user_id.data.id,
                page:comment,
                size:5
            },
            success:function(data){
                if(data.code === 0){

                    var self = $(".list");
                    var html = '';
                    $.each(data.data.items,function(index,val){
                        html += '<li><header><img src="../images/party_serve/hou.png" alt="logo" class="logo"><div class="belongs"><p class="text"><span class="name">'+ val.reviewer +'</span></p><p class="being">'+ val.title +'</p></div></header><div class="words">'+ val.content +'</div><time>'+ val.reviewTime +'</time></li>'
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
