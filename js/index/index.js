var companyIDIndex = null;
var app_userID = null;
function app_user(userId,firmId){
    app_userID = userId;  //用户ID,在外层使用var创建会报错，IOS系统调用速度非常快
    //公司ID
    sessionStorage.setItem("companyID",firmId);
    companyIDIndex = sessionStorage.getItem("companyID");  //获取公司ID;
    user(); //用户个人
    notices(); //图片和公告
    droploadList();
    return [app_userID,companyIDIndex];
}
//-------------------------------------------------------党组首页顶部--用户个人----------------------------------
function user(){
	//判断：1.有cookie，并且cookie中的ID和userId相同，则获取cookie中的值
	//		2.如果没有cookie，或者cookie中的id值和userId不相同，则重新请求数据，并覆盖cookie
	if(app_userID){
	    //是否有userIDcookie
	    if(sessionStorage.getItem("user")){
            if(JSON.parse(sessionStorage.getItem("user")).data.id === parseInt(app_userID)){
                userCookie();
            }else{
                userAjax();
            }
        }else{
            userAjax();
        }
	}else{
        userCookie();
	}
}
function userCookie(){
    var data = JSON.parse(sessionStorage.getItem("user"));
    if(data.code === 0){
        $(".logo-href").attr("href","party_member/memberZone.html?id="+data.data.id);  //跳转链接到个人空间
        $(".index .img-bg img").attr("src",unite_img_url+data.data.photo);    //个人头像
        $(".index .position .userName").text(data.data.name);   //个人姓名
        //职位，有多个;
        var li = '';
        $(".ke").remove();      //清空原来的职位:
        if(data.data.jobs){
            $.each(data.data.jobs,function(index,val){
                li += '<li class="ke">'+ val.name +'</li>'
            });
        }else{
            li = '<li class="ke">'+ not_defined +'</li>';
        }
        $(".index .position").append(li);
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
        $(".position .sex").text(sex);

        var jifen = $(".head_message .item");
        jifen.eq(0).find("span").text(data.data.score);
        jifen.eq(1).find("span").text(data.data.ranking);
        jifen.eq(2).find("span").text(data.data.ledgers);
    }
}
function userAjax(){
    ajax_qcy(
        "get",
        '/api/user/base.json',
        {
            id:app_userID                    //获取传送过来的用户ID
        },
        "用户个人信息请求失败",
        function(data){
            if(data.code === 0){
                $(".logo-href").attr("href","party_member/memberZone.html?id="+data.data.id);   //跳转链接到个人空间
                $(".index .img-bg img").attr("src",unite_img_url+data.data.photo);    //个人头像
                $(".index .position .userName").text(data.data.name);   //个人姓名
                //职位，有多个;
                var li = '';
                $(".ke").remove();      //清空原来的职位:
                if(data.data.jobs){
                    $.each(data.data.jobs,function(index,val){
                        li += '<li class="ke">'+ val.name +'</li>'
                    });
                }else{
                    li = '<li class="ke">'+ not_defined +'</li>';
                }
                $(".index .position").append(li);

                //性别
                switch (data.data.sex){
                    case -1: $('.index .position .sex').text('未知');
                        break;
                    case 1:$(".index .position .sex").text('男');
                        break;
                    case 2:$(".index .position .sex").text('女');
                        break;
                    default:$(".index .position .sex").text('未知');
                        break;
                }

                var jifen = $(".head_message .item");
                jifen.eq(0).find("span").text(data.data.score);
                jifen.eq(1).find("span").text(data.data.ranking);
                jifen.eq(2).find("span").text(data.data.ledgers);
                console.log(data);
                sessionStorage.setItem("user",JSON.stringify(data));
            }
        }
    )
}
//-------------------------------------------频道-----------------------------------------
ajax_qcy(
		"get",
		'/api/menus.json',
	{
		position:1,
		size:4
	},
		"首页频道请求失败",
	function(data){
		if(data.code === 0){
            var pindao = '';
            $.each(data.data.items,function(index,val){
                pindao += '<a href="'+ val.url +'" class="item">'+
                    '<img src="'+ unite_img_url+val.icon +'" alt="">'+
                    '<p>'+ val.name +'</p></a>';
            });
            $(".nav").append(pindao);
        }
	}
);

function notices(){
//-------------------------------------------------公告---------------------------------------
    $.ajax({
        type: "get",
        url: ''+ server_url_notices +'/api/notices.json',
        data: {
            firmId:companyIDIndex
        },
        dataType: 'json',
        success:function(data){
            if(data.code === 0){
                var li = '';
                $.each(data.data,function(index,val){
                    li += '<li class="swiper-slide"><a href="friend/announcement.html?id='+ val.id +'">'+
                        // '<img src="'+ unite_img_url + val.icon +'"/>'+
                        '<div class="header">'+
                        '<section>'+ val.title +'</section></div>'+
                        '<article>'+ val.content +'</article></a></li>'
                });
                $(".news .swiper-wrapper").append(li);
                var newsSwiper = new Swiper('.swiper-news',{
                    autoplay: 5000,   //间隔时间
                    direction : 'vertical',   //垂直
                    speed:300,  //滑动速度
                    loop : true  //环路
                });
            }
        },
        error: function (res) {
            console.log(res.status);
        }
    });
//-------------------------------------------------------图片----------------------------------
    $.ajax({
        type: "get",
        url: ''+  server_url_img +'/api/images.json',
        data: {
            firmId:companyIDIndex
        },
        dataType: 'json',
        success:function(data){
          if(data.code === 0){
              var price = '';
              $.each(data.data,function(index,val){
                  // href="notes/exchange/speak/leadership_speak.html?id='+ val.id +'"
                  price += '<div class="swiper-slide"><a><img src="'+ unite_img_url+val.fileName +'" '+ val.title +' " alt="'+ val.remark +'"><span class="bg"></span></a></div>'
              });
              $(".banner .swiper-wrapper").append(price);
              var growSwiper = new Swiper('.grow-container',{
                  prevButton:'.swiper-button-prev',
                  nextButton:'.swiper-button-next'
              });
          }
        },
        error: function (res) {
            console.log(res.status);
        }
    });

}
//-----------------------------------------新闻----------------------------------------
var itemIndex = 1;
var tab1LoadEnd = false;
var tab2LoadEnd = false;
var comment = 0;
// tab//切换
$(".list_head>div").click(function(){
    itemIndex = parseInt($(this).attr("data-index"));
    if(itemIndex === 1){

        // 如果数据没有加载完
        if(!tab1LoadEnd){
            // 解锁
            dropload.unlock();
            dropload.noData(false);
        }else{
            // 锁定
            dropload.lock('down');
            dropload.noData();
        }

        $(".day_list").addClass("hide");
        $(".day_activity").addClass("hide");
        $(".list").removeClass("hide");
        $(".activity").removeClass("hide");
        $(".list_head .active").removeClass("active");
        $(".list_head .dynamic span").css("display","inline-block");
        $(".list_head #hide").css("display","none");
        $(".list_head .dynamic").addClass("active");
        $(".dropload").removeClass("hide");
        $(".day_droploadt").addClass("hide");

    }else if(itemIndex === 2){

        if(!tab2LoadEnd){
            // 解锁
            dropload.unlock();
            dropload.noData(false);
        }else{
            // 锁定
            dropload.lock('down');
            dropload.noData();
        }


        $(".list").addClass("hide");
        $(".activity").addClass("hide");
        $(".day_list").removeClass("hide");
        $(".day_activity").removeClass("hide");
        $(".list_head .active").removeClass("active");
        $(".list_head .dynamic span").css("display","none");
        $(".list_head #hide").css("display","inline-block");
        $(".list_head .everyday").addClass("active");
        $(".day_droploadt").removeClass("hide");
        $(".dropload").addClass("hide");
    }
    // 重置
    dropload.resetload();
});
var pageStart = 0,pageEnd = 0;
var dropload;
function droploadList(){
    dropload = $('.aaaa').dropload({
        scrollArea : window,
        loadDownFn : function(me){
            // 加载菜单一的数据
            if(itemIndex === 1){
                $.ajax({
                    type: "get",
                    url:server_url + '/api/news.json',
                    dataType: 'json',
                    data:{
                        'type':1,
                        'size':5,
                        'page':pageStart,
                        "firmId":companyIDIndex
                    },
                    success:function(data){
                        if(data.code === 0){

                            var content = '';
                            $.each(data.data.items, function(index,val) {
                                content += '<a href="friend/news.html?id='+ val.id +'"><dl><dt><img src="'+ unite_img_url + val.image +'"></dt><dd><div>'+ val.title +'</div><p>'+ val.createTime +'</p></dd></dl></a>'
                            });
                            $(".dropload .list").append(content);

                            pageStart++;  //只有在data.code为0时说明有数据，没有时说明没有数据，所以不++
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
                // 加载菜单二的数据
            }else if(itemIndex === 2){
                $.ajax({
                    type: "get",
                    url:server_url + '/api/news.json',
                    dataType: 'json',
                    data:{
                        'type':2,
                        'size':5,
                        'page':pageEnd,
                        "firmId":companyIDIndex
                    },
                    success:function(data){
                        if(data.code === 0){

                            var content = '';
                            $.each(data.data.items, function(index,val) {
                                content += '<a href="friend/news.html?id='+ val.id +'"><dl><dt><img src="'+ unite_img_url + val.image +'"></dt><dd><div>'+ val.title +'</div><p>'+ val.createTime +'</p></dd></dl></a>'
                            });
                            $(".day_droploadt .day_list").append(content);

                            pageEnd++;  //只有在data.code为0时说明有数据，没有时说明没有数据，所以不++
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
        }
    });
}



app_user(1666,100);