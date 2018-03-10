// 党员发展空间tab选项卡
$(".nav_container div").click(function(){
	$(".zonelist").eq($(this).index()).show().siblings(".zonelist").hide();
	$(this).addClass("active").siblings().removeClass("active");
	switch($(this).index()){
        case 1:
            thought(2017,0,10);    //思想汇报
            break;
        case 2:
            examination(2017,0,10);  //考试记录
            break;
        case 3:
            suggest(2017,0,10);    //指导意见
            break;
    }
});
// 左右点击，添加和减少时间
$(".chooseYear span").click(function(){
    if($(this).is(".substr")){
        //减少时间
        $(this).siblings(".i_time").text((parseInt($(this).siblings(".i_time").text()))-1);
    }else{
        //增加时间
        $(this).siblings(".i_time").text((parseInt($(this).siblings(".i_time").text()))+1);
    }
    var year = parseInt($(this).siblings(".i_time").text());
    $(this).parent().siblings().remove();   //清空
    if($(this).parents(".zonelist").is(".thought_report")){
        thought(year,0,10);   //思想汇报
    }else if($(this).parents(".zonelist").is(".party_opinion")){
        suggest(year,0,10);   //指导意见
    }else if($(this).parents(".zonelist").is(".exam_record")){
        examination(year,0,10);  //考试记录
    }
});

$(".thought_reportEdit").attr("href",'thought_add.html?userId='+ urlParams("id"));     //添加思想汇报
//-----------------------------------------------个人信息---------------------------------------------------------------
ajax_qcy(
    "get",
    '/api/user/base.json',
    {
        id:urlParams("id")
    },
    "用户个人信息请求失败",
    function(data){
        if(data.code === 0){
            //性别
            var sex = "";
            switch (data.data.sex){
                case -1: sex = '未知';
                    break;
                case 1:sex = '男';
                    break;
                case 2:sex = '女';
                    break;
                default:sex = '未知';
                    break;
            }
            $(".sex").text(sex);
            //身份
            var UserType = "";
            switch (data.data.type){
                case 0:UserType = "群众";
                    break;
                case 10:UserType = "积极分子";
                    break;
                case 20:UserType = "重点对象";
                    break;
                case 30:UserType = "预备党员";
                    break;
                case 100:UserType = "党员";
                    break;
                default:
                    break;
            }
            $(".type").text(UserType);
            $("#logo").attr("href","../party_member/memberZone.html?id="+data.data.id);  //跳转链接到个人空间
            $(".img-bg img").attr("src",unite_img_url+data.data.photo);    //个人头像
            $(".position .userName").text(data.data.name);   //个人姓名
            $(".title_img .name").text(data.data.organName);             //所在党组或支部

            $(".head_message .item").eq(0).find("span").text(data.data.score);   //积分
            $(".head_message .item").eq(1).find("span").text(data.data.ranking);   //积分排名
            $(".head_message .item").eq(2).find("span").text(data.data.ledgers);  //累计台账
        }
    }
);
//-----------------------------------------------入党申请书---------------------------------------------------------------
ajax_qcy(
    "get",
    '/api/article/application.json',
    {
        userId:urlParams("id"),
        firmId:companyID
    },
    "",
    function(data){
        $(".apply").empty();    //清空
        if(data.code === 0){
            var p = '';
            $.each(data.data.content.split("\r\n"), function(index,val) {   //内容,服务器中以\r\n区分换行
                p += '<p>'+ val +'</p>';
            });
            $(".apply").append(p);
            if(data.data.icon){
                $(".apply").append('<img src="'+ unite_img_url +  data.data.icon +'" />');
            }
            $(".article_container h3").text(data.data.title);
            $(".apply_mainBodyEdit").attr("href",'report.html?userId='+ urlParams("id") +'&id='+ data.data.id +'');
        }else{
            $(".apply_mainBodyEdit").attr("href",'edit.html?id='+ urlParams("id") +'&edit=2');
            $(".apply").append("<p style='text-align:center;font-size:18px;'>暂无申请书</p>");
        }
    }
);
//-----------------------------------------------思想汇报---------------------------------------------------------------
function thought(year,page,size){
    ajax_qcy(
        "get",
        '/api/article/thoughtReport.json',
        {
            userId:urlParams("id"),
            year:year,
            page:page,
            size:size,
            firmId:companyID
        },
        "",
        function(data){
            $(".thought_report .chooseYear").siblings().remove();  //有选择时间的，清空他的兄弟元素
            if(data.code === 0){
                var html = "";
                var UserType = "";
                var color = "";
                $.each(data.data.items,function(index,val){
                    //身份,小标签颜色
                    switch (val.stage){
                        case 0:UserType = "群众";color = "mass";
                            break;
                        case 10:UserType = "积极分子";color = "activist";
                            break;
                        case 20:UserType = "重点对象";color = "important";
                            break;
                        case 30:UserType = "预备党员";color = "probationary";
                            break;
                        case 100:UserType = "党员";color = "members";
                            break;
                        default:UserType = "群众";color = "mass";
                            break;
                    }
                    var time = ((val.createTime).split(" ")[0]).split("-");
                    html += '<div class="report_box"><div class="left"><p>'+ UserType +'</p><span class="'+ color +'"></span></div><div class="right">'+
                        '<a href="thought.html?id='+ val.id +'?userId='+ urlParams("id") +'"><span></span><div class="date"><p>'+ time[2] +'</p><p>'+ time[1] +'月</p></div><div class="opinion_content">'+
                        '<h3>'+ val.title +'</h3><p>'+ val.content +'</p></div></a></div></div>';
                });
                $(".thought_report").append(html);
            }else{
                $(".thought_report").append("<div style='font-size:18px;color:#333;line-height:1rem;text-align:center;'>暂无数据</div>");
            }
        }
    );
}
//-----------------------------------------------指导意见---------------------------------------------------------------
function suggest(year,page,size){
    ajax_qcy(
        "get",
        '/api/article/opinions.json',
        {
            userId:urlParams("id"),
            year:year,
            page:page,
            size:size,
            firmId:companyID
        },
        "",
        function(data){
            $(".party_opinion .chooseYear").siblings().remove();  //有选择时间的，清空他的兄弟元素
            if(data.code === 0){
                var html = "";
                var UserType = "";
                var color = "";
                $.each(data.data.items,function(index,val){
                    //身份,小标签颜色
                    switch (val.stage){
                        case 0:UserType = "群众";color = "mass";
                            break;
                        case 10:UserType = "积极分子";color = "activist";
                            break;
                        case 20:UserType = "重点对象";color = "important";
                            break;
                        case 30:UserType = "预备党员";color = "probationary";
                            break;
                        case 100:UserType = "党员";color = "members";
                            break;
                        default:UserType = "群众";color = "mass";
                            break;
                    }
                    var time = val.reviewTime.split("-");
                    html += '<div class="opinion_box"><div class="left"><p>'+ UserType +'</p><span class="'+ color +'"></span></div><div class="right">'+
                        '<a href="opinion.html?id='+ val.id +'?userId='+ urlParams("id") +'"><span></span><div class="date"><p>'+ time[2] +'</p><p>'+ time[1] +'月</p></div><div class="opinion_content">'+
                        '<h3>'+ val.reviewer +'</h3><p>'+ val.content +'</p></div></a></div></div>';
                });
                $(".party_opinion").append(html);
            }else{
                $(".party_opinion").append("<div style='font-size:18px;color:#333;line-height:1rem;text-align:center;'>暂无数据</div>");
            }
        }
    );
}
//-----------------------------------------------考试记录---------------------------------------------------------------
function examination(year,page,size){
    ajax_qcy(
        "get",
        '/api/user/exams.json',
        {
            userId:urlParams("id"),
            year:year,
            page:page,
            size:size
        },
        "",
        function(data){
            $(".exam_record .chooseYear").siblings().remove();  //有选择时间的，清空他的兄弟元素
            if(data.code === 0){
                var html = "";
                var UserType = "";
                var color = "";
                $.each(data.data.items,function(index,val){
                    //身份,小标签颜色
                    switch (val.stage){
                        case 0:UserType = "群众";color = "mass";
                            break;
                        case 10:UserType = "积极分子";color = "activist";
                            break;
                        case 20:UserType = "重点对象";color = "important";
                            break;
                        case 30:UserType = "预备党员";color = "probationary";
                            break;
                        case 100:UserType = "党员";color = "members";
                            break;
                        default:UserType = "群众";color = "mass";
                            break;
                    }
                    var time = (new Date(val.examDate).toLocaleString().split(" ")[0].split("."));
                    html += '<div class="record_box"><div class="left"><p>'+ UserType +'</p><span class="'+ color +'"></span></div>'+
                        '<div class="right"><a href=""><span></span><div class="date"><p>'+ time[2] +'</p><p>'+ time[1] +'月</p></div>'+
                            '<div class="opinion_content"><h3>'+ val.examName +'</h3></div><p class="score">'+ val.examScore +'分</p></a></div></div>';
                });
                $(".exam_record").append(html);
            }else{
                $(".exam_record").append("<div style='font-size:18px;color:#333;line-height:1rem;text-align:center;'>暂无数据</div>");
            }
        }
    );
}
