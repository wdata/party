/**
 * Created by Administrator on 2017/6/5.
 */

//-----------------------------------------------指导意见---------------------------------------------------------------
ajax_qcy(
    "get",
    '/api/article/'+ urlParams("id") +'.json',
    {},
    "",
    function(data){
        $(".apply").empty();    //清空
        if(data.code === 0){
            var p = '';
            $(".time").text(data.data.createTime);   //时间
            $.each(data.data.content.split("\r\n"), function(index,val) {   //内容,服务器中以\r\n区分换行
                p += '<p>'+ val +'</p>';
            });
            $(".apply").append(p);
            $(".article_container h3").text(data.data.reviewer + "给出的意见");
        }else{
            $(".apply").append("<p style='text-align:center;font-size:18px;'>暂无数据</p>");
        }
    }
);