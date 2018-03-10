/**
 * Created by Administrator on 2017/6/5.
 */
$(".report").hide();
//-----------------------------------------------个人信息---------------------------------------------------------------
ajax_qcy(
    "get",
    '/api/user/base.json',
    {
        id:urlParams("userId")
    },
    "",
    function(data){
        if(data.code === 0){
            //判断是否为用户
            if((user_id.data.id) === data.data.id){
                $(".report").show();
            }
        }
    }
);
//-----------------------------------------------思想汇报---------------------------------------------------------------
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
            $(".article_container h3").text(data.data.title);
            var icon = data.data.icon?'<img src="'+ unite_img_url +  data.data.icon +'" />':"";
            $(".apply").append(icon);
            $(".thought").attr("href",'edit.html?userId='+ urlParams("userId") +'&words='+ data.data.id +'&edit=3');   //跳转问题
        }else{
            $(".apply").append("<p style='text-align:center;font-size:18px;'>暂无数据</p>");
        }
    }
);