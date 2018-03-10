/**
 * Created by Administrator on 2017/6/5.
 */
//思想汇报，和入党申请书，用户本人可修改
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
            // if((user_id.data.id) === data.data.id){
                $(".report").show();
            // }
        }
    }
);
//-----------------------------------------------入党申请书---------------------------------------------------------------
ajax_qcy(
    "get",
    '/api/article/'+ urlParams("id") +'.json',
    {
    },
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
            if(data.data.icon){
                $(".apply").append('<img src="'+ unite_img_url +  data.data.icon +'" />');
            }
            $(".article_container h3").text(data.data.title);
            $(".report").attr("href",'edit.html?userId='+ urlParams("userId") +'&words='+ data.data.id +'&edit=1');   //跳转问题
        }else{
            $(".apply").append("<p style='text-align:center;font-size:18px;'>暂无数据</p>");
        }
    }
);