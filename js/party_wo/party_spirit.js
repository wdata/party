/**
 * Created by Administrator on 2017/6/9.
 */
// *************************************************党性报告**************************************（*****************

var comment = 0;      //page数
$('.heart').dropload({
    scrollArea : window,
    autoLoad:true,
    loadDownFn : function(me){
        $.ajax({
            type: "get",
            url:server_url + '/api/article/my/partyReports.json',
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
                        html += '<div class="content"><div class="words"><header>'+ val.title +'</header><section>'+ val.content +'</section><footer>'+ val.createTime +'</footer></div><img class="icon" src="'+ unite_img_url + val.icon +'" alt=""></div>';
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