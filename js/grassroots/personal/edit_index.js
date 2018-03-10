/**
 * Created by Administrator on 2017/7/11.
 */
$.ajax({
    type: "get",
    url: server_url + '/api/user/base.json',
    data: {
        id:urlParams("userId")
    },
    dataType: 'json',
    success:function(data){
        if(data.code === 0){
            $(".space").attr("href","../../party_member/memberZone.html?id="+  data.data.id +"");
            $(".avatar").attr("src",unite_img_url + data.data.photo);  //头像
            $(".nameData").text(data.data.name);   //姓名
            var span = '';
            if(data.data.jobs){
                $.each(data.data.jobs,function(x,y){
                    span += '<span>'+ y.name +'</span>';
                    if(y.isLeader === 1){
                        $(".management").text("是");   //姓名
                    }
                })
            }else{
                span = not_defined;
            }
            $(".positionData").html(span);   //职位

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
            $(".sex").text(sex);

            $(".birthday").text(data.data.birthday);   //出生日期
            $(".joinPartyDate").text(data.data.joinPartyDate);   //入党时间
            $(".phone").text(data.data.phone);   //电话
            $(".companyName").text(data.data.companyName);   //所属单位
            $(".organName").text(data.data.organName);   //所属支部
            var type= "";
            switch (data.data.sex){
                case 0: type = "群众";
                    break;
                case 10: type = "积极份子";
                    break;
                case 20: type = "重点对象";
                    break;
                case 30: type = "预备党员";
                    break;
                case 100: type = "党员";
                    break;
            }
            $(".type").text(data.data.type);   //政治身份
            $(".degree").text(data.data.degree);   //学历
            $(".changeDate").text(data.data.changeDate);   //迁入时间
        }
    },
    error: function (res) {
        console.log(res.status);
    }
});