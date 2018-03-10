/**
 * Created by Administrator on 2017/6/30.
 */
$(".wo").attr("href","edit_index.html?userId="+urlParams("userId"));
$.ajax({
    type: "get",
    url:server_url + '/api/user/base.json',
    dataType: 'json',
    data:{
        id:urlParams("userId")
    },
    success:function(data){
        if(data.code === 0){
            $(".logo-href").attr("href","party_member/memberZone.html?id="+data.data.id);  //跳转链接到个人空间
            $(".img-bg img").attr("src",unite_img_url+data.data.photo);    //个人头像
            $(".position .userName").text(data.data.name);   //个人姓名
            //职位，有多个;
            var li = '<li class="ke">'+ not_defined +'</li>';
            $(".ke").remove();      //清空原来的职位:
            if(data.data.jobs){
                $.each(data.data.jobs,function(index,val){
                    li += '<li class="ke">'+ val.name +'</li>'
                });
            }
            $(".position").append(li);
            //性别
            var sex = "";
            switch (data.data.sex){
                case -1: sex = '未知';
                    break;
                case 1:sex = '男';
                    break;
                case 0:sex = '女';
                    break;
            }
            $(".page .position .sex").text(sex);

        }
    },
    error:function(){

    }
});